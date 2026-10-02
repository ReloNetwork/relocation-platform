import { describe, expect, it } from 'vitest'
import { makeProfessionalBrief } from '@/lib/professional-brief'

describe('international professional starting plan', () => {
  it('leads a family with school needs to check admissions before housing', () => {
    const plan = makeProfessionalBrief({
      situation: 'moving',
      workArea: 'canary',
      commute: '45',
      budget: '5,000-7,500',
      household: 'family',
      priority: 'school',
      timing: '2026-12-01',
    }, new Date('2026-10-01T00:00:00Z'))
    expect(plan.firstDecision).toMatch(/school route/i)
    expect(plan.areas).toContain('Greenwich')
    expect(plan.steps[2]).toMatch(/current admissions rules/i)
    expect(plan.timingNote).toMatch(/within three months/i)
  })

  it('does not invent area suggestions when the work location varies', () => {
    const plan = makeProfessionalBrief({
      situation: 'already-here',
      workArea: 'other',
      commute: '30',
      budget: '3,000-5,000',
      household: 'one',
      priority: 'settling',
      timing: '2027-01-01',
    }, new Date('2026-10-01T00:00:00Z'))
    expect(plan.areas).toEqual([])
    expect(plan.steps[0]).toMatch(/actual workplace/i)
    expect(plan.steps[2]).toMatch(/current London setup/i)
    expect(plan.timingNote).toMatch(/time to compare/i)
  })
})
