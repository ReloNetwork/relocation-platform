import { NextResponse } from 'next/server'

// Mock database for partner feedback
let partnerFeedback: Array<{
  id: string
  partnerId: string
  clientId: string
  clientName: string
  rating: number
  review: string
  serviceCategory: string
  recommendToOthers: boolean
  responseTime: number // in hours
  professionalismRating: number
  valueForMoneyRating: number
  submittedAt: string
  isVerified: boolean
  helpfulVotes: number
}> = []

export async function POST(req: Request) {
  try {
    const feedbackData = await req.json()

    // Validate required fields
    const requiredFields = ['partnerId', 'clientName', 'rating', 'review', 'serviceCategory']

    for (const field of requiredFields) {
      if (!feedbackData[field]) {
        return NextResponse.json({
          ok: false,
          error: `Missing required field: ${field}`
        }, { status: 400 })
      }
    }

    // Validate rating ranges
    if (feedbackData.rating < 1 || feedbackData.rating > 5) {
      return NextResponse.json({
        ok: false,
        error: 'Rating must be between 1 and 5'
      }, { status: 400 })
    }

    // Create new feedback entry
    const newFeedback = {
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId: feedbackData.clientId || `client_${Date.now()}`,
      ...feedbackData,
      submittedAt: new Date().toISOString(),
      isVerified: false, // Would be verified through email or case reference
      helpfulVotes: 0
    }

    partnerFeedback.push(newFeedback)

    // Update partner's overall rating (this would be done in database)
    updatePartnerRating(feedbackData.partnerId)

    return NextResponse.json({
      ok: true,
      feedback: newFeedback,
      message: 'Feedback submitted successfully'
    })

  } catch (error: any) {
    console.error('Feedback submission error:', error)
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const partnerId = searchParams.get('partnerId')
    const verified = searchParams.get('verified')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredFeedback = partnerFeedback

    if (partnerId) {
      filteredFeedback = filteredFeedback.filter(feedback => feedback.partnerId === partnerId)
    }

    if (verified === 'true') {
      filteredFeedback = filteredFeedback.filter(feedback => feedback.isVerified)
    }

    // Sort by submission date (newest first)
    filteredFeedback.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    // Apply limit
    const limitedFeedback = filteredFeedback.slice(0, limit)

    // Calculate aggregate ratings
    const aggregateData = partnerId ? calculateAggregateRatings(partnerId) : null

    return NextResponse.json({
      ok: true,
      feedback: limitedFeedback,
      total: filteredFeedback.length,
      aggregateRatings: aggregateData
    })

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

function updatePartnerRating(partnerId: string) {
  // In production, this would update the partner's rating in the database
  const partnerFeedbacks = partnerFeedback.filter(f => f.partnerId === partnerId)
  const avgRating = partnerFeedbacks.reduce((sum, f) => sum + f.rating, 0) / partnerFeedbacks.length
  console.log(`Updated partner ${partnerId} rating to ${avgRating.toFixed(1)}`)
}

function calculateAggregateRatings(partnerId: string) {
  const partnerFeedbacks = partnerFeedback.filter(f => f.partnerId === partnerId && f.isVerified)
  
  if (partnerFeedbacks.length === 0) {
    return {
      overallRating: 0,
      totalReviews: 0,
      professionalismAvg: 0,
      valueForMoneyAvg: 0,
      recommendationRate: 0,
      avgResponseTime: 0
    }
  }

  return {
    overallRating: partnerFeedbacks.reduce((sum, f) => sum + f.rating, 0) / partnerFeedbacks.length,
    totalReviews: partnerFeedbacks.length,
    professionalismAvg: partnerFeedbacks.reduce((sum, f) => sum + (f.professionalismRating || f.rating), 0) / partnerFeedbacks.length,
    valueForMoneyAvg: partnerFeedbacks.reduce((sum, f) => sum + (f.valueForMoneyRating || f.rating), 0) / partnerFeedbacks.length,
    recommendationRate: (partnerFeedbacks.filter(f => f.recommendToOthers).length / partnerFeedbacks.length) * 100,
    avgResponseTime: partnerFeedbacks.reduce((sum, f) => sum + (f.responseTime || 24), 0) / partnerFeedbacks.length
  }
}