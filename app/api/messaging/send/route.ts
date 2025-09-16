import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser()
    const { userId } = await requireUserWithOrg(user.id)
    
    const { threadId, body } = await request.json()

    if (!threadId || !body?.trim()) {
      return NextResponse.json({ error: 'Thread ID and message body are required' }, { status: 400 })
    }

    const supabase = createClient()

    // Verify user has access to this thread
    const { data: thread } = await supabase
      .from('threads')
      .select(`
        id,
        org_id,
        case_id,
        org_memberships!inner (
          user_id
        )
      `)
      .eq('id', threadId)
      .eq('org_memberships.user_id', userId)
      .single()

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found or unauthorized' }, { status: 404 })
    }

    // Send the message
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        thread_id: threadId,
        author_id: userId,
        body: body.trim()
      })
      .select(`
        id,
        body,
        created_at,
        users!author_id (
          email,
          full_name
        )
      `)
      .single()

    if (messageError) {
      console.error('Error sending message:', messageError)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    // Schedule email fallback (if message not read in 15 minutes)
    // This would typically be handled by a separate background job
    // For now, we'll return success and implement email fallback separately

    return NextResponse.json({ 
      message: {
        id: message.id,
        body: message.body,
        created_at: message.created_at,
        author: {
          email: (message.users as any)?.email,
          name: (message.users as any)?.full_name || (message.users as any)?.email
        }
      }
    })

  } catch (error) {
    console.error('Error in messaging send:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}