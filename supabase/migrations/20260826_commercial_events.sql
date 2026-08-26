create table if not exists public.commercial_events (
  id uuid primary key default gen_random_uuid(),
  event text not null check (event in (
    'newsletter_submitted',
    'landing_list_submitted',
    'ask_relo_question_answered',
    'ask_relo_limit_reached',
    'relocation_intake_started',
    'relocation_intake_submitted',
    'partner_application_started',
    'partner_application_submitted',
    'partner_media_pack_viewed',
    'qualification_call_booked',
    'proposal_sent',
    'commercial_win_recorded'
  )),
  journey text not null check (journey in ('newsletter', 'ask_relo', 'relocation', 'partner')),
  session_id uuid not null,
  path text not null,
  referrer_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists commercial_events_created_at_idx
  on public.commercial_events (created_at desc);
create index if not exists commercial_events_funnel_idx
  on public.commercial_events (journey, event, created_at desc);
create index if not exists commercial_events_campaign_idx
  on public.commercial_events (utm_source, utm_campaign, created_at desc);

alter table public.commercial_events enable row level security;

comment on table public.commercial_events is
  'Privacy-minimised conversion events without contact details, chat text or form content.';
