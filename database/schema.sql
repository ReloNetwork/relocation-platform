-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM public;

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'concierge', 'supplier', 'admin')) DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client profiles
CREATE TABLE IF NOT EXISTS client_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'Europe/London',
  household_json JSONB DEFAULT '{}',
  preferences_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Move cases
CREATE TABLE IF NOT EXISTS move_cases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  concierge_id UUID REFERENCES users(id) ON DELETE SET NULL,
  route_from TEXT NOT NULL,
  route_to TEXT NOT NULL,
  move_date DATE,
  status TEXT NOT NULL CHECK (status IN ('intake', 'scoping', 'quoting', 'booked', 'in_transit', 'settling', 'complete', 'on_hold')) DEFAULT 'intake',
  sla_next_action_at TIMESTAMPTZ,
  budget_range TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES move_cases(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assignee_role TEXT NOT NULL CHECK (assignee_role IN ('client', 'concierge', 'supplier')),
  assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  due_at TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('todo', 'doing', 'blocked', 'done')) DEFAULT 'todo',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES move_cases(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  location TEXT,
  cal_external_id TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  attendees_json JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES move_cases(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
  body TEXT NOT NULL,
  attachments_json JSONB DEFAULT '[]',
  message_type TEXT DEFAULT 'message' CHECK (message_type IN ('message', 'system', 'task_update')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES move_cases(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  content_type TEXT,
  file_size INTEGER,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'visa', 'housing', 'legal', 'financial')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Suppliers
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('mover', 'housing', 'local_expert', 'visa', 'legal', 'financial', 'other')),
  description TEXT,
  rating DECIMAL(3,2) DEFAULT 0.0,
  contact_json JSONB DEFAULT '{}',
  coverage_areas TEXT[] DEFAULT '{}',
  insurance_million DECIMAL(10,2),
  memberships TEXT[] DEFAULT '{}',
  website TEXT,
  logo_url TEXT,
  is_visible BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'sponsored')) DEFAULT 'pending',
  featured_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner plans (pricing tiers)
CREATE TABLE IF NOT EXISTS partner_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly_gbp INTEGER NOT NULL,
  price_annual_gbp INTEGER NOT NULL,
  stripe_price_monthly_id TEXT,
  stripe_price_annual_id TEXT,
  features_json JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Supplier subscriptions
CREATE TABLE IF NOT EXISTS supplier_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES partner_plans(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete')) DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subscription_id UUID REFERENCES supplier_subscriptions(id) ON DELETE CASCADE NOT NULL,
  stripe_invoice_id TEXT NOT NULL,
  amount_gbp INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible')),
  invoice_date TIMESTAMPTZ NOT NULL,
  due_date TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge entries (for AI)
CREATE TABLE IF NOT EXISTS knowledge_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('relocation', 'visa', 'housing', 'transportation', 'lifestyle', 'legal', 'financial')),
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings (Cal.com integration)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES move_cases(id) ON DELETE CASCADE,
  cal_booking_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  attendee_email TEXT,
  attendee_name TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'canceled', 'rescheduled')),
  meeting_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  current_location TEXT,
  target_location TEXT,
  move_timeframe TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'converted', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_move_cases_client_id ON move_cases(client_id);
CREATE INDEX IF NOT EXISTS idx_move_cases_concierge_id ON move_cases(concierge_id);
CREATE INDEX IF NOT EXISTS idx_move_cases_status ON move_cases(status);
CREATE INDEX IF NOT EXISTS idx_tasks_case_id ON tasks(case_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_messages_case_id ON messages(case_id);
CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_category ON suppliers(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_entries_category ON knowledge_entries(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_entries_published ON knowledge_entries(is_published);

-- RLS Policies

-- Users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Client profiles
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own profile" ON client_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clients can update their own profile" ON client_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Clients can insert their own profile" ON client_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Move cases
ALTER TABLE move_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own cases" ON move_cases
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = concierge_id OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'concierge'))
  );

CREATE POLICY "Clients can create their own cases" ON move_cases
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Authorized users can update cases" ON move_cases
  FOR UPDATE USING (
    auth.uid() = client_id OR 
    auth.uid() = concierge_id OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'concierge'))
  );

-- Tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tasks for their cases" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM move_cases 
      WHERE id = tasks.case_id 
      AND (client_id = auth.uid() OR concierge_id = auth.uid())
    ) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'concierge'))
  );

CREATE POLICY "Authorized users can manage tasks" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM move_cases 
      WHERE id = tasks.case_id 
      AND (client_id = auth.uid() OR concierge_id = auth.uid())
    ) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'concierge'))
  );

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages for their cases" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM move_cases 
      WHERE id = messages.case_id 
      AND (client_id = auth.uid() OR concierge_id = auth.uid())
    ) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'concierge'))
  );

CREATE POLICY "Users can send messages to their cases" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM move_cases 
      WHERE id = messages.case_id 
      AND (client_id = auth.uid() OR concierge_id = auth.uid())
    )
  );

-- Documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view documents for their cases" ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM move_cases 
      WHERE id = documents.case_id 
      AND (client_id = auth.uid() OR concierge_id = auth.uid())
    ) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'concierge'))
  );

CREATE POLICY "Users can upload documents to their cases" ON documents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM move_cases 
      WHERE id = documents.case_id 
      AND (client_id = auth.uid() OR concierge_id = auth.uid())
    )
  );

-- Suppliers
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved suppliers" ON suppliers
  FOR SELECT USING (status IN ('approved', 'sponsored') AND is_visible = TRUE);

CREATE POLICY "Suppliers can view their own profile" ON suppliers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Suppliers can update their own profile" ON suppliers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Suppliers can create their profile" ON suppliers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Knowledge entries
ALTER TABLE knowledge_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published knowledge" ON knowledge_entries
  FOR SELECT USING (is_published = TRUE);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_client_profiles_updated_at
  BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_move_cases_updated_at
  BEFORE UPDATE ON move_cases
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_supplier_subscriptions_updated_at
  BEFORE UPDATE ON supplier_subscriptions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trigger_knowledge_entries_updated_at
  BEFORE UPDATE ON knowledge_entries
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();