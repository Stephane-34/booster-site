import { useRef, useEffect } from 'react';
import { ArrowRight, Star, TrendingUp, Zap } from 'lucide-react';
import Button from '../../ui/Button/Button';
import Badge from '../../ui/Badge/Badge';
import styles from './Hero.module.css';

/* Métriques affichées dans le mockup téléphone */
const PHONE_STATS = [
  { label: 'Portefeuille', value: '2 840 €', delta: '+8,2%', positive: true },
  { label: 'Dividendes reçus', value: '124 €', delta: '+3 ce mois', positive: true },
];

/* Points de réassurance en bas du hero */
const REASSURANCE = [
  { icon: Zap, text: 'Ouverture en ligne simplifiée avec un expert' },
  { icon: TrendingUp, text: 'Dès 50 €/mois' },
];

export default function Hero({ onCTAClick, firstName }) {
  const blobRef = useRef(null);

  /* Animation parallax légère des blobs au mouvement souris */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Arrière-plan : grille + blobs */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.grid} />
        <div ref={blobRef} className={styles.blobs}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        {/* Colonne texte */}
        <div className={styles.content}>
          <Badge variant="primary" className={styles.badge}>
            <Star size={10} />
            {firstName ? `Bonjour ${firstName} 👋` : 'Nouveau · Plateforme en version bêta'}
          </Badge>

          <h1 className={styles.title}>
            La première solution{' '}
            <span className="gradient-text">d'apprentissage</span>{' '}
            et d'investissement{' '}
            <span className="gradient-text">pour les jeunes</span>
          </h1>

          <p className={styles.subtitle}>
            Ton argent mérite mieux qu'un livret bancaire, investis à partir de 50 euros
            par mois et forme-toi à la finance personnelle de manière ludique.
          </p>

          <div className={styles.ctaGroup}>
            <Button variant="primary" size="lg" onClick={onCTAClick}>
              {firstName ? 'Accéder à mon espace' : 'Créer mon compte'}
              <ArrowRight size={18} />
            </Button>
          </div>

          {/* Points de réassurance */}
          <ul className={styles.reassurance}>
            {REASSURANCE.map(({ icon: Icon, text }) => (
              <li key={text} className={styles.reassuranceItem}>
                <Icon size={14} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup téléphone */}
        <div className={styles.phoneWrapper} aria-hidden="true">
          <div className={styles.phoneGlow} />
          <div className={styles.phone}>
            {/* Encoche */}
            <div className={styles.phoneNotch} />

            {/* En-tête de l'app */}
            <div className={styles.phoneHeader}>
              <div className={styles.phoneAvatar}>E</div>
              <div>
                <p className={styles.phoneGreeting}>Bonjour Édouard 👋</p>
                <p className={styles.phoneDate}>Avril 2025</p>
              </div>
            </div>

            {/* Statistiques */}
            <div className={styles.phoneStats}>
              {PHONE_STATS.map(({ label, value, delta, positive }) => (
                <div key={label} className={styles.phoneStat}>
                  <p className={styles.phoneStatLabel}>{label}</p>
                  <p className={styles.phoneStatValue}>{value}</p>
                  <span className={[
                    styles.phoneStatDelta,
                    positive ? styles.positive : styles.negative,
                  ].join(' ')}>
                    {delta}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini-graphique simulé */}
            <div className={styles.phoneChart}>
              <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 50 C30 45, 50 30, 80 25 S120 10, 140 8 S170 5, 200 3"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0 50 C30 45, 50 30, 80 25 S120 10, 140 8 S170 5, 200 3 L200 60 L0 60 Z"
                  fill="url(#chartGrad)"
                />
              </svg>
            </div>

            {/* Badges académie */}
            <div className={styles.phoneBadges}>
              <span className={styles.phoneBadgeItem}>
                🏆 Note globale : A
              </span>
              <span className={styles.phoneBadgeItem}>
                🎯 Quiz du jour complété
              </span>
            </div>
          </div>

          {/* Bulles flottantes */}
          <div className={styles.floatBubble1}>
            <TrendingUp size={14} />
            <span>+12,4% cette année</span>
          </div>
          <div className={styles.floatBubble2}>
            <span>🎓</span>
            <span>Académie débloquée</span>
          </div>
        </div>
      </div>

      {/* Séparateur bas */}
      <div className={styles.scrollHint} aria-hidden="true">
        <svg className={styles.scrollArrow} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3v14M4 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
