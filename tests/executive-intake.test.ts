import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import {
  executiveIntakeSchema,
  scoreExecutiveIntake,
} from '@/lib/executive-intake'
import { POST as submitExecutiveIntake } from '@/app/api/executive-intake/route'

const baseIntake = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  phone: '+44 20 0000 0000',
  currentLocation: 'New York, USA',
  moveDate: '2026-09-15',
  flexibility: '1week',
  budget: '7500-10000' as const,
  budgetFlexible: true,
  preferredAreas: ['Marylebone', 'Chelsea'],
  avoidAreas: '',
  propertyType: 'house',
  propertyPriority: 'high' as const,
  schoolsPriority: 'high' as const,
  visaPriority: 'medium' as const,
  adults: '2',
  children: '2',
  childrenAges: '8, 11',
  pets: false,
  visaSupport: true,
  taxationSupport: true,
  bankingSupport: false,
  schoolingSupport: true,
  lifestyleSupport: false,
  otherRequirements: 'School continuity is important.',
  urgency: 'urgent' as const,
  specialRequirements: '',
  consent: true as const,
}

function request(body: unknown) {
  return new NextRequest('https://example.test/api/executive-intake', {
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

describe('executive intake qualification', () => {
  it('identifies a time-sensitive, complex executive family as priority', () => {
    const intake = executiveIntakeSchema.parse(baseIntake)
    expect(
      scoreExecutiveIntake(intake, new Date('2026-08-21T00:00:00Z')),
    ).toEqual({ score: 9, quality: 'priority' })
  })

  it('routes a lower-complexity, lower-budget enquiry to nurture', () => {
    const intake = executiveIntakeSchema.parse({
      ...baseIntake,
      moveDate: '2027-08-21',
      budget: '2000-3000',
      children: '0',
      schoolsPriority: 'low',
      visaSupport: false,
      taxationSupport: false,
      schoolingSupport: false,
      urgency: 'normal',
    })

    expect(
      scoreExecutiveIntake(intake, new Date('2026-08-21T00:00:00Z')),
    ).toEqual({ score: 0, quality: 'nurture' })
  })
})

describe('executive intake route', () => {
  it('rejects malformed or unconsented submissions', async () => {
    expect((await submitExecutiveIntake(request({ email: 'invalid' }))).status).toBe(400)
    expect(
      (await submitExecutiveIntake(request({ ...baseIntake, consent: false }))).status,
    ).toBe(400)
  })

  it('fails closed when production services are unavailable', async () => {
    const response = await submitExecutiveIntake(request(baseIntake))
    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toMatchObject({ success: false })
  })
})
