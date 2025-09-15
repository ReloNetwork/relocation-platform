import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function verify(raw: string, sigHeader: string | null, secret: string) {
  if (!sigHeader || !secret) return false;
  const digest = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(sigHeader));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.CAL_WEBHOOK_SECRET || '';
  const sig = req.headers.get('x-cal-signature-256'); // <— MUST be in quotes
  const raw = await req.text();

  if (!verify(raw, sig, secret)) {
    return NextResponse.json({ ok: false, error: 'bad signature' }, { status: 401 });
  }

  // Parse event
  const evt = JSON.parse(raw);
  const booking = evt?.payload?.booking ?? {};
  const title = booking?.title ?? 'Cal.com Meeting';
  const startsAt = booking?.startTime ? new Date(booking.startTime).toISOString() : null;
  const endsAt = booking?.endTime ? new Date(booking.endTime).toISOString() : null;

  // Minimal Supabase insert (anon client is fine for a server route)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, { auth: { persistSession: false } });

  await sb.from('appointments').insert({
    case_id: null,
    title,
    provider: 'Cal.com',
    starts_at: startsAt,
    ends_at: endsAt,
  });

  return NextResponse.json({ ok: true });
}

// Optional GET for “is alive” checks (returns 200, no secrets touched)
export async function GET() {
  return NextResponse.json({ ok: true, route: 'cal-webhook' });
}
