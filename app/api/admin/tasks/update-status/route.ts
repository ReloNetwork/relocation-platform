import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'

export const dynamic = 'force-dynamic'

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser()
    const { userId, orgId } = await requireUserWithOrg(user.id)
    
    const { taskId, status } = await request.json()

    if (!taskId || !status) {
      return NextResponse.json({ error: 'Missing taskId or status' }, { status: 400 })
    }

    if (!['todo', 'doing', 'blocked', 'done'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const supabase = createClient()

    // Verify the task belongs to a case in the user's organization
    const { data: task } = await supabase
      .from('tasks')
      .select(`
        id,
        case_id,
        move_cases!inner (
          id,
          client_id
        )
      `)
      .eq('id', taskId)
      .single()

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Check if user has admin role
    const { data: membership } = await supabase
      .from('org_memberships')
      .select('role')
      .eq('user_id', userId)
      .eq('org_id', orgId)
      .single()

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Update the task status
    const { error: updateError } = await supabase
      .from('tasks')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)

    if (updateError) {
      console.error('Error updating task:', updateError)
      return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error in task status update:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}