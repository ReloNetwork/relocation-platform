-- Final setup to complete the case creation functionality
-- Execute this in your Supabase SQL Editor

-- 1. Create the clients table (if not exists)
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- 2. Create missing columns in move_cases if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'move_cases' AND column_name = 'client_user_id') THEN
    ALTER TABLE move_cases ADD COLUMN client_user_id uuid REFERENCES clients(id) ON DELETE SET NULL;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'move_cases' AND column_name = 'origin_city') THEN
    ALTER TABLE move_cases ADD COLUMN origin_city text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'move_cases' AND column_name = 'destination_city') THEN
    ALTER TABLE move_cases ADD COLUMN destination_city text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'move_cases' AND column_name = 'target_date') THEN
    ALTER TABLE move_cases ADD COLUMN target_date date;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'move_cases' AND column_name = 'status') THEN
    ALTER TABLE move_cases ADD COLUMN status text DEFAULT 'new';
  END IF;
END $$;

-- 3. Create missing columns in tasks if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'case_id') THEN
    ALTER TABLE tasks ADD COLUMN case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'title') THEN
    ALTER TABLE tasks ADD COLUMN title text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'status') THEN
    ALTER TABLE tasks ADD COLUMN status text DEFAULT 'todo';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'sort') THEN
    ALTER TABLE tasks ADD COLUMN sort int DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'due_at') THEN
    ALTER TABLE tasks ADD COLUMN due_at timestamptz;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'created_at') THEN
    ALTER TABLE tasks ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

-- 4. Create documents table if not exists
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
  uploaded_by text CHECK (uploaded_by IN ('client','concierge')) DEFAULT 'concierge',
  name text,
  path text,
  content_type text,
  size_bytes int,
  created_at timestamptz DEFAULT now()
);

-- 5. Create messages table if not exists
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES move_cases(id) ON DELETE CASCADE,
  sender text CHECK (sender IN ('client','concierge')) DEFAULT 'concierge',
  body text,
  created_at timestamptz DEFAULT now()
);

-- 6. Create all necessary indexes
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_move_cases_client_user_id ON move_cases(client_user_id);
CREATE INDEX IF NOT EXISTS idx_move_cases_status ON move_cases(status);
CREATE INDEX IF NOT EXISTS idx_tasks_case_status ON tasks(case_id, status, sort);
CREATE INDEX IF NOT EXISTS idx_docs_case ON documents(case_id);
CREATE INDEX IF NOT EXISTS idx_msgs_case_time ON messages(case_id, created_at DESC);

-- 7. Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE move_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for clients table
DROP POLICY IF EXISTS concierge_clients_rw ON clients;
CREATE POLICY concierge_clients_rw
ON clients FOR ALL
USING (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM org_memberships m WHERE m.user_id = auth.uid()));

-- 9. Verify the setup
SELECT 
  'Setup completed successfully!' as status,
  'All tables, columns, indexes and policies are in place' as message,
  now() as completed_at;

-- 10. Show table summary
SELECT 
  table_name,
  CASE WHEN table_name IN ('clients', 'move_cases', 'tasks', 'documents', 'messages') THEN '✅' ELSE '❓' END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('clients', 'move_cases', 'tasks', 'documents', 'messages')
ORDER BY table_name;