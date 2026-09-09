import { NextRequest, NextResponse } from 'next/server'
import { hasInternalAccess } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  if (!hasInternalAccess(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    // Return configuration info for Lindy AI integration
    const config = {
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/lindy/webhook`,
      enabled: !!process.env.LINDY_WEBHOOK_SECRET,
      agentId: process.env.LINDY_AGENT_ID || null,
      features: {
        taskCreation: true,
        caseManagement: true,
        partnerRecommendations: true,
        callTranscription: true,
        followUpAutomation: true
      },
      supportedEvents: [
        'call_started',
        'call_ended',
        'task_created',
        'message_received',
        'agent_action'
      ],
      integration: {
        retellAI: !!process.env.RETELL_API_KEY,
        supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        status: 'active'
      }
    }
    
    return NextResponse.json(config)
    
  } catch (error) {
    console.error('Error getting Lindy config:', error)
    return NextResponse.json(
      { error: 'Failed to get configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!hasInternalAccess(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const { action } = await request.json()
    
    switch (action) {
      case 'test_webhook':
        // Test webhook functionality
        const testEvent = {
          event_type: 'test',
          timestamp: new Date().toISOString(),
          data: {
            message: 'Test webhook event from configuration'
          }
        }
        
        // In production, you might trigger a test call to your webhook
        return NextResponse.json({
          success: true,
          message: 'Test webhook event would be sent',
          testEvent
        })
      
      case 'validate_config':
        // Validate configuration
        const requiredEnvVars = [
          'LINDY_WEBHOOK_SECRET',
          'NEXT_PUBLIC_BASE_URL',
          'NEXT_PUBLIC_SUPABASE_URL',
          'SUPABASE_SERVICE_ROLE_KEY'
        ]
        
        const missing = requiredEnvVars.filter(envVar => !process.env[envVar])
        
        return NextResponse.json({
          valid: missing.length === 0,
          missing,
          configured: {
            webhookSecret: !!process.env.LINDY_WEBHOOK_SECRET,
            baseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
            supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            agentId: !!process.env.LINDY_AGENT_ID
          }
        })
      
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }
    
  } catch (error) {
    console.error('Error handling Lindy config action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
