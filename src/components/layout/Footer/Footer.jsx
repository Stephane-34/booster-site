import { Link } from 'react-router-dom';
import { TrendingUp, Share2, Globe, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

const LINKS = {
  produit: [
    { label: 'Investir', to: '/investir' },
    { label: 'Académie', to: '/academie' },
    { label: 'Simulateur', to: '/investir#simulateur' },
    { label: 'Tarifs', to: '/investir#tarifs' },
  ],
  legal: [
    { label: 'Mentions légales', to: '/mentions-legales' },
    { label: 'Politique de confidentialité', to: '/confidentialite' },
    { label: 'CGU', to: '/cgu' },
  ],
  contact: [
    { label: 'Prendre RDV', to: '/investir#rdv' },
    { label: 'contact@booster.lu', to: 'mailto:contact@booster.lu' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Colonne marque */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <TrendingUp size={16} />
            </div>
            <span>Booster</span>
          </Link>
          <p className={styles.tagline}>
            La première solution d'apprentissage et d'investissement pour les jeunes.
          </p>
          <div className={styles.social}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
              <Share2 size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Globe size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Liens produit */}
        <div className={styles.linkGroup}>
          <h3 className={styles.linkGroupTitle}>Produit</h3>
          <ul>
            {LINKS.produit.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liens légaux */}
        <div className={styles.linkGroup}>
          <h3 className={styles.linkGroupTitle}>Légal</h3>
          <ul>
            {LINKS.legal.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.linkGroup}>
          <h3 className={styles.linkGroupTitle}>Contact</h3>
          <ul>
            {LINKS.contact.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bas de page */}
      <div className={styles.bottom}>
        <div className="container">
          <p>
            © {new Date().getFullYear()} Booster. Tous droits réservés.
            &nbsp;|&nbsp;
            <span className={styles.disclaimer}>
              Investir comporte des risques. Les performances passées ne préjugent pas des performances futures.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
