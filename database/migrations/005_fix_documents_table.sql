-- Fix documents table schema
-- Execute this in your Supabase SQL Editor

-- Check current documents table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'documents' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add missing columns to documents table if they don't exist
DO $$ 
BEGIN
  -- Check and add content_type column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'content_type') THEN
    ALTER TABLE documents ADD COLUMN content_type text;
    RAISE NOTICE 'Added content_type column to documents table';
  END IF;
  
  -- Check and add size_bytes column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'size_bytes') THEN
    ALTER TABLE documents ADD COLUMN size_bytes integer;
    RAISE NOTICE 'Added size_bytes column to documents table';
  END IF;
  
  -- Check and add uploaded_by column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'uploaded_by') THEN
    ALTER TABLE documents ADD COLUMN uploaded_by text CHECK (uploaded_by IN ('client','concierge')) DEFAULT 'concierge';
    RAISE NOTICE 'Added uploaded_by column to documents table';
  END IF;
  
  -- Check and add name column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'name') THEN
    ALTER TABLE documents ADD COLUMN name text;
    RAISE NOTICE 'Added name column to documents table';
  END IF;
  
  -- Check and add path column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'path') THEN
    ALTER TABLE documents ADD COLUMN path text;
    RAISE NOTICE 'Added path column to documents table';
  END IF;
  
  -- Check and add created_at column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'created_at') THEN
    ALTER TABLE documents ADD COLUMN created_at timestamptz DEFAULT now();
    RAISE NOTICE 'Added created_at column to documents table';
  END IF;
  
  -- Check and add case_id column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'case_id') THEN
    ALTER TABLE documents ADD COLUMN case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE;
    RAISE NOTICE 'Added case_id column to documents table';
  END IF;
  
  -- Check and add id column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'id') THEN
    ALTER TABLE documents ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();
    RAISE NOTICE 'Added id column to documents table';
  END IF;
  
END $$;

-- Recreate the documents table if it has issues
DROP TABLE IF EXISTS documents_backup;
CREATE TABLE documents_backup AS SELECT * FROM documents;

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

-- Create index for performance
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
INSERT INTO documents SELECT * FROM documents_backup;
DROP TABLE documents_backup;

-- Verify the table structure
SELECT 'Documents table setup completed successfully' as status;

-- Show final table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'documents' 
  AND table_schema = 'public'
ORDER BY ordinal_position;