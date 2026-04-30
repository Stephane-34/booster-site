import { Link } from 'react-router-dom';
import { Shield, Brain, ArrowRight } from 'lucide-react';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import styles from './APropos.module.css';

const PILLARS = [
  {
    icon: Shield,
    emoji: '🛡️',
    title: 'Investissez avec sérénité',
    subtitle: "L'accès au terrain.",
    body: "Profitez d'une sélection rigoureuse de produits d'investissement adaptés à votre profil de jeune actif. Nous sélectionnons les meilleurs partenaires et nos experts vous accompagnent lors de chaque souscription pour sécuriser vos choix.",
    color: 'primary',
  },
  {
    icon: Brain,
    emoji: '🧠',
    title: 'Apprenez en vous amusant',
    subtitle: 'Le pouvoir du savoir.',
    body: "Rejoignez la Booster Academy. Chaque semaine, relevez un nouveau challenge sous forme de QCM pour valider vos acquis. Retrouvez tous vos contenus et vidéos dans votre bibliothèque personnelle pour réviser à votre rythme et suivre votre progression.",
    color: 'accent',
  },
];

export default function APropos() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* ─── Genèse ─────────────────────────────────────────── */}
        <section className={styles.genesis}>
          <Badge variant="primary">Notre histoire</Badge>
          <h1 className={styles.genesisTitle}>
            D'anciens étudiants,{' '}
            <span className="gradient-text">devenus experts pour vous.</span>
          </h1>
          <p className={styles.genesisText}>
            L'école ne nous a jamais appris à gérer nos premiers salaires, encore moins
            à bâtir une stratégie immobilière ou à optimiser notre patrimoine. Comme vous,
            nous avons dû apprendre par nous-mêmes comment faire fructifier nos premiers
            revenus. Aujourd'hui, Booster vous simplifie la vie en combinant éducation
            et action.
          </p>
        </section>

        {/* ─── Deux piliers ────────────────────────────────────── */}
        <section className={styles.pillars}>
          {PILLARS.map(({ emoji, title, subtitle, body, color }) => (
            <div key={title} className={`${styles.pillarCard} ${styles[`pillar-${color}`]}`}>
              <span className={styles.pillarEmoji}>{emoji}</span>
              <div className={styles.pillarContent}>
                <p className={styles.pillarSubtitle}>{subtitle}</p>
                <h2 className={styles.pillarTitle}>{title}</h2>
                <p className={styles.pillarBody}>{body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ─── Conclusion / CTA ────────────────────────────────── */}
        <section className={styles.closing}>
          <h2 className={styles.closingTitle}>
            Maîtrisez votre avenir financier{' '}
            <span className="gradient-text">dès aujourd'hui.</span>
          </h2>
          <p className={styles.closingText}>
            Booster vous donne les clés d'une indépendance durable, pendant vos études
            et bien après.
          </p>
          <div className={styles.closingActions}>
            <Button variant="primary" size="lg" as={Link} to="/investir">
              Découvrir nos offres
              <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg" as={Link} to="/academie">
              Accéder à l'Académie
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
