import type { ProfessionalBrief } from '@/lib/professional-brief'

const budgetMap: Record<string, string> = {
  '2,000-3,000': '2000-3000',
  '3,000-5,000': '3000-5000',
  '5,000-7,500': '5000-7500',
  '7,500-10,000': '7500-10000',
  '10,000+': '10000+',
}

const officeMap: Record<string, string> = {
  city: 'City / Liverpool Street',
  canary: 'Canary Wharf',
  west: 'West End / Mayfair',
  kings: 'King’s Cross / Euston',
  other: 'Elsewhere / varies',
}

export function mapProfessionalBriefToIntake(data: ProfessionalBrief) {
  return {
    moveDate: data.timing,
    budget: budgetMap[data.budget] || '',
    children: data.household === 'family' ? '' : '0',
    adults: data.household === 'couple' ? '2' : '1',
    schoolsPriority: data.priority === 'school' ? 'high' : 'medium',
    schoolingSupport: data.priority === 'school',
    lifestyleSupport: data.priority === 'settling',
    journeyStage: data.situation,
    workArea: officeMap[data.workArea] || '',
    commuteLimit: data.commute,
    otherRequirements: `Starting plan: ${data.situation === 'already-here' ? 'already living in London' : 'moving to London'}; ${data.household === 'family' ? 'family with children' : data.household === 'couple' ? 'couple' : 'individual'}; main concern: ${data.priority}.`,
  }
}
