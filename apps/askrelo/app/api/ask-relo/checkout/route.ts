import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set')
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY environment variable is missing')
      return NextResponse.json(
        { 
          error: 'Configuration error',
          details: 'Payment processing is not properly configured',
        },
        { status: 500 }
      )
    }

    const { priceId } = await request.json()
    console.log('Ask Relo checkout request for priceId:', priceId)

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Handle free trial differently
    if (priceId === 'free_trial') {
      console.log('Redirecting to demo for free trial')
      return NextResponse.json({ url: '/demo' })
    }

    // Map common price IDs to actual pricing
    const priceMapping: { [key: string]: { name: string, amount: number } } = {
      'price_quick_start': { name: 'Quick Start Concierge', amount: 19500 }, // £195
      'price_property_hunter': { name: 'Property Hunter Concierge', amount: 49500 }, // £495
      'price_human_concierge': { name: 'Human Concierge Service', amount: 149500 }, // £1495
      'price_done_for_you': { name: 'Done-For-You Premium', amount: 299500 } // £2995
    }

    const priceInfo = priceMapping[priceId]
    
    if (!priceInfo) {
      console.error('Unknown price ID:', priceId)
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 })
    }

    console.log('Creating checkout session for:', priceInfo.name, '£' + (priceInfo.amount / 100))

    // Create Stripe Checkout Session using price_data instead of price IDs
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: priceInfo.name,
              description: `Ask Relo AI Concierge Service - ${priceInfo.name}`,
              images: ['https://relocation-platform.vercel.app/images/ask-relo-logo.png'],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: priceInfo.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/concierge/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/concierge`,
      metadata: {
        type: 'ask_relo_subscription',
        priceId,
        tier: priceInfo.name,
      },
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: `Activate your ${priceInfo.name} plan and start receiving AI-powered relocation assistance immediately.`
        }
      },
    })

    console.log('Checkout session created successfully:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Ask Relo checkout error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      stripeError: error
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          hasStripeKey: !!stripeKey,
          stripeKeyPrefix: stripeKey?.substring(0, 8) + '...'
        }
      },
      { status: 500 }
    )
  }
}