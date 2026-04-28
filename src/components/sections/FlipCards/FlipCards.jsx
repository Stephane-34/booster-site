import { useState } from 'react';
import clsx from 'clsx';
import Badge from '../../ui/Badge/Badge';
import { ACADEMY_THEMES } from '../../../data/themes';
import styles from './FlipCards.module.css';

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
          {ACADEMY_THEMES.map((theme) => (
            <FlipCard
              key={theme.id}
              theme={theme}
              isFlipped={flipped === theme.id}
              onToggle={() => toggle(theme.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ theme, isFlipped, onToggle }) {
  const Icon = theme.icon;

  return (
    <div
      className={clsx(styles.cardWrapper, styles[`color-${theme.color}`])}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-pressed={isFlipped}
      aria-label={`${theme.name} — ${isFlipped ? 'Retourner' : 'Voir les détails'}`}
    >
      <div className={clsx(styles.card, isFlipped && styles.cardFlipped)}>
        {/* Recto */}
        <div className={styles.front}>
          <div className={styles.iconWrapper}>
            <Icon size={22} />
          </div>
          <Badge variant="neutral" className={styles.categoryBadge}>{theme.name}</Badge>
          <h3 className={styles.cardTitle}>{theme.name}</h3>
          <p className={styles.cardText}>{theme.flipFront}</p>
          <div className={styles.flipHint}>
            <span>Découvrir</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Verso */}
        <div className={styles.back}>
          <Badge variant="neutral" className={styles.categoryBadge}>{theme.name}</Badge>
          <p className={styles.backText}>{theme.flipBack}</p>
          <div className={styles.backStat}>
            <span>📊</span>
            <span>{theme.stat}</span>
          </div>
          <div className={styles.flipHint}>
            <span>Retourner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
