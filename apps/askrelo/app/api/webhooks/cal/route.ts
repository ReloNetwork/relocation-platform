import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'

interface CalWebhookPayload {
  triggerEvent: string
  createdAt: string
  payload: {
    booking?: {
      id: number
      uid: string
      title: string
      startTime: string
      endTime: string
      status: string
    }
    organizer: {
      email: string
      name: string
    }
    attendees: Array<{
      email: string
      name: string
    }>
  }
}

function verifySignature(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = createHmac('sha256', secret)
      .update(body, 'utf8')
      .digest('hex')
    
    const providedSignature = signature.replace('sha256=', '')
    return expectedSignature === providedSignature
  } catch (error) {
    return false
  }
}

async function findMoveCase(email: string, supabase: any) {
  try {
    // Look up user by email in auth.users table
    const { data: user } = await supabase.auth.admin.getUserByEmail(email)
    
    if (!user?.user) {
      return null
    }

    // Find move case for this user
    const { data: moveCase } = await supabase
      .from('move_cases')
      .select('id, org_id')
      .eq('client_user_id', user.user.id)
      .single()

    return moveCase
  } catch (error) {
    return null
  }
}

async function storeWebhookPayload(payload: CalWebhookPayload, supabase: any) {
  try {
    const inviteeEmail = payload.payload.attendees?.[0]?.email || ''
    
    await supabase
      .from('appointments_webhooks')
      .insert({
        event_type: payload.triggerEvent,
        invitee_email: inviteeEmail,
        raw_payload: payload,
        processed: false
      })
  } catch (error) {
    console.error('Failed to store webhook payload')
  }
}

async function upsertAppointment(payload: CalWebhookPayload, moveCaseId: string, supabase: any) {
  try {
    const booking = payload.payload.booking
    if (!booking) {
      return false
    }

    const appointmentData = {
      move_case_id: moveCaseId,
      title: booking.title || 'Cal.com Consultation',
      description: `Consultation via Cal.com - ${payload.triggerEvent}`,
      start_time: booking.startTime,
      end_time: booking.endTime,
      type: 'consultation' as const,
      status: getAppointmentStatus(payload.triggerEvent),
      provider: 'Cal.com',
      calendar_event_id: booking.uid || booking.id?.toString()
    }

    // Try to find existing appointment by calendar_event_id
    const { data: existing } = await supabase
      .from('appointments')
      .select('id')
      .eq('calendar_event_id', appointmentData.calendar_event_id)
      .eq('move_case_id', moveCaseId)
      .single()

    if (existing) {
      // Update existing appointment
      await supabase
        .from('appointments')
        .update({
          ...appointmentData,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
    } else {
      // Create new appointment
      await supabase
        .from('appointments')
        .insert(appointmentData)
    }

    return true
  } catch (error) {
    console.error('Failed to upsert appointment')
    return false
  }
}

function getAppointmentStatus(triggerEvent: string): 'scheduled' | 'completed' | 'cancelled' {
  switch (triggerEvent) {
    case 'booking.created':
    case 'booking.rescheduled':
      return 'scheduled'
    case 'booking.canceled':
      return 'cancelled'
    default:
      return 'scheduled'
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text()
    const signature = request.headers.get('x-cal-signature-256')
    
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    // Verify webhook signature
    const webhookSecret = process.env.CAL_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('CAL_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    if (!verifySignature(body, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse payload
    let payload: CalWebhookPayload
    try {
      payload = JSON.parse(body)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // Check if we handle this event type
    const supportedEvents = ['booking.created', 'booking.rescheduled', 'booking.canceled']
    if (!supportedEvents.includes(payload.triggerEvent)) {
      return NextResponse.json({ message: 'Event not handled' }, { status: 200 })
    }

    // Get invitee email
    const inviteeEmail = payload.payload.attendees?.[0]?.email
    if (!inviteeEmail) {
      console.error('No invitee email found in payload')
      return NextResponse.json({ error: 'No invitee email' }, { status: 400 })
    }

    const supabase = createClient()

    // Try to find the move case
    const moveCase = await findMoveCase(inviteeEmail, supabase)

    if (!moveCase) {
      // Store webhook payload for later processing
      await storeWebhookPayload(payload, supabase)
      return NextResponse.json({ message: 'Stored for later processing' }, { status: 202 })
    }

    // Upsert appointment
    const success = await upsertAppointment(payload, moveCase.id, supabase)

    if (success) {
      return NextResponse.json({ message: 'Appointment processed' }, { status: 200 })
    } else {
      // Store webhook payload as fallback
      await storeWebhookPayload(payload, supabase)
      return NextResponse.json({ message: 'Stored for retry' }, { status: 202 })
    }

  } catch (error) {
    console.error('Webhook processing error')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}