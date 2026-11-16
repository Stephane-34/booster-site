# Booster

Application web d'éducation et d'investissement pour jeunes actifs : présentation de l'offre d'assurance vie luxembourgeoise, simulateurs, et une académie de formation financière sur 52 semaines.

| | |
|---|---|
| **Production** | https://www.boosterfintech.com |
| **Dépôt** | https://github.com/Stephane-34/booster-site |
| **Projet Vercel** | `stephane-34s-projects/edouard-app` |
| **Projet Supabase** | `drmfsokngivwgdfznnly` |

---

## Sommaire

- [Stack](#stack)
- [Démarrage local](#démarrage-local)
- [Services externes](#services-externes)
- [URLs et domaines](#urls-et-domaines)
- [Variables d'environnement](#variables-denvironnement)
- [Structure du projet](#structure-du-projet)
- [Base de données](#base-de-données)
- [Envoi d'emails](#envoi-demails)
- [L'Académie](#lacadémie)
- [Déploiement](#déploiement)
- [Sécurité](#sécurité)
- [Points ouverts](#points-ouverts)

---

## Stack

| Couche | Technologie |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Routage | React Router DOM 7 |
| Styles | CSS Modules + variables CSS globales |
| Auth & base de données | Supabase (PostgreSQL) |
| Emails | Resend (SMTP + API) |
| Hébergement | Vercel |
| Fonctions serveur | Vercel Functions (`api/`) |
| Icônes | Lucide React |

Aucun framework CSS : le design system vit dans `src/styles/global.css` (variables de couleur, d'espacement, de typographie) et les composants utilisent des CSS Modules.

---

## Démarrage local

```bash
npm install
cp .env.example .env.local    # renseigner les deux variables Supabase
npm run dev                   # http://localhost:5173
```

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de développement, rechargement à chaud |
| `npm run build` | build de production dans `dist/` |
| `npm run preview` | sert le build sur http://localhost:4173 |
| `npm run lint` | ESLint |

> Les fonctions `api/` ne tournent pas sous `npm run dev` : elles nécessitent `vercel dev` ou un déploiement.

---

## Services externes

| Service | Rôle | Console |
|---|---|---|
| **Supabase** | authentification, base PostgreSQL, RLS | [dashboard](https://supabase.com/dashboard/project/drmfsokngivwgdfznnly) |
| **Vercel** | hébergement, CDN, fonctions serverless | [projet](https://vercel.com/stephane-34s-projects/edouard-app) |
| **Resend** | envoi de tous les emails | [resend.com](https://resend.com) |
| **OVH** | registrar et DNS des deux domaines | espace client OVH |
| **HubSpot** | calendrier de prise de rendez-vous (iframe) | [meetings-eu1](https://meetings-eu1.hubspot.com/edouard-boulbet) |

---

## URLs et domaines

### Site

| URL | Rôle |
|---|---|
| `https://www.boosterfintech.com` | **production** |
| `boosterfintech.com` | redirige vers `www` (308) |
| `boosterfintech.fr` | redirige vers le `.com` |
| `edouard-app.vercel.app` | ancienne URL, toujours active |

### DNS (chez OVH)

Pour chacun des deux domaines :

| Type | Sous-domaine | Valeur |
|---|---|---|
| `A` | `@` | `216.198.79.1` *(Vercel)* |
| `CNAME` | `www` | `6c155e6051f5b7db.vercel-dns-017.com.` |

Enregistrements Resend sur `boosterfintech.com` :

| Type | Sous-domaine | Rôle |
|---|---|---|
| `TXT` | `resend._domainkey` | signature DKIM |
| `CNAME` | `send` | Return-Path et SPF |
| `CNAME` | `rsend` | Return-Path et SPF (Amazon SES eu-west-1) |
| `TXT` | `_dmarc` | `v=DMARC1; p=none;` |

> Les `MX` pointent vers OVH (`mx1.mail.ovh.net`…) : ils servent la messagerie du domaine et **ne doivent pas être modifiés** pour Resend, qui travaille sur les sous-domaines `send` et `rsend`.

### Développement

| URL | Contexte |
|---|---|
| `http://localhost:5173` | `npm run dev` |
| `http://localhost:4173` | `npm run preview` |
| `edouard-<hash>-*.vercel.app` | déploiements de preview (`npx vercel`) |

---

## Variables d'environnement

### Client (préfixe `VITE_`, exposées au navigateur)

| Variable | Où |
|---|---|
| `VITE_SUPABASE_URL` | `.env.local`, Vercel Production + Preview |
| `VITE_SUPABASE_ANON_KEY` | idem |

> La clé `anon` est publique par nature : elle est embarquée dans le bundle. La protection repose sur les politiques RLS, pas sur son secret.

### Serveur (fonctions `api/`, jamais exposées)

| Variable | Où |
|---|---|
| `RESEND_API_KEY` | Vercel Production + Preview, et Supabase via `config push` |
| `CONTACT_EMAIL` | Vercel Production + Preview — destinataire du formulaire |

Aucune clé n'est écrite dans le dépôt : `supabase/config.toml` référence `env(RESEND_API_KEY)`, et la fonction lit `process.env`.

---

## Structure du projet

```
api/
  contact.js              fonction serverless du formulaire de contact
src/
  components/
    layout/               Header, Footer, CookieBanner
    sections/             sections de page (Hero, Testimonials, …)
    ui/                   Button, Modal, Badge
  contexts/
    AuthContext.jsx       session Supabase, profil, état de connexion
  hooks/
    useAcademyProgress.js progression de l'Académie
    useQuiz.js
  pages/                  une route = un dossier
    Academy/
      data.js             métadonnées des 26 semaines, guides, fiches mémo
      memo.js             fiches mémo et récap de semaine dérivés des quiz
      weeks.js            chargement à la demande des questions
      weeks/weekN.js      questions d'une semaine (26 fichiers)
  services/
    supabase.js           client Supabase et toutes les requêtes
  utils/
    academyCalendar.js    calendrier de l'Académie (jours civils)
    quizShuffle.js        permutation déterministe des réponses
    calculators.js        simulateurs financiers
supabase/
  config.toml             configuration auth, poussée par `config push`
  migrations/             13 migrations SQL
  templates/              3 templates d'email HTML
```

### Modules conservés mais non branchés

`pages/Dashboard`, `pages/APropos`, `sections/Calculator`, `sections/AcademyPreview`, `sections/BookingCTA`, `sections/FlipCards`, `sections/OfferTabs` ne sont montés nulle part. Chacun porte un bandeau expliquant pourquoi. Ils ne partent pas dans le bundle : Vite ne compile que ce qui est importé.

### Routes

`/` · `/investir` · `/academie` · `/profil` · `/contact` · `/mentions-legales` · `/cgu` · `/confidentialite` · `/email-confirmed` · `/reset-password` · `/ton-projet` → `/investir` · `/dashboard` → `/academie` · `*` → 404

`/investir`, `/academie` et `/profil` sont protégées par `RequireAuth`.

---

## Base de données

### Tables

| Table | Contenu |
|---|---|
| `profiles` | profil étendu, `academy_start_date` (lundi de démarrage) |
| `academy_quiz_results` | un résultat par (utilisateur × module) |
| `user_progress` | compteurs agrégés |
| `quiz_questions` | corpus en base (inutilisé : le corpus vit dans le code) |
| `quiz_answers` | réponses individuelles (inutilisé) |

### Politiques RLS

Chaque utilisateur ne voit et ne modifie que ses propres lignes. Toutes les politiques `UPDATE` portent un `with check` symétrique — sans lui, on peut réassigner une ligne à un tiers.

Sur `profiles`, `authenticated` n'a le droit d'écrire que sur une liste blanche de colonnes : `plan` et `academy_start_date` en sont exclus, sinon un utilisateur pourrait s'attribuer l'offre payante ou débloquer les 52 semaines depuis la console du navigateur.

### Migrations

```bash
npx supabase migration list --linked   # comparer local et distant
npx supabase db push                   # appliquer les migrations
npx supabase config push               # appliquer config.toml (auth, templates)
```

> `db push` n'applique que les migrations SQL. `config push` **remplace** toute la configuration auth distante par le contenu de `config.toml` : lancez-le d'abord sans `--yes` pour lire le diff. Tout réglage modifié dans le dashboard sans être reporté dans le fichier sera écrasé.

---

## Envoi d'emails

Tout passe par **Resend**, par deux chemins.

### Mails automatiques (Supabase Auth → SMTP Resend)

| Mail | Déclencheur | Template |
|---|---|---|
| Confirmation d'inscription | `signUp()` | `supabase/templates/confirmation.html` |
| Mot de passe oublié | `resetPassword()` | `recovery.html` |
| Changement d'adresse | `updateEmail()` | `email_change.html` |

Expéditeur : `noreply@boosterfintech.com`. Limite : **100 emails/heure**.

### Formulaire de contact (API Resend)

`api/contact.js` envoie vers `CONTACT_EMAIL`, avec l'adresse du visiteur en `reply_to`.

Anti-spam : un honeypot (champ masqué que seuls les robots remplissent) et une limite de 5 envois par minute et par IP.

> **Aucun email n'est stocké.** Les messages du formulaire n'existent que dans la boîte du destinataire ; les logs Resend sont conservés 30 jours en plan gratuit. Un envoi échoué est définitivement perdu.

---

## L'Académie

Parcours de 52 semaines, six modules par semaine (lundi → samedi, dimanche au repos).

| | |
|---|---|
| Semaines rédigées | **26** sur 52 |
| Modules | 156 |
| Questions | 1560 (10 par module) |
| Guides hebdomadaires rédigés | 2 ; les 24 autres semaines affichent un récap dérivé de leurs quiz |
| Fiches mémo rédigées | 60 (5 par module, semaines 1-2) ; les autres modules dérivent les leurs de leurs questions |
| Corpus à jour au | **janvier 2026** (`CORPUS_A_JOUR_AU`) |

### Règles de déblocage

Le parcours suit les **jours réels** : lundi = module 1, mardi = module 2… Une inscription en cours de semaine démarre au **lundi suivant** — `profiles.academy_start_date` contient ce lundi, posé par le trigger `handle_new_user`.

Un module se débloque chaque jour à minuit, indépendamment de la complétion du précédent. Les modules manqués restent accessibles, et les semaines passées sont consultables.

Le **guide hebdomadaire** sort le samedi, une fois les six modules publiés. Il reste ouvert le dimanche puis sur toutes les semaines passées.

`academyState()` ramène la date de démarrage au lundi de sa semaine avant tout calcul. La base pose déjà un lundi (`academy_start_monday`), mais une donnée ancienne ou un compte décalé à la main suffirait sinon à faire glisser tout le semainier : le « samedi » du programme tomberait un mardi et la carte du guide ne s'ouvrirait jamais le week-end.

### Fiches mémo et récap de semaine

Les fiches mémo sont **toujours celles du module ouvert**. Rédigées à la main pour les semaines 1 et 2 (`MODULE_FLASHCARDS`), elles sont sinon dérivées des questions du module : la question au recto, sa bonne réponse et son explication au verso (`fichesDuModule`, dans `memo.js`). Il n'existe plus de corpus de repli : les 13 fiches génériques servaient 144 modules sur 156, ce qui donnait les mêmes fiches après presque tous les quiz.

Même logique pour le samedi : `recapDeLaSemaine()` compose, pour les semaines sans guide rédigé, trois questions-réponses par module, soit dix-huit points pour la semaine.

### Ordre des réponses

`melangerQuestions()` (dans `utils/quizShuffle.js`) permute les options avant affichage. Le corpus place la bonne réponse en B une fois sur deux ; après permutation, les quatre positions tombent à 25 %. Le mélange est déterministe (graine = identifiant du module + rang de la question) : un re-rendu ne réordonne rien sous le doigt de l'utilisateur, et refaire un quiz retrouve le même ordre.

> **Le second repère reste entier :** dans 92 % des questions, la bonne réponse est la **plus longue** des quatre, avec 86 caractères d'écart moyen. Permuter n'y change rien ; seule une réécriture du corpus le corrigerait.

### Chargement des questions

`WEEKS` (dans `data.js`) ne contient que les métadonnées. Les questions vivent dans `weeks/weekN.js` et sont chargées à la demande par `loadWeekQuestions()` — les 1560 questions pèsent près d'un mégaoctet, dix fois le reste de la page.

### Datation du contenu

Le corpus cite des valeurs qui changent chaque année (plafond du quotient familial, taux HCSF, PFU, âge légal…). `CORPUS_A_JOUR_AU` porte la date de référence, affichée sur chaque module. **À réviser en même temps que les valeurs.**

---

## Déploiement

```bash
npx vercel              # preview, sans toucher à la production
npx vercel --prod       # production
```

Le déploiement se fait **depuis le poste**, pas par intégration Git : un `git push` ne déclenche rien.

`.vercelignore` exclut de l'upload les sources de contenu (`*.pdf`, `*.docx`), `assets-source/`, `supabase/` et les fichiers de documentation.

> `.vercelignore` **remplace** `.gitignore` côté Vercel (il ne s'y ajoute pas). Toute exclusion importante doit figurer dans les deux — à commencer par `.env.local`, que Vite lit en priorité sur les variables de la plateforme et qui écraserait donc la configuration Vercel au build.

### En-têtes HTTP

`vercel.json` définit CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` et `Permissions-Policy`, plus un `Cache-Control` immuable sur `/assets/` (les noms portent un hash).

La CSP autorise nommément Google Fonts, l'API Supabase et l'iframe HubSpot. **Toute nouvelle origine externe doit y être ajoutée**, sinon elle est bloquée silencieusement en production.

---

## Sécurité

- Aucun secret dans le dépôt ; `.env.local`, `*.pdf`, `*.docx` ignorés
- 0 vulnérabilité dans les dépendances de production
- Les 6 en-têtes de sécurité sont actifs
- RLS avec `with check` sur toutes les écritures
- Colonnes sensibles (`plan`, `academy_start_date`) non modifiables par l'utilisateur
- Suppression de compte RGPD via la RPC `delete_current_user`

**Limite connue :** la correction des quiz se fait côté client. Un utilisateur peut appeler l'API directement et s'attribuer un score parfait dans `academy_quiz_results`. Sans enjeu tant que le classement est fictif ; à traiter avant d'introduire un vrai classement ou une récompense.

---

## Points ouverts

| Sujet | État |
|---|---|
| **Validation réglementaire** | la frontière entre éducation financière et conseil en investissement (statut CIF, AMF) n'a pas été validée par un professionnel |
| **Exactitude du corpus** | seule la structure des 1560 questions a été vérifiée, pas le fond de chacune |
| **Doublons de contenu** | 5 paires de modules posent les mêmes questions (S6/S7 mercredi et jeudi, S10/S12 jeudi, vendredi et samedi) — vient du document source |
| **Équilibre des réponses** | position corrigée par le mélange (25 % par option) ; la bonne réponse reste la plus longue dans 92 % des questions, ce qui demande une réécriture du corpus |
| **Contenu** | 26 semaines sur 52 ; 2 guides sur 26 |
| **Adresses de contact** | aucune boîte `@boosterfintech.com` n'existe : les pages légales renvoient au courrier postal |
| **Quota Resend** | 100 emails/jour en plan gratuit |
