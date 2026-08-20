import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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

// Email provider functions
async function sendWithResend(emailParams: any) {
  console.log('Attempting to send with Resend...');
  
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'YOUR_NEW_RESEND_API_KEY_HERE') {
    throw new Error('Resend API key not configured properly');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const resendParams = {
    from: 'onboarding@resend.dev', // Use Resend's verified domain
    to: emailParams.to,
    subject: emailParams.subject,
    html: emailParams.html,
    replyTo: emailParams.replyTo || 'hello@therelonetwork.com',
    attachments: emailParams.attachments
  };

  const result = await resend.emails.send(resendParams);
  
  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }
  
  return {
    provider: 'Resend',
    messageId: result.data?.id,
    success: true
  };
}

async function sendWithGmail(emailParams: any) {
  console.log('Attempting to send with Gmail SMTP...');
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: `"Relo Network" <${process.env.GMAIL_USER}>`,
    to: emailParams.to,
    subject: emailParams.subject,
    html: emailParams.html,
    replyTo: emailParams.replyTo || 'hello@therelonetwork.com',
    attachments: emailParams.attachments?.map((att: any) => ({
      filename: att.filename,
      content: Buffer.from(att.content, 'base64'),
      contentType: att.type
    }))
  };

  const result = await transporter.sendMail(mailOptions);
  
  return {
    provider: 'Gmail SMTP',
    messageId: result.messageId,
    success: true
  };
}

async function sendWithSendGrid(emailParams: any) {
  console.log('Attempting to send with SendGrid...');
  
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured');
  }

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: emailParams.to,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@therelonetwork.com',
    subject: emailParams.subject,
    html: emailParams.html,
    replyTo: emailParams.replyTo || 'hello@therelonetwork.com',
    attachments: emailParams.attachments?.map((att: any) => ({
      filename: att.filename,
      content: att.content,
      type: att.type,
      disposition: 'attachment'
    }))
  };

  const result = await sgMail.send(msg);
  
  return {
    provider: 'SendGrid',
    messageId: result[0].headers['x-message-id'],
    success: true
  };
}

export async function POST(req: NextRequest) {
  // SECURITY: Require authentication for email sending
  if (!checkBasicAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
  }

  // SECURITY: Rate limiting
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Maximum 5 emails per hour.' }, { status: 429 });
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
    
    // Prepare email data
    const emailParams = {
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo || 'hello@therelonetwork.com',
      attachments: attachment ? [attachment] : undefined
    };

    console.log('Sending email with params:', JSON.stringify({ ...emailParams, attachments: attachment ? ['[ATTACHMENT]'] : undefined }, null, 2));

    // Try multiple email providers in order of preference
    const providers = [
      { name: 'Resend', fn: sendWithResend },
      { name: 'Gmail', fn: sendWithGmail },
      { name: 'SendGrid', fn: sendWithSendGrid }
    ];

    let lastError;
    
    for (const provider of providers) {
      try {
        const result = await provider.fn(emailParams);
        console.log(`Email sent successfully via ${result.provider}`);
        
        return NextResponse.json({
          success: true,
          provider: result.provider,
          messageId: result.messageId,
          message: `Email sent successfully via ${result.provider}`
        });
      } catch (error: any) {
        console.log(`${provider.name} failed:`, error.message);
        lastError = error;
        continue; // Try next provider
      }
    }

    // If all providers failed
    throw new Error(`All email providers failed. Last error: ${lastError?.message}`);

  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Enhanced email sending endpoint with multiple providers',
    endpoint: 'POST /api/send-email',
    providers: ['Resend', 'Gmail SMTP', 'SendGrid'],
    required_fields: ['to', 'subject', 'html'],
    optional_fields: ['from', 'replyTo', 'attachment']
  });
}