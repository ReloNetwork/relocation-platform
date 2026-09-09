import { z } from 'zod'
import { askReloMessageSchema } from '@/lib/ask-relo'

export const askReloFollowupSchema = z.object({
  sessionId: z.string().uuid(),
  email: z.string().trim().email().max(254),
  consent: z.literal(true),
  messages: z.array(askReloMessageSchema).min(2).max(12),
})

export type AskReloFollowup = z.infer<typeof askReloFollowupSchema>

export function compactConversation(messages: AskReloFollowup['messages']) {
  return messages.slice(-8).map(({ role, content }) => ({
    role,
    content: content.trim().slice(0, 3000),
  }))
}
