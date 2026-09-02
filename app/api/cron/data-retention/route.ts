import { NextResponse } from 'next/server'
import { hasCronAccess } from '@/lib/api-auth'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (!hasCronAccess(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()
  const analyticsCutoff = new Date(Date.now() - 396 * 86_400_000).toISOString()
  const askReloCutoff = new Date(Date.now() - 90 * 86_400_000).toISOString()
  const prospectCutoff = new Date(Date.now() - 730 * 86_400_000).toISOString()

  const results = await Promise.all([
    supabase.from('commercial_events').delete().lt('created_at', analyticsCutoff),
    supabase.from('ask_relo_usage').delete().lt('created_at', askReloCutoff),
    supabase.from('ask_relo_followups').delete().lt('created_at', askReloCutoff),
    supabase.from('retell_call_events').delete().lt('created_at', askReloCutoff),
    supabase.from('partner_sales_leads').delete().in('status', ['nurture', 'declined']).lt('updated_at', prospectCutoff),
    supabase.from('executive_intake_leads').delete().in('status', ['nurture', 'closed']).lt('updated_at', prospectCutoff),
  ])

  const failures = results.flatMap((result, index) => result.error ? [{ index, message: result.error.message }] : [])
  if (failures.length) {
    console.error('Data retention run incomplete', failures)
    return NextResponse.json({ success: false, failures }, { status: 502 })
  }
  return NextResponse.json({ success: true })
}
