import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const PRICE_MAP = {
  'basic_access': null, // Free plan
  'premium_directory': process.env.STRIPE_PRICE_PREMIUM_DIRECTORY!,
  'vip_concierge': process.env.STRIPE_PRICE_VIP_CONCIERGE!
}

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json()

    // Handle free plan
    if (plan === 'basic_access' || plan === 'free') {
      return NextResponse.json({ 
        url: '/account?trial=directory',
        message: 'Free access activated'
      })
    }

    const stripePriceId = PRICE_MAP[plan as keyof typeof PRICE_MAP]
    
    if (!stripePriceId) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?success=directory&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/directory`,
      metadata: {
        product_type: 'directory_access',
        plan: plan
      },
      subscription_data: {
        metadata: {
          product_type: 'directory_access',
          plan: plan
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always'
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Directory checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}