-- Fix documents table schema
-- This will run the migration to ensure the documents table has all required columns

-- Recreate the documents table with correct schema
DROP TABLE IF EXISTS documents_backup;

-- Create backup only if table exists and has data
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
  case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
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
DROP POLICY IF EXISTS concierge_documents_rw ON documents;
CREATE POLICY concierge_documents_rw
ON documents FOR ALL
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

DROP POLICY IF EXISTS client_read_own_docs ON documents;
CREATE POLICY client_read_own_docs
ON documents FOR SELECT
USING (EXISTS (
  SELECT 1 FROM move_cases mc 
  WHERE mc.id = documents.case_id 
  AND mc.client_user_id = (SELECT id FROM clients WHERE email = auth.email())
));

-- Restore data if any existed
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'documents_backup') THEN
    INSERT INTO documents SELECT * FROM documents_backup;
    DROP TABLE documents_backup;
    RAISE NOTICE 'Restored data from backup';
  END IF;
END $$;

-- Verify the table structure
SELECT 'Documents table setup completed successfully' as status;

-- Show final table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'documents' 
  AND table_schema = 'public'
ORDER BY ordinal_position;