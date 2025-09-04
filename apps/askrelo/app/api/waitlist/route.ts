import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase';
import { waitlistSchema } from '@/lib/validations';

// Minimal row type for what you return
type WaitlistRow = {
  id: string;         // uuid in most schemas
  email: string;
  // add other columns if you want them typed:
  full_name?: string | null;
  source?: string | null;
  current_location?: string | null;
  target_location?: string | null;
  created_at?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = waitlistSchema.parse(body);
    
    const supabase = createServiceSupabase();
    
    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', validatedData.email)
      .single();
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }
    
    // Insert new waitlist entry
    const { data, error } = await supabase
      .from<WaitlistRow>('waitlist')
      .insert([{               // array form is safest with the types
        email: validatedData.email,
        full_name: validatedData.full_name ?? null,
        source: validatedData.source ?? null,
        current_location: validatedData.current_location ?? null,
        target_location: validatedData.target_location ?? null,
      }])
      .select('id,email')
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }
    
    // TODO: Send welcome email via Resend
    
    return NextResponse.json(
      { 
        message: 'Successfully joined waitlist',
        data: { id: data!.id, email: data!.email }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}