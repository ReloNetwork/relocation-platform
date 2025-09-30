import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = '/dashboard' // Always redirect to dashboard after successful auth

  console.log('Auth callback received:', { 
    code: !!code, 
    origin, 
    next, 
    fullUrl: request.url,
    searchParams: Object.fromEntries(searchParams.entries())
  })

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data?.user && data?.session) {
      console.log('Auth successful for user:', data.user.email)
      console.log('Session established:', { 
        sessionId: data.session.access_token.substring(0, 10) + '...', 
        expiresAt: data.session.expires_at 
      })
      
      // Auto-create user profile and organization if needed
      try {
        await ensureUserProfile(supabase, data.user)
      } catch (profileError) {
        console.error('Profile creation error:', profileError)
        // Continue anyway - user can still access basic features
      }

      // Determine redirect URL
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      let redirectUrl = ''
      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`
      } else if (forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`
      } else {
        redirectUrl = `${origin}${next}`
      }

      console.log('Redirecting to:', redirectUrl)
      
      // Create response with redirect and ensure cookies are set
      const response = NextResponse.redirect(redirectUrl)
      
      // Ensure auth cookies are properly set by refreshing the session
      await supabase.auth.getSession()
      
      return response
    } else {
      console.error('Auth exchange failed:', { error, hasUser: !!data?.user, hasSession: !!data?.session })
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