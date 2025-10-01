import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/demo-dashboard'

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data?.user && data?.session) {
      // Ensure user has organization setup
      await ensureUserOrganization(supabase, data.user)
      
      // Redirect to intended destination
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If auth fails, redirect to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

// Helper function to ensure user has required organization setup
async function ensureUserOrganization(supabase: any, user: any) {
  // Check if user already has an organization
  const { data: existingMembership } = await supabase
    .from('org_memberships')
    .select('org_id')
    .eq('user_id', user.id)
    .single()

  if (!existingMembership) {
    // Create organization for new user
    const { data: org, error: orgError } = await supabase
      .from('orgs')
      .insert({
        name: `${user.email?.split('@')[0] || 'Client'} Organization`,
        type: 'individual'
      })
      .select()
      .single()

    if (!orgError && org) {
      // Add user to organization
      await supabase
        .from('org_memberships')
        .insert({
          user_id: user.id,
          org_id: org.id,
          role: 'client'
        })
    }
  }
}