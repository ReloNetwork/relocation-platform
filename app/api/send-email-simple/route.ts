import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

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
  // SECURITY: Rate limiting
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Maximum 10 emails per hour.' }, { status: 429 });
  }

  try {
    const data = await req.json();
    const { to, subject, html, template } = data;

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
    }

    console.log('Sending partnership email via Resend...');
    console.log('Template:', template);
    console.log('To:', to);
    console.log('Subject:', subject);
    
    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send partnership email using verified domain
    const emailData = await resend.emails.send({
      from: 'Calistar Ankrah, Founder <hello@therelonetwork.com>',
      to: to,
      subject: subject,
      html: html,
      reply_to: 'hello@therelonetwork.com'
    });
    
    if (emailData.error) {
      throw new Error(`Resend API error: ${emailData.error.message}`);
    }
    
    console.log('Partnership email sent via Resend:', emailData.data?.id);

    return NextResponse.json({ 
      success: true, 
      messageId: emailData.data?.id,
      message: 'Partnership email sent successfully',
      provider: 'Resend API'
    });

  } catch (error: any) {
    console.error('Partnership email sending error:', error);
    return NextResponse.json({ 
      error: 'Failed to send partnership email', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Partnership email sending endpoint',
    endpoint: 'POST /api/send-email-simple',
    provider: 'Resend API',
    required_fields: ['to', 'subject', 'html'],
    optional_fields: ['template'],
    rate_limit: '10 emails per hour',
    note: 'No authentication required for partnership emails'
  });
}