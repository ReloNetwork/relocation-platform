import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    if (!stripeKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

    const { plan, cadence, email } = await req.json();
    if (!["starter", "featured", "sponsored"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    if (!["monthly", "annual"].includes(cadence)) {
      return NextResponse.json({ error: "Invalid cadence" }, { status: 400 });
    }

    // Prices created by your stripe:seed script via lookup_key
    const lookup_key = `relo_${plan}_${cadence}`;
    const prices = await stripe.prices.search({ query: `lookup_key:'${lookup_key}' AND active:'true'` });
    const price = prices.data[0];
    if (!price) return NextResponse.json({ error: "Price not found" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "required",
      allow_promotion_codes: true,
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${siteUrl}/partners?success=1`,
      cancel_url: `${siteUrl}/partners?canceled=1`,
      customer_email: email || undefined,
      metadata: { plan, cadence, lookup_key },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e: any) {
    console.error("checkout error", e?.message);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}