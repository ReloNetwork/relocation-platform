const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

async function runMigration() {
  // Read environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/20250101_contact_forms.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    console.log('Running database migration...')
    
    // Split the migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`)
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        
        if (error) {
          console.error('Error executing statement:', error)
          // Continue with other statements
        } else {
          console.log('✓ Statement executed successfully')
        }
      }
    }

    console.log('Migration completed!')

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()