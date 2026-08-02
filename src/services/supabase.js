import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* Avertissement uniquement en développement — évite de divulguer la config en prod. */
if (import.meta.env.DEV && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.warn(
    '[Booster] Variables Supabase manquantes. Copie .env.example en .env.local.'
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY ?? 'placeholder'
);

/* ─── Auth ─────────────────────────────────────────────── */

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email, password, { firstName, lastName, age }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name:  lastName,
        age:        age ? String(age) : null,
        /* full_name conservé pour compat ascendante du trigger handle_new_user */
        full_name:  [firstName, lastName].filter(Boolean).join(' '),
      },
    },
  });
  if (error) throw error;
  return data;
}

/* Charge le profil étendu (first_name, last_name, age, plan, academy_start_date)
   — appelé une fois la session active.
   `academy_start_date` est la date de début d'Académie (distincte de
   auth.users.created_at) : c'est elle qui pilote tout le déblocage. */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('first_name, last_name, age, full_name, plan, academy_start_date')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/* Met à jour le profil de l'utilisateur connecté (prénom, nom, âge).
   Synchronise aussi le user_metadata Supabase pour que firstName soit dispo
   immédiatement après login sans attendre le fetch profile. */
export async function updateProfile(userId, { firstName, lastName, age }) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name:  lastName,
      age:        age ?? null,
      full_name:  fullName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  if (profileError) throw profileError;

  const { error: userError } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name:  lastName,
      age:        age ? String(age) : null,
      full_name:  fullName,
    },
  });
  if (userError) throw userError;
}

/* Met à jour l'email — Supabase renvoie un mail de confirmation au nouvel email. */
export async function updateEmail(newEmail) {
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) throw error;
}

/* Met à jour le mot de passe — l'utilisateur doit être actuellement connecté. */
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/* ─── Académie ──────────────────────────────────────────── */

export async function getQuizQuestions(theme) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('theme', theme)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function saveQuizAnswer(userId, questionId, isCorrect) {
  const { error } = await supabase.from('quiz_answers').insert({
    user_id: userId,
    question_id: questionId,
    is_correct: isCorrect,
    answered_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function getUserProgress(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/* ─── Académie 52 semaines — résultats de quiz ─────────────
   Table `academy_quiz_results` (cf. migration 20260802000001) : un enregistrement
   par (user × module). L'UPSERT sur la contrainte unique permet à l'utilisateur
   de refaire un quiz — l'ancien score est remplacé. */

export async function fetchAcademyResults(userId) {
  const { data, error } = await supabase
    .from('academy_quiz_results')
    .select('module_id, score, total, details, title, theme, completed_at')
    .eq('user_id', userId);

  if (error) throw error;
  return data ?? [];
}

export async function upsertAcademyResult(userId, {
  moduleId, score, total, details, title, theme,
}) {
  const { data, error } = await supabase
    .from('academy_quiz_results')
    .upsert(
      {
        user_id:    userId,
        module_id:  moduleId,
        score,
        total,
        details,
        title,
        theme,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,module_id' },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
