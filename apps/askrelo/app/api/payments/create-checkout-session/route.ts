import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { reloNetworkAppearance, reloBrandingConfig } from '@/lib/stripe-appearance'

// Initialize Stripe function
function getStripe(): Stripe | null {
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      console.log('Initializing Stripe with key length:', process.env.STRIPE_SECRET_KEY.length)
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
  'essential-executive': {
    name: 'Essential Executive',
    description: `Essential Executive Relocation Package:

• Complete property search and viewing coordination
• School placement assistance for children
• Visa and immigration support
• Temporary accommodation arrangement
• Essential services setup (utilities, banking)
• Local area orientation and integration
• Dedicated relocation coordinator
• 24/7 emergency support hotline

Perfect for senior professionals requiring comprehensive relocation support.`
  },
  'complete-executive': {
    name: 'Complete Executive', 
    description: `Complete Executive Relocation Package:

• Everything in Essential Executive PLUS:
• Premium property portfolio access
• Private school placement guarantee
• Spouse career transition support
• Pet relocation services
• Cultural integration programs
• Personal shopping and lifestyle setup
• Luxury transport arrangements
• VIP concierge services throughout
• Extended 6-month settlement support

Ideal for C-level executives and their families.`
  },
  'c-suite-elite': {
    name: 'C-Suite Elite',
    description: `C-Suite Elite Relocation Package:

• Everything in Complete Executive PLUS:
• Exclusive luxury property access
• Private jet coordination for viewings
• Personal butler/household staff placement
• Investment property consultation
• Tax optimization advisory
• Security assessment and arrangements
• Yacht/country club membership facilitation
• Art and valuable item relocation
• Unlimited personal concierge access
• White-glove treatment throughout

The ultimate relocation experience for top-tier executives.`
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Payment API called - checking Stripe initialization')
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY)
    console.log('STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY?.length || 0)
    console.log('STRIPE_SECRET_KEY prefix:', process.env.STRIPE_SECRET_KEY?.substring(0, 15) || 'none')
    
    const stripe = getStripe()
    console.log('Stripe instance created:', !!stripe)
    
    if (!stripe) {
      console.error('Stripe not initialized - payment processing not available')
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
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: `Secure your ${packageInfo.name} relocation package - our team will begin coordination immediately.`
        }
      },
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
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create payment session'
    if (error instanceof Error) {
      if (error.message.includes('No such price')) {
        errorMessage = 'Invalid pricing configuration'
      } else if (error.message.includes('api_key')) {
        errorMessage = 'Payment service configuration error'
      } else if (error.message.includes('Invalid request')) {
        errorMessage = 'Invalid payment request data'
      }
      console.error('Stripe error details:', error.message)
    }
    
    return NextResponse.json(
      { error: errorMessage, details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    )
  }
}