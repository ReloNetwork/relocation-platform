import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Auth callback received:', { 
    code: !!code, 
    origin, 
    next, 
    fullUrl: request.url,
    searchParams: Object.fromEntries(searchParams.entries()),
    allParams: Array.from(searchParams.entries())
  })

  if (code) {
    console.log('🔑 Processing auth code:', code.substring(0, 10) + '...')
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log('🔄 Exchange result:', { 
      hasData: !!data, 
      hasUser: !!data?.user, 
      hasSession: !!data?.session,
      error: error?.message 
    })
    
    if (!error && data?.user && data?.session) {
      console.log('🔐 Auth successful for user:', data.user.email)
      console.log('📋 Session established:', { 
        sessionId: data.session.access_token.substring(0, 10) + '...', 
        expiresAt: data.session.expires_at 
      })
      
      // Skip organization creation - do it later in dashboard
      // Focus on getting the redirect to work first
      
      // HARDCODE dashboard redirect to avoid any URL issues
      const isDev = process.env.NODE_ENV === 'development'
      const redirectUrl = isDev 
        ? 'http://localhost:3000/dashboard'
        : 'https://therelonetwork.com/dashboard'
      console.log('🎯 HARDCODED redirect to dashboard:', redirectUrl)
      
      // Create response with redirect
      const response = NextResponse.redirect(redirectUrl)
      
      // Ensure auth cookies are properly set
      await supabase.auth.getSession()
      
      return response
    } else {
      console.error('❌ Auth exchange failed:', { error: error?.message, hasUser: !!data?.user, hasSession: !!data?.session })
      
      // Try to get existing session as fallback
      console.log('🔄 Attempting fallback session check...')
      const { data: sessionData } = await supabase.auth.getSession()
      
      if (sessionData?.session?.user) {
        console.log('✅ Found existing session, redirecting anyway')
        const redirectUrl = `${origin}/dashboard`
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  // return the user to an error page with instructions
  console.log('Auth failed, redirecting to error page')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

// Helper function to ensure user has required profile data
async function ensureUserProfile(supabase: any, user: any) {
  console.log('Checking organization for user:', user.email)
  
  // Check if user already has an organization
  const { data: existingMembership, error: membershipError } = await supabase
    .from('org_memberships')
    .select('org_id')
    .eq('user_id', user.id)
    .single()

  console.log('Existing membership check:', { existingMembership, membershipError })

  if (!existingMembership) {
    console.log('Creating new organization for user:', user.email)
    
    // Create organization for new user
    const { data: org, error: orgError } = await supabase
      .from('orgs')
      .insert({
        name: `${user.email?.split('@')[0] || 'Client'} Organization`
      })
      .select()
      .single()

    console.log('Organization creation result:', { org, orgError })

    if (!orgError && org) {
      // Add user to organization
      const { data: membership, error: membershipInsertError } = await supabase
        .from('org_memberships')
        .insert({
          user_id: user.id,
          org_id: org.id,
          role: 'client'
        })
        .select()
        .single()

      console.log('Membership creation result:', { membership, membershipInsertError })

      if (!membershipInsertError) {
        console.log('Successfully created org and membership for user:', user.email)
      } else {
        console.error('Failed to create membership:', membershipInsertError)
        throw new Error(`Failed to create user membership: ${membershipInsertError.message}`)
      }
    } else {
      console.error('Failed to create organization:', orgError)
      throw new Error(`Failed to create organization: ${orgError?.message}`)
    }
  } else {
    console.log('User already has organization membership')
  }
}