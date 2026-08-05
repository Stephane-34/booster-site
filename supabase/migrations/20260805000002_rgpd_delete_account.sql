-- RGPD - droit à l'oubli.
-- Fonction RPC `delete_current_user()` que l'utilisateur peut appeler pour
-- supprimer son propre compte. `security definer` permet à cette fonction
-- d'accéder à la table auth.users (interdite à l'anon key), en restant
-- limitée strictement à l'utilisateur connecté (auth.uid()).
--
-- Les données liées (profiles, academy_quiz_results, user_progress) sont
-- supprimées automatiquement grâce aux `on delete cascade` déjà en place.

create or replace function public.delete_current_user()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_uid uuid := auth.uid();
begin
  if current_uid is null then
    raise exception 'Not authenticated';
  end if;

  /* Supprime l'utilisateur de auth.users - le cascade fait le reste. */
  delete from auth.users where id = current_uid;
end;
$$;

-- Restreint l'appel : seul un utilisateur authentifié peut invoquer la RPC.
revoke all on function public.delete_current_user() from public;
grant  execute on function public.delete_current_user() to authenticated;
