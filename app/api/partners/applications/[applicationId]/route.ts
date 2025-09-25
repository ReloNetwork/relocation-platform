import { NextResponse } from 'next/server'

// This would connect to your actual database in production
// For demo purposes, we'll use the same mock data structure

export async function GET(req: Request, { params }: { params: { applicationId: string } }) {
  try {
    // In production, fetch from database
    // For demo, return mock data
    const mockApplication = {
      id: params.applicationId,
      companyName: "Example Tax Services Ltd",
      contactPerson: "John Smith",
      email: "john@exampletax.co.uk",
      phone: "+44 20 1234 5678",
      website: "https://exampletax.co.uk",
      category: "tax",
      services: ["personal tax returns", "corporate tax planning", "VAT registration"],
      description: "Expert tax advisory services for UK residents and businesses",
      businessRegistration: "Company House: 12345678",
      insurance: "Professional Indemnity: £2M",
      certifications: ["ACCA", "CIOT", "ATT"],
      references: [
        {
          name: "Jane Doe",
          company: "ABC Corporation",
          email: "jane@abc.com",
          phone: "+44 20 9876 5432"
        }
      ],
      membershipTier: "gold" as const,
      paymentStatus: "pending" as const,
      applicationStatus: "under_review" as const,
      submittedAt: "2024-01-15T10:30:00Z"
    }

    return NextResponse.json({
      ok: true,
      application: mockApplication
    })

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { applicationId: string } }) {
  try {
    const updates = await req.json()
    const { applicationId } = params

    // In production, update the database record
    // For demo, simulate the update

    if (updates.applicationStatus === 'approved') {
      // When approved, add to partners directory
      // This would typically involve moving data to the main partners table
      console.log(`Partner application ${applicationId} approved and added to directory`)
    }

    return NextResponse.json({
      ok: true,
      message: `Application ${applicationId} updated successfully`,
      updates
    })

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { applicationId: string } }) {
  try {
    const { applicationId } = params

    // In production, delete from database
    console.log(`Application ${applicationId} deleted`)

    return NextResponse.json({
      ok: true,
      message: 'Application deleted successfully'
    })

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}