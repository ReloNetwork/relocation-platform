export type ProfessionalBrief = {
  situation: 'moving' | 'already-here'
  workArea: string
  commute: '30' | '45' | '60'
  budget: string
  household: 'one' | 'couple' | 'family'
  priority: 'area' | 'home' | 'school' | 'settling'
  timing: string
}

const areaStarts: Record<string, string[]> = {
  city: ['Islington', 'Bermondsey', 'Greenwich'],
  canary: ['Greenwich', 'Blackheath', 'Bermondsey'],
  west: ['Marylebone', 'Chiswick', 'Battersea'],
  kings: ['Islington', 'Camden', 'Hampstead'],
  other: [],
}

export function makeProfessionalBrief(brief: ProfessionalBrief, today = new Date()) {
  const areas = areaStarts[brief.workArea] || []
  const daysToTarget = Math.ceil(
    (new Date(`${brief.timing}T12:00:00Z`).getTime() - today.getTime()) / 86_400_000,
  )
  const timingNote = daysToTarget <= 90
    ? 'Your target date is within three months. Confirm the commute and any school requirements now, before relying on a property shortlist.'
    : 'You have time to compare several areas. Use that time to test your actual commute and refine the home requirements before viewing properties.'
  const firstDecision =
    brief.priority === 'school' || brief.household === 'family'
      ? 'Check the school route before committing to a home.'
      : brief.priority === 'home'
        ? 'Set your non-negotiable home requirements before viewing properties.'
        : 'Choose a realistic work-to-home corridor before searching properties.'

  const steps = [
    brief.workArea === 'other'
      ? `Test potential home areas against your actual workplace at the time you normally travel. Use ${brief.commute} minutes as your initial door-to-door limit.`
      : `Start with ${areas.join(', ')} as areas to investigate, then test each door-to-door journey to work at your real travel time. Use ${brief.commute} minutes as your initial limit.`,
    `Compare current homes within your £${brief.budget.replace('-', '–£')} monthly rent band. Check council tax, travel costs and upfront costs before deciding what feels affordable.`,
    brief.household === 'family' || brief.priority === 'school'
      ? 'Before signing a tenancy, check each school’s current admissions rules, application dates and availability directly with the school or local authority.'
      : brief.situation === 'already-here'
        ? 'Identify what is not working in your current London setup, then compare a change of area or home against the cost and disruption of moving.'
        : 'List the first-month essentials: housing, banking, healthcare and local routines. Decide which need help before arrival.',
  ]

  return { firstDecision, steps, areas, timingNote }
}
