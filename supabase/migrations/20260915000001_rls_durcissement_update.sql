-- Durcissement des policies UPDATE.
--
-- Deux problèmes distincts corrigés ici.
--
-- 1) Les policies UPDATE existantes n'ont qu'un `using`, pas de `with check`.
--    `using` filtre les lignes visibles AVANT modification ; `with check` valide
--    la ligne APRÈS modification. Sans lui, un utilisateur authentifié peut
--    réassigner une de ses lignes à quelqu'un d'autre :
--
--      update academy_quiz_results set user_id = '<victime>' where user_id = auth.uid();
--
--    ce qui injecte ses résultats dans le compte d'un tiers. On ajoute donc le
--    `with check` symétrique sur les trois tables concernées.
--
-- 2) Sur `profiles`, la policy autorise la modification de TOUTES les colonnes,
--    y compris `plan` et `academy_start_date` qui pilotent respectivement l'offre
--    souscrite et le déblocage des 52 semaines d'Académie. Un utilisateur peut
--    donc s'auto-attribuer le plan payant et débloquer tout le contenu depuis la
--    console du navigateur. Ces deux colonnes sont administratives : on retire le
--    droit UPDATE au rôle `authenticated` au niveau des privilèges SQL, ce qui
--    prime sur la policy RLS.

-- ─── profiles ───────────────────────────────────────────────────────────────
drop policy if exists "Modification profil personnel" on public.profiles;

create policy "Modification profil personnel"
  on public.profiles for update
  using      (auth.uid() = id)
  with check (auth.uid() = id);

-- Restriction au niveau des privilèges SQL, en complément de la policy RLS.
-- Important : un `revoke update (colonne)` est sans effet tant que le rôle
-- détient UPDATE sur la table entière (le privilège table-level couvre toutes
-- les colonnes). On révoque donc d'abord globalement, puis on ré-accorde
-- colonne par colonne la liste blanche que `updateProfile()` écrit réellement
-- (cf. src/services/supabase.js).
--
-- Colonnes volontairement exclues :
--   id                 -> clé primaire, ne doit jamais bouger
--   plan               -> offre souscrite, décision commerciale
--   academy_start_date -> pilote le déblocage des 52 semaines
--   created_at         -> horodatage d'inscription
--
-- Elles restent écrites par le trigger handle_new_user (security definer, donc
-- non soumis à ces privilèges) et par la service_role côté back-office.
revoke update on public.profiles from authenticated;

grant update (
  first_name,
  last_name,
  full_name,
  age,
  gender,
  birth_date,
  phone,
  newsletter_opt_in,
  updated_at
) on public.profiles to authenticated;

-- ─── user_progress ──────────────────────────────────────────────────────────
drop policy if exists "Modification progression personnelle" on public.user_progress;

create policy "Modification progression personnelle"
  on public.user_progress for update
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── academy_quiz_results ───────────────────────────────────────────────────
drop policy if exists "update own academy results" on public.academy_quiz_results;

create policy "update own academy results"
  on public.academy_quiz_results for update
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);
