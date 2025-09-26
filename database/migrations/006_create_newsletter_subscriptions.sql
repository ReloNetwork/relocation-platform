-- Create newsletter_subscriptions table
-- This table stores email subscriptions for The Relo Network News

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  source VARCHAR(100) DEFAULT 'website',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  subscription_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source_page VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_subscriptions(created_at);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to manage all data
CREATE POLICY "Service role can manage newsletter subscriptions" ON newsletter_subscriptions
  FOR ALL USING (auth.role() = 'service_role');

-- Insert comment for table documentation
COMMENT ON TABLE newsletter_subscriptions IS 'Stores email subscriptions for The Relo Network News newsletter';