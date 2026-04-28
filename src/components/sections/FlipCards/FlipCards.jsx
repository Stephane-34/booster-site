import { useState } from 'react';
import { Home, PiggyBank, BookOpen, BarChart2, Shield, RefreshCw } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import styles from './FlipCards.module.css';

/* Chaque carte présente un produit : recto = teasing, verso = détails */
const PRODUCTS = [
  {
    id: 'immobilier',
    icon: Home,
    category: 'Immobilier',
    title: 'SCPI & effet de levier',
    front: 'Investis dans la pierre sans être propriétaire.',
    back: 'Les SCPI te permettent de percevoir des loyers sans gestion. Comprends l\'effet de levier, la taxe foncière et les stratégies d\'optimisation.',
    color: 'violet',
    stat: '4-6 % de rendement brut moyen',
  },
  {
    id: 'retraite',
    icon: PiggyBank,
    category: 'Retraite',
    title: 'PER & simulation',
    front: 'Prépare ta retraite dès maintenant.',
    back: 'Le PER (Plan Épargne Retraite) te donne un avantage fiscal immédiat. Simule ton capital à 65 ans selon tes versements mensuels dès aujourd\'hui.',
    color: 'blue',
    stat: 'Déduction fiscale jusqu\'à 10 % du revenu',
  },
  {
    id: 'enrichissement',
    icon: BarChart2,
    category: 'Enrichissement',
    title: 'ETF, DCA & règle des 72',
    front: 'Investis dans les marchés mondiaux simplement.',
    back: 'Dollar-Cost Averaging, ETF world, diversification — apprends à faire travailler ton argent de manière méthodique et sans stress.',
    color: 'green',
    stat: 'Règle des 72 : doublement en ~9 ans à 8 %',
  },
  {
    id: 'fiscalite',
    icon: BookOpen,
    category: 'Fiscalité',
    title: 'PFU, PEA & abattements',
    front: 'Optimise ce que tu gardes vraiment.',
    back: 'PFU 30 %, exonération PEA après 5 ans, abattement assurance-vie après 8 ans — maîtrise les règles du jeu fiscal pour maximiser tes gains nets.',
    color: 'orange',
    stat: 'Jusqu\'à 9 200 € d\'abattement en assurance-vie',
  },
  {
    id: 'protection',
    icon: Shield,
    category: 'Protection',
    title: 'Prévoyance & couverture',
    front: 'Protège tes revenus et ta famille.',
    back: 'Prévoyance, arrêt maladie, invalidité — comprends tes droits et les lacunes à combler. Souvent négligée par les jeunes, cette protection est cruciale.',
    color: 'teal',
    stat: 'Risque d\'invalidité : 1 actif sur 3 avant 60 ans',
  },
  {
    id: 'transmission',
    icon: RefreshCw,
    category: 'Transmission',
    title: 'Succession & donations',
    front: 'Transmets ton patrimoine efficacement.',
    back: 'Abattements sur donations, assurance-vie hors succession, SCI familiale — anticipe pour que tes proches ne paient pas plus que nécessaire.',
    color: 'pink',
    stat: '100 000 € d\'abattement tous les 15 ans',
  },
];

export default function FlipCards() {
  const [flipped, setFlipped] = useState(null);

  const toggle = (id) => setFlipped((prev) => (prev === id ? null : id));

  return (
    <section id="academie-apercu" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Badge variant="accent">Académie Booster</Badge>
          <h2 className={styles.title}>
            6 thèmes financiers,{' '}
            <span className="gradient-text">0 jargon inutile</span>
          </h2>
          <p className={styles.subtitle}>
            Clique sur une carte pour découvrir le contenu. Chaque thème est découpé
            en modules courts et un QCM pour valider tes connaissances.
          </p>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map((product) => (
            <FlipCard
              key={product.id}
              product={product}
              isFlipped={flipped === product.id}
              onToggle={() => toggle(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ product, isFlipped, onToggle }) {
  const Icon = product.icon;

  return (
    <div
      className={[styles.cardWrapper, styles[`color-${product.color}`]].join(' ')}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-pressed={isFlipped}
      aria-label={`${product.title} — ${isFlipped ? 'Retourner' : 'Voir les détails'}`}
    >
      <div className={[styles.card, isFlipped ? styles.cardFlipped : ''].join(' ')}>
        {/* Recto */}
        <div className={styles.front}>
          <div className={styles.iconWrapper}>
            <Icon size={22} />
          </div>
          <Badge variant="neutral" className={styles.categoryBadge}>{product.category}</Badge>
          <h3 className={styles.cardTitle}>{product.title}</h3>
          <p className={styles.cardText}>{product.front}</p>
          <div className={styles.flipHint}>
            <span>Découvrir</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Verso */}
        <div className={styles.back}>
          <Badge variant="neutral" className={styles.categoryBadge}>{product.category}</Badge>
          <p className={styles.backText}>{product.back}</p>
          <div className={styles.backStat}>
            <span>📊</span>
            <span>{product.stat}</span>
          </div>
          <div className={styles.flipHint}>
            <span>Retourner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
