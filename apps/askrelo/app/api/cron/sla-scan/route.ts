/*
-- SLA Tables Schema (create if missing)
CREATE TABLE IF NOT EXISTS slas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_type TEXT NOT NULL,
  target_hours INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sla_breaches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  breached_at TIMESTAMPTZ NOT NULL,
  hours_over INTEGER NOT NULL,
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default SLA targets
INSERT INTO slas (task_type, target_hours, description) VALUES
('survey', 24, 'Property survey requests'),
('apartment', 48, 'Apartment search and viewing'),
('insurance', 12, 'Insurance documentation'),
('visa', 72, 'Visa application support'),
('school', 48, 'School enrollment assistance'),
('banking', 24, 'Banking setup requests'),
('utilities', 12, 'Utility connection setup'),
('moving', 48, 'Moving service coordination'),
('legal', 72, 'Legal documentation'),
('medical', 24, 'Medical registration'),
('default', 48, 'General task SLA')
ON CONFLICT DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_sla_breaches_task_id ON sla_breaches(task_id);
CREATE INDEX IF NOT EXISTS idx_sla_breaches_breached_at ON sla_breaches(breached_at);
*/

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

interface Task {
  id: string
  title: string
  created_at: string
  due_at: string | null
  case_id: string
  move_cases: {
    route_from: string
    route_to: string
    concierge_id: string | null
    users: {
      email: string
      full_name?: string
    } | null
  }
}

interface SLA {
  task_type: string
  target_hours: number
}

interface BreachData {
  task_id: string
  task_title: string
  case_route: string
  hours_over: number
  concierge_email: string | null
  concierge_name: string | null
}

function inferTaskType(title: string): string {
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

function calculateHoursOver(createdAt: string, dueAt: string | null, targetHours: number): number {
  const now = new Date()
  const created = new Date(createdAt)
  const due = dueAt ? new Date(dueAt) : null
  
  // Use due date if available, otherwise created_at + target_hours
  const deadline = due || new Date(created.getTime() + (targetHours * 60 * 60 * 1000))
  
  if (now <= deadline) {
    return 0 // Not breached
  }
  
  const overMs = now.getTime() - deadline.getTime()
  return Math.floor(overMs / (1000 * 60 * 60)) // Convert to hours
}

async function sendBreachNotification(breaches: BreachData[]) {
  if (breaches.length === 0) return

  // Group breaches by concierge
  const breachesByConierge = breaches.reduce((acc, breach) => {
    const email = breach.concierge_email || 'unassigned'
    if (!acc[email]) acc[email] = []
    acc[email].push(breach)
    return acc
  }, {} as Record<string, BreachData[]>)

  // Send emails to each concierge
  for (const [email, conciergeBreaches] of Object.entries(breachesByConierge)) {
    if (email === 'unassigned') continue // Skip unassigned tasks for now

    const concierge = conciergeBreaches[0]
    const conciergenName = concierge.concierge_name || 'Concierge'

    const breachList = conciergeBreaches
      .map(b => `• ${b.task_title} (${b.case_route}) - ${b.hours_over} hours overdue`)
      .join('\n')

    try {
      await resend.emails.send({
        from: 'SLA Monitor <sla@therelonetwork.com>',
        to: email,
        subject: `SLA Breaches - ${conciergeBreaches.length} Task${conciergeBreaches.length > 1 ? 's' : ''} Overdue`,
        text: `Dear ${conciergenName},

The following task${conciergeBreaches.length > 1 ? 's have' : ' has'} breached SLA targets:

${breachList}

Please review and take appropriate action.

Best regards,
Relo Network SLA Monitor`
      })
    } catch (error) {
      console.error(`Failed to send breach notification to ${email}:`, error)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Security check
    const cronSecret = request.headers.get('x-cron-secret')
    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient()

    // Get all SLA targets
    const { data: slas } = await supabase
      .from('slas')
      .select('task_type, target_hours')

    if (!slas || slas.length === 0) {
      return NextResponse.json({ error: 'No SLA targets configured' }, { status: 500 })
    }

    const slaMap = slas.reduce((acc, sla) => {
      acc[sla.task_type] = sla.target_hours
      return acc
    }, {} as Record<string, number>)

    // Get active tasks that might be breached
    const { data: tasks } = await supabase
      .from('tasks')
      .select(`
        id,
        title,
        created_at,
        due_at,
        case_id,
        move_cases!case_id (
          route_from,
          route_to,
          concierge_id,
          users!concierge_id (
            email,
            full_name
          )
        )
      `)
      .in('status', ['todo', 'doing'])

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ message: 'No active tasks to check' })
    }

    const newBreaches: BreachData[] = []

    for (const task of tasks as Task[]) {
      const taskType = inferTaskType(task.title)
      const targetHours = slaMap[taskType] || slaMap['default'] || 48

      const hoursOver = calculateHoursOver(task.created_at, task.due_at, targetHours)

      if (hoursOver > 0) {
        // Check if breach already recorded
        const { data: existingBreach } = await supabase
          .from('sla_breaches')
          .select('id')
          .eq('task_id', task.id)
          .single()

        if (!existingBreach) {
          // Record new breach
          const { error: insertError } = await supabase
            .from('sla_breaches')
            .insert({
              task_id: task.id,
              breached_at: new Date().toISOString(),
              hours_over: hoursOver
            })

          if (!insertError) {
            newBreaches.push({
              task_id: task.id,
              task_title: task.title,
              case_route: `${task.move_cases.route_from} → ${task.move_cases.route_to}`,
              hours_over: hoursOver,
              concierge_email: task.move_cases.users?.email || null,
              concierge_name: task.move_cases.users?.full_name || null
            })
          }
        }
      }
    }

    // Send breach notifications
    if (newBreaches.length > 0) {
      await sendBreachNotification(newBreaches)
    }

    return NextResponse.json({
      message: 'SLA scan completed',
      tasksChecked: tasks.length,
      newBreaches: newBreaches.length,
      breaches: newBreaches.map(b => ({
        task: b.task_title,
        case: b.case_route,
        hoursOver: b.hours_over
      }))
    })

  } catch (error) {
    console.error('SLA scan error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}