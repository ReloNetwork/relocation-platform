import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { messageSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = messageSchema.parse(body);
    
    const supabase = createServerSupabase();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify user has access to the case
    const { data: caseAccess } = await supabase
      .from('move_cases')
      .select('id')
      .eq('id', validatedData.case_id)
      .or(`client_id.eq.${user.id},concierge_id.eq.${user.id}`)
      .single();
    
    if (!caseAccess) {
      return NextResponse.json(
        { error: 'Access denied to this case' },
        { status: 403 }
      );
    }
    
    // Insert message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        ...validatedData,
        sender_id: user.id,
      })
      .select(`
        *,
        sender:users(email)
      `)
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }
    
    // TODO: Send notification to other case participants
    
    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        data 
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const caseId = searchParams.get('case_id');
    
    if (!caseId) {
      return NextResponse.json(
        { error: 'case_id parameter required' },
        { status: 400 }
      );
    }
    
    const supabase = createServerSupabase();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify user has access to the case
    const { data: caseAccess } = await supabase
      .from('move_cases')
      .select('id')
      .eq('id', caseId)
      .or(`client_id.eq.${user.id},concierge_id.eq.${user.id}`)
      .single();
    
    if (!caseAccess) {
      return NextResponse.json(
        { error: 'Access denied to this case' },
        { status: 403 }
      );
    }
    
    // Get messages
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users(email)
      `)
      .eq('case_id', caseId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}