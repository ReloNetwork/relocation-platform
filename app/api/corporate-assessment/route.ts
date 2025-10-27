import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()
    
    // Log the submission for now (in production, this would go to a database/CRM)
    console.log('Corporate Assessment Submission:', {
      timestamp: new Date().toISOString(),
      company: formData.companyName,
      contact: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      employees: formData.employeeCount,
      timeline: formData.timeline,
      urgency: formData.urgency
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Send to CRM (HubSpot, Salesforce, etc.)
    // 3. Send notification emails to sales team
    // 4. Send confirmation email to prospect
    
    // For now, just return success
    return NextResponse.json({ 
      success: true,
      message: 'Assessment submitted successfully',
      referenceId: `CA-${Date.now().toString().slice(-8)}`
    })
    
  } catch (error) {
    console.error('Corporate assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit assessment' },
      { status: 500 }
    )
  }
}