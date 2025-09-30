import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ConsultationFormData } from '@/lib/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData: any = await request.json()
    
    // For now, just return success to test the flow
    // We'll skip validation and database insert
    
    const consultationId = `CON-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    return NextResponse.json({
      success: true,
      consultationId: consultationId,
      message: 'Consultation request submitted successfully'
    })

    /* Disabled for testing
    console.log('Received form data:', formData)
    
    // Check which required fields are missing
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      timeline: formData.timeline,
      propertyBudget: formData.propertyBudget,
      propertyType: formData.propertyType,
      neighborhoods: formData.neighborhoods,
      familySituation: formData.familySituation,
      isEmployerPaying: formData.isEmployerPaying,
      currentLocation: formData.currentLocation,
      specificRequirements: formData.specificRequirements,
      hearAboutUs: formData.hearAboutUs
    }
    
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key)
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields)
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      )
    }
    */

    /* Disabled database operations for testing
    // Generate consultation ID
    const consultationId = `CON-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // Store in database
    const { data, error } = await supabase
      .from('consultations')
      .insert({
        consultation_id: consultationId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.employer || 'Not specified',
        job_title: 'Not specified',
        relocation_timeline: formData.timeline,
        destination_city: 'London',
        current_location: formData.currentLocation,
        budget: formData.propertyBudget,
        property_type: formData.propertyType,
        bedrooms: formData.propertyType.includes('1-2') ? '1-2' : formData.propertyType.includes('2-3') ? '2-3' : formData.propertyType.includes('3-4') ? '3-4' : formData.propertyType.includes('4+') ? '4+' : 'Not specified',
        family_members: formData.familySituation,
        children_ages: null,
        school_preferences: null,
        employment_assistance: formData.isEmployerPaying === 'Employer/Company' ? 'Yes' : 'No',
        priorities: formData.neighborhoods,
        additional_requirements: formData.specificRequirements,
        how_heard: formData.hearAboutUs,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save consultation request' },
        { status: 500 }
      )
    }

    // Send email notifications
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send confirmation to client
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: formData.email,
          subject: 'Your Executive Relocation Consultation - Confirmed',
          html: `
            <h2>Thank you for choosing The Relo Network</h2>
            <p>Dear ${formData.firstName} ${formData.lastName},</p>
            <p>We've received your executive relocation consultation request and are excited to help you with your move to London.</p>
            
            <h3>What Happens Next:</h3>
            <ol>
              <li><strong>Within 2 hours:</strong> Our senior relocation specialist will call you at ${formData.phone}</li>
              <li><strong>Initial Consultation:</strong> We'll discuss your specific requirements and timeline</li>
              <li><strong>Customised Proposal:</strong> You'll receive a tailored relocation package within 24 hours</li>
            </ol>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Consultation Details:</h3>
              <p><strong>Consultation ID:</strong> ${consultationId}</p>
              <p><strong>Company:</strong> ${formData.employer || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${formData.timeline}</p>
              <p><strong>Destination:</strong> London</p>
              <p><strong>Budget Range:</strong> ${formData.propertyBudget}</p>
              <p><strong>Property Type:</strong> ${formData.propertyType}</p>
              <p><strong>Family Size:</strong> ${formData.familySituation}</p>
            </div>
            
            <h3>Emergency Contact:</h3>
            <p>For immediate assistance, call our 24/7 executive hotline: <strong>+44 20 3974 1239</strong></p>
            <p>Reference your consultation ID: <strong>${consultationId}</strong></p>
            
            <p>We understand the importance of your relocation and are committed to making this transition seamless for you and your family.</p>
            
            <p>Best regards,<br>The Relo Network Executive Team</p>
          `
        })

        // Send detailed notification to admin
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: 'consultations@therelonetwork.com',
          subject: `URGENT: New Executive Consultation - ${formData.employer || 'Individual Client'}`,
          html: `
            <h2>🚨 New Executive Relocation Consultation</h2>
            <p><strong>Priority:</strong> Contact within 2 hours</p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Client Information:</h3>
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Company:</strong> ${formData.employer || 'Not specified'}</p>
              <p><strong>Title:</strong> Not specified</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Consultation ID:</strong> ${consultationId}</p>
            </div>
            
            <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Relocation Details:</h3>
              <p><strong>Timeline:</strong> ${formData.timeline}</p>
              <p><strong>From:</strong> ${formData.currentLocation || 'Not specified'}</p>
              <p><strong>To:</strong> London</p>
              <p><strong>Budget:</strong> ${formData.propertyBudget}</p>
            </div>
            
            <div style="background: #f0f8ff; border: 1px solid #b6d7ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Property Requirements:</h3>
              <p><strong>Property Type:</strong> ${formData.propertyType}</p>
              <p><strong>Preferred Areas:</strong> ${formData.neighborhoods}</p>
              <p><strong>Family Situation:</strong> ${formData.familySituation}</p>
            </div>
            
            <h3>Additional Information:</h3>
            <p><strong>Employer Paying:</strong> ${formData.isEmployerPaying}</p>
            <p><strong>Additional Requirements:</strong> ${formData.specificRequirements}</p>
            <p><strong>How They Heard:</strong> ${formData.hearAboutUs}</p>
            
            <div style="background: #ffe6e6; border: 1px solid #ffb3b3; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>⏰ ACTION REQUIRED:</h3>
              <p>1. Call ${formData.phone} within 2 hours</p>
              <p>2. Prepare customised proposal for ${formData.propertyBudget} budget</p>
              <p>3. Confirm ${formData.timeline} timeline capability</p>
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
      consultationId: consultationId,
      message: 'Consultation request submitted successfully'
    })
    */

  } catch (error) {
    console.error('Consultation submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}