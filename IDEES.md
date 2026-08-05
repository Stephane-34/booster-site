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

### 1. Droit à l'oubli (obligatoire)
Ajouter un bouton **"Supprimer mon compte"** sur `/profil` qui déclenche
la suppression cascade (via `on delete cascade` déjà en place sur
`profiles`, `academy_quiz_results`, etc.). L'API Supabase pour supprimer
un utilisateur nécessite la clé `service_role` - passer par une edge
function pour la sécurité.

### 2. Âge minimum (à valider)
Le formulaire accepte 13+. Le RGPD français impose **15 ans** ou consentement
parental. À passer à 15 ans côté validation form + trigger PL/pgSQL, ou
ajouter un flow de consentement parental.

### 3. Bannière cookies
À vérifier : le calendrier HubSpot (iframe embarqué sur `/investir` et
d'ancienne version de `/academie`) dépose-t-il des cookies tiers ?
Si oui → bannière type Axeptio / tarteaucitron / Osano.

### 4. Politique de confidentialité (à jour)
Vérifier que `/confidentialite` liste :
- Données collectées (identité, contact, date de naissance, opt-in newsletter,
  résultats de quiz Académie, IP via Vercel).
- Tiers destinataires : Supabase (hébergement BDD), Vercel (hébergement app),
  HubSpot (RDV).
- Durée de conservation (Booster peut choisir 3 ans après dernière activité).
- Droits utilisateur : accès, rectification, effacement, portabilité, opposition.

### 5. Export des données (portabilité - recommandé)
Bouton **"Exporter mes données"** sur `/profil` qui télécharge un JSON avec
toutes les données du compte (profile, résultats, opt-in). Simple à
implémenter côté client via les SELECT autorisés par RLS.

### 6. Registre des traitements
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
