import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/beehiiv'

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

    const result = await subscribeToNewsletter(email, {
      name,
      source: source || 'website',
      utmSource: utmSource || 'website',
      utmMedium: utmMedium || 'organic',
      utmCampaign,
      customFields: {
        subscription_date: new Date().toISOString(),
        source_page: source,
      }
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to The London Relocation Report!'
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