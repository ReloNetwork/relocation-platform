import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, from, replyTo, attachment } = await req.json();
    
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Prepare email data with optional attachment
    const emailParams: any = {
      from: from || 'hello@therelonetwork.com',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo || 'hello@therelonetwork.com'
    };

    // Add attachment if provided
    if (attachment) {
      emailParams.attachments = [{
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type
      }];
    }
    
    const emailData = await resend.emails.send(emailParams);

    return NextResponse.json({ 
      success: true, 
      messageId: emailData.data?.id,
      message: 'Email sent successfully' 
    });

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
    message: 'Email sending endpoint',
    endpoint: 'POST /api/send-email',
    required_fields: ['to', 'subject', 'html'],
    optional_fields: ['from', 'replyTo']
  });
}