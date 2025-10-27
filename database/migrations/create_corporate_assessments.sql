-- Create corporate_assessments table for storing corporate relocation assessment submissions
-- This table captures all form data from the 15-minute Corporate Assessment

CREATE TABLE IF NOT EXISTS corporate_assessments (
  id BIGSERIAL PRIMARY KEY,
  reference_id TEXT UNIQUE NOT NULL,
  
  -- Company Information
  company_name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  annual_revenue TEXT,
  
  -- Contact Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  job_title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Relocation Requirements
  relocation_type TEXT,
  employee_count TEXT,
  timeline TEXT,
  budget_range TEXT,
  
  -- Challenges and Experience
  current_challenges TEXT[], -- Array of selected challenges
  previous_experience TEXT,
  
  -- Services and Requirements
  services_needed TEXT[], -- Array of selected services
  compliance_requirements TEXT,
  special_requirements TEXT,
  
  -- Follow-up Preferences
  urgency TEXT,
  preferred_contact TEXT,
  
  -- Metadata
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE corporate_assessments ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all assessments (for admin dashboard)
CREATE POLICY "Enable read access for authenticated users" ON corporate_assessments
FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for service role to insert new assessments
CREATE POLICY "Enable insert for service role" ON corporate_assessments
FOR INSERT WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_corporate_assessments_email ON corporate_assessments(email);
CREATE INDEX IF NOT EXISTS idx_corporate_assessments_company ON corporate_assessments(company_name);
CREATE INDEX IF NOT EXISTS idx_corporate_assessments_submitted_at ON corporate_assessments(submitted_at);
CREATE INDEX IF NOT EXISTS idx_corporate_assessments_reference_id ON corporate_assessments(reference_id);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_corporate_assessments_updated_at 
    BEFORE UPDATE ON corporate_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();