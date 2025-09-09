import { NextRequest, NextResponse } from 'next/server'

interface CorporateEmergencyData {
  companyName: string
  contactName: string
  contactTitle: string
  employeeName: string
  employeeRole: string
  timeline: string
  budget: string
  phone: string
  email: string
  requirements: string
  formType: string
  submittedAt: string
  urgent: boolean
}

// Email template for confirmation
const getConfirmationEmailTemplate = (data: CorporateEmergencyData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emergency Relocation Request Confirmed</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0B1B2B 0%, #C9A24A 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Emergency Request Received</h1>
    <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">We're mobilizing our emergency response team</p>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #0B1B2B; margin-top: 0;">Dear ${data.contactName},</h2>
    
    <p>Your emergency corporate relocation request has been received and prioritized. Our emergency response team is already mobilizing to assist with <strong>${data.employeeName}'s</strong> urgent relocation needs.</p>
    
    <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
      <h3 style="color: #92400E; margin-top: 0;">⚡ Emergency Response Activated</h3>
      <p style="color: #92400E; margin-bottom: 0;">Our emergency relocation specialist will contact you at <strong>${data.phone}</strong> within 2 hours to discuss immediate next steps.</p>
    </div>
    
    <h3 style="color: #0B1B2B;">Request Summary:</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.companyName}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Employee:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.employeeName} (${data.employeeRole})</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Timeline:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb; color: ${data.urgent ? '#DC2626' : '#059669'}; font-weight: bold;">${data.timeline}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Budget:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.budget}</td>
      </tr>
    </table>
    
    <h3 style="color: #0B1B2B;">Immediate Next Steps:</h3>
    <ol style="color: #6B7280;">
      <li><strong>Emergency Contact (Within 2 hours):</strong> Our specialist will call ${data.phone}</li>
      <li><strong>Emergency Plan (Within 4 hours):</strong> Detailed relocation strategy delivered</li>
      <li><strong>Property Shortlist (Within 24 hours):</strong> Curated urgent-available properties</li>
      <li><strong>Viewing Coordination:</strong> Same-day or next-day property viewings arranged</li>
    </ol>
    
    <div style="background: #EFF6FF; border: 1px solid #DBEAFE; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h4 style="color: #1E40AF; margin-top: 0;">🚨 Emergency Hotline</h4>
      <p style="color: #1E40AF; margin-bottom: 5px;"><strong>Phone:</strong> +44 20 7946 0958</p>
      <p style="color: #1E40AF; margin-bottom: 0;"><strong>Available:</strong> 24/7 for emergency relocations</p>
    </div>
    
    <p>We understand the urgency of corporate relocations and have successfully handled over 500 emergency moves. You're in expert hands.</p>
    
    <p style="margin-top: 30px;">Best regards,<br>
    <strong>Relo Network Emergency Response Team</strong><br>
    London's Premier Corporate Relocation Specialists</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6B7280; font-size: 12px;">
    <p>Relo Network | One Canada Square, Canary Wharf, London E14 5AB</p>
    <p>Emergency Hotline: +44 20 7946 0958 | Email: emergency@relo-network.com</p>
  </div>
</body>
</html>
`

// Internal notification email template
const getInternalNotificationTemplate = (data: CorporateEmergencyData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>🚨 EMERGENCY CORPORATE RELOCATION REQUEST</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #DC2626; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🚨 EMERGENCY CORPORATE RELOCATION</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">IMMEDIATE ACTION REQUIRED</p>
  </div>
  
  <div style="padding: 20px; background: white;">
    <h2 style="color: #DC2626;">Priority: ${data.urgent ? 'URGENT' : 'HIGH'}</h2>
    <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString('en-GB')}</p>
    
    <h3>Company Information:</h3>
    <ul>
      <li><strong>Company:</strong> ${data.companyName}</li>
      <li><strong>Contact:</strong> ${data.contactName} (${data.contactTitle})</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Email:</strong> ${data.email}</li>
    </ul>
    
    <h3>Employee Details:</h3>
    <ul>
      <li><strong>Employee:</strong> ${data.employeeName}</li>
      <li><strong>Role:</strong> ${data.employeeRole}</li>
      <li><strong>Timeline:</strong> ${data.timeline}</li>
      <li><strong>Budget:</strong> ${data.budget}</li>
    </ul>
    
    ${data.requirements ? `<h3>Special Requirements:</h3><p>${data.requirements}</p>` : ''}
    
    <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
      <h4 style="color: #92400E; margin-top: 0;">ACTION REQUIRED:</h4>
      <p style="color: #92400E; margin-bottom: 0;">Contact ${data.contactName} at ${data.phone} within 2 hours.</p>
    </div>
  </div>
</body>
</html>
`

export async function POST(request: NextRequest) {
  try {
    const data: CorporateEmergencyData = await request.json()
    
    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'contactTitle', 'employeeName', 'employeeRole', 'timeline', 'budget', 'phone', 'email']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Send confirmation email to client
    const confirmationEmailData = {
      to: data.email,
      subject: `Emergency Relocation Request Confirmed - ${data.companyName}`,
      html: getConfirmationEmailTemplate(data)
    }

    // Send internal notification
    const internalNotificationData = {
      to: 'emergency@relo-network.com',
      cc: 'ops@relo-network.com',
      subject: `🚨 EMERGENCY CORPORATE RELOCATION - ${data.companyName} (${data.timeline})`,
      html: getInternalNotificationTemplate(data)
    }

    // In a real implementation, you would:
    // 1. Send emails via your email service (SendGrid, Mailgun, etc.)
    // 2. Store in your CRM/database
    // 3. Trigger SMS notifications for urgent requests
    // 4. Create tasks in your project management system

    // Simulate email sending
    console.log('Sending confirmation email:', confirmationEmailData)
    console.log('Sending internal notification:', internalNotificationData)
    
    // Log to console for development
    console.log('Emergency Corporate Relocation Request:', {
      ...data,
      priority: data.urgent ? 'URGENT' : 'HIGH',
      responseTime: '2 hours',
      team: 'Emergency Response'
    })

    return NextResponse.json({
      success: true,
      message: 'Emergency relocation request received and processed',
      requestId: `EMR-${Date.now()}`,
      responseTime: '2 hours',
      confirmationSent: true
    })

  } catch (error) {
    console.error('Error processing corporate emergency form:', error)
    return NextResponse.json(
      { error: 'Failed to process emergency request' },
      { status: 500 }
    )
  }
}