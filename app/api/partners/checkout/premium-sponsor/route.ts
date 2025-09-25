import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function GET(request: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Premium Sponsor - Professional Partnership',
              description: 'Priority placement in referral system (90 days) + professional network access + marketing exposure opportunities. Onboarding call within 24 hours, profile setup within 72 hours. 90-day trial of our professional partnership benefits.',
            },
            unit_amount: 500000, // £5,000 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/partners/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/partners`,
      metadata: {
        partnership_type: 'premium_sponsor',
        duration: '90_days',
      },
    })

    return NextResponse.redirect(session.url!)
  } catch (error) {
    console.error('Error creating Stripe session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}