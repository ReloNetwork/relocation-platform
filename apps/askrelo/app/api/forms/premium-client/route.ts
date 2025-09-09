import { NextRequest, NextResponse } from 'next/server'

interface PremiumClientData {
  firstName: string
  lastName: string
  email: string
  phone: string
  timeline: string
  budget: string
  bedrooms: string
  neighborhoods: string
  familySize: string
  hasChildren: string
  hasPets: string
  employer: string
  relocationType: string
  currentLocation: string
  specialRequirements: string
  hearAboutUs: string
  formType: string
  submittedAt: string
  isUrgent: boolean
}

// Email template for premium client confirmation
const getPremiumClientConfirmationTemplate = (data: PremiumClientData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Consultation Confirmed</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #C9A24A 0%, #0B1B2B 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Premium Service</h1>
    <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your London relocation journey begins now</p>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #0B1B2B; margin-top: 0;">Dear ${data.firstName},</h2>
    
    <p>Welcome to Relo Network's premium relocation service! Your consultation request has been received and our expert team is already working on your personalized London property search.</p>
    
    <div style="background: #EFF6FF; border: 1px solid #DBEAFE; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1E40AF; margin-top: 0;">⭐ Premium Service Activated</h3>
      <p style="color: #1E40AF; margin-bottom: 10px;">Your dedicated relocation specialist will contact you at <strong>${data.phone}</strong> within 4 hours to begin your consultation.</p>
      <p style="color: #1E40AF; margin-bottom: 0;"><strong>Reference ID:</strong> PC-${Date.now().toString().slice(-6)}</p>
    </div>
    
    <h3 style="color: #0B1B2B;">Your Search Preferences:</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Budget Range:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.budget.replace('-', ' - ')}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Property Size:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.bedrooms.replace('bed', ' bedroom').replace('+', '+')}</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Timeline:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb; color: ${data.isUrgent ? '#DC2626' : '#059669'}; font-weight: bold;">${data.timeline.replace('asap', 'ASAP')}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Preferred Areas:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.neighborhoods || 'Open to suggestions'}</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Family Size:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.familySize.replace('-', ' ')}</td>
      </tr>
    </table>
    
    <h3 style="color: #0B1B2B;">Your Premium Experience Timeline:</h3>
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <div style="display: flex; align-items: start; gap: 15px;">
        <div style="background: #C9A24A; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
        <div>
          <h4 style="margin: 0 0 5px 0; color: #0B1B2B;">Consultation Call (Within 4 hours)</h4>
          <p style="margin: 0; color: #6B7280; font-size: 14px;">Your specialist will call to understand your specific needs and preferences</p>
        </div>
      </div>
      
      <div style="display: flex; align-items: start; gap: 15px;">
        <div style="background: #C9A24A; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
        <div>
          <h4 style="margin: 0 0 5px 0; color: #0B1B2B;">Property Shortlist (Within 24 hours)</h4>
          <p style="margin: 0; color: #6B7280; font-size: 14px;">Curated selection of properties matching your exact criteria</p>
        </div>
      </div>
      
      <div style="display: flex; align-items: start; gap: 15px;">
        <div style="background: #C9A24A; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
        <div>
          <h4 style="margin: 0 0 5px 0; color: #0B1B2B;">VIP Viewing Coordination</h4>
          <p style="margin: 0; color: #6B7280; font-size: 14px;">We'll arrange and accompany you to property viewings</p>
        </div>
      </div>
      
      <div style="display: flex; align-items: start; gap: 15px;">
        <div style="background: #C9A24A; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
        <div>
          <h4 style="margin: 0 0 5px 0; color: #0B1B2B;">Move-In Support</h4>
          <p style="margin: 0; color: #6B7280; font-size: 14px;">End-to-end assistance until you're settled in your new home</p>
        </div>
      </div>
    </div>
    
    <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h4 style="color: #166534; margin-top: 0;">📱 Your Premium Support Team</h4>
      <ul style="color: #166534; margin-bottom: 0;">
        <li><strong>Direct Line:</strong> +44 20 7946 0959 (Available 24/7)</li>
        <li><strong>Email:</strong> premium@relo-network.com</li>
        <li><strong>WhatsApp:</strong> +44 75 8521 9047 (Instant updates)</li>
        <li><strong>Specialist:</strong> Will be assigned during your consultation call</li>
      </ul>
    </div>
    
    ${data.specialRequirements ? `
    <h3 style="color: #0B1B2B;">Special Requirements Noted:</h3>
    <div style="background: #FAFAF9; border-left: 4px solid #C9A24A; padding: 15px; margin: 15px 0;">
      <p style="margin: 0; color: #6B7280;">${data.specialRequirements}</p>
    </div>
    ` : ''}
    
    <p>Our premium service has successfully relocated over 2,500 individuals and families to London, with a 98% satisfaction rate. You're in expert hands.</p>
    
    <p style="margin-top: 30px;">Looking forward to helping you find your perfect London home!</p>
    
    <p>Best regards,<br>
    <strong>Relo Network Premium Team</strong><br>
    Your London Relocation Specialists</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6B7280; font-size: 12px;">
    <p>Relo Network | One Canada Square, Canary Wharf, London E14 5AB</p>
    <p>Premium Line: +44 20 7946 0959 | Email: premium@relo-network.com</p>
  </div>
</body>
</html>
`

// Internal premium client notification template
const getPremiumInternalTemplate = (data: PremiumClientData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>⭐ NEW PREMIUM CLIENT - ${data.firstName} ${data.lastName}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #C9A24A; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">⭐ NEW PREMIUM CLIENT CONSULTATION</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">${data.firstName} ${data.lastName} - ${data.relocationType.toUpperCase()}</p>
  </div>
  
  <div style="padding: 20px; background: white;">
    <h2 style="color: #C9A24A;">Client Profile</h2>
    <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString('en-GB')}</p>
    <p><strong>Priority:</strong> ${data.isUrgent ? 'URGENT (ASAP)' : 'Standard'}</p>
    <p><strong>Reference:</strong> PC-${Date.now().toString().slice(-6)}</p>
    
    <h3>Contact Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Current Location:</strong> ${data.currentLocation || 'Not specified'}</li>
    </ul>
    
    <h3>Property Requirements:</h3>
    <ul>
      <li><strong>Budget:</strong> ${data.budget.replace('-', ' - ')}</li>
      <li><strong>Bedrooms:</strong> ${data.bedrooms}</li>
      <li><strong>Timeline:</strong> ${data.timeline}</li>
      <li><strong>Preferred Areas:</strong> ${data.neighborhoods || 'Open to suggestions'}</li>
    </ul>
    
    <h3>Family Details:</h3>
    <ul>
      <li><strong>Family Size:</strong> ${data.familySize}</li>
      <li><strong>Children:</strong> ${data.hasChildren || 'Not specified'}</li>
      <li><strong>Pets:</strong> ${data.hasPets || 'Not specified'}</li>
      ${data.employer ? `<li><strong>Employer:</strong> ${data.employer}</li>` : ''}
    </ul>
    
    ${data.specialRequirements ? `<h3>Special Requirements:</h3><p>${data.specialRequirements}</p>` : ''}
    
    <h3>Lead Source:</h3>
    <p><strong>How they heard about us:</strong> ${data.hearAboutUs || 'Not specified'}</p>
    
    <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
      <h4 style="color: #92400E; margin-top: 0;">IMMEDIATE ACTIONS REQUIRED:</h4>
      <ol style="color: #92400E; margin-bottom: 0;">
        <li><strong>Call within 4 hours:</strong> Contact ${data.firstName} at ${data.phone}</li>
        <li><strong>Assign specialist:</strong> Match with appropriate team member</li>
        <li><strong>Create property search:</strong> Based on requirements above</li>
        <li><strong>Prepare shortlist:</strong> Within 24 hours of consultation</li>
        <li><strong>Schedule viewings:</strong> Coordinate VIP viewing experiences</li>
      </ol>
    </div>
    
    <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 15px; margin: 20px 0;">
      <h4 style="color: #166534; margin-top: 0;">Premium Service Standards:</h4>
      <ul style="color: #166534; margin-bottom: 0;">
        <li>Consultation call within 4 hours</li>
        <li>Property shortlist within 24 hours</li>
        <li>VIP viewing coordination</li>
        <li>White-glove service throughout</li>
        <li>Weekly progress updates</li>
      </ul>
    </div>
  </div>
</body>
</html>
`

export async function POST(request: NextRequest) {
  try {
    const data: PremiumClientData = await request.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'timeline', 'budget', 'bedrooms', 'familySize', 'relocationType']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate client reference ID
    const clientRef = `PC-${Date.now().toString().slice(-6)}`

    // Send confirmation email to client
    const confirmationEmailData = {
      to: data.email,
      subject: `Premium Consultation Confirmed - Welcome ${data.firstName}!`,
      html: getPremiumClientConfirmationTemplate(data)
    }

    // Send internal notification
    const internalNotificationData = {
      to: 'premium@relo-network.com',
      cc: 'ops@relo-network.com',
      subject: `⭐ NEW PREMIUM CLIENT - ${data.firstName} ${data.lastName} (${data.timeline})`,
      html: getPremiumInternalTemplate(data)
    }

    // For urgent requests, also send SMS notification
    if (data.isUrgent) {
      console.log('URGENT CLIENT - SMS notification required:', {
        phone: '+44 75 8521 9047',
        message: `🚨 URGENT Premium Client: ${data.firstName} ${data.lastName} (${data.timeline}) - Call ${data.phone} within 2 hours`
      })
    }

    // In a real implementation, you would:
    // 1. Send emails via your email service
    // 2. Store in your CRM with lead scoring
    // 3. Trigger SMS for urgent requests
    // 4. Create tasks in your project management system
    // 5. Assign to appropriate specialist based on requirements

    console.log('Sending premium client confirmation:', confirmationEmailData)
    console.log('Sending premium internal notification:', internalNotificationData)
    
    // Log for development
    console.log('Premium Client Consultation Request:', {
      ...data,
      clientRef,
      status: 'pending_consultation',
      assignedTeam: 'Premium Relocation',
      responseDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      priority: data.isUrgent ? 'urgent' : 'standard'
    })

    return NextResponse.json({
      success: true,
      message: 'Premium consultation request received',
      clientRef,
      responseTime: data.isUrgent ? '2 hours' : '4 hours',
      confirmationSent: true,
      premiumService: true,
      specialistAssignment: 'pending'
    })

  } catch (error) {
    console.error('Error processing premium client form:', error)
    return NextResponse.json(
      { error: 'Failed to process consultation request' },
      { status: 500 }
    )
  }
}