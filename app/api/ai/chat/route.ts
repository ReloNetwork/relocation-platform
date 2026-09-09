import { createHmac } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import {
  askReloRequestSchema,
  createAskReloAnswer,
} from '@/lib/ask-relo'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

function requestAddress(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'A valid chat request is required' },
      { status: 400 },
    )
  }

  const parsed = askReloRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid relocation question' },
      { status: 400 },
    )
  }

  const apiKey = process.env.OPENAI_API_KEY
  const usageSecret = process.env.ASK_RELO_USAGE_SECRET
  if (!apiKey || !usageSecret) {
    return NextResponse.json(
      { success: false, error: 'Ask Relo is temporarily unavailable' },
      { status: 503 },
    )
  }

  let supabase
  try {
    supabase = createServiceClient()
  } catch (error) {
    console.error('Ask Relo usage storage is not configured', error)
    return NextResponse.json(
      { success: false, error: 'Ask Relo is temporarily unavailable' },
      { status: 503 },
    )
  }

  const ipHash = createHmac('sha256', usageSecret)
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
    console.error('Ask Relo usage limit could not be checked', usageError)
    return NextResponse.json(
      { success: false, error: 'Ask Relo is temporarily unavailable' },
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
    const answer = await createAskReloAnswer(parsed.data.messages, {
      apiKey,
      model: process.env.OPENAI_MODEL || 'gpt-5-mini',
    })

    return NextResponse.json({
      success: true,
      message: {
        role: 'assistant',
        content: answer,
        timestamp: new Date().toISOString(),
      },
      sessionId: parsed.data.sessionId,
      remaining: allowance.remaining,
    })
  } catch (error) {
    console.error('Ask Relo answer generation failed', error)
    return NextResponse.json(
      { success: false, error: 'Ask Relo could not answer just now' },
      { status: 502 },
    )
  }
}
