/* Chargement à la demande des questions d'une semaine.
 *
 * import.meta.glob avec `import: 'default'` laisse Vite générer un chunk par
 * fichier : rien n'est téléchargé tant que le loader n'est pas appelé. Le
 * cache évite de refaire l'aller-retour quand on rouvre un module de la même
 * semaine.
 */
const loaders = import.meta.glob('./weeks/week*.js', { import: 'default' });

const cache = new Map();

export function loadWeekQuestions(weekN) {
  if (cache.has(weekN)) return cache.get(weekN);
  const loader = loaders[`./weeks/week${weekN}.js`];
  /* Semaine sans corpus rédigé : on renvoie un objet vide plutôt que de
     rejeter, l'appelant affichant déjà un message dédié. */
  const promesse = loader ? loader() : Promise.resolve({});
  cache.set(weekN, promesse);
  return promesse;
}

/* Semaine à laquelle appartient un module, déduite de son identifiant :
   « day-N » pour la semaine 1 (format historique), « wN-dI » ensuite. */
export function weekOfModule(moduleId) {
  const m = /^w(\d+)-d\d+$/.exec(moduleId);
  if (m) return Number(m[1]);
  return /^day-\d+$/.test(moduleId) ? 1 : null;
}
