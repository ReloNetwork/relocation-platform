import { NextRequest, NextResponse } from 'next/server'
import { formatCallSummaryForUI } from '@/lib/lindy'

// In a real implementation, you'd store call summaries in a database
// For now, we'll use an in-memory store for demo purposes
const callSummaries = new Map()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status') // 'completed', 'missed', 'failed'
    
    // Get all call summaries (in production, this would be a database query)
    let calls = Array.from(callSummaries.values())
    
    // Filter by status if provided
    if (status) {
      calls = calls.filter(call => call.outcome === status)
    }
    
    // Sort by timestamp (newest first)
    calls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    // Apply pagination
    const paginatedCalls = calls.slice(offset, offset + limit)
    
    // Format for UI
    const formattedCalls = paginatedCalls.map(formatCallSummaryForUI)
    
    return NextResponse.json({
      calls: formattedCalls,
      pagination: {
        total: calls.length,
        limit,
        offset,
        hasMore: offset + limit < calls.length
      },
      filters: {
        status: status || 'all'
      }
    })

  } catch (error) {
    console.error('Error fetching Lindy calls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call history' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const callData = await request.json()
    
    // Store call summary (in production, save to database)
    const callId = callData.callId || `lindy_call_${Date.now()}`
    const callSummary = {
      ...callData,
      callId,
      timestamp: new Date().toISOString(),
      source: 'lindy_ai'
    }
    
    callSummaries.set(callId, callSummary)
    
    console.log('Stored Lindy call summary:', callId)
    
    return NextResponse.json({
      success: true,
      callId,
      message: 'Call summary stored successfully'
    })

  } catch (error) {
    console.error('Error storing call summary:', error)
    return NextResponse.json(
      { error: 'Failed to store call summary' },
      { status: 500 }
    )
  }
}