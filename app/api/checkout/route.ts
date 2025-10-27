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
  
  // Accelerators
  'day_pass': { name: '72-Hour Day Pass', mode: 'payment' },
  'intro_pack_3': { name: 'Intro Pack (3)', mode: 'payment' },
  'intro_pack_10': { name: 'Premium Intro Pack (10)', mode: 'payment' },
};

const VALID_CADENCES = ['monthly', 'annual', 'one_time'];

export async function POST(req: NextRequest) {
  try {
    if (!stripeKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' });

    const { plan, cadence = 'one_time', email, credit = 0 } = await req.json();
    
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

    // Find price by lookup key
    const prices = await stripe.prices.search({ 
      query: `lookup_key:'${lookup_key}' AND active:'true'` 
    });
    
    let price = prices.data[0];
    
    // Fallback for test mode - create mock prices if not found
    if (!price && stripeKey.includes('Placeholder')) {
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
        }
      };
      
      if (mockPrices[plan as keyof typeof mockPrices]) {
        price = mockPrices[plan as keyof typeof mockPrices] as any;
      }
    }
    
    if (!price) {
      return NextResponse.json({ 
        error: "Price not found. Please contact support.",
        lookup_key: lookup_key 
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
        : `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: (plan === 'executive_intake' || plan === '72hour_audit')
        ? `${siteUrl}/executive-intake`
        : `${siteUrl}/checkout/cancelled?plan=${plan}`,
      customer_email: email || undefined,
      metadata: { 
        plan, 
        cadence, 
        lookup_key,
        plan_name: planConfig.name 
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
            message: '72-Hour Setup Audit - Area analysis, property shortlist, viewings route, tenancy rider review'
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