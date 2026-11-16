/* Fiches mémo et récap hebdomadaire, dérivés du corpus de chaque module.
 *
 * Le problème résolu ici : MODULE_FLASHCARDS ne couvre que les semaines 1 et
 * 2 (60 fiches sur 156 modules). Les 144 autres modules retombaient sur le
 * corpus global FLASHCARDS — les mêmes 13 fiches génériques, identiques d'un
 * quiz à l'autre, sans rapport avec le module qu'on venait de passer. Même
 * constat pour le guide hebdomadaire : rédigé pour S1 et S2, « en cours de
 * rédaction » pour les 24 autres semaines.
 *
 * Plutôt que d'attendre la rédaction manuelle de 1 500 fiches, on les dérive
 * des questions du module. Rien n'est inventé : la fiche reprend la question
 * posée, sa bonne réponse et l'explication déjà écrite dans le corpus. Une
 * fiche rédigée à la main reste prioritaire quand elle existe.
 */

import { MODULE_FLASHCARDS } from './data';

/* Les énoncés marqués « (Challenge) » sont des exercices de mise en
   situation. Le préfixe sert à prévenir pendant le quiz ; sur une fiche de
   révision, il ne veut plus rien dire. */
const sansPrefixe = (texte) => texte.replace(/^\(Challenge\)\s*/, '');

/* Compare deux textes sur le fond : sans accents, sans ponctuation, sans
   casse. Sert à détecter qu'une explication ne fait que répéter la réponse. */
const normaliser = (texte) =>
  texte
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/* Vrai quand l'explication démarre comme la réponse : le corpus reprend
   souvent la bonne réponse mot pour mot avant de la commenter. Dans ce cas
   on n'affiche que l'explication, qui est la version complète. */
function expliqueLaMemeChose(reponse, explication) {
  const a = normaliser(reponse);
  const b = normaliser(explication);
  if (!a || !b) return false;
  const debut = a.slice(0, 30);
  return b.startsWith(debut) || a.startsWith(b.slice(0, 30));
}

/* Fiches d'un module : celles rédigées à la main si elles existent, sinon une
   fiche par question. `front` = la question (rappel actif), `back` = la bonne
   réponse, `detail` = l'explication quand elle apporte autre chose. */
export function fichesDuModule(moduleId, questions = []) {
  const redigees = MODULE_FLASHCARDS[moduleId];
  if (redigees) return redigees;

  return questions.map((q, i) => {
    const reponse = q.options[q.correct];
    const doublon = q.rationale ? expliqueLaMemeChose(reponse, q.rationale) : true;
    return {
      id: `${moduleId}-auto-${i}`,
      /* Distingue les deux familles de fiches à l'affichage : un terme au
         recto pour les fiches rédigées, une question pour les dérivées. */
      type: 'question',
      front: sansPrefixe(q.q),
      back: doublon && q.rationale ? q.rationale : reponse,
      detail: doublon ? null : q.rationale,
    };
  });
}

/* Nombre de points repris par module dans le récap hebdomadaire. Trois tient
   sur un écran pour les six modules sans transformer le récap en relecture
   intégrale des soixante questions. */
const POINTS_PAR_MODULE = 3;

/* Récap d'une semaine, construit à partir des six modules et de leurs
   questions. Retourne null si aucune question n'est disponible (semaine dont
   le corpus n'est pas rédigé) : l'appelant affiche alors son message
   d'attente.
   `modules` = WEEKS[n] ; `questionsParModule` = ce que renvoie
   loadWeekQuestions(n). */
export function recapDeLaSemaine(weekN, modules = [], questionsParModule = {}) {
  const sections = modules
    .map((module) => {
      const questions = questionsParModule[module.id] ?? [];
      if (questions.length === 0) return null;

      /* Les mises en situation passent en dernier : un récap commence par les
         définitions, pas par un cas à résoudre. */
      const ordonnees = [
        ...questions.filter((q) => !q.q.startsWith('(Challenge)')),
        ...questions.filter((q) => q.q.startsWith('(Challenge)')),
      ];

      return {
        id: module.id,
        dayName: module.dayName,
        theme: module.theme,
        title: module.title,
        points: ordonnees.slice(0, POINTS_PAR_MODULE).map((q) => ({
          question: sansPrefixe(q.q),
          reponse: q.options[q.correct],
        })),
      };
    })
    .filter(Boolean);

  if (sections.length === 0) return null;

  return {
    derive: true,
    title: `Récap de la semaine ${weekN}`,
    intro:
      `Les ${sections.length} modules de la semaine, ramassés en ` +
      `${sections.length * POINTS_PAR_MODULE} points : la question posée et sa ` +
      `réponse, thème par thème. De quoi vérifier en cinq minutes ce qui est ` +
      `resté, avant d'attaquer la semaine suivante.`,
    sections,
  };
}
