import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const runtime = "nodejs";

// Valid plans for 2025 pricing model
const VALID_PLANS = {
  // Charter Partnership
  'founding_partner': { name: 'Founding Partner Charter', mode: 'payment' },
  'premium_sponsor': { name: 'Premium Sponsor', mode: 'payment' },
  
  // Core Services
  '72hour_audit': { name: '72-Hour Setup Audit', mode: 'payment' },
  'executive_intake': { name: 'Executive Intake', mode: 'payment' }, // Legacy support
  'plus': { name: 'Plus Directory Access', mode: 'subscription' },
  'pro': { name: 'Pro Directory Access', mode: 'subscription' },
  
  // AI Solutions
  'ai_executive': { name: 'Executive Voice AI', mode: 'payment' },
  'ai_enterprise': { name: 'Enterprise Voice AI', mode: 'payment' },
  'ai_showcase': { name: 'Relo Network Showcase', mode: 'payment' },
  
  // Accelerators
  'day_pass': { name: '72-Hour Day Pass', mode: 'payment' },
  'intro_pack_3': { name: 'Intro Pack (3)', mode: 'payment' },
  'intro_pack_10': { name: 'Premium Intro Pack (10)', mode: 'payment' },
};

const VALID_CADENCES = ['monthly', 'annual', 'one_time'];

export async function POST(req: NextRequest) {
  try {
    // Check if we're in development mode with placeholder key  
    const isPlaceholderKey = !stripeKey || 
                            stripeKey.includes('Placeholder') || 
                            stripeKey === 'sk_test_51PlaceholderKeyForDevelopmentMode123456789ABCDEF';
    
    if (!stripeKey) {
      console.error('Stripe secret key not configured');
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }
    
    console.log('Stripe key configured:', stripeKey ? 'Yes' : 'No');
    console.log('Using placeholder/dev mode:', isPlaceholderKey);
    
    // In development mode with placeholder key, return mock checkout URL
    if (isPlaceholderKey || !stripeKey || stripeKey.length < 10) {
      const { plan, email } = await req.json();
      console.log('Development mode: simulating checkout for plan:', plan);
      
      // For AI plans, redirect to demo page for now
      if (plan && plan.startsWith('ai_')) {
        return NextResponse.json({ 
          url: `${siteUrl}/ai-demo?plan=${plan}&source=checkout`,
          checkoutUrl: `${siteUrl}/ai-demo?plan=${plan}&source=checkout`,
          sessionId: 'dev_session_' + Date.now(),
          mode: 'development'
        }, { status: 200 });
      }
      
      // Simulate successful checkout creation for other plans
      return NextResponse.json({ 
        url: `${siteUrl}/checkout/dev-success?plan=${plan}&email=${email}`,
        checkoutUrl: `${siteUrl}/checkout/dev-success?plan=${plan}&email=${email}`,
        sessionId: 'dev_session_' + Date.now(),
        mode: 'development'
      }, { status: 200 });
    }
    
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

    const { plan, cadence = 'one_time', email, credit = 0, formData } = await req.json();
    
    if (!plan || !(plan in VALID_PLANS)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    
    if (!VALID_CADENCES.includes(cadence)) {
      return NextResponse.json({ error: "Invalid cadence" }, { status: 400 });
    }

    // Determine lookup key based on plan and cadence
    let lookup_key = plan;
    if (cadence !== 'one_time') {
      lookup_key = `${plan}_${cadence}`;
    }
    
    // Use updated lookup key for 72hour_audit
    if (plan === '72hour_audit') {
      lookup_key = '72hour_audit_v3497';
    }

    // Find price by lookup key
    console.log(`Searching for price with lookup_key: ${lookup_key}`);
    const prices = await stripe.prices.search({ 
      query: `lookup_key:'${lookup_key}' AND active:'true'` 
    });
    
    console.log(`Found ${prices.data.length} prices for lookup_key: ${lookup_key}`);
    let price = prices.data[0];
    
    // Fallback for test mode or missing prices - create mock prices if not found
    if (!price) {
      // Create mock price objects for test mode
      const mockPrices = {
        'founding_partner': {
          id: 'price_mock_founding_partner',
          unit_amount: 2500000, // £25,000 in pence
          currency: 'gbp'
        },
        'premium_sponsor': {
          id: 'price_mock_premium_sponsor', 
          unit_amount: 500000, // £5,000 in pence
          currency: 'gbp'
        },
        '72hour_audit': {
          id: 'price_mock_72hour_audit',
          unit_amount: 349700, // £3,497 in pence
          currency: 'gbp'
        },
        'executive_intake': {
          id: 'price_mock_executive_intake',
          unit_amount: 349700, // £3,497 in pence (same as 72hour_audit)
          currency: 'gbp'
        },
        'ai_executive': {
          id: 'price_mock_ai_executive',
          unit_amount: 249700, // £2,497 setup fee in pence
          currency: 'gbp'
        },
        'ai_enterprise': {
          id: 'price_mock_ai_enterprise',
          unit_amount: 499700, // £4,997 setup fee in pence
          currency: 'gbp'
        },
        'ai_showcase': {
          id: 'price_mock_ai_showcase',
          unit_amount: 999700, // £9,997 setup fee in pence
          currency: 'gbp'
        }
      };
      
      if (mockPrices[plan as keyof typeof mockPrices]) {
        price = mockPrices[plan as keyof typeof mockPrices] as any;
      }
    }
    
    if (!price) {
      console.error(`Price not found for plan: ${plan}, lookup_key: ${lookup_key}`);
      return NextResponse.json({ 
        error: "Price not found. Please contact support.",
        lookup_key: lookup_key,
        plan: plan,
        debug: "No price found in Stripe or mock prices"
      }, { status: 400 });
    }

    const planConfig = VALID_PLANS[plan as keyof typeof VALID_PLANS];
    
    // Handle Day Pass credit for Executive Intake
    const lineItems = [{ price: price.id, quantity: 1 }];
    const discounts = [];
    
    if (credit > 0 && plan === 'executive_intake') {
      // Create a discount for the credit amount
      try {
        const coupon = await stripe.coupons.create({
          amount_off: credit * 100, // Convert to pence
          currency: 'gbp',
          duration: 'once',
          name: 'Day Pass Credit',
        });
        discounts.push({ coupon: coupon.id });
      } catch (couponError) {
        console.error('Could not create credit coupon:', couponError);
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: planConfig.mode as 'payment' | 'subscription',
      billing_address_collection: "required",
      allow_promotion_codes: true,
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,
      success_url: (plan === 'executive_intake' || plan === '72hour_audit')
        ? `${siteUrl}/executive-intake/success?session_id={CHECKOUT_SESSION_ID}`
        : (plan === 'ai_executive' || plan === 'ai_enterprise' || plan === 'ai_showcase')
        ? `${siteUrl}/ai-solutions/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`
        : `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: (plan === 'executive_intake' || plan === '72hour_audit')
        ? `${siteUrl}/executive-intake`
        : (plan === 'ai_executive' || plan === 'ai_enterprise' || plan === 'ai_showcase')
        ? `${siteUrl}/relosolutions`
        : `${siteUrl}/checkout/cancelled?plan=${plan}`,
      customer_email: email || undefined,
      metadata: { 
        plan, 
        cadence, 
        lookup_key,
        plan_name: planConfig.name,
        // Include form data for executive intake/72hour audit
        ...(formData && (plan === '72hour_audit' || plan === 'executive_intake') && {
          formData: JSON.stringify(formData)
        })
      },
      // Custom text based on plan
      ...(plan === 'founding_partner' && {
        custom_text: {
          submit: {
            message: 'Founding Partner Charter - 12 months category exclusivity'
          }
        }
      }),
      ...(plan === 'premium_sponsor' && {
        custom_text: {
          submit: {
            message: 'Premium Sponsor - 90 days featured placement'
          }
        }
      }),
      ...(plan === '72hour_audit' && {
        custom_text: {
          submit: {
            message: '72-Hour Setup Audit - Area analysis, property shortlist, viewings itinerary, tenancy agreement review'
          }
        }
      }),
      ...(plan === 'executive_intake' && {
        custom_text: {
          submit: {
            message: 'Executive Intake - 60-min strategy call, bespoke shortlist, 3 warm intros'
          }
        }
      }),
      ...(plan === 'ai_executive' && {
        custom_text: {
          submit: {
            message: 'Executive Voice AI - £2,497 setup + £497/month. Custom AI agent with calendar integration and 30-day optimization.'
          }
        }
      }),
      ...(plan === 'ai_enterprise' && {
        custom_text: {
          submit: {
            message: 'Enterprise Voice AI - £4,997 setup + £997/month. Multiple AI agents with advanced CRM integration and dedicated account manager.'
          }
        }
      }),
      ...(plan === 'ai_showcase' && {
        custom_text: {
          submit: {
            message: 'Relo Network Showcase - £9,997 setup + £1,997/month. Complete Fortune 500-level AI system with full website integration.'
          }
        }
      }),
    });

    return NextResponse.json({ 
      url: session.url,
      checkoutUrl: session.url,
      sessionId: session.id 
    }, { status: 200 });
    
  } catch (e: any) {
    console.error("checkout error", e?.message);
    return NextResponse.json({ 
      error: "Stripe error",
      details: e?.message 
    }, { status: 500 });
  }
}