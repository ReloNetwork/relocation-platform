-- Add payment-related fields to corporate_emergency_requests table
ALTER TABLE corporate_emergency_requests 
ADD COLUMN payment_session_id TEXT,
ADD COLUMN package_id TEXT,
ADD COLUMN amount_paid INTEGER;

-- Add indexes for payment fields
CREATE INDEX idx_corporate_emergency_requests_payment_session_id 
ON corporate_emergency_requests(payment_session_id);

CREATE INDEX idx_corporate_emergency_requests_package_id 
ON corporate_emergency_requests(package_id);

-- Create consultation_bookings table for free consultations
CREATE TABLE consultation_bookings (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  slot_id TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for consultation bookings
CREATE INDEX idx_consultation_bookings_request_id ON consultation_bookings(request_id);
CREATE INDEX idx_consultation_bookings_scheduled_at ON consultation_bookings(scheduled_at);
CREATE INDEX idx_consultation_bookings_status ON consultation_bookings(status);