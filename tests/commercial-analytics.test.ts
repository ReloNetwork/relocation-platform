import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/analytics/route'
import { GET as runRetention } from '@/app/api/cron/data-retention/route'

function analyticsRequest(body: unknown) {
  return new NextRequest('https://example.test/api/analytics', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  })
}

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  delete process.env.CRON_SECRET
})

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  delete process.env.CRON_SECRET
})

describe('privacy-minimised commercial analytics', () => {
  it('rejects unknown events and content-shaped metadata', async () => {
    const base = { journey: 'newsletter', sessionId: crypto.randomUUID(), path: '/newsletter' }
    expect((await POST(analyticsRequest({ ...base, event: 'email_captured' }))).status).toBe(400)
    expect((await POST(analyticsRequest({ ...base, event: 'newsletter_submitted', metadata: { email: 'a'.repeat(121) } }))).status).toBe(400)
  })

  it('fails closed when durable storage is unavailable', async () => {
    const response = await POST(analyticsRequest({
      event: 'newsletter_submitted', journey: 'newsletter', sessionId: crypto.randomUUID(), path: '/newsletter', metadata: {},
    }))
    expect(response.status).toBe(503)
  })

  it('does not expose the retention job without cron authorization', async () => {
    expect((await runRetention(new Request('https://example.test/api/cron/data-retention'))).status).toBe(401)
  })
})
