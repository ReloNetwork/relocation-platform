import { NextRequest, NextResponse } from 'next/server'
import { startVoiceConsultation, createWebVoiceCall } from '@/lib/retell'

export async function POST(request: NextRequest) {
  try {
    const { type, phoneNumber } = await request.json()

    if (type === 'phone') {
      if (!phoneNumber) {
        return NextResponse.json(
          { error: 'Phone number is required for phone calls' },
          { status: 400 }
        )
      }

      const callSession = await startVoiceConsultation(phoneNumber)
      
      return NextResponse.json({
        success: true,
        callId: callSession.callId,
        status: callSession.status,
        message: 'Voice consultation call initiated'
      })
    }

    if (type === 'web') {
      const webCall = await createWebVoiceCall()
      
      return NextResponse.json({
        success: true,
        accessToken: webCall.accessToken,
        callId: webCall.callId,
        message: 'Web voice call created'
      })
    }

    return NextResponse.json(
      { error: 'Invalid call type. Use "phone" or "web"' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Retell call error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate voice call' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Relo Voice Agent API',
    endpoints: {
      'POST /api/retell/call': 'Start voice consultation',
      'GET /api/retell/call/{callId}': 'Get call details',
      'POST /api/retell/llm-websocket': 'LLM websocket endpoint'
    },
    agent: 'Relo - 24/7 London Relocation Assistant'
  })
}