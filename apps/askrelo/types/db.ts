export interface Organization {
  id: string
  name: string
  type: 'corporate' | 'family' | 'individual'
  created_at: string
  updated_at: string
}

export interface OrganizationMembership {
  id: string
  org_id: string
  user_id: string
  role: 'admin' | 'client' | 'member'
  created_at: string
  updated_at: string
}

export interface MoveCase {
  id: string
  org_id: string
  client_user_id: string
  origin_city: string
  destination_city: string
  move_date: string
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled'
  service_tier: 'ai_concierge' | 'managed' | 'executive'
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  move_case_id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  move_case_id: string
  title: string
  description: string
  start_time: string
  end_time: string
  type: 'consultation' | 'viewing' | 'inspection' | 'meeting'
  status: 'scheduled' | 'completed' | 'cancelled'
  provider: string | null
  calendar_event_id: string | null
  created_at: string
  updated_at: string
}

export interface AppointmentWebhook {
  id: string
  event_type: string
  invitee_email: string
  raw_payload: any
  processed: boolean
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  move_case_id: string
  name: string
  file_path: string
  file_type: string
  file_size: number
  category: 'visa' | 'housing' | 'contract' | 'insurance' | 'other'
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string | null
  created_at: string
  updated_at: string
}

// Helper types for joins
export interface OrganizationWithMemberships extends Organization {
  memberships: OrganizationMembership[]
}

export interface MoveCaseWithDetails extends MoveCase {
  tasks: Task[]
  appointments: Appointment[]
  documents: Document[]
  organization: Organization
}

export interface UserWithOrganizations extends User {
  memberships: (OrganizationMembership & {
    organization: Organization
  })[]
}