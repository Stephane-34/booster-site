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

export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  if (error) throw error;
  return data;
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
