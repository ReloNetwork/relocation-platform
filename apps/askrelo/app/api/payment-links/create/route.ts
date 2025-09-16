import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set')
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-06-20',
})

// Product configurations for Payment Links
const PRODUCTS = {
  'lead-machine': {
    name: 'Lead Machine Partnership',
    description: 'Premium lead generation partnership with 8-15 guaranteed qualified leads monthly',
    amount: 49700, // £497.00
    interval: 'month',
    features: [
      '8-15 guaranteed qualified leads every month',
      'AI concierge mentions to premium clients',
      'Premium directory placement & visibility',
      'Exclusive territory protection',
      'Priority client matching',
      'Dedicated partnership support',
      'Professional profile enhancement',
      'High-value corporate relocations'
    ],
    originalPrice: 99700,
    metadata: {
      type: 'lead_machine_subscription',
      tier: 'lead_machine',
      founding_rate: 'true'
    }
  },
  'lead-machine-annual': {
    name: 'Lead Machine Partnership (Annual)',
    description: 'Premium lead generation partnership - Annual plan with 10 months at founding rate + 2 months FREE',
    amount: 497000, // £4,970.00 (10 months at £497)
    interval: 'year',
    features: [
      '8-15 guaranteed qualified leads every month',
      'AI concierge mentions to premium clients',
      'Premium directory placement & visibility',
      'Exclusive territory protection',
      'Priority client matching',
      'Dedicated partnership support',
      'Professional profile enhancement',
      'High-value corporate relocations',
      'SPECIAL: Pay for 10 months, get 12 months service',
      'Save £996 compared to monthly billing'
    ],
    originalPrice: 1196400, // £11,964 (12 months at £997)
    metadata: {
      type: 'lead_machine_subscription',
      tier: 'lead_machine',
      founding_rate: 'true',
      billing: 'annual'
    }
  },
  'market-dominator': {
    name: 'Market Dominator Partnership',
    description: 'Ultimate partnership with exclusive category ownership and maximum ROI potential',
    amount: 149700, // £1,497.00
    interval: 'month',
    features: [
      'Exclusive category ownership in your territory',
      'AI preferred partner status (first recommendations)',
      '15% revenue sharing on all referred deals',
      'Complete competition elimination',
      'Guaranteed minimum 20-30 qualified leads/month',
      'Priority placement in all search results',
      'Dedicated account management team',
      'Advanced analytics and lead tracking',
      'Co-marketing opportunities with Relo Network',
      'White-label partnership materials'
    ],
    originalPrice: 299700,
    metadata: {
      type: 'market_dominator_subscription',
      tier: 'market_dominator',
      founding_rate: 'true'
    }
  },
  'market-dominator-annual': {
    name: 'Market Dominator Partnership (Annual)',
    description: 'Ultimate partnership with exclusive category ownership - Annual plan with 10 months at founding rate + 2 months FREE',
    amount: 1497000, // £14,970.00 (10 months at £1,497)
    interval: 'year',
    features: [
      'Exclusive category ownership in your territory',
      'AI preferred partner status (first recommendations)',
      '15% revenue sharing on all referred deals',
      'Complete competition elimination',
      'Guaranteed minimum 20-30 qualified leads/month',
      'Priority placement in all search results',
      'Dedicated account management team',
      'Advanced analytics and lead tracking',
      'Co-marketing opportunities with Relo Network',
      'White-label partnership materials',
      'SPECIAL: Pay for 10 months, get 12 months service',
      'Save £2,994 compared to monthly billing'
    ],
    originalPrice: 3596400, // £35,964 (12 months at £2,997)
    metadata: {
      type: 'market_dominator_subscription',
      tier: 'market_dominator',
      founding_rate: 'true',
      billing: 'annual'
    }
  },
  'premium-directory': {
    name: 'Premium Directory Access',
    description: 'Access to 500+ verified service providers with direct messaging capabilities',
    amount: 4700, // £47.00
    interval: 'month',
    features: [
      'Access to 500+ verified service providers',
      'View full contact details and pricing',
      'Direct messaging with suppliers',
      'Advanced search and filtering',
      'Priority customer support',
      'Monthly market insights report',
      'Exclusive deals and partnerships'
    ],
    metadata: {
      type: 'directory_subscription',
      tier: 'premium'
    }
  },
  'premium-directory-annual': {
    name: 'Premium Directory Access (Annual)',
    description: 'Access to 500+ verified service providers - Annual plan with 2 months FREE',
    amount: 47000, // £470.00 (10 months at £47)
    interval: 'year',
    features: [
      'Access to 500+ verified service providers',
      'View full contact details and pricing',
      'Direct messaging with suppliers',
      'Advanced search and filtering',
      'Priority customer support',
      'Monthly market insights report',
      'Exclusive deals and partnerships',
      'SPECIAL: Pay for 10 months, get 12 months access',
      'Save £94 compared to monthly billing'
    ],
    metadata: {
      type: 'directory_subscription',
      tier: 'premium',
      billing: 'annual'
    }
  },
  'vip-concierge': {
    name: 'VIP Concierge Service',
    description: 'Ultimate solution for enterprise clients with personal account manager',
    amount: 14700, // £147.00
    interval: 'month',
    features: [
      'Everything in Premium Directory PLUS:',
      'Personal account manager',
      'Unlimited quote requests',
      'Priority supplier matching',
      '24/7 concierge support',
      'Custom relocation planning',
      'Negotiated rates and discounts',
      'White-glove service coordination',
      'Quarterly strategy reviews'
    ],
    metadata: {
      type: 'directory_subscription',
      tier: 'vip'
    }
  },
  'vip-concierge-annual': {
    name: 'VIP Concierge Service (Annual)',
    description: 'Ultimate solution for enterprise clients - Annual plan with 2 months FREE',
    amount: 147000, // £1,470.00 (10 months at £147)
    interval: 'year',
    features: [
      'Everything in Premium Directory PLUS:',
      'Personal account manager',
      'Unlimited quote requests',
      'Priority supplier matching',
      '24/7 concierge support',
      'Custom relocation planning',
      'Negotiated rates and discounts',
      'White-glove service coordination',
      'Quarterly strategy reviews',
      'SPECIAL: Pay for 10 months, get 12 months service',
      'Save £294 compared to monthly billing'
    ],
    metadata: {
      type: 'directory_subscription',
      tier: 'vip',
      billing: 'annual'
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productKey, customData } = await request.json()

    if (!productKey || !PRODUCTS[productKey as keyof typeof PRODUCTS]) {
      return NextResponse.json(
        { error: 'Invalid product specified' },
        { status: 400 }
      )
    }

    const product = PRODUCTS[productKey as keyof typeof PRODUCTS]

    // Create or retrieve Stripe product
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      images: ['https://relocation-platform.vercel.app/images/relo-logo-square.png'],
      metadata: product.metadata
    })

    // Create price for the product
    const price = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.amount,
      currency: 'gbp',
      recurring: {
        interval: product.interval as 'month'
      },
      metadata: product.metadata
    })

    // Create Payment Link with enhanced customization
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${request.nextUrl.origin}/partners/success?session_id={CHECKOUT_SESSION_ID}&product=${productKey}`,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      custom_text: {
        submit: {
          message: getCustomMessage(productKey)
        },
        shipping_address: null,
        terms_of_service_acceptance: null
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `${product.name} - ${product.description}`,
          metadata: {
            ...product.metadata,
            ...customData
          }
        }
      },
      metadata: {
        product_key: productKey,
        ...product.metadata,
        ...customData
      },
      phone_number_collection: {
        enabled: true
      },
      shipping_address_collection: null,
      tax_id_collection: {
        enabled: true
      }
    })

    return NextResponse.json({
      success: true,
      paymentLink: paymentLink.url,
      id: paymentLink.id,
      product: {
        name: product.name,
        description: product.description,
        features: product.features,
        price: `£${(product.amount / 100).toFixed(2)}`,
        interval: product.interval,
        originalPrice: product.originalPrice ? `£${(product.originalPrice / 100).toFixed(2)}` : null
      }
    })

  } catch (error) {
    console.error('Payment Link creation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create payment link',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function getCustomMessage(productKey: string): string {
  const messages = {
    'lead-machine': 'Join the Lead Machine Partnership and start receiving 8-15 qualified leads within 24-48 hours.',
    'lead-machine-annual': 'Lock in the Lead Machine founding rate for a full year and save £996 compared to monthly billing.',
    'market-dominator': 'Secure your Market Dominator status with exclusive category ownership and eliminate all competition.',
    'market-dominator-annual': 'Lock in the Market Dominator founding rate for a full year and save £2,994 compared to monthly billing.',
    'premium-directory': 'Access our premium directory of 500+ verified service providers with direct messaging capabilities.',
    'premium-directory-annual': 'Get Premium Directory access for a full year and save £94 with annual billing.',
    'vip-concierge': 'Unlock VIP access with your personal account manager and 24/7 concierge support.',
    'vip-concierge-annual': 'Get VIP Concierge service for a full year and save £294 with annual billing.'
  }
  
  return messages[productKey as keyof typeof messages] || 'Complete your subscription to access premium features.'
}

// GET endpoint to retrieve existing payment links
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productKey = searchParams.get('product')

    if (!productKey) {
      // Return all available products
      return NextResponse.json({
        products: Object.entries(PRODUCTS).map(([key, product]) => ({
          key,
          name: product.name,
          description: product.description,
          price: `£${(product.amount / 100).toFixed(2)}`,
          interval: product.interval,
          features: product.features,
          originalPrice: product.originalPrice ? `£${(product.originalPrice / 100).toFixed(2)}` : null
        }))
      })
    }

    if (!PRODUCTS[productKey as keyof typeof PRODUCTS]) {
      return NextResponse.json(
        { error: 'Invalid product specified' },
        { status: 400 }
      )
    }

    const product = PRODUCTS[productKey as keyof typeof PRODUCTS]
    
    return NextResponse.json({
      product: {
        key: productKey,
        name: product.name,
        description: product.description,
        price: `£${(product.amount / 100).toFixed(2)}`,
        interval: product.interval,
        features: product.features,
        originalPrice: product.originalPrice ? `£${(product.originalPrice / 100).toFixed(2)}` : null
      }
    })

  } catch (error) {
    console.error('Payment Link retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve payment link information' },
      { status: 500 }
    )
  }
}