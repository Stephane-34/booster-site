import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
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
      <AcademyStrip />
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

/* ─── Mini-strip des 6 parcours académie ────────────────── */
function AcademyStrip() {
  return (
    <section className={styles.academyStrip}>
      <div className="container">
        <div className={styles.stripHeader}>
          <Badge variant="accent">Académie</Badge>
          <h2 className={styles.stripTitle}>
            Apprends la gestion personnelle{' '}
            <span className="gradient-text">module par module</span>{' '}
            gratuitement
          </h2>
        </div>

        <div className={styles.stripCards}>
          {ACADEMY_THEMES.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.id}
                className={clsx(styles.miniCard, theme.locked && styles.miniCardLocked)}
              >
                <div className={styles.miniCardIcon}>
                  <Icon size={18} />
                </div>
                <span className={styles.miniCardName}>{theme.name}</span>
                <span className={styles.miniCardModules}>{theme.modules} modules</span>
                {theme.locked && <Lock size={11} className={styles.miniCardLockIcon} />}
              </div>
            );
          })}
        </div>

        <div className={styles.stripCta}>
          <Button variant="primary" size="md" as={Link} to="/academie">
            Explorer l'Académie
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
