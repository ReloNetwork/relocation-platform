import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { fullName, companyName, originCity, destinationCity, moveDate } = await request.json()

    // Validate required fields
    if (!fullName || !companyName || !originCity || !destinationCity || !moveDate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Start a transaction-like process
    // 1. Create organization
    const { data: org, error: orgError } = await supabase
      .from('orgs')
      .insert({
        name: companyName,
        type: companyName.toLowerCase().includes('family') ? 'family' : 'corporate'
      })
      .select()
      .single()

    if (orgError) {
      console.error('Error creating org:', orgError)
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 })
    }

    // 2. Create organization membership
    const { error: membershipError } = await supabase
      .from('org_memberships')
      .insert({
        org_id: org.id,
        user_id: user.id,
        role: 'client'
      })

    if (membershipError) {
      console.error('Error creating membership:', membershipError)
      // Clean up the org if membership creation fails
      await supabase.from('orgs').delete().eq('id', org.id)
      return NextResponse.json({ error: 'Failed to create membership' }, { status: 500 })
    }

    // 3. Update user profile
    const { error: profileError } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })

    if (profileError) {
      console.error('Error updating user profile:', profileError)
    }

    // 4. Create move case
    const { data: moveCase, error: moveCaseError } = await supabase
      .from('move_cases')
      .insert({
        org_id: org.id,
        client_user_id: user.id,
        origin_city: originCity,
        destination_city: destinationCity,
        move_date: moveDate,
        status: 'planning',
        service_tier: 'managed' // Default tier
      })
      .select()
      .single()

    if (moveCaseError) {
      console.error('Error creating move case:', moveCaseError)
      return NextResponse.json({ error: 'Failed to create move case' }, { status: 500 })
    }

    // 5. Create initial tasks
    const initialTasks = [
      {
        move_case_id: moveCase.id,
        title: 'Complete relocation survey',
        description: 'Provide detailed information about your housing preferences, budget, and lifestyle requirements',
        status: 'pending' as const,
        priority: 'high' as const,
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
      },
      {
        move_case_id: moveCase.id,
        title: 'Review housing shortlist',
        description: 'Our AI concierge will prepare a curated list of properties matching your criteria',
        status: 'pending' as const,
        priority: 'high' as const,
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
      },
      {
        move_case_id: moveCase.id,
        title: 'Insurance valuation consultation',
        description: 'Schedule a consultation to assess your belongings for international moving insurance',
        status: 'pending' as const,
        priority: 'medium' as const,
        due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days from now
      }
    ]

    const { error: tasksError } = await supabase
      .from('tasks')
      .insert(initialTasks)

    if (tasksError) {
      console.error('Error creating initial tasks:', tasksError)
      // Don't fail the onboarding if tasks creation fails
    }

    return NextResponse.json({ 
      success: true, 
      orgId: org.id,
      moveCaseId: moveCase.id 
    })

  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}