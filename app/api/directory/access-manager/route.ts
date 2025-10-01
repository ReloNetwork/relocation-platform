import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface AccessUpdateData {
  userId?: string
  email: string
  accessTier: 'free' | 'premium' | 'vip'
  subscriptionStatus?: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  companyName?: string
}

// Define access permissions for each tier
const ACCESS_PERMISSIONS = {
  free: {
    canViewContactDetails: false,
    canViewPricing: false,
    canViewReviews: true,
    canContactDirectly: false,
    canRequestQuotes: true,
    monthlyContactLimit: 3,
    accessibleCategories: ['all'],
    maxSearchResults: 10,
    canViewPremiumPartners: false
  },
  premium: {
    canViewContactDetails: true,
    canViewPricing: true,
    canViewReviews: true,
    canContactDirectly: true,
    canRequestQuotes: true,
    monthlyContactLimit: 25,
    accessibleCategories: ['all'],
    maxSearchResults: 50,
    canViewPremiumPartners: true
  },
  vip: {
    canViewContactDetails: true,
    canViewPricing: true,
    canViewReviews: true,
    canContactDirectly: true,
    canRequestQuotes: true,
    monthlyContactLimit: 100,
    accessibleCategories: ['all'],
    maxSearchResults: 200,
    canViewPremiumPartners: true,
    hasPersonalAccountManager: true,
    prioritySupport: true
  }
}

export async function POST(request: NextRequest) {
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      success: true,
      message: 'Mock access manager response'
    })
  }

  try {
    const { action, ...data } = await request.json()

    switch (action) {
      case 'update_access':
        return await updateClientAccess(data)
      case 'get_access':
        return await getClientAccess(data)
      case 'filter_partners':
        return await filterPartnersByAccess(data)
      case 'check_contact_limit':
        return await checkContactLimit(data)
      case 'record_contact':
        return await recordPartnerContact(data)
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Access manager error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function updateClientAccess(data: AccessUpdateData) {
  const permissions = ACCESS_PERMISSIONS[data.accessTier]
  
  // Check if client access record exists
  const { data: existingAccess } = await supabase
    .from('client_access_levels')
    .select('*')
    .eq('email', data.email)
    .single()

  if (existingAccess) {
    // Update existing access
    const { data: updated, error } = await supabase
      .from('client_access_levels')
      .update({
        access_tier: data.accessTier,
        subscription_status: data.subscriptionStatus || 'active',
        stripe_customer_id: data.stripeCustomerId,
        stripe_subscription_id: data.stripeSubscriptionId,
        company_name: data.companyName,
        ...permissions,
        subscription_start_date: data.subscriptionStatus === 'active' ? new Date().toISOString() : existingAccess.subscription_start_date,
        updated_at: new Date().toISOString()
      })
      .eq('email', data.email)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to update access' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      accessLevel: updated,
      permissions: permissions 
    })
  } else {
    // Create new access record
    const { data: created, error } = await supabase
      .from('client_access_levels')
      .insert({
        user_id: data.userId || '',
        email: data.email,
        access_tier: data.accessTier,
        subscription_status: data.subscriptionStatus || 'active',
        stripe_customer_id: data.stripeCustomerId,
        stripe_subscription_id: data.stripeSubscriptionId,
        company_name: data.companyName,
        ...permissions,
        subscription_start_date: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create access' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      accessLevel: created,
      permissions: permissions 
    })
  }
}

async function getClientAccess(data: { email: string }) {
  const { data: access, error } = await supabase
    .from('client_access_levels')
    .select('*')
    .eq('email', data.email)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    return NextResponse.json({ error: 'Failed to get access' }, { status: 500 })
  }

  // If no access record exists, return free tier permissions
  const accessTier = access?.access_tier || 'free'
  const permissions = ACCESS_PERMISSIONS[accessTier as keyof typeof ACCESS_PERMISSIONS]

  return NextResponse.json({
    success: true,
    accessLevel: access || { access_tier: 'free', email: data.email },
    permissions: permissions
  })
}

async function filterPartnersByAccess(data: { 
  email: string, 
  category?: string, 
  location?: string, 
  searchTerm?: string,
  limit?: number,
  offset?: number 
}) {
  // Get client access level
  const { data: access } = await supabase
    .from('client_access_levels')
    .select('*')
    .eq('email', data.email)
    .single()

  const accessTier = access?.access_tier || 'free'
  const permissions = ACCESS_PERMISSIONS[accessTier as keyof typeof ACCESS_PERMISSIONS]

  // Build query based on access level
  let query = supabase
    .from('partners')
    .select(`
      id, partner_id, company_name, business_description, 
      primary_location, service_areas, industry_category, 
      service_categories, specializations, pricing_tier,
      client_rating, total_reviews, quality_score,
      visibility_level, access_tiers,
      ${permissions.canViewContactDetails ? 'contact_email, contact_phone, website,' : ''}
      ${permissions.canViewPricing ? 'minimum_project_value, maximum_project_value,' : ''}
      created_at
    `)
    .eq('approval_status', 'approved')
    .contains('access_tiers', [accessTier])

  // Apply filters
  if (data.category && data.category !== 'all') {
    query = query.eq('industry_category', data.category)
  }

  if (data.location) {
    query = query.or(`primary_location.ilike.%${data.location}%,service_areas.cs.{${data.location}}`)
  }

  if (data.searchTerm) {
    query = query.or(`
      company_name.ilike.%${data.searchTerm}%,
      business_description.ilike.%${data.searchTerm}%,
      specializations.cs.{${data.searchTerm}}
    `)
  }

  // Apply access tier specific filters
  if (accessTier === 'free') {
    query = query.neq('visibility_level', 'featured')
  }

  // Order by quality and limit results
  query = query
    .order('quality_score', { ascending: false })
    .range(data.offset || 0, (data.offset || 0) + Math.min(data.limit || 20, permissions.maxSearchResults) - 1)

  const { data: partners, error } = await query

  if (error) {
    return NextResponse.json({ error: 'Failed to get partners' }, { status: 500 })
  }

  // Filter out sensitive information for lower tiers
  const filteredPartners = partners?.map(partner => {
    const filtered: any = { ...partner }
    
    if (!permissions.canViewContactDetails) {
      delete filtered.contact_email
      delete filtered.contact_phone
      delete filtered.website
    }
    
    if (!permissions.canViewPricing) {
      delete filtered.minimum_project_value
      delete filtered.maximum_project_value
    }

    return filtered
  })

  return NextResponse.json({
    success: true,
    partners: filteredPartners || [],
    accessInfo: {
      tier: accessTier,
      canViewMore: partners?.length === permissions.maxSearchResults,
      totalVisible: partners?.length || 0
    }
  })
}

async function checkContactLimit(data: { email: string }) {
  const { data: access } = await supabase
    .from('client_access_levels')
    .select('monthly_contact_limit, monthly_contacts_used')
    .eq('email', data.email)
    .single()

  const limit = access?.monthly_contact_limit || ACCESS_PERMISSIONS.free.monthlyContactLimit
  const used = access?.monthly_contacts_used || 0

  return NextResponse.json({
    success: true,
    limit: limit,
    used: used,
    remaining: limit - used,
    canContact: used < limit
  })
}

async function recordPartnerContact(data: {
  email: string,
  partnerId: number,
  requestType: string,
  projectDescription?: string,
  urgencyLevel?: string
}) {
  // Check contact limit first
  const limitCheck = await checkContactLimit({ email: data.email })
  const limitData = await limitCheck.json()
  
  if (!limitData.canContact) {
    return NextResponse.json({ 
      error: 'Monthly contact limit exceeded',
      limit: limitData.limit,
      used: limitData.used 
    }, { status: 429 })
  }

  // Get client access info
  const { data: access } = await supabase
    .from('client_access_levels')
    .select('*')
    .eq('email', data.email)
    .single()

  // Record the contact request
  const { data: contactRequest, error: contactError } = await supabase
    .from('partner_contact_requests')
    .insert({
      partner_id: data.partnerId,
      client_email: data.email,
      request_type: data.requestType,
      project_description: data.projectDescription,
      urgency_level: data.urgencyLevel || 'normal',
      client_access_tier: access?.access_tier || 'free',
      was_premium_contact: (access?.access_tier === 'premium' || access?.access_tier === 'vip')
    })
    .select()
    .single()

  if (contactError) {
    return NextResponse.json({ error: 'Failed to record contact' }, { status: 500 })
  }

  // Update monthly contact usage
  await supabase
    .from('client_access_levels')
    .update({ 
      monthly_contacts_used: (access?.monthly_contacts_used || 0) + 1,
      total_contacts: (access?.total_contacts || 0) + 1,
      updated_at: new Date().toISOString()
    })
    .eq('email', data.email)

  return NextResponse.json({
    success: true,
    contactRequestId: contactRequest.id,
    remaining: limitData.remaining - 1
  })
}

export async function GET(request: NextRequest) {
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      success: true,
      message: 'Mock access manager response'
    })
  }
  const url = new URL(request.url)
  const email = url.searchParams.get('email')
  const action = url.searchParams.get('action') || 'get_access'

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  switch (action) {
    case 'get_access':
      return await getClientAccess({ email })
    case 'check_contact_limit':
      return await checkContactLimit({ email })
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }
}