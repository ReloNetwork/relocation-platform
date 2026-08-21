import 'server-only'

import { z } from 'zod'

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
  fetcher?: typeof fetch
}

type OpenAIResponse = {
  output_text?: string
  output?: Array<{
    type?: string
    content?: Array<{ type?: string; text?: string }>
  }>
}

export const ASK_RELO_INSTRUCTIONS = `You are Ask Relo, The Relo Network's calm, precise London relocation guide.

Your job is to help internationally mobile professionals and families frame decisions, compare trade-offs and identify sensible next steps. Be concise, practical and editorial in tone.

Accuracy and trust rules:
- Never invent a partner, property, school place, price, availability, client result or relationship.
- Never imply that The Relo Network has vetted or can introduce a provider unless that provider is supplied in the conversation.
- Treat visa, immigration, legal, tax, financial, school-admissions, transport-fare and live property information as time-sensitive. Explain the decision framework, say that details can change, and direct the user to the relevant official authority or qualified professional for verification.
- Do not provide definitive legal, immigration, tax, medical or financial advice.
- Do not claim to have searched live listings or checked current availability.
- If the answer depends on missing context, ask one focused question instead of guessing.
- For urgent, complex or multi-part moves, suggest the private relocation brief at /executive-intake.
- Never ask for passport numbers, payment-card details, health records or other highly sensitive personal information.
- Stay focused on moving to and living in London.

Use short paragraphs and bullets where helpful. Do not use sales hype.`

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
  const response = await (options.fetcher || fetch)(
    'https://api.openai.com/v1/responses',
    {
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
        max_output_tokens: 700,
        store: false,
      }),
      signal: AbortSignal.timeout(20_000),
    },
  )

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `OpenAI Responses API returned ${response.status}: ${detail.slice(0, 300)}`,
    )
  }

  const answer = extractResponseText((await response.json()) as OpenAIResponse)
  if (!answer) throw new Error('OpenAI response did not contain answer text')

  return answer
}
