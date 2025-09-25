import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs'; // needs Node to stream file

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    const caseId = String(form.get('case_id') || '');

    if (!file || !caseId) {
      return NextResponse.json({ 
        ok: false, 
        error: 'missing file/case_id' 
      }, { status: 400 });
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({
        ok: false,
        error: 'File too large. Maximum size is 50MB.'
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        ok: false,
        error: 'File type not allowed. Please upload images, PDFs, or Office documents.'
      }, { status: 400 });
    }

    const service = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // server only
    );

    // Create unique path with timestamp and sanitized filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${caseId}/${Date.now()}-${sanitizedName}`;

    // Upload to Supabase Storage
    const { error: uErr } = await service.storage
      .from('documents')
      .upload(path, file, { 
        upsert: false,
        contentType: file.type
      });

    if (uErr) {
      console.error('Storage upload error:', uErr);
      throw new Error(`Upload failed: ${uErr.message}`);
    }

    // Insert document record into database with full schema
    // Convert case_id to string to handle both UUID and regular IDs
    const { error: dErr } = await service.from('documents').insert({
      case_id: String(caseId), 
      name: file.name, 
      path,
      content_type: file.type,
      size_bytes: file.size,
      uploaded_by: 'concierge'
    });

    if (dErr) {
      console.error('Database insert error:', dErr);
      // Clean up uploaded file if database insert fails
      await service.storage.from('documents').remove([path]);
      throw new Error(`Database error: ${dErr.message}`);
    }

    // Get public URL for the uploaded file
    const { data: urlData } = service.storage
      .from('documents')
      .getPublicUrl(path);

    return NextResponse.json({ 
      ok: true, 
      path,
      url: urlData.publicUrl,
      message: `Successfully uploaded ${file.name}`
    });

  } catch (e: any) {
    console.error('Upload error:', e);
    return NextResponse.json({ 
      ok: false, 
      error: e.message || 'Internal server error'
    }, { status: 500 });
  }
}

// GET endpoint to retrieve documents for a case
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const caseId = url.searchParams.get('case_id');

    if (!caseId) {
      return NextResponse.json({
        ok: false,
        error: 'case_id parameter is required'
      }, { status: 400 });
    }

    const service = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: documents, error } = await service
      .from('documents')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }

    // Add public URLs to documents
    const documentsWithUrls = documents?.map(doc => ({
      ...doc,
      public_url: service.storage.from('documents').getPublicUrl(doc.path).data.publicUrl
    })) || [];

    return NextResponse.json({
      ok: true,
      documents: documentsWithUrls,
      count: documentsWithUrls.length
    });

  } catch (error: any) {
    console.error('Get documents error:', error);
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}