import { NextRequest, NextResponse } from 'next/server'
import { getNewsletterSubscriptions, getNewsletterCount } from '@/lib/newsletter-storage'

// Security: Basic Auth check for admin endpoints
function checkBasicAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  
  const [type, value] = auth.split(" ");
  if (type !== "Basic" || !value) return false;
  
  try {
    const [user, pass] = atob(value).split(":");
    return user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  // SECURITY: Require authentication for admin endpoint
  if (!checkBasicAuth(request)) {
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