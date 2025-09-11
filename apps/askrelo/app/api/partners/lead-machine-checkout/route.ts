import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { reloNetworkAppearance, reloBrandingConfig } from '@/lib/stripe-appearance'

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set')
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-06-20',
})

export async function GET(request: NextRequest) {
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

    console.log('Creating Lead Machine checkout session...')
    console.log('Stripe key exists:', !!stripeKey)
    console.log('Stripe key length:', stripeKey?.length)
    
    // Create Stripe Checkout Session for Lead Machine
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Lead Machine Partnership',
              description: `Lead Machine Partnership Benefits:

• 8-15 guaranteed qualified leads every month
• AI concierge mentions to premium clients
• Premium directory placement & visibility
• Exclusive territory protection
• Priority client matching
• Dedicated partnership support
• Professional profile enhancement
• High-value corporate relocations

Founding Member Rate: £497/month (Regular: £997/month)`,
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
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: 'Join the Lead Machine Partnership and start receiving qualified leads within 24-48 hours.'
        }
      },
    })

    console.log('Session created successfully:', session.id)
    return NextResponse.redirect(session.url!)
  } catch (error) {
    console.error('Lead Machine checkout error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      stripeError: error
    })
    
    // Return a more detailed error for debugging
    return NextResponse.json(
      { 
        error: 'Failed to create Lead Machine checkout session',
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
              description: `Lead Machine Partnership Benefits:

• 8-15 guaranteed qualified leads every month
• AI concierge mentions to premium clients
• Premium directory placement & visibility
• Exclusive territory protection
• Priority client matching
• Dedicated partnership support
• Professional profile enhancement
• High-value corporate relocations

Founding Member Rate: £497/month (Regular: £997/month)`,
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
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: 'Join the Lead Machine Partnership and start receiving qualified leads within 24-48 hours.'
        }
      },
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