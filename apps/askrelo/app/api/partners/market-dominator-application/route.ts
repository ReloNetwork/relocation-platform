import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    const required = ['name', 'email', 'phone', 'company', 'service', 'revenue', 'experience']
    const missing = required.filter(field => !formData[field])
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // Enhanced validation for Market Dominator tier
    const revenueRequirement = ['500k-1m', '1m-5m', '5m+']
    if (!revenueRequirement.includes(formData.revenue)) {
      return NextResponse.json(
        { error: 'Market Dominator tier requires minimum £500k annual revenue' },
        { status: 400 }
      )
    }

    const experienceNum = parseInt(formData.experience)
    if (isNaN(experienceNum) || experienceNum < 5) {
      return NextResponse.json(
        { error: 'Market Dominator tier requires minimum 5 years experience' },
        { status: 400 }
      )
    }

    // Log application for processing (in production, save to database)
    console.log('Market Dominator Application:', {
      timestamp: new Date().toISOString(),
      type: 'market_dominator_application',
      tier: 'premium',
      ...formData
    })

    // In a real app, you would:
    // 1. Save to database with premium tier flag
    // 2. Send notification to senior team
    // 3. Trigger enhanced approval workflow
    // 4. Check category availability
    // 5. Update exclusive spot count

    // For now, simulate instant approval for qualified applicants
    return NextResponse.json({ 
      success: true, 
      message: 'Premium application approved - redirecting to checkout',
      applicationId: `MD-${Date.now()}`,
      tier: 'market_dominator',
      exclusivity: 'category_ownership'
    })
    
  } catch (error) {
    console.error('Market Dominator application error:', error)
    return NextResponse.json(
      { error: 'Failed to process premium application' },
      { status: 500 }
    )
  }
}