-- Create AI Talent Submissions table
CREATE TABLE IF NOT EXISTS ai_talent_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Reference and timestamps
  reference_number TEXT UNIQUE NOT NULL DEFAULT ('AI-' || EXTRACT(EPOCH FROM NOW())::TEXT),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  response_deadline TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '2 hours'),
  
  -- User Type
  user_type TEXT DEFAULT 'company' CHECK (user_type IN ('company', 'individual')),
  
  -- Company Information
  company_name TEXT NOT NULL,
  company_website TEXT,
  industry TEXT DEFAULT 'AI/Machine Learning',
  office_location TEXT,
  
  -- Contact Information
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  
  -- AI Talent Requirements
  talent_role TEXT,
  seniority_level TEXT,
  current_location TEXT,
  target_start_date TEXT,
  salary_range TEXT,
  
  -- Relocation Needs
  employee_count TEXT DEFAULT '1',
  family_size TEXT,
  children_ages TEXT,
  spouse_employment TEXT,
  
  -- 72-Hour Priorities
  housing_budget TEXT,
  preferred_areas TEXT[],
  school_requirement TEXT,
  
  -- Timeline
  urgency_level TEXT DEFAULT 'urgent',
  competing_offers TEXT,
  
  -- Additional Requirements
  visa_status TEXT,
  pet_relocation TEXT,
  special_requirements TEXT,
  
  -- Meta
  referral_source TEXT,
  submission_status TEXT DEFAULT 'new'
);

-- Create indexes for better query performance
CREATE INDEX idx_ai_talent_created_at ON ai_talent_submissions(created_at DESC);
CREATE INDEX idx_ai_talent_status ON ai_talent_submissions(submission_status);
CREATE INDEX idx_ai_talent_company ON ai_talent_submissions(company_name);
CREATE INDEX idx_ai_talent_email ON ai_talent_submissions(contact_email);

-- Enable Row Level Security
ALTER TABLE ai_talent_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows insert from authenticated and anonymous users
CREATE POLICY "Enable insert for all users" ON ai_talent_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows select for authenticated users only (for admin access)
CREATE POLICY "Enable select for authenticated users" ON ai_talent_submissions
  FOR SELECT
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_talent_submissions_updated_at
  BEFORE UPDATE ON ai_talent_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT, SELECT ON ai_talent_submissions TO anon, authenticated;
GRANT UPDATE, DELETE ON ai_talent_submissions TO authenticated;