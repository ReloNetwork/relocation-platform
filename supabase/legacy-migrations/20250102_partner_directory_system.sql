-- Historical migration retained for reference. It is not part of the redesigned launch schema.
-- Partner Directory and Access Management System

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id BIGSERIAL PRIMARY KEY,
  partner_id TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  website TEXT,
  business_description TEXT,
  founded_year INTEGER,
  company_size TEXT,
  
  -- Location and Coverage
  primary_location TEXT NOT NULL,
  service_areas TEXT[] NOT NULL,
  coverage_zones TEXT[] NOT NULL,
  postcode_coverage TEXT[],
  
  -- Business Classification
  industry_category TEXT NOT NULL,
  service_categories TEXT[] NOT NULL,
  specializations TEXT[] NOT NULL,
  business_type TEXT NOT NULL, -- 'sole_trader', 'ltd_company', 'plc', 'partnership'
  
  -- Professional Verification
  insurance_coverage JSONB, -- { "public_liability": "£1M", "professional_indemnity": "£500K" }
  certifications TEXT[],
  regulatory_bodies TEXT[],
  vat_number TEXT,
  company_registration TEXT,
  
  -- Pricing and Capacity
  pricing_tier TEXT NOT NULL, -- 'budget', 'mid_market', 'premium', 'luxury'
  minimum_project_value DECIMAL,
  maximum_project_value DECIMAL,
  currency TEXT DEFAULT 'GBP',
  monthly_capacity INTEGER,
  current_availability TEXT, -- 'high', 'medium', 'low', 'none'
  
  -- Quality Metrics
  approval_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'suspended'
  quality_score DECIMAL DEFAULT 0,
  client_rating DECIMAL DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  completion_rate DECIMAL DEFAULT 0,
  response_time_hours DECIMAL DEFAULT 24,
  
  -- Access and Visibility
  visibility_level TEXT DEFAULT 'basic', -- 'basic', 'premium', 'vip', 'featured'
  access_tiers TEXT[] DEFAULT ARRAY['free'], -- 'free', 'premium', 'vip'
  featured_until TIMESTAMPTZ,
  premium_until TIMESTAMPTZ,
  
  -- Administrative
  onboarded_by TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  last_contact_date TIMESTAMPTZ,
  notes TEXT,
  tags TEXT[],
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partner_categories lookup table
CREATE TABLE IF NOT EXISTS partner_categories (
  id BIGSERIAL PRIMARY KEY,
  category_code TEXT UNIQUE NOT NULL,
  category_name TEXT NOT NULL,
  description TEXT,
  parent_category TEXT,
  icon_name TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create client_access_levels table
CREATE TABLE IF NOT EXISTS client_access_levels (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- Reference to auth.users
  email TEXT NOT NULL,
  access_tier TEXT NOT NULL, -- 'free', 'premium', 'vip'
  company_name TEXT,
  subscription_status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'trial'
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  
  -- Access Permissions
  can_view_contact_details BOOLEAN DEFAULT false,
  can_view_pricing BOOLEAN DEFAULT false,
  can_view_reviews BOOLEAN DEFAULT false,
  can_contact_directly BOOLEAN DEFAULT false,
  can_request_quotes BOOLEAN DEFAULT false,
  monthly_contact_limit INTEGER DEFAULT 5,
  monthly_contacts_used INTEGER DEFAULT 0,
  
  -- Usage Tracking
  last_login TIMESTAMPTZ,
  total_searches INTEGER DEFAULT 0,
  total_contacts INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partner_reviews table
CREATE TABLE IF NOT EXISTS partner_reviews (
  id BIGSERIAL PRIMARY KEY,
  partner_id BIGINT REFERENCES partners(id),
  client_email TEXT NOT NULL,
  client_name TEXT,
  client_company TEXT,
  
  -- Review Details
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  timeliness_rating INTEGER CHECK (timeliness_rating >= 1 AND timeliness_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  
  review_title TEXT,
  review_text TEXT,
  project_type TEXT,
  project_value_range TEXT,
  would_recommend BOOLEAN,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verification_method TEXT, -- 'email', 'phone', 'manual'
  verified_at TIMESTAMPTZ,
  verified_by TEXT,
  
  -- Moderation
  is_published BOOLEAN DEFAULT false,
  moderation_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  moderated_by TEXT,
  moderated_at TIMESTAMPTZ,
  moderation_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create partner_contact_requests table
CREATE TABLE IF NOT EXISTS partner_contact_requests (
  id BIGSERIAL PRIMARY KEY,
  partner_id BIGINT REFERENCES partners(id),
  client_email TEXT NOT NULL,
  client_name TEXT,
  client_phone TEXT,
  client_company TEXT,
  
  -- Request Details
  request_type TEXT NOT NULL, -- 'quote', 'consultation', 'info', 'urgent'
  project_description TEXT,
  project_timeline TEXT,
  estimated_budget TEXT,
  preferred_contact_method TEXT,
  urgency_level TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  
  -- Status Tracking
  status TEXT DEFAULT 'sent', -- 'sent', 'viewed', 'responded', 'completed', 'expired'
  partner_response TEXT,
  partner_responded_at TIMESTAMPTZ,
  client_rating INTEGER CHECK (client_rating >= 1 AND client_rating <= 5),
  
  -- Access Control
  client_access_tier TEXT NOT NULL,
  was_premium_contact BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create automated_workflows table
CREATE TABLE IF NOT EXISTS automated_workflows (
  id BIGSERIAL PRIMARY KEY,
  workflow_name TEXT NOT NULL,
  trigger_event TEXT NOT NULL, -- 'partner_signup', 'partner_approved', 'review_submitted', etc.
  workflow_steps JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  execution_count INTEGER DEFAULT 0,
  last_executed TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default partner categories
INSERT INTO partner_categories (category_code, category_name, description, sort_order) VALUES
('property-search', 'Property Search & Rental', 'Residential property finding and rental services', 1),
('luxury-moving', 'Luxury Moving Services', 'Premium moving and relocation services', 2),
('legal-immigration', 'Legal & Immigration', 'Visa, immigration and legal services', 3),
('financial-services', 'Financial Services', 'Banking, mortgages and financial advisory', 4),
('education-schools', 'Education & Schools', 'School search and education consultation', 5),
('healthcare-medical', 'Healthcare & Medical', 'Private healthcare and medical services', 6),
('transportation', 'Transportation Services', 'Car hire, chauffeur and transport services', 7),
('home-services', 'Home Services & Utilities', 'Utilities setup and home maintenance', 8),
('lifestyle-concierge', 'Lifestyle & Concierge', 'Personal services and lifestyle management', 9),
('pet-relocation', 'Pet Relocation', 'Pet transportation and boarding services', 10)
ON CONFLICT (category_code) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_partners_industry_category ON partners(industry_category);
CREATE INDEX IF NOT EXISTS idx_partners_service_areas ON partners USING GIN(service_areas);
CREATE INDEX IF NOT EXISTS idx_partners_approval_status ON partners(approval_status);
CREATE INDEX IF NOT EXISTS idx_partners_access_tiers ON partners USING GIN(access_tiers);
CREATE INDEX IF NOT EXISTS idx_partners_pricing_tier ON partners(pricing_tier);
CREATE INDEX IF NOT EXISTS idx_partners_quality_score ON partners(quality_score);
CREATE INDEX IF NOT EXISTS idx_partners_primary_location ON partners(primary_location);

CREATE INDEX IF NOT EXISTS idx_client_access_levels_user_id ON client_access_levels(user_id);
CREATE INDEX IF NOT EXISTS idx_client_access_levels_email ON client_access_levels(email);
CREATE INDEX IF NOT EXISTS idx_client_access_levels_access_tier ON client_access_levels(access_tier);

CREATE INDEX IF NOT EXISTS idx_partner_reviews_partner_id ON partner_reviews(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_reviews_is_published ON partner_reviews(is_published);

CREATE INDEX IF NOT EXISTS idx_partner_contact_requests_partner_id ON partner_contact_requests(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_contact_requests_status ON partner_contact_requests(status);

-- Enable RLS (Row Level Security)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_access_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Partners table policies
CREATE POLICY "Allow authenticated users to view approved partners" ON partners
  FOR SELECT USING (approval_status = 'approved');

CREATE POLICY "Allow admins full access to partners" ON partners
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Client access levels policies
CREATE POLICY "Users can view their own access level" ON client_access_levels
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Allow admins full access to access levels" ON client_access_levels
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Partner reviews policies
CREATE POLICY "Allow viewing published reviews" ON partner_reviews
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow admins full access to reviews" ON partner_reviews
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Contact requests policies
CREATE POLICY "Users can view their own contact requests" ON partner_contact_requests
  FOR SELECT USING (auth.uid()::text IN (
    SELECT user_id FROM client_access_levels WHERE email = partner_contact_requests.client_email
  ));

CREATE POLICY "Allow admins full access to contact requests" ON partner_contact_requests
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Categories are public
CREATE POLICY "Allow public read access to categories" ON partner_categories
  FOR SELECT USING (true);

-- Create trigger function for automated workflows
CREATE OR REPLACE FUNCTION trigger_partner_workflow()
RETURNS TRIGGER AS $$
BEGIN
  -- Trigger categorization workflow when new partner is inserted
  IF TG_OP = 'INSERT' THEN
    INSERT INTO automated_workflows (workflow_name, trigger_event, workflow_steps)
    VALUES (
      'partner_onboarding',
      'partner_signup',
      jsonb_build_object(
        'partner_id', NEW.id,
        'steps', jsonb_build_array(
          jsonb_build_object('action', 'categorize_partner', 'status', 'pending'),
          jsonb_build_object('action', 'verify_credentials', 'status', 'pending'),
          jsonb_build_object('action', 'assign_access_tiers', 'status', 'pending'),
          jsonb_build_object('action', 'send_welcome_email', 'status', 'pending')
        )
      )
    );
  END IF;
  
  -- Trigger approval workflow when status changes to approved
  IF TG_OP = 'UPDATE' AND OLD.approval_status != 'approved' AND NEW.approval_status = 'approved' THEN
    INSERT INTO automated_workflows (workflow_name, trigger_event, workflow_steps)
    VALUES (
      'partner_approval',
      'partner_approved',
      jsonb_build_object(
        'partner_id', NEW.id,
        'steps', jsonb_build_array(
          jsonb_build_object('action', 'update_directory_visibility', 'status', 'pending'),
          jsonb_build_object('action', 'send_approval_email', 'status', 'pending'),
          jsonb_build_object('action', 'notify_relevant_clients', 'status', 'pending')
        )
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER partner_workflow_trigger
  AFTER INSERT OR UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION trigger_partner_workflow();

-- Create function to update partner ratings when reviews are added
CREATE OR REPLACE FUNCTION update_partner_ratings()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_published = true THEN
    UPDATE partners SET
      client_rating = (
        SELECT AVG(overall_rating)::DECIMAL(3,2)
        FROM partner_reviews
        WHERE partner_id = NEW.partner_id AND is_published = true
      ),
      total_reviews = (
        SELECT COUNT(*)
        FROM partner_reviews
        WHERE partner_id = NEW.partner_id AND is_published = true
      ),
      updated_at = NOW()
    WHERE id = NEW.partner_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rating updates
CREATE TRIGGER update_partner_ratings_trigger
  AFTER INSERT OR UPDATE ON partner_reviews
  FOR EACH ROW EXECUTE FUNCTION update_partner_ratings();

-- Create function to reset monthly contact usage
CREATE OR REPLACE FUNCTION reset_monthly_contacts()
RETURNS void AS $$
BEGIN
  UPDATE client_access_levels 
  SET monthly_contacts_used = 0
  WHERE subscription_status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at triggers
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE
    ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_access_levels_updated_at BEFORE UPDATE
    ON client_access_levels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_reviews_updated_at BEFORE UPDATE
    ON partner_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_contact_requests_updated_at BEFORE UPDATE
    ON partner_contact_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
