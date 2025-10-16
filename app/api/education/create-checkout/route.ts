import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe function
function getStripe(): Stripe | null {
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20',
      })
    } else {
      console.warn('STRIPE_SECRET_KEY environment variable not found')
      return null
    }
  } catch (error) {
    console.error('Error initializing Stripe:', error)
    return null
  }
}

const tierDetails = {
  family: {
    name: 'Premium Family Access',
    subtitle: 'Relo Network Schools Concierge Access',
    price: 39900, // £399 in pence
    description: 'Interactive directory access with AI-powered school matching for relocating families'
  },
  campaign: {
    name: 'Agency Campaign License', 
    subtitle: 'Schools Marketing Campaign Dataset',
    price: 225000, // £2,250 in pence
    description: 'Single-use campaign data extract for marketing agencies and service providers'
  },
  professional: {
    name: 'Premium Data License',
    subtitle: 'UK Elite Schools Directory 2026 - Professional License', 
    price: 650000, // £6,500 in pence
    description: 'Complete database with commercial use rights for education consultancies'
  },
  founding: {
    name: 'Founding Partner Bundle',
    subtitle: 'Education Category Founding Partner + Schools Intelligence',
    price: 2450000, // £24,500 in pence
    description: 'Category-exclusive partnership with complete schools intelligence access'
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tier } = await req.json()

    const stripe = getStripe()
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not available' },
        { status: 500 }
      )
    }

    const tierInfo = tierDetails[tier as keyof typeof tierDetails]
    if (!tierInfo) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: tierInfo.name,
              description: `${tierInfo.subtitle} - ${tierInfo.description}`,
              images: ['https://therelonetwork.com/logo-large.png'],
            },
            unit_amount: tierInfo.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://therelonetwork.com'}/education/payment/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://therelonetwork.com'}/education/payment?tier=${tier}`,
      metadata: {
        tier: tier,
        type: 'education-portal-access'
      },
      payment_intent_data: {
        metadata: {
          tier: tier,
          type: 'education-portal-access'
        }
      },
      billing_address_collection: 'required',
      expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      custom_text: {
        submit: {
          message: `Get instant access to the UK Elite Schools Directory 2026 with your ${tierInfo.name} package.`
        }
      },
    })

    console.log('Education checkout session created:', {
      sessionId: session.id,
      tier: tier,
      price: tierInfo.price / 100, // Convert back to pounds for logging
    })

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id
    })

  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// Handle successful payment webhook from Stripe
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Education checkout endpoint',
    tiers: ['family', 'campaign', 'professional', 'founding'],
    note: 'POST to create checkout session'
  })
}