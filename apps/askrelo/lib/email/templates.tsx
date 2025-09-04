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
        
        <p>Best regards,<br>
        The Relo Network Team</p>
      </div>
    ` })
  }
}

// Partner subscription confirmation
export function createPartnerSubscriptionEmail(
  email: string,
  planName: string,
  amount: number
): EmailTemplate {
  return {
    to: [email],
    subject: `Welcome to Relo Network ${planName} - Let's Get You Started! 🚀`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Welcome to the Relo Network Partner Program! 🎉</h2>
        <p>Thank you for subscribing to our <strong>${planName}</strong> plan. You're now part of London's most exclusive relocation network.</p>
        
        <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C9A24A;">
          <h3 style="margin-top: 0; color: #0B1B2B;">Your Subscription Details</h3>
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Monthly Amount:</strong> £${amount}</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Billing:</strong> Monthly on the same date</p>
        </div>
        
        <h3>What happens next?</h3>
        <ul>
          <li><strong>Profile Setup:</strong> Complete your partner profile within 24 hours</li>
          <li><strong>Lead Generation:</strong> Start receiving qualified leads immediately</li>
          <li><strong>Priority Support:</strong> Access to dedicated partner success team</li>
          <li><strong>Exclusive Events:</strong> Invites to networking and training events</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://therelonetwork.com/partners/setup" class="button">Complete Profile Setup</a>
        </div>
        
        <div style="background: #FFF7ED; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #C9A24A;">🎯 Pro Tip for Success</h4>
          <p>Partners who complete their profile setup within 24 hours receive 3x more leads in their first month!</p>
        </div>
        
        <p>Questions? Reply to this email or call our partner success team at +44 20 7123 4567.</p>
        
        <p>Best regards,<br>
        The Relo Network Team</p>
      </div>
    ` })
  }
}

// Voice agent subscription confirmation
export function createVoiceSubscriptionEmail(
  email: string,
  planName: string,
  amount: number
): EmailTemplate {
  return {
    to: [email],
    subject: `Your Ask Relo ${planName} Plan is Active - Start Chatting! 🤖`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Welcome to Ask Relo ${planName}! 🎉</h2>
        <p>Your AI voice assistant is now active and ready to help you navigate your London relocation journey.</p>
        
        <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C9A24A;">
          <h3 style="margin-top: 0; color: #0B1B2B;">Your Plan Details</h3>
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Monthly Amount:</strong> £${amount}</p>
          <p><strong>Usage:</strong> ${planName === 'Professional' ? '120 minutes/month' : 'Unlimited'}</p>
          <p><strong>Features:</strong> ${planName === 'Professional' ? 'Voice AI + Property Search' : 'Everything + Human Support'}</p>
        </div>
        
        <h3>Ready to start your London journey?</h3>
        <ul>
          <li><strong>Voice Chat:</strong> Ask anything about London neighborhoods, transport, or properties</li>
          <li><strong>Property Search:</strong> Get real-time property recommendations</li>
          <li><strong>Commute Analysis:</strong> Optimize your location based on work/lifestyle</li>
          ${planName === 'Concierge' ? '<li><strong>Human Backup:</strong> Escalate to expert concierges anytime</li>' : ''}
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://therelonetwork.com/ask" class="button">Start Voice Chat Now</a>
        </div>
        
        <div style="background: #FFF7ED; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #C9A24A;">💡 Getting Started Tips</h4>
          <ul style="margin: 10px 0;">
            <li>Try: "Find me a 2-bed flat near Canary Wharf under £3000/month"</li>
            <li>Ask: "What's the best area for families with good schools?"</li>
            <li>Say: "I work in Tech City, where should I live?"</li>
          </ul>
        </div>
        
        <p>Need help? Our support team is available 24/7 at support@therelonetwork.com</p>
        
        <p>Best regards,<br>
        The Relo Network Team</p>
      </div>
    ` })
  }
}

// Directory access confirmation
export function createDirectorySubscriptionEmail(
  email: string,
  planName: string,
  amount: number
): EmailTemplate {
  return {
    to: [email],
    subject: `Directory Access Activated - Explore London's Premier Network! 🔓`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Your Premium Directory Access is Active! 🔓</h2>
        <p>Welcome to London's most exclusive relocation service directory. You now have ${planName === 'Basic Access' ? 'limited preview' : 'full'} access to our vetted partner network.</p>
        
        <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C9A24A;">
          <h3 style="margin-top: 0; color: #0B1B2B;">Your Access Level</h3>
          <p><strong>Plan:</strong> ${planName}</p>
          ${amount > 0 ? `<p><strong>Monthly Amount:</strong> £${amount}</p>` : '<p><strong>Cost:</strong> Free Preview</p>'}
          <p><strong>Partners Available:</strong> ${planName === 'Basic Access' ? '3 per month' : '150+ unlimited'}</p>
        </div>
        
        <h3>What you can access:</h3>
        <ul>
          ${planName === 'Basic Access' ? 
            '<li>Preview of 3 verified partners per month</li><li>Basic contact information</li><li>Standard customer support</li>' :
            '<li>Full access to 150+ verified partners</li><li>Direct contact details and booking</li><li>Detailed reviews and ratings</li><li>Advanced filtering and search</li><li>Priority customer support</li>'
          }
          ${planName === 'VIP Concierge' ? '<li>Personal concierge matching service</li><li>Negotiation assistance</li><li>Dedicated account manager</li>' : ''}
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://therelonetwork.com/directory" class="button">Browse Directory Now</a>
        </div>
        
        <div style="background: #FFF7ED; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #C9A24A;">🏆 Featured This Month</h4>
          <p>Check out our top-rated moving companies, luxury housing providers, and visa specialists - all with exclusive member pricing!</p>
        </div>
        
        <p>Questions about any of our partners? Our team personally knows each provider and can make recommendations.</p>
        
        <p>Best regards,<br>
        The Relo Network Team</p>
      </div>
    ` })
  }
}

// Corporate inquiry confirmation
export function createCorporateInquiryEmail(
  email: string,
  companyName: string,
  employeeCount: number
): EmailTemplate {
  return {
    to: [email],
    subject: `Corporate Relocation Demo Requested - Let's Transform Your Global Mobility`,
    html: EmailWrapper({ children: `
      <div class="content">
        <h2>Thank you for your corporate relocation inquiry! 🏢</h2>
        <p>We've received your request for a corporate demo and our enterprise team will be in touch within 24 hours.</p>
        
        <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C9A24A;">
          <h3 style="margin-top: 0; color: #0B1B2B;">Your Inquiry Details</h3>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Estimated Employees:</strong> ${employeeCount}</p>
          <p><strong>Potential Savings:</strong> £${(employeeCount * 15000).toLocaleString()}/year</p>
        </div>
        
        <h3>What to expect in your demo:</h3>
        <ul>
          <li><strong>ROI Analysis:</strong> Detailed breakdown of cost savings vs internal handling</li>
          <li><strong>Success Stories:</strong> Case studies from similar companies</li>
          <li><strong>Custom Solution:</strong> Tailored approach for your specific needs</li>
          <li><strong>Implementation Plan:</strong> 30-day setup timeline and milestones</li>
        </ul>
        
        <div style="background: #FFF7ED; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #C9A24A;">📊 Did You Know?</h4>
          <p>Companies using our managed service reduce relocation costs by 73% and improve employee satisfaction by 89% compared to internal handling.</p>
        </div>
        
        <p>In the meantime, feel free to review our corporate brochure and case studies:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://therelonetwork.com/corporate/resources" class="button">View Resources</a>
        </div>
        
        <p>Questions before our call? Contact our enterprise team directly at corporate@therelonetwork.com or +44 20 7123 4567.</p>
        
        <p>Best regards,<br>
        Sarah Chen<br>
        Head of Enterprise Solutions<br>
        The Relo Network</p>
      </div>
    ` })
  }
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