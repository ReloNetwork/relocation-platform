import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { event, properties } = await request.json()
    const supabase = createClient()

    // Store analytics event in database
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_name: event,
        properties: properties || {},
        created_at: new Date().toISOString(),
        session_id: properties?.session_id || null,
        user_id: properties?.user_id || null
      })

    if (error) {
      console.error('Analytics storage error:', error)
    }

    // Send to external analytics services
    await Promise.allSettled([
      // Mixpanel
      fetch('https://api.mixpanel.com/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{
          event,
          properties: {
            ...properties,
            token: process.env.MIXPANEL_TOKEN,
            time: Math.floor(Date.now() / 1000)
          }
        }])
      }),
      
      // PostHog
      process.env.POSTHOG_API_KEY && fetch('https://app.posthog.com/capture/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.POSTHOG_API_KEY,
          event,
          properties: {
            ...properties,
            timestamp: new Date().toISOString()
          },
          distinct_id: properties?.user_id || properties?.session_id || 'anonymous'
        })
      })
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}