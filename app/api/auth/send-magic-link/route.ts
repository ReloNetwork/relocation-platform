import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, redirectTo } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Generate magic link using Supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${request.nextUrl.origin}/auth/callback?next=/dashboard`,
        shouldCreateUser: true
      }
    })

    if (error) {
      console.error('Supabase magic link error:', error)
      
      // If it's an email sending error, try manual approach
      if (error.message.includes('email') || error.message.includes('SMTP')) {
        // For now, return success - you'll need to manually add users or configure SMTP
        return NextResponse.json({ 
          message: 'Magic link request received. Please contact support@askrelo.com for manual account setup.',
          requiresManualSetup: true 
        })
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      message: 'Magic link sent! Check your email.',
      success: true 
    })

  } catch (error) {
    console.error('Magic link API error:', error)
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    )
  }
}