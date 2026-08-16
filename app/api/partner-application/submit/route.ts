import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface PartnerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  serviceCategory: string;
  experienceYears: string;
  currentClientBase: string;
  londonExperience: string;
  insuranceCoverage: string;
  partnershipTier: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PartnerFormData = await request.json();

    // Send notification email to Relo Network team
    const adminEmailHtml = `
      <h2>New Partner Application Received</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1B2B; margin-bottom: 15px;">Partnership Tier: ${data.partnershipTier === 'professional' ? 'Professional Partner' : 'Premium Sponsor'}</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Name:</td>
            <td style="padding: 10px;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Email:</td>
            <td style="padding: 10px;">${data.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Phone:</td>
            <td style="padding: 10px;">${data.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Company:</td>
            <td style="padding: 10px;">${data.company}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Service Category:</td>
            <td style="padding: 10px;">${data.serviceCategory}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Experience:</td>
            <td style="padding: 10px;">${data.experienceYears}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">London Experience:</td>
            <td style="padding: 10px;">${data.londonExperience}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; color: #0B1B2B;">Insurance Coverage:</td>
            <td style="padding: 10px;">${data.insuranceCoverage}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px;">
          <h4 style="color: #0B1B2B;">Current Client Base:</h4>
          <p style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #C9A24A;">${data.currentClientBase}</p>
        </div>
        
        ${
          data.message
            ? `
          <div style="margin-top: 20px;">
            <h4 style="color: #0B1B2B;">Additional Message:</h4>
            <p style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #C9A24A;">${data.message}</p>
          </div>
        `
            : ''
        }
      </div>
      
      <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
        This application was submitted through the ${data.partnershipTier === 'professional' ? 'Professional Partner' : 'Premium Sponsor'} application form.
        Please review and respond within 24 hours as promised to the applicant.
      </p>
    `;

    await resend?.emails.send({
      from: 'Relo Network <no-reply@therelonetwork.com>',
      to: ['hello@therelonetwork.com'],
      subject: `New ${data.partnershipTier === 'professional' ? 'Professional Partner' : 'Premium Sponsor'} Application - ${data.company}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to applicant
    const applicantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1B2B; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Application Received</h1>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #0B1B2B;">Dear ${data.firstName},</h2>
          
          <p>Thank you for your interest in our <strong>${data.partnershipTier === 'professional' ? 'Professional Partner' : 'Premium Sponsor'}</strong> programme. We have received your application and our partnership team will review it shortly.</p>
          
          <div style="background: #C9A24A; background: linear-gradient(135deg, #C9A24A 0%, #B8923D 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">Next Steps</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Application review within 24 hours</li>
              <li>Partnership consultation call</li>
              <li>Onboarding and activation</li>
            </ul>
          </div>
          
          <p>Our partnership team will contact you within <strong>24 hours</strong> to discuss your application and answer any questions you may have about joining our professional network.</p>
          
          <div style="border-left: 4px solid #C9A24A; padding-left: 15px; margin: 20px 0;">
            <h4 style="color: #0B1B2B; margin: 0 0 10px 0;">Your Application Summary:</h4>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${data.company}</p>
            <p style="margin: 5px 0;"><strong>Service Category:</strong> ${data.serviceCategory}</p>
            <p style="margin: 5px 0;"><strong>Partnership Tier:</strong> ${data.partnershipTier === 'professional' ? 'Professional Partner' : 'Premium Sponsor'}</p>
          </div>
          
          <p>If you have any immediate questions, please don't hesitate to contact us:</p>
          <ul>
            <li><strong>Email:</strong> hello@therelonetwork.com</li>
            <li><strong>Phone:</strong> +44 20 3105 9566</li>
          </ul>
          
          <p>We look forward to discussing how we can work together to serve London's executive and corporate relocation market.</p>
          
          <p>Best regards,<br>
          <strong>The Relo Network Partnership Team</strong></p>
        </div>
        
        <div style="background: #FAFAF9; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
          <p>© 2025 Relo Network Ltd. London, United Kingdom.</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Relo Network <hello@therelonetwork.com>',
      to: [data.email],
      subject: `Partnership Application Received - ${data.partnershipTier === 'professional' ? 'Professional Partner' : 'Premium Sponsor'}`,
      html: applicantEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error processing partner application:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application',
      },
      { status: 500 }
    );
  }
}
