import { describe, expect, it } from 'vitest'
import { buildConsultationUrl } from '@/lib/consultation-link'

describe('consultation link', () => {
  it('uses the 30-minute team calendar and pre-fills contact details', () => {
    const url = new URL(buildConsultationUrl(undefined, 'Alex Morgan', 'alex@example.com'))
    expect(url.origin).toBe('https://cal.com')
    expect(url.pathname).toBe('/therelonetwork/30min')
    expect(url.searchParams.get('name')).toBe('Alex Morgan')
    expect(url.searchParams.get('email')).toBe('alex@example.com')
  })

  it('honours a configured event path', () => {
    expect(buildConsultationUrl('team/private-call', 'A', 'a@example.com'))
      .toContain('cal.com/team/private-call?')
  })
})
