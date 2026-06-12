-- Étend la table profiles avec prénom / nom / âge collectés à l'inscription
-- et met à jour le trigger handle_new_user pour les enregistrer.

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name  text,
  add column if not exists age        int check (age between 13 and 120);

-- Recréation du trigger : on récupère first_name / last_name / age depuis user_metadata.
-- On garde le fallback full_name pour ne pas casser les comptes déjà créés.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, age, full_name)
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
    )
  );

  insert into public.user_progress (user_id)
  values (new.id);

  return new;
end;
$$;
