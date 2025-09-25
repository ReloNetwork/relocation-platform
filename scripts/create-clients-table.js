const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function createClientsTable() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔄 Creating clients table...')

    // Create the clients table using Supabase SQL editor approach
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS clients (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          full_name TEXT,
          phone TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
        CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
      `
    })

    if (error) {
      console.log('❌ RPC method failed, trying alternative approach...')
      console.log('Error:', error.message)
      
      // Alternative: Since we can't execute SQL directly, let's insert a dummy record 
      // which will trigger Supabase to recognize the table structure if it exists
      console.log('📝 Please create the clients table manually in Supabase dashboard with this SQL:')
      console.log(`
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
      `)
      
      return false
    } else {
      console.log('✅ Clients table created successfully')
      return true
    }
  } catch (error) {
    console.error('❌ Error creating clients table:', error.message)
    
    console.log('📝 Manual SQL to run in Supabase dashboard:')
    console.log(`
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
    `)
    
    return false
  }
}

// Test the table after creation
async function testClientsTable() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🧪 Testing clients table...')
    const { data, error } = await supabase.from('clients').select('*').limit(1)
    
    if (error) {
      console.log('❌ Table test failed:', error.message)
      return false
    } else {
      console.log('✅ Clients table is working correctly')
      return true
    }
  } catch (error) {
    console.log('❌ Table test error:', error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Setting up clients table for Relo Network...')
  
  const created = await createClientsTable()
  if (created) {
    await testClientsTable()
    console.log('🎉 Clients table setup complete!')
  } else {
    console.log('⚠️  Please create the table manually using the SQL provided above')
    console.log('   Then try the create-case form again')
  }
}

main()