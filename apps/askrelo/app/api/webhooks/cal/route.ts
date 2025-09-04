import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

interface CalBooking {
  uid: string
  title: string
  startTime: string
  endTime: string
  attendees: Array<{
    email: string
    name: string
  }>
  organizer: {
    email: string
    name: string
  }
  location?: string
}

interface CalWebhookPayload {
  triggerEvent: string
  createdAt: string
  payload: CalBooking
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-cal-signature-256')
    
    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 401 })
    }

    // Verify webhook signature
    const webhookSecret = process.env.CALCOM_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('CALCOM_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature !== `sha256=${expectedSignature}`) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data: CalWebhookPayload = JSON.parse(body)
    const { triggerEvent, payload: booking } = data

    if (!['BOOKING_CREATED', 'BOOKING_CANCELLED', 'BOOKING_RESCHEDULED'].includes(triggerEvent)) {
      return NextResponse.json({ message: 'Event not handled' }, { status: 200 })
    }

    const supabase = createClient()

    // Find the client by email
    const attendeeEmail = booking.attendees[0]?.email
    if (!attendeeEmail) {
      console.error('No attendee email found in booking')
      return NextResponse.json({ error: 'No attendee email' }, { status: 400 })
    }

    // Get user and their active case
    const { data: user } = await supabase
      .from('users')
      .select('id, role')
      .eq('email', attendeeEmail)
      .single()

    if (!user || user.role !== 'client') {
      console.error('User not found or not a client:', attendeeEmail)
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Get the most recent active case for this client
    const { data: activeCase } = await supabase
      .from('move_cases')
      .select('id')
      .eq('client_id', user.id)
      .in('status', ['intake', 'scoping', 'quoting', 'booked', 'in_transit', 'settling'])
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!activeCase) {
      console.error('No active case found for client:', user.id)
      return NextResponse.json({ error: 'No active case found' }, { status: 404 })
    }

    if (triggerEvent === 'BOOKING_CREATED' || triggerEvent === 'BOOKING_RESCHEDULED') {
      // Upsert appointment
      const { error: appointmentError } = await supabase
        .from('appointments')
        .upsert({
          case_id: activeCase.id,
          title: booking.title,
          starts_at: booking.startTime,
          ends_at: booking.endTime,
          location: booking.location || 'Video call',
          cal_external_id: booking.uid,
          created_by: user.id
        }, {
          onConflict: 'cal_external_id'
        })

      if (appointmentError) {
        console.error('Error upserting appointment:', appointmentError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }
    } else if (triggerEvent === 'BOOKING_CANCELLED') {
      // Delete appointment
      const { error: deleteError } = await supabase
        .from('appointments')
        .delete()
        .eq('cal_external_id', booking.uid)

      if (deleteError) {
        console.error('Error deleting appointment:', deleteError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }
    }

    return NextResponse.json({ message: 'Webhook processed successfully' })

  } catch (error) {
    console.error('Cal webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}