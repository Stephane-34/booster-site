import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchAcademyResults, upsertAcademyResult } from '../services/supabase';

/* Progression Académie de l'utilisateur connecté.
   Retourne :
   - `userStart`   : date d'inscription (auth.users.created_at) → base du calcul du jour X
   - `completed`   : dict indexé par module_id, forme identique à celle utilisée
                     par les composants UI (score, total, details, title, theme,
                     completedAt, timestamp)
   - `loading`     : true tant qu'on hydrate depuis Supabase
   - `saveResult`  : (day, answersByIndex) → upsert le résultat + met à jour le state
                     local en optimistic pour que l'UI répondre immédiatement.

   Choix : on garde `timestamp` (ms) dans le state, dérivé de `completed_at`,
   pour ne rien changer aux consommateurs (moyenne mobile, tri, etc.) qui
   comparaient déjà des ms. */

const toStateEntry = (row) => ({
  score:       row.score,
  total:       row.total,
  details:     row.details,
  title:       row.title,
  theme:       row.theme,
  completedAt: new Date(row.completed_at).toLocaleDateString('fr-FR'),
  timestamp:   new Date(row.completed_at).getTime(),
});

export function useAcademyProgress() {
  const { user, profile } = useAuth();
  const [completed, setCompleted] = useState({});
  const [loading, setLoading]     = useState(true);

  /* userStart = profile.academy_start_date (distinct de auth.users.created_at).
     Cette colonne existe pour pouvoir décaler artificiellement le début d'un
     user (backfill des anciens comptes à -14 mois → tout débloqué, ou boost
     promo -1 semaine, ou reset ponctuel) sans toucher à la table auth.
     Fallback sur Date.now() tant que le profil n'est pas encore chargé, pour
     ne pas afficher un jour négatif ou aberrant. */
  const userStart = profile?.academy_start_date
    ? new Date(profile.academy_start_date).getTime()
    : Date.now();

  useEffect(() => {
    let alive = true;

    if (!user) {
      setCompleted({});
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchAcademyResults(user.id)
      .then((rows) => {
        if (!alive) return;
        const map = {};
        for (const row of rows) map[row.module_id] = toStateEntry(row);
        setCompleted(map);
      })
      .catch((err) => {
        /* En cas d'erreur (RLS, réseau) on part sur un état vide plutôt que de
           bloquer l'UI. Le user pourra retenter en refaisant un quiz. */
        console.error('[Academy] fetchAcademyResults', err);
        if (alive) setCompleted({});
      })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [user]);

  /* Enregistre le résultat d'un module.
     `day` = objet issu de WEEK_1 ; `answersByIndex` = { [qIdx]: optionIdx }. */
  const saveResult = useCallback(async (day, answersByIndex) => {
    if (!user) return;

    let score = 0;
    const details = day.questions.map((q, i) => {
      const ok = answersByIndex[i] === q.correct;
      if (ok) score++;
      return {
        question:      q.q,
        userAnswer:    q.options[answersByIndex[i]],
        correctAnswer: q.options[q.correct],
        isCorrect:     ok,
        rationale:     q.rationale,
      };
    });

    const payload = {
      moduleId: day.id,
      score,
      total: day.questions.length,
      details,
      title: day.title,
      theme: day.theme,
    };

    /* Optimistic update : on met le state à jour avant l'aller-retour réseau
       pour que le récap s'affiche instantanément. */
    const now = Date.now();
    setCompleted((c) => ({
      ...c,
      [day.id]: {
        ...payload,
        completedAt: new Date(now).toLocaleDateString('fr-FR'),
        timestamp:   now,
      },
    }));

    try {
      const row = await upsertAcademyResult(user.id, payload);
      if (row) {
        /* On resynchronise avec la valeur serveur (le completed_at officiel
           est celui retourné par Supabase, pas le now() local). */
        setCompleted((c) => ({ ...c, [day.id]: toStateEntry(row) }));
      }
    } catch (err) {
      console.error('[Academy] upsertAcademyResult', err);
      /* On garde l'optimistic pour ne pas déstabiliser l'UI, mais l'erreur
         reste tracée en console. Un retry manuel (refaire le quiz) réessaiera. */
    }
  }, [user]);

  return { userStart, completed, loading, saveResult };
}
