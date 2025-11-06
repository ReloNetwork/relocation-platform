-- Create AI Talent Submissions table
CREATE TABLE IF NOT EXISTS ai_talent_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Company Information
  company_name TEXT NOT NULL,
  company_website TEXT,
  industry TEXT DEFAULT 'AI/Machine Learning',
  office_location TEXT,
  
  -- Contact Information
  contact_name TEXT NOT NULL,
  contact_role TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  
  -- AI Talent Requirements
  talent_role TEXT,
  seniority_level TEXT,
  current_location TEXT,
  target_start_date DATE,
  salary_range TEXT,
  
  -- Relocation Needs
  employee_count TEXT DEFAULT '1',
  family_size TEXT,
  children_ages TEXT,
  spouse_employment TEXT,
  
  -- 72-Hour Priorities
  housing_budget TEXT,
  preferred_areas TEXT[], -- Array of preferred areas
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
  submission_status TEXT DEFAULT 'new', -- new, contacted, in_progress, completed
  response_deadline TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '2 hours'),
  notes TEXT,
  
  -- Reference number
  reference_number TEXT UNIQUE DEFAULT ('AI-' || EXTRACT(EPOCH FROM NOW())::BIGINT::TEXT)
);

-- Create indexes for faster queries
CREATE INDEX idx_ai_submissions_created_at ON ai_talent_submissions(created_at DESC);
CREATE INDEX idx_ai_submissions_status ON ai_talent_submissions(submission_status);
CREATE INDEX idx_ai_submissions_company ON ai_talent_submissions(company_name);
CREATE INDEX idx_ai_submissions_email ON ai_talent_submissions(contact_email);
CREATE INDEX idx_ai_submissions_response_deadline ON ai_talent_submissions(response_deadline);

-- Enable Row Level Security (RLS)
ALTER TABLE ai_talent_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for form submissions)
CREATE POLICY "Anyone can create submissions" ON ai_talent_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to view all submissions
CREATE POLICY "Authenticated users can view all submissions" ON ai_talent_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update submissions
CREATE POLICY "Authenticated users can update submissions" ON ai_talent_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a view for easier querying with formatted data
CREATE OR REPLACE VIEW ai_talent_submissions_view AS
SELECT 
  *,
  CASE 
    WHEN response_deadline < NOW() THEN 'overdue'
    WHEN response_deadline < NOW() + INTERVAL '30 minutes' THEN 'urgent'
    ELSE 'on_time'
  END as response_status,
  EXTRACT(EPOCH FROM (response_deadline - NOW())) / 60 as minutes_until_deadline
FROM ai_talent_submissions
ORDER BY created_at DESC;

-- Optional: Create a function to automatically send notifications
-- (You would need to set up Edge Functions or webhooks for actual notifications)
CREATE OR REPLACE FUNCTION notify_new_ai_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- This could trigger a webhook to send emails/notifications
  -- For now, it just logs
  RAISE NOTICE 'New AI talent submission from %: %', NEW.company_name, NEW.contact_email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new submissions
CREATE TRIGGER on_new_ai_submission
  AFTER INSERT ON ai_talent_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_ai_submission();

-- Grant permissions (adjust based on your needs)
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON ai_talent_submissions TO anon;
GRANT SELECT ON ai_talent_submissions_view TO anon;