import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { taskSchema, taskUpdateSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = taskSchema.parse(body);
    
    const supabase = createServerSupabase();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user is concierge or admin (only they can create tasks)
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (!userData || !['concierge', 'admin'].includes(userData.role)) {
      return NextResponse.json(
        { error: 'Only concierge staff can create tasks' },
        { status: 403 }
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
    
    // Insert task
    const { data, error } = await supabase
      .from('tasks')
      .insert(validatedData)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create task' },
        { status: 500 }
      );
    }
    
    // TODO: Send notification to assignee
    
    return NextResponse.json(
      { 
        message: 'Task created successfully',
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
    
    // Get tasks for the case
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assignee:users(email)
      `)
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tasks' },
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = taskUpdateSchema.parse(body);
    const { id, ...updateData } = validatedData;
    
    const supabase = createServerSupabase();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get task and verify access
    const { data: task } = await supabase
      .from('tasks')
      .select(`
        *,
        move_case:move_cases(client_id, concierge_id)
      `)
      .eq('id', id)
      .single();
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to update this task
    const canUpdate = task.assignee_id === user.id || 
                      task.move_case.client_id === user.id || 
                      task.move_case.concierge_id === user.id;
    
    if (!canUpdate) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Update task
    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Task updated successfully',
        data 
      }
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