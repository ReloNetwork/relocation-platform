import { z } from 'zod'

const optionalUrl = z.union([z.string().trim().url().max(500), z.literal('')]).optional()

export const partnerApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  role: z.enum(['founder', 'marketing', 'partnerships', 'agency', 'other']),
  company: z.string().trim().min(2).max(160),
  website: optionalUrl,
  serviceCategory: z.string().trim().min(2).max(160),
  partnershipInterest: z.enum(['editorial', 'newsletter', 'network', 'ask-relo', 'unsure']),
  audienceFit: z.enum(['yes', 'partly', 'not-yet']),
  objective: z.enum(['authority', 'reach', 'enquiries', 'thought-leadership', 'knowledge']),
  budget: z.enum(['under-2500', '2500-5000', '5000-15000', '15000-plus', 'unsure']),
  timing: z.enum(['0-30', '31-90', '90-plus', 'exploring']),
  message: z.string().trim().min(30).max(4000),
  consent: z.literal('yes'),
})

export type PartnerApplication = z.infer<typeof partnerApplicationSchema>
export type PartnerLeadQuality = 'priority' | 'qualified' | 'nurture'

const budgetScore: Record<PartnerApplication['budget'], number> = {
  'under-2500': 0,
  '2500-5000': 2,
  '5000-15000': 3,
  '15000-plus': 4,
  unsure: 1,
}

const timingScore: Record<PartnerApplication['timing'], number> = {
  '0-30': 2,
  '31-90': 1,
  '90-plus': 0,
  exploring: 0,
}

export function scorePartnerApplication(application: PartnerApplication): {
  score: number
  quality: PartnerLeadQuality
} {
  let score = budgetScore[application.budget] + timingScore[application.timing]
  if (application.audienceFit === 'yes') score += 2
  if (application.audienceFit === 'partly') score += 1
  if (application.website) score += 1
  if (application.message.length >= 120) score += 1

  return {
    score,
    quality: score >= 8 ? 'priority' : score >= 5 ? 'qualified' : 'nurture',
  }
}

export function createPartnerReference() {
  return `PR-${crypto.randomUUID().split('-')[0].toUpperCase()}`
}

export const PARTNER_MEDIA_PACK_VERSION = '2026.09'

export const partnerInventory = [
  {
    name: 'Reviewed business profile',
    availability: '£650 a year',
    includes: 'A checked page about your services in the Network directory, one contact link, an annual update and tracked visits.',
  },
  {
    name: 'London Brief partner message',
    availability: '£750 an issue',
    includes: 'One short, clearly labelled message in the newsletter, with one link and click reporting.',
  },
  {
    name: 'Sponsored Journal article',
    availability: '£1,750',
    includes: 'One permanent sponsored article, one newsletter mention and a report after publication.',
  },
  {
    name: 'Sponsored practical guide',
    availability: '£2,500',
    includes: 'One detailed guide, a downloadable reader tool, two newsletter mentions, a suitable profile and a final report.',
  },
  {
    name: 'Sponsored neighbourhood guide',
    availability: '£3,500',
    includes: 'A balanced guide to one London area, including research, alternatives, two newsletter mentions and reporting.',
  },
  {
    name: 'Expert Q&A series',
    availability: '£4,500 for three months',
    includes: 'An expert profile, three edited question-and-answer articles, promotion and a quarterly report.',
  },
  {
    name: 'Homepage lead story',
    availability: '£1,500 for seven days',
    includes: 'An approved sponsored story shown at the top of the homepage for one week, with one link and reporting.',
  },
  {
    name: 'Three-month content series',
    availability: '£9,500',
    includes: 'Three detailed articles, newsletter support, a reviewed profile, one homepage week and a final report.',
  },
  {
    name: 'Ask Relo partner card',
    availability: '£900 a month after launch testing',
    includes: 'A labelled partner box beside relevant answers, linking to one approved guide or service page. It never changes the answer.',
  },
  {
    name: 'Ask Relo subject partner',
    availability: '£3,500 for three months after launch testing',
    includes: 'Support for one useful subject area, with checked resources, one partner card and reporting. Relo controls every answer.',
  },
] as const
