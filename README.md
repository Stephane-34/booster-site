# Booster

Application web pour jeunes investisseurs — présentation de l'offre assurance vie luxembourgeoise, simulateurs financiers et académie d'éducation financière.

**Production** : https://edouard-app.vercel.app

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
│   │   ├── Header/          # Navigation + modal auth
│   │   └── Footer/          # Liens produit, légal, contact
│   ├── sections/
│   │   ├── Hero/            # Section hero page d'accueil
│   │   ├── OfferTabs/       # Tabs "Offre / Comment / Tarifs"
│   │   ├── BookingCTA/      # Bloc CTA prise de RDV
│   │   ├── AuthForm/        # Formulaire connexion / inscription
│   │   └── ...
│   └── ui/
│       ├── Button/          # Variants : primary, accent, outline, ghost
│       ├── Badge/           # Étiquettes colorées
│       └── Modal/           # Modale générique
├── contexts/
│   └── AuthContext.jsx      # Session utilisateur (Supabase)
├── pages/
│   ├── Home/                # Accueil : hero, qui sommes-nous, nos offres
│   ├── Investir/            # Page principale assurance vie + simulateurs
│   ├── Academy/             # Académie : quiz par thème
│   ├── Dashboard/           # Espace connecté
│   └── Legal/               # Mentions légales, CGU, confidentialité
├── services/
│   └── supabase.js          # Client Supabase + helpers auth/quiz
├── utils/
│   ├── calculators.js       # Formules financières (FV, PMT, durée)
│   └── formatters.js        # formatCurrency, etc.
└── styles/
    └── global.css           # Variables CSS, reset, classes utilitaires
```

---

## Design system

Toutes les valeurs sont définies en variables CSS dans `src/styles/global.css`.

| Variable | Valeur |
|---|---|
| `--color-primary` | `#a855f7` (violet) |
| `--color-accent` | `#4ade80` (vert) |
| `--color-bg` | `#0a0a0f` (fond sombre) |

**Variants de bouton** : `primary` (dégradé violet) · `accent` (dégradé vert) · `outline` · `ghost`

---

## Simulateurs financiers

Implémentés dans `src/utils/calculators.js` :

```js
// Valeur future d'un versement mensuel
computeFutureValue(monthly, annualRate, months)
// → FV = PMT × [(1 + r/12)^n - 1] / (r/12)

// Versement mensuel pour atteindre un capital cible
computeRequiredMonthly(target, annualRate, months)

// Nombre de mois pour atteindre un capital cible
computeMonthsToGoal(target, monthly, annualRate)
```

Taux de référence utilisés dans l'UI : Livret A 1,5 % · Booster 5 %.

---

## Déploiement

```bash
vercel --prod   # après confirmation explicite
```

Le projet est lié au projet Vercel `edouard-app` (`prj_8vI5OT5240qC6vM5YCGe33QeqMJ5`).
