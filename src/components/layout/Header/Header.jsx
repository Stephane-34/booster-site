import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import AuthForm from '../../sections/AuthForm/AuthForm';
import styles from './Header.module.css';

/* cta: true → pill vert (même style pour Investir et Académie) */
const NAV_LINKS = [
  { label: 'Accueil',  to: '/',         cta: false },
  { label: 'Investir', to: '/investir', cta: true  },
  { label: 'Académie', to: '/academie', cta: true },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authTab, setAuthTab]     = useState('login');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const openLogin = () => {
    setAuthTab('login');
    setAuthModal(true);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={clsx(styles.header, scrolled && styles.scrolled)}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <img src="/logo-rocket.png" className={styles.logoImg} alt="Booster" />
            <span className={styles.logoText}>Booster</span>
          </Link>

          {/* Navigation desktop */}
          <nav className={styles.nav} aria-label="Navigation principale">
            {NAV_LINKS.map(({ label, to, cta }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cta
                    ? clsx(styles.navLinkInvest, isActive && styles.navLinkInvestActive)
                    : clsx(styles.navLink, isActive && styles.navLinkActive)
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions — connexion uniquement */}
          <div className={styles.actions}>
            <Button variant="ghost" size="sm" onClick={openLogin}>
              Connexion
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
              {NAV_LINKS.map(({ label, to, cta }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={clsx(
                    styles.mobileNavLink,
                    cta && styles.mobileNavLinkInvest,
                  )}
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
            </div>
          </div>
        )}
      </header>

      <Modal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        title="Connexion"
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
