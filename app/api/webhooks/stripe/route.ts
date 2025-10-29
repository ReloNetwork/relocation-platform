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
      
      // Handle client relocation service purchases
      if (session.metadata?.type === 'client-relocation-service') {
        await handleClientRelocationPurchase(session);
        return NextResponse.json({ ok: true });
      }
      
      // Handle executive intake/72-hour audit payments
      if (session.metadata?.plan === '72hour_audit' || session.metadata?.plan === 'executive_intake') {
        await handleExecutiveIntakePayment(session);
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

async function handleClientRelocationPurchase(session: Stripe.Checkout.Session) {
  console.log('Client relocation service purchased:', {
    sessionId: session.id,
    amount: session.amount_total,
    customerEmail: session.customer_email,
    metadata: session.metadata
  });

  const { 
    serviceType, 
    routeFrom, 
    routeTo, 
    moveDate, 
    budgetRange,
    companyName,
    fullName
  } = session.metadata || {};

  if (!session.customer_email) {
    console.error('No customer email in session');
    return;
  }

  try {
    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // First, ensure user exists in auth system
    let userId: string;
    
    // Check if user already exists
    const { data: existingUsers } = await supa.auth.admin.listUsers();
    const existingUser = existingUsers.users.find(u => u.email === session.customer_email);
    
    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create user in auth system
      const { data: newUser, error: userError } = await supa.auth.admin.createUser({
        email: session.customer_email!,
        password: Math.random().toString(36),
        email_confirm: true
      });
      
      if (userError || !newUser.user) {
        console.error('Error creating user:', userError);
        return;
      }
      
      userId = newUser.user.id;
    }

    // Create or update user profile
    await supa.from('users').upsert({
      id: userId,
      email: session.customer_email,
      role: 'client'
    });

    // Create client profile if it doesn't exist
    await supa.from('client_profiles').upsert({
      user_id: userId,
      full_name: fullName || null,
      timezone: 'Europe/London'
    });

    // Create organization for the client
    const { data: org, error: orgError } = await supa.from('orgs').insert({
      name: companyName || fullName || session.customer_email,
      type: companyName ? 'corporate' : 'individual'
    }).select().single();

    if (orgError || !org) {
      console.error('Error creating organization:', orgError);
      return;
    }

    // Create org membership
    await supa.from('org_memberships').insert({
      user_id: userId,
      org_id: org.id,
      role: 'client'
    });

    // Create move case
    const { data: moveCase, error: moveCaseError } = await supa.from('move_cases').insert({
      org_id: org.id,
      client_user_id: userId,
      route_from: routeFrom || 'TBD',
      route_to: routeTo || 'London, UK',
      move_date: moveDate || null,
      status: 'intake',
      budget_range: budgetRange || null,
      notes: `Service purchased: ${serviceType || 'Relocation Service'}\nAmount paid: £${session.amount_total ? (session.amount_total / 100).toLocaleString() : 'Unknown'}\nStripe Session: ${session.id}`
    }).select().single();

    if (moveCaseError) {
      console.error('Error creating move case:', moveCaseError);
      return;
    }

    // Send welcome email with dashboard link
    if (process.env.RESEND_API_KEY && moveCase) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const dashboardLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://therelonetwork.com'}/dashboard?case=${moveCase.id}`;
      
      await resend.emails.send({
        from: 'welcome@therelonetwork.com',
        to: session.customer_email,
        subject: `Welcome to Relo Network - Your Relocation Journey Begins! 🏠`,
        html: `
          <div style="background: #059669; color: white; padding: 20px; text-align: center;">
            <h1>🎉 Welcome to Relo Network!</h1>
            <p>Your relocation service has been activated</p>
          </div>
          
          <div style="padding: 20px;">
            <h2>Your Relocation Journey Starts Now</h2>
            <p>Dear ${fullName || 'Valued Client'},</p>
            <p>Thank you for choosing Relo Network for your relocation to London. Your payment has been confirmed and your dedicated dashboard is ready!</p>
            
            <div style="background: #F3F4F6; border-left: 4px solid #059669; padding: 15px; margin: 20px 0;">
              <h3 style="color: #059669;">🚀 Your Next Steps:</h3>
              <ol style="color: #374151;">
                <li><strong>Access your dashboard:</strong> <a href="${dashboardLink}" style="color: #059669;">Click here to view your relocation dashboard</a></li>
                <li><strong>Complete your profile:</strong> Help us understand your needs better</li>
                <li><strong>Meet your concierge:</strong> You'll be assigned a dedicated relocation specialist within 24 hours</li>
                <li><strong>Begin planning:</strong> Your concierge will contact you to start planning your move</li>
              </ol>
            </div>
            
            <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
              <h3 style="color: #92400E;">📋 Your Purchase Details:</h3>
              <p style="color: #92400E;"><strong>Service:</strong> ${serviceType || 'Relocation Service'}</p>
              <p style="color: #92400E;"><strong>Route:</strong> ${routeFrom || 'TBD'} → ${routeTo || 'London, UK'}</p>
              <p style="color: #92400E;"><strong>Amount Paid:</strong> £${session.amount_total ? (session.amount_total / 100).toLocaleString() : 'Unknown'}</p>
              <p style="color: #92400E;"><strong>Case ID:</strong> ${moveCase.id}</p>
            </div>
            
            <p><strong>Questions?</strong> Reply to this email or contact us at <a href="mailto:hello@therelonetwork.com">hello@therelonetwork.com</a></p>
            
            <p>Welcome to the Relo Network family!</p>
            <p><strong>The Relo Network Team</strong></p>
            
            <p style="font-size: 12px; color: #6B7280;">Your dashboard link: <a href="${dashboardLink}">${dashboardLink}</a></p>
          </div>
        `
      });

      // Send internal notification
      await resend.emails.send({
        from: 'alerts@therelonetwork.com',
        to: ['ops@therelonetwork.com', 'concierge@therelonetwork.com'],
        subject: `🎯 NEW CLIENT ONBOARDED - ${fullName || session.customer_email}`,
        html: `
          <div style="background: #059669; color: white; padding: 20px; text-align: center;">
            <h1>🎯 NEW CLIENT PURCHASE</h1>
            <p>Client dashboard and move case created successfully</p>
          </div>
          
          <div style="padding: 20px;">
            <h2>Client Onboarded Successfully</h2>
            <p><strong>Client Email:</strong> ${session.customer_email}</p>
            <p><strong>Full Name:</strong> ${fullName || 'Not provided'}</p>
            <p><strong>Company:</strong> ${companyName || 'Individual'}</p>
            <p><strong>Service:</strong> ${serviceType || 'Relocation Service'}</p>
            <p><strong>Route:</strong> ${routeFrom || 'TBD'} → ${routeTo || 'London, UK'}</p>
            <p><strong>Amount:</strong> £${session.amount_total ? (session.amount_total / 100).toLocaleString() : 'Unknown'}</p>
            <p><strong>Move Case ID:</strong> ${moveCase.id}</p>
            <p><strong>Dashboard Link:</strong> <a href="${dashboardLink}">${dashboardLink}</a></p>
            <p><strong>Org ID:</strong> ${org.id}</p>
            <p><strong>User ID:</strong> ${userId}</p>
            
            <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
              <h3 style="color: #92400E;">⚡ IMMEDIATE ACTIONS REQUIRED:</h3>
              <ol style="color: #92400E;">
                <li>Assign dedicated concierge within 24 hours</li>
                <li>Send welcome call invitation</li>
                <li>Begin intake process</li>
                <li>Set up initial consultation</li>
              </ol>
            </div>
          </div>
        `
      });
    }

    console.log('Client relocation purchase processed successfully:', {
      userId,
      orgId: org.id,
      moveCaseId: moveCase?.id,
      dashboardUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://therelonetwork.com'}/dashboard?case=${moveCase?.id}`
    });

  } catch (error) {
    console.error('Error processing client relocation purchase:', error);
  }
}

async function handleExecutiveIntakePayment(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing executive intake payment:', session.id);
    
    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Parse form data from metadata
    let formData = null;
    if (session.metadata?.formData) {
      try {
        formData = JSON.parse(session.metadata.formData);
      } catch (e) {
        console.error('Error parsing form data from metadata:', e);
      }
    }

    if (!formData) {
      console.error('No form data found in session metadata');
      return;
    }

    // Generate reference ID
    const referenceId = `EX-${Date.now().toString().slice(-8)}`;
    
    // Prepare data for database insertion
    const intakeData = {
      reference_id: referenceId,
      name: formData.name,
      email: formData.email || session.customer_email,
      phone: formData.phone,
      move_date: formData.moveDate,
      flexibility: formData.flexibility,
      urgency: formData.urgency,
      budget: formData.budget,
      budget_flexible: formData.budgetFlexible || false,
      preferred_areas: formData.preferredAreas || [],
      avoid_areas: formData.avoidAreas,
      property_type: formData.propertyType,
      property_priority: formData.propertyPriority,
      adults: formData.adults,
      children: formData.children,
      children_ages: formData.childrenAges,
      pets: formData.pets || false,
      schools_priority: formData.schoolsPriority,
      visa_priority: formData.visaPriority,
      visa_support: formData.visaSupport || false,
      taxation_support: formData.taxationSupport || false,
      banking_support: formData.bankingSupport || false,
      schooling_support: formData.schoolingSupport || false,
      lifestyle_support: formData.lifestyleSupport || false,
      other_requirements: formData.otherRequirements,
      special_requirements: formData.specialRequirements,
      stripe_session_id: session.id,
      stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
      amount_paid: session.amount_total,
      payment_status: 'completed',
      submitted_at: new Date().toISOString()
    };

    // Save to database
    const { data, error } = await supa
      .from('executive_intakes')
      .insert([intakeData])
      .select()
      .single();

    if (error) {
      console.error('Error saving executive intake to database:', error);
      return;
    }

    console.log('Executive intake saved successfully:', {
      id: data.id,
      referenceId: referenceId,
      email: formData.email,
      amount: session.amount_total
    });

    // Send notification emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      // Send admin notification
      await resend.emails.send({
        from: 'Executive Team <executive@therelonetwork.com>',
        to: ['hello@therelonetwork.com', 'executive@therelonetwork.com'],
        subject: `🎯 NEW 72-Hour Audit Purchase - ${formData.name}`,
        html: `
          <div style="background: #C9A24A; color: white; padding: 20px; text-align: center;">
            <h1>🎯 NEW 72-HOUR AUDIT PURCHASED</h1>
            <p>IMMEDIATE CUSTOMER ONBOARDING REQUIRED</p>
          </div>
          
          <div style="padding: 20px;">
            <h2>Payment Confirmed</h2>
            <p><strong>Customer:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Reference:</strong> ${referenceId}</p>
            <p><strong>Amount:</strong> £${session.amount_total ? (session.amount_total / 100).toLocaleString() : 'Unknown'}</p>
            <p><strong>Move Date:</strong> ${formData.moveDate}</p>
            <p><strong>Urgency:</strong> ${formData.urgency}</p>
            
            <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
              <h3 style="color: #92400E;">⚡ IMMEDIATE ACTIONS REQUIRED:</h3>
              <ol style="color: #92400E;">
                <li>Contact customer within ${formData.urgency === 'emergency' ? '2 hours' : formData.urgency === 'urgent' ? '12 hours' : '24 hours'}</li>
                <li>Schedule 60-minute strategy call</li>
                <li>Begin area shortlist preparation</li>
                <li>Activate executive support protocol</li>
              </ol>
            </div>
            
            <h3>Customer Requirements Summary:</h3>
            <ul>
              <li><strong>Budget:</strong> ${formData.budget}</li>
              <li><strong>Preferred Areas:</strong> ${formData.preferredAreas?.join(', ') || 'Not specified'}</li>
              <li><strong>Property Type:</strong> ${formData.propertyType || 'Not specified'}</li>
              <li><strong>Family Size:</strong> ${formData.adults} adults, ${formData.children} children</li>
              <li><strong>Support Needed:</strong> ${[
                formData.visaSupport && 'Visa',
                formData.schoolingSupport && 'Schools',
                formData.bankingSupport && 'Banking',
                formData.taxationSupport && 'Tax',
                formData.lifestyleSupport && 'Lifestyle'
              ].filter(Boolean).join(', ') || 'Basic relocation only'}</li>
            </ul>
            
            <p><strong>Session ID:</strong> ${session.id}</p>
          </div>
        `
      });

      // Send customer confirmation
      await resend.emails.send({
        from: 'Executive Team <executive@therelonetwork.com>',
        to: [formData.email],
        subject: 'Welcome to Executive Service - Your 72-Hour Audit Begins Now',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #C9A24A; color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0;">Welcome to Executive Service</h1>
              <p style="margin: 10px 0 0 0;">Your 72-Hour Setup Audit has begun</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #0B1B2B;">Dear ${formData.name},</h2>
              
              <p>Your payment has been confirmed and your 72-Hour Setup Audit is now active. Our executive team is already reviewing your requirements.</p>
              
              <div style="background: #C9A24A; background: linear-gradient(135deg, #C9A24A 0%, #B8923D 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0;">Your Reference: ${referenceId}</h3>
                <p style="margin: 0;">Please save this reference for all future communications</p>
              </div>
              
              <h3 style="color: #0B1B2B;">What Happens Next:</h3>
              <ol style="color: #6B7280; line-height: 1.6;">
                <li><strong>Strategy Call (Within ${formData.urgency === 'emergency' ? '2 hours' : formData.urgency === 'urgent' ? '12 hours' : '24 hours'}):</strong> Our team will call you to schedule your 60-minute consultation</li>
                <li><strong>Shortlist Preparation (Day 1-2):</strong> We begin curating your bespoke area analysis and property shortlist</li>
                <li><strong>Warm Introductions (Within 7 days):</strong> Direct connections to 3 vetted partners matching your requirements</li>
                <li><strong>30-Day Support Window:</strong> Ongoing guidance throughout your relocation process</li>
              </ol>
              
              <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #92400E;"><strong>Guarantee:</strong> If we don't provide 3 qualified introductions within 7 days, we'll extend your concierge window at no additional cost.</p>
              </div>
              
              <h3 style="color: #0B1B2B;">Your Requirements Summary:</h3>
              <ul style="color: #6B7280;">
                <li><strong>Move Date:</strong> ${formData.moveDate}</li>
                <li><strong>Budget:</strong> ${formData.budget}</li>
                <li><strong>Preferred Areas:</strong> ${formData.preferredAreas?.join(', ') || 'Open to recommendations'}</li>
                <li><strong>Urgency Level:</strong> ${formData.urgency}</li>
              </ul>
              
              <h3 style="color: #0B1B2B;">Your Executive Team:</h3>
              <ul style="color: #6B7280;">
                <li><strong>Priority Support:</strong> +44 20 3105 9566</li>
                <li><strong>Direct Email:</strong> executive@therelonetwork.com</li>
                <li><strong>Reference:</strong> ${referenceId}</li>
              </ul>
              
              <p>We're excited to make your London relocation effortless.</p>
              
              <p>Best regards,<br>
              <strong>The Executive Team</strong><br>
              Relo Network</p>
            </div>
            
            <div style="background: #FAFAF9; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
              <p>© 2025 Relo Network Ltd. London, United Kingdom.</p>
            </div>
          </div>
        `
      });
    }

  } catch (error) {
    console.error('Error processing executive intake payment:', error);
  }
}