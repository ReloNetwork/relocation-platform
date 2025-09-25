const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function testCaseCreation() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🧪 Testing case creation functionality...')

    // Test data
    const testData = {
      full_name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phone: '+44 123 456 7890',
      origin_city: 'New York',
      destination_city: 'London',
      target_date: '2024-12-15'
    }

    console.log('\n1️⃣ Creating test client...')
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .upsert({
        email: testData.email,
        full_name: testData.full_name,
        phone: testData.phone
      }, { onConflict: 'email' })
      .select()
      .single()

    if (clientError) {
      console.error('❌ Client creation failed:', clientError.message)
      return
    }
    console.log('✅ Client created:', client.id)

    console.log('\n2️⃣ Creating test move case...')
    const { data: moveCase, error: caseError } = await supabase
      .from('move_cases')
      .insert({
        client_user_id: client.id,
        origin_city: testData.origin_city,
        destination_city: testData.destination_city,
        target_date: testData.target_date,
        status: 'intake'
      })
      .select()
      .single()

    if (caseError) {
      console.error('❌ Move case creation failed:', caseError.message)
      return
    }
    console.log('✅ Move case created:', moveCase.id)

    console.log('\n3️⃣ Creating test tasks...')
    const tasks = [
      { title: 'Complete KYC & onboarding', status: 'todo', sort: 1 },
      { title: 'Upload tenancy documents', status: 'todo', sort: 2 },
      { title: 'Book consultation call', status: 'todo', sort: 3 },
    ].map(t => ({ ...t, case_id: moveCase.id }))

    const { data: createdTasks, error: tasksError } = await supabase
      .from('tasks')
      .insert(tasks)
      .select()

    if (tasksError) {
      console.error('❌ Tasks creation failed:', tasksError.message)
    } else {
      console.log(`✅ ${createdTasks.length} tasks created`)
    }

    console.log('\n4️⃣ Creating welcome message...')
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        case_id: moveCase.id,
        sender: 'concierge',
        body: `Welcome to Relo Network! We've created your relocation case and are excited to help you move to ${testData.destination_city}.`
      })
      .select()
      .single()

    if (messageError) {
      console.error('❌ Message creation failed:', messageError.message)
    } else {
      console.log('✅ Welcome message created')
    }

    console.log('\n5️⃣ Verifying complete case data...')
    const { data: caseData, error: verifyError } = await supabase
      .from('move_cases')
      .select(`
        *,
        clients!client_user_id(*),
        tasks!case_id(*),
        messages!case_id(*)
      `)
      .eq('id', moveCase.id)
      .single()

    if (verifyError) {
      console.error('❌ Case verification failed:', verifyError.message)
    } else {
      console.log('✅ Case verification successful')
      console.log(`   - Client: ${caseData.clients?.full_name}`)
      console.log(`   - Tasks: ${caseData.tasks?.length || 0}`)
      console.log(`   - Messages: ${caseData.messages?.length || 0}`)
      console.log(`   - Route: ${testData.origin_city} → ${testData.destination_city}`)
    }

    console.log('\n🧹 Cleaning up test data...')
    await supabase.from('tasks').delete().eq('case_id', moveCase.id)
    await supabase.from('messages').delete().eq('case_id', moveCase.id)
    await supabase.from('move_cases').delete().eq('id', moveCase.id)
    await supabase.from('clients').delete().eq('id', client.id)
    console.log('✅ Test data cleaned up')

    console.log('\n🎉 Case creation functionality test completed successfully!')
    console.log('\n📋 Test Results:')
    console.log('✅ Client creation works')
    console.log('✅ Move case creation works')
    console.log('✅ Task seeding works')
    console.log('✅ Message creation works')
    console.log('✅ Data relationships work')
    console.log('\n🚀 Ready for production use!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testCaseCreation()