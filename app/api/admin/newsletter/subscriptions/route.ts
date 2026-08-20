import { NextRequest, NextResponse } from 'next/server'
import { getNewsletterSubscriptions, getNewsletterCount } from '@/lib/newsletter-storage'
import { hasBasicAdminAccess } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  // SECURITY: Require authentication for admin endpoint
  if (!hasBasicAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
  }

  try {
    // Get newsletter subscriptions
    const result = await getNewsletterSubscriptions()
    const count = await getNewsletterCount()

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch subscriptions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      total: count
    })

  } catch (error) {
    console.error('Admin newsletter fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
