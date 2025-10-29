import { NextRequest, NextResponse } from 'next/server'
import { calculateCorporatePricing, generateCorporateProposal, CorporateRequirements } from '../../../../lib/pricing/corporate-calculator'

export async function POST(req: NextRequest) {
  try {
    const requirements: CorporateRequirements = await req.json()
    
    // Validate required fields
    if (!requirements.annualRelocations || !requirements.slaLevel) {
      return NextResponse.json(
        { error: 'Missing required fields: annualRelocations, slaLevel' },
        { status: 400 }
      )
    }
    
    // Calculate pricing
    const pricing = calculateCorporatePricing(requirements)
    
    // Generate proposal text
    const proposal = generateCorporateProposal(
      requirements,
      'Corporate Contact', // This would come from the request
      requirements.companySize || 'Company'
    )
    
    return NextResponse.json({
      success: true,
      pricing,
      proposal,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    })
    
  } catch (error) {
    console.error('Corporate pricing calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate pricing' },
      { status: 500 }
    )
  }
}