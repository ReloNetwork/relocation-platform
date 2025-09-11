export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'client' | 'concierge' | 'supplier' | 'admin'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'client' | 'concierge' | 'supplier' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'client' | 'concierge' | 'supplier' | 'admin'
          created_at?: string
        }
      }
      move_cases: {
        Row: {
          id: string
          client_id: string
          concierge_id: string | null
          route_from: string | null
          route_to: string | null
          move_date: string | null
          status: 'intake' | 'scoping' | 'quoting' | 'booked' | 'in_transit' | 'settling' | 'complete' | 'on_hold'
          sla_next_action_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          concierge_id?: string | null
          route_from?: string | null
          route_to?: string | null
          move_date?: string | null
          status?: 'intake' | 'scoping' | 'quoting' | 'booked' | 'in_transit' | 'settling' | 'complete' | 'on_hold'
          sla_next_action_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          concierge_id?: string | null
          route_from?: string | null
          route_to?: string | null
          move_date?: string | null
          status?: 'intake' | 'scoping' | 'quoting' | 'booked' | 'in_transit' | 'settling' | 'complete' | 'on_hold'
          sla_next_action_at?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          case_id: string
          title: string
          starts_at: string
          ends_at: string
          location: string | null
          cal_external_id: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          title: string
          starts_at: string
          ends_at: string
          location?: string | null
          cal_external_id?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          title?: string
          starts_at?: string
          ends_at?: string
          location?: string | null
          cal_external_id?: string | null
          created_by?: string
          created_at?: string
        }
      }
      partner_applications: {
        Row: {
          id: number
          company_name: string
          service_type: string
          contact_name: string
          contact_title: string
          phone: string
          email: string
          website: string | null
          territory: string
          monthly_leads: string
          marketing_spend: string
          experience: string
          specializations: string
          why_partner: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          company_name: string
          service_type: string
          contact_name: string
          contact_title: string
          phone: string
          email: string
          website?: string | null
          territory: string
          monthly_leads: string
          marketing_spend: string
          experience: string
          specializations: string
          why_partner: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          company_name?: string
          service_type?: string
          contact_name?: string
          contact_title?: string
          phone?: string
          email?: string
          website?: string | null
          territory?: string
          monthly_leads?: string
          marketing_spend?: string
          experience?: string
          specializations?: string
          why_partner?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      consultations: {
        Row: {
          id: number
          consultation_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          company_name: string
          job_title: string
          relocation_timeline: string
          destination_city: string
          current_location: string | null
          budget: string
          property_type: string
          bedrooms: string
          family_members: string
          children_ages: string | null
          school_preferences: string | null
          employment_assistance: string | null
          priorities: string
          additional_requirements: string | null
          how_heard: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          consultation_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          company_name: string
          job_title: string
          relocation_timeline: string
          destination_city: string
          current_location?: string | null
          budget: string
          property_type: string
          bedrooms: string
          family_members: string
          children_ages?: string | null
          school_preferences?: string | null
          employment_assistance?: string | null
          priorities: string
          additional_requirements?: string | null
          how_heard?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          consultation_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          company_name?: string
          job_title?: string
          relocation_timeline?: string
          destination_city?: string
          current_location?: string | null
          budget?: string
          property_type?: string
          bedrooms?: string
          family_members?: string
          children_ages?: string | null
          school_preferences?: string | null
          employment_assistance?: string | null
          priorities?: string
          additional_requirements?: string | null
          how_heard?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      directory_signups: {
        Row: {
          id: number
          signup_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          company_name: string
          job_title: string
          company_size: string
          industry_type: string
          access_tier: string
          service_needs: string[]
          urgency_level: string
          budget: string
          london_areas: string[]
          current_challenges: string
          specific_requirements: string | null
          how_heard: string | null
          marketing_consent: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          signup_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          company_name: string
          job_title: string
          company_size: string
          industry_type: string
          access_tier: string
          service_needs: string[]
          urgency_level: string
          budget: string
          london_areas: string[]
          current_challenges: string
          specific_requirements?: string | null
          how_heard?: string | null
          marketing_consent?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          signup_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          company_name?: string
          job_title?: string
          company_size?: string
          industry_type?: string
          access_tier?: string
          service_needs?: string[]
          urgency_level?: string
          budget?: string
          london_areas?: string[]
          current_challenges?: string
          specific_requirements?: string | null
          how_heard?: string | null
          marketing_consent?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Form data interfaces
export interface PartnerApplicationFormData {
  companyName: string
  serviceType: string
  contactName: string
  contactTitle: string
  phone: string
  email: string
  website?: string
  territory: string
  monthlyLeads: string
  marketingSpend: string
  experience: string
  specializations: string
  whyPartner: string
}

export interface ConsultationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  jobTitle: string
  relocationTimeline: string
  destinationCity: string
  currentLocation?: string
  budget: string
  propertyType: string
  bedrooms: string
  familyMembers: string
  childrenAges?: string
  schoolPreferences?: string
  employmentAssistance?: string
  priorities: string
  additionalRequirements?: string
  howHeard?: string
}

export interface DirectorySignupFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  jobTitle: string
  companySize: string
  industryType: string
  accessTier: string
  serviceNeeds: string[]
  urgencyLevel: string
  budget: string
  londonAreas: string[]
  currentChallenges: string
  specificRequirements?: string
  howHeard?: string
  marketingConsent: boolean
}

// Partner and Directory System Interfaces
export interface PartnerOnboardingFormData {
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  website?: string
  businessDescription: string
  foundedYear?: number
  companySize: string
  primaryLocation: string
  serviceAreas: string[]
  coverageZones: string[]
  postcodeCoverage?: string[]
  industryCategory: string
  serviceCategories: string[]
  specializations: string[]
  businessType: string
  insuranceCoverage?: any
  certifications?: string[]
  regulatoryBodies?: string[]
  vatNumber?: string
  companyRegistration?: string
  pricingTier: string
  minimumProjectValue?: number
  maximumProjectValue?: number
  monthlyCapacity?: number
  currentAvailability: string
}

export interface Partner {
  id: number
  partner_id: string
  company_name: string
  contact_name: string
  contact_email: string
  contact_phone: string
  website?: string
  business_description: string
  founded_year?: number
  company_size: string
  primary_location: string
  service_areas: string[]
  coverage_zones: string[]
  postcode_coverage?: string[]
  industry_category: string
  service_categories: string[]
  specializations: string[]
  business_type: string
  insurance_coverage?: any
  certifications?: string[]
  regulatory_bodies?: string[]
  vat_number?: string
  company_registration?: string
  pricing_tier: string
  minimum_project_value?: number
  maximum_project_value?: number
  currency: string
  monthly_capacity?: number
  current_availability: string
  approval_status: 'pending' | 'approved' | 'rejected' | 'suspended'
  quality_score: number
  client_rating: number
  total_reviews: number
  completion_rate: number
  response_time_hours: number
  visibility_level: 'basic' | 'premium' | 'vip' | 'featured'
  access_tiers: string[]
  featured_until?: string
  premium_until?: string
  onboarded_by?: string
  approved_by?: string
  approved_at?: string
  last_contact_date?: string
  notes?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface ClientAccessLevel {
  id: number
  user_id: string
  email: string
  access_tier: 'free' | 'premium' | 'vip'
  company_name?: string
  subscription_status: 'active' | 'cancelled' | 'expired' | 'trial'
  subscription_start_date?: string
  subscription_end_date?: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  can_view_contact_details: boolean
  can_view_pricing: boolean
  can_view_reviews: boolean
  can_contact_directly: boolean
  can_request_quotes: boolean
  monthly_contact_limit: number
  monthly_contacts_used: number
  last_login?: string
  total_searches: number
  total_contacts: number
  created_at: string
  updated_at: string
}

export interface PartnerReview {
  id: number
  partner_id: number
  client_email: string
  client_name?: string
  client_company?: string
  overall_rating: number
  quality_rating?: number
  communication_rating?: number
  timeliness_rating?: number
  value_rating?: number
  review_title?: string
  review_text?: string
  project_type?: string
  project_value_range?: string
  would_recommend?: boolean
  is_verified: boolean
  verification_method?: string
  verified_at?: string
  verified_by?: string
  is_published: boolean
  moderation_status: 'pending' | 'approved' | 'rejected'
  moderated_by?: string
  moderated_at?: string
  moderation_notes?: string
  created_at: string
  updated_at: string
}

export interface PartnerContactRequest {
  id: number
  partner_id: number
  client_email: string
  client_name?: string
  client_phone?: string
  client_company?: string
  request_type: 'quote' | 'consultation' | 'info' | 'urgent'
  project_description?: string
  project_timeline?: string
  estimated_budget?: string
  preferred_contact_method?: string
  urgency_level: 'low' | 'normal' | 'high' | 'urgent'
  status: 'sent' | 'viewed' | 'responded' | 'completed' | 'expired'
  partner_response?: string
  partner_responded_at?: string
  client_rating?: number
  client_access_tier: string
  was_premium_contact: boolean
  created_at: string
  updated_at: string
}

export interface AutomatedWorkflow {
  id: number
  workflow_name: string
  trigger_event: string
  workflow_steps: any
  is_active: boolean
  execution_count: number
  last_executed?: string
  created_at: string
}

export interface PartnerCategory {
  id: number
  category_code: string
  category_name: string
  description?: string
  parent_category?: string
  icon_name?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

// Access Permissions Interface
export interface AccessPermissions {
  canViewContactDetails: boolean
  canViewPricing: boolean
  canViewReviews: boolean
  canContactDirectly: boolean
  canRequestQuotes: boolean
  monthlyContactLimit: number
  accessibleCategories: string[]
  maxSearchResults: number
  canViewPremiumPartners: boolean
  hasPersonalAccountManager?: boolean
  prioritySupport?: boolean
}

// Workflow Execution Interfaces
export interface WorkflowExecutionData {
  workflowType: string
  partnerId?: number
  clientEmail?: string
  triggerEvent: string
  metadata?: any
}

export interface WorkflowStep {
  step: string
  status: 'pending' | 'completed' | 'failed'
  timestamp?: Date
  details?: any
  error?: any
}