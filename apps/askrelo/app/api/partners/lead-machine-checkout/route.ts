import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY!
const stripe = new Stripe(stripeKey)

export async function GET(request: NextRequest) {
  try {
    // Create Stripe Checkout Session for Lead Machine
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Lead Machine Partnership',
              description: '8-15 guaranteed qualified leads/month with AI concierge mentions and premium directory placement',
              images: ['https://relocation-platform.vercel.app/images/lead-machine-logo.png'],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 49700, // £497.00 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/partners/lead-machine/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/partners/lead-machine`,
      metadata: {
        type: 'lead_machine_subscription',
        tier: 'lead_machine',
        founding_rate: 'true',
        original_price: '99700', // £997 in pence
      },
      subscription_data: {
        metadata: {
          tier: 'lead_machine',
          founding_member: 'true',
          leads_guaranteed: '8-15',
          territory_exclusive: 'true'
        }
      },
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      customer_creation: 'always',
    })

    return NextResponse.redirect(session.url!)
  } catch (error) {
    console.error('Lead Machine checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create Lead Machine checkout session' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create Stripe Checkout Session for Lead Machine with custom data
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Lead Machine Partnership',
              description: '8-15 guaranteed qualified leads/month with AI concierge mentions and premium directory placement',
              images: ['https://relocation-platform.vercel.app/images/lead-machine-logo.png'],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 49700, // £497.00 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/partners/lead-machine/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/partners/lead-machine`,
      metadata: {
        type: 'lead_machine_subscription',
        tier: 'lead_machine',
        founding_rate: 'true',
        original_price: '99700', // £997 in pence
        ...body // Include any form data
      },
      subscription_data: {
        metadata: {
          tier: 'lead_machine',
          founding_member: 'true',
          leads_guaranteed: '8-15',
          territory_exclusive: 'true',
          partner_data: JSON.stringify(body)
        }
      },
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      customer_creation: 'always',
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Lead Machine checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create Lead Machine checkout session' },
      { status: 500 }
    )
  }
}