import { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    name: 'Camille D.',
    role: 'Étudiante en alternance, 23 ans',
    avatar: 'CD',
    color: '#a855f7',
    text: 'J\'avais 300 € qui dormaient sur mon livret. En 15 minutes, j\'ai ouvert mon contrat et pris RDV. Le conseiller était vraiment pédago.',
    stars: 5,
  },
  {
    name: 'Lucas M.',
    role: 'Jeune diplômé, 25 ans',
    avatar: 'LM',
    color: '#4ade80',
    text: 'L\'Académie m\'a appris plus en 2 semaines que 3 ans de fac d\'éco sur comment gérer mon argent concrètement. Les QCM rendent ça vraiment fun.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Développeuse, 26 ans',
    avatar: 'SK',
    color: '#60a5fa',
    text: 'Le simulateur m\'a convaincue. Voir +82 000 € de différence avec le livret A sur 20 ans, ça fait son effet. J\'ai commencé avec 100 €/mois.',
    stars: 5,
  },
  {
    name: 'Tom B.',
    role: 'Alternant RH, 21 ans',
    avatar: 'TB',
    color: '#fb923c',
    text: 'Booster c\'est la plateforme que j\'aurais voulu avoir à 18 ans. Les explications sur la fiscalité sont enfin compréhensibles.',
    stars: 5,
  },
  {
    name: 'Manon R.',
    role: 'Freelance, 28 ans',
    avatar: 'MR',
    color: '#f472b6',
    text: 'En tant que freelance, personne ne m\'avait jamais parlé de prévoyance sérieusement. Le module Protection de l\'Académie m\'a ouvert les yeux.',
    stars: 5,
  },
  {
    name: 'Axel P.',
    role: 'Étudiant M2, 24 ans',
    avatar: 'AP',
    color: '#2dd4bf',
    text: 'Interface ultra propre, app rapide, RDV pris en 2 clics. Exactement ce qu\'il fallait — pas de banque lourde, pas de paperasse inutile.',
    stars: 5,
  },
];

/* On duplique pour le défilement infini */
const DOUBLE = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  const trackRef = useRef(null);

  /* Pause l'animation au survol pour permettre la lecture */
  const pause = () => trackRef.current?.style.setProperty('animation-play-state', 'paused');
  const resume = () => trackRef.current?.style.setProperty('animation-play-state', 'running');

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <Badge variant="accent">Témoignages</Badge>
            <h2 className={styles.title}>
              Ils ont sauté le pas.{' '}
              <span className="gradient-text">Et toi ?</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Carrousel infini sans JS de scroll — pure CSS animation */}
      <div
        className={styles.carousel}
        onMouseEnter={pause}
        onMouseLeave={resume}
        aria-label="Témoignages clients"
      >
        <div ref={trackRef} className={styles.track}>
          {DOUBLE.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  const { name, role, avatar, color, text, stars } = testimonial;

  return (
    <article className={styles.card}>
      {/* Étoiles */}
      <div className={styles.stars} aria-label={`${stars} étoiles`}>
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={14} className={styles.star} />
        ))}
      </div>

      <p className={styles.text}>&ldquo;{text}&rdquo;</p>

      <div className={styles.author}>
        <div className={styles.avatar} style={{ background: `${color}25`, color }}>
          {avatar}
        </div>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
    </article>
  );
}
