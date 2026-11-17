import 'server-only'

import { z } from 'zod'
import { RELO_SHARED_POLICY } from '@/lib/relo-shared-policy'

export const askReloMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(3000),
})

export const askReloRequestSchema = z.object({
  sessionId: z.string().uuid(),
  messages: z
    .array(askReloMessageSchema)
    .min(1)
    .max(12)
    .refine((messages) => messages.at(-1)?.role === 'user'),
})

export type AskReloMessage = z.infer<typeof askReloMessageSchema>

type AskReloClientOptions = {
  apiKey: string
  model: string
  provider?: 'openai' | 'xai'
  fetcher?: typeof fetch
}

type OpenAIResponse = {
  output_text?: string
  output?: Array<{
    type?: string
    content?: Array<{ type?: string; text?: string }>
  }>
}

export const ASK_RELO_INSTRUCTIONS = RELO_SHARED_POLICY

function extractResponseText(response: OpenAIResponse) {
  if (response.output_text?.trim()) return response.output_text.trim()

  return (response.output || [])
    .flatMap((item) => item.content || [])
    .filter((content) => content.type === 'output_text' && content.text)
    .map((content) => content.text?.trim())
    .filter(Boolean)
    .join('\n\n')
}

export async function createAskReloAnswer(
  messages: AskReloMessage[],
  options: AskReloClientOptions,
) {
  const fetcher = options.fetcher || fetch
  let lastError: unknown

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetcher(options.provider === 'xai' ? 'https://api.x.ai/v1/responses' : 'https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model,
          instructions: ASK_RELO_INSTRUCTIONS,
          input: messages.slice(-10).map(({ role, content }) => ({
            role,
            content,
          })),
          max_output_tokens: 1200,
          store: false,
        }),
        signal: AbortSignal.timeout(30_000),
      })

      if (!response.ok) {
        const detail = await response.text()
        const error = new Error(
          `AI provider returned ${response.status}: ${detail.slice(0, 300)}`,
        )
        if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
          lastError = error
          continue
        }
        throw error
      }

      const answer = extractResponseText((await response.json()) as OpenAIResponse)
      if (!answer) throw new Error('OpenAI response did not contain answer text')
      return answer
    } catch (error) {
      lastError = error
      const message = error instanceof Error ? error.message : ''
      const retryable = /abort|timeout|fetch failed|network/i.test(message)
      if (attempt === 0 && retryable) continue
      throw error
    }
  }

  throw lastError || new Error('Ask Relo answer generation failed')
}
