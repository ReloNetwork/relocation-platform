const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function debugCaseQuery() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  const caseId = '27271609-413d-4dbe-b732-71d0c79aaa6d'

  try {
    console.log('🔍 Debugging case query for ID:', caseId)

    // Test 1: Check if case exists at all
    console.log('\n1️⃣ Testing basic case lookup...')
    const { data: basicCase, error: basicError } = await supabase
      .from('move_cases')
      .select('*')
      .eq('id', caseId)
      .single()

    if (basicError) {
      console.error('❌ Basic case lookup failed:', basicError.message)
      return
    }
    console.log('✅ Basic case found:', {
      id: basicCase.id,
      client_name: basicCase.client_name,
      status: basicCase.status,
      client_user_id: basicCase.client_user_id
    })

    // Test 2: Check if clients table exists and has data
    console.log('\n2️⃣ Testing clients table...')
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .limit(1)

    if (clientsError) {
      console.error('❌ Clients table error:', clientsError.message)
      console.log('   This explains why the join is failing!')
    } else {
      console.log('✅ Clients table exists with', clients.length, 'records')
    }

    // Test 3: Try the exact query from getCaseData
    console.log('\n3️⃣ Testing exact getCaseData query...')
    const { data: caseData, error: caseError } = await supabase
      .from('move_cases')
      .select(`
        *,
        clients!client_user_id(
          id,
          email,
          full_name,
          phone
        )
      `)
      .eq('id', caseId)
      .single()

    if (caseError) {
      console.error('❌ Full case query failed:', caseError.message)
      console.log('   Error details:', caseError)
    } else {
      console.log('✅ Full case query succeeded:', caseData)
    }

    // Test 4: Try query without the clients join
    console.log('\n4️⃣ Testing query without clients join...')
    const { data: caseOnly, error: caseOnlyError } = await supabase
      .from('move_cases')
      .select('*')
      .eq('id', caseId)
      .single()

    if (caseOnlyError) {
      console.error('❌ Case-only query failed:', caseOnlyError.message)
    } else {
      console.log('✅ Case-only query succeeded')
      
      // Check for tasks
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('case_id', caseId)
        .order('sort', { ascending: true })

      console.log(`✅ Found ${tasks?.length || 0} tasks for this case`)

      // Check for messages
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('case_id', caseId)
        .order('created_at', { ascending: true })

      console.log(`✅ Found ${messages?.length || 0} messages for this case`)
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message)
  }
}

debugCaseQuery()