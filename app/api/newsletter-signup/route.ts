import { NextRequest, NextResponse } from "next/server"
import { createServiceSupabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, source, utm_source, utm_medium, utm_campaign, content } = await req.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = createServiceSupabase()
    
    // Prepare lead data
    const leadData = {
      email,
      source: source || 'ai-talent-article',
      utm_source: utm_source || 'direct',
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      content: content || 'London Relocation Index request',
      ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown'
    }

    // Save to Supabase
    const { data: savedLead, error: dbError } = await supabase
      .from('newsletter_leads')
      .insert([leadData])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save subscription')
    }

    // Send confirmation email to subscriber
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'hello@therelonetwork.com',
        to: email,
        subject: 'Your London Relocation Index is on its way',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #0B1220; font-size: 24px; margin-bottom: 20px;">Thank you for your interest in the London Relocation Index</h1>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">Hi there,</p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              Thank you for requesting early access to the London Relocation Index. We're putting the finishing touches on the report, which includes:
            </p>
            
            <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              <li>Benchmarks on Relocation Velocity for AI and tech hires</li>
              <li>Candidate drop-off rates at each stage</li>
              <li>Time-to-productivity metrics</li>
              <li>2025 AI talent salary snapshot for London</li>
            </ul>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              You'll receive the report within the next 24-48 hours.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              In the meantime, if you're actively hiring AI talent and need help with relocations, you can:
            </p>
            
            <div style="background-color: #FEF3C7; border-left: 4px solid #C9A24A; padding: 16px; margin: 20px 0;">
              <p style="color: #92400E; font-size: 14px; margin: 0;">
                <strong>Book a 20-Minute London Landing Briefing</strong><br>
                Learn how we relocate AI talent from Silicon Valley to London in 7 days.<br>
                <a href="https://therelonetwork.com/ai-talent-assessment" style="color: #C9A24A; font-weight: bold; text-decoration: none;">Start your assessment →</a>
              </p>
            </div>
            
            <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
              Best regards,<br>
              The Relo Network Team<br>
              <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
            </p>
          </div>
        `
      })

      // Update confirmation sent timestamp
      await supabase
        .from('newsletter_leads')
        .update({ 
          confirmed: true,
          confirmation_sent_at: new Date().toISOString() 
        })
        .eq('id', savedLead.id)

    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't throw - we still saved the lead
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'hello@therelonetwork.com',
        to: 'hello@therelonetwork.com', // Admin email
        reply_to: email,
        subject: `New London Relocation Index Request - ${email}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <h2 style="color: #0B1220; margin-bottom: 20px;">New Index Request</h2>
            
            <div style="background-color: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>Source:</strong> ${leadData.source}</p>
              <p style="margin: 8px 0;"><strong>Content:</strong> ${leadData.content}</p>
              <p style="margin: 8px 0;"><strong>UTM Source:</strong> ${leadData.utm_source}</p>
              ${leadData.utm_campaign ? `<p style="margin: 8px 0;"><strong>UTM Campaign:</strong> ${leadData.utm_campaign}</p>` : ''}
              <p style="margin: 8px 0;"><strong>IP Address:</strong> ${leadData.ip_address}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            </div>
            
            <div style="background-color: #FEF3C7; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; color: #92400E;"><strong>Action Required:</strong> Send the London Relocation Index report to this lead within 24-48 hours.</p>
            </div>
            
            <p style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Your%20London%20Relocation%20Index%20Report" 
                 style="display: inline-block; background-color: #C9A24A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
                Reply to Lead
              </a>
            </p>
          </div>
        `
      })
    } catch (notificationError) {
      console.error('Failed to send admin notification:', notificationError)
      // Don't throw - this is not critical
    }

    console.log('New newsletter signup saved:', savedLead.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for confirmation.',
      leadId: savedLead.id
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' }, 
      { status: 500 }
    )
  }
}