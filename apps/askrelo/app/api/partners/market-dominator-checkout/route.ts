import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { reloNetworkAppearance, reloBrandingConfig } from '@/lib/stripe-appearance'

const stripeKey = process.env.STRIPE_SECRET_KEY!
const stripe = new Stripe(stripeKey)

export async function GET(request: NextRequest) {
  try {
    // Create Stripe Checkout Session for Market Dominator
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Market Dominator Partnership',
              description: `Market Dominator Partnership Benefits:

• Exclusive category ownership in your territory
• AI preferred partner status (first recommendations)
• 15% revenue sharing on all referred deals
• Complete competition elimination
• Guaranteed minimum 20-30 qualified leads/month
• Priority placement in all search results
• Dedicated account management team
• Advanced analytics and lead tracking
• Co-marketing opportunities with Relo Network
• White-label partnership materials

Founding Member Rate: £1,497/month (Regular: £2,997/month)
Ultimate partnership tier with maximum ROI potential`,
              images: ['https://relocation-platform.vercel.app/images/market-dominator-logo.png'],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 149700, // £1,497.00 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/partners/market-dominator/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/partners/market-dominator`,
      metadata: {
        type: 'market_dominator_subscription',
        tier: 'market_dominator',
        founding_rate: 'true',
        original_price: '299700', // £2,997 in pence
        exclusivity: 'category_ownership',
      },
      subscription_data: {
        metadata: {
          tier: 'market_dominator',
          founding_member: 'true',
          category_exclusive: 'true',
          revenue_sharing: '15_percent',
          ai_preferred_partner: 'true',
          competition_eliminated: 'true'
        }
      },
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: 'Secure your Market Dominator status and eliminate competition in your category.'
        }
      },
    })

    return NextResponse.redirect(session.url!)
  } catch (error) {
    console.error('Market Dominator checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create Market Dominator checkout session' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create Stripe Checkout Session for Market Dominator with custom data
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Market Dominator Partnership',
              description: `Market Dominator Partnership Benefits:

• Exclusive category ownership in your territory
• AI preferred partner status (first recommendations)
• 15% revenue sharing on all referred deals
• Complete competition elimination
• Guaranteed minimum 20-30 qualified leads/month
• Priority placement in all search results
• Dedicated account management team
• Advanced analytics and lead tracking
• Co-marketing opportunities with Relo Network
• White-label partnership materials

Founding Member Rate: £1,497/month (Regular: £2,997/month)
Ultimate partnership tier with maximum ROI potential`,
              images: ['https://relocation-platform.vercel.app/images/market-dominator-logo.png'],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 149700, // £1,497.00 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/partners/market-dominator/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/partners/market-dominator`,
      metadata: {
        type: 'market_dominator_subscription',
        tier: 'market_dominator',
        founding_rate: 'true',
        original_price: '299700', // £2,997 in pence
        exclusivity: 'category_ownership',
        ...body // Include any form data
      },
      subscription_data: {
        metadata: {
          tier: 'market_dominator',
          founding_member: 'true',
          category_exclusive: 'true',
          revenue_sharing: '15_percent',
          ai_preferred_partner: 'true',
          competition_eliminated: 'true',
          partner_data: JSON.stringify(body)
        }
      },
      allow_promotion_codes: false,
      billing_address_collection: 'required',
      ui_mode: 'hosted',
      custom_text: {
        submit: {
          message: 'Secure your Market Dominator status and eliminate competition in your category.'
        }
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Market Dominator checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create Market Dominator checkout session' },
      { status: 500 }
    )
  }
}