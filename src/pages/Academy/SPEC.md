# Spécification - page `/academie`

> **Statut :** en prod. Route protégée par `RequireAuth` (membres uniquement).
> Anciennement `/exemple` (terrain de test), promue en `/academie` après
> validation UX client. L'ancienne page `/academie` (grille de thèmes + quiz
> en 3 questions) a été remplacée par ce contenu.

## 1. Contexte produit

L'Académie Booster est un programme d'éducation financière de **52 semaines**
qui doit :

- ne pénaliser aucun utilisateur, quelle que soit sa date d'inscription
- proposer un rythme régulier (un module par jour, pas de "binge learning")
- récompenser la constance (classement + moyenne mobile 3 mois)
- laisser un droit au rattrapage (les modules manqués restent accessibles)

Cette page présente **trois pistes UX** matérialisées en onglets, plus un
onglet Aide qui explique le fonctionnement au visiteur.

## 2. Structure de la page

4 onglets, dans cet ordre :

| # | Onglet                    | Rôle                                                                                     |
|---|---------------------------|------------------------------------------------------------------------------------------|
| 1 | **Ma semaine en cours**   | Dashboard quotidien de l'utilisateur : les 6 modules Lundi→Samedi de la semaine active. |
| 2 | **Programme 52 semaines** | Carte globale du cursus, 4 phases (dont 3 verrouillées selon la progression).            |
| 3 | **Bibliothèque**          | Ressources : fiches mémoire acquises, vidéos courtes, documents & simulateurs.           |
| 4 | **Aide**                  | 6 principes clés + FAQ pour comprendre le fonctionnement de l'Académie.                  |

Le state de progression (`completed`, `simulated`, `userStart`) est remonté au
composant `Exemple` (parent) pour être partagé entre les onglets - cf.
[Architecture technique](#7-architecture-technique).

## 3. Algorithme de déblocage (règle produit critique)

> **À ne surtout pas casser** - ce comportement est le cœur de la valeur produit.

- **Chaque utilisateur démarre au Jour 1** de sa formation, quelle que soit sa
  date d'inscription. Personne ne "rattrape le peloton" et personne n'est en
  avance sur les autres nouveaux : chacun a son propre calendrier.
- **`daysPassed = (aujourd'hui − date_inscription)`** - indépendant du
  calendrier global. En prod, `date_inscription` vient de `profiles.created_at`
  (Supabase). En démo, `useState(() => Date.now())` + bouton "+24h" pour tester.
- **Un module se débloque chaque jour à 00h**, indépendamment de la complétion
  du module de la veille. On ne "perd" jamais un module ; on prend juste du
  retard sur son propre calendrier.
- **Semaine du programme atteinte** : `Math.floor(daysPassed / 6) + 1`
  (6 modules par semaine, Lundi→Samedi, dimanche = pause).

Documenté en tête de `index.jsx` (bloc `─── ALGORITHME DE DÉBLOCAGE ───`) et
au-dessus de la fonction `dayStatus`.

## 4. Détail des onglets

### 4.1 Ma semaine en cours

**Hero du dashboard**

- Grand chiffre "Jour X" (dégradé violet→vert) - la donnée saillante.
- Phrase pédagogique qui rappelle que le rythme est personnel.
- Simulateur "+24h" - placeholder démo uniquement (à retirer en prod).
- Bloc stat séparé : moyenne mobile 3 mois + accès au classement.

**Grille des 6 modules du jour**

Trois statuts :

- **`locked`** - jour futur, cadenas, "Débloqué jour N"
- **`unlocked`** - jour atteint mais non complété, CTA "Démarrer le module"
- **`completed`** - validé, CTA "Consulter la fiche"

**Vue module (au clic sur un module)** - style "Le Grand Livret" (thème
éditorial papier + violet, isolé du thème sombre du site). Bandeau de retour
en haut + 3 sous-onglets :

- **Quiz du jour** - les questions spécifiques du module (WEEK_1[x].questions).
  Une question à la fois, tampon "VALIDÉ / À REVOIR" après réponse,
  explication en dessous, récap final à la fin. Si le module est déjà complété,
  affiche directement le récap avec un bouton "Refaire le quiz".
- **Fiches mémo** - flashcards du corpus global (FLASHCARDS, 13 fiches).
  Flip-card retournable au clic ou espace/entrée, actions "À revoir" /
  "Je connais", filtres Toutes/À revoir/Connues, bouton Mélanger.
- **Guide** - Résumé + 5 principes clés (KEY_PRINCIPLES) + Glossaire.

**Vue classement (au clic sur "Voir le classement")**

- Top 10 en incluant l'utilisateur courant (score = moyenne mobile 3 mois).
- Médaille or/argent/bronze pour le top 3, icône cadeau pour le top 10.
- Si l'utilisateur est hors top 10, sa position exacte est affichée
  au-dessus.

### 4.2 Programme 52 semaines

Navigation par phase (grid 4 colonnes). Chaque phase a un ID, un nom, une
plage de semaines, une description, et 13 semaines détaillées (colonnes
Lun→Sam). Trois phases sur quatre sont **verrouillées** au démarrage :

| Phase           | Règle de déblocage                                       |
|-----------------|----------------------------------------------------------|
| Fondations      | Toujours accessible                                       |
| Structuration   | 3 modules validés dans Semaine 1                          |
| Optimisation    | Semaine 1 complète (6/6 modules validés)                  |
| Expertise       | Semaine 1 complète + score global ≥ 80 %                  |

Une phase verrouillée est visuellement grisée (opacity + `cursor: not-allowed`)
et affiche un panneau explicatif indiquant la condition à remplir. Ces seuils
sont **volontairement atteignables dans la démo** - à recalibrer avec le
client pour le rythme réel de prod.

### 4.3 Bibliothèque

Trois rubriques distinctes :

1. **Mes fiches mémoire acquises** - agrégation dynamique du state
   `completed`. Vide au départ, se remplit à chaque quiz validé. Chaque
   fiche affiche thème, titre, score en pourcentage, date de validation.
   État vide → CTA "Aller sur Ma semaine en cours".
2. **Vidéos courtes** - 4 placeholders (thème + durée + auteur) pour
   visualiser le concept. À remplacer par le vrai corpus vidéo.
3. **Documents & simulateurs** - 4 placeholders téléchargeables (PDF / XLS).

### 4.4 Aide

- En-tête + description.
- **6 principes clés** avec icônes, dont 3 ont un bouton qui navigue vers
  l'onglet correspondant (Semaine / Programme / Bibliothèque).
- **FAQ dépliable** (`<details>`) - 4 questions courantes (rater des jours,
  avancer plus vite, refaire un quiz, voir les futurs modules).
- Footer placeholder : indique qu'un CTA "Contacter le support" viendra ici
  en prod.

## 5. Modèle de données

Toutes les données sont dans `data.js` (aucune source externe, aucune BDD
requise pour la démo).

- **`PROGRAM_52`** - 4 phases, chacune avec 13 semaines détaillées.
  6 topics par semaine (un par thème / jour). Utilisé par `ProgramSection`.
- **`WEEK_1`** - 6 modules (Lun→Sam), chacun avec `dayName`, `theme`,
  `title`, `questions[]` (format : `{ q, options: [text], correct: index,
  rationale }`). Utilisé par `DashboardSection` et `ModuleQuizView`.
- **`MOCK_PLAYERS`** - 12 joueurs simulés avec score, pour illustrer le
  classement.
- **`FLASHCARDS`** - 13 fiches (`{ id, front, back }`). Corpus global
  partagé entre tous les modules (choix C du brief).
- **`KEY_PRINCIPLES`** - 5 principes clés (`{ title, body }`). Utilisé par
  le sous-onglet Guide et pourrait alimenter la page Aide.

### Schéma d'une entrée de `completed` (state runtime)

```js
{
  [dayId]: {
    score: number,        // nombre de bonnes réponses
    total: number,        // nombre total de questions
    details: [{           // pour le récap détaillé
      question: string,
      userAnswer: string,
      correctAnswer: string,
      isCorrect: boolean,
      rationale: string,
    }],
    timestamp: number,    // date simulée de complétion (ms)
    completedAt: string,  // fr-FR locale, pour affichage
    title: string,        // dupliqué pour la bibliothèque
    theme: string,
  }
}
```

## 6. Choix produit à valider

Points à trancher avec le client avant intégration prod :

- [ ] **Corpus du Quiz du jour** - actuellement 1-2 questions par module en
      démo. Combien de questions viser en prod ? (5-10 recommandé pour
      justifier le pattern éditorial "session")
- [ ] **Fiches mémo & Guide par module** - actuellement corpus global
      partagé. Doivent-elles devenir spécifiques par module (une flashcard
      par concept du jour) ou rester agrégées par thème (6 corpus, un par
      colonne du programme) ?
- [ ] **Seuils de déblocage des phases** - les seuils actuels
      (3/6/6+80 %) sont dictés par la démo. Le vrai rythme dépend du
      contenu de production.
- [ ] **Rythme du déblocage** - 1 module par jour est acté. Confirmer que
      dimanche est bien un jour de repos (pas de déblocage, pas de perte).
- [ ] **Récompense du top 10** - mentionnée dans l'Aide (« récompense
      exclusive »). À définir concrètement.
- [ ] **Prise en compte du retard** - un utilisateur qui rate 15 jours
      voit-il tous les modules en attente ou seulement les plus récents ?
      (aujourd'hui : tous accessibles, aucune limite)

## 7. Architecture technique

### Isolement

- Toute la page vit dans `src/pages/Exemple/` (3 fichiers : `index.jsx`,
  `data.js`, `Exemple.module.css`).
- CSS modules → aucune classe ne fuit hors du dossier.
- La sous-zone "Grand Livret" (vue module) surcharge volontairement le
  thème sombre par un thème clair via des CSS custom properties locales
  (`--ink`, `--paper`, `--brass`).

### State partagé

Le composant parent `Exemple` détient le state de progression :

```
Exemple
├── userStart, simulated       ← calendrier personnel
├── completed                  ← modules validés
│
├── DashboardSection           (lecture + écriture de completed)
├── ProgramSection             (lecture pour déblocage phases)
├── BibliothequeSection        (lecture pour lister les fiches)
└── HelpSection                (aucune dépendance)
```

Ce choix évite localStorage (simple à comprendre, mais perd tout au reload)
et Context (surdimensionné pour 3 consommateurs). En prod, `completed`
viendra d'une table Supabase (voir §8).

### Navigation

- `useState(section)` pour l'onglet racine.
- `useState(view)` dans `DashboardSection` : `dashboard | module | leaderboard`.
- `useState(moduleTab)` dans la vue module : `quiz | flashcards | guide`.
- Pas de routing React Router à l'intérieur de la page - tout est local.

## 8. Ce qu'il reste à faire pour la vraie Académie

### Migration data → Supabase

Tables à créer (proposition, à valider avec le client) :

- `academy_modules` - les 52 × 6 = 312 modules, avec `week`, `day`,
  `theme`, `title`, ordre absolu.
- `academy_questions` - questions liées à un module (relation N:1).
- `academy_flashcards` - flashcards liées à un module ou à un thème.
- `academy_principles` - principes clés liés à un thème.
- `user_quiz_results` - résultats par (`user_id`, `module_id`) : score,
  détails, `completed_at`. Alimente la moyenne mobile et la bibliothèque.
- `user_flashcard_mastery` - mastery par (`user_id`, `flashcard_id`).

### Connexion runtime

- Remplacer `useState(() => Date.now())` par la lecture de
  `profiles.created_at` - via `useAuth()` ou un `useQuery` Supabase.
- Remplacer le state `completed` par une hydratation depuis
  `user_quiz_results` filtré par utilisateur connecté + persistance à
  chaque `saveQuizResult`.
- Retirer le simulateur "+24h" et le bouton Reset démo.
- Retirer `MOCK_PLAYERS` → vraie requête classement (top 10 sur
  `avg(score) WHERE completed_at > now() - interval '90 days'`).

### Nettoyage EXEMPLE

Une fois la vraie Académie livrée :

- Supprimer le flag `guestOnly` et l'entrée `EXEMPLE` du menu
  (`Header.jsx:NAV_LINKS`).
- Supprimer la route `/exemple` de `App.jsx`.
- Supprimer le dossier `src/pages/Exemple/`.
- Garder cette spec (`SPEC.md`) archivée dans les docs du projet si
  besoin d'y revenir.
