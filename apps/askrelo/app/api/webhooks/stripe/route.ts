import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sig || !whsec || !sk) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(sk, { apiVersion: '2023-10-16' });
    event = stripe.webhooks.constructEvent(body, sig, whsec);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Handle corporate emergency packages
      if (session.metadata?.type === 'corporate-emergency-package') {
        await handleCorporateEmergencyPayment(session);
        return NextResponse.json({ ok: true });
      }
      
      // Handle supplier subscriptions (existing logic)
      const plan = session.metadata?.plan as 'starter'|'featured'|'sponsored'|undefined;
      const cadence = session.metadata?.cadence as 'monthly'|'annual'|undefined;

      const supa = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supa.from('supplier_subscriptions').insert({
        email: session.customer_email ?? null,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
        stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
        plan: plan ?? null,
        cadence: cadence ?? null,
        status: session.status ?? null,
        metadata: session.metadata ?? {}
      });

      return NextResponse.json({ ok: true });
    }

    // Ignore other events for now
    return NextResponse.json({ ok: true, ignored: event.type });
  } catch (err: any) {
    console.error('stripe webhook error', err?.message);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

async function handleCorporateEmergencyPayment(session: Stripe.Checkout.Session) {
  console.log('Corporate emergency payment completed:', {
    sessionId: session.id,
    amount: session.amount_total,
    metadata: session.metadata
  });

  const { requestId, packageId, companyName, timeline } = session.metadata || {};

  if (!requestId) {
    console.error('No request ID in session metadata');
    return;
  }

  try {
    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Update the original emergency request with payment information
    await supa
      .from('corporate_emergency_requests')
      .update({
        status: 'paid',
        payment_session_id: session.id,
        package_id: packageId,
        amount_paid: session.amount_total,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId);

    // Send internal notification about successful payment
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'emergency@therelonetwork.com',
        to: ['emergency@therelonetwork.com', 'ops@therelonetwork.com'],
        subject: `💰 EMERGENCY PACKAGE PURCHASED - ${companyName}`,
        html: `
          <div style="background: #059669; color: white; padding: 20px; text-align: center;">
            <h1>🚨 EMERGENCY PACKAGE PURCHASED</h1>
            <p>IMMEDIATE SERVICE ACTIVATION REQUIRED</p>
          </div>
          
          <div style="padding: 20px;">
            <h2>Payment Confirmed</h2>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Package:</strong> ${packageId}</p>
            <p><strong>Amount:</strong> £${session.amount_total ? (session.amount_total / 100).toLocaleString() : 'Unknown'}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Request ID:</strong> ${requestId}</p>
            <p><strong>Session ID:</strong> ${session.id}</p>
            
            <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
              <h3 style="color: #92400E;">⚡ IMMEDIATE ACTIONS REQUIRED:</h3>
              <ol style="color: #92400E;">
                <li>Contact client within 2 hours as guaranteed</li>
                <li>Assign dedicated emergency specialist</li>
                <li>Activate emergency response protocol</li>
                <li>Begin service delivery immediately</li>
              </ol>
            </div>
            
            <p><strong>Payment Date:</strong> ${new Date().toLocaleString('en-GB')}</p>
          </div>
        `
      });
    }

  } catch (error) {
    console.error('Error processing corporate emergency payment:', error);
  }
}