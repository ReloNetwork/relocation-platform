import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase';
import crypto from 'crypto';

interface CalWebhookPayload {
  triggerEvent: 'BOOKING_CREATED' | 'BOOKING_CANCELLED' | 'BOOKING_RESCHEDULED' | 'BOOKING_CONFIRMED';
  createdAt: string;
  payload: {
    uid: string;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    attendees: Array<{
      email: string;
      name: string;
      timeZone: string;
    }>;
    organizer: {
      email: string;
      name: string;
      timeZone: string;
    };
    location?: string;
    additionalNotes?: string;
    metadata?: Record<string, any>;
  };
}

// Verify Cal.com webhook signature
function verifySignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex');
  
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-cal-signature-256');
    const webhookSecret = process.env.CAL_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    if (!verifySignature(body, signature, webhookSecret)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const webhookData: CalWebhookPayload = JSON.parse(body);
    const supabase = createServiceSupabase();

    switch (webhookData.triggerEvent) {
      case 'BOOKING_CREATED': {
        const booking = webhookData.payload;
        
        // Extract case_id from metadata if provided
        const caseId = booking.metadata?.case_id;
        
        // Create booking record
        const { error: bookingError } = await supabase
          .from('bookings')
          .insert({
            cal_booking_id: booking.uid,
            case_id: caseId || null,
            title: booking.title,
            starts_at: booking.startTime,
            ends_at: booking.endTime,
            attendee_email: booking.attendees[0]?.email,
            attendee_name: booking.attendees[0]?.name,
            status: 'confirmed',
            meeting_url: booking.location?.startsWith('http') ? booking.location : null,
          });

        if (bookingError) {
          console.error('Error creating booking:', bookingError);
          throw bookingError;
        }

        // If associated with a case, also create an appointment record
        if (caseId) {
          const { error: appointmentError } = await supabase
            .from('appointments')
            .insert({
              case_id: caseId,
              title: booking.title,
              description: booking.description,
              starts_at: booking.startTime,
              ends_at: booking.endTime,
              location: booking.location,
              cal_external_id: booking.uid,
              attendees_json: booking.attendees,
            });

          if (appointmentError) {
            console.error('Error creating appointment:', appointmentError);
          }
        }

        // TODO: Send confirmation email to attendees
        
        break;
      }

      case 'BOOKING_CANCELLED': {
        const booking = webhookData.payload;
        
        // Update booking status
        const { error: bookingError } = await supabase
          .from('bookings')
          .update({ status: 'canceled' })
          .eq('cal_booking_id', booking.uid);

        if (bookingError) {
          console.error('Error updating booking status:', bookingError);
        }

        // TODO: Send cancellation notification
        
        break;
      }

      case 'BOOKING_RESCHEDULED': {
        const booking = webhookData.payload;
        
        // Update booking with new times
        const { error: bookingError } = await supabase
          .from('bookings')
          .update({
            starts_at: booking.startTime,
            ends_at: booking.endTime,
            status: 'rescheduled',
          })
          .eq('cal_booking_id', booking.uid);

        if (bookingError) {
          console.error('Error updating rescheduled booking:', bookingError);
        }

        // Update appointment if exists
        const { error: appointmentError } = await supabase
          .from('appointments')
          .update({
            starts_at: booking.startTime,
            ends_at: booking.endTime,
          })
          .eq('cal_external_id', booking.uid);

        if (appointmentError) {
          console.error('Error updating appointment:', appointmentError);
        }

        // TODO: Send reschedule notification
        
        break;
      }

      case 'BOOKING_CONFIRMED': {
        const booking = webhookData.payload;
        
        // Update booking status to confirmed
        const { error } = await supabase
          .from('bookings')
          .update({ status: 'confirmed' })
          .eq('cal_booking_id', booking.uid);

        if (error) {
          console.error('Error confirming booking:', error);
        }

        break;
      }

      default:
        console.log(`Unhandled Cal.com event: ${webhookData.triggerEvent}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Cal.com webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}