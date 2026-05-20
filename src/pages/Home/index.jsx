import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Shield, Brain } from 'lucide-react';
import clsx from 'clsx';
import Hero from '../../components/sections/Hero/Hero';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import Modal from '../../components/ui/Modal/Modal';
import AuthForm from '../../components/sections/AuthForm/AuthForm';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { ACADEMY_THEMES } from '../../data/themes';
import styles from './Home.module.css';

export default function Home() {
  const [authModal, setAuthModal] = useState(false);

  return (
    <>
      <Hero onCTAClick={() => setAuthModal(true)} />
      <WhoWeAre />
      <Offers />
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
    text: 'Profitez d\'une sélection rigoureuse de produits d\'investissement adaptés à votre profil de jeune actif. Nous sélectionnons les meilleurs partenaires et nos experts vous accompagnent lors de chaque souscription pour sécuriser vos choix.',
  },
  {
    icon: Brain,
    title: 'Apprenez en vous amusant',
    subtitle: 'Le pouvoir du savoir.',
    text: 'Rejoignez la Booster Academy. Chaque semaine, relevez un nouveau challenge sous forme de QCM pour valider vos acquis. Retrouvez tous vos contenus et vidéos dans votre bibliothèque personnelle pour réviser à votre rythme et suivre votre progression.',
  },
];

const EXPERTISE = ['Expérience Banque', 'Gestion de Patrimoine', 'Expertise Immobilière'];

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

/* ─── Section Nos offres ─────────────────────────────────── */
function Offers() {
  return (
    <section className={styles.offersSection}>
      <div className="container">
        <div className={styles.offersHeader}>
          <Badge variant="primary">Nos offres</Badge>
          <h2 className={styles.offersTitle}>
            Deux façons de{' '}
            <span className="gradient-text">construire ton avenir</span>
          </h2>
        </div>

        <div className={styles.offersGrid}>
          {/* Carte Investir */}
          <div className={clsx(styles.offerCard, styles.offerCardInvest)}>
            <div className={styles.offerCardInner}>
              <div className={styles.offerCardHead}>
                <span className={styles.offerEmoji}>📈</span>
                <h3 className={styles.offerTitle}>Investir</h3>
              </div>
              <p className={styles.offerText}>
                Accède à une sélection rigoureuse de produits d'investissement
                luxembourgeois adaptés aux jeunes actifs. Dès 50 €/mois, place ton
                argent dans des solutions à 0 % de frais d'entrée et fais-le travailler
                pour toi, accompagné d'un expert à chaque étape.
              </p>
              <ul className={styles.offerPerks}>
                <li>0 % de frais d'entrée</li>
                <li>Dès 50 € / mois</li>
                <li>Accompagnement par un expert</li>
              </ul>
              <Button variant="accent" size="md" as={Link} to="/investir" className={styles.offerBtn}>
                Découvrir l'offre
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Carte Académie */}
          <div className={clsx(styles.offerCard, styles.offerCardAcademy)}>
            <div className={styles.offerCardInner}>
              <div className={styles.offerCardHead}>
                <span className={styles.offerEmoji}>🎓</span>
                <h3 className={styles.offerTitle}>Académie</h3>
              </div>
              <p className={styles.offerText}>
                Forme-toi à la finance personnelle module par module, gratuitement.
                Des quiz hebdomadaires, des vidéos et une bibliothèque complète pour
                apprendre à ton rythme — et ne plus jamais subir les décisions
                financières que tu ne comprends pas.
              </p>
              <div className={styles.offerModules}>
                {ACADEMY_THEMES.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <div
                      key={theme.id}
                      className={clsx(styles.offerModule, theme.locked && styles.offerModuleLocked)}
                    >
                      <Icon size={13} />
                      <span>{theme.name}</span>
                      {theme.locked && <Lock size={10} className={styles.offerModuleLock} />}
                    </div>
                  );
                })}
              </div>
              <Button variant="accent" size="md" as={Link} to="/academie" className={styles.offerBtn}>
                Explorer l'Académie
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
