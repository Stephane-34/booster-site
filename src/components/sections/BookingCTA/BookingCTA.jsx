import { Calendar, Clock, User, CheckCircle, Lock } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './BookingCTA.module.css';

const PERKS = [
  { icon: Clock, text: '30 minutes — sans engagement' },
  { icon: User, text: 'Conseiller dédié, pas de script' },
  { icon: CheckCircle, text: '100 % gratuit, zéro pression commerciale' },
];

/* Remplace HUBSPOT_CALENDAR_URL par ton vrai lien HubSpot */
const HUBSPOT_CALENDAR_URL = 'https://meetings.hubspot.com/booster';

/* Déclenche l'ouverture du modal de connexion via l'event global écouté par Header. */
const openAuthModal = (tab = 'signup') =>
  window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab } }));

export default function BookingCTA() {
  const { isAuthenticated } = useAuth();

  return (
    <section id="rdv" className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          {/* Blob décoratif */}
          <div className={styles.blob} aria-hidden="true" />

          <div className={styles.content}>
            <Badge variant="primary">
              <Calendar size={12} />
              Prise de RDV
            </Badge>
            <h2 className={styles.title}>
              Un expert pour toi,{' '}
              <span className="gradient-text">gratuitement</span>
            </h2>
            <p className={styles.desc}>
              Tu as des questions sur ton contrat, ta situation fiscale ou simplement
              par où commencer ? Réserve 30 minutes avec l'un de nos conseillers.
              Pas de script, juste de la vraie pédagogie.
            </p>

            <ul className={styles.perks}>
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className={styles.perk}>
                  <Icon size={16} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Iframe HubSpot affichée uniquement aux utilisateurs connectés.
              Sinon overlay invitant à créer un compte avant la réservation. */}
          <div className={styles.calendarWrapper}>
            {isAuthenticated ? (
              <iframe
                src={HUBSPOT_CALENDAR_URL}
                title="Prendre rendez-vous avec un conseiller Booster"
                className={styles.iframe}
                loading="lazy"
              />
            ) : (
              <div className={styles.lockOverlay}>
                <div className={styles.lockIcon}>
                  <Lock size={24} />
                </div>
                <h3 className={styles.lockTitle}>Crée ton compte pour réserver</h3>
                <p className={styles.lockDesc}>
                  La prise de rendez-vous est réservée aux membres Booster.
                  Crée ton compte en 30 secondes pour accéder à l'agenda.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button variant="primary" size="md" onClick={() => openAuthModal('signup')}>
                    Créer mon compte
                  </Button>
                  <Button variant="ghost" size="md" onClick={() => openAuthModal('login')}>
                    J'ai déjà un compte
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
