import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import {
  partnerApplicationSchema,
  scorePartnerApplication,
} from '@/lib/partner-sales'
import { POST as submitPartnerApplication } from '@/app/api/partner-application/submit/route'

const baseApplication = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  role: 'partnerships' as const,
  company: 'Example London Ltd',
  website: 'https://example.com',
  serviceCategory: 'Serviced accommodation',
  partnershipInterest: 'editorial' as const,
  audienceFit: 'yes' as const,
  objective: 'enquiries' as const,
  budget: '5000-15000' as const,
  timing: '0-30' as const,
  message: 'We serve international executive families arriving in London and want to commission a practical briefing that helps them compare temporary accommodation options with clear decision criteria.',
  consent: 'yes' as const,
}

function request(body: unknown) {
  return new NextRequest('https://example.test/api/partner-application/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  delete process.env.RESEND_API_KEY
})

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  delete process.env.RESEND_API_KEY
})

describe('partner qualification', () => {
  it('marks an audience-aligned, funded and ready campaign as priority', () => {
    const application = partnerApplicationSchema.parse(baseApplication)
    expect(scorePartnerApplication(application)).toEqual({ score: 9, quality: 'priority' })
  })

  it('routes an early, low-budget application to nurture', () => {
    const application = partnerApplicationSchema.parse({
      ...baseApplication,
      website: '',
      audienceFit: 'not-yet',
      budget: 'under-2500',
      timing: 'exploring',
      message: 'We are exploring whether the audience could be relevant to our future plans.',
    })
    expect(scorePartnerApplication(application)).toEqual({ score: 0, quality: 'nurture' })
  })
})

describe('partner application route', () => {
  it('rejects malformed or unconsented submissions', async () => {
    expect((await submitPartnerApplication(request({ email: 'invalid' }))).status).toBe(400)
    expect((await submitPartnerApplication(request({ ...baseApplication, consent: 'no' }))).status).toBe(400)
  })

  it('fails closed when production services are unavailable', async () => {
    const response = await submitPartnerApplication(request(baseApplication))
    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toMatchObject({ success: false })
  })
})
