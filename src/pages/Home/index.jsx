import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain } from 'lucide-react';
import Hero from '../../components/sections/Hero/Hero';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import Modal from '../../components/ui/Modal/Modal';
import AuthForm from '../../components/sections/AuthForm/AuthForm';
import Badge from '../../components/ui/Badge/Badge';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Home.module.css';

export default function Home() {
  const [authModal, setAuthModal] = useState(false);
  const { firstName, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /* Si l'user est déjà connecté, le CTA du Hero l'envoie vers son espace.
     Sinon il ouvre le modal d'inscription. */
  const handleHeroCTA = () => {
    if (isAuthenticated) navigate('/academie');
    else                 setAuthModal(true);
  };

  return (
    <>
      <Hero
        onCTAClick={handleHeroCTA}
        firstName={isAuthenticated ? firstName : ''}
      />
      <WhoWeAre />
      <Testimonials />

      <Modal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        title="Créer mon compte gratuit"
      >
        <AuthForm
          defaultTab="signup"
          onSuccess={() => setAuthModal(false)}
        />
      </Modal>
    </>
  );
}

/* ─── Qui sommes-nous ? ──────────────────────────────────── */
const WHO_FEATURES = [
  {
    icon: Shield,
    title: 'Investissez avec sérénité',
    subtitle: 'L\'accès au terrain.',
    text: 'Profitez d\'une sélection rigoureuse de produits d\'investissement adaptés à votre profil. Nous sélectionnons les meilleurs partenaires et nos experts vous accompagnent lors de chaque souscription pour sécuriser vos choix. Tu crées ton compte, tu définis ton projet puis tu prends RDV avec un expert pour valider et optimiser ton contrat.',
  },
  {
    icon: Brain,
    title: 'Apprenez en vous amusant',
    subtitle: 'Le pouvoir du savoir.',
    text: 'Rejoignez la Booster Academy. Chaque semaine, relevez un nouveau challenge sous forme de QCM pour valider vos acquis. Retrouvez tous vos contenus et vidéos dans votre bibliothèque personnelle pour réviser à votre rythme et suivre votre progression.',
  },
];

const EXPERTISE = [
  'Bancaire',
  'Fiscalité',
  'Retraite',
  'Immobilier',
  'Placement',
  'Financement de projet',
];

function WhoWeAre() {
  return (
    <section className={styles.whoSection}>
      <div className="container">
        <div className={styles.whoHeader}>
          <Badge variant="accent">Qui sommes-nous ?</Badge>
          <h2 className={styles.whoTitle}>
            D'anciens étudiants,{' '}
            <span className="gradient-text">devenus experts</span>{' '}
            pour vous.
          </h2>
          <p className={styles.whoIntro}>
            L'école ne nous a jamais appris à gérer nos premiers salaires, encore moins
            à bâtir une stratégie immobilière ou à optimiser notre patrimoine. Comme vous,
            nous avons dû apprendre par nous-mêmes comment faire fructifier nos premiers
            revenus. Aujourd'hui, Booster vous simplifie la vie en combinant éducation
            et action.
          </p>
        </div>

        <h3 className={styles.whoFeaturesTitle}>
          Deux façons de{' '}
          <span className="gradient-text">construire ton avenir</span>
        </h3>

        <div className={styles.whoFeatures}>
          {WHO_FEATURES.map(({ icon: Icon, title, subtitle, text }) => (
            <div key={title} className={styles.whoCard}>
              <div className={styles.whoCardIcon}>
                <Icon size={20} />
              </div>
              <div>
                <p className={styles.whoCardSubtitle}>{subtitle}</p>
                <h3 className={styles.whoCardTitle}>{title}</h3>
                <p className={styles.whoCardText}>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.whoConclusion}>
          Maîtrisez votre avenir financier dès aujourd'hui. Booster vous donne les clés
          d'une indépendance durable, pendant vos études et bien après.
        </p>

        <div className={styles.whoExpertise}>
          {EXPERTISE.map((tag) => (
            <span key={tag} className={styles.whoTag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

