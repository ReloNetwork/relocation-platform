import 'server-only'

import { ASK_RELO_VOICE_MAX_DURATION_MS } from '@/lib/ask-relo-config'
import { RELO_SHARED_POLICY } from '@/lib/relo-shared-policy'

interface RetellWebCallResponse {
  access_token?: string
  call_id?: string
}

export interface WebVoiceCall {
  accessToken: string
  callId: string
}

export const ASK_RELO_VOICE_INSTRUCTIONS = RELO_SHARED_POLICY + `\n\nVOICE DELIVERY: Respond in natural spoken British English, normally 45–80 words. Speak clearly, allow interruption, and do not force lists or robotic recaps. Pronounce Greenwich as GREN-itch and Southwark as SUTH-uk.\n`

export const ASK_RELO_VOICE_GREETING =
  "Hello, I'm Relo, your London relocation guide. Tell me the decision you need help with and one important constraint, such as work, schools or budget. I'll recommend the strongest options straight away."

export async function createWebVoiceCall(sessionId?: string): Promise<WebVoiceCall> {
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
      agent_override: {
        agent: {
          max_call_duration_ms: ASK_RELO_VOICE_MAX_DURATION_MS,
          pronunciation_dictionary: [
            {
              word: 'Greenwich',
              alphabet: 'ipa',
              phoneme: 'ˈɡɹɛnɪtʃ',
            },
            {
              word: 'Southwark',
              alphabet: 'ipa',
              phoneme: 'ˈsʌðək',
            },
          ],
        },
        retell_llm: {
          general_prompt: ASK_RELO_VOICE_INSTRUCTIONS,
          begin_message: ASK_RELO_VOICE_GREETING,
        },
        conversation_flow: {
          global_prompt: ASK_RELO_VOICE_INSTRUCTIONS,
        },
      },
      metadata: {
        source: 'ask_relo_web',
        ...(sessionId ? { session_id: sessionId } : {}),
      },
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
