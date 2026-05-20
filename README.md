# Booster

Application web pour jeunes investisseurs — présentation de l'offre assurance vie luxembourgeoise, simulateurs financiers et académie d'éducation financière.

**Production** : https://edouard-app.vercel.app  
**Repo** : https://github.com/Stephane-34/booster-site

---

## Stack

| Couche | Technologie |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router DOM v7 |
| CSS | CSS Modules |
| Auth & BDD | Supabase |
| Déploiement | Vercel |
| Icônes | Lucide React |

---

## Démarrage local

```bash
npm install
cp .env.example .env.local   # renseigner les variables Supabase
npm run dev                  # http://localhost:5173
```

### Variables d'environnement

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

---

## Structure du projet

```
src/
├── components/
│   ├── layout/
│   │   ├── Header/          # Navigation (Accueil · Investir · Académie) + modal auth
│   │   └── Footer/          # Liens produit, légal, contact
│   ├── sections/
│   │   ├── Hero/            # Section hero page d'accueil
│   │   ├── OfferTabs/       # Tabs "Offre / Comment / Tarifs" (page Investir)
│   │   ├── BookingCTA/      # Bloc CTA prise de RDV
│   │   └── AuthForm/        # Formulaire connexion / inscription
│   └── ui/
│       ├── Button/          # Variants : primary, accent, outline, ghost
│       ├── Badge/           # Étiquettes colorées
│       └── Modal/           # Modale générique
├── contexts/
│   └── AuthContext.jsx      # Session utilisateur (Supabase) — user, loading, isAuthenticated
├── pages/
│   ├── Home/                # Accueil : hero, qui sommes-nous, nos offres
│   ├── Investir/            # Page principale assurance vie + simulateurs (4 onglets projet)
│   ├── Academy/             # Académie : quiz par thème + grille de parcours
│   ├── Dashboard/           # Espace connecté
│   ├── TonProjet/           # Redirect /ton-projet → /investir (compat. anciens liens)
│   └── Legal/               # Mentions légales, CGU, confidentialité
├── services/
│   └── supabase.js          # Client Supabase + helpers auth (signIn, signUp, resetPassword…)
├── utils/
│   ├── calculators.js       # Formules financières (FV, PMT inverse, durée)
│   └── formatters.js        # formatCurrency, formatPercent (instances Intl mises en cache)
├── hooks/
│   └── useQuiz.js           # État du quiz (index, réponses, score) — découplé de l'UI
├── data/
│   └── themes.js            # Source unique des 6 thèmes Académie (icône, modules, locked…)
└── styles/
    └── global.css           # Variables CSS, reset, classes utilitaires (.gradient-text…)
```

---

## Pages

### `/` — Accueil
Hero · Qui sommes-nous · Nos offres (Investir + Académie) · Témoignages

### `/investir` — Assurance vie
1. **Hero** : pitch assurance vie + glass card (fonctionnement / fonds euros vs UC / fiscalité)
2. **Simulateur comparatif** : Livret A 1,5 % vs Booster 5 %, slider mensualité + horizon
3. **OfferTabs** : Offre / Comment ça marche / Tarifs
4. **Onglets projet** (4 tabs) :
   - *Épargner et fructifier* — règle des 3 ans + profils de risque + simulateur
   - *Projet immobilier* — timeline 7 étapes + profils de risque par horizon + simulateur apport
   - *Projet personnel* — grille de projets + simulateur mensualité
   - *Préparer sa retraite* — tableau taux de remplacement + simulateur capital

### `/academie` — Académie
Grille des 6 thèmes (Immobilier, Retraite, Enrichissement, Fiscalité, Protection, Transmission) + quiz quotidien gamifié.

---

## Design system

Toutes les valeurs sont définies en variables CSS dans `src/styles/global.css`.

| Variable | Valeur | Usage |
|---|---|---|
| `--color-primary` | `#a855f7` | Violet — actions principales, badges |
| `--color-accent` | `#4ade80` | Vert — CTA, onglet actif, highlights |
| `--color-bg` | `#0a0a0f` | Fond global sombre |
| `--color-surface` | `#111118` | Fond des cartes |
| `--color-border` | `rgba(255,255,255,0.08)` | Bordures subtiles |

**Variants de bouton** : `primary` (dégradé violet) · `accent` (dégradé vert) · `outline` · `ghost`

---

## Simulateurs financiers

Implémentés dans `src/utils/calculators.js` :

```js
// Valeur future d'un versement mensuel (capitalisation composée mensuelle)
// FV = PMT × [(1 + r/12)^n - 1] / (r/12)
computeFutureValue(monthly, annualRate, months)

// Versement mensuel nécessaire pour atteindre un capital cible
computeRequiredMonthly(target, annualRate, months)

// Nombre de mois pour atteindre un capital cible
// n = log(1 + FV × r / PMT) / log(1 + r)
computeMonthsToGoal(target, monthly, annualRate)
```

**Taux de référence** utilisés dans l'UI :
- Livret A : **1,5 %** (taux réglementé au 1er février 2025)
- Rendement Booster : **5 %** (objectif moyen du portefeuille — non garanti, illustration uniquement)

---

## Auth (Supabase)

Le flux complet est géré dans `src/services/supabase.js` :

| Fonction | Description |
|---|---|
| `signIn(email, password)` | Connexion |
| `signUp(email, password, name)` | Inscription |
| `resetPassword(email)` | Envoi du lien de réinitialisation |
| `signOut()` | Déconnexion |
| `getSession()` | Récupère la session active |

L'état est exposé via `useAuth()` → `{ user, loading, isAuthenticated }`.

---

## À faire

- [ ] Charger les questions de quiz depuis Supabase (`quiz_questions`) — actuellement hardcodées dans `Academy/index.jsx`
- [ ] Connecter les stats du hero Académie (note, questions répondues) à `user_progress`
- [ ] Implémenter la page Dashboard (espace connecté)

---

## Déploiement

```bash
vercel --prod   # confirmation explicite requise
```

Projet Vercel : `edouard-app` (`prj_8vI5OT5240qC6vM5YCGe33QeqMJ5`)
