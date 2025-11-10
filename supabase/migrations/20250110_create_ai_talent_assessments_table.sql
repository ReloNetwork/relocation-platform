-- Create ai_talent_assessments table for storing AI talent relocation assessment submissions
CREATE TABLE IF NOT EXISTS ai_talent_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT UNIQUE NOT NULL,
  user_type TEXT DEFAULT 'company',
  
  -- Company/Contact Information
  company_name TEXT,
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  office_location TEXT,
  
  -- AI Talent Details
  talent_role TEXT,
  current_location TEXT,
  salary_range TEXT,
  target_start_date TEXT,
  competing_offers TEXT,
  visa_status TEXT,
  
  -- Relocation Process (for companies)
  urgency_level TEXT,
  employee_count TEXT,
  
  -- Housing and Family
  housing_budget TEXT,
  family_size TEXT,
  preferred_areas JSONB DEFAULT '[]',
  school_requirement TEXT,
  spouse_employment TEXT,
  
  -- Additional Information
  pet_relocation TEXT,
  special_requirements TEXT,
  referral_source TEXT,
  
  -- Index tracking
  add_to_index BOOLEAN DEFAULT FALSE,
  
  -- Email tracking
  confirmation_sent BOOLEAN DEFAULT FALSE,
  confirmation_sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Status tracking
  status TEXT DEFAULT 'new',
  responded_at TIMESTAMP WITH TIME ZONE,
  response_notes TEXT
);

-- Create indexes for faster lookups
CREATE INDEX idx_ai_assessments_reference ON ai_talent_assessments(reference_number);
CREATE INDEX idx_ai_assessments_email ON ai_talent_assessments(contact_email);
CREATE INDEX idx_ai_assessments_created ON ai_talent_assessments(created_at DESC);
CREATE INDEX idx_ai_assessments_status ON ai_talent_assessments(status);
CREATE INDEX idx_ai_assessments_user_type ON ai_talent_assessments(user_type);

-- Add RLS policies
ALTER TABLE ai_talent_assessments ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage all assessments
CREATE POLICY "Service role can manage all assessments" ON ai_talent_assessments
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Allow anonymous users to insert assessments (for form submissions)
CREATE POLICY "Anyone can submit assessment" ON ai_talent_assessments
  FOR INSERT
  WITH CHECK (true);

-- Create a view for recent assessments (for admin dashboard)
CREATE OR REPLACE VIEW recent_ai_assessments AS
SELECT 
  id,
  reference_number,
  user_type,
  company_name,
  contact_name,
  contact_email,
  contact_phone,
  talent_role,
  current_location,
  target_start_date,
  status,
  created_at,
  confirmation_sent
FROM ai_talent_assessments
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Add comment for documentation
COMMENT ON TABLE ai_talent_assessments IS 'Stores AI talent relocation assessments and velocity assessments from the AI talent assessment form';