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

interface CheckoutSessionData {
  packageId: string
  price: number
  requestId: string
  companyName: string
  timeline: string
  successUrl: string
  cancelUrl: string
}

const packages = {
  'emergency-immediate': {
    name: 'Emergency Response Package',
    description: 'Within 24 hours - 2-hour emergency response guarantee'
  },
  'emergency-urgent': {
    name: 'Priority Response Package', 
    description: 'Within 48 hours - 4-hour priority response guarantee'
  },
  'emergency-priority': {
    name: 'Fast-Track Package',
    description: 'Within 1 week - 24-hour response guarantee'
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not available' },
        { status: 500 }
      )
    }

    const data: CheckoutSessionData = await request.json()
    
    // Validate required fields
    const requiredFields = ['packageId', 'price', 'requestId', 'companyName', 'successUrl', 'cancelUrl']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Get package details
    const packageInfo = packages[data.packageId as keyof typeof packages]
    if (!packageInfo) {
      return NextResponse.json(
        { error: 'Invalid package selected' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: packageInfo.name,
              description: `${packageInfo.description} - Emergency Corporate Relocation for ${data.companyName}`,
              images: ['https://therelonetwork.com/logo-large.png'], // Add your logo URL
            },
            unit_amount: data.price * 100, // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      customer_email: undefined, // We'll get this from the form data if needed
      metadata: {
        requestId: data.requestId,
        packageId: data.packageId,
        companyName: data.companyName,
        timeline: data.timeline,
        type: 'corporate-emergency-package'
      },
      billing_address_collection: 'required',
      payment_intent_data: {
        metadata: {
          requestId: data.requestId,
          packageId: data.packageId,
          companyName: data.companyName,
          timeline: data.timeline,
          type: 'corporate-emergency-package'
        }
      },
      expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    })

    // Log the checkout session creation
    console.log('Stripe checkout session created:', {
      sessionId: session.id,
      requestId: data.requestId,
      package: data.packageId,
      price: data.price,
      company: data.companyName,
      timeline: data.timeline
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      success: true
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    )
  }
}