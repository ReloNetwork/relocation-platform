import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize services
let resend: Resend | null = null
let supabase: any = null

try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
} catch (error) {
  console.warn('Warning: Some services may not be available')
}

interface ConsultationBookingData {
  requestId: string
  slotId: string
  companyName: string
}

// Mock time slots - in production, integrate with actual calendar service
const timeSlots = {
  '1': { date: 'Today', time: '2:00 PM', datetime: new Date(Date.now() + 2 * 60 * 60 * 1000) },
  '2': { date: 'Today', time: '4:00 PM', datetime: new Date(Date.now() + 4 * 60 * 60 * 1000) },
  '3': { date: 'Today', time: '6:00 PM', datetime: new Date(Date.now() + 6 * 60 * 60 * 1000) },
  '4': { date: 'Tomorrow', time: '9:00 AM', datetime: new Date(Date.now() + 24 * 60 * 60 * 1000) },
  '5': { date: 'Tomorrow', time: '11:00 AM', datetime: new Date(Date.now() + 26 * 60 * 60 * 1000) },
  '6': { date: 'Tomorrow', time: '2:00 PM', datetime: new Date(Date.now() + 29 * 60 * 60 * 1000) },
  '8': { date: 'Day After', time: '10:00 AM', datetime: new Date(Date.now() + 48 * 60 * 60 * 1000) }
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationBookingData = await request.json()
    
    // Validate required fields
    if (!data.requestId || !data.slotId || !data.companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get slot details
    const slot = timeSlots[data.slotId as keyof typeof timeSlots]
    if (!slot) {
      return NextResponse.json(
        { error: 'Invalid time slot' },
        { status: 400 }
      )
    }

    // Create consultation booking record
    let bookingId = `CONS-${Date.now()}`
    
    if (supabase) {
      try {
        // Create a simple consultation booking table entry
        // Note: This would need the consultation_bookings table to be created
        const { data: booking, error } = await supabase
          .from('consultation_bookings')
          .insert({
            id: bookingId,
            request_id: data.requestId,
            company_name: data.companyName,
            slot_id: data.slotId,
            scheduled_at: slot.datetime.toISOString(),
            status: 'confirmed',
            created_at: new Date().toISOString()
          })
          .select()
          .single()
          
        if (!error && booking) {
          bookingId = booking.id
        }
      } catch (dbError) {
        console.warn('Database not configured for consultations, using fallback')
      }
    }

    // Send confirmation emails
    if (resend) {
      try {
        // Send client confirmation
        await resend.emails.send({
          from: 'emergency@therelonetwork.com',
          to: ['info@therelonetwork.com'], // In production, get from request data
          subject: `Consultation Confirmed - ${data.companyName}`,
          html: `
            <h2>Emergency Consultation Confirmed</h2>
            <p>Your consultation has been scheduled for <strong>${slot.date} at ${slot.time}</strong>.</p>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Request ID:</strong> ${data.requestId}</p>
            
            <h3>What's Next:</h3>
            <ul>
              <li>Our emergency specialist will call you at the scheduled time</li>
              <li>Have your requirements and timeline ready</li>
              <li>We'll assess your needs and provide a custom solution</li>
            </ul>
            
            <p>If you need to reschedule, call <strong>+44 20 3974 1239</strong></p>
          `
        })

        // Send internal notification
        await resend.emails.send({
          from: 'emergency@therelonetwork.com',
          to: ['emergency@therelonetwork.com'],
          subject: `📅 Emergency Consultation Booked - ${data.companyName}`,
          html: `
            <h2>New Emergency Consultation Booking</h2>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Scheduled:</strong> ${slot.date} at ${slot.time}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Request ID:</strong> ${data.requestId}</p>
            
            <p><strong>Action Required:</strong> Call client at scheduled time for emergency consultation.</p>
          `
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
      }
    }

    console.log('Consultation booked:', {
      bookingId,
      requestId: data.requestId,
      company: data.companyName,
      slot: `${slot.date} at ${slot.time}`,
      scheduledAt: slot.datetime.toISOString()
    })

    return NextResponse.json({
      success: true,
      bookingId,
      scheduledAt: slot.datetime.toISOString(),
      message: 'Consultation booked successfully'
    })

  } catch (error) {
    console.error('Error booking consultation:', error)
    return NextResponse.json(
      { error: 'Failed to book consultation' },
      { status: 500 }
    )
  }
}