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
    const tier = body.tier || 'lead_machine'
    
    // Define tier-specific configurations
    const tierConfigs = {
      'lead_machine': {
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
        amount: 49700, // £497
        originalAmount: 99700, // £997
        successUrl: '/partners/lead-machine/success',
        cancelUrl: '/partners/lead-machine'
      },
      'market-dominator': {
        name: 'Market Dominator Partnership',
        description: `Market Dominator Partnership Benefits:

• Everything in Lead Machine (8-15 leads/month)
• EXCLUSIVE category ownership
• AI mentions you as "preferred partner"
• Co-branded content creation
• White-label integration options
• Priority Concierge tier recommendations
• 15% revenue sharing on closed deals
• Quarterly business reviews with CEO

Founding Member Rate: £1,497/month (Regular: £2,997/month)`,
        amount: 149700, // £1497
        originalAmount: 299700, // £2997
        successUrl: '/partners/market-dominator/success',
        cancelUrl: '/partners/market-dominator'
      }
    }

    const config = tierConfigs[tier] || tierConfigs['lead_machine']
    
    // Create Stripe Checkout Session with tier-specific data
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: config.name,
              description: config.description,
              images: ['https://relocation-platform.vercel.app/images/relo-logo.png'],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: config.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}${config.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}${config.cancelUrl}`,
      metadata: {
        type: `${tier}_subscription`,
        tier: tier,
        founding_rate: 'true',
        original_price: config.originalAmount.toString(),
        ...body // Include any form data
      },
      subscription_data: {
        metadata: {
          tier: tier,
          founding_member: 'true',
          partner_data: JSON.stringify(body)
        }
      },
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: tier === 'market-dominator' 
            ? 'Secure your Market Dominator partnership and eliminate competition within 24-48 hours.'
            : 'Join the Lead Machine Partnership and start receiving qualified leads within 24-48 hours.'
        }
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Partner checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}