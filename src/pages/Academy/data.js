/* Données statiques pour la page EXEMPLE.
   Aucune source d'autorité ici : c'est uniquement pour faire vivre la démo.
   Le contenu vient du brief client (cdc_extracted/modif-booster.docx). */

/* ─── Programme 52 semaines, 4 phases ─────────────────────── */
/* Format week : [Lundi (Placement), Mardi (Fiscalité), Mercredi (Retraite),
   Jeudi (Transmission), Vendredi (IARD & Prév.), Samedi (Immobilier)] */
export const PROGRAM_52 = [
  {
    id: 'p1',
    name: 'Les Fondations',
    range: 'Semaines 1 → 13',
    description: "Assimiler les réflexes de base, comprendre l'environnement économique et sécuriser son profil.",
    weeks: [
      { n: 1,  topics: ["L'épargne", 'Le prélèvement à la source', 'Le système par répartition', 'Hériter sans préparation', 'La Responsabilité Civile', 'Acheter vs Louer'] },
      { n: 2,  topics: ['Le budget', 'Le quotient familial', 'Trimestres cotisés vs validés', 'La réserve héréditaire', 'Franchises et plafonds', 'Fonctionnement du crédit'] },
      { n: 3,  topics: ["L'inflation", 'Les tranches marginales (TMI)', 'Âge légal et taux plein', 'Le rôle du notaire', 'MRH pour le locataire', "Capacité d'endettement"] },
      { n: 4,  topics: ["L'investissement", 'Déduction vs Réduction', 'Le relevé de carrière', 'PACS vs Mariage (décès)', 'MRH pour le propriétaire', 'Les frais de notaire'] },
      { n: 5,  topics: ['Le risque', "Le crédit d'impôt", 'Le système Agirc-Arrco', "L'ordre des héritiers", 'Le constat amiable auto', 'Le TAEG du crédit'] },
      { n: 6,  topics: ['Le rendement', 'Déclarer ses revenus', 'Le minimum contributif', 'Droits du conjoint survivant', 'Assurance auto (Tiers/Tous risques)', "PTZ et aides à l'achat"] },
      { n: 7,  topics: ["L'intérêt", 'Le calendrier fiscal', 'Le régime de base (CNAV)', 'Les frais de succession', 'La Garantie Accidents de la Vie', "Étapes de l'achat immobilier"] },
      { n: 8,  topics: ["L'intérêt composé", 'Le quotient conjugal', 'La décote et la surcote', 'Les bases du testament', 'La complémentaire santé', "L'offre d'achat"] },
      { n: 9,  topics: ['Le temps', "Taxe foncière et d'habitation", "L'espace Info Retraite", "L'indivision (bases)", "L'assurance scolaire", 'Compromis vs Promesse'] },
      { n: 10, topics: ['La liquidité', 'Introduction aux niches fiscales', 'La pension de réversion', 'La donation simple', 'La protection juridique', 'Le délai de rétractation (SRU)'] },
      { n: 11, topics: ['La diversification', 'Le Prélèvement Forfaitaire Unique', 'Retraite des indépendants', "Le présent d'usage", "L'assurance dépendance", "L'apport personnel"] },
      { n: 12, topics: ["L'objectif", 'Le déficit foncier', "L'expatriation (bases)", 'Le démembrement (concept)', 'Télétravail et assurances', 'Les garanties (hypothèque, caution)'] },
      { n: 13, topics: ['Le profil', 'Les frais réels (salariés)', 'Rachat de trimestres', 'Les abattements légaux', 'La déclaration de sinistre', "L'état des lieux"] },
    ],
  },
  {
    id: 'p2',
    name: 'La Structuration',
    range: 'Semaines 14 → 26',
    description: "Manipuler des enveloppes plus complexes et entrer dans l'optimisation active.",
    weeks: [
      { n: 14, topics: ["L'action", "Fiscalité de l'Assurance Vie", 'Le PER Individuel', 'Assurance Vie (clause standard)', 'La loi Lemoine', "L'investissement locatif (nu)"] },
      { n: 15, topics: ["L'obligation", 'Fiscalité du PEA', 'Le PER Collectif', 'Assurance Vie (fiscalité décès)', "La délégation d'assurance", "L'investissement meublé (LMNP)"] },
      { n: 16, topics: ["L'immobilier", 'Fiscalité du CTO', 'Déblocage anticipé du PER', 'La donation-partage', 'Prévoyance (Invalidité)', 'Micro-foncier vs Réel'] },
      { n: 17, topics: ['Le crowdfunding', 'Impôt sur la Fortune Immobilière', 'Le cumul emploi-retraite', 'Donation au dernier vivant', 'Prévoyance (Incapacité)', 'Rentabilité brute vs nette'] },
      { n: 18, topics: ["L'or", 'Les dons aux associations', 'Le PERCO', 'Transmettre un bien immobilier', 'Prévoyance (Décès)', 'Le cash-flow immobilier'] },
      { n: 19, topics: ['La matière première', 'Emploi à domicile (CESU)', 'Retraite par capitalisation', 'Fiscalité des donations', "Mutuelle d'entreprise (ANI)", "Le choix de l'emplacement"] },
      { n: 20, topics: ["L'entreprise (Non-coté)", "Travaux d'économie d'énergie", 'Le PER Obligatoire', "Donation avec réserve d'usufruit", 'La Loi Badinter (auto)', 'La colocation (bases)'] },
      { n: 21, topics: ['La cryptomonnaie', 'Frais de garde et gestion', 'Sortie en rente vs capital', 'Transmettre son entreprise', 'Assurance Loyers Impayés (GLI)', 'La location courte durée (Airbnb)'] },
      { n: 22, topics: ['Le marché', 'Plus-values immobilières', "Fiscalité du PER à l'entrée", 'La tontine', 'Assurance PNO', 'Fiscalité LMNP (amortissement)'] },
      { n: 23, topics: ['La Bourse', 'Plus-values mobilières', 'Les carrières longues', 'Clause bénéficiaire démembrée', 'Franchise kilométrique (auto)', 'La recherche de locataires'] },
      { n: 24, topics: ['Les dividendes', 'Fiscalité des cryptos', 'Le compte pénibilité (C2P)', "L'usufruit successif", 'Valeur à neuf vs Vétusté', 'La gestion locative déléguée'] },
      { n: 25, topics: ['Les fonds', 'Exonérations résidence principale', 'Le chômage et la retraite', 'Mandat de protection future', 'Les catastrophes naturelles', 'La copropriété et les charges'] },
      { n: 26, topics: ["La catégorie d'actifs", 'Optimiser sa déclaration', 'Majoration pour enfants', 'Testament authentique vs olographe', "Quotités d'assurance emprunteur", "L'Assemblée Générale (AG)"] },
    ],
  },
  {
    id: 'p3',
    name: "L'Optimisation",
    range: 'Semaines 27 → 39',
    description: "Maîtriser l'ingénierie patrimoniale en croisant les différents sujets.",
    weeks: [
      { n: 27, topics: ["L'offre", 'Défiscalisation Pinel', 'La retraite progressive', 'Le Pacte Dutreil (bases)', 'Prévoyance TNS (Madelin)', 'La SCI (bases)'] },
      { n: 28, topics: ['La demande', 'La loi Denormandie', 'PER et transmission', 'Société Civile Patrimoniale', "L'assurance Homme Clé", "SCI à l'IR vs SCI à l'IS"] },
      { n: 29, topics: ['Le prix', 'La loi Malraux', 'Les types de rentes viagères', 'La SCI comme outil de transmission', 'Le chômage du dirigeant', "L'immeuble de rapport"] },
      { n: 30, topics: ['La valeur', 'Les Monuments Historiques', 'Expatriation et conventions', 'La SARL de famille', "Assurance perte d'exploitation", 'La division foncière'] },
      { n: 31, topics: ['La volatilité', 'Le statut LMP', 'Rachat de trimestres (calculs)', 'Transmettre via une holding', 'Responsabilité Civile Pro', 'La rénovation énergétique (DPE)'] },
      { n: 32, topics: ['La corrélation', 'La loi Girardin', 'Retraite des fonctionnaires', 'La fiducie', 'La multirisque professionnelle', 'Déficit foncier (optimisation)'] },
      { n: 33, topics: ['Le krach', 'Le Girardin industriel', 'Chocs démographiques (impact)', "Cession d'usufruit temporaire", "Assurance Cyber-risques", "Vente en l'État Futur d'Achèvement"] },
      { n: 34, topics: ['La plus-value', 'Le Girardin agricole', 'Retraite professions libérales', 'Le quasi-usufruit', 'Assurance Responsabilité Dirigeant', "L'achat aux enchères"] },
      { n: 35, topics: ["Le taux d'intérêt", 'Plafonnement des niches', 'Pension d\'invalidité vs Retraite', "L'avance sur héritage", 'La flotte automobile (pro)', "Le viager (côté acheteur)"] },
      { n: 36, topics: ['La banque centrale', 'Régime mère-fille', "L'épargne salariale (PEE)", 'Le généalogiste successoral', 'La mutuelle TNS', 'Le viager (côté vendeur)'] },
      { n: 37, topics: ["L'effet de levier", "L'intégration fiscale", 'Retraite additionnelle (RAFP)', 'La révocation des donations', 'La caisse de prévoyance', 'SCPI de plus-value'] },
      { n: 38, topics: ["L'horizon", 'Holding animatrice vs passive', 'Plafond Sécurité Sociale (PASS)', "L'exhérédation (limites)", 'Retraite et prévoyance croisées', 'Marchand de biens'] },
      { n: 39, topics: ['La devise', "L'abus de droit fiscal", 'La liquidation de la retraite', 'La transmission internationale', 'Assurance construction (DO)', 'Le bail réel solidaire (BRS)'] },
    ],
  },
  {
    id: 'p4',
    name: "L'Expertise",
    range: 'Semaines 40 → 52',
    description: 'Maîtriser les cas complexes, montages institutionnels et gestion des grands patrimoines.',
    weeks: [
      { n: 40, topics: ['Le portefeuille', 'Ingénierie fiscale avancée', 'Stratégie de sortie du PER', 'Démembrement de titres', 'La Garantie Décennale', "L'OBO immobilier"] },
      { n: 41, topics: ['La stratégie', 'Structuration internationale', 'Polypensionnés complexes', "L'OBO de transmission", 'Assurance Tous Risques Chantier', 'La promotion immobilière'] },
      { n: 42, topics: ["L'achat", 'Optimiser la rémunération', 'Retraite et inflation (hedging)', 'Pacte Dutreil (avancé)', 'Audit des risques du patrimoine', 'Crowdfunding côté promoteur'] },
      { n: 43, topics: ['La vente', 'Fiscalité de la cession', 'Bilan retraite sur mesure', "Family Office", 'Assurance kidnapping / rançon', 'Le foncier commercial'] },
      { n: 44, topics: ['La capitalisation', "L'Exit tax", 'Les rentes indexées', 'Fondations et fonds de dotation', 'Assurance art et biens précieux', 'SCPI de rendement (optimisation)'] },
      { n: 45, topics: ['Les frais', 'Conventions fiscales', 'Les départs anticipés', 'Transmettre du patrimoine numérique', "La captive d'assurance", 'La location nue professionnelle'] },
      { n: 46, topics: ['La gestion pilotée', 'Fiscalité des trusts', 'Retraite chapeau (Art. 39)', 'Assurance vie luxembourgeoise', 'La réassurance', 'Les OPCI'] },
      { n: 47, topics: ['Le sous-jacent', 'Fiscalité des brevets', 'Le compte Article 83', 'Protection du conjoint hors mariage', 'Gestion des sinistres complexes', 'Les baux commerciaux'] },
      { n: 48, topics: ['La performance', 'Optimisation des plus-values', 'Taux de remplacement', 'Droit international privé', 'RC des mandataires sociaux', 'Immobilier tokenisé (Blockchain)'] },
      { n: 49, topics: ['La fiscalité', 'La TVA immobilière', 'PER et expatriation', 'Transmission de cryptomonnaies', 'Prévoyance croisée entre associés', "L'achat de nue-propriété"] },
      { n: 50, topics: ['La spéculation', 'Fiscalité des stock-options', 'Régime des impatriés', "Clause d'accroissement", 'La couverture de change', 'Les baux ruraux / agricoles'] },
      { n: 51, topics: ['Le rendement absolu', 'BSPCE et AGA', 'Bilan de compétences senior', 'Tutelle et curatelle', 'Risques climatiques et patrimoine', 'Le Club Deal immobilier'] },
      { n: 52, topics: ['Évaluation finale (QCM)', 'Audit fiscal complet', 'Préparation psychologique', 'Bilan patrimonial global', 'Synthèse des couvertures', 'Bilan global immobilier'] },
    ],
  },
];

/* ─── Semaine 1 - Dashboard quotidien ─────────────────────── */
/* Corpus de questions de la Semaine 1 - 10 questions par jour, fourni par
   le client dans "BOOSTER - Modification du site.pdf" (thèmes lundi
   réorganisés en 4 blocs). `correct` est un index 0-based (A=0, B=1,
   C=2, D=3). `rationale` reprend la formulation de la bonne réponse
   pour l'affichage post-clic. */
/* Métadonnées des 26 semaines : identifiant, jour, thème et titre de chaque
   module. Les QUESTIONS n'y sont pas — elles vivent dans weeks/weekN.js et se
   chargent à la demande (cf. loadWeekQuestions dans weeks.js).

   Raison : les 1560 questions pèsent ~950 Ko, dix fois le reste de la page.
   Les charger d'un bloc imposait ce poids à qui n'ouvre qu'un seul quiz. La
   grille, le programme et la progression n'ont besoin que de ce qui suit. */
export const WEEKS = {
  1: [
    { id: 'day-0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'épargne' },
    { id: 'day-1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le prélèvement à la source' },
    { id: 'day-2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le système par répartition' },
    { id: 'day-3', dayName: 'Jeudi', theme: 'Transmission', title: 'Hériter sans préparation' },
    { id: 'day-4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La Responsabilité Civile' },
    { id: 'day-5', dayName: 'Samedi', theme: 'Immobilier', title: 'Acheter vs Louer' },
  ],
  2: [
    { id: 'w2-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le budget' },
    { id: 'w2-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le quotient familial' },
    { id: 'w2-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Trimestres cotisés vs validés' },
    { id: 'w2-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'La réserve héréditaire' },
    { id: 'w2-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Franchises et plafonds' },
    { id: 'w2-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Fonctionnement du crédit' },
  ],
  3: [
    { id: 'w3-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'inflation' },
    { id: 'w3-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Les Tranches Marginales d\'Imposition - TMI' },
    { id: 'w3-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Âge légal et taux plein' },
    { id: 'w3-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Le rôle du notaire' },
    { id: 'w3-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'MRH pour le locataire' },
    { id: 'w3-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Capacité d\'endettement' },
  ],
  4: [
    { id: 'w4-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'investissement' },
    { id: 'w4-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Déduction vs Réduction' },
    { id: 'w4-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le relevé de carrière' },
    { id: 'w4-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'PACS vs Mariage - décès' },
    { id: 'w4-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'MRH pour le Propriétaire Occupant' },
    { id: 'w4-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'MRH pour le Propriétaire - L\'Assurance PNO Investisseur' },
  ],
  5: [
    { id: 'w5-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le risque' },
    { id: 'w5-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le crédit d\'impôt' },
    { id: 'w5-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le système Agirc-Arrco' },
    { id: 'w5-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'L\'ordre des héritiers' },
    { id: 'w5-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Le constat amiable auto' },
    { id: 'w5-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Le TAEG du crédit' },
  ],
  6: [
    { id: 'w6-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le rendement' },
    { id: 'w6-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Déclarer ses revenus' },
    { id: 'w6-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le minimum contributif' },
    { id: 'w6-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Droits du conjoint survivant' },
    { id: 'w6-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Assurance auto - Tiers/Tous risques' },
    { id: 'w6-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'PTZ et aides à l\'achat' },
  ],
  7: [
    { id: 'w7-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'intérêt' },
    { id: 'w7-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le calendrier fiscal' },
    { id: 'w7-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le régime de base - CNAV' },
    { id: 'w7-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Les frais de succession' },
    { id: 'w7-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La Garantie Accidents de la Vie - GAV' },
    { id: 'w7-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Étapes de l\'achat immobilier' },
  ],
  8: [
    { id: 'w8-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'intérêt composé' },
    { id: 'w8-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le quotient conjugal' },
    { id: 'w8-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'La décote et la surcote' },
    { id: 'w8-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Les bases du testament' },
    { id: 'w8-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La complémentaire santé' },
    { id: 'w8-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'L\'offre d\'achat' },
  ],
  9: [
    { id: 'w9-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le temps' },
    { id: 'w9-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Taxe foncière et d\'habitation' },
    { id: 'w9-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'L\'espace Info Retraite' },
    { id: 'w9-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'L\'indivision - bases' },
    { id: 'w9-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'L\'assurance scolaire' },
    { id: 'w9-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Compromis vs Promesse' },
  ],
  10: [
    { id: 'w10-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'La liquidité' },
    { id: 'w10-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Introduction aux niches fiscales' },
    { id: 'w10-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'La pension de réversion' },
    { id: 'w10-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'La donation simple' },
    { id: 'w10-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La protection juridique' },
    { id: 'w10-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Le délai de rétractation - SRU' },
  ],
  11: [
    { id: 'w11-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'La diversification' },
    { id: 'w11-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le Prélèvement Forfaitaire Unique - PFU' },
    { id: 'w11-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Retraite des indépendants' },
    { id: 'w11-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Le présent d\'usage' },
    { id: 'w11-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'L\'assurance dépendance' },
    { id: 'w11-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'L\'apport personnel' },
  ],
  12: [
    { id: 'w12-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'objectif' },
    { id: 'w12-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le déficit foncier' },
    { id: 'w12-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'L\'expatriation - bases' },
    { id: 'w12-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Le démembrement - concept' },
    { id: 'w12-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Télétravail et assurances' },
    { id: 'w12-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Les garanties du crédit - Hypothèque vs Caution' },
  ],
  13: [
    { id: 'w13-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le profil' },
    { id: 'w13-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Les frais réels - salariés' },
    { id: 'w13-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Rachat de trimestres' },
    { id: 'w13-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Les abattements légaux' },
    { id: 'w13-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La déclaration de sinistre' },
    { id: 'w13-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'L\'état des lieux' },
  ],
  14: [
    { id: 'w14-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'action' },
    { id: 'w14-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Fiscalité de l\'Assurance Vie' },
    { id: 'w14-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le PER Individuel' },
    { id: 'w14-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Assurance Vie (clause standard)' },
    { id: 'w14-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La loi Lemoine' },
    { id: 'w14-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'L\'investissement locatif (Nu)' },
  ],
  15: [
    { id: 'w15-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'obligation' },
    { id: 'w15-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Fiscalité du PEA' },
    { id: 'w15-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le PER collectif' },
    { id: 'w15-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Assurance Vie (fiscalité décès)' },
    { id: 'w15-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La délégation d\'assurance' },
    { id: 'w15-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'L\'investissement meublé (LMNP)' },
  ],
  16: [
    { id: 'w16-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'immobilier' },
    { id: 'w16-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Fiscalité du CTO' },
    { id: 'w16-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Déblocage anticipé du PER' },
    { id: 'w16-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'La donation-partage' },
    { id: 'w16-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Prévoyance (Invalidité)' },
    { id: 'w16-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Micro-foncier vs Réel' },
  ],
  17: [
    { id: 'w17-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le crowdfunding' },
    { id: 'w17-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Impôt sur la Fortune Immobilière (IFI)' },
    { id: 'w17-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le cumul emploi-retraite' },
    { id: 'w17-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Donation au dernier vivant' },
    { id: 'w17-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Prévoyance (Incapacité)' },
    { id: 'w17-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Rentabilité brute vs nette' },
  ],
  18: [
    { id: 'w18-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'or' },
    { id: 'w18-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Les dons aux associations' },
    { id: 'w18-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le PERCO' },
    { id: 'w18-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Transmettre un bien immobilier' },
    { id: 'w18-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Prévoyance (Décès)' },
    { id: 'w18-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Le cash-flow immobilier' },
  ],
  19: [
    { id: 'w19-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'La matière première' },
    { id: 'w19-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Emploi à domicile (CESU)' },
    { id: 'w19-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Retraite par capitalisation' },
    { id: 'w19-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Fiscalité des donations' },
    { id: 'w19-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Mutuelle d\'entreprise (ANI)' },
    { id: 'w19-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Le choix de l\'emplacement' },
  ],
  20: [
    { id: 'w20-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'L\'entreprise (Non-coté)' },
    { id: 'w20-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Travaux d\'économie d\'énergie' },
    { id: 'w20-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le PER Obligatoire' },
    { id: 'w20-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Donation avec réserve d\'usufruit' },
    { id: 'w20-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La Loi Badinter (auto)' },
    { id: 'w20-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'La colocation (bases)' },
  ],
  21: [
    { id: 'w21-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'La cryptomonnaie' },
    { id: 'w21-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Frais de garde et gestion' },
    { id: 'w21-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Sortie en rente vs capital' },
    { id: 'w21-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Transmettre son entreprise' },
    { id: 'w21-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Assurance Loyers Impayés (GLI)' },
    { id: 'w21-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'La location courte durée (Airbnb)' },
  ],
  22: [
    { id: 'w22-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le marché' },
    { id: 'w22-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Plus-values immobilières' },
    { id: 'w22-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Fiscalité du PER à l\'entrée' },
    { id: 'w22-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'La tontine' },
    { id: 'w22-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Assurance PNO' },
    { id: 'w22-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Fiscalité LMNP (amortissement)' },
  ],
  23: [
    { id: 'w23-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'La Bourse' },
    { id: 'w23-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Plus-values mobilières' },
    { id: 'w23-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Les carrières longues' },
    { id: 'w23-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Clause bénéficiaire démembrée' },
    { id: 'w23-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Franchise kilométrique (auto)' },
    { id: 'w23-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'La recherche de locataires' },
  ],
  24: [
    { id: 'w24-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Les dividendes' },
    { id: 'w24-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Fiscalité des cryptos' },
    { id: 'w24-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le compte pénibilité (C2P)' },
    { id: 'w24-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'L\'usufruit successif' },
    { id: 'w24-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Valeur à neuf vs Vétusté' },
    { id: 'w24-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'La gestion locative déléguée' },
  ],
  25: [
    { id: 'w25-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Les fonds (OPCVM, SICAV, FCP)' },
    { id: 'w25-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Exonérations résidence principale' },
    { id: 'w25-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le chômage et la retraite' },
    { id: 'w25-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Mandat de protection future' },
    { id: 'w25-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Les catastrophes naturelles' },
    { id: 'w25-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'La copropriété et les charges' },
  ],
  26: [
    { id: 'w26-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'La catégorie d\'actifs' },
    { id: 'w26-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Optimiser sa déclaration' },
    { id: 'w26-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Majoration pour enfants' },
    { id: 'w26-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'Testament authentique vs olographe' },
    { id: 'w26-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Quotités d\'assurance emprunteur' },
    { id: 'w26-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'L\'Assemblée Générale (AG)' },
  ],
};

export const MOCK_PLAYERS = [
  { id: 'p1',  name: 'Marie D.',   score: 98 },
  { id: 'p2',  name: 'Thomas L.',  score: 94 },
  { id: 'p3',  name: 'Sophie M.',  score: 89 },
  { id: 'p4',  name: 'Lucas P.',   score: 87 },
  { id: 'p5',  name: 'Emma R.',    score: 85 },
  { id: 'p6',  name: 'Antoine B.', score: 82 },
  { id: 'p7',  name: 'Julie C.',   score: 79 },
  { id: 'p8',  name: 'Hugo V.',    score: 78 },
  { id: 'p9',  name: 'Camille T.', score: 75 },
  { id: 'p10', name: 'Nicolas F.', score: 72 },
  { id: 'p11', name: 'Sarah G.',   score: 68 },
  { id: 'p12', name: 'Paul K.',    score: 65 },
];

/* ─── Quiz approfondi "Le Grand Livret" ──────────────────── */
export const QUIZ_DATA = [
  {
    id: 'q1',
    question: "Vous placez 2 000 € sur un livret à 3 % d'intérêts simples par an. Quel sera le montant total de vos intérêts après 3 ans ?",
    options: [
      { id: 'a', text: '120 €' },
      { id: 'b', text: '200 €' },
      { id: 'c', text: '60 €' },
      { id: 'd', text: '180 €' },
    ],
    correctOptionId: 'd',
    rationale: "Avec des intérêts simples : 3 % de 2 000 € = 60 €, sur 3 ans = 180 €.",
  },
  {
    id: 'q2',
    question: "Selon la règle de 72, à 6 % de rendement annuel, en combien d'années votre capital double-t-il (approximativement) ?",
    options: [
      { id: 'a', text: '10 ans' },
      { id: 'b', text: '18 ans' },
      { id: 'c', text: '12 ans' },
      { id: 'd', text: '6 ans' },
    ],
    correctOptionId: 'c',
    rationale: "72 / 6 = 12 ans. La règle de 72 estime le temps de doublement du capital.",
  },
  {
    id: 'q3',
    question: "Inflation à 4 %, épargne à 2 %. Quelle est l'évolution réelle de votre pouvoir d'achat ?",
    options: [
      { id: 'a', text: "Il diminue d'environ 2 %" },
      { id: 'b', text: 'Il augmente de 2 %' },
      { id: 'c', text: 'Il reste stable' },
      { id: 'd', text: 'Il diminue de 6 %' },
    ],
    correctOptionId: 'a',
    rationale: "Rendement réel ≈ rendement nominal − inflation, soit 2 − 4 = −2 %.",
  },
  {
    id: 'q4',
    question: "Quel placement a généralement le plus haut risque de perte mais le plus fort potentiel à long terme ?",
    options: [
      { id: 'a', text: 'Les actions' },
      { id: 'b', text: "Les obligations d'État" },
      { id: 'c', text: 'Le Livret A' },
      { id: 'd', text: 'Le compte à terme' },
    ],
    correctOptionId: 'a',
    rationale: "Les actions fluctuent fortement mais affichent historiquement les rendements long terme les plus élevés.",
  },
  {
    id: 'q5',
    question: "Qu'est-ce que la diversification d'un portefeuille ?",
    options: [
      { id: 'a', text: 'Changer de banque tous les deux ans.' },
      { id: 'b', text: "Répartir son argent entre différents types d'actifs pour réduire les risques." },
      { id: 'c', text: "Placer tout son argent sur l'action la plus performante de l'année." },
      { id: 'd', text: 'Avoir plusieurs comptes courants.' },
    ],
    correctOptionId: 'b',
    rationale: "Ne pas mettre tous ses œufs dans le même panier : si un actif chute, les autres limitent l'impact.",
  },
  {
    id: 'q6',
    question: '1 000 € placés à 10 % d\'intérêts composés par an. Combien après 2 ans ?',
    options: [
      { id: 'a', text: '1 200 €' },
      { id: 'b', text: '1 210 €' },
      { id: 'c', text: '1 100 €' },
      { id: 'd', text: '1 110 €' },
    ],
    correctOptionId: 'b',
    rationale: "An 1 : 1 100 €. An 2 : 1 100 + 10 % = 1 210 €. C'est l'effet boule de neige.",
  },
  {
    id: 'q7',
    question: 'Différence principale entre une action et une obligation ?',
    options: [
      { id: 'a', text: "L'action est un titre de propriété, l'obligation est un titre de créance." },
      { id: 'b', text: "L'action est toujours sans risque." },
      { id: 'c', text: "L'obligation donne droit à des dividendes." },
      { id: 'd', text: "Aucune différence." },
    ],
    correctOptionId: 'a',
    rationale: "Action = part de l'entreprise. Obligation = prêt accordé contre intérêts.",
  },
  {
    id: 'q8',
    question: "Qu'est-ce qu'un ETF (tracker) ?",
    options: [
      { id: 'a', text: 'Un compte bancaire pour enfants.' },
      { id: 'b', text: 'Une assurance contre les krachs.' },
      { id: 'c', text: "Un fonds qui réplique la performance d'un indice boursier." },
      { id: 'd', text: 'Une monnaie décentralisée.' },
    ],
    correctOptionId: 'c',
    rationale: "Permet d'investir dans des centaines d'entreprises en une transaction, à frais réduits.",
  },
  {
    id: 'q9',
    question: "Que signifie la « liquidité » d'un actif ?",
    options: [
      { id: 'a', text: "La quantité d'argent qu'une banque possède." },
      { id: 'b', text: 'La facilité à convertir un actif en cash sans perte de valeur.' },
      { id: 'c', text: 'Le rendement après impôts.' },
      { id: 'd', text: "Le risque de faillite d'une entreprise." },
    ],
    correctOptionId: 'b',
    rationale: "Un livret est très liquide ; l'immobilier l'est peu (vente longue).",
  },
  {
    id: 'q10',
    question: "Pourquoi constituer un fonds d'urgence avant d'investir en bourse ?",
    options: [
      { id: 'a', text: "Parce que c'est obligatoire." },
      { id: 'b', text: 'Pour acheter des actions plus chères plus tard.' },
      { id: 'c', text: 'Parce que ça rapporte toujours plus que la bourse.' },
      { id: 'd', text: "Pour éviter de devoir vendre ses investissements à perte en cas d'imprévu." },
    ],
    correctOptionId: 'd',
    rationale: "Le fonds d'urgence protège vos investissements long terme des aléas.",
  },
];

/* ─── Flashcards ──────────────────────────────────────────── */
export const FLASHCARDS = [
  { id: 'f1',  front: 'Intérêts simples',          back: 'Intérêts calculés uniquement sur le capital initial, sans tenir compte des intérêts déjà générés.' },
  { id: 'f2',  front: 'Formule intérêts simples',  back: 'I = C × t × n (Capital × taux × durée).' },
  { id: 'f3',  front: 'Intérêts composés',         back: "Les intérêts s'ajoutent au capital pour produire de nouveaux intérêts. Effet boule de neige." },
  { id: 'f4',  front: 'Règle de 72',               back: 'Temps pour doubler un capital ≈ 72 / taux annuel.' },
  { id: 'f5',  front: 'Inflation',                 back: "Hausse générale des prix entraînant une perte de pouvoir d'achat de la monnaie." },
  { id: 'f6',  front: 'Rendement réel',            back: 'Rendement réel = Rendement nominal − Inflation.' },
  { id: 'f7',  front: 'Action',                    back: "Titre de propriété : une part du capital d'une entreprise." },
  { id: 'f8',  front: 'Obligation',                back: "Titre de créance : un prêt accordé contre paiement d'intérêts." },
  { id: 'f9',  front: 'Diversification',           back: 'Répartir entre plusieurs actifs pour réduire le risque global.' },
  { id: 'f10', front: 'ETF (tracker)',             back: "Fonds coté en bourse qui réplique la performance d'un indice." },
  { id: 'f11', front: "Liquidité d'un actif",      back: 'Facilité à le vendre rapidement sans perte de valeur.' },
  { id: 'f12', front: "Fonds d'urgence",           back: 'Épargne de précaution, liquide, dédiée aux imprévus.' },
  { id: 'f13', front: 'Règle 50/30/20',            back: 'Budget : 50 % besoins, 30 % loisirs, 20 % épargne et investissement.' },
];

export const KEY_PRINCIPLES = [
  { title: 'Le pouvoir du temps',     body: "L'effet boule de neige des intérêts composés permet une croissance exponentielle sur le long terme." },
  { title: 'Le rendement réel',       body: "Soustraire l'inflation du rendement nominal pour mesurer la véritable évolution du pouvoir d'achat." },
  { title: 'Couple risque/rendement', body: "Un potentiel de rendement élevé s'accompagne toujours d'un risque accru de perte en capital." },
  { title: 'Hiérarchie financière',   body: "Constituer un fonds d'urgence avant de s'exposer aux marchés financiers." },
  { title: 'Équilibre budgétaire',    body: "Des règles simples (50/30/20) structurent les finances et automatisent l'épargne." },
];

/* ─── Guides hebdomadaires ──────────────────────────────────────────────────
   Un guide par semaine, publié le samedi (cf. isWeekGuideUnlocked dans
   utils/academyCalendar.js).

   Distinction avec les fiches mémo : la fiche mémo est MICRO, elle reprend une
   notion précise d'un quiz. Le guide est MACRO, il relie les six sujets de la
   semaine entre eux et dégage le concept général. Les six thèmes reviennent
   chaque semaine (Enrichissement, Fiscalité, Retraite, Transmission, IARD,
   Immobilier) : le guide explique ce qu'ils avaient en commun cette
   semaine-là.

   Les semaines sans guide rédigé affichent un message d'attente. */
export const WEEK_GUIDES = {
  1: {
    title: 'Poser les fondations',
    intro:
      "Cette première semaine balaie les six domaines de ta vie financière sans " +
      "entrer dans les calculs. L'objectif n'est pas de tout retenir, mais de " +
      "comprendre de quoi chaque domaine parle et pourquoi il te concerne déjà.",
    sections: [
      {
        title: 'Le fil rouge de la semaine',
        body:
          "Les six sujets abordés — l'épargne, le prélèvement à la source, la " +
          "retraite par répartition, la succession non préparée, la responsabilité " +
          "civile et le choix entre acheter et louer — ont un point commun : ce sont " +
          "des mécanismes qui fonctionnent déjà autour de toi, que tu t'en occupes ou " +
          "non. Ne rien décider reste une décision.",
      },
      {
        title: 'Ce qui se joue tôt',
        body:
          "L'épargne et la retraite partagent la même logique : le temps fait le plus " +
          "gros du travail. Un euro placé à 20 ans ne vaut pas le même effort qu'un " +
          "euro placé à 40 ans. À l'inverse, la succession et l'assurance sont des " +
          "sujets qu'on découvre souvent trop tard, au moment où le problème est déjà là.",
      },
      {
        title: 'Deux réflexes à garder',
        body:
          "Distinguer ce qui est subi (le prélèvement à la source, les règles de " +
          "succession par défaut) de ce qui se pilote (le montant que tu épargnes, ta " +
          "couverture, ton choix de logement). Et se rappeler qu'aucun de ces sujets " +
          "ne se traite isolément : ton loyer conditionne ton épargne, ton épargne " +
          "conditionne ta retraite.",
      },
    ],
    takeaway:
      "Tu n'as pas à devenir expert des six domaines. Il te suffit de savoir " +
      "lequel te concerne le plus aujourd'hui, et de commencer par celui-là.",
  },
  2: {
    title: 'Passer aux chiffres',
    intro:
      "Après la vue d'ensemble, cette semaine entre dans les mécanismes de calcul. " +
      "Budget, quotient familial, trimestres, réserve héréditaire, franchises, " +
      "crédit : derrière chaque sujet, une formule ou un seuil détermine ce que tu " +
      "touches réellement.",
    sections: [
      {
        title: 'Le fil rouge de la semaine',
        body:
          "Tous les sujets de la semaine reposent sur des seuils et des règles de " +
          "calcul. Ce n'est pas le principe qui décide du résultat, c'est le chiffre : " +
          "le nombre de parts fiscales, le nombre de trimestres, le niveau de la " +
          "franchise, le taux du crédit. Connaître le principe sans connaître le seuil " +
          "ne sert à rien de concret.",
      },
      {
        title: 'Cotisé, validé, garanti : les faux amis',
        body:
          "Plusieurs notions de la semaine se ressemblent sans se confondre. Un " +
          "trimestre cotisé n'est pas un trimestre validé. Une franchise n'est pas un " +
          "plafond. Un montant emprunté n'est pas un coût total. Ces nuances de " +
          "vocabulaire changent le montant final, parfois du simple au double.",
      },
      {
        title: 'Ce que tu peux vérifier dès maintenant',
        body:
          "Contrairement à la semaine 1, les sujets de cette semaine sont tous " +
          "chiffrables sur ta propre situation : ton nombre de parts figure sur ton " +
          "avis d'imposition, tes trimestres sur ton relevé de carrière, tes franchises " +
          "sur tes contrats d'assurance. Le budget est le point de départ : sans lui, " +
          "les autres calculs restent théoriques.",
      },
    ],
    takeaway:
      "Un principe compris mais jamais chiffré sur ta situation reste une " +
      "connaissance inutile. Prends une seule des six notions et applique-la à tes " +
      "propres documents.",
  },
};

/* ─── Fiches mémo par module ────────────────────────────────────────────────
   Indexé par `module_id` (les mêmes ids que WEEKS). Cinq fiches par module :
   les notions qu'il faut encore savoir dans six mois, pas la totalité des dix
   questions — plusieurs d'entre elles éclairent la même notion, et les
   « Challenge » sont des exercices de calcul, pas des concepts à mémoriser.

   Le contenu reformule les `rationale` du quiz sans rien y ajouter : ce sont
   les mêmes faits, ramassés en recto/verso. Distinction avec WEEK_GUIDES : la
   fiche est MICRO (une notion), le guide est MACRO (le lien entre les six
   sujets de la semaine). */
export const MODULE_FLASHCARDS = {
  /* ── Semaine 1 ── */
  'day-0': [
    { id: 'd0f1', front: 'Épargne de précaution',   back: "Une réserve immédiatement disponible pour les coups durs. C'est le premier matelas de sécurité, à constituer avant tout autre placement." },
    { id: 'd0f2', front: 'Combien mettre de côté',  back: "3 à 6 mois de dépenses courantes. De quoi absorber la majorité des urgences sans recourir au crédit à la consommation." },
    { id: 'd0f3', front: 'Où la placer',            back: "Sur un support garanti et liquide (Livret A, LEP). L'urgence n'attend pas : l'argent doit être retirable le jour même, sans risque de perte." },
    { id: 'd0f4', front: 'Se payer en premier',     back: "Mettre de côté dès la réception du salaire, avant les factures. Épargner « ce qu'il reste » en fin de mois est souvent voué à l'échec." },
    { id: 'd0f5', front: 'Argent dormant',          back: "Sur un compte courant non rémunéré, l'épargne perd de sa valeur réelle : le coût de la vie augmente chaque année, le rendement reste nul." },
  ],
  'day-1': [
    { id: 'd1f1', front: 'Prélèvement à la source', back: "L'impôt est prélevé au moment où le revenu est perçu, pour s'adapter en temps réel à la situation." },
    { id: 'd1f2', front: 'Qui prélève',             back: "L'employeur, ou le tiers verseur (France Travail, caisses de retraite). Pour les revenus sans collecteur, l'administration prélève des acomptes." },
    { id: 'd1f3', front: 'Les trois taux',          back: "Personnalisé : calculé sur les revenus du foyer. Individualisé : propre à chaque conjoint, en gardant le quotient conjugal. Neutre : appliqué par défaut, sans la situation familiale." },
    { id: 'd1f4', front: 'La déclaration reste due', back: "Le prélèvement à la source ne la supprime pas : elle régularise la situation, calcule réductions et crédits d'impôt, et ajuste le taux." },
    { id: 'd1f5', front: 'Changement de situation', back: "Mariage, naissance, variation de revenus : à signaler sur impots.gouv.fr pour actualiser son taux sans attendre." },
  ],
  'day-2': [
    { id: 'd2f1', front: 'Répartition',             back: "Les cotisations des actifs d'aujourd'hui financent immédiatement les pensions des retraités actuels. Un contrat de solidarité intergénérationnelle." },
    { id: 'd2f2', front: 'Ratio démographique',     back: "Le rapport entre le nombre de retraités et le nombre d'actifs cotisants. Le vieillissement pèse directement sur l'équilibre du système." },
    { id: 'd2f3', front: 'Salaire annuel moyen',    back: "La moyenne des salaires revalorisés des 25 meilleures années de la carrière, dans le régime général du privé." },
    { id: 'd2f4', front: 'Décote et surcote',       back: "La décote minore la pension à vie si les trimestres requis manquent. La surcote récompense les trimestres cotisés au-delà du taux plein." },
    { id: 'd2f5', front: 'Deux étages obligatoires', back: "Pour un salarié du privé : le régime de base (Cnav) et le régime complémentaire obligatoire (Agirc-Arrco)." },
  ],
  'day-3': [
    { id: 'd3f1', front: 'Le risque de l\'acceptation pure', back: "Accepter une succession sans en connaître le passif expose à payer les dettes du défunt sur ses propres deniers." },
    { id: 'd3f2', front: 'Acceptation à concurrence de l\'actif net', back: "L'option qui limite le paiement des dettes à la valeur des biens reçus. Elle protège le patrimoine personnel de l'héritier." },
    { id: 'd3f3', front: 'Délai pour prendre parti', back: "4 mois pour formaliser un choix, avec des délais complémentaires pouvant aller jusqu'à 10 ans sans mise en demeure." },
    { id: 'd3f4', front: 'Indivision successorale', back: "Les héritiers deviennent propriétaires ensemble. Situation précaire : les décisions exigent la majorité, parfois l'unanimité." },
    { id: 'd3f5', front: 'Anticiper de son vivant', back: "Donation-partage, testament ou assurance-vie ciblée évitent l'essentiel des pièges, et permettent de lisser la fiscalité." },
  ],
  'day-4': [
    { id: 'd4f1', front: 'Responsabilité civile',   back: "L'obligation de réparer le dommage causé à autrui, par sa faute, sa négligence, ou par les personnes et les choses dont on a la garde." },
    { id: 'd4f2', front: 'Les trois conditions',    back: "Un fait générateur, un dommage subi (matériel, corporel ou moral), et un lien de causalité direct entre les deux. Les trois sont cumulatifs." },
    { id: 'd4f3', front: 'Où elle se trouve',       back: "La RC vie privée est systématiquement incluse dans le contrat multirisque habitation (MRH)." },
    { id: 'd4f4', front: 'Uniquement les tiers',    back: "La RC ne couvre jamais les dommages qu'on s'inflige à soi-même : elle ne répare que ceux causés à autrui." },
    { id: 'd4f5', front: 'Vérifier les plafonds',   back: "En cas de dommage corporel grave causé à autrui, les réparations peuvent atteindre plusieurs millions d'euros." },
  ],
  'day-5': [
    { id: 'd5f1', front: 'Ce que l\'achat apporte', back: "La constitution d'un capital au fil des remboursements, là où le loyer est à fonds perdu." },
    { id: 'd5f2', front: 'Les frais qu\'on oublie', back: "Frais de notaire, intérêts d'emprunt, taxe foncière, charges de copropriété et travaux d'entretien." },
    { id: 'd5f3', front: 'Horizon minimum',         back: "5 à 8 ans de détention pour amortir les frais d'acquisition. En dessous, l'achat est rarement rentable." },
    { id: 'd5f4', front: 'Effet de levier',         back: "Le crédit permet d'acquérir un bien de grande valeur en n'engageant qu'une partie de son épargne." },
    { id: 'd5f5', front: 'L\'inflation joue pour l\'emprunteur', back: "À taux fixe, la valeur réelle de la dette diminue avec le temps : l'inflation érode ce qu'il reste à rembourser." },
  ],

  /* ── Semaine 2 ── */
  'w2-d0': [
    { id: 'w2d0f1', front: 'Charges fixes vs variables', back: "Fixes : récurrentes et contractuelles (loyer, assurances, crédit), difficilement modifiables. Variables : fluctuantes (alimentation, loisirs) — c'est là qu'on a du pouvoir d'action." },
    { id: 'w2d0f2', front: 'Reste à vivre',         back: "Ce qu'il reste une fois les charges fixes et les impôts déduits des revenus. La marge de manœuvre réelle du mois." },
    { id: 'w2d0f3', front: 'Règle 50/30/20',        back: "50 % besoins, 30 % envies, 20 % épargne et investissement. Un repère d'équilibre budgétaire." },
    { id: 'w2d0f4', front: 'Le piège du paiement en plusieurs fois', back: "Le BNPL crée des charges fixes artificielles. Indolores une à une, elles s'accumulent et plombent le budget." },
    { id: 'w2d0f5', front: 'Inflation du mode de vie', back: "Augmenter ses dépenses à chaque hausse de revenus annule l'épargne supplémentaire. Gagner plus ne suffit pas à s'enrichir." },
  ],
  'w2-d1': [
    { id: 'w2d1f1', front: 'Le principe',           back: "Le revenu imposable est divisé par le nombre de parts avant d'appliquer le barème : on reste dans des tranches plus basses, donc on paie moins." },
    { id: 'w2d1f2', front: 'Le compte des parts',   back: "Couple marié ou pacsé : 2 parts. Les deux premiers enfants : 0,5 part chacun. À partir du troisième : 1 part entière." },
    { id: 'w2d1f3', front: 'Plafonnement',          back: "L'avantage procuré par chaque demi-part est plafonné par la loi (environ 1 759 € par demi-part en 2024). Les hauts revenus n'en profitent pas sans limite." },
    { id: 'w2d1f4', front: 'Parent isolé',          back: "Case T : le premier enfant compte pour 1 part entière au lieu de 0,5. Un parent seul avec un enfant atteint donc 2 parts." },
    { id: 'w2d1f5', front: 'Garde alternée',        back: "L'avantage est partagé : 0,25 part par parent pour chacun des deux premiers enfants." },
  ],
  'w2-d2': [
    { id: 'w2d2f1', front: 'Validés = cotisés + assimilés', back: "Les trimestres validés incluent les cotisés (travail), les assimilés (chômage, maladie, maternité) et les majorations (enfants)." },
    { id: 'w2d2f2', front: 'Comment se valide un trimestre', back: "Par le salaire, pas par le temps de travail : il faut percevoir l'équivalent d'au moins 150 fois le SMIC horaire." },
    { id: 'w2d2f3', front: 'Le plafond annuel',     back: "4 trimestres par an au maximum, quels que soient les revenus perçus dans l'année." },
    { id: 'w2d2f4', front: 'Carrière longue',       back: "Le dispositif regarde les trimestres réellement cotisés, pas les validés : c'est l'effort contributif qui est exigé." },
    { id: 'w2d2f5', front: 'Majoration pour enfant', back: "8 trimestres par enfant dans le régime général : 4 au titre de la maternité ou de l'adoption, 4 au titre de l'éducation." },
  ],
  'w2-d3': [
    { id: 'w2d3f1', front: 'Réserve héréditaire',   back: "La part du patrimoine que la loi réserve obligatoirement aux héritiers proches. On ne peut pas déshériter totalement ses enfants." },
    { id: 'w2d3f2', front: 'Qui est réservataire',  back: "Les enfants (descendants). Depuis 2006, les parents ne le sont plus. Le conjoint ne l'est qu'en l'absence de descendant." },
    { id: 'w2d3f3', front: 'Le barème',             back: "1 enfant : la moitié du patrimoine. 2 enfants : les deux tiers. 3 enfants et plus : les trois quarts, quel que soit leur nombre." },
    { id: 'w2d3f4', front: 'Quotité disponible',    back: "La part restante, dont on dispose librement : pour un tiers, une association, ou pour avantager un enfant." },
    { id: 'w2d3f5', front: 'Action en réduction',   back: "Si des donations entament la réserve, les héritiers peuvent en exiger la restitution. La RAAR permet d'y renoncer par avance, devant deux notaires." },
  ],
  'w2-d4': [
    { id: 'w2d4f1', front: 'Franchise',             back: "La somme qui reste à la charge de l'assuré après indemnisation. Sinistre de 1 000 € avec 200 € de franchise : l'assureur verse 800 €." },
    { id: 'w2d4f2', front: 'Absolue vs relative',   back: "Absolue : toujours déduite, quel que soit le montant. Relative : rien en dessous du seuil, mais remboursement intégral au-dessus." },
    { id: 'w2d4f3', front: 'Plafond de garantie',   back: "Le montant maximum que l'assureur versera. Au-delà, le reste est à la charge de l'assuré." },
    { id: 'w2d4f4', front: 'Franchise et prime',    back: "Plus la franchise est élevée, plus la prime baisse : l'assuré prend une part du risque à sa charge." },
    { id: 'w2d4f5', front: 'Catastrophe naturelle', back: "La franchise Cat Nat est fixée par l'État (380 € pour les habitations) et ne peut pas être modifiée par le contrat." },
  ],
  'w2-d5': [
    { id: 'w2d5f1', front: 'Composition d\'une mensualité', back: "Une part de capital et une part d'intérêts. Les intérêts sont très élevés au début puis diminuent : ils portent sur le capital restant dû." },
    { id: 'w2d5f2', front: 'TAEG',                  back: "Le seul indicateur qui permet de comparer deux offres : il intègre le taux d'intérêt et tous les frais obligatoires (assurance, garantie, dossier)." },
    { id: 'w2d5f3', front: 'Taux d\'endettement',   back: "Plafonné à 35 % des revenus nets, assurance comprise, selon les recommandations du HCSF." },
    { id: 'w2d5f4', front: 'À quoi sert l\'apport', back: "À couvrir les frais de notaire et de garantie : la banque finance les murs, pas les taxes. Environ 10 % du prix." },
    { id: 'w2d5f5', front: 'Délai de réflexion',    back: "La loi Scrivener impose 10 jours incompressibles après réception de l'offre de prêt. Acceptation possible à partir du 11e jour." },
  ],
};
