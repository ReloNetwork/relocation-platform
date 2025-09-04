import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplate {
  to: string[];
  subject: string;
  html: string;
}

// Base email wrapper with Relo Network branding
const EmailWrapper = ({ children }: { children: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relo Network</title>
  <style>
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #0B1220;
      margin: 0;
      padding: 0;
      background-color: #FAFAF9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: #0B1B2B;
      color: #FFFFFF;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-family: 'Playfair Display', serif;
      font-size: 28px;
    }
    .content {
      padding: 32px 24px;
    }
    .button {
      display: inline-block;
      background: #0B1B2B;
      color: #FFFFFF;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 16px 0;
    }
    .button:hover {
      background: #0A1624;
    }
    .footer {
      background: #F9FAFB;
      padding: 24px;
      text-align: center;
      font-size: 14px;
      color: #6B7280;
      border-top: 1px solid #E5E7EB;
    }
    .accent {
      color: #C9A24A;
    }
  </style>
</head>
<body>
  <div style="padding: 24px;">
    <div class="container">
      <div class="header">
        <h1>Relo Network</h1>
      </div>
      ${children}
      <div class="footer">
        <p>
          <strong>Relo Network</strong><br>
          Relocate to London. Effortlessly.<br>
          <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
        </p>
        <p style="margin-top: 16px; font-size: 12px;">
          This email was sent to you because you are a client of Relo Network. 
          If you have any questions, please reply to this email or contact us at hello@therelonetwork.com
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Welcome to waitlist
export function createWaitlistWelcomeEmail(email: string, name?: string): EmailTemplate {
  const displayName = name || 'there';
  
  return {
    to: [email],
    subject: 'Welcome to Relo Network - You\'re on the list! ✨',
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Welcome ${displayName}!</h2>
        <p>Thank you for joining the Relo Network waiting list. You're now part of an exclusive group preparing for effortless London relocation.</p>
        
        <p>Here's what happens next:</p>
        <ul>
          <li><strong>Priority Access:</strong> You'll be among the first to access our platform when we launch</li>
          <li><strong>Exclusive Updates:</strong> Receive insider tips about London relocation and market insights</li>
          <li><strong>Early Bird Pricing:</strong> Special launch pricing for our concierge services</li>
        </ul>
        
        <p>In the meantime, feel free to reach out with any questions about your London move. Our team is here to help even before launch!</p>
        
        <a href="https://therelonetwork.com/london-guide" class="button">Free London Relocation Guide</a>
        
        <p>Best regards,<br>
        The Relo Network Team</p>
        
        <p><em>P.S. Know someone else planning a London move? Share the love and have them join our waiting list too!</em></p>
      </div>
    ` })
  };
}

// Task assigned notification
export function createTaskAssignedEmail(
  email: string, 
  taskTitle: string, 
  dueDate?: string,
  caseId?: string
): EmailTemplate {
  const dueDateText = dueDate ? `<p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString('en-GB')}</p>` : '';
  
  return {
    to: [email],
    subject: `New Task Assigned: ${taskTitle}`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>You have a new task! 📋</h2>
        <p>A new task has been assigned to you for your London relocation case.</p>
        
        <div style="background: #F9FAFB; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #0B1B2B;">${taskTitle}</h3>
          ${dueDateText}
        </div>
        
        <p>Please log into your Relo Network account to view full details and mark the task as complete when finished.</p>
        
        <a href="https://therelonetwork.com/account" class="button">View Task Details</a>
        
        <p>Need help with this task? Reply to this email and your concierge will assist you.</p>
        
        <p>Best regards,<br>
        Your Relo Network Team</p>
      </div>
    ` })
  };
}

// Appointment booked confirmation
export function createAppointmentBookedEmail(
  email: string,
  appointmentTitle: string,
  startTime: string,
  endTime: string,
  location?: string,
  meetingUrl?: string
): EmailTemplate {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  
  const locationText = location ? `<p><strong>Location:</strong> ${location}</p>` : '';
  const meetingUrlText = meetingUrl ? `<a href="${meetingUrl}" class="button">Join Meeting</a>` : '';
  
  return {
    to: [email],
    subject: `Appointment Confirmed: ${appointmentTitle}`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Your appointment is confirmed! 📅</h2>
        <p>We're looking forward to speaking with you about your London relocation.</p>
        
        <div style="background: #F9FAFB; padding: 16px; border-radius: 6px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #0B1B2B;">${appointmentTitle}</h3>
          <p><strong>Date:</strong> ${startDate.toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p><strong>Time:</strong> ${startDate.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })} - ${endDate.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })} GMT</p>
          ${locationText}
        </div>
        
        ${meetingUrlText}
        
        <p><strong>What to prepare:</strong></p>
        <ul>
          <li>Your timeline for moving to London</li>
          <li>Budget considerations</li>
          <li>Preferred areas or specific requirements</li>
          <li>Any questions about the relocation process</li>
        </ul>
        
        <p>If you need to reschedule, please reply to this email at least 24 hours in advance.</p>
        
        <p>Looking forward to helping you relocate to London effortlessly!</p>
        
        <p>Best regards,<br>
        Your Relo Network Team</p>
      </div>
    ` })
  };
}

// Supplier approved notification
export function createSupplierApprovedEmail(
  email: string,
  supplierName: string,
  planName: string
): EmailTemplate {
  return {
    to: [email],
    subject: `Welcome to Relo Network Partners! Your ${supplierName} listing is now live`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Congratulations! You're now a Relo Network Partner 🎉</h2>
        <p>Your supplier listing for <strong>${supplierName}</strong> has been approved and is now live on our platform.</p>
        
        <div style="background: #F0F9FF; padding: 16px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #C9A24A;">
          <h3 style="margin-top: 0; color: #0B1B2B;">Your ${planName} Plan is Active</h3>
          <p>You'll now start receiving qualified leads from clients relocating to London.</p>
        </div>
        
        <a href="https://therelonetwork.com/partners/dashboard" class="button">Access Partner Dashboard</a>
        
        <p><strong>What's Next:</strong></p>
        <ul>
          <li>Complete your partner profile with additional details</li>
          <li>Upload your company logo and portfolio images</li>
          <li>Review our partner guidelines and best practices</li>
          <li>Start receiving and responding to client inquiries</li>
        </ul>
        
        <p>Our partner success team is here to help you make the most of your Relo Network membership. If you have any questions, don't hesitate to reach out.</p>
        
        <p>Welcome to the network!</p>
        
        <p>Best regards,<br>
        The Relo Network Partner Team</p>
      </div>
    ` })
  };
}

// Export the send email function
export async function sendEmail(template: EmailTemplate) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'hello@therelonetwork.com',
      to: template.to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}