-- Complete Portal Setup Migration
-- This migration sets up the complete portal infrastructure with proper security

-- 1) Light client directory (dedup by email)
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- 2) Hardening existing tables for portal usage
ALTER TABLE move_cases
  ADD COLUMN IF NOT EXISTS client_user_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS origin_city text,
  ADD COLUMN IF NOT EXISTS destination_city text,
  ADD COLUMN IF NOT EXISTS target_date date,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'todo',   -- todo | doing | done
  ADD COLUMN IF NOT EXISTS sort int DEFAULT 0,
  ADD COLUMN IF NOT EXISTS due_at timestamptz,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

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

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
  sender text CHECK (sender IN ('client','concierge')) DEFAULT 'concierge',
  body text,
  created_at timestamptz DEFAULT now()
);

-- 3) Indexes for speed
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_move_cases_client_user_id ON move_cases(client_user_id);
CREATE INDEX IF NOT EXISTS idx_move_cases_status ON move_cases(status);
CREATE INDEX IF NOT EXISTS idx_tasks_case_status ON tasks(case_id, status, sort);
CREATE INDEX IF NOT EXISTS idx_docs_case ON documents(case_id);
CREATE INDEX IF NOT EXISTS idx_msgs_case_time ON messages(case_id, created_at DESC);

-- 4) RLS: staff (concierge) = any org member; clients = only their case.
ALTER TABLE move_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS concierge_read_cases ON move_cases;
DROP POLICY IF EXISTS concierge_rw_cases ON move_cases;
DROP POLICY IF EXISTS concierge_tasks_rw ON tasks;
DROP POLICY IF EXISTS concierge_docs_rw ON documents;
DROP POLICY IF EXISTS concierge_msgs_rw ON messages;

-- Staff access via org_memberships (you already have this table).
-- Read everything if the requester is in ANY org (concierge/staff).
CREATE POLICY concierge_read_cases
ON move_cases FOR SELECT
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

CREATE POLICY concierge_rw_cases
ON move_cases FOR ALL
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

CREATE POLICY concierge_tasks_rw
ON tasks FOR ALL
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

CREATE POLICY concierge_docs_rw
ON documents FOR ALL
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

CREATE POLICY concierge_msgs_rw
ON messages FOR ALL
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

-- Client access policies (clients can only see their own cases)
CREATE POLICY client_read_own_cases
ON move_cases FOR SELECT
USING (client_user_id = (SELECT id FROM clients WHERE email = auth.email()));

CREATE POLICY client_read_own_tasks
ON tasks FOR SELECT
USING (EXISTS (
  SELECT 1 FROM move_cases mc 
  WHERE mc.id = tasks.case_id 
  AND mc.client_user_id = (SELECT id FROM clients WHERE email = auth.email())
));

CREATE POLICY client_read_own_docs
ON documents FOR SELECT
USING (EXISTS (
  SELECT 1 FROM move_cases mc 
  WHERE mc.id = documents.case_id 
  AND mc.client_user_id = (SELECT id FROM clients WHERE email = auth.email())
));

CREATE POLICY client_read_own_msgs
ON messages FOR SELECT
USING (EXISTS (
  SELECT 1 FROM move_cases mc 
  WHERE mc.id = messages.case_id 
  AND mc.client_user_id = (SELECT id FROM clients WHERE email = auth.email())
));

-- Allow clients to create messages in their own cases
CREATE POLICY client_create_msgs
ON messages FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM move_cases mc 
  WHERE mc.id = messages.case_id 
  AND mc.client_user_id = (SELECT id FROM clients WHERE email = auth.email())
));

-- Verify migration success
SELECT 
  'Migration completed successfully' as status,
  now() as completed_at;