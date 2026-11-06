import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { MOVE_MAP_NAME, MOVE_MAP_PRICE_PENCE, MOVE_MAP_TERMS_VERSION, moveMapBriefSchema } from '@/lib/london-move-map';
import { moveMapReadiness, moveMapStripe } from '@/lib/london-move-map-server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin;
  if (request.headers.get('origin') !== origin) return NextResponse.json({ error: 'Please open checkout from the consultation page.' }, { status: 403 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ error: 'Please shorten your brief.' }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return NextResponse.json({ error: 'Please check your brief.' }, { status: 400 }); }
  const parsed = moveMapBriefSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Please complete the required details and order agreements.' }, { status: 400 });
  try {
    const readiness = await moveMapReadiness(origin);
    if (!readiness.ready) return NextResponse.json({ error: 'Checkout is temporarily unavailable. Please contact hello@therelonetwork.com.' }, { status: 503 });
    const { consent, startNow, ...brief } = parsed.data;
    const stripe = moveMapStripe();
    const id = request.headers.get('idempotency-key');
    if (!id || !/^[a-zA-Z0-9-]{16,100}$/.test(id)) return NextResponse.json({ error: 'Please refresh the page and try again.' }, { status: 400 });
    const hash = createHash('sha256').update(JSON.stringify(brief)).digest('hex');
    const session = await stripe.checkout.sessions.create({
      mode: 'payment', payment_method_types: ['card'], customer_email: brief.email.toLowerCase(),
      line_items: [{ price_data: { currency: 'gbp', unit_amount: MOVE_MAP_PRICE_PENCE, product_data: { name: MOVE_MAP_NAME, description: 'Personal written area decision map, short video walkthrough and one follow-up question. Email delivery within three working days of a complete brief.' } }, quantity: 1 }],
      metadata: { ...brief, type: 'london-move-map', termsVersion: MOVE_MAP_TERMS_VERSION, consent: String(consent), startNow: String(startNow) },
      payment_intent_data: { metadata: { product: 'london-move-map', termsVersion: MOVE_MAP_TERMS_VERSION } },
      success_url: `${origin}/london-move-map/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/london-move-map`,
      custom_text: { submit: { message: '£249 total. One-time personalised consultation. No subscription.' } },
    }, { idempotencyKey: `move-map/${id}/${hash}` });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Move map checkout failed', error instanceof Error ? error.name : 'unknown');
    return NextResponse.json({ error: 'We could not open secure checkout. Please try again shortly.' }, { status: 502 });
  }
}
