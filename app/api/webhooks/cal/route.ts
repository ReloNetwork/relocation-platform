import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
// Update this import to your portal's Supabase server client helper:
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function verify(raw: string, sigHeader: string | null, secret: string) {
  if (!sigHeader) return false;
  const h = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(h), Buffer.from(sigHeader));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.CAL_WEBHOOK_SECRET || '';
  const sig = req.headers.get('x-cal-signature-256');
  const raw = await req.text();

  if (!secret || !verify(raw, sig, secret)) {
    return NextResponse.json({ ok: false, error: 'bad signature' }, { status: 401 });
  }

  const evt = JSON.parse(raw);
  const t = evt?.triggerEvent as string;
  const booking = evt?.payload?.booking || {};
  const startsAt = booking?.startTime ? new Date(booking.startTime) : null;
  const endsAt = booking?.endTime ? new Date(booking.endTime) : null;

  const supabase = createServerClient();

  // TODO: map attendee/organizer email to your case/user
  // For now, stash when we can't resolve a case:
  await supabase.from('appointments_webhooks').insert({ payload: evt });

  if (t === 'booking.created' || t === 'booking.rescheduled') {
    // If you can resolve a case_id, upsert:
    // await supabase.from('appointments').upsert({ case_id, title: booking.title, provider: 'Cal.com', starts_at: startsAt, ends_at: endsAt });
  }

  return NextResponse.json({ ok: true });
}
