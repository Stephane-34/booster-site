import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button/Button';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'booster.cookie-consent';

/* Choix possibles : 'accepted' (tout) | 'essential' (refus tracking).
   Lu par les composants qui déposent des cookies tiers (ex: iframe HubSpot
   dans BookingCTA) via la fonction `getCookieConsent()` exportée ici. */
export function getCookieConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Affiche uniquement si aucun choix précédent n'a été fait. */
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const persist = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      /* Diffuse un event pour que les composants qui écoutent (iframe HubSpot,
         éventuellement un tracker plus tard) puissent réagir immédiatement
         sans nécessiter de reload. */
      window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: value }));
    } catch { /* localStorage bloqué (mode privé) - on ferme quand même */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Consentement cookies" className={styles.banner}>
      <div className={styles.icon}>
        <Cookie size={22} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>Cookies & vie privée</p>
        <p className={styles.text}>
          Booster utilise des cookies essentiels au fonctionnement du site (session,
          préférences). Certaines fonctions optionnelles (calendrier de RDV HubSpot)
          peuvent déposer des cookies tiers. Tu peux les refuser sans impacter
          ton expérience.
          {' '}
          <Link to="/confidentialite" className={styles.link}>En savoir plus</Link>.
        </p>
      </div>
      <div className={styles.actions}>
        <Button variant="ghost" size="sm" onClick={() => persist('essential')}>
          Refuser les cookies tiers
        </Button>
        <Button variant="primary" size="sm" onClick={() => persist('accepted')}>
          Tout accepter
        </Button>
        <button
          type="button"
          onClick={() => persist('essential')}
          className={styles.closeBtn}
          aria-label="Fermer la bannière (équivaut à refuser les cookies tiers)"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
