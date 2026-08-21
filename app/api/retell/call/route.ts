import { NextRequest, NextResponse } from 'next/server'
import { createWebVoiceCall } from '@/lib/retell'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (
    process.env.NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED !== '1' ||
    !process.env.RETELL_API_KEY ||
    !process.env.RETELL_AGENT_ID
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

  if (
    !body ||
    typeof body !== 'object' ||
    !('type' in body) ||
    body.type !== 'web'
  ) {
    return NextResponse.json(
      { success: false, error: 'Only browser voice calls are supported' },
      { status: 400 },
    )
  }

  try {
    const webCall = await createWebVoiceCall()
    return NextResponse.json({
      success: true,
      accessToken: webCall.accessToken,
      callId: webCall.callId,
    })
  } catch (error) {
    console.error('Ask Relo voice call creation failed', error)
    return NextResponse.json(
      { success: false, error: 'Ask Relo voice could not connect' },
      { status: 502 },
    )
  }
}
