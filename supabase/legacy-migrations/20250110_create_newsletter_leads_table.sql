-- Historical migration retained for reference. The production table predates CLI migration tracking.
-- Create newsletter_leads table for capturing London Relocation Index requests
CREATE TABLE IF NOT EXISTS newsletter_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'unknown',
  utm_source TEXT DEFAULT 'direct',
  utm_medium TEXT,
  utm_campaign TEXT,
  content TEXT DEFAULT 'General signup',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_sent_at TIMESTAMP WITH TIME ZONE,
  index_sent BOOLEAN DEFAULT FALSE,
  index_sent_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_leads_email ON newsletter_leads(email);

-- Create index on created_at for sorting
CREATE INDEX idx_newsletter_leads_created_at ON newsletter_leads(created_at DESC);

-- Create index on source and utm_source for analytics
CREATE INDEX idx_newsletter_leads_source ON newsletter_leads(source, utm_source);

-- Add RLS policies
ALTER TABLE newsletter_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage all newsletter leads
CREATE POLICY "Service role can manage all newsletter leads" ON newsletter_leads
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Allow anonymous users to insert their own email (for signups)
CREATE POLICY "Anyone can sign up for newsletter" ON newsletter_leads
  FOR INSERT
  WITH CHECK (true);

-- Create a view for recent signups (for admin dashboard)
CREATE OR REPLACE VIEW recent_newsletter_signups AS
SELECT 
  id,
  email,
  source,
  utm_source,
  utm_campaign,
  content,
  created_at,
  confirmed,
  index_sent
FROM newsletter_leads
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Add comment for documentation
COMMENT ON TABLE newsletter_leads IS 'Stores newsletter signups and London Relocation Index requests from the AI talent article and other sources';
