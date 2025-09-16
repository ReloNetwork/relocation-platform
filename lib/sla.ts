export interface SLAStatus {
  status: 'ok' | 'at_risk' | 'breached'
  hoursRemaining?: number
  hoursOver?: number
}

export function inferTaskType(title: string): string {
  const titleLower = title.toLowerCase()
  
  const typeKeywords = {
    survey: ['survey', 'inspection', 'valuation'],
    apartment: ['apartment', 'flat', 'property', 'viewing', 'rental'],
    insurance: ['insurance', 'cover', 'policy'],
    visa: ['visa', 'immigration', 'permit', 'passport'],
    school: ['school', 'education', 'enrollment', 'university'],
    banking: ['bank', 'account', 'finance', 'credit'],
    utilities: ['utility', 'electric', 'gas', 'water', 'internet'],
    moving: ['moving', 'removal', 'transport', 'shipping'],
    legal: ['legal', 'contract', 'solicitor', 'lawyer'],
    medical: ['medical', 'doctor', 'health', 'gp', 'clinic']
  }

  for (const [type, keywords] of Object.entries(typeKeywords)) {
    if (keywords.some(keyword => titleLower.includes(keyword))) {
      return type
    }
  }

  return 'default'
}

export function getSLATargetHours(taskType: string): number {
  const slaTargets = {
    survey: 24,
    apartment: 48,
    insurance: 12,
    visa: 72,
    school: 48,
    banking: 24,
    utilities: 12,
    moving: 48,
    legal: 72,
    medical: 24,
    default: 48
  }

  return slaTargets[taskType as keyof typeof slaTargets] || slaTargets.default
}

export function calculateSLAStatus(
  createdAt: string, 
  dueAt: string | null, 
  title: string
): SLAStatus {
  const now = new Date()
  const created = new Date(createdAt)
  const taskType = inferTaskType(title)
  const targetHours = getSLATargetHours(taskType)
  
  // Use due date if available, otherwise created_at + target_hours
  const due = dueAt ? new Date(dueAt) : null
  const deadline = due || new Date(created.getTime() + (targetHours * 60 * 60 * 1000))
  
  const diffMs = deadline.getTime() - now.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  
  if (diffHours > 4) {
    return { status: 'ok', hoursRemaining: diffHours }
  } else if (diffHours > 0) {
    return { status: 'at_risk', hoursRemaining: diffHours }
  } else {
    return { status: 'breached', hoursOver: Math.abs(diffHours) }
  }
}