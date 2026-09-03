import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import {
  retellWebhookSchema,
  sanitiseRetellAnalysis,
  timestampFromMilliseconds,
  verifyRetellWebhook,
} from '@/lib/retell-webhook'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const apiKeys = [process.env.RETELL_WEBHOOK_KEY, process.env.RETELL_API_KEY]
    .map((key) => key?.trim())
    .filter((key): key is string => Boolean(key))
    .filter((key, index, keys) => keys.indexOf(key) === index)

  if (apiKeys.length === 0) {
    return NextResponse.json({ success: false }, { status: 503 })
  }

  const rawBody = await request.text()
  const signature = request.headers.get('x-retell-signature')
  if (!apiKeys.some((apiKey) => verifyRetellWebhook(rawBody, signature, apiKey))) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const parsed = retellWebhookSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const { event, call } = parsed.data
  if (process.env.RETELL_AGENT_ID && call.agent_id !== process.env.RETELL_AGENT_ID) {
    return NextResponse.json({ success: false }, { status: 403 })
  }

  const rawSessionId = call.metadata?.session_id
  const sessionId =
    typeof rawSessionId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(rawSessionId)
      ? rawSessionId
      : null

  try {
    const supabase = createServiceClient()
    const { error } = await supabase.from('retell_call_events').upsert(
      {
        event_key: `${call.call_id}:${event}`,
        event_type: event,
        call_id: call.call_id,
        agent_id: call.agent_id || null,
        session_id: sessionId,
        started_at: timestampFromMilliseconds(call.start_timestamp),
        ended_at: timestampFromMilliseconds(call.end_timestamp),
        disconnection_reason: call.disconnection_reason || null,
        analysis:
          event === 'call_analyzed'
            ? sanitiseRetellAnalysis(call.call_analysis)
            : {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'event_key' },
    )

    if (error) throw error
  } catch (error) {
    console.error('Retell event could not be stored', error)
    return NextResponse.json({ success: false }, { status: 503 })
  }

  return new NextResponse(null, { status: 204 })
}
