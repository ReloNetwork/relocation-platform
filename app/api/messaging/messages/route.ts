import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser()
    const { userId } = await requireUserWithOrg(user.id)
    
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('threadId')

    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 })
    }

    const supabase = createClient()

    // Verify user has access to this thread
    const { data: thread } = await supabase
      .from('threads')
      .select(`
        id,
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

    // Fetch messages for this thread
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select(`
        id,
        body,
        created_at,
        read_at,
        users!author_id (
          id,
          email,
          full_name
        )
      `)
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true })

    if (messagesError) {
      console.error('Error fetching messages:', messagesError)
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }

    // Mark messages as read (except user's own messages)
    const unreadMessageIds = (messages || [])
      .filter(msg => (msg.users as any)?.id !== userId && !msg.read_at)
      .map(msg => msg.id)

    if (unreadMessageIds.length > 0) {
      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', unreadMessageIds)
    }

    const formattedMessages = (messages || []).map(msg => ({
      id: msg.id,
      body: msg.body,
      created_at: msg.created_at,
      read_at: msg.read_at,
      author: {
        id: (msg.users as any)?.id,
        email: (msg.users as any)?.email,
        name: (msg.users as any)?.full_name || (msg.users as any)?.email,
        isCurrentUser: (msg.users as any)?.id === userId
      }
    }))

    return NextResponse.json({ messages: formattedMessages })

  } catch (error) {
    console.error('Error in messaging messages:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}