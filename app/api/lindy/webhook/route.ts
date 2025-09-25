import { NextRequest, NextResponse } from 'next/server'
import { createLindyWebhookHandler, LindyWebhookEvent } from '@/lib/lindy'

const webhookHandler = createLindyWebhookHandler()

export async function POST(request: NextRequest) {
  try {
    // Get webhook signature from headers
    const signature = request.headers.get('x-lindy-signature') || 
                     request.headers.get('x-signature') || 
                     request.headers.get('signature') || ''
    
    // Get raw payload
    const payload = await request.text()
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Empty payload' },
        { status: 400 }
      )
    }

    console.log('Received Lindy webhook:', {
      signature: signature ? 'present' : 'missing',
      payloadLength: payload.length,
      timestamp: new Date().toISOString()
    })

    // Process webhook
    const result = await webhookHandler.handleWebhook(payload, signature)
    
    // Log successful processing
    console.log('Lindy webhook processed successfully:', result.status)
    
    return NextResponse.json({
      success: true,
      status: result.status,
      message: result.message,
      ...(result.summary && { summary: result.summary }),
      ...(result.task && { task: result.task }),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Lindy webhook error:', error)
    
    // Return appropriate error response
    if (error instanceof Error) {
      if (error.message.includes('Invalid webhook signature')) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid signature' },
          { status: 401 }
        )
      }
      
      if (error.message.includes('JSON')) {
        return NextResponse.json(
          { error: 'Invalid JSON payload' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error processing webhook' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Webhook endpoint info
  return NextResponse.json({
    service: 'Lindy AI Webhook Handler',
    description: 'Processes voice agent events from Lindy AI',
    endpoint: '/api/lindy/webhook',
    methods: ['POST'],
    events: [
      'call_started - When a voice call begins',
      'call_ended - When a voice call ends with transcript',
      'task_created - When Lindy creates a task',
      'message_received - Real-time message processing',
      'agent_action - Specific agent actions (schedule, recommend, etc.)'
    ],
    authentication: 'Webhook signature verification (x-lindy-signature header)',
    integration: {
      tasks: 'Auto-creates tasks based on call content',
      cases: 'Creates new cases for qualified leads',
      partners: 'Recommends relevant service partners',
      followUp: 'Schedules follow-up actions based on urgency'
    },
    status: 'active',
    timestamp: new Date().toISOString()
  })
}

// Handle webhook verification/challenge (if Lindy uses this pattern)
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'Webhook endpoint ready' },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-lindy-signature, x-signature, signature',
      },
    }
  )
}