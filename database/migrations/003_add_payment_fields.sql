-- Add payment-related fields to corporate_emergency_requests table
ALTER TABLE corporate_emergency_requests 
ADD COLUMN IF NOT EXISTS payment_session_id TEXT;

ALTER TABLE corporate_emergency_requests 
ADD COLUMN IF NOT EXISTS package_id TEXT;

ALTER TABLE corporate_emergency_requests 
ADD COLUMN IF NOT EXISTS amount_paid INTEGER;

-- Add indexes for payment fields
CREATE INDEX IF NOT EXISTS idx_corporate_emergency_requests_payment_session_id 
ON corporate_emergency_requests(payment_session_id);

CREATE INDEX IF NOT EXISTS idx_corporate_emergency_requests_package_id 
ON corporate_emergency_requests(package_id);

-- Create consultation_bookings table for free consultations
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  slot_id TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for consultation bookings
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_request_id ON consultation_bookings(request_id);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_scheduled_at ON consultation_bookings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_status ON consultation_bookings(status);

-- Enable RLS for consultation bookings
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for consultation bookings - Public insert allowed
CREATE POLICY "Anyone can book consultations" ON consultation_bookings
  FOR INSERT WITH CHECK (true);

-- Add updated_at trigger for consultation bookings
CREATE TRIGGER trigger_consultation_bookings_updated_at
  BEFORE UPDATE ON consultation_bookings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();