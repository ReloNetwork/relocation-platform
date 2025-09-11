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