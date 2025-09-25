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
              name: 'Founding Partner - Charter Membership',
              description: 'Category exclusivity (12 months) + top placement across Home & Directory + concierge-qualified intros + 4× editorial features + quarterly pipeline reviews. Onboarding call within 24 hours, tracking & placements within 72 hours. Guarantee: if we don\'t introduce qualified opportunities in 90 days, we extend exclusivity until we do.',
            },
            unit_amount: 2500000, // £25,000 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/partners/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/partners`,
      metadata: {
        partnership_type: 'founding_partner',
        duration: '12_months',
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