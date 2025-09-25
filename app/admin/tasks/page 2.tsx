import { createClient } from '@/lib/supabase/server'
import Layout from '@/components/Layout'
import TasksKanban from '@/components/TasksKanban'
import { redirect } from 'next/navigation'

async function checkAdminAccess() {
  const supabase = createClient()
  
  try {
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return false
    }

    // Check if user is part of any organization (admin/concierge access)
    const { data: membership } = await supabase
      .from('org_memberships')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return !!membership
  } catch (error) {
    return false
  }
}

async function getTasksStats() {
  const supabase = createClient()
  
  try {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('status, case_id')

    if (!tasks) return { total: 0, todo: 0, doing: 0, done: 0, cases: 0 }

    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      doing: tasks.filter(t => t.status === 'doing').length,
      done: tasks.filter(t => t.status === 'done').length,
      cases: new Set(tasks.map(t => t.case_id)).size
    }

    return stats
  } catch (error) {
    return { total: 0, todo: 0, doing: 0, done: 0, cases: 0 }
  }
}

export default async function TasksManagementPage() {
  const hasAccess = await checkAdminAccess()
  
  if (!hasAccess) {
    redirect('/login')
  }

  const stats = await getTasksStats()

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-[#0B1B2B]/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Tasks Management
                </h1>
                <p className="text-[#6B7280] mt-1">
                  Manage and track all relocation tasks across cases
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#0B1B2B]">{stats.total}</div>
                  <div className="text-sm text-[#6B7280]">Total Tasks</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#C9A24A]">{stats.cases}</div>
                  <div className="text-sm text-[#6B7280]">Active Cases</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#6B7280]">To Do</h3>
                  <p className="text-2xl font-bold text-[#0B1B2B] mt-1">{stats.todo}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#6B7280]">In Progress</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{stats.doing}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#6B7280]">Completed</h3>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.done}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm">💡</span>
              </div>
              <div>
                <h3 className="font-medium text-[#0B1B2B] mb-1">How to use the Kanban Board</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Drag and drop tasks between columns to update their status. Tasks are automatically saved to the database when moved. 
                  This view shows all tasks across all cases - perfect for team management and workflow oversight.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white">
          <TasksKanban />
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-[#6B7280] text-sm">
            <p>Tasks are updated in real-time. Changes are automatically saved to the database.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}