# Idées & reste à faire

Fichier central des chantiers repoussés, décisions produit à confirmer,
et éléments de conformité à traiter avant mise en prod grand public.

---

## Newsletter (opt-in au signup)

La case à cocher "Je souhaite m'abonner à la newsletter Booster" existe déjà
dans le formulaire d'inscription et est persistée en base
(`profiles.newsletter_opt_in`). Il reste à connecter à un outil externe pour
que les opt-in remontent automatiquement dans une liste marketing.

**Options d'intégration à comparer :**
- Brevo (ex-Sendinblue) - gratuit jusqu'à 300 mails/j
- Mailjet - français, tarifs raisonnables
- HubSpot - déjà utilisé côté RDV (calendrier), unifierait les leads
- Loops.so - plus jeune, très propre pour SaaS
- Resend - simple, dev-first (transactionnel + marketing)

**Implémentation type** - un edge function Supabase (ou trigger côté API)
qui écoute les `INSERT` sur `profiles WHERE newsletter_opt_in = true` et push
via l'API de l'outil choisi. À décider avec le client selon l'outil retenu.

---

## Conformité RGPD à finaliser

Priorités décroissantes :

### 1. Droit à l'oubli (obligatoire) - **fait**
Bouton "Supprimer mon compte" sur `/profil` avec modal de confirmation
("tape SUPPRIMER"). Appelle la RPC `delete_current_user()` (migration
`20260805000002`), qui supprime auth.users → cascade sur profiles,
academy_quiz_results, user_progress.

### 2. Âge minimum - **fait**
Passé à **15 ans** (art. 8 RGPD, France). Validation client dans AuthForm
et Profile ; contrainte SQL dans profiles via migration `20260805000001`.

### 3. Bannière cookies - **fait**
Composant `CookieBanner` en bas de page qui apparaît à la première visite,
avec choix "Tout accepter" vs "Refuser les cookies tiers". Préférence
stockée dans localStorage. L'iframe HubSpot (calendrier de RDV) est chargée
uniquement si consentement `accepted` ; sinon un placeholder propose
d'ouvrir HubSpot dans un nouvel onglet.

### 4. Politique de confidentialité - **fait**
`/confidentialite` mise à jour : nouvelles données collectées (civilité,
date de naissance, téléphone, opt-in newsletter, résultats Académie),
âge minimum 15 ans, encadré sur les cookies tiers HubSpot, mention des
boutons "Exporter" / "Supprimer" sur /profil.

### 5. Export des données (portabilité) - **fait**
Bouton "Exporter mes données (JSON)" sur `/profil`. Télécharge un fichier
`booster-mes-donnees-YYYY-MM-DD.json` contenant profile + résultats
Académie + progression. Filtré par RLS côté Supabase.

### 6. Registre des traitements (reste à faire)
Document interne (art. 30 RGPD). Pas visible utilisateur mais obligatoire.
À rédiger une fois pour toutes (template CNIL).

---

## Autres pistes ouvertes

- **Corpus quiz semaines 2 → 52** : aujourd'hui seule la Semaine 1 a 60 questions.
  Écrire les 51 semaines restantes (~510 questions) est un chantier de contenu,
  pas de code. Prévoir un back-office simple si le rythme d'écriture est régulier.
- **Vraies vidéos + documents Bibliothèque** : actuellement 4 placeholders vidéo
  + 4 documents PDF/XLS placeholders. À remplacer quand les assets seront prêts.
- **Vraie table `academy_leaderboard`** : aujourd'hui `MOCK_PLAYERS` est en dur.
  Passer à une vue matérialisée qui agrège `academy_quiz_results` sur 90j quand
  la base d'utilisateurs justifiera la charge.
- **Cellules cliquables du tableau `Programme 52 semaines`** : demande client
  déjà arbitrée à "non", le programme reste consultatif. Reprendre si l'avis
  change.
