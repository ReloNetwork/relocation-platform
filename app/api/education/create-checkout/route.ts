import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { tier } = await req.json()

    // Stripe price IDs for each tier (these would be your actual Stripe price IDs)
    const priceIds = {
      family: 'price_family_uk_schools',           // Replace with actual Stripe price ID
      campaign: 'price_campaign_uk_schools',       // Replace with actual Stripe price ID  
      professional: 'price_professional_uk_schools', // Replace with actual Stripe price ID
      founding: 'price_founding_uk_schools'        // Replace with actual Stripe price ID
    }

    const priceId = priceIds[tier as keyof typeof priceIds]
    
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // For now, return a mock checkout URL
    // In production, you would create an actual Stripe checkout session
    const checkoutUrl = `https://checkout.stripe.com/pay/mock_session_${tier}`

    return NextResponse.json({ 
      url: checkoutUrl,
      sessionId: `mock_session_${tier}_${Date.now()}`
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