/* Données mockées pour la maquette Battle Académie.
   Une vraie persistance Supabase (matchmaking, scores en temps réel, saisons)
   viendra une fois la mécanique validée côté produit. */

export const CURRENT_BATTLE = {
  weekLabel:    'Semaine 24 · Battle de la semaine',
  challenge:    'Maîtrise des produits d\'épargne',
  questionCount: 10,
  endsIn:       '2 j 14 h',
  /* Score "you" est passé en prop par le composant — la maquette utilise un défaut visuel */
  you: {
    firstName: 'Toi',
    avatar:    '🚀',
    score:     7,
  },
  opponent: {
    firstName: 'Léa',
    age:       24,
    avatar:    '🦊',
    score:     6,
    streak:    3,
  },
};

/* Classement de la saison en cours — top 10 récompensé par Booster.
   Le rank du joueur courant est marqué avec isMe=true dans la maquette. */
export const SEASON_LEADERBOARD = [
  { rank: 1,  firstName: 'Hugo',     points: 4820, badge: '🏆' },
  { rank: 2,  firstName: 'Camille',  points: 4615, badge: '🥈' },
  { rank: 3,  firstName: 'Yanis',    points: 4490, badge: '🥉' },
  { rank: 4,  firstName: 'Manon',    points: 4180 },
  { rank: 5,  firstName: 'Léa',      points: 3975 },
  { rank: 6,  firstName: 'Thomas',   points: 3820 },
  { rank: 7,  firstName: 'Sarah',    points: 3640 },
  { rank: 8,  firstName: 'Maxime',   points: 3500, isMe: true },
  { rank: 9,  firstName: 'Inès',     points: 3380 },
  { rank: 10, firstName: 'Antoine',  points: 3210 },
];

export const SEASON_META = {
  number:     3,
  endsIn:     '5 sem.',
  rewardText: 'Cadeau Booster envoyé aux 10 premiers',
};
