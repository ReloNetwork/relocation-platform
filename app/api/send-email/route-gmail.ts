import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// Security: Basic Auth check for admin endpoints
function checkBasicAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  
  const [type, value] = auth.split(" ");
  if (type !== "Basic" || !value) return false;
  
  try {
    const [user, pass] = atob(value).split(":");
    return user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS;
  } catch {
    return false;
  }
}

// Rate limiting: Simple in-memory rate limiter
const emailAttempts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // emails per hour
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
  // SECURITY: Require authentication for email sending
  if (!checkBasicAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
  }

  // SECURITY: Rate limiting
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Maximum 10 emails per hour.' }, { status: 429 });
  }

  try {
    const contentType = req.headers.get('content-type');
    let to, subject, html, from, replyTo, attachment;

    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData (for file attachments)
      const formData = await req.formData();
      to = formData.get('to') as string;
      subject = formData.get('subject') as string;
      html = formData.get('html') as string;
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
      ({ to, subject, html, from, replyTo, attachment } = data);
    }
    
    console.log('Sending email via Gmail SMTP...');
    console.log('To:', to);
    console.log('Subject:', subject);
    
    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'hello@therelonetwork.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'temp_password_replace_me'
      }
    });

    // Prepare email options
    const mailOptions: any = {
      from: `"Relo Network" <${process.env.GMAIL_USER || 'hello@therelonetwork.com'}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo || 'hello@therelonetwork.com'
    };

    // Add attachment if provided
    if (attachment) {
      mailOptions.attachments = [{
        filename: attachment.filename,
        content: Buffer.from(attachment.content, 'base64'),
        contentType: attachment.type
      }];
    }
    
    console.log('Sending email with Gmail...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Gmail send result:', result.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: result.messageId,
      message: 'Email sent successfully via Gmail SMTP',
      provider: 'Gmail SMTP'
    });

  } catch (error: any) {
    console.error('Gmail email sending error:', error);
    return NextResponse.json({ 
      error: 'Failed to send email via Gmail', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Gmail SMTP email sending endpoint',
    endpoint: 'POST /api/send-email',
    provider: 'Gmail SMTP',
    required_fields: ['to', 'subject', 'html'],
    required_env: ['GMAIL_USER', 'GMAIL_APP_PASSWORD'],
    optional_fields: ['from', 'replyTo']
  });
}