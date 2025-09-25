import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { calculateSLAStatus } from '@/lib/sla';

interface TaskForSLA {
  id: string;
  title: string;
  case_id: string;
  due_at: string | null;
  status: string;
  created_at: string;
}

interface SLAAlert {
  task: TaskForSLA;
  hoursUntilDue: number;
  severity: 'high' | 'medium' | 'low';
}

function calculateSeverity(hoursUntilDue: number): 'high' | 'medium' | 'low' {
  if (hoursUntilDue <= 2) return 'high';
  if (hoursUntilDue <= 12) return 'medium';
  return 'low';
}

function formatSLAAlert(alert: SLAAlert): string {
  const severity = alert.severity.toUpperCase();
  const hours = Math.max(0, alert.hoursUntilDue);
  const timeText = hours < 1 ? 'OVERDUE' : `${Math.ceil(hours)}h remaining`;
  
  return `[${severity}] ${alert.task.title} (Case: ${alert.task.case_id.slice(0, 8)}) - ${timeText}`;
}

function generateEmailSubject(alerts: SLAAlert[]): string {
  const highPriority = alerts.filter(a => a.severity === 'high').length;
  const mediumPriority = alerts.filter(a => a.severity === 'medium').length;
  
  if (highPriority > 0) {
    return `🚨 URGENT: ${highPriority} high-priority task(s) due soon`;
  } else if (mediumPriority > 0) {
    return `⚠️ SLA Alert: ${mediumPriority} task(s) approaching deadline`;
  } else {
    return `📅 SLA Reminder: ${alerts.length} task(s) due in 24h`;
  }
}

function generateEmailBody(alerts: SLAAlert[]): string {
  const grouped = {
    high: alerts.filter(a => a.severity === 'high'),
    medium: alerts.filter(a => a.severity === 'medium'),
    low: alerts.filter(a => a.severity === 'low')
  };

  let body = 'Task Deadlines Approaching:\n\n';

  if (grouped.high.length > 0) {
    body += '🚨 HIGH PRIORITY (Due within 2 hours):\n';
    grouped.high.forEach(alert => {
      body += `• ${formatSLAAlert(alert)}\n`;
    });
    body += '\n';
  }

  if (grouped.medium.length > 0) {
    body += '⚠️ MEDIUM PRIORITY (Due within 12 hours):\n';
    grouped.medium.forEach(alert => {
      body += `• ${formatSLAAlert(alert)}\n`;
    });
    body += '\n';
  }

  if (grouped.low.length > 0) {
    body += '📅 LOW PRIORITY (Due within 24 hours):\n';
    grouped.low.forEach(alert => {
      body += `• ${formatSLAAlert(alert)}\n`;
    });
    body += '\n';
  }

  body += 'Review and prioritize these tasks in the admin dashboard.\n';
  body += '\n---\n';
  body += 'This is an automated SLA monitoring alert from Relo Network.';

  return body;
}

export async function GET(request: Request) {
  try {
    // Simple API key authentication for cron jobs
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('api_key') || request.headers.get('x-api-key');
    
    // For cron jobs, allow if API key matches or if called from localhost in development
    const validApiKey = process.env.CRON_API_KEY || 'relo-sla-alerts-key';
    const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!isLocalhost || !isDevelopment) {
      if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ 
          ok: false, 
          error: 'Unauthorized - Valid API key required' 
        }, { status: 401 });
      }
    }
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const now = new Date();
    const soon = new Date(Date.now() + 24*60*60*1000); // next 24h

    // Get tasks approaching due dates OR tasks that should have auto-calculated due dates
    const { data: tasks, error: tasksError } = await sb.from('tasks')
      .select('id,title,case_id,due_at,status,created_at')
      .neq('status', 'done')
      .or(`due_at.lt.${soon.toISOString()},and(due_at.is.null,created_at.lt.${new Date(Date.now() - 4*60*60*1000).toISOString()})`);

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError);
      return NextResponse.json({ ok: false, error: tasksError.message }, { status: 500 });
    }

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ ok: true, count: 0, alerts: [] });
    }

    // Calculate SLA alerts for each task
    const alerts: SLAAlert[] = tasks
      .map(task => {
        const slaStatus = calculateSLAStatus(task.created_at, task.due_at, task.title);
        
        if (slaStatus.status === 'ok' && (slaStatus.hoursRemaining || 0) > 24) {
          return null; // Skip tasks that are well within SLA
        }

        const hoursUntilDue = slaStatus.hoursRemaining || -Math.abs(slaStatus.hoursOver || 0);
        
        return {
          task,
          hoursUntilDue,
          severity: calculateSeverity(hoursUntilDue)
        };
      })
      .filter((alert): alert is SLAAlert => alert !== null);

    // Send email alert if we have alerts and email is configured
    if (process.env.RESEND_API_KEY && alerts.length > 0) {
      const conciergeEmail = process.env.RELO_CONCIERGE_EMAIL || 'alerts@therelonetwork.com';
      
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Relo Alerts <alerts@therelonetwork.com>',
          to: [conciergeEmail],
          subject: generateEmailSubject(alerts),
          text: generateEmailBody(alerts)
        });
        
        console.log(`SLA alert email sent to ${conciergeEmail} for ${alerts.length} tasks`);
      } catch (emailError) {
        console.error('Failed to send SLA alert email:', emailError);
      }
    }

    return NextResponse.json({ 
      ok: true, 
      count: alerts.length,
      alerts: alerts.map(a => ({
        task_id: a.task.id,
        title: a.task.title,
        case_id: a.task.case_id,
        severity: a.severity,
        hours_until_due: a.hoursUntilDue
      }))
    });

  } catch (error: any) {
    console.error('SLA alerts cron job error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}