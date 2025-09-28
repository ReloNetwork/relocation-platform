import { NextRequest, NextResponse } from 'next/server'
import { createServiceSupabase } from '../../../../lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  try {
    const supabase = createServiceSupabase()
    const caseId = params.caseId

    // Get case details
    const { data: caseData, error } = await supabase
      .from('move_cases')
      .select('*')
      .eq('id', caseId)
      .single()

    if (error || !caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ case: caseData })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}