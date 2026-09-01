import 'server-only'

interface RetellWebCallResponse {
  access_token?: string
  call_id?: string
}

export interface WebVoiceCall {
  accessToken: string
  callId: string
}

export async function createWebVoiceCall(): Promise<WebVoiceCall> {
  const apiKey = process.env.RETELL_API_KEY
  const agentId = process.env.RETELL_AGENT_ID

  if (!apiKey || !agentId) {
    throw new Error('Retell voice configuration is unavailable')
  }

  const response = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: agentId,
      metadata: { source: 'ask_relo_web' },
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    console.error('Retell API rejected web call creation', response.status)
    throw new Error('Retell rejected web call creation')
  }

  const data = (await response.json()) as RetellWebCallResponse
  if (!data.access_token || !data.call_id) {
    console.error('Retell API returned an incomplete web call response')
    throw new Error('Retell returned an incomplete web call response')
  }

  return {
    accessToken: data.access_token,
    callId: data.call_id,
  }
}
