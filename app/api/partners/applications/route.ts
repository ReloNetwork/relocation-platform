import { NextResponse } from 'next/server'

// Mock database for partner applications
let partnerApplications: Array<{
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  website: string
  category: string
  services: string[]
  description: string
  businessRegistration: string
  insurance: string
  certifications: string[]
  references: Array<{
    name: string
    company: string
    email: string
    phone: string
  }>
  membershipTier: 'bronze' | 'silver' | 'gold'
  paymentStatus: 'pending' | 'paid' | 'failed'
  applicationStatus: 'pending' | 'under_review' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}> = []

export async function POST(req: Request) {
  try {
    const applicationData = await req.json()

    // Validate required fields
    const requiredFields = [
      'companyName', 'contactPerson', 'email', 'phone', 
      'category', 'services', 'description', 'membershipTier'
    ]

    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return NextResponse.json({
          ok: false,
          error: `Missing required field: ${field}`
        }, { status: 400 })
      }
    }

    // Create new application
    const newApplication = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...applicationData,
      paymentStatus: 'pending' as const,
      applicationStatus: 'pending' as const,
      submittedAt: new Date().toISOString()
    }

    partnerApplications.push(newApplication)

    return NextResponse.json({
      ok: true,
      application: newApplication,
      message: 'Partner application submitted successfully'
    })

  } catch (error: any) {
    console.error('Partner application error:', error)
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url || "", "http://localhost:3000")
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    let filteredApplications = partnerApplications

    if (status) {
      filteredApplications = filteredApplications.filter(app => app.applicationStatus === status)
    }

    if (category) {
      filteredApplications = filteredApplications.filter(app => app.category === category)
    }

    // Sort by submission date (newest first)
    filteredApplications.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    return NextResponse.json({
      ok: true,
      applications: filteredApplications,
      total: filteredApplications.length
    })

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}