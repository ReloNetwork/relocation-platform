import type { SupabaseClient } from '@supabase/supabase-js';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createServiceClient } from '@/lib/supabase/service';

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'client' | 'concierge' | 'supplier' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'client' | 'concierge' | 'supplier' | 'admin';
        };
        Update: {
          email?: string;
          role?: 'client' | 'concierge' | 'supplier' | 'admin';
        };
      };
      orgs: {
        Row: {
          id: string;
          name: string;
          type: 'individual' | 'corporate';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          type?: 'individual' | 'corporate';
        };
        Update: {
          name?: string;
          type?: 'individual' | 'corporate';
        };
      };
      org_memberships: {
        Row: {
          id: string;
          user_id: string;
          org_id: string;
          role: 'admin' | 'member' | 'client' | 'concierge';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          org_id: string;
          role?: 'admin' | 'member' | 'client' | 'concierge';
        };
        Update: {
          role?: 'admin' | 'member' | 'client' | 'concierge';
        };
      };
      client_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          phone: string | null;
          timezone: string;
          household_json: any;
          preferences_json: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          full_name?: string;
          phone?: string;
          timezone?: string;
          household_json?: any;
          preferences_json?: any;
        };
        Update: {
          full_name?: string;
          phone?: string;
          timezone?: string;
          household_json?: any;
          preferences_json?: any;
        };
      };
      move_cases: {
        Row: {
          id: string;
          org_id: string;
          client_user_id: string;
          concierge_id: string | null;
          route_from: string;
          route_to: string;
          move_date: string | null;
          status: 'intake' | 'scoping' | 'quoting' | 'booked' | 'in_transit' | 'settling' | 'complete' | 'on_hold';
          sla_next_action_at: string | null;
          budget_range: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          org_id: string;
          client_user_id: string;
          concierge_id?: string;
          route_from: string;
          route_to: string;
          move_date?: string;
          status?: 'intake' | 'scoping' | 'quoting' | 'booked' | 'in_transit' | 'settling' | 'complete' | 'on_hold';
          sla_next_action_at?: string;
          budget_range?: string;
          notes?: string;
        };
        Update: {
          concierge_id?: string;
          route_from?: string;
          route_to?: string;
          move_date?: string;
          status?: 'intake' | 'scoping' | 'quoting' | 'booked' | 'in_transit' | 'settling' | 'complete' | 'on_hold';
          sla_next_action_at?: string;
          budget_range?: string;
          notes?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          move_case_id: string;
          title: string;
          description: string | null;
          assignee_role: 'client' | 'concierge' | 'supplier';
          assignee_id: string | null;
          due_date: string | null;
          status: 'todo' | 'doing' | 'blocked' | 'done';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          move_case_id: string;
          title: string;
          description?: string;
          assignee_role: 'client' | 'concierge' | 'supplier';
          assignee_id?: string;
          due_date?: string;
          status?: 'todo' | 'doing' | 'blocked' | 'done';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
        };
        Update: {
          title?: string;
          description?: string;
          assignee_role?: 'client' | 'concierge' | 'supplier';
          assignee_id?: string;
          due_date?: string;
          status?: 'todo' | 'doing' | 'blocked' | 'done';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
        };
      };
      suppliers: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          category: 'mover' | 'housing' | 'local_expert' | 'visa' | 'legal' | 'financial' | 'other';
          description: string | null;
          rating: number;
          contact_json: any;
          coverage_areas: string[];
          insurance_million: number | null;
          memberships: string[];
          website: string | null;
          logo_url: string | null;
          is_visible: boolean;
          status: 'pending' | 'approved' | 'rejected' | 'sponsored';
          featured_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string;
          name: string;
          category: 'mover' | 'housing' | 'local_expert' | 'visa' | 'legal' | 'financial' | 'other';
          description?: string;
          rating?: number;
          contact_json?: any;
          coverage_areas?: string[];
          insurance_million?: number;
          memberships?: string[];
          website?: string;
          logo_url?: string;
          is_visible?: boolean;
          status?: 'pending' | 'approved' | 'rejected' | 'sponsored';
          featured_until?: string;
        };
        Update: {
          name?: string;
          category?: 'mover' | 'housing' | 'local_expert' | 'visa' | 'legal' | 'financial' | 'other';
          description?: string;
          rating?: number;
          contact_json?: any;
          coverage_areas?: string[];
          insurance_million?: number;
          memberships?: string[];
          website?: string;
          logo_url?: string;
          is_visible?: boolean;
          status?: 'pending' | 'approved' | 'rejected' | 'sponsored';
          featured_until?: string;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          current_location: string | null;
          target_location: string | null;
          move_timeframe: string | null;
          source: string;
          status: 'active' | 'converted' | 'unsubscribed';
          created_at: string;
        };
        Insert: {
          email: string;
          full_name?: string;
          current_location?: string;
          target_location?: string;
          move_timeframe?: string;
          source?: string;
          status?: 'active' | 'converted' | 'unsubscribed';
        };
        Update: {
          full_name?: string;
          current_location?: string;
          target_location?: string;
          move_timeframe?: string;
          source?: string;
          status?: 'active' | 'converted' | 'unsubscribed';
        };
      };
      appointments: {
        Row: {
          id: string;
          move_case_id: string;
          title: string;
          description: string | null;
          start_time: string;
          end_time: string;
          location: string | null;
          cal_external_id: string | null;
          created_by: string | null;
          attendees_json: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          move_case_id: string;
          title: string;
          description?: string;
          start_time: string;
          end_time: string;
          location?: string;
          cal_external_id?: string;
          created_by?: string;
          attendees_json?: any;
        };
        Update: {
          title?: string;
          description?: string;
          start_time?: string;
          end_time?: string;
          location?: string;
          cal_external_id?: string;
          created_by?: string;
          attendees_json?: any;
        };
      };
      messages: {
        Row: {
          id: string;
          case_id: string;
          body: string;
          sender: 'client' | 'concierge' | 'system';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          case_id: string;
          body: string;
          sender?: 'client' | 'concierge' | 'system';
        };
        Update: {
          body?: string;
          sender?: 'client' | 'concierge' | 'system';
        };
      };
    };
  };
};

// Client-side Supabase client  
export function createClientSupabase(): SupabaseClient<Database> {
  return createClientComponentClient<Database>();
}

// Server-side Supabase client
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
}

// Re-export the new SSR clients for consistency
export { createClient as createBrowserClient } from '@/lib/supabase/client';
export { createClient as createServerClient } from '@/lib/supabase/server';

// Service-role routes currently span several legacy schemas that are not
// represented by the stale handwritten Database type above. Keep this client
// untyped until the type is regenerated from the live Supabase project.
export function createServiceSupabase(): SupabaseClient<any> {
  return createServiceClient();
}
