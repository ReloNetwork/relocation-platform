create extension if not exists "pgcrypto";

create table if not exists public.audience_intake (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  source          text default 'join',
  name            text not null,
  email           text not null check (position('@' in email) > 1),
  role            text not null check (role in ('Professional','Entrepreneur','Executive')),
  desired_outcome text,
  frustration     text,
  price_point     text,
  extra           text
);

create index if not exists audience_intake_created_idx on public.audience_intake (created_at desc);
create index if not exists audience_intake_email_idx   on public.audience_intake (lower(email));

alter table public.audience_intake enable row level security;  -- service role bypasses RLS (safe for server inserts)