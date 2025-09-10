import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe
let stripe: Stripe | null = null

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  }
} catch (error) {
  console.warn('Warning: Stripe not available due to missing API key')
}

export async function GET(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment verification not available' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer']
    })

    // Log the session verification
    console.log('Session verified:', {
      sessionId: session.id,
      status: session.status,
      amount: session.amount_total,
      metadata: session.metadata
    })

    return NextResponse.json({
      id: session.id,
      status: session.status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      metadata: session.metadata,
      payment_status: session.payment_status,
      created: session.created,
      expires_at: session.expires_at
    })

  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment session' },
      { status: 500 }
    )
  }
}