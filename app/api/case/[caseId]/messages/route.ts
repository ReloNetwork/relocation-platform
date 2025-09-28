import { NextRequest, NextResponse } from 'next/server'
import { createServiceSupabase } from '../../../../../lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  try {
    const supabase = createServiceSupabase()
    const caseId = params.caseId

    // Get messages for this case
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  try {
    const supabase = createServiceSupabase()
    const caseId = params.caseId
    const { body, sender } = await request.json()

    // Insert new message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        case_id: caseId,
        body: body.trim(),
        sender: sender || 'client'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating message:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}