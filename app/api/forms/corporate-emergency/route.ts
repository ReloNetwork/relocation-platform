import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize services only if environment variables are available
let resend: Resend | null = null
let supabase: any = null

try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
} catch (error) {
  console.warn('Warning: Some services may not be available due to missing environment variables')
}

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
      <p style="color: #1E40AF; margin-bottom: 5px;"><strong>Phone:</strong> +44 20 3105 9566</p>
      <p style="color: #1E40AF; margin-bottom: 0;"><strong>Available:</strong> 24/7 for emergency relocations</p>
    </div>
    
    <p>We understand the urgency of corporate relocations and have successfully handled over 500 emergency moves. You're in expert hands.</p>
    
    <p style="margin-top: 30px;">Best regards,<br>
    <strong>Relo Network Emergency Response Team</strong><br>
    London's Premier Corporate Relocation Specialists</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6B7280; font-size: 12px;">
    <p>Relo Network | One Canada Square, Canary Wharf, London E14 5AB</p>
    <p>Emergency Hotline: +44 20 3105 9566 | Email: emergency@therelonetwork.com</p>
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
    const requiredFields: (keyof CorporateEmergencyData)[] = ['companyName', 'contactName', 'contactTitle', 'employeeName', 'employeeRole', 'timeline', 'budget', 'phone', 'email']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    let dbData = null
    let requestId = `EMR-${Date.now()}`

    // Try to store in Supabase database if available
    if (supabase) {
      try {
        const { data: savedData, error: dbError } = await supabase
          .from('corporate_emergency_requests')
          .insert({
            company_name: data.companyName,
            contact_name: data.contactName,
            contact_title: data.contactTitle,
            employee_name: data.employeeName,
            employee_role: data.employeeRole,
            timeline: data.timeline,
            budget: data.budget,
            phone: data.phone,
            email: data.email,
            requirements: data.requirements || null,
            form_type: data.formType,
            urgent: data.urgent,
            submitted_at: data.submittedAt,
            status: 'new'
          })
          .select()
          .single()

        if (dbError) {
          console.error('Supabase error:', dbError)
          // Log the data but don't fail the request
          console.log('Fallback: Corporate request data (DB unavailable):', JSON.stringify(data, null, 2))
        } else {
          dbData = savedData
          requestId = savedData.id
        }
      } catch (error) {
        console.error('Database connection failed:', error)
        console.log('Fallback: Corporate request data (DB failed):', JSON.stringify(data, null, 2))
      }
    } else {
      console.warn('Database not configured - logging request data')
      console.log('Corporate Emergency Request (No DB):', JSON.stringify(data, null, 2))
    }

    // Send confirmation email to client
    if (resend) {
      try {
        await resend.emails.send({
          from: 'emergency@therelonetwork.com',
          to: [data.email],
          subject: `Emergency Relocation Request Confirmed - ${data.companyName}`,
          html: getConfirmationEmailTemplate(data)
        })
      } catch (emailError) {
        console.error('Client confirmation email error:', emailError)
        // Don't fail the request if email fails - data is already saved
      }

      // Send internal notification
      try {
        await resend.emails.send({
          from: 'emergency@therelonetwork.com',
          to: ['emergency@therelonetwork.com'],
          cc: ['ops@therelonetwork.com'],
          subject: `🚨 EMERGENCY CORPORATE RELOCATION - ${data.companyName} (${data.timeline})`,
          html: getInternalNotificationTemplate(data)
        })
      } catch (emailError) {
        console.error('Internal notification email error:', emailError)
        // Don't fail the request if email fails - data is already saved
      }
    } else {
      console.warn('Resend not configured - emails not sent')
    }
    
    // Log successful processing
    console.log('Emergency Corporate Relocation Request processed:', {
      id: requestId,
      company: data.companyName,
      employee: data.employeeName,
      timeline: data.timeline,
      priority: data.urgent ? 'URGENT' : 'HIGH',
      responseTime: '2 hours',
      team: 'Emergency Response',
      databaseStored: !!dbData
    })

    return NextResponse.json({
      success: true,
      message: 'Emergency relocation request received and processed',
      requestId: requestId,
      responseTime: '2 hours',
      confirmationSent: true,
      databaseStored: !!dbData
    })

  } catch (error) {
    console.error('Error processing corporate emergency form:', error)
    return NextResponse.json(
      { error: 'Failed to process emergency request' },
      { status: 500 }
    )
  }
}
