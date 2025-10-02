import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'
import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'
import DashboardContent from './DashboardContent'
import type { Task, Appointment, MoveCase, Organization } from '@/types/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Dashboard | Relo Network - London Relocation Management',
  description: 'Manage your London relocation with real-time progress tracking, task management, appointment scheduling, and direct access to premium service providers. Expert guidance for executive moves.',
  keywords: [
    'London relocation dashboard',
    'executive relocation management',
    'relocation progress tracking',
    'London move management',
    'international relocation platform',
    'premium relocation services',
    'corporate relocation dashboard',
    'London relocation concierge'
  ].join(', '),
  openGraph: {
    title: 'Client Dashboard | Relo Network',
    description: 'Manage your London relocation with real-time progress tracking and premium service provider access.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Relo Network'
  },
  twitter: {
    card: 'summary',
    title: 'Client Dashboard | Relo Network',
    description: 'Manage your London relocation with real-time progress tracking and premium service provider access.'
  },
  robots: {
    index: false, // Dashboard should not be indexed as it's private
    follow: false
  }
}

export default async function DashboardPage() {
  const user = await requireUser()
  console.log('Dashboard: User authenticated:', user.email)
  
  const { userId, orgId, organization } = await requireUserWithOrg(user.id)
  console.log('Dashboard: User has organization:', orgId)
  
  const supabase = createClient()

  // Fetch move case with related data
  const { data: moveCase } = await supabase
    .from('move_cases')
    .select('*')
    .eq('org_id', orgId)
    .eq('client_user_id', userId)
    .single()

  // Fetch tasks for the move case
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('move_case_id', moveCase?.id || '')
    .order('priority', { ascending: false })
    .order('due_date', { ascending: true })

  // Fetch upcoming appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('move_case_id', moveCase?.id || '')
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(5)

  return (
    <Layout>
      <DashboardContent
        user={user}
        organization={organization}
        moveCase={moveCase as MoveCase}
        tasks={(tasks as Task[]) || []}
        appointments={(appointments as Appointment[]) || []}
      />
    </Layout>
  )
}