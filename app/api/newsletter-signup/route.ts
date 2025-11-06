import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email, source, utm_source, content } = await req.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Store lead data (you can enhance this with your preferred system)
    const leadData = {
      email,
      source: source || 'unknown',
      utm_source: utm_source || 'direct', 
      content: content || 'General signup',
      timestamp: new Date().toISOString(),
      ip: req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    }

    // Log to console for now (replace with your preferred storage)
    console.log('New newsletter signup:', leadData)

    // You can integrate with:
    // - Mailchimp
    // - ConvertKit  
    // - Your existing CRM
    // - Supabase database
    // - Airtable
    
    // For now, we'll just simulate success
    // TODO: Replace with actual newsletter service integration
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      leadId: `lead_${Date.now()}`
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' }, 
      { status: 500 }
    )
  }
}