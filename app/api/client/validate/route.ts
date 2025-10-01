import { NextRequest, NextResponse } from 'next/server'

// Temporary token storage (in production, use database)
const validTokens = new Map([
  ['demo-client-123', {
    id: 'demo-client-123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    relocationType: 'Corporate Transfer',
    destination: 'London, UK',
    moveDate: '2024-01-15',
    packageType: 'Premium Relocation Package',
    createdAt: '2024-01-01T10:00:00Z',
    expiresAt: '2024-12-31T23:59:59Z'
  }],
  ['vip-client-456', {
    id: 'vip-client-456', 
    name: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    relocationType: 'Executive Transfer',
    destination: 'Singapore',
    moveDate: '2024-02-01',
    packageType: 'VIP Executive Package',
    createdAt: '2024-01-01T10:00:00Z',
    expiresAt: '2024-12-31T23:59:59Z'
  }],
  ['family-client-789', {
    id: 'family-client-789',
    name: 'Emma Thompson',
    email: 'emma.thompson@gmail.com', 
    relocationType: 'Family Relocation',
    destination: 'Toronto, Canada',
    moveDate: '2024-03-15',
    packageType: 'Family Complete Package',
    createdAt: '2024-01-01T10:00:00Z',
    expiresAt: '2024-12-31T23:59:59Z'
  }]
])

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Validate token
    const clientData = validTokens.get(token)
    
    if (!clientData) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if token has expired
    const now = new Date()
    const expiresAt = new Date(clientData.expiresAt)
    
    if (now > expiresAt) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }

    // Return client data (excluding sensitive info)
    return NextResponse.json({
      valid: true,
      client: {
        id: clientData.id,
        name: clientData.name,
        relocationType: clientData.relocationType,
        destination: clientData.destination,
        moveDate: clientData.moveDate,
        packageType: clientData.packageType
      }
    })

  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 })
  }
}

// POST endpoint to create new client tokens (called after payment)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientData, packageType } = body

    // Validate required fields
    if (!clientData?.email || !packageType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Generate unique token
    const token = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Set expiration (1 year from now)
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    // Store client data with token
    const clientRecord = {
      id: token,
      name: clientData.name || 'Client',
      email: clientData.email,
      relocationType: clientData.relocationType || 'Relocation',
      destination: clientData.destination || 'TBD',
      moveDate: clientData.moveDate || 'TBD',
      packageType: packageType,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString()
    }

    validTokens.set(token, clientRecord)

    // Return dashboard access URL
    const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/client/${token}`

    return NextResponse.json({
      success: true,
      token,
      dashboardUrl,
      client: {
        id: clientRecord.id,
        name: clientRecord.name,
        packageType: clientRecord.packageType
      }
    })

  } catch (error) {
    console.error('Token creation error:', error)
    return NextResponse.json({ error: 'Token creation failed' }, { status: 500 })
  }
}