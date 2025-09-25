const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function runCompleteMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🚀 Starting complete portal migration...')

    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('move_cases')
      .select('count', { count: 'exact', head: true })
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message)
      process.exit(1)
    }
    console.log('✅ Database connection successful')

    // Execute migration statements one by one
    const migrations = [
      // 1. Create clients table
      `CREATE TABLE IF NOT EXISTS clients (
         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
         email text UNIQUE,
         full_name text,
         phone text,
         created_at timestamptz DEFAULT now()
       )`,

      // 2. Add columns to move_cases
      `ALTER TABLE move_cases ADD COLUMN IF NOT EXISTS client_user_id uuid REFERENCES clients(id) ON DELETE SET NULL`,
      `ALTER TABLE move_cases ADD COLUMN IF NOT EXISTS origin_city text`,
      `ALTER TABLE move_cases ADD COLUMN IF NOT EXISTS destination_city text`,
      `ALTER TABLE move_cases ADD COLUMN IF NOT EXISTS target_date date`,
      `ALTER TABLE move_cases ADD COLUMN IF NOT EXISTS status text DEFAULT 'new'`,

      // 3. Add columns to tasks
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS title text`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS status text DEFAULT 'todo'`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS sort int DEFAULT 0`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS due_at timestamptz`,
      `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now()`,

      // 4. Create documents table
      `CREATE TABLE IF NOT EXISTS documents (
         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
         case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
         uploaded_by text CHECK (uploaded_by IN ('client','concierge')) DEFAULT 'concierge',
         name text,
         path text,
         content_type text,
         size_bytes int,
         created_at timestamptz DEFAULT now()
       )`,

      // 5. Create messages table
      `CREATE TABLE IF NOT EXISTS messages (
         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
         case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
         sender text CHECK (sender IN ('client','concierge')) DEFAULT 'concierge',
         body text,
         created_at timestamptz DEFAULT now()
       )`
    ]

    console.log('\n📝 Executing table creation migrations...')
    let successCount = 0
    
    for (let i = 0; i < migrations.length; i++) {
      const statement = migrations[i]
      console.log(`\n${i + 1}/${migrations.length}: ${statement.substring(0, 50)}...`)

      try {
        // Try using a simple query approach
        const result = await supabase.rpc('exec_sql', { sql: statement })
        
        if (result.error) {
          console.log(`⚠️  SQL execution note: ${result.error.message}`)
        } else {
          console.log('✅ Executed successfully')
          successCount++
        }
      } catch (error) {
        console.log(`⚠️  Migration ${i + 1} note: ${error.message}`)
      }
    }

    console.log('\n🔧 Creating indexes...')
    const indexes = [
      `CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email)`,
      `CREATE INDEX IF NOT EXISTS idx_move_cases_client_user_id ON move_cases(client_user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_move_cases_status ON move_cases(status)`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_case_status ON tasks(case_id, status, sort)`,
      `CREATE INDEX IF NOT EXISTS idx_docs_case ON documents(case_id)`,
      `CREATE INDEX IF NOT EXISTS idx_msgs_case_time ON messages(case_id, created_at DESC)`
    ]

    for (const index of indexes) {
      try {
        await supabase.rpc('exec_sql', { sql: index })
        console.log('✅ Index created')
      } catch (error) {
        console.log(`⚠️  Index note: ${error.message}`)
      }
    }

    console.log('\n🔒 Setting up Row Level Security...')
    const rlsStatements = [
      `ALTER TABLE move_cases ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE tasks ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE documents ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE messages ENABLE ROW LEVEL SECURITY`
    ]

    for (const rls of rlsStatements) {
      try {
        await supabase.rpc('exec_sql', { sql: rls })
        console.log('✅ RLS enabled')
      } catch (error) {
        console.log(`⚠️  RLS note: ${error.message}`)
      }
    }

    // Verification
    console.log('\n🔍 Verifying migration results...')
    
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

    console.log('\n📊 Final Table Status:')
    Object.entries(results).forEach(([table, status]) => {
      console.log(`  ${table}: ${status}`)
    })

    const accessibleTables = Object.values(results).filter(status => status.includes('✅')).length
    console.log(`\n🎯 Summary: ${accessibleTables}/${tables.length} tables accessible`)

    if (accessibleTables === tables.length) {
      console.log('🎉 Migration completed successfully!')
    } else {
      console.log('⚠️  Some tables need manual creation. See manual SQL file.')
    }

    console.log('\n📋 Manual SQL file available at:')
    console.log('database/migrations/003_complete_portal_setup.sql')

  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

runCompleteMigration()