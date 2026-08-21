import { NextRequest, NextResponse } from 'next/server'
import { storeNewsletterSubscription } from '@/lib/newsletter-storage'

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

    // Store the subscription in Supabase
    const result = await storeNewsletterSubscription({
      email,
      name,
      source: source || 'website',
      utm_source: utmSource || 'website',
      utm_medium: utmMedium || 'organic',
      utm_campaign: utmCampaign,
      subscription_date: new Date().toISOString(),
      source_page: source,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 503 },
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
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
