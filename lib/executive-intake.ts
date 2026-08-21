import { z } from 'zod'

const optionalText = (max: number) =>
  z.union([z.string().trim().max(max), z.literal('')]).optional()

export const executiveIntakeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: optionalText(40),
  currentLocation: optionalText(160),
  moveDate: z.string().date(),
  flexibility: optionalText(40),
  budget: z.enum([
    '2000-3000',
    '3000-5000',
    '5000-7500',
    '7500-10000',
    '10000+',
  ]),
  budgetFlexible: z.boolean().default(false),
  preferredAreas: z.array(z.string().trim().min(2).max(80)).min(1).max(5),
  avoidAreas: optionalText(500),
  propertyType: optionalText(40),
  propertyPriority: z.enum(['low', 'medium', 'high']).default('medium'),
  schoolsPriority: z.enum(['low', 'medium', 'high']).default('medium'),
  visaPriority: z.enum(['low', 'medium', 'high']).default('medium'),
  adults: z.string().trim().max(10).default('1'),
  children: z.string().trim().max(10).default('0'),
  childrenAges: optionalText(100),
  pets: z.boolean().default(false),
  visaSupport: z.boolean().default(false),
  taxationSupport: z.boolean().default(false),
  bankingSupport: z.boolean().default(false),
  schoolingSupport: z.boolean().default(false),
  lifestyleSupport: z.boolean().default(false),
  otherRequirements: optionalText(3000),
  urgency: z.enum(['emergency', 'urgent', 'normal']).default('normal'),
  specialRequirements: optionalText(3000),
  consent: z.literal(true),
})

export type ExecutiveIntake = z.infer<typeof executiveIntakeSchema>
export type ExecutiveLeadQuality = 'priority' | 'qualified' | 'nurture'

const budgetScore: Record<ExecutiveIntake['budget'], number> = {
  '2000-3000': 0,
  '3000-5000': 1,
  '5000-7500': 2,
  '7500-10000': 3,
  '10000+': 4,
}

export function scoreExecutiveIntake(
  intake: ExecutiveIntake,
  now = new Date(),
): { score: number; quality: ExecutiveLeadQuality } {
  const moveDate = new Date(`${intake.moveDate}T12:00:00Z`)
  const daysUntilMove = Math.ceil(
    (moveDate.getTime() - now.getTime()) / 86_400_000,
  )
  const supportCount = [
    intake.visaSupport,
    intake.taxationSupport,
    intake.bankingSupport,
    intake.schoolingSupport,
    intake.lifestyleSupport,
  ].filter(Boolean).length

  let score = budgetScore[intake.budget]
  if (daysUntilMove >= 0 && daysUntilMove <= 90) score += 2
  if (intake.urgency === 'urgent' || intake.urgency === 'emergency') score += 1
  if (supportCount >= 2) score += 2
  if (intake.children !== '0' || intake.schoolsPriority === 'high') score += 1

  return {
    score,
    quality: score >= 7 ? 'priority' : score >= 4 ? 'qualified' : 'nurture',
  }
}

export function createExecutiveReference() {
  return `RL-${crypto.randomUUID().split('-')[0].toUpperCase()}`
}
