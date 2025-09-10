-- Corporate Emergency Requests table
CREATE TABLE IF NOT EXISTS corporate_emergency_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  employee_role TEXT NOT NULL,
  timeline TEXT NOT NULL CHECK (timeline IN ('immediate', 'urgent', 'priority', 'standard')),
  budget TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  requirements TEXT,
  form_type TEXT DEFAULT 'corporate-emergency',
  urgent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  submitted_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_corporate_emergency_requests_email ON corporate_emergency_requests(email);
CREATE INDEX IF NOT EXISTS idx_corporate_emergency_requests_status ON corporate_emergency_requests(status);
CREATE INDEX IF NOT EXISTS idx_corporate_emergency_requests_urgent ON corporate_emergency_requests(urgent);
CREATE INDEX IF NOT EXISTS idx_corporate_emergency_requests_submitted_at ON corporate_emergency_requests(submitted_at);

-- Enable RLS
ALTER TABLE corporate_emergency_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin only for corporate data
CREATE POLICY "Admins can view all corporate requests" ON corporate_emergency_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update corporate requests" ON corporate_emergency_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Public insert policy for form submissions (no auth required)
CREATE POLICY "Anyone can submit corporate emergency requests" ON corporate_emergency_requests
  FOR INSERT WITH CHECK (true);

-- Add updated_at trigger
CREATE TRIGGER trigger_corporate_emergency_requests_updated_at
  BEFORE UPDATE ON corporate_emergency_requests
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();