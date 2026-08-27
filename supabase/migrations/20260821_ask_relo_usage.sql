create table if not exists public.ask_relo_usage (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists ask_relo_usage_session_idx
  on public.ask_relo_usage (session_id, created_at desc);
create index if not exists ask_relo_usage_ip_idx
  on public.ask_relo_usage (ip_hash, created_at desc);

alter table public.ask_relo_usage enable row level security;

revoke all on table public.ask_relo_usage from anon, authenticated;
grant select, insert, update, delete on table public.ask_relo_usage to service_role;

create or replace function public.consume_ask_relo_question(
  p_session_id uuid,
  p_ip_hash text,
  p_session_limit integer default 3,
  p_daily_limit integer default 20
)
returns table (allowed boolean, remaining integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  session_uses integer;
  daily_uses integer;
begin
  perform pg_advisory_xact_lock(hashtext(p_ip_hash));

  select count(*) into session_uses
  from public.ask_relo_usage
  where session_id = p_session_id;

  select count(*) into daily_uses
  from public.ask_relo_usage
  where ip_hash = p_ip_hash
    and created_at >= date_trunc('day', now());

  if session_uses >= p_session_limit or daily_uses >= p_daily_limit then
    return query select false, 0;
    return;
  end if;

  insert into public.ask_relo_usage (session_id, ip_hash)
  values (p_session_id, p_ip_hash);

  return query select true, greatest(p_session_limit - session_uses - 1, 0);
end;
$$;

revoke all on function public.consume_ask_relo_question(uuid, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_ask_relo_question(uuid, text, integer, integer)
  to service_role;

comment on table public.ask_relo_usage is
  'Privacy-preserving usage counters for the complimentary Ask Relo preview.';
