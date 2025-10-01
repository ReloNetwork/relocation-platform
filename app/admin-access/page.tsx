import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'
import DashboardContent from '../dashboard/DashboardContent'
import type { Task, Appointment, MoveCase, Organization } from '@/types/db'

export default async function AdminAccessPage() {
  console.log('🔓 ADMIN ACCESS: Bypassing authentication for emergency access')
  
  const supabase = createClient()
  
  // Get the first available user and organization for demo purposes
  // This is a temporary bypass for business continuity
  
  const { data: firstUser } = await supabase
    .from('auth.users')
    .select('*')
    .limit(1)
    .single()

  if (!firstUser) {
    return (
      <Layout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">⚠️ No Users Found</h1>
          <p>No users in the system. Please set up authentication first.</p>
        </div>
      </Layout>
    )
  }

  // Get first organization
  const { data: firstOrg } = await supabase
    .from('orgs')
    .select('*')
    .limit(1)
    .single()

  if (!firstOrg) {
    return (
      <Layout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">⚠️ No Organizations Found</h1>
          <p>No organizations in the system. Please set up your organization first.</p>
        </div>
      </Layout>
    )
  }

  console.log('🔓 Using emergency access for user:', firstUser.email, 'org:', firstOrg.name)

  // Fetch move case with related data
  const { data: moveCase } = await supabase
    .from('move_cases')
    .select('*')
    .eq('org_id', firstOrg.id)
    .single()

  // Fetch tasks for the move case
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('move_case_id', moveCase?.id || '')
    .order('priority', { ascending: false })

  // Fetch appointments for the move case
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('move_case_id', moveCase?.id || '')
    .order('scheduled_at', { ascending: true })

  return (
    <Layout>
      <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg">
        <h2 className="text-red-800 font-bold">🚨 EMERGENCY ADMIN ACCESS</h2>
        <p className="text-red-700 text-sm">
          This is a temporary bypass for business continuity. 
          Fix authentication system before removing this access.
        </p>
        <p className="text-red-600 text-xs mt-1">
          Accessing as: {firstUser.email} | Organization: {firstOrg.name}
        </p>
      </div>
      
      <DashboardContent
        user={{
          id: firstUser.id,
          email: firstUser.email || 'admin@temp.com',
          ...firstUser
        }}
        moveCase={moveCase}
        tasks={tasks || []}
        appointments={appointments || []}
        organization={firstOrg}
      />
    </Layout>
  )
}