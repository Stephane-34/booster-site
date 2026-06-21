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
      { n: 1,  topics: ['Épargne vs Investissement', 'Le prélèvement à la source', 'Le système par répartition', 'Hériter sans préparation', 'La Responsabilité Civile', 'Acheter vs Louer'] },
      { n: 2,  topics: ["L'inflation", 'Le quotient familial', 'Trimestres cotisés vs validés', 'La réserve héréditaire', 'Franchises et plafonds', 'Fonctionnement du crédit'] },
      { n: 3,  topics: ['Les intérêts composés', 'Les tranches marginales (TMI)', 'Âge légal et taux plein', 'Le rôle du notaire', 'MRH pour le locataire', "Capacité d'endettement"] },
      { n: 4,  topics: ['Livret A et LDDS', 'Déduction vs Réduction', 'Le relevé de carrière', 'PACS vs Mariage (décès)', 'MRH pour le propriétaire', 'Les frais de notaire'] },
      { n: 5,  topics: ['LEP et Livret Jeune', "Le crédit d'impôt", 'Le système Agirc-Arrco', "L'ordre des héritiers", 'Le constat amiable auto', 'Le TAEG du crédit'] },
      { n: 6,  topics: ['Assurance Vie (fonds euros)', 'Déclarer ses revenus', 'Le minimum contributif', 'Droits du conjoint survivant', 'Assurance auto (Tiers/Tous risques)', "PTZ et aides à l'achat"] },
      { n: 7,  topics: ['Risque vs Rendement', 'Le calendrier fiscal', 'Le régime de base (CNAV)', 'Les frais de succession', 'La Garantie Accidents de la Vie', "Étapes de l'achat immobilier"] },
      { n: 8,  topics: ['La diversification', 'Le quotient conjugal', 'La décote et la surcote', 'Les bases du testament', 'La complémentaire santé', "L'offre d'achat"] },
      { n: 9,  topics: ["L'horizon de placement", "Taxe foncière et d'habitation", "L'espace Info Retraite", "L'indivision (bases)", "L'assurance scolaire", 'Compromis vs Promesse'] },
      { n: 10, topics: ['Introduction à la bourse', 'Introduction aux niches fiscales', 'La pension de réversion', 'La donation simple', 'La protection juridique', 'Le délai de rétractation (SRU)'] },
      { n: 11, topics: ['Le PEA', 'Le Prélèvement Forfaitaire Unique', 'Retraite des indépendants', "Le présent d'usage", "L'assurance dépendance", "L'apport personnel"] },
      { n: 12, topics: ['Le Compte Titres (CTO)', 'Le déficit foncier', "L'expatriation (bases)", 'Le démembrement (concept)', 'Télétravail et assurances', 'Les garanties (hypothèque, caution)'] },
      { n: 13, topics: ['Les ETF (Trackers)', 'Les frais réels (salariés)', 'Rachat de trimestres', 'Les abattements légaux', 'La déclaration de sinistre', "L'état des lieux"] },
    ],
  },
  {
    id: 'p2',
    name: 'La Structuration',
    range: 'Semaines 14 → 26',
    description: "Manipuler des enveloppes plus complexes et entrer dans l'optimisation active.",
    weeks: [
      { n: 14, topics: ['Actions vs Obligations', "Fiscalité de l'Assurance Vie", 'Le PER Individuel', 'Assurance Vie (clause standard)', 'La loi Lemoine', "L'investissement locatif (nu)"] },
      { n: 15, topics: ['Les SCPI (bases)', 'Fiscalité du PEA', 'Le PER Collectif', 'Assurance Vie (fiscalité décès)', "La délégation d'assurance", "L'investissement meublé (LMNP)"] },
      { n: 16, topics: ['OPCVM et SICAV', 'Fiscalité du CTO', 'Déblocage anticipé du PER', 'La donation-partage', 'Prévoyance (Invalidité)', 'Micro-foncier vs Réel'] },
      { n: 17, topics: ['Private Equity (intro)', 'Impôt sur la Fortune Immobilière', 'Le cumul emploi-retraite', 'Donation au dernier vivant', 'Prévoyance (Incapacité)', 'Rentabilité brute vs nette'] },
      { n: 18, topics: ['Le Crowdfunding', 'Les dons aux associations', 'Le PERCO', 'Transmettre un bien immobilier', 'Prévoyance (Décès)', 'Le cash-flow immobilier'] },
      { n: 19, topics: ["L'or et les métaux précieux", 'Emploi à domicile (CESU)', 'Retraite par capitalisation', 'Fiscalité des donations', "Mutuelle d'entreprise (ANI)", "Le choix de l'emplacement"] },
      { n: 20, topics: ['Les matières premières', "Travaux d'économie d'énergie", 'Le PER Obligatoire', "Donation avec réserve d'usufruit", 'La Loi Badinter (auto)', 'La colocation (bases)'] },
      { n: 21, topics: ['Cryptomonnaies (bases)', 'Frais de garde et gestion', 'Sortie en rente vs capital', 'Transmettre son entreprise', 'Assurance Loyers Impayés (GLI)', 'La location courte durée (Airbnb)'] },
      { n: 22, topics: ['Bitcoin et Ethereum', 'Plus-values immobilières', "Fiscalité du PER à l'entrée", 'La tontine', 'Assurance PNO', 'Fiscalité LMNP (amortissement)'] },
      { n: 23, topics: ["Le profil d'investisseur", 'Plus-values mobilières', 'Les carrières longues', 'Clause bénéficiaire démembrée', 'Franchise kilométrique (auto)', 'La recherche de locataires'] },
      { n: 24, topics: ['Gestion libre vs pilotée', 'Fiscalité des cryptos', 'Le compte pénibilité (C2P)', "L'usufruit successif", 'Valeur à neuf vs Vétusté', 'La gestion locative déléguée'] },
      { n: 25, topics: ['Le DCA (Investissement lissé)', 'Exonérations résidence principale', 'Le chômage et la retraite', 'Mandat de protection future', 'Les catastrophes naturelles', 'La copropriété et les charges'] },
      { n: 26, topics: ['Biais cognitifs en finance', 'Optimiser sa déclaration', 'Majoration pour enfants', 'Testament authentique vs olographe', "Quotités d'assurance emprunteur", "L'Assemblée Générale (AG)"] },
    ],
  },
  {
    id: 'p3',
    name: "L'Optimisation",
    range: 'Semaines 27 → 39',
    description: "Maîtriser l'ingénierie patrimoniale en croisant les différents sujets.",
    weeks: [
      { n: 27, topics: ['Les produits structurés', 'Défiscalisation Pinel', 'La retraite progressive', 'Le Pacte Dutreil (bases)', 'Prévoyance TNS (Madelin)', 'La SCI (bases)'] },
      { n: 28, topics: ['SCPI en démembrement', 'La loi Denormandie', 'PER et transmission', 'Société Civile Patrimoniale', "L'assurance Homme Clé", "SCI à l'IR vs SCI à l'IS"] },
      { n: 29, topics: ['Crowdimmo (avancé)', 'La loi Malraux', 'Les types de rentes viagères', 'La SCI comme outil de transmission', 'Le chômage du dirigeant', "L'immeuble de rapport"] },
      { n: 30, topics: ['Finance Décentralisée (DeFi)', 'Les Monuments Historiques', 'Expatriation et conventions', 'La SARL de famille', "Assurance perte d'exploitation", 'La division foncière'] },
      { n: 31, topics: ['Staking et Yield (Crypto)', 'Le statut LMP', 'Rachat de trimestres (calculs)', 'Transmettre via une holding', 'Responsabilité Civile Pro', 'La rénovation énergétique (DPE)'] },
      { n: 32, topics: ['FCPR et FCPI', 'La loi Girardin', 'Retraite des fonctionnaires', 'La fiducie', 'La multirisque professionnelle', 'Déficit foncier (optimisation)'] },
      { n: 33, topics: ['Les SOFICA', 'Le Girardin industriel', 'Chocs démographiques (impact)', "Cession d'usufruit temporaire", "Assurance Cyber-risques", "Vente en l'État Futur d'Achèvement"] },
      { n: 34, topics: ['Investir dans les forêts', 'Le Girardin agricole', 'Retraite professions libérales', 'Le quasi-usufruit', 'Assurance Responsabilité Dirigeant', "L'achat aux enchères"] },
      { n: 35, topics: ['Investir dans le vin', 'Plafonnement des niches', 'Pension d\'invalidité vs Retraite', "L'avance sur héritage", 'La flotte automobile (pro)', "Le viager (côté acheteur)"] },
      { n: 36, topics: ['Art et objets de collection', 'Régime mère-fille', "L'épargne salariale (PEE)", 'Le généalogiste successoral', 'La mutuelle TNS', 'Le viager (côté vendeur)'] },
      { n: 37, topics: ['Stock-picking (titres vifs)', "L'intégration fiscale", 'Retraite additionnelle (RAFP)', 'La révocation des donations', 'La caisse de prévoyance', 'SCPI de plus-value'] },
      { n: 38, topics: ['Analyse fondamentale', 'Holding animatrice vs passive', 'Plafond Sécurité Sociale (PASS)', "L'exhérédation (limites)", 'Retraite et prévoyance croisées', 'Marchand de biens'] },
      { n: 39, topics: ['Analyse technique', "L'abus de droit fiscal", 'La liquidation de la retraite', 'La transmission internationale', 'Assurance construction (DO)', 'Le bail réel solidaire (BRS)'] },
    ],
  },
  {
    id: 'p4',
    name: "L'Expertise",
    range: 'Semaines 40 → 52',
    description: 'Maîtriser les cas complexes, montages institutionnels et gestion des grands patrimoines.',
    weeks: [
      { n: 40, topics: ['Allocation institutionnelle', 'Ingénierie fiscale avancée', 'Stratégie de sortie du PER', 'Démembrement de titres', 'La Garantie Décennale', "L'OBO immobilier"] },
      { n: 41, topics: ['Le crédit Lombard', 'Structuration internationale', 'Polypensionnés complexes', "L'OBO de transmission", 'Assurance Tous Risques Chantier', 'La promotion immobilière'] },
      { n: 42, topics: ['Les Options et Futures', 'Optimiser la rémunération', 'Retraite et inflation (hedging)', 'Pacte Dutreil (avancé)', 'Audit des risques du patrimoine', 'Crowdfunding côté promoteur'] },
      { n: 43, topics: ['Effet de levier financier', 'Fiscalité de la cession', 'Bilan retraite sur mesure', "Family Office", 'Assurance kidnapping / rançon', 'Le foncier commercial'] },
      { n: 44, topics: ['Private Wealth Management', "L'Exit tax", 'Les rentes indexées', 'Fondations et fonds de dotation', 'Assurance art et biens précieux', 'SCPI de rendement (optimisation)'] },
      { n: 45, topics: ['Les fonds quantitatifs', 'Conventions fiscales', 'Les départs anticipés', 'Transmettre du patrimoine numérique', "La captive d'assurance", 'La location nue professionnelle'] },
      { n: 46, topics: ['Investissement ESG / ISR', 'Fiscalité des trusts', 'Retraite chapeau (Art. 39)', 'Assurance vie luxembourgeoise', 'La réassurance', 'Les OPCI'] },
      { n: 47, topics: ['ETF à effet de levier', 'Fiscalité des brevets', 'Le compte Article 83', 'Protection du conjoint hors mariage', 'Gestion des sinistres complexes', 'Les baux commerciaux'] },
      { n: 48, topics: ['Warrants et Turbos', 'Optimisation des plus-values', 'Taux de remplacement', 'Droit international privé', 'RC des mandataires sociaux', 'Immobilier tokenisé (Blockchain)'] },
      { n: 49, topics: ['Obligations convertibles', 'La TVA immobilière', 'PER et expatriation', 'Transmission de cryptomonnaies', 'Prévoyance croisée entre associés', "L'achat de nue-propriété"] },
      { n: 50, topics: ['Stratégies de Hedge Funds', 'Fiscalité des stock-options', 'Régime des impatriés', "Clause d'accroissement", 'La couverture de change', 'Les baux ruraux / agricoles'] },
      { n: 51, topics: ["Trésorerie d'entreprise", 'BSPCE et AGA', 'Bilan de compétences senior', 'Tutelle et curatelle', 'Risques climatiques et patrimoine', 'Le Club Deal immobilier'] },
      { n: 52, topics: ['Portefeuille robuste (synthèse)', 'Audit fiscal complet', 'Préparation psychologique', 'Bilan patrimonial global', 'Synthèse des couvertures', 'Bilan global immobilier'] },
    ],
  },
];

/* ─── Semaine 1 — Dashboard quotidien ─────────────────────── */
export const WEEK_1 = [
  {
    id: 'day-0', dayName: 'Lundi', theme: 'Enrichissement & Placement', title: 'Épargne vs Investissement',
    questions: [
      {
        q: "Quelle est la différence fondamentale entre l'épargne de précaution et l'investissement ?",
        options: [
          "L'épargne est pour le long terme, l'investissement pour le court terme.",
          "L'épargne est destinée aux imprévus (sans risque), l'investissement vise à fructifier à long terme (avec risque).",
          "L'épargne est obligatoirement bloquée sur 8 ans.",
        ],
        correct: 1,
        rationale: "L'épargne (Livret A) sert de bouclier immédiat, capital garanti. L'investissement (Bourse) accepte un risque pour battre l'inflation.",
      },
      {
        q: "Face à l'inflation, que se passe-t-il si votre argent reste sur un compte courant ?",
        options: [
          'La banque verse des intérêts de compensation.',
          "Vous perdez du pouvoir d'achat d'année en année.",
          "Vous êtes exonéré d'impôts locaux.",
        ],
        correct: 1,
        rationale: "Si l'inflation est de 3 % et le compte rapporte 0 %, la valeur réelle baisse de 3 %. C'est une taxe invisible.",
      },
    ],
  },
  {
    id: 'day-1', dayName: 'Mardi', theme: 'Fiscalité', title: 'Le prélèvement à la source',
    questions: [
      {
        q: "Qui collecte le prélèvement à la source pour un salarié ?",
        options: ['La banque du salarié.', "L'employeur.", 'Le centre des impôts.'],
        correct: 1,
        rationale: "L'employeur prélève l'impôt directement sur le salaire brut selon le taux transmis par l'administration fiscale.",
      },
    ],
  },
  {
    id: 'day-2', dayName: 'Mercredi', theme: 'Retraite', title: 'Le système par répartition',
    questions: [
      {
        q: "Sur quel principe repose le système de retraite français ?",
        options: ['Capitalisation personnelle.', "Les actifs d'aujourd'hui financent les retraités d'aujourd'hui.", "L'État s'endette pour payer."],
        correct: 1,
        rationale: "Solidarité intergénérationnelle : les cotisations payées transitent directement vers les retraités actuels.",
      },
    ],
  },
  {
    id: 'day-3', dayName: 'Jeudi', theme: 'Transmission', title: 'Hériter sans préparation',
    questions: [
      {
        q: "Sans testament ni clause bénéficiaire, qui hérite en priorité d'un célibataire sans enfant ?",
        options: ['Le partenaire de PACS.', 'Les parents puis les frères/sœurs.', "L'État, automatiquement."],
        correct: 1,
        rationale: "À défaut de descendants et conjoint, les ascendants et collatéraux héritent selon l'ordre légal du Code civil.",
      },
    ],
  },
  {
    id: 'day-4', dayName: 'Vendredi', theme: 'IARD & Prévoyance', title: 'La Responsabilité Civile',
    questions: [
      {
        q: "Que couvre la Responsabilité Civile (RC) familiale ?",
        options: [
          'Les dommages que vous causez à autrui (corporels, matériels).',
          'Les dommages subis sur vos propres biens.',
          "Uniquement les accidents de la circulation.",
        ],
        correct: 0,
        rationale: "La RC indemnise les tiers victimes — elle ne couvre jamais vos propres dommages, qui relèvent de garanties dommages (MRH, auto…).",
      },
    ],
  },
  {
    id: 'day-5', dayName: 'Samedi', theme: 'Immobilier', title: 'Acheter vs Louer',
    questions: [
      {
        q: "Quel élément n'est PAS un argument en faveur de l'achat de sa résidence principale ?",
        options: [
          'Constituer un patrimoine sur le long terme.',
          "Bénéficier d'une totale flexibilité géographique.",
          "Stabiliser ses charges de logement à terme.",
        ],
        correct: 1,
        rationale: "Acheter implique des frais (notaire, garantie) amortis sur 5-7 ans minimum. La location garde l'avantage de la mobilité immédiate.",
      },
    ],
  },
];

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
