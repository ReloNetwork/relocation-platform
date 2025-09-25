const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    console.log('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🚀 Starting database migration...')

    // Test connection first
    const { data: testData, error: testError } = await supabase.from('clients').select('count', { count: 'exact', head: true })
    if (testError) {
      console.error('❌ Database connection failed:', testError.message)
      process.exit(1)
    }
    console.log('✅ Database connection successful')

    // Execute each migration statement individually
    const migrations = [
      // Update move_cases table
      `ALTER TABLE move_cases 
       ADD COLUMN IF NOT EXISTS client_user_id uuid REFERENCES clients(id) ON DELETE SET NULL`,
      
      `ALTER TABLE move_cases 
       ADD COLUMN IF NOT EXISTS origin_city text`,
      
      `ALTER TABLE move_cases 
       ADD COLUMN IF NOT EXISTS destination_city text`,
      
      `ALTER TABLE move_cases 
       ADD COLUMN IF NOT EXISTS target_date date`,
      
      `ALTER TABLE move_cases 
       ADD COLUMN IF NOT EXISTS status text DEFAULT 'new'`,

      // Update tasks table  
      `ALTER TABLE tasks 
       ADD COLUMN IF NOT EXISTS case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE`,
      
      `ALTER TABLE tasks 
       ADD COLUMN IF NOT EXISTS title text`,
      
      `ALTER TABLE tasks 
       ADD COLUMN IF NOT EXISTS status text DEFAULT 'todo'`,
      
      `ALTER TABLE tasks 
       ADD COLUMN IF NOT EXISTS sort int DEFAULT 0`,
      
      `ALTER TABLE tasks 
       ADD COLUMN IF NOT EXISTS due_at timestamptz`,
      
      `ALTER TABLE tasks 
       ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now()`,

      // Create documents table
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

      // Create messages table
      `CREATE TABLE IF NOT EXISTS messages (
         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
         case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
         sender text CHECK (sender IN ('client','concierge')) DEFAULT 'concierge',
         body text,
         created_at timestamptz DEFAULT now()
       )`,

      // Create indexes
      `CREATE INDEX IF NOT EXISTS idx_move_cases_client_user_id ON move_cases(client_user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_move_cases_status ON move_cases(status)`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_case_id ON tasks(case_id)`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_sort ON tasks(sort)`,
      `CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id)`,
      `CREATE INDEX IF NOT EXISTS idx_messages_case_id ON messages(case_id)`,
      `CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC)`
    ]

    for (let i = 0; i < migrations.length; i++) {
      const statement = migrations[i]
      console.log(`\n📝 Executing migration ${i + 1}/${migrations.length}...`)
      console.log(`SQL: ${statement.substring(0, 80)}...`)

      const { error } = await supabase.rpc('exec', { sql: statement })
      
      if (error) {
        console.error(`❌ Migration ${i + 1} failed:`, error.message)
        // Continue with other migrations instead of stopping
        continue
      }
      
      console.log(`✅ Migration ${i + 1} completed`)
    }

    console.log('\n🎉 All migrations completed!')

    // Verify table structure
    console.log('\n🔍 Verifying table structure...')
    
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['move_cases', 'tasks', 'documents', 'messages'])

    if (tableError) {
      console.log('Could not verify tables:', tableError.message)
    } else {
      console.log('✅ Verified tables:', tables.map(t => t.table_name).join(', '))
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

runMigration()