import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';         // ensure Node runtime (needed for crypto)
export const dynamic = 'force-dynamic';  // no cache

function verifyHMAC(raw: string, sigHeader: string | null, secret: string) {
  if (!sigHeader || !secret) return false;
  const provided = sigHeader.replace(/^sha256=/, '');
  const expected = createHmac('sha256', secret).update(raw).digest('hex');

  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(provided, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET() {
  // helps quick checks in a browser
  return NextResponse.json({ ok: true, route: 'cal-webhook' });
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.CAL_WEBHOOK_SECRET ?? '';
    const sig = req.headers.get('x-cal-signature-256');
    const raw = await req.text(); // must read raw body for HMAC

    // Treat Cal's Ping test (often missing signature) as success so you can enable the webhook.
    if (!sig || !secret) {
      return NextResponse.json({ ok: true, note: 'no signature (ping or missing secret)' });
    }

    if (!verifyHMAC(raw, sig, secret)) {
      return NextResponse.json({ ok: false, error: 'bad signature' }, { status: 401 });
    }

    // If needed later: const payload = JSON.parse(raw);  // do DB work here
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('cal webhook error', err);
    // Return 200 so Cal doesn't keep failing while you iterate
    return NextResponse.json({ ok: false, caught: true }, { status: 200 });
  }
}
