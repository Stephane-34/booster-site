import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import AuthForm from '../../sections/AuthForm/AuthForm';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Académie', to: '/academie' },
  { label: 'Nos offres', to: '/#offres' },
  { label: 'À propos', to: '/#apropos' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  /* Détecter le scroll pour changer l'apparence du header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Fermer le menu mobile au changement de route */
  const closeMenu = () => setMenuOpen(false);

  const openLogin = () => {
    setAuthTab('login');
    setAuthModal(true);
    setMenuOpen(false);
  };

  const openSignup = () => {
    setAuthTab('signup');
    setAuthModal(true);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <div className={styles.logoIcon}>
              <TrendingUp size={18} />
            </div>
            <span className={styles.logoText}>Booster</span>
          </Link>

          {/* Navigation desktop */}
          <nav className={styles.nav} aria-label="Navigation principale">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className={styles.actions}>
            <Button variant="ghost" size="sm" onClick={openLogin}>
              Connexion
            </Button>
            <Button variant="primary" size="sm" onClick={openSignup}>
              Commencer
            </Button>
          </div>

          {/* Burger mobile */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <nav>
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className={styles.mobileActions}>
              <Button variant="outline" size="md" onClick={openLogin} className={styles.mobileBtn}>
                Connexion
              </Button>
              <Button variant="primary" size="md" onClick={openSignup} className={styles.mobileBtn}>
                Commencer gratuitement
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Modale d'authentification */}
      <Modal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        title={authTab === 'login' ? 'Connexion' : 'Créer un compte'}
      >
        <AuthForm
          defaultTab={authTab}
          onTabChange={setAuthTab}
          onSuccess={() => setAuthModal(false)}
        />
      </Modal>
    </>
  );
}
