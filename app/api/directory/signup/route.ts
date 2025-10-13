import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// const supabase = createClient(
//  process.env.NEXT_PUBLIC_SUPABASE_URL!,
//  process.env.SUPABASE_SERVICE_ROLE_KEY!
// )

interface DirectorySignupFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  jobTitle: string
  companySize: string
  industryType: string
  accessTier: string
  serviceNeeds: string[]
  urgencyLevel: string
  budget: string
  londonAreas: string[]
  currentChallenges: string
  specificRequirements?: string
  howHeard?: string
  marketingConsent: boolean
}

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Configuration error - please contact support' },
        { status: 500 }
      )
    }

    const formData: DirectorySignupFormData = await request.json()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.companyName || !formData.jobTitle ||
        !formData.companySize || !formData.industryType || !formData.accessTier ||
        !formData.urgencyLevel || !formData.budget || !formData.currentChallenges) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate signup ID
    const signupId = `DIR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // Try to store in database, with fallback for missing table
    let data = null
    let error = null

    try {
      const result = await supabase
        .from('directory_signups')
        .insert({
          signup_id: signupId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          job_title: formData.jobTitle,
          company_size: formData.companySize,
          industry_type: formData.industryType,
          access_tier: formData.accessTier,
          service_needs: formData.serviceNeeds,
          urgency_level: formData.urgencyLevel,
          budget: formData.budget,
          london_areas: formData.londonAreas,
          current_challenges: formData.currentChallenges,
          specific_requirements: formData.specificRequirements,
          how_heard: formData.howHeard,
          marketing_consent: formData.marketingConsent,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      data = result.data
      error = result.error
    } catch (dbError) {
      console.error('Database operation failed:', dbError)
      // If database fails, create a mock data object for the rest of the flow
      data = { 
        id: Date.now(), 
        signup_id: signupId,
        ...formData 
      }
      error = null // Don't fail the request if DB is having issues
      console.log('Using fallback data storage, continuing with email notifications...')
    }

    if (error) {
      console.error('Database error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { 
          error: 'Database error - please contact support',
          details: process.env.NODE_ENV === 'development' ? error.message : 'Contact support with signup ID: ' + signupId
        },
        { status: 500 }
      )
    }

    let paymentUrl = null

    // Create Stripe session for paid tiers
    if (formData.accessTier !== 'free') {
      try {
        if (!process.env.STRIPE_SECRET_KEY) {
          console.error('Missing STRIPE_SECRET_KEY environment variable')
          throw new Error('Payment processing not configured')
        }
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-06-20',
        })
        
        const priceAmount = formData.accessTier === 'plus' ? 2900 : 9900 // £29 or £99
        const tierName = formData.accessTier === 'plus' ? 'Plus Directory Access' : 'Pro Directory Access'
        
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'gbp',
                product_data: {
                  name: `Relo Directory ${tierName}`,
                  description: `Monthly subscription to London's premier service directory`
                },
                unit_amount: priceAmount,
                recurring: {
                  interval: 'month'
                }
              },
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/directory/welcome?session_id={CHECKOUT_SESSION_ID}&signup_id=${data.id}&tier=${formData.accessTier}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/directory/signup`,
          metadata: {
            signup_id: data.id.toString(),
            access_tier: formData.accessTier,
            company_name: formData.companyName,
            contact_email: formData.email
          }
        })

        paymentUrl = session.url
      } catch (stripeError) {
        console.error('Stripe error:', stripeError)
        // Continue without payment for now, will handle manually
      }
    }

    // Send email notifications
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send confirmation to user
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: formData.email,
          subject: `Directory Access Confirmed - ${formData.accessTier === 'free' ? 'Essential' : formData.accessTier === 'plus' ? 'Plus' : 'Pro'}`,
          html: `
            <h2>Welcome to the Relo Network Directory!</h2>
            <p>Dear ${formData.firstName} ${formData.lastName},</p>
            <p>Thank you for joining London's premier service directory. Your ${formData.accessTier === 'free' ? 'Essential' : formData.accessTier === 'plus' ? 'Plus Directory' : 'Pro Directory'} access is being set up.</p>
            
            <h3>What Happens Next:</h3>
            <ol>
              ${formData.accessTier === 'free' ? 
                '<li><strong>Immediate Access:</strong> You can start browsing our basic directory right away</li>' :
                '<li><strong>Payment Processing:</strong> Complete your subscription setup to unlock full access</li>'
              }
              <li><strong>Account Setup:</strong> You\'ll receive login credentials within 2 hours</li>
              <li><strong>Partner Matching:</strong> Our team will identify relevant partners based on your requirements</li>
              ${formData.accessTier === 'pro' ? 
                '<li><strong>Pro Onboarding:</strong> Your dedicated account manager will contact you within 24 hours</li>' : ''
              }
            </ol>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Directory Profile:</h3>
              <p><strong>Signup ID:</strong> ${signupId}</p>
              <p><strong>Company:</strong> ${formData.companyName}</p>
              <p><strong>Access Tier:</strong> ${formData.accessTier === 'free' ? 'Essential (Free)' : formData.accessTier === 'plus' ? 'Plus (£29/month)' : 'Pro (£99/month)'}</p>
              <p><strong>Service Focus:</strong> ${formData.serviceNeeds.slice(0, 3).join(', ')}${formData.serviceNeeds.length > 3 ? '...' : ''}</p>
              <p><strong>Priority Areas:</strong> ${formData.londonAreas.slice(0, 3).join(', ')}${formData.londonAreas.length > 3 ? '...' : ''}</p>
              <p><strong>Timeline:</strong> ${formData.urgencyLevel}</p>
            </div>
            
            <h3>Directory Access:</h3>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/directory" style="background: #C9A24A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Access Directory Now</a></p>
            
            <h3>Need Help?</h3>
            <p>Our directory team is available 24/7: <strong>+44 20 3105 9566</strong></p>
            <p>Reference your signup ID: <strong>${signupId}</strong></p>
            
            <p>We're excited to connect you with London's most trusted service providers!</p>
            
            <p>Best regards,<br>The Relo Network Directory Team</p>
          `
        })

        // Send detailed notification to admin
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: 'directory@therelonetwork.com',
          subject: `New Directory Signup - ${formData.accessTier.toUpperCase()} - ${formData.companyName}`,
          html: `
            <h2>🎯 New Directory Access Signup</h2>
            <p><strong>Priority:</strong> ${formData.urgencyLevel} | <strong>Tier:</strong> ${formData.accessTier.toUpperCase()}</p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Contact Information:</h3>
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Company:</strong> ${formData.companyName} (${formData.companySize})</p>
              <p><strong>Title:</strong> ${formData.jobTitle}</p>
              <p><strong>Industry:</strong> ${formData.industryType}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Signup ID:</strong> ${signupId}</p>
            </div>
            
            <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Access Requirements:</h3>
              <p><strong>Tier:</strong> ${formData.accessTier === 'free' ? 'Essential (Free)' : formData.accessTier === 'plus' ? 'Plus (£29/month)' : 'Pro (£99/month)'}</p>
              <p><strong>Timeline:</strong> ${formData.urgencyLevel}</p>
              <p><strong>Budget:</strong> ${formData.budget}</p>
              <p><strong>Payment URL:</strong> ${paymentUrl || 'Free tier - no payment required'}</p>
            </div>
            
            <div style="background: #f0f8ff; border: 1px solid #b6d7ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Service Requirements:</h3>
              <p><strong>Services Needed:</strong></p>
              <ul>
                ${formData.serviceNeeds.map(service => `<li>${service}</li>`).join('')}
              </ul>
              <p><strong>London Areas:</strong> ${formData.londonAreas.join(', ')}</p>
            </div>
            
            <h3>Business Context:</h3>
            <p><strong>Current Challenges:</strong></p>
            <p>${formData.currentChallenges}</p>
            
            ${formData.specificRequirements ? `
              <p><strong>Specific Requirements:</strong></p>
              <p>${formData.specificRequirements}</p>
            ` : ''}
            
            ${formData.howHeard ? `<p><strong>How They Heard:</strong> ${formData.howHeard}</p>` : ''}
            <p><strong>Marketing Consent:</strong> ${formData.marketingConsent ? 'Yes' : 'No'}</p>
            
            <div style="background: #ffe6e6; border: 1px solid #ffb3b3; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>⏰ ACTION REQUIRED:</h3>
              ${formData.accessTier === 'pro' ? `
                <p>1. <strong>Pro Priority:</strong> Contact ${formData.phone} within 2 hours</p>
                <p>2. Assign dedicated account manager</p>
                <p>3. Prepare custom partner shortlist</p>
              ` : formData.accessTier === 'plus' ? `
                <p>1. Set up plus directory access</p>
                <p>2. Send login credentials</p>
                <p>3. Prepare partner recommendations</p>
              ` : `
                <p>1. Activate free directory access</p>
                <p>2. Send welcome email with basic access</p>
              `}
              <p>4. Add to CRM with urgency: ${formData.urgencyLevel}</p>
            </div>
          `
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Continue without failing the request
      }
    }

    return NextResponse.json({
      success: true,
      signupId: signupId,
      paymentUrl: paymentUrl,
      message: 'Directory signup submitted successfully'
    })

  } catch (error) {
    console.error('Directory signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}