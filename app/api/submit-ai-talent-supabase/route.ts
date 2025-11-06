import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Initialize Supabase client with service role key (for server-side operations)
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('ai_talent_submissions')
      .insert([{
        // User Type
        user_type: formData.userType || 'company',
        
        // Company Information
        company_name: formData.companyName,
        company_website: formData.companyWebsite,
        industry: formData.industry || 'AI/Machine Learning',
        office_location: formData.officeLocation,
        
        // Contact Information
        contact_name: formData.contactName,
        contact_role: formData.contactRole,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        
        // AI Talent Requirements
        talent_role: formData.talentRole,
        seniority_level: formData.seniorityLevel,
        current_location: formData.currentLocation,
        target_start_date: formData.targetStartDate,
        salary_range: formData.salaryRange,
        
        // Relocation Needs
        employee_count: formData.employeeCount || '1',
        family_size: formData.familySize,
        children_ages: formData.childrenAges,
        spouse_employment: formData.spouseEmployment,
        
        // 72-Hour Priorities
        housing_budget: formData.housingBudget,
        preferred_areas: formData.preferredAreas || [],
        school_requirement: formData.schoolRequirement,
        
        // Timeline
        urgency_level: formData.urgencyLevel || 'urgent',
        competing_offers: formData.competingOffers,
        
        // Additional Requirements
        visa_status: formData.visaStatus,
        pet_relocation: formData.petRelocation,
        special_requirements: formData.specialRequirements,
        
        // Meta
        referral_source: formData.referralSource,
        submission_status: 'new'
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    console.log('AI Talent submission saved to Supabase:', data.reference_number)
    
    // Send notification emails
    try {
      // Send email to Relo Network team
      const teamEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'hello@therelonetwork.com',
          subject: `New AI Talent Assessment - ${data.user_type === 'individual' ? 'Individual AI Professional' : data.company_name} - 2 Hour Response Required`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0B1220;">New AI Talent Relocation Assessment</h2>
              <div style="background: #ff4444; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>2-HOUR RESPONSE REQUIRED</strong>
              </div>
              
              <h3>${data.user_type === 'individual' ? 'Individual Details:' : 'Company Details:'}</h3>
              <ul>
                <li><strong>${data.user_type === 'individual' ? 'Name' : 'Company'}:</strong> ${data.user_type === 'individual' ? data.contact_name : data.company_name}</li>
                <li><strong>${data.user_type === 'individual' ? 'Current/New Employer' : 'Contact'}:</strong> ${data.user_type === 'individual' ? data.company_name : `${data.contact_name} (${data.contact_role})`}</li>
                <li><strong>Email:</strong> ${data.contact_email}</li>
                <li><strong>Phone:</strong> ${data.contact_phone}</li>
                <li><strong>Office Location:</strong> ${data.office_location || 'Not specified'}</li>
              </ul>
              
              <h3>AI Talent Requirements:</h3>
              <ul>
                <li><strong>Role:</strong> ${data.talent_role}</li>
                <li><strong>Seniority:</strong> ${data.seniority_level}</li>
                <li><strong>Current Location:</strong> ${data.current_location}</li>
                <li><strong>Target Start Date:</strong> ${data.target_start_date}</li>
                <li><strong>Salary Range:</strong> ${data.salary_range}</li>
                <li><strong>Employee Count:</strong> ${data.employee_count || '1'}</li>
              </ul>
              
              <h3>Relocation Priorities:</h3>
              <ul>
                <li><strong>Housing Budget:</strong> ${data.housing_budget}</li>
                <li><strong>Preferred Areas:</strong> ${data.preferred_areas?.join(', ') || 'Not specified'}</li>
                <li><strong>Family Size:</strong> ${data.family_size}</li>
                <li><strong>School Requirement:</strong> ${data.school_requirement || 'Not specified'}</li>
                <li><strong>Competing Offers:</strong> ${data.competing_offers || 'Not specified'}</li>
              </ul>
              
              <p style="margin-top: 30px;">
                <strong>Reference Number:</strong> ${data.reference_number}<br>
                <strong>Response Deadline:</strong> ${new Date(data.response_deadline).toLocaleString()}
              </p>
              
              <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/submissions" 
                   style="background: #C9A24A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                   View All Submissions
                </a>
              </div>
            </div>
          `
        })
      })
      console.log('Team notification email sent')
      
      // Send confirmation email to client
      const clientEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: data.contact_email,
          subject: `Your AI Talent Relocation Assessment - The Relo Network`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0B1220;">Assessment Received - 2 Hour Response Guaranteed</h2>
              
              <p>Dear ${data.contact_name},</p>
              
              <p>Thank you for submitting your AI talent relocation assessment. ${data.user_type === 'individual' ? 'Our specialist team is now preparing your personal relocation plan.' : 'Our specialist team is now reviewing your talent relocation requirements.'}</p>
              
              <div style="background: #0B1220; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #C9A24A; margin-top: 0;">What Happens Next?</h3>
                <p>• Your dedicated AI relocation specialist will contact you within 2 hours</p>
                <p>• Property shortlist being prepared based on your £${data.housing_budget} budget</p>
                <p>• School availability being confirmed for ${data.target_start_date}</p>
                <p>• Complete 7-day relocation plan being customised</p>
              </div>
              
              <h3>Your Submission Details:</h3>
              <ul>
                <li><strong>Reference Number:</strong> ${data.reference_number}</li>
                <li><strong>AI Talent Role:</strong> ${data.talent_role}</li>
                <li><strong>Relocating From:</strong> ${data.current_location}</li>
                <li><strong>Target Start Date:</strong> ${data.target_start_date}</li>
              </ul>
              
              <p style="margin-top: 30px;">
                <strong>We will contact you by: ${new Date(data.response_deadline).toLocaleTimeString()}</strong>
              </p>
              
              <p>If you have any urgent questions, please call us on +44 20 3105 9566.</p>
              
              <p>Best regards,<br>
              The Relo Network Team<br>
              AI Talent Relocation Specialists</p>
            </div>
          `
        })
      })
      console.log('Client confirmation email sent')
    } catch (emailError) {
      console.error('Email sending error (non-blocking):', emailError)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        referenceNumber: data.reference_number,
        responseTime: '2 hours',
        contactName: data.contact_name,
        contactEmail: data.contact_email,
        id: data.id
      }
    })
    
  } catch (error) {
    console.error('Error processing AI talent assessment:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'There was an error submitting your assessment. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'all'
    const limit = parseInt(searchParams.get('limit') || '50')
    
    let query = supabase
      .from('ai_talent_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (status !== 'all') {
      query = query.eq('submission_status', status)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    return NextResponse.json({
      success: true,
      submissions: data || [],
      count: data?.length || 0
    })
    
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch submissions',
        submissions: [] 
      },
      { status: 500 }
    )
  }
}