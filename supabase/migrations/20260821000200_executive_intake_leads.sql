-- Active launch migration. The full timestamp is unique in Supabase migration history.
create table if not exists public.executive_intake_leads (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  status text not null default 'new' check (
    status in ('new', 'reviewing', 'qualified', 'call_booked', 'proposal_sent', 'won', 'nurture', 'closed')
  ),
  lead_quality text not null check (lead_quality in ('priority', 'qualified', 'nurture')),
  fit_score integer not null check (fit_score between 0 and 10),
  name text not null,
  email text not null,
  phone text,
  current_location text,
  move_date date not null,
  budget text not null,
  preferred_areas text[] not null default '{}',
  urgency text not null default 'normal',
  brief jsonb not null default '{}'::jsonb,
  notification_status text not null default 'pending',
  confirmation_status text not null default 'pending',
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists executive_intake_leads_created_at_idx
  on public.executive_intake_leads (created_at desc);
create index if not exists executive_intake_leads_status_idx
  on public.executive_intake_leads (status, lead_quality, created_at desc);
create index if not exists executive_intake_leads_email_idx
  on public.executive_intake_leads (lower(email));

alter table public.executive_intake_leads enable row level security;

revoke all on table public.executive_intake_leads from anon, authenticated;
grant select, insert, update, delete on table public.executive_intake_leads to service_role;

comment on table public.executive_intake_leads is
  'Qualification-first relocation briefs submitted through the public executive intake.';
