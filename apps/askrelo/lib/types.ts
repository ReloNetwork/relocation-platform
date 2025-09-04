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
    }
  }
}