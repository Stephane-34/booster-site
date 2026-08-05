import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* Avertissement uniquement en développement - évite de divulguer la config en prod. */
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

export async function signUp(email, password, {
  firstName, lastName, gender, birthDate, phone, newsletterOptIn,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name:  lastName,
        gender:     gender ?? null,
        /* Sérialisé en string pour Supabase (raw_user_meta_data est JSONB).
           Format ISO YYYY-MM-DD attendu ; le trigger PL/pgSQL fait le cast. */
        birth_date: birthDate ?? null,
        phone:      phone ?? null,
        newsletter_opt_in: newsletterOptIn ? 'true' : 'false',
        /* full_name conservé pour compat ascendante du trigger handle_new_user */
        full_name:  [firstName, lastName].filter(Boolean).join(' '),
      },
    },
  });
  if (error) throw error;
  return data;
}

/* Charge le profil étendu - appelé une fois la session active.
   `academy_start_date` pilote le déblocage de l'Académie (distinct de
   auth.users.created_at). Les nouveaux champs (gender, birth_date, phone,
   newsletter_opt_in) viennent du formulaire d'inscription enrichi. */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('first_name, last_name, age, full_name, plan, academy_start_date, gender, birth_date, phone, newsletter_opt_in')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/* Met à jour le profil de l'utilisateur connecté. Le paramètre est un objet
   partiel : seules les clés fournies sont écrites (utile pour laisser les
   valeurs existantes intactes). Synchronise aussi le user_metadata Supabase
   pour que firstName soit dispo immédiatement après login. */
export async function updateProfile(userId, {
  firstName, lastName, gender, birthDate, phone, newsletterOptIn,
}) {
  /* Recalcule l'âge à partir de birth_date pour rester cohérent avec le
     trigger d'inscription. Ne l'écrit que si birthDate est fourni. */
  let age = null;
  if (birthDate) {
    const b = new Date(birthDate);
    if (!Number.isNaN(b.getTime())) {
      const now = new Date();
      age = now.getFullYear() - b.getFullYear();
      const m = now.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
    }
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const patch = {
    updated_at: new Date().toISOString(),
    ...(firstName !== undefined       && { first_name: firstName }),
    ...(lastName  !== undefined       && { last_name:  lastName }),
    ...(fullName                       && { full_name:  fullName }),
    ...(gender    !== undefined       && { gender }),
    ...(birthDate !== undefined       && { birth_date: birthDate || null }),
    ...(age       !== null            && { age }),
    ...(phone     !== undefined       && { phone: phone || null }),
    ...(newsletterOptIn !== undefined && { newsletter_opt_in: !!newsletterOptIn }),
  };

  const { error: profileError } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', userId);
  if (profileError) throw profileError;

  /* On synchronise également le user_metadata pour que le prénom soit lisible
     immédiatement dans l'AuthContext sans attendre un fetch profile. */
  const metaPatch = {
    ...(firstName !== undefined && { first_name: firstName }),
    ...(lastName  !== undefined && { last_name:  lastName }),
    ...(fullName                && { full_name:  fullName }),
    ...(gender    !== undefined && { gender }),
    ...(birthDate !== undefined && { birth_date: birthDate || null }),
    ...(phone     !== undefined && { phone: phone || null }),
  };
  const { error: userError } = await supabase.auth.updateUser({ data: metaPatch });
  if (userError) throw userError;
}

/* Met à jour l'email - Supabase renvoie un mail de confirmation au nouvel email. */
export async function updateEmail(newEmail) {
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) throw error;
}

/* Met à jour le mot de passe - l'utilisateur doit être actuellement connecté. */
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

/* RGPD - droit à l'oubli. Appelle la RPC `delete_current_user` qui supprime
   l'entrée auth.users du user courant (cascade sur profiles + résultats). */
export async function deleteCurrentUser() {
  const { error } = await supabase.rpc('delete_current_user');
  if (error) throw error;
  /* La suppression invalide la session côté serveur mais le client peut
     encore avoir un token en mémoire - on nettoie explicitement. */
  await supabase.auth.signOut();
}

/* RGPD - droit à la portabilité. Récupère toutes les données liées à
   l'utilisateur courant pour export. RLS garantit qu'on ne voit que les
   siennes. Retourne un objet JSON-sérialisable prêt à télécharger. */
export async function exportUserData(userId) {
  const [profileRes, quizRes, progressRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('academy_quiz_results').select('*').eq('user_id', userId),
    supabase.from('user_progress').select('*').eq('user_id', userId).maybeSingle(),
  ]);

  return {
    exported_at: new Date().toISOString(),
    user: {
      id: userId,
      profile: profileRes.data ?? null,
    },
    academy_quiz_results: quizRes.data ?? [],
    user_progress: progressRes.data ?? null,
  };
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

/* ─── Académie 52 semaines - résultats de quiz ─────────────
   Table `academy_quiz_results` (cf. migration 20260802000001) : un enregistrement
   par (user × module). L'UPSERT sur la contrainte unique permet à l'utilisateur
   de refaire un quiz - l'ancien score est remplacé. */

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
