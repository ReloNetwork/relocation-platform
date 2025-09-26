import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name, source, utmSource, utmMedium, utmCampaign } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // For now, we'll simulate successful subscription
    // In production, integrate with your preferred email service
    console.log('Newsletter subscription:', {
      email,
      name,
      source: source || 'website',
      utmSource: utmSource || 'website',
      utmMedium: utmMedium || 'organic',
      utmCampaign,
      subscription_date: new Date().toISOString(),
      source_page: source,
    })

    // Simulate successful subscription
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to The Relo Network News!'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Newsletter subscription endpoint',
    endpoint: 'POST /api/newsletter/subscribe',
    required_fields: ['email'],
    optional_fields: ['name', 'source', 'utmSource', 'utmMedium', 'utmCampaign']
  })
}