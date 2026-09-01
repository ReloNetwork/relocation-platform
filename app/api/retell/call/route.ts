import { createHmac } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createWebVoiceCall } from '@/lib/retell'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

const voiceRequestSchema = z.object({
  type: z.literal('web'),
  sessionId: z.string().uuid(),
})

function requestAddress(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  if (
    process.env.NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED !== '1' ||
    !process.env.RETELL_API_KEY ||
    !process.env.RETELL_AGENT_ID ||
    !process.env.ASK_RELO_USAGE_SECRET
  ) {
    return NextResponse.json(
      { success: false, error: 'Ask Relo voice is temporarily unavailable' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'A valid voice request is required' },
      { status: 400 },
    )
  }

  const parsed = voiceRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Only browser voice calls are supported' },
      { status: 400 },
    )
  }

  let supabase
  try {
    supabase = createServiceClient()
  } catch (error) {
    console.error('Ask Relo voice usage storage is not configured', error)
    return NextResponse.json(
      { success: false, error: 'Ask Relo voice is temporarily unavailable' },
      { status: 503 },
    )
  }

  const ipHash = createHmac('sha256', process.env.ASK_RELO_USAGE_SECRET)
    .update(requestAddress(request))
    .digest('hex')

  const { data: usage, error: usageError } = await supabase.rpc(
    'consume_ask_relo_question',
    {
      p_session_id: parsed.data.sessionId,
      p_ip_hash: ipHash,
      p_session_limit: 3,
      p_daily_limit: 20,
    },
  )

  if (usageError || !Array.isArray(usage) || !usage[0]) {
    console.error('Ask Relo voice usage limit could not be checked', usageError)
    return NextResponse.json(
      { success: false, error: 'Ask Relo voice is temporarily unavailable' },
      { status: 503 },
    )
  }

  const allowance = usage[0] as { allowed: boolean; remaining: number }
  if (!allowance.allowed) {
    return NextResponse.json(
      {
        success: false,
        limitReached: true,
        remaining: 0,
        error: 'Your complimentary Ask Relo preview is complete',
      },
      { status: 429 },
    )
  }

  try {
    const webCall = await createWebVoiceCall()
    return NextResponse.json({
      success: true,
      accessToken: webCall.accessToken,
      callId: webCall.callId,
      remaining: allowance.remaining,
    })
  } catch (error) {
    console.error('Ask Relo voice call creation failed', error)
    return NextResponse.json(
      { success: false, error: 'Ask Relo voice could not connect' },
      { status: 502 },
    )
  }
}
