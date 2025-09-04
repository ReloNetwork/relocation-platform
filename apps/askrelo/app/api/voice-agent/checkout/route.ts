import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const PRICE_MAP = {
  'free_trial': null, // Free trial - no Stripe needed
  'price_professional_voice': process.env.STRIPE_PRICE_PROFESSIONAL_VOICE!,
  'price_concierge_voice': process.env.STRIPE_PRICE_CONCIERGE_VOICE!
}

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    // Handle free trial
    if (priceId === 'free_trial') {
      return NextResponse.json({ 
        url: '/account?trial=voice',
        message: 'Free trial activated'
      })
    }

    const stripePriceId = PRICE_MAP[priceId as keyof typeof PRICE_MAP]
    
    if (!stripePriceId) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?success=voice&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/ask-relo-pricing`,
      metadata: {
        product_type: 'voice_agent',
        plan: priceId
      },
      subscription_data: {
        metadata: {
          product_type: 'voice_agent',
          plan: priceId
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always'
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Voice agent checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}