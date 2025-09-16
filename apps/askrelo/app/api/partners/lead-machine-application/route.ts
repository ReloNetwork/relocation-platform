import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    const required = ['name', 'email', 'phone', 'company', 'service']
    const missing = required.filter(field => !formData[field])
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // Log application for processing (in production, save to database)
    console.log('Lead Machine Application:', {
      timestamp: new Date().toISOString(),
      type: 'lead_machine_application',
      ...formData
    })

    // In a real app, you would:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Trigger approval workflow
    // 4. Update partner count/availability

    // For now, simulate instant approval
    return NextResponse.json({ 
      success: true, 
      message: 'Application approved - redirecting to checkout',
      applicationId: `LM-${Date.now()}`
    })
    
  } catch (error) {
    console.error('Lead Machine application error:', error)
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    )
  }
}