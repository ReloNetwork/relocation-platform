import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

interface ConsultationBookingData {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  current_location?: string;
  target_location?: string;
  move_timeframe?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationBookingData = await request.json();
    
    // Validate required fields
    if (!data.full_name || !data.email || !data.preferred_date || !data.preferred_time) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, email, preferred_date, and preferred_time are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create booking record
    const booking = {
      id: `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      source: `consultation_${data.source || 'newsletter'}`,
      status: 'active',
      created_at: new Date().toISOString()
    };

    // Save to local file for now (in production, this would be saved to database)
    const filePath = join(process.cwd(), 'consultations.json');
    let consultations = [];
    
    try {
      const fileData = await readFile(filePath, 'utf8');
      consultations = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      consultations = [];
    }
    
    consultations.push(booking);
    await writeFile(filePath, JSON.stringify(consultations, null, 2));

    // Log the consultation details for manual follow-up
    console.log('Consultation booked:', {
      id: booking.id,
      name: data.full_name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      current_location: data.current_location,
      target_location: data.target_location,
      move_timeframe: data.move_timeframe,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      message: data.message,
      created_at: booking.created_at
    });

    return NextResponse.json({
      success: true,
      booking_id: booking.id,
      message: 'Consultation booked successfully'
    })

  } catch (error) {
    console.error('Error booking consultation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Consultation booking endpoint - use POST to book a consultation' },
    { status: 200 }
  );
}