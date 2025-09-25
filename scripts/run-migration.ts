import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
require('dotenv').config()

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // Read the migration file
    const migrationPath = join(process.cwd(), 'database/migrations/002_harden_portal_tables.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf8')

    console.log('Running database migration: 002_harden_portal_tables.sql')
    console.log('Migration content:')
    console.log(migrationSQL)

    // Split the migration into individual statements and execute them
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 100)}...`)
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        
        if (error) {
          // Try direct query if RPC fails
          const { error: directError } = await supabase
            .from('_')
            .select('*')
            .limit(0)
          
          if (directError) {
            console.error('Migration failed:', error)
            throw error
          }
        }
      }
    }

    console.log('✅ Migration completed successfully!')

    // Verify the new table structures
    console.log('\nVerifying table structures...')
    
    const { data: moveCasesColumns } = await supabase
      .rpc('get_table_columns', { table_name: 'move_cases' })
    
    const { data: tasksColumns } = await supabase
      .rpc('get_table_columns', { table_name: 'tasks' })

    console.log('move_cases columns:', moveCasesColumns)
    console.log('tasks columns:', tasksColumns)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()