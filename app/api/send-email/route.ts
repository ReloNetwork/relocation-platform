import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { hasBasicAdminAccess } from '@/lib/api-auth';

export const runtime = 'nodejs';

// Rate limiting: Simple in-memory rate limiter
const emailAttempts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // emails per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = emailAttempts.get(ip);
  
  if (!attempts || now > attempts.resetTime) {
    emailAttempts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (attempts.count >= RATE_LIMIT) {
    return false;
  }
  
  attempts.count++;
  return true;
}

export async function POST(req: NextRequest) {
  if (!hasBasicAdminAccess(req)) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } }
    );
  }

  // SECURITY: Rate limiting
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Maximum 5 emails per hour.' }, { status: 429 });
  }

  try {
    const contentType = req.headers.get('content-type');
    let to, subject, html, text, from, replyTo, attachment;

    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData (for file attachments)
      const formData = await req.formData();
      to = formData.get('to') as string;
      subject = formData.get('subject') as string;
      html = formData.get('html') as string;
      text = formData.get('text') as string;
      from = formData.get('from') as string;
      replyTo = formData.get('replyTo') as string;
      
      const attachmentFile = formData.get('attachment') as File;
      if (attachmentFile && attachmentFile.size > 0) {
        const buffer = await attachmentFile.arrayBuffer();
        const content = Buffer.from(buffer).toString('base64');
        attachment = {
          content,
          filename: attachmentFile.name,
          type: attachmentFile.type
        };
      }
    } else {
      // Handle JSON (backward compatibility)
      const data = await req.json();
      ({ to, subject, html, text, from, replyTo, attachment } = data);
    }
    
    console.log('Sending email via Resend...');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('From:', from);
    
    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Prepare email data with optional attachment
    const emailParams: any = {
      from: from || 'Relo Network <onboarding@resend.dev>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || text?.replace(/\n/g, '<br/>'), // Use html or convert text to html
      text: text || html?.replace(/<[^>]*>/g, ''), // Use text or strip html tags
      replyTo: replyTo || from || 'hello@therelonetwork.com'
    };

    // Add attachment if provided (Resend format)
    if (attachment) {
      emailParams.attachments = [{
        filename: attachment.filename,
        content: attachment.content // Resend expects base64 content directly
      }];
    }
    
    console.log('Sending email with Resend API...');
    const emailData = await resend.emails.send(emailParams);
    
    if (emailData.error) {
      throw new Error(`Resend API error: ${emailData.error.message}`);
    }
    
    console.log('Resend send result:', emailData.data?.id);

    return NextResponse.json({ 
      success: true, 
      messageId: emailData.data?.id,
      message: 'Email sent successfully via Resend',
      provider: 'Resend API'
    });

  } catch (error: any) {
    console.error('Resend email sending error:', error);
    return NextResponse.json({ 
      error: 'Failed to send email via Resend', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Resend API email sending endpoint',
    endpoint: 'POST /api/send-email',
    provider: 'Resend API',
    required_fields: ['to', 'subject', 'html'],
    required_env: ['RESEND_API_KEY'],
    optional_fields: ['from', 'replyTo', 'attachment'],
    rate_limit: '5 emails per hour'
  });
}
