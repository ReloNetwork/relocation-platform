const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function finalMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🚀 Final migration attempt...')

    // Try to create the messages table specifically since it failed
    console.log('\n💬 Creating messages table...')
    
    const { error: messagesError } = await supabase.rpc('exec_sql', {
      sql: `CREATE TABLE IF NOT EXISTS messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
        sender text CHECK (sender IN ('client','concierge')) DEFAULT 'concierge',
        body text,
        created_at timestamptz DEFAULT now()
      )`
    })

    if (messagesError) {
      console.log('RPC failed, trying direct table creation...')
      
      // Alternative approach: try creating a simple table first
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .limit(0)

      if (error && error.message.includes('does not exist')) {
        console.log('Messages table needs to be created manually')
        console.log('Please execute the SQL in: database/migrations/002_harden_portal_tables_manual.sql')
      }
    } else {
      console.log('✅ Messages table created successfully')
    }

    // Final verification
    console.log('\n🔍 Final verification...')
    
    const tables = ['clients', 'move_cases', 'tasks', 'documents', 'messages']
    const results = {}

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1)
        
        results[table] = error ? `❌ ${error.message}` : '✅ Accessible'
      } catch (err) {
        results[table] = `❌ ${err.message}`
      }
    }

    console.log('\n📊 Table Status:')
    Object.entries(results).forEach(([table, status]) => {
      console.log(`  ${table}: ${status}`)
    })

    console.log('\n📝 Next Steps:')
    console.log('1. If messages table failed, execute the manual SQL file')
    console.log('2. Go to your Supabase dashboard > SQL Editor')
    console.log('3. Run: database/migrations/002_harden_portal_tables_manual.sql')
    console.log('4. This will ensure all tables and columns are properly created')

  } catch (error) {
    console.error('❌ Final migration failed:', error.message)
  }
}

finalMigration()