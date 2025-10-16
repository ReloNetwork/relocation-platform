import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { email, password, tier, loginUrl } = await req.json()

    if (!email || !password || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const tierNames = {
      family: 'Premium Family Access',
      campaign: 'Agency Campaign License',
      professional: 'Premium Data License',
      founding: 'Founding Partner Bundle'
    }

    const tierFeatures = {
      family: ['Interactive directory access (web portal)', 'AI-powered school matching', 'Direct contact details for 3 recommended schools', '30-day access + 1 concierge consultation call', 'Downloadable comparison reports'],
      campaign: ['Single-use campaign data extract', 'Segmented by region or school type', '90-day access window', 'Email/direct mail formatted data', 'GDPR compliance documentation'],
      professional: ['Complete database: 200+ top prep/public schools', 'Structured data (CSV/Excel + API access)', '6-month update guarantee', 'Non-exclusive commercial use rights', 'Technical integration support'],
      founding: ['Category-exclusive Founding Partner status', 'Unlimited access to UK Elite Schools Directory 2026', 'Quarterly updates for 12 months', 'Co-branded integration on Relo Network education pages', 'Warm introductions to all Relo Network clients requiring school placement', 'Featured editorial in Relo Network News (2,500+ subscribers)']
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <div style="background: #0B1B2B; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 32px;">Relo Network</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">UK Elite Schools Directory 2026</p>
        </div>
        
        <div style="padding: 40px 30px; background: white;">
          <h2 style="color: #0B1B2B; margin-bottom: 20px;">Welcome to the UK Elite Schools Directory 2026!</h2>
          
          <p style="color: #6B7280; margin-bottom: 25px;">
            Your payment has been processed successfully and your account is now active. 
            You have purchased <strong>${tierNames[tier as keyof typeof tierNames]}</strong>.
          </p>

          <div style="background: #F8F9FA; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #0B1B2B; margin-top: 0;">Your Login Credentials</h3>
            <p style="margin: 10px 0;"><strong>Email:</strong> <code style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px;">${email}</code></p>
            <p style="margin: 10px 0;"><strong>Password:</strong> <code style="background: #E5E7EB; padding: 4px 8px; border-radius: 4px;">${password}</code></p>
            <p style="margin: 15px 0 0 0;">
              <a href="${loginUrl}" style="background: #C9A24A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Access Database Now
              </a>
            </p>
          </div>

          <div style="margin: 25px 0;">
            <h3 style="color: #0B1B2B;">Your ${tierNames[tier as keyof typeof tierNames]} includes:</h3>
            <ul style="color: #6B7280; padding-left: 20px;">
              ${tierFeatures[tier as keyof typeof tierFeatures].map(feature => 
                `<li style="margin: 8px 0;">${feature}</li>`
              ).join('')}
            </ul>
          </div>

          <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h4 style="color: #92400E; margin-top: 0;">Important:</h4>
            <p style="color: #92400E; margin: 8px 0;">• Save these credentials safely</p>
            <p style="color: #92400E; margin: 8px 0;">• You can reset your password if needed</p>
            <p style="color: #92400E; margin: 8px 0;">• Contact education@therelonetwork.com for support</p>
          </div>

          <p style="color: #6B7280; margin-top: 30px;">
            Thank you for choosing Relo Network's UK Schools Database. We're here to help with your educational research needs.
          </p>

          <p style="color: #6B7280; margin-top: 20px;">
            Best regards,<br>
            The Relo Network Team
          </p>
        </div>

        <div style="background: #F3F4F6; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
          <p style="margin: 0;">Relo Network Ltd | London's Premier Executive Relocation Platform</p>
          <p style="margin: 5px 0 0 0;">
            <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
          </p>
        </div>
      </div>
    `

    const emailData = await resend.emails.send({
      from: 'Relo Network Education <hello@therelonetwork.com>',
      to: email,
      subject: `Welcome to UK Elite Schools Directory 2026 - Your ${tierNames[tier as keyof typeof tierNames]} Account`,
      html: emailHtml,
      replyTo: 'education@therelonetwork.com'
    })

    if (emailData.error) {
      throw new Error(`Resend API error: ${emailData.error.message}`)
    }

    console.log('Education credentials email sent:', emailData.data?.id)

    return NextResponse.json({ 
      success: true, 
      messageId: emailData.data?.id,
      message: 'Credentials email sent successfully'
    })

  } catch (error: any) {
    console.error('Send credentials email error:', error)
    return NextResponse.json({ 
      error: 'Failed to send credentials email', 
      details: error.message 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Education credentials email endpoint',
    endpoint: 'POST /api/education/send-credentials',
    required_fields: ['email', 'password', 'tier', 'loginUrl'],
    note: 'Sends login credentials to user after payment'
  })
}