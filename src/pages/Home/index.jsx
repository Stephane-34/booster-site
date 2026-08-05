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
            Épargner n'aura{' '}
            <span className="gradient-text">jamais été aussi simple</span>{' '}
            …
          </h2>
          <p className={styles.whoIntro}>
            L'éducation financière et patrimoniale ne fait pas partie des cursus traditionnels.
            C'est pourquoi nous avons fondé Booster : une plateforme conçue pour transformer
            l'apprentissage en actions concrètes. En combinant formation rigoureuse et solutions
            d'investissement simple et sur-mesure, nous vous accompagnons dans la structuration
            et la valorisation de votre capital dès vos premiers revenus.
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

