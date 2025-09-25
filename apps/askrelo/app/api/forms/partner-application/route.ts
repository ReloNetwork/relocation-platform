import { NextRequest, NextResponse } from 'next/server'

interface PartnerApplicationData {
  companyName: string
  serviceType: string
  contactName: string
  contactTitle: string
  phone: string
  email: string
  website: string
  territory: string
  monthlyLeads: string
  marketingSpend: string
  experience: string
  whyPartner: string
  preferredTier: string
  formType: string
  submittedAt: string
}

// Email template for partner confirmation
const getPartnerConfirmationTemplate = (data: PartnerApplicationData) => {
  const tierPricing = {
    'founding_partner': { name: 'Founding Partner', price: '£25,000 (12 months)', originalPrice: '', discount: 'Charter Rate' },
    'premium_sponsor': { name: 'Premium Sponsor', price: '£5,000 (90 days)', originalPrice: '', discount: 'Charter Rate' }
  }
  
  const selectedTier = tierPricing[data.preferredTier as keyof typeof tierPricing]
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Partner Application Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #C9A24A 0%, #0B1B2B 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Relo Network</h1>
    <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">London's Most Exclusive Partner Network</p>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #0B1B2B; margin-top: 0;">Dear ${data.contactName},</h2>
    
    <p>Congratulations! Your partnership application for <strong>${data.companyName}</strong> has been received and is now under review by our Partner Board.</p>
    
    <div style="background: #EFF6FF; border: 1px solid #DBEAFE; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1E40AF; margin-top: 0;">🎉 Founding Partner Opportunity</h3>
      <p style="color: #1E40AF; margin-bottom: 10px;">You've applied during our founding partner period and qualify for exclusive benefits:</p>
      <ul style="color: #1E40AF; margin-bottom: 0;">
        <li><strong>${selectedTier?.discount}</strong> for the first 6 months</li>
        <li>Priority lead distribution</li>
        <li>Enhanced profile featuring</li>
        <li>Dedicated onboarding support</li>
      </ul>
    </div>
    
    <h3 style="color: #0B1B2B;">Application Summary:</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.companyName}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Service Type:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.serviceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Territory:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.territory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Preferred Tier:</td>
        <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>${selectedTier?.name}</strong> - ${selectedTier?.price}</td>
      </tr>
    </table>
    
    <h3 style="color: #0B1B2B;">Review Process Timeline:</h3>
    <ol style="color: #6B7280;">
      <li><strong>Application Review (24 hours):</strong> Our team evaluates your application</li>
      <li><strong>Verification Process (2-3 days):</strong> We verify credentials and references</li>
      <li><strong>Partner Board Review (1 week):</strong> Final approval by our Partner Board</li>
      <li><strong>Onboarding (Immediately after approval):</strong> Welcome call and system setup</li>
    </ol>
    
    <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h4 style="color: #166534; margin-top: 0;">📞 What's Next?</h4>
      <p style="color: #166534; margin-bottom: 5px;">Our Partner Relations team will contact you at <strong>${data.phone}</strong> within 24 hours to:</p>
      <ul style="color: #166534; margin-bottom: 0;">
        <li>Discuss your application in detail</li>
        <li>Answer any questions about the partnership</li>
        <li>Schedule your onboarding call</li>
        <li>Secure your founding partner benefits</li>
      </ul>
    </div>
    
    <h3 style="color: #0B1B2B;">Why Partner with Relo Network?</h3>
    <ul style="color: #6B7280;">
      <li><strong>Exclusive Network:</strong> Only 23% of applications are approved</li>
      <li><strong>High-Value Leads:</strong> All relocations worth £8,500+ on average</li>
      <li><strong>Perfect Matching:</strong> AI-powered client-partner matching</li>
      <li><strong>Guaranteed Results:</strong> Partners report average 340% ROI</li>
    </ul>
    
    <p style="margin-top: 30px;">We're excited about the possibility of welcoming ${data.companyName} to our exclusive network of premium service providers.</p>
    
    <p>Best regards,<br>
    <strong>Relo Network Partner Relations Team</strong><br>
    London's Premier Partner Network</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6B7280; font-size: 12px;">
    <p>Relo Network | One Canada Square, Canary Wharf, London E14 5AB</p>
    <p>Partner Line: +44 20 7946 0960 | Email: partners@relo-network.com</p>
  </div>
</body>
</html>
`}

// Internal partner notification template
const getPartnerInternalTemplate = (data: PartnerApplicationData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>🤝 NEW PARTNER APPLICATION - ${data.companyName}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="background: #C9A24A; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🤝 NEW PARTNER APPLICATION</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">${data.companyName} - ${data.serviceType.replace('-', ' ').toUpperCase()}</p>
  </div>
  
  <div style="padding: 20px; background: white;">
    <h2 style="color: #C9A24A;">Application Details</h2>
    <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString('en-GB')}</p>
    
    <h3>Company Information:</h3>
    <ul>
      <li><strong>Company:</strong> ${data.companyName}</li>
      <li><strong>Service Type:</strong> ${data.serviceType.replace('-', ' ')}</li>
      <li><strong>Website:</strong> ${data.website || 'Not provided'}</li>
      <li><strong>Preferred Territory:</strong> ${data.territory.replace('-', ' ')}</li>
      <li><strong>Preferred Tier:</strong> ${data.preferredTier.charAt(0).toUpperCase() + data.preferredTier.slice(1)} Partnership</li>
    </ul>
    
    <h3>Contact Information:</h3>
    <ul>
      <li><strong>Contact:</strong> ${data.contactName} (${data.contactTitle})</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Email:</strong> ${data.email}</li>
    </ul>
    
    <h3>Business Profile:</h3>
    <ul>
      <li><strong>Expected Monthly Leads:</strong> ${data.monthlyLeads}</li>
      <li><strong>Current Marketing Spend:</strong> ${data.marketingSpend}</li>
    </ul>
    
    ${data.experience ? `<h3>Experience:</h3><p>${data.experience}</p>` : ''}
    ${data.whyPartner ? `<h3>Why Partner with Relo Network:</h3><p>${data.whyPartner}</p>` : ''}
    
    <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
      <h4 style="color: #92400E; margin-top: 0;">NEXT ACTIONS:</h4>
      <ol style="color: #92400E; margin-bottom: 0;">
        <li>Review application and company website</li>
        <li>Contact ${data.contactName} at ${data.phone} within 24 hours</li>
        <li>Schedule partner evaluation call</li>
        <li>Verify credentials and references</li>
        <li>Present to Partner Board for approval</li>
      </ol>
    </div>
  </div>
</body>
</html>
`

export async function POST(request: NextRequest) {
  try {
    const data: PartnerApplicationData = await request.json()
    
    // Validate required fields
    const requiredFields = ['companyName', 'serviceType', 'contactName', 'contactTitle', 'phone', 'email', 'territory', 'monthlyLeads', 'marketingSpend', 'preferredTier']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Send confirmation email to partner applicant
    const confirmationEmailData = {
      to: data.email,
      subject: `Partner Application Received - ${data.companyName}`,
      html: getPartnerConfirmationTemplate(data)
    }

    // Send internal notification
    const internalNotificationData = {
      to: 'partners@relo-network.com',
      cc: 'ops@relo-network.com',
      subject: `🤝 NEW PARTNER APPLICATION - ${data.companyName} (${data.serviceType})`,
      html: getPartnerInternalTemplate(data)
    }

    // For Stripe integration (founding rate special), you would:
    // 1. Create a Stripe checkout session with discounted pricing
    // 2. Include the checkout URL in response
    // 3. Handle webhook for successful payment
    
    // Simulate Stripe checkout creation for founding partners
    const stripeCheckoutUrl = `https://checkout.stripe.com/pay/cs_test_partner_${data.preferredTier}_${Date.now()}`

    // In a real implementation, you would:
    // 1. Send emails via your email service
    // 2. Store in your CRM/database
    // 3. Create Stripe checkout session
    // 4. Trigger partner evaluation workflow

    console.log('Sending partner confirmation email:', confirmationEmailData)
    console.log('Sending partner internal notification:', internalNotificationData)
    
    // Log for development
    console.log('Partner Application Received:', {
      ...data,
      applicationId: `PA-${Date.now()}`,
      status: 'pending_review',
      reviewDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Partner application received and under review',
      applicationId: `PA-${Date.now()}`,
      reviewTime: '24 hours',
      confirmationSent: true,
      foundingBenefits: true,
      // Uncomment to redirect to Stripe checkout
      // checkoutUrl: stripeCheckoutUrl
    })

  } catch (error) {
    console.error('Error processing partner application:', error)
    return NextResponse.json(
      { error: 'Failed to process partner application' },
      { status: 500 }
    )
  }
}