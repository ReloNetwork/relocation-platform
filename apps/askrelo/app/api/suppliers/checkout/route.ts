import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { supplierCheckoutSchema } from '@/lib/validations';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = supplierCheckoutSchema.parse(body);
    
    const supabase = createServerSupabase();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify user owns the supplier
    const { data: supplier } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', validatedData.supplier_id)
      .eq('user_id', user.id)
      .single();
    
    if (!supplier) {
      return NextResponse.json(
        { error: 'Supplier not found or access denied' },
        { status: 404 }
      );
    }
    
    // Get the plan details
    const { data: plan } = await supabase
      .from('partner_plans')
      .select('*')
      .eq('id', validatedData.plan_id)
      .single();
    
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }
    
    // Get the Stripe price ID based on billing cycle
    const stripePriceId = validatedData.billing_cycle === 'annual' 
      ? plan.stripe_price_annual_id 
      : plan.stripe_price_monthly_id;
    
    if (!stripePriceId) {
      return NextResponse.json(
        { error: 'Stripe price not configured for this plan' },
        { status: 500 }
      );
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        supplier_id: validatedData.supplier_id,
        plan_id: validatedData.plan_id,
        billing_cycle: validatedData.billing_cycle,
        user_id: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/suppliers/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/suppliers/pricing`,
      customer_email: user.email,
    });
    
    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: 'Payment processing error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}