-- `quiz_questions` est lisible par tout le monde (`using (true)`), colonne
-- `correct` comprise : n'importe qui disposant de l'anon key — présente dans le
-- bundle client — peut lister les bonnes réponses.
--
-- La table reste publique en lecture (les questions doivent s'afficher), mais on
-- retire `correct` de ce qui est lisible par anon et authenticated. Comme pour
-- profiles, on révoque le SELECT table-level avant de ré-accorder la liste
-- blanche : un revoke par colonne seul serait sans effet.
--
-- Portée : la table n'alimente aujourd'hui aucun écran (le corpus de l'Académie
-- vit dans src/pages/Academy/data.js). C'est donc une mise en conformité avant
-- que getQuizQuestions() ne soit branché, pas un correctif d'une fuite active.
--
-- Conséquence côté applicatif : la correction devra se faire côté serveur. Une
-- fonction `check_quiz_answer(question_id, answer)` en security definer est la
-- voie la plus simple — elle lit `correct` sans jamais l'exposer.

revoke select on public.quiz_questions from anon, authenticated;

grant select (
  id,
  theme,
  question,
  options,
  explanation,
  difficulty,
  created_at
) on public.quiz_questions to anon, authenticated;

-- Vérification de la réponse sans jamais divulguer la bonne option.
create or replace function public.check_quiz_answer(p_question_id uuid, p_answer text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
      from public.quiz_questions
     where id = p_question_id
       and correct = p_answer
  );
$$;

revoke all     on function public.check_quiz_answer(uuid, text) from public;
grant  execute on function public.check_quiz_answer(uuid, text) to authenticated;
