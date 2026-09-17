-- Le parcours de l'Académie se cale désormais sur les JOURS RÉELS de la
-- semaine : lundi = module 1, mardi = module 2, … samedi = module 6, dimanche
-- au repos.
--
-- Conséquence : `academy_start_date` ne peut plus valoir `now()`. Si un
-- utilisateur s'inscrit un jeudi, son « lundi » tomberait un jeudi et tout le
-- calendrier serait décalé d'un utilisateur à l'autre. La colonne contient
-- maintenant LE LUNDI À PARTIR DUQUEL le parcours commence :
--   - inscription un lundi  -> le jour même ;
--   - inscription mardi→dimanche -> le lundi suivant.
--
-- Le front affiche un écran d'attente tant que ce lundi n'est pas atteint
-- (cf. utils/academyCalendar.js et la section "Ma semaine en cours").
--
-- Fuseau : tous les calculs passent par Europe/Paris et non par l'UTC du
-- serveur. Sans cela, une inscription un dimanche à 23h30 heure de Paris
-- serait vue comme un lundi 22h30 UTC, et l'utilisateur démarrerait une
-- semaine trop tôt.

-- ─── Fonction utilitaire ────────────────────────────────────────────────────
-- Isolée pour être réutilisable (back-office, décalage manuel d'un compte)
-- et pour que le trigger reste lisible.
create or replace function public.academy_start_monday(p_at timestamptz default now())
returns timestamptz
language sql
-- STABLE et non IMMUTABLE : le résultat dépend de la base de fuseaux horaires
-- du serveur (et de now() via l'argument par défaut). Déclarer IMMUTABLE
-- autoriserait le planificateur à pré-calculer la valeur, ce qui figerait le
-- lundi de démarrage sur un plan mis en cache.
stable
as $$
  select timezone(
    'Europe/Paris',
    date_trunc('week', timezone('Europe/Paris', p_at))
    + case
        -- isodow : 1 = lundi … 7 = dimanche. date_trunc('week') renvoyant déjà
        -- le lundi de la semaine en cours, on n'ajoute une semaine que si
        -- l'inscription a lieu après le lundi.
        when extract(isodow from timezone('Europe/Paris', p_at)) > 1
          then interval '1 week'
        else interval '0'
      end
  );
$$;

comment on function public.academy_start_monday(timestamptz) is
  'Lundi (00:00 Europe/Paris) à partir duquel démarre le parcours Académie '
  'd''un utilisateur inscrit à la date passée en argument.';

-- ─── Trigger d'inscription ──────────────────────────────────────────────────
-- Identique à la version précédente (20260804000001) à un détail près :
-- academy_start_date = academy_start_monday(now()) au lieu de now().
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
    public.academy_start_monday(now())
  );

  insert into public.user_progress (user_id)
  values (new.id);

  return new;
end;
$$;

-- ─── Recalage des comptes existants ─────────────────────────────────────────
-- Leur academy_start_date tombe sur un jour quelconque : on la ramène au lundi
-- de SA PROPRE semaine (et non au lundi suivant, qui leur ferait perdre des
-- modules déjà débloqués). Le décalage est d'au plus 6 jours, toujours vers le
-- passé : personne ne régresse.
update public.profiles
   set academy_start_date = timezone(
         'Europe/Paris',
         date_trunc('week', timezone('Europe/Paris', academy_start_date))
       )
 where academy_start_date is not null
   and extract(isodow from timezone('Europe/Paris', academy_start_date)) <> 1;

-- La valeur par défaut de la colonne doit suivre la même règle, au cas où une
-- ligne serait insérée sans passer par le trigger.
alter table public.profiles
  alter column academy_start_date set default public.academy_start_monday(now());
