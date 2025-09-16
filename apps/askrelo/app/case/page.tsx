import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'
import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'
import CaseContent from './CaseContent'
import type { Task, Appointment, Document, MoveCase, Organization } from '@/types/db'

export default async function CasePage() {
  const user = await requireUser()
  const { userId, orgId, organization } = await requireUserWithOrg(user.id)
  
  const supabase = createClient()

  // Fetch move case with all related data
  const { data: moveCase } = await supabase
    .from('move_cases')
    .select('*')
    .eq('org_id', orgId)
    .eq('client_user_id', userId)
    .single()

  if (!moveCase) {
    // If no move case exists, redirect to onboarding
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0B1B2B] mb-4">No Active Case</h1>
            <p className="text-[#6B7280] mb-6">You don't have an active relocation case yet.</p>
            <a href="/onboarding" className="bg-[#0B1B2B] text-white px-6 py-3 rounded-md hover:bg-[#0B1B2B]/90">
              Start Your Relocation
            </a>
          </div>
        </div>
      </Layout>
    )
  }

  // Fetch all tasks for the move case
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('move_case_id', moveCase.id)
    .order('priority', { ascending: false })
    .order('due_date', { ascending: true })

  // Fetch all appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('move_case_id', moveCase.id)
    .order('start_time', { ascending: true })

  // Fetch all documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('move_case_id', moveCase.id)
    .order('created_at', { ascending: false })

  return (
    <Layout>
      <CaseContent
        user={user}
        organization={organization}
        moveCase={moveCase as MoveCase}
        tasks={(tasks as Task[]) || []}
        appointments={(appointments as Appointment[]) || []}
        documents={(documents as Document[]) || []}
      />
    </Layout>
  )
}