-- Create partner_applications table
CREATE TABLE IF NOT EXISTS partner_applications (
  id BIGSERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  territory TEXT NOT NULL,
  monthly_leads TEXT NOT NULL,
  marketing_spend TEXT NOT NULL,
  experience TEXT NOT NULL,
  specializations TEXT NOT NULL,
  why_partner TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id BIGSERIAL PRIMARY KEY,
  consultation_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  relocation_timeline TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  current_location TEXT,
  budget TEXT NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms TEXT NOT NULL,
  family_members TEXT NOT NULL,
  children_ages TEXT,
  school_preferences TEXT,
  employment_assistance TEXT,
  priorities TEXT NOT NULL,
  additional_requirements TEXT,
  how_heard TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_consultations_consultation_id ON consultations(consultation_id);
CREATE INDEX IF NOT EXISTS idx_consultations_email ON consultations(email);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create policies for partner_applications
CREATE POLICY "Allow public insert on partner_applications" ON partner_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view partner_applications" ON partner_applications
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for consultations
CREATE POLICY "Allow public insert on consultations" ON consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view consultations" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create directory_signups table
CREATE TABLE IF NOT EXISTS directory_signups (
  id BIGSERIAL PRIMARY KEY,
  signup_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  company_size TEXT NOT NULL,
  industry_type TEXT NOT NULL,
  access_tier TEXT NOT NULL,
  service_needs TEXT[] NOT NULL,
  urgency_level TEXT NOT NULL,
  budget TEXT NOT NULL,
  london_areas TEXT[] NOT NULL,
  current_challenges TEXT NOT NULL,
  specific_requirements TEXT,
  how_heard TEXT,
  marketing_consent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for directory_signups
CREATE INDEX IF NOT EXISTS idx_directory_signups_signup_id ON directory_signups(signup_id);
CREATE INDEX IF NOT EXISTS idx_directory_signups_email ON directory_signups(email);
CREATE INDEX IF NOT EXISTS idx_directory_signups_access_tier ON directory_signups(access_tier);
CREATE INDEX IF NOT EXISTS idx_directory_signups_status ON directory_signups(status);
CREATE INDEX IF NOT EXISTS idx_directory_signups_created_at ON directory_signups(created_at);

-- Enable RLS for directory_signups
ALTER TABLE directory_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for directory_signups
CREATE POLICY "Allow public insert on directory_signups" ON directory_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view directory_signups" ON directory_signups
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_partner_applications_updated_at BEFORE UPDATE
    ON partner_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE
    ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_directory_signups_updated_at BEFORE UPDATE
    ON directory_signups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();