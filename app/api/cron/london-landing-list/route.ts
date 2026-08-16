import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { landingListEmails } from '@/lib/london-landing-list-sequence';
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (
    !secret ||
    (req.headers.get('authorization') !== `Bearer ${secret}` &&
      req.headers.get('x-cron-secret') !== secret)
  )
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY,
    resendKey = process.env.RESEND_API_KEY;
  if (!url || !key || !resendKey)
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const resend = new Resend(resendKey);
  const { data, error } = await supabase
    .from('london_landing_list_leads')
    .select('*')
    .lte('next_send_at', new Date().toISOString())
    .lt('next_email_index', landingListEmails.length)
    .limit(50);
  if (error) throw error;
  let sent = 0;
  for (const lead of data || []) {
    const item = landingListEmails[lead.next_email_index];
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'The Relo Network <hello@therelonetwork.com>',
      to: lead.email,
      subject: item.subject,
      html: item.html(lead.email),
    });
    const nextIndex = lead.next_email_index + 1;
    const next = landingListEmails[nextIndex];
    await supabase
      .from('london_landing_list_leads')
      .update({
        next_email_index: nextIndex,
        next_send_at: next
          ? new Date(
              new Date(lead.created_at).getTime() + next.day * 86400000
            ).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', lead.id);
    sent++;
  }
  return NextResponse.json({ success: true, sent });
}
