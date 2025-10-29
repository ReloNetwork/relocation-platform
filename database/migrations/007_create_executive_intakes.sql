-- Create executive_intakes table for storing 72-hour audit customer data
-- This table captures all form data from paid executive intake assessments

CREATE TABLE IF NOT EXISTS executive_intakes (
  id BIGSERIAL PRIMARY KEY,
  reference_id TEXT UNIQUE NOT NULL,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Move Details
  move_date TEXT NOT NULL,
  flexibility TEXT,
  urgency TEXT,
  
  -- Budget Information
  budget TEXT NOT NULL,
  budget_flexible BOOLEAN DEFAULT FALSE,
  
  -- Area Preferences
  preferred_areas TEXT[], -- Array of selected areas
  avoid_areas TEXT,
  
  -- Property Requirements
  property_type TEXT,
  property_priority TEXT,
  
  -- Family Information
  adults TEXT,
  children TEXT,
  children_ages TEXT,
  pets BOOLEAN DEFAULT FALSE,
  
  -- Service Priorities
  schools_priority TEXT,
  visa_priority TEXT,
  
  -- Support Requirements
  visa_support BOOLEAN DEFAULT FALSE,
  taxation_support BOOLEAN DEFAULT FALSE,
  banking_support BOOLEAN DEFAULT FALSE,
  schooling_support BOOLEAN DEFAULT FALSE,
  lifestyle_support BOOLEAN DEFAULT FALSE,
  other_requirements TEXT,
  special_requirements TEXT,
  
  -- Payment Information
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  amount_paid INTEGER, -- in pence
  payment_status TEXT DEFAULT 'pending',
  
  -- Metadata
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE executive_intakes ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all intakes (for admin dashboard)
CREATE POLICY "Enable read access for authenticated users" ON executive_intakes
FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for service role to insert new intakes
CREATE POLICY "Enable insert for service role" ON executive_intakes
FOR INSERT WITH CHECK (true);

-- Policy for service role to update payment status
CREATE POLICY "Enable update for service role" ON executive_intakes
FOR UPDATE USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_executive_intakes_email ON executive_intakes(email);
CREATE INDEX IF NOT EXISTS idx_executive_intakes_reference_id ON executive_intakes(reference_id);
CREATE INDEX IF NOT EXISTS idx_executive_intakes_stripe_session ON executive_intakes(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_executive_intakes_payment_status ON executive_intakes(payment_status);
CREATE INDEX IF NOT EXISTS idx_executive_intakes_submitted_at ON executive_intakes(submitted_at);

-- Update timestamp trigger
CREATE TRIGGER update_executive_intakes_updated_at 
    BEFORE UPDATE ON executive_intakes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE executive_intakes IS 'Storage for 72-hour audit executive intake form data with payment tracking';
COMMENT ON COLUMN executive_intakes.reference_id IS 'Unique reference ID for customer support (format: EX-XXXXXXXX)';
COMMENT ON COLUMN executive_intakes.preferred_areas IS 'Array of selected London areas/boroughs';
COMMENT ON COLUMN executive_intakes.amount_paid IS 'Payment amount in pence (£29.97 = 2997)';
COMMENT ON COLUMN executive_intakes.payment_status IS 'Payment status: pending, completed, failed, refunded';