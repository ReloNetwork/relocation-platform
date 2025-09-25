-- Manual Migration: Hardening existing tables for portal usage
-- Execute this SQL directly in your Supabase SQL Editor

-- 1. Update move_cases table with additional columns for portal functionality
ALTER TABLE move_cases 
  ADD COLUMN IF NOT EXISTS client_user_id uuid REFERENCES clients(id) ON DELETE SET NULL;

ALTER TABLE move_cases 
  ADD COLUMN IF NOT EXISTS origin_city text;

ALTER TABLE move_cases 
  ADD COLUMN IF NOT EXISTS destination_city text;

ALTER TABLE move_cases 
  ADD COLUMN IF NOT EXISTS target_date date;

ALTER TABLE move_cases 
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

-- 2. Update tasks table with case relationship and additional metadata
ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE;

ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS title text;

ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'todo';

ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS sort int DEFAULT 0;

ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS due_at timestamptz;

ALTER TABLE tasks 
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- 3. Create documents table for file management
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
  uploaded_by text CHECK (uploaded_by IN ('client','concierge')) DEFAULT 'concierge',
  name text,
  path text,           -- storage object path
  content_type text,
  size_bytes int,
  created_at timestamptz DEFAULT now()
);

-- 4. Create messages table for case communication
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
  sender text CHECK (sender IN ('client','concierge')) DEFAULT 'concierge',
  body text,
  created_at timestamptz DEFAULT now()
);

-- 5. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_move_cases_client_user_id ON move_cases(client_user_id);
CREATE INDEX IF NOT EXISTS idx_move_cases_status ON move_cases(status);
CREATE INDEX IF NOT EXISTS idx_tasks_case_id ON tasks(case_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_sort ON tasks(sort);
CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id);
CREATE INDEX IF NOT EXISTS idx_messages_case_id ON messages(case_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- 6. Verify tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('move_cases', 'tasks', 'documents', 'messages')
ORDER BY table_name;