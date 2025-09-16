-- Light client directory with email deduplication
-- This table stores basic client information with email as unique identifier

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE clients IS 'Light client directory with email deduplication';
COMMENT ON COLUMN clients.id IS 'Unique identifier for each client';
COMMENT ON COLUMN clients.email IS 'Client email address - unique across all clients';
COMMENT ON COLUMN clients.full_name IS 'Client full name';
COMMENT ON COLUMN clients.phone IS 'Client phone number';
COMMENT ON COLUMN clients.created_at IS 'Timestamp when client record was created';