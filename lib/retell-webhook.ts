import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'
import { z } from 'zod'

const FIVE_MINUTES_MS = 5 * 60 * 1000

export const retellWebhookSchema = z.object({
  event: z.enum(['call_started', 'call_ended', 'call_analyzed']),
  call: z.object({
    call_id: z.string().min(1).max(200),
    agent_id: z.string().min(1).max(200).optional(),
    start_timestamp: z.number().finite().optional(),
    end_timestamp: z.number().finite().optional(),
    disconnection_reason: z.string().max(200).optional(),
    metadata: z.record(z.unknown()).optional(),
    call_analysis: z.record(z.unknown()).optional(),
  }).passthrough(),
})

export function verifyRetellWebhook(
  rawBody: string,
  signature: string | null,
  apiKey: string,
  now = Date.now(),
) {
  const match = signature?.match(/^v=(\d+),d=([a-fA-F0-9]+)$/)
  if (!match) return false

  const timestamp = Number(match[1])
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > FIVE_MINUTES_MS) {
    return false
  }

  const supplied = Buffer.from(match[2], 'hex')
  const expected = createHmac('sha256', apiKey)
    .update(`${rawBody}${match[1]}`)
    .digest()

  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

export function timestampFromMilliseconds(value?: number) {
  if (!value || !Number.isFinite(value)) return null
  return new Date(value).toISOString()
}

const safeAnalysisKeys = [
  'main_subject',
  'move_stage',
  'urgency',
  'areas_discussed',
  'services_requested',
  'follow_up_consent',
  'human_review_required',
  'next_agreed_action',
] as const

export function sanitiseRetellAnalysis(value?: Record<string, unknown>) {
  if (!value) return {}
  const custom =
    value.custom_analysis_data && typeof value.custom_analysis_data === 'object'
      ? (value.custom_analysis_data as Record<string, unknown>)
      : {}
  const clean: Record<string, unknown> = {}

  if (typeof value.call_successful === 'boolean') {
    clean.call_successful = value.call_successful
  }
  if (typeof value.user_sentiment === 'string') {
    clean.user_sentiment = value.user_sentiment.slice(0, 80)
  }

  for (const key of safeAnalysisKeys) {
    const item = custom[key]
    if (typeof item === 'boolean') clean[key] = item
    if (typeof item === 'string') clean[key] = item.slice(0, 500)
    if (Array.isArray(item)) {
      clean[key] = item
        .filter((entry): entry is string => typeof entry === 'string')
        .slice(0, 10)
        .map((entry) => entry.slice(0, 120))
    }
  }

  return clean
}
