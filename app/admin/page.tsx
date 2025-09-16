import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'
import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'
import AdminContent from './AdminContent'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const user = await requireUser()
  const { userId, orgId, organization } = await requireUserWithOrg(user.id)
  
  const supabase = createClient()

  // Check if user has admin role in their organization
  const { data: membership } = await supabase
    .from('org_memberships')
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()

  if (!membership || membership.role !== 'admin') {
    redirect('/dashboard')
  }

  // Load cases data with client names
  const { data: cases } = await supabase
    .from('move_cases')
    .select(`
      id,
      client_id,
      route_from,
      route_to,
      move_date,
      status,
      created_at,
      users!client_id (
        email
      )
    `)
    .order('created_at', { ascending: false })

  // Load tasks data with case info
  const { data: tasks } = await supabase
    .from('tasks')
    .select(`
      id,
      case_id,
      title,
      description,
      assignee_role,
      assignee_id,
      due_at,
      status,
      priority,
      created_at,
      move_cases!case_id (
        route_from,
        route_to
      )
    `)
    .order('created_at', { ascending: false })

  // Load appointments data with case info  
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      id,
      case_id,
      title,
      description,
      starts_at,
      ends_at,
      type,
      status,
      provider,
      created_at,
      move_cases!case_id (
        route_from,
        route_to
      )
    `)
    .order('starts_at', { ascending: true })

  // Transform data for the components
  const transformedCases = (cases || []).map(case_ => ({
    ...case_,
    client_name: (case_.users as any)?.email || 'Unknown Client'
  }))

  const transformedTasks = (tasks || []).map(task => ({
    ...task,
    case_route: (task.move_cases as any) ? `${(task.move_cases as any).route_from} → ${(task.move_cases as any).route_to}` : null
  }))

  const transformedAppointments = (appointments || []).map(appointment => ({
    ...appointment,
    case_route: (appointment.move_cases as any) ? `${(appointment.move_cases as any).route_from} → ${(appointment.move_cases as any).route_to}` : null
  }))

  const initialData = {
    cases: transformedCases,
    tasks: transformedTasks,
    appointments: transformedAppointments
  }

  return (
    <Layout>
      <AdminContent initialData={initialData} orgId={orgId} />
    </Layout>
  )
}