import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { landingListEmails } from '@/lib/london-landing-list-sequence';
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key)
      return NextResponse.json(
        { error: 'Signup is not configured' },
        { status: 503 }
      );
    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });
    const { error } = await supabase
      .from('london_landing_list_leads')
      .upsert(
        {
          email: email.toLowerCase(),
          source: 'website',
          next_email_index: 1,
          next_send_at: new Date(Date.now() + 3 * 86400000).toISOString(),
        },
        { onConflict: 'email' }
      );
    if (error) throw error;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          'The Relo Network <hello@therelonetwork.com>',
        to: email,
        subject: landingListEmails[0].subject,
        html: landingListEmails[0].html(email),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to subscribe' }, { status: 500 });
  }
}
