import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { caseId: string; taskId: string } }
) {
  try {
    const supabase = createServiceRoleClient()
    const { taskId } = params
    const { status } = await request.json()

    // Validate status
    if (!['todo', 'doing', 'done'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be todo, doing, or done' },
        { status: 400 }
      )
    }

    // Update task status
    const { data: task, error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .select()
      .single()

    if (error) {
      console.error('Error updating task:', error)
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      )
    }

    return NextResponse.json({ task })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}