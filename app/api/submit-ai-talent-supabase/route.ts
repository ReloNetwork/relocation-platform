import { NextRequest, NextResponse } from "next/server"
import { createServiceSupabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { userType, addToIndex, ...formData } = data
    
    // Initialize Supabase client
    const supabase = createServiceSupabase()
    
    // Generate reference number
    const referenceNumber = userType === 'company' 
      ? `VEL-${Date.now().toString(36).toUpperCase()}`
      : `AI-${Date.now().toString(36).toUpperCase()}`
    
    // Prepare submission data
    const submissionData = {
      reference_number: referenceNumber,
      user_type: userType,
      company_name: formData.companyName,
      contact_name: formData.contactName,
      contact_role: formData.contactRole,
      contact_email: formData.contactEmail,
      contact_phone: formData.contactPhone,
      talent_role: formData.talentRole,
      current_location: formData.currentLocation,
      salary_range: formData.salaryRange,
      target_start_date: formData.targetStartDate,
      competing_offers: formData.competingOffers,
      visa_status: formData.visaStatus,
      urgency_level: formData.urgencyLevel,
      employee_count: formData.employeeCount,
      housing_budget: formData.housingBudget,
      family_size: formData.familySize,
      preferred_areas: formData.preferredAreas || [],
      school_requirement: formData.schoolRequirement,
      spouse_employment: formData.spouseEmployment,
      pet_relocation: formData.petRelocation,
      special_requirements: formData.specialRequirements,
      referral_source: formData.referralSource,
      office_location: formData.officeLocation,
      add_to_index: addToIndex || false,
      ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown'
    }

    // Save to Supabase
    const { data: savedSubmission, error: dbError } = await supabase
      .from('ai_talent_assessments')
      .insert([submissionData])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save assessment')
    }

    // Send confirmation email to submitter
    try {
      const isCompany = userType === 'company'
      const emailSubject = isCompany 
        ? "Relocation Velocity Assessment Received – Next Steps"
        : "AI Talent Relocation Assessment Received – Next Steps"
      
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'hello@therelonetwork.com',
        to: formData.contactEmail,
        subject: emailSubject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0B1220; margin-bottom: 20px;">
              ${isCompany ? 'Velocity Assessment' : 'Assessment'} Received!
            </h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              Dear ${formData.contactName},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Thank you for submitting your ${isCompany ? 'Relocation Velocity Assessment' : 'AI talent relocation assessment'}. 
              Your request has been prioritised and assigned reference number: <strong>${referenceNumber}</strong>
            </p>
            
            <div style="background-color: #0B1220; color: white; border-radius: 8px; padding: 24px; margin: 20px 0;">
              <h3 style="color: #C9A24A; margin-top: 0; margin-bottom: 16px; font-size: 20px;">
                ⏰ 2-Hour Response Guarantee
              </h3>
              <p style="color: #E5E7EB; font-size: 16px; line-height: 1.5; margin: 0;">
                ${isCompany 
                  ? 'A relocation velocity specialist' 
                  : 'An AI relocation specialist'} will contact you within 2 hours to discuss:
              </p>
            </div>
            
            ${isCompany ? `
              <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #0B1220; margin-top: 0; margin-bottom: 16px;">What We'll Cover:</h3>
                <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0;">
                  <li><strong>Current Process Analysis</strong> - Mapping your relocation timeline</li>
                  <li><strong>Velocity Benchmarks</strong> - How you compare to industry standards</li>
                  <li><strong>Drop-off Risk Assessment</strong> - Identifying candidate loss points</li>
                  <li><strong>30-Day Action Plan</strong> - Quick wins to improve velocity</li>
                </ul>
              </div>
            ` : `
              <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #0B1220; margin-top: 0; margin-bottom: 16px;">What We'll Cover:</h3>
                <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0;">
                  <li><strong>72-Hour Housing Shortlist</strong> - Properties matching your requirements</li>
                  <li><strong>School Placement</strong> - Availability and application support</li>
                  <li><strong>Neighbourhood Guidance</strong> - Area insights and commute planning</li>
                  <li><strong>7-Day Setup Plan</strong> - Complete relocation timeline</li>
                </ul>
              </div>
            `}
            
            <div style="background-color: #FEF3C7; border-left: 4px solid #C9A24A; padding: 16px; margin: 20px 0;">
              <p style="color: #92400E; font-size: 14px; margin: 0;">
                <strong>Need immediate assistance?</strong><br>
                Our 24/7 concierge is available at +44 20 7946 0958
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 14px; margin: 8px 0;">
                <strong>Your Details:</strong>
              </p>
              <ul style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 8px 0;">
                ${isCompany ? `
                  <li>Company: ${formData.companyName}</li>
                  <li>AI Hires: ${formData.employeeCount}</li>
                  <li>Primary Roles: ${formData.talentRole}</li>
                  <li>Source Markets: ${formData.currentLocation}</li>
                ` : `
                  <li>Employer: ${formData.companyName}</li>
                  <li>Role: ${formData.talentRole}</li>
                  <li>Current Location: ${formData.currentLocation}</li>
                  <li>Start Date: ${formData.targetStartDate}</li>
                `}
              </ul>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-top: 30px; margin-bottom: 8px;">
              Best regards,
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 8px;">
              The Relo Network Team
            </p>
            <p style="margin-bottom: 0;">
              <a href="https://therelonetwork.com" style="color: #C9A24A; text-decoration: none;">therelonetwork.com</a>
            </p>
          </div>
        `
      })

      // Update confirmation sent timestamp
      await supabase
        .from('ai_talent_assessments')
        .update({ 
          confirmation_sent: true,
          confirmation_sent_at: new Date().toISOString() 
        })
        .eq('id', savedSubmission.id)

    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't throw - we still saved the submission
    }

    // Send notification email to admin
    try {
      const isCompany = userType === 'company'
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'hello@therelonetwork.com',
        to: 'hello@therelonetwork.com',
        reply_to: formData.contactEmail,
        subject: `🚨 New ${isCompany ? 'Velocity Assessment' : 'AI Talent Assessment'} - ${formData.contactName} - ${formData.companyName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <h2 style="color: #0B1220; margin-bottom: 20px;">
              New ${isCompany ? 'Relocation Velocity Assessment' : 'AI Talent Assessment'}
            </h2>
            
            <div style="background-color: #FEF3C7; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0; color: #92400E; font-size: 18px;">
                <strong>⏰ 2-Hour Response Required!</strong>
              </p>
            </div>
            
            <div style="background-color: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <h3 style="color: #0B1220; margin-top: 0;">Contact Information:</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${formData.contactName}</p>
              <p style="margin: 8px 0;"><strong>Role:</strong> ${formData.contactRole}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${formData.contactEmail}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${formData.contactPhone}</p>
              <p style="margin: 8px 0;"><strong>Company:</strong> ${formData.companyName}</p>
              <p style="margin: 8px 0;"><strong>Reference:</strong> ${referenceNumber}</p>
            </div>
            
            ${isCompany ? `
              <div style="background-color: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h3 style="color: #0B1220; margin-top: 0;">Company Assessment Details:</h3>
                <p style="margin: 8px 0;"><strong>AI Hires (Next 12 Months):</strong> ${formData.employeeCount}</p>
                <p style="margin: 8px 0;"><strong>Primary Roles:</strong> ${formData.talentRole}</p>
                <p style="margin: 8px 0;"><strong>Source Markets:</strong> ${formData.currentLocation}</p>
                <p style="margin: 8px 0;"><strong>Salary Range:</strong> ${formData.salaryRange || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Current Time to Start:</strong> ${formData.urgencyLevel}</p>
                <p style="margin: 8px 0;"><strong>Drop-off Rate:</strong> ${formData.competingOffers}</p>
                <p style="margin: 8px 0;"><strong>Current Support:</strong> ${formData.visaStatus}</p>
                <p style="margin: 8px 0;"><strong>Biggest Challenge:</strong> ${formData.specialRequirements || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Improvement Priority:</strong> ${formData.petRelocation || 'Not specified'}</p>
                ${addToIndex ? '<p style="margin: 8px 0; color: #C9A24A;"><strong>✓ Added to London Relocation Index</strong></p>' : ''}
              </div>
            ` : `
              <div style="background-color: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h3 style="color: #0B1220; margin-top: 0;">Relocation Details:</h3>
                <p style="margin: 8px 0;"><strong>Role:</strong> ${formData.talentRole}</p>
                <p style="margin: 8px 0;"><strong>Current Location:</strong> ${formData.currentLocation}</p>
                <p style="margin: 8px 0;"><strong>Target Start Date:</strong> ${formData.targetStartDate}</p>
                <p style="margin: 8px 0;"><strong>Salary Range:</strong> ${formData.salaryRange || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Competing Offers:</strong> ${formData.competingOffers || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Visa Status:</strong> ${formData.visaStatus || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Housing Budget:</strong> ${formData.housingBudget || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Family Size:</strong> ${formData.familySize || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Preferred Areas:</strong> ${formData.preferredAreas?.join(', ') || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>School Requirements:</strong> ${formData.schoolRequirement || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Pet Relocation:</strong> ${formData.petRelocation || 'None'}</p>
                <p style="margin: 8px 0;"><strong>Special Requirements:</strong> ${formData.specialRequirements || 'None'}</p>
              </div>
            `}
            
            <div style="background-color: #F9FAFB; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 8px 0;"><strong>Referral Source:</strong> ${formData.referralSource || 'Not specified'}</p>
              <p style="margin: 8px 0;"><strong>IP Address:</strong> ${submissionData.ip_address}</p>
              <p style="margin: 8px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            </div>
            
            <p style="margin-top: 20px;">
              <a href="mailto:${formData.contactEmail}?subject=Your%20${isCompany ? 'Relocation%20Velocity%20Assessment' : 'AI%20Talent%20Relocation%20Assessment'}%20-%20${referenceNumber}" 
                 style="display: inline-block; background-color: #C9A24A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
                Reply to ${formData.contactName}
              </a>
            </p>
          </div>
        `
      })
    } catch (notificationError) {
      console.error('Failed to send admin notification:', notificationError)
      // Don't throw - this is not critical
    }

    console.log('New AI talent assessment saved:', savedSubmission.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Assessment submitted successfully',
      data: {
        referenceNumber,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        responseTime: '2 hours'
      }
    })

  } catch (error) {
    console.error('AI talent assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit assessment' }, 
      { status: 500 }
    )
  }
}