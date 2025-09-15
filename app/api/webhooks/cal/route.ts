export const runtime = 'nodejs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';        // <-- important for Node 'crypto'
export const dynamic = 'force-dynamic'; // avoid caching

function verify(raw: string, sig: string | null, secret: string) {
  if (!sig || !secret) return false;
  const got = sig.replace(/^sha256=/, '');
  const expected = createHmac('sha256', secret).update(raw).digest('hex');
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(got, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.CAL_WEBHOOK_SECRET ?? '';
    const sig = req.headers.get('x-cal-signature-256');
    const raw = await req.text(); // must read RAW body for HMAC

    if (!verify(raw, sig, secret)) {
      return NextResponse.json({ ok: false, error: 'bad signature' }, { status: 401 });
    }

    // If you want: const payload = JSON.parse(raw) and do DB work here.
    // For setup stability, don’t throw on DB errors—always return 200 once verified.

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('cal webhook error', err);
    // Return 200 so Cal’s ping passes while you iterate.
    return NextResponse.json({ ok: false, note: 'caught error' }, { status: 200 });
  }
}
