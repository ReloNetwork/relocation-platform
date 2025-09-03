import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sig || !whsec || !sk) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(sk, { apiVersion: '2024-06-20' });
    event = stripe.webhooks.constructEvent(body, sig, whsec);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const plan = session.metadata?.plan as 'starter'|'featured'|'sponsored'|undefined;
      const cadence = session.metadata?.cadence as 'monthly'|'annual'|undefined;

      const supa = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supa.from('supplier_subscriptions').insert({
        email: session.customer_email ?? null,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
        stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
        plan: plan ?? null,
        cadence: cadence ?? null,
        status: session.status ?? null,
        metadata: session.metadata ?? {}
      });

      return NextResponse.json({ ok: true });
    }

    // Ignore other events for now
    return NextResponse.json({ ok: true, ignored: event.type });
  } catch (err: any) {
    console.error('stripe webhook error', err?.message);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}