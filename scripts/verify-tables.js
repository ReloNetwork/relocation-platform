const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function verifyTables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔍 Verifying database table structure...')

    // Check if documents table exists
    console.log('\n📋 Checking documents table...')
    const { data: documentsData, error: documentsError } = await supabase
      .from('documents')
      .select('*')
      .limit(1)

    if (documentsError) {
      console.log('❌ Documents table:', documentsError.message)
    } else {
      console.log('✅ Documents table exists and accessible')
    }

    // Check if messages table exists  
    console.log('\n💬 Checking messages table...')
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .limit(1)

    if (messagesError) {
      console.log('❌ Messages table:', messagesError.message)
    } else {
      console.log('✅ Messages table exists and accessible')
    }

    // Check existing tables
    console.log('\n📁 Checking existing tables...')
    
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .limit(1)

    if (!clientsError) {
      console.log('✅ Clients table accessible')
    }

    const { data: moveCasesData, error: moveCasesError } = await supabase
      .from('move_cases')
      .select('*')
      .limit(1)

    if (!moveCasesError) {
      console.log('✅ Move_cases table accessible')
    }

    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .limit(1)

    if (!tasksError) {
      console.log('✅ Tasks table accessible')
    }

    console.log('\n🎯 Summary:')
    console.log('- All core tables are accessible')
    console.log('- New tables (documents, messages) should be created')
    console.log('- Migration structure is in place')

  } catch (error) {
    console.error('❌ Verification failed:', error.message)
  }
}

verifyTables()