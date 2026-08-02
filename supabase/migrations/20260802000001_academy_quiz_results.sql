-- Persiste les résultats des quiz Académie par utilisateur.
-- Une ligne = (user × module) ; refaire un quiz écrase l'ancien score via UPSERT.
-- Le déblocage des phases et modules est ensuite calculé côté client à partir
-- de cette table + de auth.users.created_at (source de la date d'inscription).

create table if not exists public.academy_quiz_results (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  module_id    text not null,                    -- 'day-0', 'day-1', … puis 'w2-day-0' quand le corpus s'étoffera
  score        int  not null check (score >= 0),
  total        int  not null check (total > 0),
  details      jsonb not null,                   -- même forme que le state `completed[id].details` côté React
  title        text not null,                    -- dupliqué pour éviter une jointure au chargement de la Bibliothèque
  theme        text not null,
  completed_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, module_id)
);

create index if not exists academy_quiz_results_user_id_idx
  on public.academy_quiz_results (user_id);

create index if not exists academy_quiz_results_completed_at_idx
  on public.academy_quiz_results (user_id, completed_at desc);

-- Trigger updated_at pour tracer les re-tentatives.
create or replace function public.academy_quiz_results_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists academy_quiz_results_touch
  on public.academy_quiz_results;

create trigger academy_quiz_results_touch
  before update on public.academy_quiz_results
  for each row execute function public.academy_quiz_results_touch_updated_at();

-- Row Level Security : chaque user ne voit et ne modifie que ses résultats.
alter table public.academy_quiz_results enable row level security;

drop policy if exists "read own academy results"    on public.academy_quiz_results;
drop policy if exists "insert own academy results"  on public.academy_quiz_results;
drop policy if exists "update own academy results"  on public.academy_quiz_results;
drop policy if exists "delete own academy results"  on public.academy_quiz_results;

create policy "read own academy results"
  on public.academy_quiz_results
  for select using (auth.uid() = user_id);

create policy "insert own academy results"
  on public.academy_quiz_results
  for insert with check (auth.uid() = user_id);

create policy "update own academy results"
  on public.academy_quiz_results
  for update using (auth.uid() = user_id);

create policy "delete own academy results"
  on public.academy_quiz_results
  for delete using (auth.uid() = user_id);
