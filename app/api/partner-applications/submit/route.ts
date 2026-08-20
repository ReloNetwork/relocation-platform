import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PartnerApplicationFormData } from '@/lib/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing-service-role-key'
)

export async function POST(request: NextRequest) {
  try {
    const formData: PartnerApplicationFormData = await request.json()
    
    // Validate required fields
    if (!formData.companyName || !formData.serviceType || !formData.contactName || 
        !formData.contactTitle || !formData.phone || !formData.email || 
        !formData.territory || !formData.monthlyLeads || !formData.marketingSpend ||
        !formData.experience || !formData.specializations || !formData.whyPartner) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in database
    const { data, error } = await supabase
      .from('partner_applications')
      .insert({
        company_name: formData.companyName,
        service_type: formData.serviceType,
        contact_name: formData.contactName,
        contact_title: formData.contactTitle,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        territory: formData.territory,
        monthly_leads: formData.monthlyLeads,
        marketing_spend: formData.marketingSpend,
        experience: formData.experience,
        specializations: formData.specializations,
        why_partner: formData.whyPartner,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 }
      )
    }

    // Create Stripe checkout session for founding partner fee
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Relo Network Founding Partner Onboarding',
              description: 'One-time founding partner rate - secure exclusive territory access'
            },
            unit_amount: 49700, // £497.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/partners/welcome?session_id={CHECKOUT_SESSION_ID}&application_id=${data.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/partners/apply`,
      metadata: {
        application_id: data.id.toString(),
        company_name: formData.companyName,
        contact_email: formData.email,
        territory: formData.territory
      }
    })

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send confirmation to applicant
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: formData.email,
          subject: 'Your Founding Partner Application - Next Steps',
          html: `
            <h2>Thank you for your interest in joining The Relo Network!</h2>
            <p>Dear ${formData.contactName},</p>
            <p>We've received your founding partner application for <strong>${formData.companyName}</strong> in the ${formData.territory} territory.</p>
            
            <h3>Next Steps:</h3>
            <ol>
              <li>Complete your founding partner payment of £497 (normally £997)</li>
              <li>We'll review your application within 24 hours</li>
              <li>Upon approval, you'll receive exclusive territory access</li>
            </ol>
            
            <p><strong>Application Details:</strong></p>
            <ul>
              <li>Company: ${formData.companyName}</li>
              <li>Service Type: ${formData.serviceType}</li>
              <li>Territory: ${formData.territory}</li>
              <li>Monthly Leads Needed: ${formData.monthlyLeads}</li>
            </ul>
            
            <p>Questions? Call our partner team: <strong>+44 20 3105 9566</strong></p>
            
            <p>Best regards,<br>The Relo Network Team</p>
          `
        })

        // Send notification to admin
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: 'partnerships@therelonetwork.com',
          subject: `New Founding Partner Application - ${formData.companyName}`,
          html: `
            <h2>New Founding Partner Application Received</h2>
            <p><strong>Company:</strong> ${formData.companyName}</p>
            <p><strong>Contact:</strong> ${formData.contactName} (${formData.contactTitle})</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Territory:</strong> ${formData.territory}</p>
            <p><strong>Service Type:</strong> ${formData.serviceType}</p>
            <p><strong>Monthly Leads:</strong> ${formData.monthlyLeads}</p>
            <p><strong>Marketing Spend:</strong> ${formData.marketingSpend}</p>
            
            <h3>Experience:</h3>
            <p>${formData.experience}</p>
            
            <h3>Specializations:</h3>
            <p>${formData.specializations}</p>
            
            <h3>Why Partner:</h3>
            <p>${formData.whyPartner}</p>
            
            <p><strong>Application ID:</strong> ${data.id}</p>
            <p><strong>Stripe Session:</strong> ${session.id}</p>
          `
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Continue without failing the request
      }
    }

    return NextResponse.json({
      success: true,
      paymentUrl: session.url,
      applicationId: data.id
    })

  } catch (error) {
    console.error('Partner application error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
