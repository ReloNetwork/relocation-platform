import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase';
import { waitlistSchema } from '@/lib/validations';

// Minimal row type for what you return
type WaitlistRow = { id: string; email: string };
type WaitlistInsert = {
  email: string;
  full_name?: string | null;
  source?: string | null;
  current_location?: string | null;
  target_location?: string | null;
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
    const payload = {
      email: validatedData.email,
      full_name: validatedData.full_name ?? null,
      source: validatedData.source ?? null,
      current_location: validatedData.current_location ?? null,
      target_location: validatedData.target_location ?? null,
    };

    const { data, error } = await supabase
      .from('waitlist')
      .insert([payload as any])   // temporary cast
      .select('id,email')
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    const row = data as WaitlistRow;
    return NextResponse.json(
      { message: 'Successfully joined waitlist', data: { id: row.id, email: row.email } },
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