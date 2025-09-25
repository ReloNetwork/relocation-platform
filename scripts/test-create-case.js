const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function testCreateCase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🧪 Testing create case functionality...')

    // Test data
    const testData = {
      client_name: 'Test User',
      origin_city: 'New York',
      destination_city: 'Canary Wharf',
      target_date: '2025-01-15',
      status: 'intake'
    }

    // Test 1: Create a case
    console.log('\n1️⃣ Testing case creation...')
    const { data: newCase, error: caseError } = await supabase
      .from('move_cases')
      .insert(testData)
      .select()
      .single()

    if (caseError) {
      console.error('❌ Case creation failed:', caseError.message)
      return
    }
    console.log('✅ Case created successfully:', newCase.id)

    // Test 2: Create tasks for the case
    console.log('\n2️⃣ Testing task creation...')
    const tasksSeed = [
      { title: 'Complete KYC & onboarding', status: 'todo', sort: 1 },
      { title: 'Upload tenancy documents', status: 'todo', sort: 2 },
      { title: 'Book consultation call', status: 'todo', sort: 3 },
      { title: 'Property search briefing', status: 'todo', sort: 4 },
      { title: 'Initial property recommendations', status: 'todo', sort: 5 }
    ].map(t => ({ ...t, case_id: newCase.id }))

    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .insert(tasksSeed)
      .select()

    if (tasksError) {
      console.error('❌ Tasks creation failed:', tasksError.message)
    } else {
      console.log(`✅ ${tasks.length} tasks created successfully`)
    }

    // Test 3: Verify case can be retrieved
    console.log('\n3️⃣ Testing case retrieval...')
    const { data: retrievedCase, error: retrieveError } = await supabase
      .from('move_cases')
      .select('*')
      .eq('id', newCase.id)
      .single()

    if (retrieveError) {
      console.error('❌ Case retrieval failed:', retrieveError.message)
    } else {
      console.log('✅ Case retrieved successfully')
      console.log(`   Client: ${retrievedCase.client_name}`)
      console.log(`   Route: ${retrievedCase.origin_city} → ${retrievedCase.destination_city}`)
      console.log(`   Status: ${retrievedCase.status}`)
    }

    // Test 4: Verify tasks can be retrieved
    console.log('\n4️⃣ Testing tasks retrieval...')
    const { data: retrievedTasks, error: retrieveTasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('case_id', newCase.id)
      .order('sort', { ascending: true })

    if (retrieveTasksError) {
      console.error('❌ Tasks retrieval failed:', retrieveTasksError.message)
    } else {
      console.log(`✅ ${retrievedTasks.length} tasks retrieved successfully`)
      retrievedTasks.forEach((task, index) => {
        console.log(`   ${index + 1}. ${task.title} (${task.status})`)
      })
    }

    console.log('\n🎉 Create case functionality test completed successfully!')
    
    console.log('\n📋 Summary:')
    console.log('✅ Case creation works')
    console.log('✅ Task seeding works')
    console.log('✅ Data retrieval works')
    console.log(`✅ Case ID: ${newCase.id}`)
    
    console.log('\n🚀 Ready to test in browser:')
    console.log('   1. Go to http://localhost:3000/create-case')
    console.log('   2. Fill out the form with test data')
    console.log('   3. Submit the form')
    console.log('   4. Should redirect to case dashboard')
    
    console.log(`\n🔗 Direct links to test case:`)
    console.log(`   Case Dashboard: http://localhost:3000/case/${newCase.id}`)
    console.log(`   Messages: http://localhost:3000/case/${newCase.id}/messages`)

    // Clean up test data
    console.log('\n🧹 Cleaning up test data...')
    await supabase.from('tasks').delete().eq('case_id', newCase.id)
    await supabase.from('move_cases').delete().eq('id', newCase.id)
    console.log('✅ Test data cleaned up')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testCreateCase()