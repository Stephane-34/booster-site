-- Ajoute une date de début d'Académie séparée de la date d'inscription
-- Supabase. Objectif : pouvoir décaler artificiellement le point de départ
-- d'un utilisateur (backfill des existants à "il y a 14 mois" pour les
-- traiter comme des admins ayant tout débloqué, boost promo, réinitialisation
-- ponctuelle…) sans jamais toucher à auth.users.
--
-- Toute la logique de déblocage côté client lit désormais cette colonne
-- (via useAcademyProgress) et non plus user.created_at.

alter table public.profiles
  add column if not exists academy_start_date timestamptz;

-- Backfill : les comptes déjà présents sont datés à il y a 14 mois pour
-- qu'ils accèdent à toutes les semaines immédiatement.
update public.profiles
   set academy_start_date = now() - interval '14 months'
 where academy_start_date is null;

-- Sécurité : ne peut plus être NULL après le backfill.
alter table public.profiles
  alter column academy_start_date set not null,
  alter column academy_start_date set default now();

-- Trigger : pour les nouveaux comptes, academy_start_date = now() (parcours normal).
-- On étend handle_new_user sans casser le comportement existant (first_name, etc.).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, age, full_name, academy_start_date)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    nullif(new.raw_user_meta_data->>'age', '')::int,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      trim(concat_ws(' ',
        new.raw_user_meta_data->>'first_name',
        new.raw_user_meta_data->>'last_name'
      ))
    ),
    now()
  );

  insert into public.user_progress (user_id)
  values (new.id);

  return new;
end;
$$;
