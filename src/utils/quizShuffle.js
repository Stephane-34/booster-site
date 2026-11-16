/* Mélange de l'ordre des réponses d'un quiz.
 *
 * Le corpus a été rédigé avec la bonne réponse presque toujours au même
 * endroit : sur les 1560 questions, elle est en B dans 50 % des cas, en C
 * dans 26 %, en A dans 15 % et en D dans 9 %. Un utilisateur attentif finit
 * par répondre B sans lire. Permuter les options casse ce repère.
 *
 * Le mélange est DÉTERMINISTE, pas aléatoire à chaque rendu : la permutation
 * est dérivée de l'identifiant du module et du rang de la question. Trois
 * raisons :
 *   - un re-rendu de React ne doit pas réordonner les options sous le doigt
 *     de l'utilisateur au moment où il clique ;
 *   - le récap enregistré en base (academy_quiz_results.details) stocke les
 *     TEXTES des réponses, mais refaire un quiz doit retomber sur le même
 *     ordre pour ne pas donner l'impression d'un quiz différent ;
 *   - un ordre reproductible est vérifiable et testable, là où Math.random()
 *     rend tout diagnostic impossible.
 *
 * Ce qui reste hors de portée : la LONGUEUR des réponses. Dans 92 % des
 * questions, la bonne réponse est la plus longue des quatre (86 caractères
 * d'écart en moyenne avec les autres). Permuter ne change rien à ce
 * second repère, qui demande une réécriture du corpus lui-même.
 */

/* xmur3 : transforme une chaîne en graine 32 bits. */
function graine(texte) {
  let h = 1779033703 ^ texte.length;
  for (let i = 0; i < texte.length; i++) {
    h = Math.imul(h ^ texte.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

/* mulberry32 : générateur pseudo-aléatoire rapide, à état 32 bits. */
function generateur(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Permutation de Fisher-Yates : renvoie les indices 0…n-1 dans un ordre
   dérivé de `cle`. */
function permutation(n, cle) {
  const rand = generateur(graine(cle)());
  const ordre = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
  }
  return ordre;
}

/* Réordonne les options d'une question et recalcule l'index de la bonne
   réponse. `explications` (une par option, présente sur 92 % du corpus) suit
   la même permutation, sans quoi elle se retrouverait collée à la mauvaise
   réponse. */
export function melangerOptions(question, cle) {
  const ordre = permutation(question.options.length, cle);
  return {
    ...question,
    options: ordre.map((i) => question.options[i]),
    correct: ordre.indexOf(question.correct),
    ...(question.explications
      ? { explications: ordre.map((i) => question.explications[i]) }
      : {}),
  };
}

/* Applique le mélange à toutes les questions d'un module. */
export function melangerQuestions(questions, moduleId) {
  return questions.map((q, i) => melangerOptions(q, `${moduleId}#${i}`));
}
