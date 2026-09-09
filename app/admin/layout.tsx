import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireUser()
  const { userId, orgId } = await requireUserWithOrg(user.id)
  const supabase = createClient()

  const { data: membership } = await supabase
    .from('org_memberships')
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()

  if (membership?.role !== 'admin') {
    redirect('/dashboard')
  }

  return children
}
