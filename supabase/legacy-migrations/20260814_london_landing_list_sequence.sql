-- Historical Resend sequence retained for reference. Beehiiv is authoritative for the redesigned launch.
create table if not exists public.london_landing_list_leads (id uuid primary key default gen_random_uuid(),email text unique not null,source text default 'website',next_email_index integer default 1,next_send_at timestamptz,created_at timestamptz default now(),updated_at timestamptz default now());
alter table public.london_landing_list_leads enable row level security;
