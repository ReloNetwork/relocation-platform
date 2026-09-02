import { createHmac } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import {
  sanitiseRetellAnalysis,
  timestampFromMilliseconds,
  verifyRetellWebhook,
} from '@/lib/retell-webhook'

describe('Retell webhook boundary', () => {
  it('accepts a current authentic signature', () => {
    const body = JSON.stringify({ event: 'call_analyzed', call: { call_id: 'call-1' } })
    const timestamp = 1_788_300_000_000
    const key = 'webhook-test-key'
    const digest = createHmac('sha256', key)
      .update(`${body}${timestamp}`)
      .digest('hex')

    expect(
      verifyRetellWebhook(body, `v=${timestamp},d=${digest}`, key, timestamp),
    ).toBe(true)
  })

  it('rejects modified, malformed and replayed requests', () => {
    const body = '{}'
    const timestamp = 1_788_300_000_000
    const key = 'webhook-test-key'
    const digest = createHmac('sha256', key)
      .update(`${body}${timestamp}`)
      .digest('hex')

    expect(verifyRetellWebhook('{ }', `v=${timestamp},d=${digest}`, key, timestamp)).toBe(false)
    expect(verifyRetellWebhook(body, 'invalid', key, timestamp)).toBe(false)
    expect(
      verifyRetellWebhook(body, `v=${timestamp},d=${digest}`, key, timestamp + 300_001),
    ).toBe(false)
  })

  it('normalises Retell millisecond timestamps', () => {
    expect(timestampFromMilliseconds(0)).toBeNull()
    expect(timestampFromMilliseconds(1_788_300_000_000)).toBe(
      '2026-09-01T22:00:00.000Z',
    )
  })

  it('keeps approved analysis fields and drops summaries or transcripts', () => {
    expect(
      sanitiseRetellAnalysis({
        call_successful: true,
        call_summary: 'Contains personal conversation detail',
        transcript: 'Do not store this',
        custom_analysis_data: {
          move_stage: 'planning',
          areas_discussed: ['Greenwich', 'Southwark'],
          unknown_profile: 'drop this',
        },
      }),
    ).toEqual({
      call_successful: true,
      move_stage: 'planning',
      areas_discussed: ['Greenwich', 'Southwark'],
    })
  })
})
