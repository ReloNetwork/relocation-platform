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

export const PARTNER_MEDIA_PACK_VERSION = '2026.08'

export const partnerInventory = [
  {
    name: 'The London Brief lead sponsor',
    availability: 'One lead sponsor per issue',
    includes: 'A sponsor credit at the start, one useful message, one tracked link and a report after the issue is sent.',
  },
  {
    name: 'Sponsored Journal article',
    availability: 'Up to two commissioned briefings per month',
    includes: 'Planning, writing support, clear sponsorship labelling, a permanent article page, newsletter distribution and tracked links.',
  },
  {
    name: 'Editorial Partner Pilot',
    availability: 'A limited launch cohort',
    includes: 'One sponsored article, two newsletter placements, a reviewed Network profile and a final report.',
  },
] as const
