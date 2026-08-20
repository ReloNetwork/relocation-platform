import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

// Security: Basic Auth check for admin endpoints (not needed for public contact form)
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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, service, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Required fields missing: name, email, and message are required' }, { status: 400 });
    }

    console.log('Contact form submission:', { name, email, phone, service, message });

    // Send email notification to hello@therelonetwork.com using Resend
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key not configured');
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #0B1B2B; border-bottom: 2px solid #C9A24A; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #C9A24A;">
            <h3 style="color: #0B1B2B; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${service || 'General Inquiry'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #0B1B2B;">Message</h3>
            <div style="padding: 15px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 5px; font-size: 12px; color: #6b7280;">
            <p><strong>Response Required:</strong> Customer expects response within 2 hours as stated on website</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            <p><strong>Priority:</strong> High - General Contact Form</p>
          </div>
        </div>
      `;

      const result = await resend.emails.send({
        from: 'Relo Network Contact <onboarding@resend.dev>',
        to: 'hello@therelonetwork.com',
        reply_to: email,
        subject: `New Contact: ${name} - ${service || 'General Inquiry'}`,
        html: emailContent
      });

      console.log('Contact notification sent via Resend:', result.data?.id);

      // Send confirmation email to customer
      const confirmationEmail = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0B1B2B; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
            <p style="color: #C9A24A; font-size: 16px; margin: 0;">London's Premier Relocation Network</p>
          </div>

          <h2 style="color: #0B1B2B;">Thank you for contacting us, ${name}!</h2>
          
          <p style="color: #6B7280; line-height: 1.6;">
            We have received your message and our team will respond within 2 hours during business hours 
            (Monday-Friday 8:00-20:00 GMT).
          </p>

          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #C9A24A;">
            <h3 style="color: #0B1B2B; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Service Interest:</strong> ${service || 'General Inquiry'}</p>
            <p><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
          </div>

          <div style="margin: 30px 0; padding: 20px; background-color: #0B1B2B; border-radius: 5px; text-align: center;">
            <h3 style="color: white; margin-top: 0;">Need Immediate Assistance?</h3>
            <p style="color: #C9A24A; margin: 10px 0;">Call our direct line:</p>
            <p style="color: white; font-size: 18px; font-weight: bold;">+44 20 3105 9566</p>
          </div>

          <p style="color: #6B7280; font-size: 14px;">
            Best regards,<br>
            The Relo Network Team<br>
            <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
          </p>
        </div>
      `;

      await resend.emails.send({
        from: 'Relo Network <onboarding@resend.dev>',
        to: email,
        subject: 'Thank you for contacting Relo Network - We\'ll respond within 2 hours',
        html: confirmationEmail
      });

      console.log('Confirmation email sent to customer via Resend');

    } catch (emailError: any) {
      console.error('Email sending error:', emailError);
      // Don't fail the entire request if email fails - log the contact anyway
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll respond within 2 hours.',
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      error: 'Failed to submit contact form. Please try again or call us directly at +44 20 3105 9566.',
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact form endpoint',
    endpoint: 'POST /api/contact',
    required_fields: ['name', 'email', 'message'],
    optional_fields: ['phone', 'service'],
    response_time: '2 hours during business hours'
  });
}