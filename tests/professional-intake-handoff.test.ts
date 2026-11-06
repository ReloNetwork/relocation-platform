import { describe, expect, it } from 'vitest'
import { mapProfessionalBriefToIntake } from '@/lib/professional-intake-handoff'

describe('professional plan handoff', () => {
  it('carries all answered details into the booking brief', () => {
    const mapped = mapProfessionalBriefToIntake({
      situation: 'moving',
      workArea: 'canary',
      commute: '45',
      budget: '5,000-7,500',
      household: 'couple',
      priority: 'home',
      timing: '2026-12-01',
    })
    expect(mapped).toMatchObject({
      journeyStage: 'moving',
      workArea: 'Canary Wharf',
      commuteLimit: '45',
      budget: '5000-7500',
      adults: '2',
      children: '0',
      moveDate: '2026-12-01',
    })
    expect(mapped.otherRequirements).toContain('main concern: home')
  })

  it('asks for the actual number of children rather than assuming it', () => {
    const mapped = mapProfessionalBriefToIntake({
      situation: 'already-here',
      workArea: 'west',
      commute: '30',
      budget: '3,000-5,000',
      household: 'family',
      priority: 'school',
      timing: '2027-01-20',
    })
    expect(mapped.children).toBe('')
    expect(mapped.schoolingSupport).toBe(true)
    expect(mapped.otherRequirements).toContain('family with children')
  })
})
