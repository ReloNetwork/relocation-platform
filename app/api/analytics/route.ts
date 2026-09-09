import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { commercialEventNames } from '@/lib/commercial-events'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

const shortOptional = z.string().trim().max(120).optional()
const metadataSchema = z.object({
  remaining: z.number().int().min(0).max(20).optional(),
  urgency: z.string().trim().max(40).optional(),
  budget: z.string().trim().max(40).optional(),
  interest: z.string().trim().max(40).optional(),
  source: z.string().trim().max(40).optional(),
}).strict().default({})
const eventSchema = z.object({
  event: z.enum(commercialEventNames),
  journey: z.enum(['newsletter', 'ask_relo', 'relocation', 'partner']),
  sessionId: z.string().uuid(),
  path: z.string().trim().startsWith('/').max(300),
  referrerHost: shortOptional,
  utmSource: shortOptional,
  utmMedium: shortOptional,
  utmCampaign: shortOptional,
  metadata: metadataSchema,
})

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 8192) return NextResponse.json({ success: false }, { status: 413 })
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ success: false }, { status: 400 })

  let supabase
  try {
    supabase = createServiceClient()
  } catch {
    return NextResponse.json({ success: false }, { status: 503 })
  }

  const event = parsed.data
  const { error } = await supabase.from('commercial_events').insert({
    event: event.event,
    journey: event.journey,
    session_id: event.sessionId,
    path: event.path,
    referrer_host: event.referrerHost || null,
    utm_source: event.utmSource || null,
    utm_medium: event.utmMedium || null,
    utm_campaign: event.utmCampaign || null,
    metadata: event.metadata,
  })
  if (error) {
    console.error('Commercial analytics event could not be stored', error)
    return NextResponse.json({ success: false }, { status: 502 })
  }

  return NextResponse.json({ success: true }, { status: 202 })
}
