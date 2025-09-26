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
  
  // Directory Access
  'executive_intake': { name: 'Executive Intake', mode: 'payment' },
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

    const { plan, cadence = 'one_time', email } = await req.json();
    
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
    
    const price = prices.data[0];
    if (!price) {
      return NextResponse.json({ 
        error: "Price not found. Please contact support.",
        lookup_key: lookup_key 
      }, { status: 400 });
    }

    const planConfig = VALID_PLANS[plan as keyof typeof VALID_PLANS];
    
    const session = await stripe.checkout.sessions.create({
      mode: planConfig.mode as 'payment' | 'subscription',
      billing_address_collection: "required",
      allow_promotion_codes: true,
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${siteUrl}/checkout/cancelled?plan=${plan}`,
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