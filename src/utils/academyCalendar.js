/* Calendrier de l'Académie.
 *
 * Règle produit : le parcours est calé sur les jours réels de la semaine.
 * Lundi = module 1, mardi = module 2, … samedi = module 6 ; le dimanche est
 * un jour de repos, aucun nouveau module ne sort. Une inscription en cours de
 * semaine ne démarre donc pas immédiatement : le parcours commence au lundi
 * suivant, pour que « mardi » corresponde toujours au 2e module.
 *
 * `academy_start_date` contient ce lundi de démarrage (posé par le trigger
 * handle_new_user, cf. migration 20260917000001).
 *
 * Tous les calculs se font en JOURS CIVILS et non en millisecondes : aux
 * changements d'heure, une journée dure 23 h ou 25 h, et un simple
 * (b - a) / 86400000 sauterait ou répéterait un jour deux fois par an.
 */

export const MODULES_PER_WEEK = 6;   // lundi → samedi
export const TOTAL_WEEKS      = 52;

/* Minuit du jour civil, dans le fuseau du navigateur. */
const startOfDay = (d) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

/* Nombre de jours civils entre deux dates. Math.round absorbe le ±1 h des
   changements d'heure, qui donneraient sinon 0.958 ou 1.042 jour. */
export function daysBetween(from, to) {
  return Math.round((startOfDay(to) - startOfDay(from)) / 86400000);
}

/* Lundi à partir duquel un utilisateur inscrit à `date` commence son parcours.
   Inscription un lundi → il commence le jour même ; tout autre jour → lundi
   suivant. getDay() renvoie 0 pour dimanche, d'où le passage en 1-7 (ISO). */
export function startMondayFor(date = new Date()) {
  const iso = date.getDay() === 0 ? 7 : date.getDay();   // 1 = lundi … 7 = dimanche
  const monday = startOfDay(date);
  if (iso > 1) monday.setDate(monday.getDate() + (8 - iso));
  return monday;
}

/* État du parcours à une date donnée.
 *
 *   started            false tant que le lundi de démarrage n'est pas atteint
 *   daysUntilStart     jours restants avant le démarrage (0 une fois commencé)
 *   week               semaine de programme en cours, 1 → 52
 *   dayIndex           index du jour dans la semaine : 0 = lundi … 6 = dimanche
 *   unlockedIndex      index du dernier module débloqué (0 → 5). Le dimanche
 *                      ne débloque rien de plus : il reste à 5.
 *   moduleNumber       numéro du module dans tout le parcours (1 → 312)
 */
export function academyState(startDate, now = new Date()) {
  if (!startDate) {
    return { started: false, daysUntilStart: null, week: 1, dayIndex: 0,
             unlockedIndex: -1, moduleNumber: 0, startDate: null };
  }

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const elapsed = daysBetween(start, now);

  if (elapsed < 0) {
    return { started: false, daysUntilStart: -elapsed, week: 1, dayIndex: 0,
             unlockedIndex: -1, moduleNumber: 0, startDate: start };
  }

  /* 7 jours civils par semaine de programme (dimanche compris, même s'il ne
     porte aucun module) : c'est ce qui garantit que la semaine 2 démarre bien
     un lundi. */
  const week     = Math.min(TOTAL_WEEKS, Math.floor(elapsed / 7) + 1);
  const dayIndex = elapsed % 7;
  const unlockedIndex = Math.min(dayIndex, MODULES_PER_WEEK - 1);

  return {
    started: true,
    daysUntilStart: 0,
    week,
    dayIndex,
    unlockedIndex,
    moduleNumber: (week - 1) * MODULES_PER_WEEK + unlockedIndex + 1,
    startDate: start,
  };
}

/* Statut de déblocage d'un module, sans tenir compte de sa complétion.
   Les semaines passées sont entièrement ouvertes ; dans la semaine en cours,
   seuls les jours déjà atteints le sont. Un module manqué reste accessible. */
export function isModuleUnlocked(weekN, dayIdx, state) {
  if (!state.started) return false;
  if (weekN <  state.week) return true;
  if (weekN >  state.week) return false;
  return dayIdx <= state.unlockedIndex;
}

/* « lundi 22 septembre » — pour annoncer la date de démarrage. */
export function formatStartDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(date);
}
