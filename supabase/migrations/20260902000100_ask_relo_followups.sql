-- Consented Ask Relo follow-ups and privacy-minimised Retell call events.
create table if not exists public.ask_relo_followups (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  email text not null,
  channel text not null default 'email' check (channel in ('email')),
  conversation jsonb not null default '[]'::jsonb,
  delivery_status text not null default 'pending' check (
    delivery_status in ('pending', 'sent', 'failed')
  ),
  consented_at timestamptz not null,
  created_at timestamptz not null default now()
);

create unique index if not exists ask_relo_followups_session_unique_idx
  on public.ask_relo_followups (session_id);
create index if not exists ask_relo_followups_email_idx
  on public.ask_relo_followups (lower(email), created_at desc);

alter table public.ask_relo_followups enable row level security;
revoke all on table public.ask_relo_followups from anon, authenticated;
grant select, insert, update, delete on table public.ask_relo_followups to service_role;

comment on table public.ask_relo_followups is
  'Explicitly consented Ask Relo email follow-ups; no IP address or hidden profile data.';

create table if not exists public.retell_call_events (
  id uuid primary key default gen_random_uuid(),
  event_key text unique not null,
  event_type text not null,
  call_id text not null,
  agent_id text,
  session_id uuid,
  started_at timestamptz,
  ended_at timestamptz,
  disconnection_reason text,
  analysis jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists retell_call_events_call_idx
  on public.retell_call_events (call_id, created_at desc);
create index if not exists retell_call_events_session_idx
  on public.retell_call_events (session_id, created_at desc);

alter table public.retell_call_events enable row level security;
revoke all on table public.retell_call_events from anon, authenticated;
grant select, insert, update, delete on table public.retell_call_events to service_role;

comment on table public.retell_call_events is
  'Verified Retell lifecycle and analysis events without raw call audio or transcripts.';

alter table public.commercial_events
  drop constraint if exists commercial_events_event_check;
alter table public.commercial_events
  add constraint commercial_events_event_check check (event in (
    'newsletter_submitted',
    'landing_list_submitted',
    'ask_relo_question_answered',
    'ask_relo_limit_reached',
    'ask_relo_summary_requested',
    'ask_relo_move_handoff_started',
    'move_review_opened',
    'relocation_intake_started',
    'relocation_intake_submitted',
    'partner_application_started',
    'partner_application_submitted',
    'partner_media_pack_viewed',
    'qualification_call_booked',
    'proposal_sent',
    'commercial_win_recorded'
  ));
