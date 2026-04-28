import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import styles from './BookingCTA.module.css';

const PERKS = [
  { icon: Clock, text: '30 minutes — sans engagement' },
  { icon: User, text: 'Conseiller dédié, pas de script' },
  { icon: CheckCircle, text: '100 % gratuit, zéro pression commerciale' },
];

/* Remplace HUBSPOT_CALENDAR_URL par ton vrai lien HubSpot */
const HUBSPOT_CALENDAR_URL = 'https://meetings.hubspot.com/booster';

export default function BookingCTA() {
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

          {/* Iframe HubSpot Calendar */}
          <div className={styles.calendarWrapper}>
            <iframe
              src={HUBSPOT_CALENDAR_URL}
              title="Prendre rendez-vous avec un conseiller Booster"
              className={styles.iframe}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
