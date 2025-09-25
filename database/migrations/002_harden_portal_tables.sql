-- 2) Hardening existing tables for portal usage

-- Update move_cases table with additional columns for portal functionality
alter table move_cases
  add column if not exists client_user_id uuid references clients(id) on delete set null,
  add column if not exists origin_city text,
  add column if not exists destination_city text,
  add column if not exists target_date date,
  add column if not exists status text default 'new';

-- Update tasks table with case relationship and additional metadata
alter table tasks
  add column if not exists case_id uuid references move_cases(id) on delete cascade,
  add column if not exists title text,
  add column if not exists status text default 'todo',   -- todo | doing | done
  add column if not exists sort int default 0,
  add column if not exists due_at timestamptz,
  add column if not exists created_at timestamptz default now();

-- Create documents table for file management
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references move_cases(id) on delete cascade,
  uploaded_by text check (uploaded_by in ('client','concierge')) default 'concierge',
  name text,
  path text,           -- storage object path
  content_type text,
  size_bytes int,
  created_at timestamptz default now()
);

-- Create messages table for case communication
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references move_cases(id) on delete cascade,
  sender text check (sender in ('client','concierge')) default 'concierge',
  body text,
  created_at timestamptz default now()
);

-- Add indexes for better performance
create index if not exists idx_move_cases_client_user_id on move_cases(client_user_id);
create index if not exists idx_move_cases_status on move_cases(status);
create index if not exists idx_tasks_case_id on tasks(case_id);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_sort on tasks(sort);
create index if not exists idx_documents_case_id on documents(case_id);
create index if not exists idx_messages_case_id on messages(case_id);
create index if not exists idx_messages_created_at on messages(created_at desc);