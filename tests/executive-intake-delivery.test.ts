import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  send: vi.fn(),
}))

vi.mock('@/lib/supabase/service', () => ({
  createServiceClient: () => ({
    from: () => ({ insert: mocks.insert }),
  }),
}))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mocks.send }
  },
}))

import { POST } from '@/app/api/executive-intake/route'

const intake = {
  name: 'Preview Test',
  email: 'preview@example.com',
  moveDate: '2026-12-01',
  budget: '3000-5000',
  preferredAreas: [],
  children: '0',
  consent: true,
}

function request() {
  return new NextRequest('https://preview.example.com/api/executive-intake', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(intake),
  })
}

beforeEach(() => {
  process.env.RESEND_API_KEY = 're_test'
  mocks.insert.mockReset().mockResolvedValue({ error: { code: 'PGRST205' } })
  mocks.send.mockReset()
})

afterEach(() => {
  delete process.env.RESEND_API_KEY
})

describe('executive intake email fallback', () => {
  it('allows booking only after the team email succeeds when storage is unavailable', async () => {
    mocks.send.mockResolvedValue({ data: { id: 'email-1' }, error: null })

    const response = await POST(request())
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      delivery: 'team-email',
    })
    expect(mocks.send).toHaveBeenCalledTimes(2)
    expect(mocks.send.mock.calls[0][0].to).toEqual(['hello@therelonetwork.com'])
  })

  it('does not invite booking if neither storage nor the team inbox received the brief', async () => {
    mocks.send.mockResolvedValue({ data: null, error: { message: 'Delivery failed' } })

    const response = await POST(request())
    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toMatchObject({ success: false })
    expect(mocks.send).toHaveBeenCalledTimes(1)
  })
})
