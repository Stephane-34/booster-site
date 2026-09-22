-- Réinitialisation du parcours Académie avant l'ouverture des inscriptions.
--
-- ATTENTION : migration de DONNÉES, pas de schéma. Elle est destructive et
-- n'est pas conçue pour être rejouée. Un `supabase db reset` ou un rejeu sur
-- une base contenant de vrais utilisateurs effacerait leur progression et les
-- ramènerait tous au lundi de la semaine où le rejeu a lieu. Elle est
-- appliquée une fois, sur une base dont les seuls comptes sont des comptes de
-- test.
--
-- Objectif : tout le monde démarre à la semaine 1, sans historique.

-- 1) Effacement des résultats de quiz.
--    Sans cela, un compte conserverait des scores sur des modules qu'il n'a
--    plus débloqués — la Bibliothèque et la moyenne mobile afficheraient une
--    progression sans rapport avec la semaine en cours.
delete from public.academy_quiz_results;

-- 2) Remise à zéro des compteurs agrégés, alimentés par les mêmes quiz.
update public.user_progress
   set correct_answers = 0,
       total_answers   = 0,
       global_grade    = 'D',
       updated_at      = now();

-- 3) Tous les comptes repartent du lundi de la semaine en cours.
--    `now() - interval '7 days'` puis academy_start_monday() donne le lundi
--    de CETTE semaine : les utilisateurs démarrent immédiatement, avec les
--    modules déjà écoulés de la semaine ouverts, plutôt que d'attendre six
--    jours devant l'écran « Rendez-vous lundi ».
update public.profiles
   set academy_start_date = public.academy_start_monday(now() - interval '7 days'),
       updated_at         = now();
