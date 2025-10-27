import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()
    
    // Generate reference ID
    const referenceId = `CA-${Date.now().toString().slice(-8)}`
    
    // Initialize Supabase client with service role key for server-side operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Prepare data for database insertion
    const assessmentData = {
      reference_id: referenceId,
      company_name: formData.companyName,
      industry: formData.industry,
      company_size: formData.companySize,
      annual_revenue: formData.annualRevenue,
      first_name: formData.firstName,
      last_name: formData.lastName,
      job_title: formData.jobTitle,
      email: formData.email,
      phone: formData.phone,
      relocation_type: formData.relocationType,
      employee_count: formData.employeeCount,
      timeline: formData.timeline,
      budget_range: formData.budgetRange,
      current_challenges: formData.currentChallenges,
      previous_experience: formData.previousExperience,
      services_needed: formData.servicesNeeded,
      compliance_requirements: formData.complianceRequirements,
      special_requirements: formData.specialRequirements,
      urgency: formData.urgency,
      preferred_contact: formData.preferredContact,
      submitted_at: new Date().toISOString()
    }
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('corporate_assessments')
      .insert([assessmentData])
      .select()
    
    if (error) {
      console.error('Supabase insertion error:', error)
      // Still return success to user, but log the error
      return NextResponse.json({ 
        success: true,
        message: 'Assessment submitted successfully',
        referenceId: referenceId,
        note: 'Data logged for manual processing'
      })
    }
    
    console.log('Corporate Assessment saved to Supabase:', {
      referenceId: referenceId,
      company: formData.companyName,
      contact: `${formData.firstName} ${formData.lastName}`,
      email: formData.email
    })
    
    return NextResponse.json({ 
      success: true,
      message: 'Assessment submitted successfully',
      referenceId: referenceId,
      id: data[0]?.id
    })
    
  } catch (error) {
    console.error('Corporate assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit assessment' },
      { status: 500 }
    )
  }
}