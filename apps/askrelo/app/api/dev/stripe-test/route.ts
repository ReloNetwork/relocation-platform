import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function GET() {
  // Safety: never run in prod
  if (process.env.NODE_ENV === 'production' || process.env.DEV_TOOLS !== '1') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ ok: false, error: 'STRIPE_SECRET_KEY missing' }, { status: 500 });

  try {
    const stripe = new Stripe(key, { apiVersion: '2023-10-16' });
    const prices = await stripe.prices.list({ limit: 1 });
    return NextResponse.json({ ok: true, prices: prices.data.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}