import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract task data from Lindy webhook
    const {
      title,
      description,
      category,
      priority = 'medium',
      dueDate,
      source = 'lindy_ai',
      callId,
      extractedInfo,
      caseId // Optional: if we know which case this belongs to
    } = body
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }
    
    const supabase = createServerSupabase()
    
    // For Lindy-generated tasks, we might need to:
    // 1. Create a new case if one doesn't exist
    // 2. Associate with existing case
    // 3. Create orphaned task for later assignment
    
    let targetCaseId = caseId
    
    // If we have client info but no case, try to find or create one
    if (!targetCaseId && extractedInfo?.email) {
      // Try to find existing case for this client
      const { data: existingCase } = await supabase
        .from('move_cases')
        .select('id')
        .eq('client_email', extractedInfo.email)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      if (existingCase) {
        targetCaseId = existingCase.id
      } else if (extractedInfo.name && extractedInfo.email) {
        // Create new case for this client
        const { data: newCase, error: caseError } = await supabase
          .from('move_cases')
          .insert({
            client_name: extractedInfo.name,
            client_email: extractedInfo.email,
            client_phone: extractedInfo.phone,
            status: 'initial_consultation',
            source: 'lindy_voice_call',
            budget_range: extractedInfo.budget,
            timeline: extractedInfo.timeline,
            services_needed: extractedInfo.servicesNeeded,
            urgency: extractedInfo.urgency || 'medium',
            notes: `Case created from Lindy AI voice call: ${callId || 'unknown'}`
          })
          .select('id')
          .single()
        
        if (!caseError && newCase) {
          targetCaseId = newCase.id
          console.log('Created new case from Lindy call:', newCase.id)
        }
      }
    }
    
    // Prepare task data
    const taskData = {
      title,
      description,
      category: category || 'general',
      priority,
      due_date: dueDate,
      status: 'todo',
      source: 'lindy_ai',
      metadata: {
        callId,
        extractedInfo,
        createdByLindy: true,
        timestamp: new Date().toISOString()
      },
      ...(targetCaseId && { case_id: targetCaseId })
    }
    
    // Insert task
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single()
    
    if (error) {
      console.error('Failed to create Lindy task:', error)
      return NextResponse.json(
        { error: 'Failed to create task' },
        { status: 500 }
      )
    }
    
    // If we created a case, also create a consultation task
    if (!caseId && targetCaseId && extractedInfo?.name) {
      await supabase
        .from('tasks')
        .insert({
          title: 'Initial Consultation Follow-up',
          description: `Follow up with ${extractedInfo.name} regarding their London relocation inquiry from voice call`,
          category: 'general',
          priority: 'high',
          due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          status: 'todo',
          case_id: targetCaseId,
          source: 'lindy_ai',
          metadata: {
            callId,
            isFollowUp: true,
            clientInfo: extractedInfo
          }
        })
    }
    
    console.log('Created Lindy task successfully:', data.id)
    
    return NextResponse.json({
      success: true,
      message: 'Task created from Lindy AI',
      task: data,
      caseId: targetCaseId,
      caseCreated: !caseId && !!targetCaseId
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating Lindy task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const callId = searchParams.get('call_id')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const supabase = createServerSupabase()
    
    let query = supabase
      .from('tasks')
      .select(`
        *,
        case:move_cases(id, client_name, client_email, status),
        assignee:users(email, full_name)
      `)
      .eq('source', 'lindy_ai')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    // Filter by call ID if provided
    if (callId) {
      query = query.eq('metadata->callId', callId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Failed to fetch Lindy tasks:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tasks' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      tasks: data,
      total: data.length,
      source: 'lindy_ai'
    })
    
  } catch (error) {
    console.error('Error fetching Lindy tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}