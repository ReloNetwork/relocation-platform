import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    })
  : null;

const PRICE_MAP = {
  price_basic_partner: process.env.STRIPE_PRICE_BASIC_PARTNER!,
  price_featured_partner: process.env.STRIPE_PRICE_FEATURED_PARTNER!,
  price_exclusive_partner: process.env.STRIPE_PRICE_EXCLUSIVE_PARTNER!,
};

export async function POST(request: NextRequest) {
  try {
    if (!stripe)
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 503 }
      );
    const { priceId } = await request.json();

    const stripePriceId = PRICE_MAP[priceId as keyof typeof PRICE_MAP];

    if (!stripePriceId) {
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?success=partner&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/partners`,
      metadata: {
        product_type: 'partner_subscription',
        plan: priceId,
      },
      subscription_data: {
        metadata: {
          product_type: 'partner_subscription',
          plan: priceId,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Partner checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
