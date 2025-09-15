import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Organization, OrganizationMembership } from '@/types/db'

export async function getUserOrgId(userId: string): Promise<string | null> {
  const supabase = createClient()
  
  const { data: membership, error } = await supabase
    .from('org_memberships')
    .select('org_id')
    .eq('user_id', userId)
    .single()

  if (error || !membership) {
    return null
  }

  return membership.org_id
}

export async function getUserOrganization(userId: string): Promise<Organization | null> {
  const supabase = createClient()
  
  const { data: membership, error } = await supabase
    .from('org_memberships')
    .select(`
      org_id,
      orgs (
        id,
        name,
        type,
        created_at,
        updated_at
      )
    `)
    .eq('user_id', userId)
    .single()

  if (error || !membership || !membership.orgs) {
    return null
  }

  return membership.orgs as Organization
}

export async function requireUserWithOrg(userId: string): Promise<{
  userId: string
  orgId: string
  organization: Organization
}> {
  const orgId = await getUserOrgId(userId)
  
  if (!orgId) {
    redirect('/onboarding')
  }

  const organization = await getUserOrganization(userId)
  
  if (!organization) {
    redirect('/onboarding')
  }

  return {
    userId,
    orgId,
    organization
  }
}