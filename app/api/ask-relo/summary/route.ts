import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  askReloFollowupSchema,
  compactConversation,
} from '@/lib/ask-relo-followup'
import { askReloSummaryEmail } from '@/lib/transactional-emails'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'A valid request is required' },
      { status: 400 },
    )
  }

  const parsed = askReloFollowupSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Enter a valid email and confirm permission' },
      { status: 400 },
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Email summaries are temporarily unavailable' },
      { status: 503 },
    )
  }

  const conversation = compactConversation(parsed.data.messages)
  const consentedAt = new Date().toISOString()
  let followupId: string | null = null
  let supabase

  try {
    supabase = createServiceClient()
    const { data: usage, error: usageError } = await supabase
      .from('ask_relo_usage')
      .select('id')
      .eq('session_id', parsed.data.sessionId)
      .limit(1)
      .maybeSingle()

    if (usageError || !usage) {
      return NextResponse.json(
        { success: false, error: 'Complete an Ask Relo conversation first' },
        { status: 403 },
      )
    }

    const { data, error } = await supabase
      .from('ask_relo_followups')
      .upsert({
        session_id: parsed.data.sessionId,
        email: parsed.data.email.toLowerCase(),
        channel: 'email',
        conversation,
        delivery_status: 'pending',
        consented_at: consentedAt,
      }, { onConflict: 'session_id' })
      .select('id')
      .single()

    if (error) throw error
    followupId = data.id
  } catch (error) {
    console.error('Ask Relo follow-up could not be stored', error)
    return NextResponse.json(
      { success: false, error: 'We could not save your email request' },
      { status: 503 },
    )
  }

  if (!followupId) {
    return NextResponse.json(
      { success: false, error: 'We could not save your email request' },
      { status: 503 },
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.url
  const referenceId = `AR-${followupId.slice(0, 8).toUpperCase()}`
  const resend = new Resend(process.env.RESEND_API_KEY)
  let delivery
  try {
    delivery = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'The Relo Network <hello@therelonetwork.com>',
      to: [parsed.data.email.toLowerCase()],
      subject: `Your Ask Relo notes - ${referenceId}`,
      html: askReloSummaryEmail({
        conversation,
        referenceId,
        startMoveUrl: new URL('/executive-intake', siteUrl).toString(),
        journalUrl: new URL('/journal', siteUrl).toString(),
      }),
    })
  } catch (error) {
    console.error('Ask Relo summary email failed', error)
    await supabase
      .from('ask_relo_followups')
      .update({ delivery_status: 'failed' })
      .eq('id', followupId)
    return NextResponse.json(
      { success: false, error: 'We could not send your notes just now' },
      { status: 502 },
    )
  }

  const deliveryStatus = delivery.error ? 'failed' : 'sent'
  const { error: updateError } = await supabase
    .from('ask_relo_followups')
    .update({ delivery_status: deliveryStatus })
    .eq('id', followupId)

  if (updateError) {
    console.error('Ask Relo email status could not be recorded', updateError)
  }

  if (delivery.error) {
    console.error('Ask Relo summary email failed', delivery.error)
    return NextResponse.json(
      { success: false, error: 'We could not send your notes just now' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true, message: 'Your notes are on their way' })
}
