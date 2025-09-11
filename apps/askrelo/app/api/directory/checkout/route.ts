import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { reloNetworkAppearance, reloBrandingConfig } from '@/lib/stripe-appearance'

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

    // Define plan details
    const planDetails = {
      premium_directory: {
        name: 'Premium Directory Access',
        description: `Premium Directory Benefits:

• Access to 500+ verified service providers
• View full contact details and pricing
• Direct messaging with suppliers
• Advanced search and filtering
• Priority customer support
• Monthly market insights report
• Exclusive deals and partnerships

Perfect for businesses with regular relocation needs.`,
        unit_amount: 4900 // £49/month
      },
      vip_concierge: {
        name: 'VIP Concierge Service',
        description: `VIP Concierge Service Benefits:

• Everything in Premium Directory PLUS:
• Personal account manager
• Unlimited quote requests
• Priority supplier matching
• 24/7 concierge support
• Custom relocation planning
• Negotiated rates and discounts
• White-glove service coordination
• Quarterly strategy reviews

The ultimate solution for enterprise clients.`,
        unit_amount: 19900 // £199/month
      }
    }

    const planInfo = planDetails[plan as keyof typeof planDetails]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: planInfo?.name || 'Directory Access',
              description: planInfo?.description || 'Access to our premium directory',
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: planInfo?.unit_amount || 4900,
          },
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
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: plan === 'vip_concierge' 
            ? 'Unlock VIP access with your personal account manager and priority support.'
            : 'Access our premium directory of verified service providers.'
        }
      },
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