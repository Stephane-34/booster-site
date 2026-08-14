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
/* Semaines rédigées : indexées par numéro (1, 2, ...).
   Chaque semaine = 6 jours (Lun→Sam) x 10 questions.
   IDs : sem 1 garde 'day-0' à 'day-5' pour la rétrocompat avec les
   résultats déjà stockés en base Supabase (academy_quiz_results).
   Sem 2+ utilise 'wN-dI' (préfixé par la semaine). */
export const WEEKS = {
  1: [
  {
    id: 'day-0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: "L'épargne",
    questions: [
      {
        q: "Quelle est la définition première de l'épargne ?",
        options: [
          "L'argent emprunté à la banque",
          "L'argent dépensé pour les loisirs",
          "La part du revenu qui n'est pas consommée immédiatement et qui est mise de côté",
          "Les impôts payés à l'État",
        ],
        correct: 2,
        rationale: "La part du revenu non consommée. L'épargne est la base de la santé financière : c'est l'argent conservé pour des projets futurs ou des imprévus.",
      },
      {
        q: "Qu'appelle-t-on « l'épargne de précaution » ?",
        options: [
          "Une réserve d'argent disponible immédiatement pour faire face aux coups durs",
          "Un capital bloqué pour la retraite",
          "Une somme destinée à payer les courses quotidiennes",
          "Un investissement très risqué en bourse",
        ],
        correct: 0,
        rationale: "Une réserve disponible pour les coups durs. C'est le premier matelas de sécurité à constituer avant tout autre placement.",
      },
      {
        q: "Quel montant est généralement recommandé pour constituer une épargne de précaution solide ?",
        options: [
          "100 €",
          "Exactement 50 000 €",
          "10 ans de salaire",
          "L'équivalent de 3 à 6 mois de dépenses courantes (charges fixes et de vie)",
        ],
        correct: 3,
        rationale: "3 à 6 mois de dépenses courantes. Ce montant permet d'absorber la majorité des urgences sans recourir au crédit à la consommation.",
      },
      {
        q: "Sur quel type de support doit être placée l'épargne de précaution ?",
        options: [
          "Sur des actions d'entreprises",
          "Sur un support garanti et totalement liquide (disponible), comme le Livret A ou le LEP",
          "Dans un investissement immobilier",
          "Sur un compte bloqué 8 ans",
        ],
        correct: 1,
        rationale: "Un support garanti et liquide. L'urgence n'attend pas : l'argent doit pouvoir être retiré le jour même sans risque de perte en capital.",
      },
      {
        q: "Quelle est la principale limite d'une épargne qui reste éternellement sur un compte courant (non rémunéré) ?",
        options: [
          "Elle perd de sa valeur réelle au fil du temps à cause de l'inflation",
          "La banque peut la saisir sans motif",
          "Elle est lourdement taxée",
          "Elle est bloquée le week-end",
        ],
        correct: 0,
        rationale: "Elle perd de sa valeur réelle. L'argent dormant se déprécie car le coût de la vie augmente chaque année.",
      },
      {
        q: "Parmi ces comportements, lequel caractérise « l'épargne forcée » ?",
        options: [
          "Mettre des pièces dans une tirelire",
          "Attendre la fin du mois pour voir s'il reste de l'argent",
          "Rembourser le capital d'un crédit immobilier chaque mois",
          "Gagner au loto",
        ],
        correct: 2,
        rationale: "Rembourser un crédit immobilier. La mensualité oblige à capitaliser dans un actif immobilier, constituant ainsi un patrimoine.",
      },
      {
        q: "En gestion financière, que signifie le principe « Se payer en premier » ?",
        options: [
          "Dépenser son salaire le jour J dans les magasins",
          "Payer ses impôts en avance",
          "Demander une avance sur salaire",
          "Mettre de côté une somme définie (épargne) dès la réception du salaire, AVANT de payer les factures",
        ],
        correct: 3,
        rationale: "Mettre de côté dès la réception du salaire. Attendre la fin du mois pour épargner « ce qu'il reste » est souvent voué à l'échec.",
      },
      {
        q: "Quelle est la différence entre « l'épargne financière » et « l'épargne non financière » ?",
        options: [
          "L'épargne financière n'existe pas",
          "L'épargne financière concerne les placements bancaires (livrets), la non financière concerne les actifs physiques (immobilier)",
          "L'épargne financière est réservée aux entreprises",
          "C'est exactement la même chose",
        ],
        correct: 1,
        rationale: "Placements bancaires vs actifs physiques. L'INSEE distingue ces deux types de patrimoine qui répondent à des logiques différentes.",
      },
      {
        q: "(Challenge) Un étudiant a un projet de voyage d'études coûteux dans 12 mois. Il a mis la somme de côté. Que doit-il faire de cet argent en attendant ?",
        options: [
          "Le placer sur un livret sécurisé, car l'horizon est trop court pour prendre le moindre risque de perte en capital",
          "Le laisser en espèces sous son lit",
          "L'investir en bourse pour tenter de le doubler",
          "Le prêter à un ami",
        ],
        correct: 0,
        rationale: "Le placer sur un livret sécurisé. L'horizon très court (1 an) interdit l'investissement risqué.",
      },
      {
        q: "(Challenge) Le taux d'épargne des Français est l'un des plus élevés d'Europe. Quel est le revers de la médaille de cette habitude ?",
        options: [
          "Cela ruine les banques",
          "Cela provoque de l'hyperinflation",
          "Cette épargne est dirigée vers des supports hyper-sécurisés peu rentables, limitant l'enrichissement à long terme",
          "L'État interdit l'épargne massive",
        ],
        correct: 2,
        rationale: "Dirigée vers des supports peu rentables. La peur du risque pousse les ménages à sur-alimenter les livrets au détriment de l'investissement productif à long terme.",
      },
    ],
  },
  {
    id: 'day-1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le prélèvement à la source',
    questions: [
      {
        q: "Quel est le principal objectif de la mise en place du prélèvement à la source de l'impôt ?",
        options: [
          "Augmenter automatiquement le montant total des impôts payés par les contribuables",
          "Synchroniser le paiement de l'impôt avec la perception des revenus pour l'adapter en temps réel",
          "Supprimer définitivement la déclaration annuelle de revenus",
          "Transférer la gestion des impôts aux banques privées",
        ],
        correct: 1,
        rationale: "Synchroniser le paiement de l'impôt avec la perception des revenus pour l'adapter en temps réel.",
      },
      {
        q: "Qui est chargé de prélever l'impôt directement à la source pour un salarié ?",
        options: [
          "L'administration fiscale (DGFiP) exclusivement",
          "L'employeur (ou le tiers verseur comme Pôle Emploi ou les caisses de retraite)",
          "La banque du contribuable par prélèvement automatique obligatoire",
          "Le maire de la commune de résidence",
        ],
        correct: 1,
        rationale: "L'employeur, ou le tiers verseur comme Pôle Emploi ou les caisses de retraite.",
      },
      {
        q: "Qu'est-ce que le taux « personnalisé » (ou taux du foyer) dans le cadre du prélèvement à la source ?",
        options: [
          "Un taux fixe de 10 % appliqué à tous les foyers fiscaux français",
          "Un taux calculé par l'administration fiscale sur la base des revenus de l'ensemble du foyer",
          "Un taux négocié directement entre le salarié et son employeur",
          "Un taux unique imposé à toutes les personnes célibataires",
        ],
        correct: 1,
        rationale: "Un taux calculé par l'administration fiscale sur la base des revenus de l'ensemble du foyer.",
      },
      {
        q: "Que permet le taux « individualisé » aux couples soumis à une imposition commune ?",
        options: [
          "De payer chacun deux fois plus d'impôts qu'en taux commun",
          "D'appliquer un taux propre à chacun en fonction de ses revenus, tout en conservant le bénéfice du quotient conjugal",
          "De faire comme s'ils n'étaient pas mariés ou pacsés sur le plan juridique",
          "De cacher ses revenus à son conjoint",
        ],
        correct: 1,
        rationale: "D'appliquer un taux propre à chacun en fonction de ses revenus, tout en conservant le bénéfice du quotient conjugal.",
      },
      {
        q: "En quoi consiste le taux « non personnalisable » (taux neutre) ?",
        options: [
          "Un taux appliqué par défaut lorsqu'un employeur n'a pas encore reçu le taux du salarié, calculé uniquement selon le salaire versé sans tenir compte de la situation familiale",
          "Un taux totalement gratuit qui annule l'impôt sur le revenu",
          "Un taux réservé aux personnes qui ne paient pas d'impôt",
          "Un taux fixe choisi par le contribuable pour ne pas payer d'impôt sur le revenu",
        ],
        correct: 0,
        rationale: "Un taux appliqué par défaut, calculé uniquement selon le salaire versé sans tenir compte de la situation familiale.",
      },
      {
        q: "Que doit faire un contribuable en cas de changement de situation important (mariage, naissance, variation de revenus) ?",
        options: [
          "Attendre la déclaration de l'année suivante sans rien faire",
          "Signaler l'événement dans son espace personnel sur impots.gouv.fr pour actualiser son taux",
          "Prévenir uniquement son employeur par lettre recommandée",
          "Arrêter de payer ses impôts de sa propre initiative",
        ],
        correct: 1,
        rationale: "Signaler l'événement dans son espace personnel sur impots.gouv.fr pour actualiser son taux.",
      },
      {
        q: "Le prélèvement à la source supprime-t-il l'obligation de faire une déclaration annuelle de revenus ?",
        options: [
          "Oui, la déclaration annuelle n'existe plus du tout",
          "Non, elle reste obligatoire pour régulariser la situation, calculer les réductions/crédits d'impôt et ajuster le taux",
          "Seulement pour les personnes qui gagnent plus de 100 000 € par an",
          "Oui, l'État remplit tout automatiquement sans que le contribuable n'ait rien à vérifier",
        ],
        correct: 1,
        rationale: "Non, la déclaration reste obligatoire pour régulariser et ajuster le taux.",
      },
      {
        q: "Comment sont gérées les réductions et crédits d'impôt (emploi à domicile, dons) avec le prélèvement à la source ?",
        options: [
          "Ils ne sont plus pris en compte du tout",
          "Ils sont déduits directement du salaire par l'employeur chaque mois",
          "Ils font l'objet d'une restitution (avance en janvier puis solde à l'été)",
          "Ils sont convertis en bons d'achat",
        ],
        correct: 2,
        rationale: "Ils font l'objet d'une restitution : avance en janvier puis solde à l'été.",
      },
      {
        q: "Qu'advient-il des revenus sans tiers collecteur (indépendants, fonciers, pensions alimentaires) ?",
        options: [
          "Ils ne sont pas imposables",
          "Ils font l'objet d'acomptes contemporains prélevés directement sur le compte bancaire du contribuable",
          "Ils sont payés en une seule fois tous les 5 ans",
          "C'est l'employeur principal qui les prélève sur le salaire",
        ],
        correct: 1,
        rationale: "Ils font l'objet d'acomptes contemporains prélevés directement par l'administration fiscale.",
      },
      {
        q: "Que se passe-t-il lors de la régularisation estivale suite à la déclaration du printemps ?",
        options: [
          "L'État envoie systématiquement une amende à tous les contribuables",
          "L'administration régularise l'écart : trop-perçu remboursé, ou prélèvement complémentaire si reste à payer",
          "Le taux de prélèvement est automatiquement remis à zéro pour toute l'année suivante",
          "Le contribuable doit obligatoirement changer de banque",
        ],
        correct: 1,
        rationale: "L'administration régularise l'écart : trop-perçu remboursé, ou prélèvement complémentaire si reste à payer.",
      },
    ],
  },
  {
    id: 'day-2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le système par répartition',
    questions: [
      {
        q: "Quel est le principe fondamental du système de retraite par répartition en France ?",
        options: [
          "Chaque individu épargne pour lui-même sur un compte personnel bloqué jusqu'à sa retraite",
          "Les cotisations versées par les actifs d'aujourd'hui financent immédiatement les pensions des retraités actuels",
          "L'État investit l'argent des cotisations en bourse pour garantir des plus-values",
          "Les entreprises financent l'intégralité des retraites de leurs propres anciens salariés",
        ],
        correct: 1,
        rationale: "Les cotisations versées par les actifs d'aujourd'hui financent immédiatement les pensions des retraités actuels.",
      },
      {
        q: "Quel lien existe entre le système par répartition et la démographie (natalité et espérance de vie) ?",
        options: [
          "Aucun lien, le système est totalement indépendant de la population",
          "Un vieillissement de la population et une hausse de l'espérance de vie pèsent sur l'équilibre financier (moins d'actifs pour plus de retraités)",
          "Plus il y a de retraités, plus les cotisations globales augmentent automatiquement",
          "L'espérance de vie ne change pas le montant des pensions versées",
        ],
        correct: 1,
        rationale: "Un vieillissement et une hausse de l'espérance de vie pèsent sur l'équilibre financier.",
      },
      {
        q: "Qu'appelle-t-on le « ratio démographique » ou « taux de dépendance » ?",
        options: [
          "Le rapport entre le nombre de retraités et le nombre d'actifs cotisants",
          "Le pourcentage de taxes prélevé sur le salaire net",
          "La proportion de femmes par rapport aux hommes à la retraite",
          "Le montant moyen d'une pension comparé au SMIC",
        ],
        correct: 0,
        rationale: "Le rapport entre le nombre de retraités et le nombre d'actifs cotisants.",
      },
      {
        q: "Le système par répartition est souvent qualifié de contrat social fondé sur… ?",
        options: [
          "L'individualisme strict et la capitalisation boursière",
          "La solidarité intergénérationnelle",
          "La spéculation financière internationale",
          "Le volontariat des entreprises",
        ],
        correct: 1,
        rationale: "La solidarité intergénérationnelle.",
      },
      {
        q: "Qu'est-ce que le « salaire annuel moyen » (SAM) dans le régime général des salariés du privé ?",
        options: [
          "Le salaire du dernier mois avant le départ à la retraite",
          "La moyenne des salaires nets de toute la carrière professionnelle",
          "La moyenne des salaires revalorisés des 25 meilleures années de la carrière",
          "Le montant du SMIC multiplié par le nombre d'enfants",
        ],
        correct: 2,
        rationale: "La moyenne des salaires revalorisés des 25 meilleures années de la carrière.",
      },
      {
        q: "Que se passe-t-il si un assuré liquide sa retraite sans avoir atteint le nombre de trimestres requis ?",
        options: [
          "Il ne touchera absolument aucune pension",
          "Sa pension subit une décote (coefficient de minoration définitif)",
          "L'État lui verse une aide exceptionnelle pour compenser",
          "Sa retraite est automatiquement reportée à ses 70 ans",
        ],
        correct: 1,
        rationale: "Sa pension subit une décote, un coefficient de minoration définitif.",
      },
      {
        q: "Quel est le mécanisme qui récompense le fait de cotiser au-delà du taux plein ?",
        options: [
          "Le bonus salarial",
          "La surcote",
          "L'abondement fiscal",
          "Le rachat de trimestres",
        ],
        correct: 1,
        rationale: "La surcote.",
      },
      {
        q: "Le système français comporte plusieurs piliers. Lequel concerne les salariés du secteur privé ?",
        options: [
          "Le régime de base (Cnav) combiné au régime complémentaire obligatoire (Agirc-Arrco)",
          "Uniquement un plan d'épargne entreprise individuel",
          "Le régime des fonctionnaires d'État",
          "La caisse des indépendants uniquement",
        ],
        correct: 0,
        rationale: "Le régime de base combiné au régime complémentaire obligatoire Agirc-Arrco.",
      },
      {
        q: "Qu'appelle-t-on le « minimum contributif » (Mico) ?",
        options: [
          "Un salaire brut minimal exigible pour avoir le droit de travailler",
          "Un plan d'épargne retraite obligatoire pour les cadres",
          "Une garantie de pension minimale pour les assurés ayant cotisé sur de faibles salaires et atteint le taux plein",
          "La cotisation minimale payée par les auto-entrepreneurs",
        ],
        correct: 2,
        rationale: "Une garantie de pension minimale versée aux assurés ayant cotisé sur de faibles salaires et ayant atteint le taux plein.",
      },
      {
        q: "Quelles sont les pistes de réforme traditionnellement évoquées face aux difficultés d'équilibre du système ?",
        options: [
          "Augmenter l'âge légal de départ, allonger la durée de cotisation, augmenter les taux de cotisations ou ajuster le niveau des pensions",
          "Supprimer définitivement le système par répartition pour le remplacer par une loterie nationale",
          "Interdire aux retraités de consommer",
          "Rendre le travail obligatoire jusqu'à 90 ans",
        ],
        correct: 0,
        rationale: "Augmenter l'âge, allonger la durée de cotisation, augmenter les taux ou ajuster le niveau des pensions.",
      },
    ],
  },
  {
    id: 'day-3', dayName: 'Jeudi', theme: 'Transmission', title: 'Hériter sans préparation',
    questions: [
      {
        q: "Quel est le principal risque pour des héritiers qui acceptent une succession sans en connaître l'actif et le passif ?",
        options: [
          "Voir l'État confisquer l'intégralité des biens immobiliers au bout de 30 jours",
          "Devoir payer les dettes du défunt sur leurs deniers personnels si le passif dépasse l'actif",
          "Être obligés de revendre tous les souvenirs de famille aux enchères",
          "Perdre automatiquement le droit à l'abattement fiscal",
        ],
        correct: 1,
        rationale: "Devoir payer les dettes du défunt sur leurs deniers personnels si le passif dépasse l'actif.",
      },
      {
        q: "Quelle option successorale permet de ne payer les dettes qu'à hauteur de la valeur des biens reçus ?",
        options: [
          "L'acceptation pure et simple",
          "La renonciation totale à la succession",
          "L'acceptation à concurrence de l'actif net",
          "Le cantonnement d'indivision",
        ],
        correct: 2,
        rationale: "L'acceptation à concurrence de l'actif net.",
      },
      {
        q: "Quel délai a un héritier pour prendre parti (accepter, accepter à concurrence de l'actif net, renoncer) ?",
        options: [
          "10 jours maximum",
          "4 mois renouvelables",
          "4 mois pour formaliser un choix, puis délais complémentaires (jusqu'à 10 ans sans mise en demeure)",
          "Exactement 5 ans sans aucune possibilité de réduction",
        ],
        correct: 2,
        rationale: "4 mois pour formaliser un choix, puis délais complémentaires (jusqu'à 10 ans sans mise en demeure).",
      },
      {
        q: "Qu'appelle-t-on « l'indivision successorale » ?",
        options: [
          "Une situation où chaque héritier possède une pièce précise de la maison de manière définitive",
          "Une situation précaire où les héritiers sont propriétaires ensemble, nécessitant des décisions à la majorité ou à l'unanimité",
          "Un transfert automatique de la propriété exclusive au plus âgé des enfants",
          "Un régime où la banque devient propriétaire du bien à la place de la famille",
        ],
        correct: 1,
        rationale: "Une situation précaire où les héritiers sont propriétaires ensemble, nécessitant des décisions collégiales.",
      },
      {
        q: "Quel est l'impact fiscal d'une succession non anticipée sur les droits de succession ?",
        options: [
          "Les droits sont systématiquement réduits de 50 % par l'État",
          "Les abattements légaux entre parents et enfants s'annulent complètement",
          "Les héritiers subissent le barème progressif standard sans avoir pu lisser la transmission ni profiter de la franchise des donations tous les 15 ans",
          "L'impôt sur la fortune immobilière est supprimé pour le foyer",
        ],
        correct: 2,
        rationale: "Les héritiers subissent le barème progressif standard sans avoir pu lisser la transmission.",
      },
      {
        q: "Que se passe-t-il si un héritier découvre des dettes cachées après avoir accepté purement et simplement ?",
        options: [
          "Il peut changer d'avis et renoncer rétroactivement",
          "Il est en principe tenu de les régler, sauf s'il démontre qu'il ignorait légitimement cette dette grave (sous conditions judiciaires strictes)",
          "La banque annule automatiquement la créance par solidarité familiale",
          "L'État prend en charge la moitié de la dette impayée",
        ],
        correct: 1,
        rationale: "Il est tenu de les régler, sauf s'il démontre qu'il ignorait légitimement cette dette grave.",
      },
      {
        q: "Quel est le rôle principal du notaire lors du règlement d'une succession non préparée ?",
        options: [
          "Choisir à la place de la famille qui doit hériter de quoi sans leur avis",
          "Identifier les héritiers, établir l'inventaire du patrimoine et rédiger les actes officiels de transfert",
          "Payer les dettes du défunt avec son propre argent personnel",
          "Bloquer définitivement les comptes bancaires sans limite de durée",
        ],
        correct: 1,
        rationale: "Identifier les héritiers, établir l'inventaire du patrimoine et rédiger les actes officiels de transfert.",
      },
      {
        q: "Pourquoi l'absence de testament ou de mandat à effet posthume complique-t-elle la gestion d'une entreprise héritée ?",
        options: [
          "L'entreprise est automatiquement dissoute par le tribunal de commerce le jour même",
          "Risque de vacance de pouvoir ou de blocage opérationnel : les héritiers n'ont pas forcément les compétences ou les pouvoirs légaux immédiats",
          "Les salariés deviennent automatiquement propriétaires de l'entreprise",
          "Le chiffre d'affaires est bloqué par le fisc pendant 10 ans",
        ],
        correct: 1,
        rationale: "Risque de vacance de pouvoir ou de blocage opérationnel pour signer les contrats.",
      },
      {
        q: "Qu'appelle-t-on le « passif successoral » ?",
        options: [
          "L'ensemble des biens immobiliers et liquidités laissés par le défunt",
          "L'ensemble des dettes, factures impayées, emprunts en cours et impôts dus par le défunt au jour du décès",
          "Les frais de notaire payés pour la déclaration de succession",
          "La part d'héritage réservée obligatoirement aux enfants",
        ],
        correct: 1,
        rationale: "L'ensemble des dettes, factures impayées, emprunts en cours et impôts dus par le défunt.",
      },
      {
        q: "Quelle démarche préventive permettrait d'éviter la plupart des pièges d'une succession subie ?",
        options: [
          "Ne rien préparer pour laisser le hasard faire les choses",
          "Anticiper la transmission de son vivant via donations-partages, testament ou souscription d'une assurance-vie bien ciblée",
          "Transférer tout son argent sur un compte à l'étranger sans prévenir personne",
          "Cacher l'existence de son patrimoine à ses enfants",
        ],
        correct: 1,
        rationale: "Anticiper la transmission de son vivant via donations-partages, testament ou assurance-vie ciblée.",
      },
    ],
  },
  {
    id: 'day-4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La Responsabilité Civile',
    questions: [
      {
        q: "Qu'est-ce que le principe fondamental de la responsabilité civile en droit français ?",
        options: [
          "L'obligation de payer une amende à l'État en cas d'infraction au code de la route",
          "L'obligation de réparer le dommage causé à autrui par sa faute, sa négligence ou par le fait des personnes/choses dont on a la garde",
          "Le droit de se faire indemniser par la Sécurité sociale lorsqu'on est malade",
          "L'interdiction absolue de souscrire un contrat d'assurance habitation",
        ],
        correct: 1,
        rationale: "L'obligation de réparer le dommage causé à autrui par sa faute, sa négligence ou par ce dont on a la garde.",
      },
      {
        q: "Quelle est la distinction principale entre RC « vie privée » et RC « professionnelle » ?",
        options: [
          "Il n'y a aucune différence, une seule assurance couvre tout",
          "La RC vie privée couvre les dommages causés dans la vie courante ; la RC pro couvre les fautes ou dommages commis dans l'exercice d'une activité pro",
          "La RC professionnelle est illégale pour les banquiers",
          "La RC vie privée ne couvre que les dégâts causés à l'intérieur d'un véhicule",
        ],
        correct: 1,
        rationale: "La RC vie privée couvre la vie courante, la RC pro couvre les fautes et dommages professionnels.",
      },
      {
        q: "Dans quel contrat d'assurance grand public la RC « vie privée » est-elle systématiquement incluse ?",
        options: [
          "Le contrat d'assurance automobile uniquement",
          "Le contrat d'assurance multirisque habitation (MRH)",
          "La mutuelle santé (complémentaire santé)",
          "Le livret d'épargne bancaire",
        ],
        correct: 1,
        rationale: "Le contrat d'assurance multirisque habitation (MRH).",
      },
      {
        q: "Qu'appelle-t-on la responsabilité du fait des choses (article 1242 du Code civil) ?",
        options: [
          "Le fait d'être responsable des dommages causés par un objet que l'on a sous sa garde (ex : un pot de fleurs qui tombe du balcon)",
          "L'obligation de rembourser son crédit immobilier en cas de panne de chaudière",
          "Le droit de revendre un bien mobilier sans l'accord du propriétaire",
          "Une taxe sur la possession de biens de luxe",
        ],
        correct: 0,
        rationale: "Être responsable des dommages causés par un objet que l'on a sous sa garde.",
      },
      {
        q: "Un enfant mineur casse la vitre du voisin en jouant au ballon. Qui est civilement responsable ?",
        options: [
          "L'enfant lui-même, car il a lancé le ballon",
          "Ses parents, en vertu de la responsabilité des parents du fait de leur enfant mineur habitant avec eux",
          "Le fabricant du ballon de football",
          "Le propriétaire de la maison du voisin qui aurait dû blinder ses fenêtres",
        ],
        correct: 1,
        rationale: "Ses parents, en vertu de la responsabilité des parents du fait de leur enfant mineur.",
      },
      {
        q: "Quels sont les trois éléments cumulatifs pour engager la responsabilité civile ?",
        options: [
          "Un contrat écrit, un tampon de la mairie et un paiement en espèces",
          "Un fait générateur (faute ou acte), un dommage subi (matériel, corporel ou moral) et un lien de causalité direct",
          "Une décision de justice, un avocat obligatoire et un délai de carence de 3 ans",
          "Une intention de nuire prouvée, un témoin oculaire et un accord amiable",
        ],
        correct: 1,
        rationale: "Un fait générateur, un dommage subi et un lien de causalité direct entre les deux.",
      },
      {
        q: "Qu'est-ce qu'un dommage « immatériel » dans le cadre d'un sinistre de RC ?",
        options: [
          "Un dommage purement financier ou de privation de jouissance qui ne découle pas forcément d'un dégât corporel ou matériel direct (ex : perte de chiffre d'affaires)",
          "Un dommage causé par un fantôme ou un phénomène paranormal",
          "Un meuble virtuel acheté dans un jeu vidéo",
          "Une facture impayée par un client de bonne foi",
        ],
        correct: 0,
        rationale: "Un dommage financier ou de privation de jouissance qui ne découle pas d'un dégât matériel/corporel direct.",
      },
      {
        q: "La responsabilité civile couvre-t-elle les dommages que l'on s'inflige à soi-même ?",
        options: [
          "Oui, à hauteur de 100 % des frais engagés",
          "Non, la RC concerne exclusivement la réparation des dommages causés aux tiers",
          "Seulement si l'on a souscrit une option payante le dimanche",
          "Oui, si le dommage a lieu un jour férié",
        ],
        correct: 1,
        rationale: "Non, la RC concerne exclusivement la réparation des dommages causés aux tiers.",
      },
      {
        q: "Qu'appelle-t-on une « franchise » dans un contrat d'assurance incluant une garantie de RC ou de dommages ?",
        options: [
          "Le montant de la prime versée chaque mois à l'assureur",
          "La part du dommage qui reste à la charge de l'assuré et qui n'est pas remboursée",
          "Une réduction accordée aux assurés qui n'ont jamais eu d'accident",
          "Le délai pendant lequel l'assurance refuse d'ouvrir un dossier",
        ],
        correct: 1,
        rationale: "La part du dommage qui reste à la charge de l'assuré et n'est pas remboursée par l'assureur.",
      },
      {
        q: "Pourquoi est-il conseillé de vérifier les plafonds d'indemnisation de sa RC vie privée ?",
        options: [
          "Pour s'assurer que la banque ne prélève pas trop de frais de tenue de compte",
          "Parce qu'en cas de dommages corporels graves à autrui (accident, incendie d'immeuble), les réparations peuvent se chiffrer en millions d'euros",
          "Pour savoir combien de personnes on a le droit d'inviter chez soi",
          "Pour calculer le montant exact de ses impôts locaux",
        ],
        correct: 1,
        rationale: "Parce que les réparations financières pour dommages corporels graves peuvent se chiffrer en millions d'euros.",
      },
    ],
  },
  {
    id: 'day-5', dayName: 'Samedi', theme: 'Immobilier', title: 'Acheter vs Louer',
    questions: [
      {
        q: "Quel est l'un des principaux avantages financiers de l'achat immobilier par rapport à la location sur le long terme ?",
        options: [
          "L'absence totale de charges et de taxes foncières",
          "La constitution d'un capital (patrimoine) au fil des remboursements de crédit, contrairement au loyer qui est « à fonds perdu »",
          "La liberté de pouvoir déménager du jour au lendemain sans frais",
          "La garantie absolue que le bien prendra de la valeur chaque année",
        ],
        correct: 1,
        rationale: "La constitution d'un capital au fil des remboursements, contrairement au loyer à fonds perdu.",
      },
      {
        q: "Qu'appelle-t-on le « coût d'opportunité » ou les « frais annexes » souvent sous-estimés lors d'un achat immobilier ?",
        options: [
          "Le prix du loyer payé pendant les vacances",
          "Les frais de notaire, les intérêts d'emprunt, la taxe foncière, les charges de copropriété et les travaux d'entretien",
          "La réduction d'impôt automatique accordée à tous les acheteurs",
          "Le coût de la caution locative",
        ],
        correct: 1,
        rationale: "Les frais de notaire, les intérêts d'emprunt, la taxe foncière, les charges et les travaux d'entretien.",
      },
      {
        q: "Quel horizon de détention minimum est généralement conseillé pour amortir les frais d'acquisition ?",
        options: [
          "Entre 6 mois et 1 an",
          "Exactement 2 ans",
          "Généralement entre 5 et 8 ans minimum",
          "30 ans obligatoirement",
        ],
        correct: 2,
        rationale: "Généralement entre 5 et 8 ans minimum.",
      },
      {
        q: "Quel est le principal avantage de la location en termes de souplesse ?",
        options: [
          "L'obligation de refaire la peinture tous les trois ans aux frais du propriétaire",
          "La flexibilité et la mobilité géographique (préavis court pour partir sans avoir à revendre)",
          "L'exonération totale de la taxe d'habitation et des charges locatives",
          "Le droit de modifier la structure porteuse du bâtiment sans autorisation",
        ],
        correct: 1,
        rationale: "La flexibilité et la mobilité géographique facilitées.",
      },
      {
        q: "Qu'est-ce que l'effet de levier du crédit bancaire en immobilier ?",
        options: [
          "La possibilité d'acheter un bien de grande valeur en n'utilisant qu'une partie de son épargne personnelle grâce à l'emprunt",
          "Emprunter de l'argent sans jamais avoir à le rembourser à la banque",
          "L'obligation de verser 100 % du prix comptant le jour de la signature",
          "Un dispositif qui supprime les intérêts bancaires si on achète un lundi",
        ],
        correct: 0,
        rationale: "Acheter un bien de grande valeur en n'utilisant qu'une partie de son épargne grâce à l'emprunt.",
      },
      {
        q: "Quel argument financier oppose-t-on souvent à l'achat de sa résidence principale (stratégie « Buy and Rent ») ?",
        options: [
          "Acheter sa résidence principale coûte toujours deux fois moins cher que louer",
          "L'argent dans la résidence principale est bloqué et ne génère pas de revenus immédiats, contrairement à un investissement financier diversifié",
          "Il est interdit de revendre sa résidence principale avant la retraite",
          "Les locataires ont des taux de crédit immobiliers plus bas que les propriétaires",
        ],
        correct: 1,
        rationale: "L'argent est bloqué et ne génère pas de revenus immédiats, contrairement à un investissement financier diversifié.",
      },
      {
        q: "Qu'appelle-t-on le « rendement locatif brut » d'un bien immobilier ?",
        options: [
          "Le loyer annuel charges comprises divisé par le prix d'achat du bien, multiplié par 100",
          "Le montant des impôts payés par le propriétaire chaque année",
          "La différence entre le salaire de l'acheteur et le prix de la cuisine équipée",
          "Le taux d'intérêt appliqué par la banque sur le prêt immobilier",
        ],
        correct: 0,
        rationale: "Loyer annuel charges comprises / prix d'achat × 100.",
      },
      {
        q: "Quelles sont les contraintes majeures pour un propriétaire occupant par rapport à un locataire ?",
        options: [
          "Il ne peut pas choisir la couleur de ses rideaux",
          "Il supporte seul la charge financière des gros travaux (toiture, ravalement, maintenance de la chaudière)",
          "Il doit payer un loyer tous les mois à un propriétaire invisible",
          "Il lui est interdit de loger de la famille chez lui",
        ],
        correct: 1,
        rationale: "Il supporte seul la charge financière de tous les gros travaux et de la maintenance.",
      },
      {
        q: "Quel rôle joue l'inflation dans le choix entre acheter et louer à crédit ?",
        options: [
          "L'inflation pénalise les propriétaires car leurs mensualités de crédit augmentent chaque mois",
          "L'inflation est favorable à l'emprunteur à taux fixe (la valeur réelle de la dette diminue avec le temps)",
          "L'inflation annule immédiatement les frais de notaire",
          "L'inflation n'a aucun impact sur l'immobilier",
        ],
        correct: 1,
        rationale: "L'inflation est favorable à l'emprunteur à taux fixe : la valeur réelle de la dette diminue avec le temps.",
      },
      {
        q: "Quelle est la meilleure approche pour trancher entre l'achat et la location ?",
        options: [
          "Suivre aveuglément les conseils des agences immobilières locales",
          "Calculer son horizon de temps sur place, comparer le coût total (loyers vs frais d'achat/intérêts/entretien) et évaluer sa situation pro et géographique",
          "Acheter systématiquement le plus grand appartement possible dès l'âge de 18 ans",
          "Rester toute sa vie en location pour ne jamais prendre de risque bancaire",
        ],
        correct: 1,
        rationale: "Calculer son horizon, comparer le coût total et évaluer sa situation professionnelle et géographique.",
      },
    ],
  },
  ],

  /* Sem 2 - Le budget + les 5 autres jours (tous nouveaux dans le corpus PDF). */
  2: [
  {
    id: 'w2-d0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Le budget',
    questions: [
      {
        q: "À quoi sert l'établissement d'un budget personnel ?",
        options: [
          "À identifier clairement ses revenus et ses dépenses pour maîtriser ses flux financiers et éviter le découvert",
          "À se priver de tout loisir",
          "À payer plus d'impôts",
          "À calculer le prix de sa maison",
        ],
        correct: 0,
        rationale: "Identifier revenus et dépenses. Un budget est une feuille de route financière qui met en lumière où part l'argent.",
      },
      {
        q: "Dans un budget, qu'est-ce qu'une « charge fixe » (ou dépense pré-engagée) ?",
        options: [
          "Une dépense liée à une sortie au restaurant",
          "L'achat de vêtements",
          "Une dépense récurrente, contractuelle et difficilement modifiable à court terme (loyer, assurances, crédit)",
          "Un retrait au distributeur",
        ],
        correct: 2,
        rationale: "Une dépense récurrente et contractuelle. Ce sont les dépenses incompressibles qui tombent chaque mois.",
      },
      {
        q: "À l'inverse, que sont les « charges variables » (ou dépenses courantes) ?",
        options: [
          "Le loyer",
          "Les abonnements internet",
          "Les impôts",
          "Les dépenses dont le montant fluctue chaque mois selon les besoins (alimentation, loisirs, carburant)",
        ],
        correct: 3,
        rationale: "Les dépenses dont le montant fluctue. C'est sur ce poste que l'on a le plus de pouvoir d'action pour rééquilibrer un budget.",
      },
      {
        q: "Qu'est-ce que le « reste à vivre » ?",
        options: [
          "L'argent de poche donné aux enfants",
          "La somme qu'il reste sur le compte une fois que les charges fixes et impôts ont été déduits des revenus",
          "Le montant du découvert autorisé",
          "La différence entre le salaire brut et net",
        ],
        correct: 1,
        rationale: "La somme restante après déduction des charges fixes. C'est la marge de manœuvre mensuelle pour payer l'alimentation et les loisirs.",
      },
      {
        q: "En gestion budgétaire populaire, à quoi correspond la fameuse « règle des 50/30/20 » ?",
        options: [
          "50 % besoins (loyer, courses), 30 % envies/loisirs, 20 % épargne et investissements",
          "50 % de dettes, 30 % d'épargne, 20 % de loisirs",
          "Une répartition des impôts",
          "Les tranches d'imposition sur le revenu",
        ],
        correct: 0,
        rationale: "50 % besoins, 30 % envies, 20 % épargne. C'est un modèle d'équilibre budgétaire idéal.",
      },
      {
        q: "Que permet la « mensualisation » des grandes factures dans la gestion d'un budget ?",
        options: [
          "D'annuler les frais bancaires",
          "De payer moins cher au total",
          "D'augmenter le salaire",
          "De lisser les dépenses sur 12 mois pour éviter les chocs de trésorerie",
        ],
        correct: 3,
        rationale: "Lisser les dépenses pour éviter les chocs. Cela permet de programmer son budget sans mauvaise surprise trimestrielle.",
      },
      {
        q: "Quel est le danger du « paiement en plusieurs fois sans frais » (BNPL) ?",
        options: [
          "Il bloque le compte courant",
          "Il baisse le prix du produit",
          "Il crée des charges fixes artificielles qui s'accumulent et favorisent le surendettement",
          "Il est interdit en Europe",
        ],
        correct: 2,
        rationale: "Il accumule les charges fixes. Ces petites mensualités semblent indolores mais leur accumulation plombe rapidement le budget.",
      },
      {
        q: "En comptabilité, de quel document d'entreprise s'inspire le budget d'un ménage ?",
        options: [
          "Le compte de résultat (produits/charges)",
          "Le bilan (actif/passif)",
          "Le registre du personnel",
          "L'annexe légale",
        ],
        correct: 0,
        rationale: "Le compte de résultat. Le ménage compare ses revenus (produits) et dépenses (charges) pour dégager une capacité d'épargne.",
      },
      {
        q: "(Challenge) Un ménage a un revenu net de 3 000 €. Leurs charges fixes s'élèvent à 1 800 €. Quel est leur taux de charges fixes ?",
        options: ["30 %", "45 %", "80 %", "60 %"],
        correct: 3,
        rationale: "60 %. (1 800 / 3 000) × 100 = 60 %. Ce taux est critique s'il dépasse ce seuil.",
      },
      {
        q: "(Challenge) Qu'appelle-t-on « l'inflation du mode de vie » (lifestyle creep) ?",
        options: [
          "Le fait d'acheter des produits de luxe uniquement",
          "La tendance à augmenter ses dépenses courantes à chaque fois que ses revenus augmentent, annulant l'épargne supplémentaire",
          "La baisse des prix dans les supermarchés",
          "Le passage à la retraite",
        ],
        correct: 1,
        rationale: "Augmenter ses dépenses avec ses revenus. Gagner plus pour dépenser plus dans une plus grosse voiture empêche de développer son patrimoine.",
      },
    ],
  },
  {
    id: 'w2-d1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le quotient familial',
    questions: [
      {
        q: "Quel est le principe fondamental du quotient familial en France ?",
        options: [
          "Taxer davantage les familles nombreuses",
          "Ajuster l'impôt sur le revenu en fonction de la composition et des charges de famille du foyer",
          "Diviser les revenus par le nombre d'années de travail",
          "Offrir une prime de naissance déductible des impôts",
        ],
        correct: 1,
        rationale: "Ajuster l'impôt selon la composition du foyer. À revenu égal, une famille avec enfants paie moins d'impôts qu'un célibataire.",
      },
      {
        q: "Combien de part(s) fiscale(s) un couple marié ou pacsé sans enfant possède-t-il ?",
        options: ["1 part", "1,5 part", "2 parts", "3 parts"],
        correct: 2,
        rationale: "2 parts. Chaque conjoint compte pour une part entière (1 + 1).",
      },
      {
        q: "Comment sont comptabilisés les deux premiers enfants à charge dans le calcul des parts fiscales ?",
        options: [
          "0,5 part chacun",
          "1 part chacun",
          "0,25 part chacun",
          "Ils ne donnent droit à aucune part mais à un crédit d'impôt",
        ],
        correct: 0,
        rationale: "0,5 part chacun. Le premier enfant apporte une demi-part, le deuxième aussi.",
      },
      {
        q: "À partir du troisième enfant, combien de part(s) fiscale(s) supplémentaire(s) est/sont attribuée(s) par enfant ?",
        options: ["0,5 part", "1 part entière", "1,5 part", "2 parts"],
        correct: 1,
        rationale: "1 part entière. Un couple avec 3 enfants = 4 parts.",
      },
      {
        q: "Qu'appelle-t-on le « plafonnement du quotient familial » ?",
        options: [
          "L'interdiction d'avoir plus de 5 enfants sur sa déclaration",
          "Une limite légale à la réduction d'impôt procurée par chaque demi-part liée aux personnes à charge",
          "Le montant maximum que l'on peut gagner pour payer des impôts",
          "Le plafond de revenus au-delà duquel on ne peut plus se pacser",
        ],
        correct: 1,
        rationale: "Une limite légale à la réduction par demi-part. Pour les hauts revenus, la baisse d'impôt liée aux enfants est plafonnée (environ 1 759 € par demi-part en 2024).",
      },
      {
        q: "Comment les parts fiscales sont-elles réparties pour un enfant en garde alternée (sans accord contraire des parents) ?",
        options: [
          "Le parent qui gagne le plus prend toutes les parts",
          "L'avantage est divisé par deux (0,25 part pour les 2 premiers enfants)",
          "Le juge décide chaque année qui prend la part",
          "L'enfant compte double",
        ],
        correct: 1,
        rationale: "L'avantage est divisé par deux. En garde alternée équilibrée, la charge est partagée, donc la demi-part est divisée en deux (0,25 par parent).",
      },
      {
        q: "Quel avantage fiscal est accordé à un parent isolé (célibataire, divorcé, veuf) élevant seul son enfant (Case T cochée) ?",
        options: [
          "Il ne paie aucun impôt pendant 3 ans",
          "Le premier enfant compte pour 1 part entière au lieu de 0,5 part",
          "Ses revenus sont divisés par 3",
          "L'enfant n'est pas compté pour éviter le plafonnement",
        ],
        correct: 1,
        rationale: "Le premier enfant compte pour 1 part entière. C'est la majoration « parent isolé » : un parent seul avec un enfant bénéficie de 2 parts.",
      },
      {
        q: "Mécaniquement, comment le quotient familial réduit-il l'impôt ?",
        options: [
          "Il s'agit d'une déduction à la fin du calcul",
          "On divise le revenu net imposable par le nombre de parts avant d'appliquer le barème progressif, ce qui permet de rester dans des tranches d'imposition plus basses",
          "Il rembourse directement 50 % de l'impôt",
          "Il annule la tranche à 45 % pour toutes les familles",
        ],
        correct: 1,
        rationale: "Le revenu est divisé par le nombre de parts avant le barème. En abaissant la base soumise au barème progressif, on paie moins.",
      },
      {
        q: "(Challenge) Un couple non marié et non pacsé (concubins) a un enfant. Comment cela se passe-t-il pour le quotient familial ?",
        options: [
          "Les deux déclarent 1,5 part sur leurs feuilles d'impôts respectives",
          "Ils ont l'obligation de faire une déclaration commune",
          "L'enfant ne peut être rattaché qu'au foyer fiscal d'un seul des deux parents (qui aura donc 1,5 part), l'autre parent déclare 1 part",
          "L'enfant est perdu fiscalement",
        ],
        correct: 2,
        rationale: "L'enfant ne peut être rattaché qu'à un seul parent. Les concubins font des déclarations séparées.",
      },
      {
        q: "(Challenge) Monsieur X, très fortuné, a 3 enfants. Sans ses enfants, il paierait 100 000 € d'impôts. Avec 4 parts (couple + 3 enfants), le calcul théorique donne 80 000 €. Sachant que le plafond de l'avantage fiscal est fixé (à titre d'exemple) à environ 1 750 € par demi-part. Que va-t-il se passer ?",
        options: [
          "Il paiera 80 000 €",
          "Le fisc lui remboursera la différence",
          "L'avantage théorique (20 000 €) dépasse le plafond légal pour ses 4 demi-parts (4 × 1750 = 7000 €), son impôt final sera donc de 93 000 € (100k - 7k)",
          "Il perd le bénéfice de ses parts car il est trop riche",
        ],
        correct: 2,
        rationale: "L'avantage théorique dépasse le plafond légal, l'impôt est recalculé. C'est le principe du plafonnement du quotient familial.",
      },
    ],
  },
  {
    id: 'w2-d2', dayName: 'Mercredi', theme: 'Retraite', title: 'Trimestres cotisés vs validés',
    questions: [
      {
        q: "Dans le système de retraite français, qu'est-ce qu'un trimestre « validé » ?",
        options: [
          "Un trimestre où l'on a obligatoirement travaillé 90 jours consécutifs",
          "L'unité de base de la durée d'assurance, qui permet de déterminer si on a droit à une retraite à taux plein",
          "Un trimestre payé par l'employeur sous forme de prime",
          "Une période de 3 mois de vacances",
        ],
        correct: 1,
        rationale: "L'unité de base de la durée d'assurance. Les trimestres validés (cotisés + assimilés) déterminent le taux de la pension.",
      },
      {
        q: "Sur quel critère valide-t-on aujourd'hui un trimestre par le travail (trimestre cotisé) ?",
        options: [
          "En travaillant exactement 3 mois (90 jours)",
          "En percevant une rémunération soumise à cotisations équivalente à au moins 150 fois le SMIC horaire",
          "En faisant 35 heures par semaine minimum",
          "Uniquement si on est en CDI",
        ],
        correct: 1,
        rationale: "En percevant l'équivalent d'au moins 150 fois le SMIC horaire. On compte le salaire cotisé, pas le temps de travail.",
      },
      {
        q: "Qu'est-ce qu'un « trimestre assimilé » ?",
        options: [
          "Un trimestre racheté à la caisse de retraite",
          "Un trimestre validé lors de périodes d'inactivité involontaire (chômage, maladie, maternité, service militaire) sans avoir versé de cotisations",
          "Un trimestre validé en travaillant à l'étranger hors Europe",
          "Un trimestre donné gratuitement à tous les travailleurs à 50 ans",
        ],
        correct: 1,
        rationale: "Un trimestre validé lors d'inactivité involontaire. Le système est solidaire lors des accidents ou événements de la vie.",
      },
      {
        q: "Quelle est la principale différence concrète entre le nombre total de « trimestres validés » et le nombre de « trimestres cotisés » ?",
        options: [
          "Les trimestres cotisés sont toujours supérieurs aux trimestres validés",
          "Les trimestres validés incluent les trimestres cotisés ET les trimestres assimilés",
          "Il n'y a aucune différence, c'est un synonyme",
          "Les trimestres cotisés ne comptent que pour la retraite complémentaire",
        ],
        correct: 1,
        rationale: "Validés = Cotisés + Assimilés + Majorations (enfants).",
      },
      {
        q: "Combien de trimestres au maximum peut-on valider par an ?",
        options: ["3", "4", "5", "Il n'y a pas de limite, cela dépend du salaire"],
        correct: 1,
        rationale: "4 trimestres par an maximum. Même en gagnant 1000 fois le SMIC horaire dans l'année, impossible de valider plus.",
      },
      {
        q: "Pour bénéficier du dispositif de départ anticipé pour « Carrière Longue », quel type de trimestre est scruté en priorité par les caisses de retraite ?",
        options: [
          "Les trimestres assimilés",
          "Les trimestres validés globaux",
          "Les trimestres cotisés (issus du travail effectif)",
          "Uniquement les trimestres d'études",
        ],
        correct: 2,
        rationale: "Les trimestres cotisés. La loi exige un nombre précis de trimestres réellement cotisés pour prouver l'effort contributif.",
      },
      {
        q: "Quel avantage en trimestres (majoration) est généralement accordé au titre de la maternité et de l'éducation dans le régime général ?",
        options: [
          "1 trimestre par enfant",
          "8 trimestres par enfant (généralement 4 pour la maternité/adoption et 4 pour l'éducation)",
          "20 trimestres par enfant",
          "Une retraite immédiate au 3ème enfant",
        ],
        correct: 1,
        rationale: "8 trimestres par enfant. Ces majorations facilitent l'atteinte du taux plein.",
      },
      {
        q: "Quel est le risque de partir à la retraite si l'on n'a pas atteint le nombre de « trimestres validés » requis pour sa génération ?",
        options: [
          "La pension sera annulée",
          "On subit une « décote » (réduction définitive du montant de la pension)",
          "On subit une « surcote »",
          "La pension est payée sous forme de capital unique",
        ],
        correct: 1,
        rationale: "On subit une décote. Le taux de liquidation est minoré, ce qui baisse la pension à vie.",
      },
      {
        q: "(Challenge) Un étudiant travaille 2 mois l'été. Il gagne au total l'équivalent de 350 fois le SMIC horaire. Que se passe-t-il pour sa retraite ?",
        options: [
          "Il valide 0 trimestre car il n'a pas travaillé 3 mois entiers",
          "Il valide 2 trimestres cotisés (car 350 / 150 = 2,33)",
          "Il valide 4 trimestres automatiquement car il est étudiant",
          "Il valide 1 trimestre assimilé",
        ],
        correct: 1,
        rationale: "Il valide 2 trimestres cotisés. La validation dépend du salaire (1 trimestre = 150h SMIC), pas du temps de travail.",
      },
      {
        q: "(Challenge) Le minimum contributif (MiCo) est un dispositif qui garantit une retraite minimale. Pour obtenir le MiCo « majoré », quelle est la condition sur les trimestres ?",
        options: [
          "Avoir au moins 120 trimestres assimilés (chômage)",
          "Avoir racheté au moins 12 trimestres",
          "Avoir au moins 120 trimestres réellement cotisés",
          "Avoir 1 seul trimestre validé dans sa vie",
        ],
        correct: 2,
        rationale: "120 trimestres réellement cotisés. Le système valorise le travail effectif pour la majoration.",
      },
    ],
  },
  {
    id: 'w2-d3', dayName: 'Jeudi', theme: 'Transmission', title: 'La réserve héréditaire',
    questions: [
      {
        q: "Qu'est-ce que la « réserve héréditaire » en droit français ?",
        options: [
          "Une taxe prélevée par l'État sur tous les héritages",
          "La part du patrimoine dont on peut disposer librement par testament",
          "Une part minimum du patrimoine obligatoirement réservée par la loi à certains héritiers très proches",
          "Le compte bancaire sur lequel sont versés les fonds du défunt",
        ],
        correct: 2,
        rationale: "Une part obligatoirement réservée à certains héritiers proches. Le droit français protège la famille et empêche de déshériter totalement certains membres.",
      },
      {
        q: "Qui sont les principaux « héritiers réservataires » ?",
        options: [
          "Les frères et sœurs du défunt",
          "Les enfants du défunt (descendants)",
          "Les parents du défunt (ascendants)",
          "L'État",
        ],
        correct: 1,
        rationale: "Les enfants (descendants). Depuis 2006, les parents ne sont plus réservataires.",
      },
      {
        q: "Dans le cas où le défunt laisse un seul enfant, quelle est la fraction du patrimoine qui constitue la réserve héréditaire ?",
        options: ["1/4 du patrimoine", "1/2 du patrimoine", "3/4 du patrimoine", "100 % du patrimoine"],
        correct: 1,
        rationale: "1/2 du patrimoine. Avec un enfant, la moitié lui est obligatoirement réservée.",
      },
      {
        q: "Si le défunt laisse deux enfants, quelle est la fraction de la réserve héréditaire globale ?",
        options: ["1/2", "2/3 (soit 1/3 par enfant)", "3/4", "L'intégralité du patrimoine"],
        correct: 1,
        rationale: "2/3 du patrimoine. Avec deux enfants, les deux tiers leur sont réservés.",
      },
      {
        q: "À partir de trois enfants et plus, à combien s'élève la réserve héréditaire globale ?",
        options: [
          "3/4 du patrimoine (à se partager entre tous les enfants)",
          "90 % du patrimoine",
          "100 % du patrimoine",
          "Elle redescend à 1/2",
        ],
        correct: 0,
        rationale: "3/4 du patrimoine. C'est le plafond : qu'il y ait 3, 4 ou 10 enfants, la réserve bloquera au maximum 3/4.",
      },
      {
        q: "Comment nomme-t-on la part restante du patrimoine (qui n'est pas dans la réserve) et dont le défunt peut faire ce qu'il veut (donations, testament) ?",
        options: ["Le reliquat successoral", "La quotité disponible", "L'usufruit", "La réserve secondaire"],
        correct: 1,
        rationale: "La quotité disponible. On peut la donner à un tiers, à une association, ou pour avantager un enfant.",
      },
      {
        q: "Le conjoint survivant (veuf/veuve) est-il un héritier réservataire ?",
        options: [
          "Oui, dans 100 % des cas",
          "Non, jamais",
          "Oui, mais uniquement si le défunt n'a laissé aucun descendant (enfant/petit-enfant)",
          "Uniquement s'il y a un contrat de mariage",
        ],
        correct: 2,
        rationale: "Uniquement en l'absence de descendants. Le conjoint devient alors réservataire à hauteur de 1/4.",
      },
      {
        q: "Que se passe-t-il si de son vivant, un parent donne tellement d'argent à un ami que, lors de son décès, il ne reste plus assez pour couvrir la réserve héréditaire des enfants ?",
        options: [
          "Tant pis pour les enfants, le don est définitif",
          "L'ami va en prison pour abus de faiblesse",
          "Les enfants peuvent intenter une « action en réduction » pour forcer l'ami à rembourser la part manquante",
          "L'État compense la perte pour les enfants",
        ],
        correct: 2,
        rationale: "Les enfants peuvent intenter une action en réduction. Les libéralités qui dépassent la quotité disponible doivent être réduites.",
      },
      {
        q: "(Challenge) Un père a deux enfants (Marc et Sophie). Il rédige un testament indiquant : « Je lègue toute ma quotité disponible à Marc ». Le jour du décès, le patrimoine est de 300 000 €. Combien Marc va-t-il recevoir au total ?",
        options: ["150 000 €", "200 000 €", "300 000 €", "100 000 € (Sophie est déshéritée)"],
        correct: 1,
        rationale: "200 000 €. Réserve 2/3 = 200k (100k par enfant), quotité disponible 1/3 = 100k. Marc reçoit 100k + 100k.",
      },
      {
        q: "(Challenge) Est-il possible, par un acte légal en France, pour un enfant majeur d'accepter par avance de renoncer à attaquer un don qui empièterait sur sa part de réserve héréditaire ?",
        options: [
          "Non, la réserve est d'ordre public absolu",
          "Oui, par un acte notarié spécifique appelé « Renonciation Anticipée à l'Action en Réduction » (RAAR)",
          "Oui, sur simple lettre manuscrite",
          "Oui, mais seulement si l'enfant gagne plus que ses parents",
        ],
        correct: 1,
        rationale: "Oui, par une RAAR. Depuis 2006, un héritier peut consentir devant deux notaires (utile pour transmettre une entreprise).",
      },
    ],
  },
  {
    id: 'w2-d4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'Franchises et plafonds',
    questions: [
      {
        q: "En matière d'assurance (auto, habitation, santé), qu'est-ce qu'une franchise ?",
        options: [
          "Le montant maximum remboursé par l'assurance",
          "La prime annuelle que doit payer l'assuré",
          "La somme qui reste à la charge de l'assuré après l'indemnisation d'un sinistre",
          "Le bonus accordé aux bons conducteurs",
        ],
        correct: 2,
        rationale: "La somme qui reste à charge. Sinistre à 1000 € avec franchise à 200 € : l'assureur paie 800 €.",
      },
      {
        q: "Quel est le but principal de la franchise pour l'assureur ?",
        options: [
          "Gagner plus d'argent sur les primes",
          "Responsabiliser l'assuré et éviter la gestion coûteuse des tous petits sinistres",
          "Pousser l'assuré à résilier son contrat",
          "Contourner la loi sur les assurances",
        ],
        correct: 1,
        rationale: "Responsabiliser l'assuré et éviter les petits sinistres. Sans franchise, les frais de gestion exploseraient.",
      },
      {
        q: "Quel est l'impact mécanique d'une franchise élevée sur la prime (la cotisation) d'assurance ?",
        options: [
          "La prime sera plus élevée",
          "La prime sera plus basse",
          "Cela n'a aucun impact sur la prime",
          "La prime devient aléatoire",
        ],
        correct: 1,
        rationale: "La prime sera plus basse. Plus l'assuré prend de risque financier, moins l'assureur en prend, donc moins la cotisation est chère.",
      },
      {
        q: "Qu'est-ce qu'un « plafond de garantie » ?",
        options: [
          "La limite de revenus pour souscrire au contrat",
          "La somme minimale que l'assureur s'engage à payer",
          "Le montant maximum de l'indemnisation que l'assureur versera en cas de sinistre",
          "Le délai maximal pour déclarer un sinistre",
        ],
        correct: 2,
        rationale: "Le montant maximum de l'indemnisation. Sinistre à 100 000 €, plafond à 80 000 € : 20 000 € restent à charge.",
      },
      {
        q: "Qu'est-ce qu'une « franchise absolue » ?",
        options: [
          "Elle est déduite de l'indemnité dans tous les cas, quel que soit le montant du sinistre",
          "Elle annule purement et simplement le contrat",
          "Elle n'est appliquée que si l'assuré est à 100 % responsable",
          "L'assureur ne rembourse que si le sinistre est inférieur à la franchise",
        ],
        correct: 0,
        rationale: "Déduite dans tous les cas. Que le sinistre soit de 500 ou 5000 €, on déduit toujours le montant fixe.",
      },
      {
        q: "À l'inverse, comment fonctionne une « franchise relative » (ou franchise simple) ?",
        options: [
          "L'assureur paie un pourcentage du sinistre",
          "L'assureur ne paie rien si le sinistre est inférieur à la franchise. S'il est supérieur, l'assureur rembourse le sinistre dans son intégralité (sans rien déduire)",
          "Elle est relative aux revenus de l'assuré",
          "L'assuré décide lui-même de la payer ou non",
        ],
        correct: 1,
        rationale: "Remboursement intégral si le sinistre dépasse la franchise. Franchise 300 € : sinistre 200 € = 0, sinistre 400 € = 400.",
      },
      {
        q: "En assurance auto/habitation, comment s'exprime une franchise proportionnelle ?",
        options: [
          "En jours (ex : 3 jours de franchise)",
          "En pourcentage du montant du sinistre (souvent encadré par un montant minimum et maximum)",
          "En points de fidélité",
          "En pourcentage de la prime d'assurance",
        ],
        correct: 1,
        rationale: "En pourcentage du sinistre. Exemple : 10 % avec un minimum de 150 € et un maximum de 500 €.",
      },
      {
        q: "Dans le cadre d'un arrêté de « Catastrophe Naturelle » (Cat Nat), qui fixe le montant de la franchise (ex : inondation d'une maison) ?",
        options: [
          "L'assureur librement",
          "Le maire de la commune",
          "L'État par voie réglementaire (la franchise est légale et identique pour tous)",
          "L'expert en assurance après évaluation",
        ],
        correct: 2,
        rationale: "L'État par voie réglementaire. Franchise Cat Nat fixée par la loi (380 € pour les habitations), non modifiable dans le contrat.",
      },
      {
        q: "(Challenge) Un client a un dégât des eaux estimé à 5 000 €. Son contrat prévoit une franchise proportionnelle de 10 %, avec un minimum de 200 € et un plafond de franchise de 400 €. Quelle somme va-t-il recevoir de l'assureur ?",
        options: [
          "4 500 € (il paie 10 % soit 500 €)",
          "4 800 € (la franchise bloque au minimum de 200 €)",
          "4 600 € (la franchise est de 10 % soit 500 €, mais elle est plafonnée à 400 €)",
          "5 000 € (l'assureur paie tout)",
        ],
        correct: 2,
        rationale: "4 600 €. 10 % de 5000 = 500 €, plafonné à 400 €. L'assureur verse 5000 - 400 = 4600 €.",
      },
      {
        q: "(Challenge) Un assuré est victime d'un accident de voiture dont il n'est absolument pas responsable (un tiers l'a percuté à un feu rouge). Le tiers est identifié. Que se passe-t-il pour la franchise auto de la victime ?",
        options: [
          "Elle paie la franchise normalement",
          "Elle paie la moitié de la franchise",
          "L'assureur ne lui applique aucune franchise car elle est à 0 % en tort (recours contre l'assurance du tiers)",
          "Sa franchise est doublée",
        ],
        correct: 2,
        rationale: "Aucune franchise appliquée. Elle ne s'applique que si l'assuré est responsable ou s'il n'y a pas de tiers identifié.",
      },
    ],
  },
  {
    id: 'w2-d5', dayName: 'Samedi', theme: 'Immobilier', title: 'Fonctionnement du crédit',
    questions: [
      {
        q: "Dans un crédit immobilier « amortissable » classique, de quoi est composée la mensualité (hors assurance) ?",
        options: [
          "Uniquement d'intérêts",
          "Uniquement de capital",
          "D'une part de capital remboursé et d'une part d'intérêts payés à la banque",
          "De la taxe foncière et des frais de notaire",
        ],
        correct: 2,
        rationale: "Capital + intérêts. Chaque mois, l'emprunteur paie des intérêts sur le capital restant dû et rembourse une petite partie du capital.",
      },
      {
        q: "Comment évolue la proportion des intérêts dans la mensualité d'un prêt amortissable à taux fixe au fil des années ?",
        options: [
          "Elle augmente avec le temps",
          "Elle est très forte au début du crédit, puis diminue progressivement",
          "Elle reste exactement la même du premier au dernier mois",
          "Les intérêts ne sont payés qu'à la dernière mensualité",
        ],
        correct: 1,
        rationale: "Très forte au début, puis diminue. Les intérêts sont calculés sur le capital restant dû.",
      },
      {
        q: "Qu'est-ce qu'un prêt « In Fine » ?",
        options: [
          "Un prêt où les mensualités baissent chaque année",
          "Un prêt où l'emprunteur ne paie que les intérêts pendant la durée du crédit, et rembourse l'intégralité du capital en une seule fois à la fin",
          "Un prêt sans aucun intérêt bancaire",
          "Un prêt accordé uniquement aux retraités",
        ],
        correct: 1,
        rationale: "On ne paie que les intérêts, puis le capital en une fois à la fin. Souvent utilisé par les investisseurs pour maximiser la déduction fiscale.",
      },
      {
        q: "Quel indicateur réglementaire permet de comparer le coût global (intérêts + assurance + frais de dossier/garantie) de deux offres de prêt immobilier ?",
        options: [
          "Le taux nominal",
          "Le TAEG (Taux Annuel Effectif Global)",
          "Le taux d'usure",
          "Le taux d'endettement",
        ],
        correct: 1,
        rationale: "Le TAEG. Il intègre le taux d'intérêt + tous les frais obligatoires (assurance, garantie, dossier).",
      },
      {
        q: "Qu'est-ce que le « taux d'usure » défini par la Banque de France ?",
        options: [
          "Le taux d'usure de l'appartement acheté",
          "Le taux d'intérêt minimal autorisé",
          "Le taux d'intérêt maximum légal (TAEG) au-delà duquel une banque a l'interdiction de prêter",
          "Le pourcentage du salaire qu'on a le droit de dépenser",
        ],
        correct: 2,
        rationale: "Le taux d'intérêt maximum légal. Plafond fixé par la Banque de France pour protéger les emprunteurs.",
      },
      {
        q: "Selon les recommandations actuelles du HCSF (Haut Conseil de Stabilité Financière), à quel pourcentage le « taux d'endettement » maximum (mensualités / revenus nets) est-il généralement plafonné ?",
        options: [
          "15 %",
          "35 % (assurance emprunteur incluse)",
          "50 %",
          "66 %",
        ],
        correct: 1,
        rationale: "35 % assurance incluse. Les banques ne doivent pas dépasser ce seuil pour éviter le surendettement.",
      },
      {
        q: "À quoi sert « l'apport personnel » exigé par les banques (souvent 10 % du prix du bien) ?",
        options: [
          "À payer la commission de l'agent immobilier uniquement",
          "À couvrir a minima les « frais de notaire » (frais de mutation) et de garantie, car la banque finance rarement plus que la valeur réelle du bien (les murs)",
          "À payer l'assurance emprunteur en avance",
          "À rémunérer le banquier",
        ],
        correct: 1,
        rationale: "À couvrir les frais de notaire et de garantie. En cas de saisie, la banque récupère la valeur du bien mais pas les taxes.",
      },
      {
        q: "En France, la loi Scrivener impose un délai de réflexion obligatoire à l'emprunteur après réception de l'offre de prêt. De combien est-il ?",
        options: [
          "2 jours",
          "10 jours incompressibles (acceptation possible à partir du 11ème jour)",
          "30 jours",
          "3 mois",
        ],
        correct: 1,
        rationale: "10 jours incompressibles. Délai d'ordre public qui protège le consommateur contre la précipitation.",
      },
      {
        q: "(Challenge) Un client souhaite faire un remboursement anticipé de son prêt immobilier. La banque lui demande des IRA (Indemnités de Remboursement Anticipé). Quel est le plafond légal de ces pénalités ?",
        options: [
          "6 mois d'intérêts sur le capital remboursé au taux moyen du prêt, dans la limite de 3 % du capital restant dû",
          "10 % du capital restant dû",
          "Les IRA sont totalement interdites par la loi en France",
          "1 mois de salaire",
        ],
        correct: 0,
        rationale: "6 mois d'intérêts, limité à 3 % du capital restant dû. Plafond légal pour protéger le consommateur.",
      },
      {
        q: "(Challenge) Pourquoi un crédit sur 25 ans coûte-t-il au total beaucoup plus cher en intérêts qu'un crédit sur 15 ans pour le même montant emprunté ?",
        options: [
          "Parce que les banques appliquent des frais de dossier plus élevés",
          "Parce que l'assurance est obligatoire sur 25 ans mais pas sur 15 ans",
          "Parce qu'on rembourse le capital beaucoup plus lentement, donc les intérêts (calculés chaque mois sur le capital restant dû) courent sur une base élevée pendant plus longtemps, et le taux nominal est souvent supérieur",
          "Parce que la loi sanctionne les prêts longs par une taxe d'État",
        ],
        correct: 2,
        rationale: "On rembourse plus lentement, donc les intérêts courent plus longtemps sur une base élevée. Effet boule de neige du temps.",
      },
    ],
  },
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
