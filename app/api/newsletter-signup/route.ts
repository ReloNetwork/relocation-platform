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
        subject: "You're in – London Relocation Index early access",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              <strong>Thank you for joining the early access list for the London Relocation Index.</strong>
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              We're currently interviewing HR / People leaders and AI talent relocating into London to benchmark three things:
            </p>
            
            <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              <li><strong>Relocation Velocity</strong> - days from offer accepted to fully productive in London</li>
              <li><strong>Candidate drop-off</strong> - during relocation</li>
              <li><strong>Time to feel settled</strong> - for executives and their families</li>
            </ul>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              Over the next few weeks, we'll share:
            </p>
            
            <ol style="color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              <li>A short Index preview with early benchmarks</li>
              <li>A simple Relocation Velocity self-assessment you can run on your own process</li>
              <li>An invite to a small roundtable for AI/tech HR leaders hiring into London</li>
            </ol>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              If you're happy to contribute data (anonymised), just hit reply with:
            </p>
            
            <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              <li>How many AI/tech hires you're bringing into London in the next 12 months</li>
              <li>Your biggest headache in relocating them</li>
            </ul>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
              We'll keep you posted as soon as the preview is ready.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 8px;">
              Best regards,
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 8px;">
              The Relo Network Team
            </p>
            <p style="margin-bottom: 0;">
              <a href="https://therelonetwork.com" style="color: #C9A24A; text-decoration: none;">therelonetwork.com</a>
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