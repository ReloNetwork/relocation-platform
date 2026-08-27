create table if not exists public.partner_sales_leads (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  status text not null default 'new' check (
    status in ('new', 'reviewing', 'discovery_booked', 'proposal_sent', 'negotiating', 'won', 'nurture', 'declined')
  ),
  lead_quality text not null check (lead_quality in ('priority', 'qualified', 'nurture')),
  fit_score integer not null check (fit_score between 0 and 10),
  name text not null,
  email text not null,
  role text not null,
  company text not null,
  website text,
  service_category text not null,
  partnership_interest text not null,
  audience_fit text not null,
  objective text not null,
  budget text not null,
  timing text not null,
  message text not null,
  source text not null default 'partner_application',
  media_pack_version text not null,
  media_pack_status text not null default 'pending',
  notification_status text not null default 'pending',
  estimated_value_gbp integer,
  next_action_at timestamptz,
  notes text,
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partner_sales_leads_created_at_idx
  on public.partner_sales_leads (created_at desc);
create index if not exists partner_sales_leads_pipeline_idx
  on public.partner_sales_leads (status, lead_quality, created_at desc);
create index if not exists partner_sales_leads_email_idx
  on public.partner_sales_leads (lower(email));

alter table public.partner_sales_leads enable row level security;

revoke all on table public.partner_sales_leads from anon, authenticated;
grant select, insert, update, delete on table public.partner_sales_leads to service_role;

comment on table public.partner_sales_leads is
  'Qualified editorial and professional-network partnership enquiries and their sales status.';
