import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if Stripe is configured
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Stripe secret key not configured')
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
}) : null

export async function GET(request: NextRequest) {
  try {
    // If Stripe is not configured, redirect to contact form
    if (!stripe) {
      console.log('Stripe not configured, redirecting to contact')
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/partners#partner-application`)
    }

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
    // Fallback to contact form if Stripe fails
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/partners#partner-application`)
  }
}