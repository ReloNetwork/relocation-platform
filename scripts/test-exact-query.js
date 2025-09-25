const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function testExactQuery() {
  // Use the same approach as the page
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  const caseId = '27271609-413d-4dbe-b732-71d0c79aaa6d'

  try {
    console.log('🔍 Testing exact query from page component...')
    console.log('Using ANON key (like the page):', supabaseKey ? `${supabaseKey.substring(0, 10)}...` : 'undefined')

    // Exact same query as getCaseData
    const { data: caseData, error: caseError } = await supabase
      .from('move_cases')
      .select('*')
      .eq('id', caseId)
      .single()

    console.log('Case Error:', caseError)
    console.log('Case Data:', caseData)

    if (caseError || !caseData) {
      console.log('❌ getCaseData would return null here')
      console.log('   This explains the redirect to /onboarding')
    } else {
      console.log('✅ getCaseData would return valid data')
    }

    // Also test tasks and messages
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('case_id', caseId)
      .order('sort', { ascending: true })

    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true })

    console.log(`Tasks: ${tasks?.length || 0}`)
    console.log(`Messages: ${messages?.length || 0}`)

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testExactQuery()