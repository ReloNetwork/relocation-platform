import { NextRequest, NextResponse } from 'next/server'
import { formatCallSummaryForUI } from '@/lib/lindy'

// In-memory storage for demo (use database in production)
const callSummaries = new Map()

export async function GET(
  request: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const { callId } = params
    
    // Get call summary from storage
    const callSummary = callSummaries.get(callId)
    
    if (!callSummary) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      )
    }
    
    // Format for UI
    const formattedCall = formatCallSummaryForUI(callSummary)
    
    return NextResponse.json({
      call: formattedCall,
      fullTranscript: callSummary.transcript,
      extractedInfo: callSummary.extractedInfo,
      tasksGenerated: callSummary.tasksGenerated,
      recommendedPartners: callSummary.recommendedPartners
    })

  } catch (error) {
    console.error('Error fetching call details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call details' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const { callId } = params
    const updates = await request.json()
    
    // Get existing call summary
    const existingCall = callSummaries.get(callId)
    
    if (!existingCall) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      )
    }
    
    // Update call summary
    const updatedCall = {
      ...existingCall,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    callSummaries.set(callId, updatedCall)
    
    return NextResponse.json({
      success: true,
      message: 'Call updated successfully',
      call: formatCallSummaryForUI(updatedCall)
    })

  } catch (error) {
    console.error('Error updating call:', error)
    return NextResponse.json(
      { error: 'Failed to update call' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const { callId } = params
    
    // Check if call exists
    if (!callSummaries.has(callId)) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      )
    }
    
    // Delete call summary
    callSummaries.delete(callId)
    
    return NextResponse.json({
      success: true,
      message: 'Call deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting call:', error)
    return NextResponse.json(
      { error: 'Failed to delete call' },
      { status: 500 }
    )
  }
}