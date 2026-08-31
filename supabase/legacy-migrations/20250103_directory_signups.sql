-- Historical migration retained for reference. It is not part of the redesigned launch schema.
-- Create directory_signups table for directory access signups
CREATE TABLE IF NOT EXISTS directory_signups (
  id SERIAL PRIMARY KEY,
  signup_id VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  company_size VARCHAR(50) NOT NULL,
  industry_type VARCHAR(100) NOT NULL,
  access_tier VARCHAR(20) NOT NULL CHECK (access_tier IN ('free', 'premium', 'vip')),
  service_needs TEXT[] NOT NULL DEFAULT '{}',
  urgency_level VARCHAR(50) NOT NULL,
  budget VARCHAR(100) NOT NULL,
  london_areas TEXT[] NOT NULL DEFAULT '{}',
  current_challenges TEXT NOT NULL,
  specific_requirements TEXT,
  how_heard VARCHAR(255),
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled')),
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_directory_signups_email ON directory_signups(email);
CREATE INDEX IF NOT EXISTS idx_directory_signups_signup_id ON directory_signups(signup_id);
CREATE INDEX IF NOT EXISTS idx_directory_signups_access_tier ON directory_signups(access_tier);
CREATE INDEX IF NOT EXISTS idx_directory_signups_status ON directory_signups(status);
CREATE INDEX IF NOT EXISTS idx_directory_signups_created_at ON directory_signups(created_at);

-- Enable Row Level Security
ALTER TABLE directory_signups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for authenticated users" ON directory_signups
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for everyone" ON directory_signups
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON directory_signups
    FOR UPDATE USING (auth.role() = 'service_role');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_directory_signups_updated_at 
    BEFORE UPDATE ON directory_signups 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
