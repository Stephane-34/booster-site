-- Enrichit le formulaire d'inscription : civilité, date de naissance,
-- téléphone, opt-in newsletter. La colonne `age` reste (rétro-compat) mais
-- est désormais dérivée de `birth_date` à l'inscription pour ne plus être
-- saisie manuellement.

alter table public.profiles
  add column if not exists gender             text        check (gender in ('monsieur','madame')),
  add column if not exists birth_date         date,
  add column if not exists phone              text,
  add column if not exists newsletter_opt_in  boolean     not null default false;

-- Met à jour le trigger d'inscription pour propager les nouveaux champs
-- depuis raw_user_meta_data. `age` est calculé à partir de birth_date, tout
-- en gardant le fallback string 'age' pour les comptes historiques.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_birth_date date;
  v_age        int;
begin
  v_birth_date := nullif(new.raw_user_meta_data->>'birth_date', '')::date;
  v_age := case
    when v_birth_date is not null
      then extract(year from age(current_date, v_birth_date))::int
    else nullif(new.raw_user_meta_data->>'age', '')::int
  end;

  insert into public.profiles (
    id, first_name, last_name, full_name,
    gender, birth_date, phone, newsletter_opt_in,
    age, academy_start_date
  )
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    coalesce(
      new.raw_user_meta_data->>'full_name',
      trim(concat_ws(' ',
        new.raw_user_meta_data->>'first_name',
        new.raw_user_meta_data->>'last_name'
      ))
    ),
    new.raw_user_meta_data->>'gender',
    v_birth_date,
    new.raw_user_meta_data->>'phone',
    coalesce((new.raw_user_meta_data->>'newsletter_opt_in')::boolean, false),
    v_age,
    now()
  );

  insert into public.user_progress (user_id)
  values (new.id);

  return new;
end;
$$;
