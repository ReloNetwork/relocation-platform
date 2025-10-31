import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface AIDemoFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  industry: string
  businessType: string
  currentChallenges: string
  monthlyRevenue: string
  timeframe: string
  hearAboutUs: string
  source: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  // Initialize Supabase only when needed
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Return mock response for build/development
    const demoId = `DEMO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    return NextResponse.json({
      success: true,
      data: { demo_id: demoId },
      message: 'Mock AI demo request submitted successfully'
    })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const formData: AIDemoFormData = await request.json()
    
    // Generate unique demo ID
    const demoId = `DEMO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    // For now, just return success to test the flow
    // In production, you would save to database here
    console.log('AI Demo request received:', {
      demoId,
      company: formData.company,
      businessType: formData.businessType,
      monthlyRevenue: formData.monthlyRevenue,
      timeframe: formData.timeframe
    })

    return NextResponse.json({
      success: true,
      demoId: demoId,
      message: 'AI demo request submitted successfully'
    })

    /* Future database integration:
    const { data, error } = await supabase
      .from('ai_demo_requests')
      .insert([{
        demo_id: demoId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        business_type: formData.businessType,
        current_challenges: formData.currentChallenges,
        monthly_revenue: formData.monthlyRevenue,
        timeframe: formData.timeframe,
        hear_about_us: formData.hearAboutUs,
        source: formData.source,
        created_at: formData.timestamp,
        status: 'pending'
      }])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save demo request' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: 'AI demo request submitted successfully'
    })
    */

  } catch (error) {
    console.error('AI Demo submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'AI Demo API endpoint is working' },
    { status: 200 }
  )
}