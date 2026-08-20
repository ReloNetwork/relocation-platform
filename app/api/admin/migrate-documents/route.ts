import { NextResponse } from 'next/server';
import { hasInternalAccess } from '@/lib/api-auth';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: Request) {
  if (!hasInternalAccess(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const supabase = createServiceClient();

    // First, check if documents table exists and get its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'documents')
      .eq('table_schema', 'public');

    if (tableError) {
      console.error('Error checking table structure:', tableError);
    }

    console.log('Current documents table structure:', tableInfo);

    // Migration script to recreate documents table with correct schema
    const migrationSQL = `
      -- Create backup of existing data
      DROP TABLE IF EXISTS documents_backup;
      DO $$ 
      BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'documents') THEN
          CREATE TABLE documents_backup AS SELECT * FROM documents;
          RAISE NOTICE 'Backed up existing documents table';
        END IF;
      END $$;

      -- Drop and recreate the documents table
      DROP TABLE IF EXISTS documents CASCADE;

      CREATE TABLE documents (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        case_id uuid,
        uploaded_by text CHECK (uploaded_by IN ('client','concierge')) DEFAULT 'concierge',
        name text,
        path text,
        content_type text,
        size_bytes integer,
        created_at timestamptz DEFAULT now()
      );

      -- Create indexes for performance
      CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id);
      CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);

      -- Enable RLS
      ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

      -- Create RLS policies
      CREATE POLICY documents_all_policy
      ON documents FOR ALL
      USING (true)
      WITH CHECK (true);

      -- Restore data if any existed
      DO $$ 
      BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'documents_backup') THEN
          INSERT INTO documents SELECT * FROM documents_backup;
          DROP TABLE documents_backup;
          RAISE NOTICE 'Restored data from backup';
        END IF;
      END $$;
    `;

    // Execute the migration
    const { error: migrationError } = await supabase.rpc('exec_sql', {
      sql_query: migrationSQL
    });

    if (migrationError) {
      // If the rpc doesn't exist, try direct SQL execution
      console.log('RPC method failed, trying direct SQL execution...');
      
      // Split the migration into smaller parts
      const sqlParts = [
        'DROP TABLE IF EXISTS documents_backup',
        `CREATE TABLE documents_backup AS SELECT * FROM documents`,
        'DROP TABLE IF EXISTS documents CASCADE',
        `CREATE TABLE documents (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          case_id uuid,
          uploaded_by text CHECK (uploaded_by IN ('client','concierge')) DEFAULT 'concierge',
          name text,
          path text,
          content_type text,
          size_bytes integer,
          created_at timestamptz DEFAULT now()
        )`,
        'CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id)',
        'CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC)',
        'ALTER TABLE documents ENABLE ROW LEVEL SECURITY',
        `CREATE POLICY documents_all_policy ON documents FOR ALL USING (true) WITH CHECK (true)`
      ];

      for (const sql of sqlParts) {
        try {
          await supabase.rpc('exec_sql', { sql_query: sql });
        } catch (e) {
          console.log(`SQL part failed: ${sql}`, e);
        }
      }
    }

    // Verify the table structure after migration
    const { data: newTableInfo } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'documents')
      .eq('table_schema', 'public');

    return NextResponse.json({
      success: true,
      message: 'Documents table migration completed',
      oldStructure: tableInfo,
      newStructure: newTableInfo
    });

  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
