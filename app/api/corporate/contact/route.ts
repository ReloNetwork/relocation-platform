import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    const {
      companyName,
      contactName,
      email,
      phone,
      employeeCount,
      timeframe,
      budget,
      services
    } = formData

    if (!companyName || !contactName || !email || !employeeCount || !timeframe) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    // TODO: Store in database or send to CRM
    console.log('Corporate contact form submission:', formData)

    // For now, just return success
    // In production, you would:
    // 1. Save to database
    // 2. Send notification email to sales team
    // 3. Create lead in CRM
    // 4. Send confirmation email to customer

    return NextResponse.json({ 
      success: true,
      message: 'Thank you! Our team will contact you within 24 hours.',
      data: {
        companyName,
        contactName,
        email
      }
    })
  } catch (error) {
    console.error('Corporate contact error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}