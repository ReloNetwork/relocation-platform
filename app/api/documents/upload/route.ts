import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs'; // needs Node to stream file

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    const caseId = String(form.get('case_id') || '');
    const uploadedBy = String(form.get('uploaded_by') || 'concierge'); // client or concierge

    if (!file || !caseId) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Missing required fields: file and case_id are required' 
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

    // Validate file type (basic security)
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
    const { data: uploadData, error: uploadError } = await service.storage
      .from('documents')
      .upload(path, file, { 
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Insert document record into database
    const { data: docData, error: dbError } = await service
      .from('documents')
      .insert({
        case_id: caseId,
        uploaded_by: uploadedBy,
        name: file.name,
        path: path,
        content_type: file.type,
        size_bytes: file.size
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Clean up uploaded file if database insert fails
      await service.storage.from('documents').remove([path]);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Get public URL for the uploaded file
    const { data: urlData } = service.storage
      .from('documents')
      .getPublicUrl(path);

    return NextResponse.json({ 
      ok: true, 
      document: {
        id: docData.id,
        name: docData.name,
        path: docData.path,
        size: docData.size_bytes,
        type: docData.content_type,
        uploaded_by: docData.uploaded_by,
        created_at: docData.created_at,
        public_url: urlData.publicUrl
      }
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message || 'Internal server error' 
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
    const documentsWithUrls = documents.map(doc => ({
      ...doc,
      public_url: service.storage.from('documents').getPublicUrl(doc.path).data.publicUrl
    }));

    return NextResponse.json({
      ok: true,
      documents: documentsWithUrls
    });

  } catch (error: any) {
    console.error('Get documents error:', error);
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}