import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Lock, LogOut } from 'lucide-react';
import clsx from 'clsx';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import AuthForm from '../../sections/AuthForm/AuthForm';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Header.module.css';

/* cta: true → texte vert (Investir, Académie)
   protected: true → onglet verrouillé tant que l'utilisateur n'est pas connecté */
const NAV_LINKS = [
  { label: 'Accueil',  to: '/',         cta: false, protected: false },
  { label: 'Investir', to: '/investir', cta: true,  protected: false },
  { label: 'Académie', to: '/academie', cta: true,  protected: true  },
];

export default function Header() {
  const { isAuthenticated, firstName, signOut } = useAuth();

  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authTab, setAuthTab]     = useState('login');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Event global : permet à RequireAuth (ou n'importe quel composant) d'ouvrir le modal de connexion. */
  useEffect(() => {
    const handler = (e) => {
      setAuthTab(e?.detail?.tab === 'signup' ? 'signup' : 'login');
      setAuthModal(true);
    };
    window.addEventListener('open-auth-modal', handler);
    return () => window.removeEventListener('open-auth-modal', handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const openLogin = () => {
    setAuthTab('login');
    setAuthModal(true);
    setMenuOpen(false);
  };

  const handleLockedClick = (e) => {
    e.preventDefault();
    openLogin();
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
            {NAV_LINKS.map(({ label, to, cta, protected: isProtected }) => {
              const locked = isProtected && !isAuthenticated;

              if (locked) {
                /* Rendu comme un bouton qui ouvre le modal — pas une NavLink, pour éviter la navigation */
                return (
                  <button
                    key={to}
                    type="button"
                    className={clsx(styles.navLinkInvest, styles.navLinkLocked)}
                    onClick={handleLockedClick}
                    aria-label={`${label} — connexion requise`}
                  >
                    {label}
                    <Lock size={12} className={styles.lockIcon} />
                  </button>
                );
              }

              return (
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
              );
            })}
          </nav>

          {/* Actions — état connecté ou non */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                <span className={styles.greeting}>
                  Bonjour <span className={styles.greetingName}>{firstName || 'toi'}</span>
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut size={14} />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={openLogin}>
                Connexion
              </Button>
            )}
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
              {NAV_LINKS.map(({ label, to, cta, protected: isProtected }) => {
                const locked = isProtected && !isAuthenticated;

                if (locked) {
                  return (
                    <button
                      key={to}
                      type="button"
                      className={clsx(styles.mobileNavLink, styles.mobileNavLinkInvest, styles.navLinkLocked)}
                      onClick={handleLockedClick}
                    >
                      {label}
                      <Lock size={14} className={styles.lockIcon} />
                    </button>
                  );
                }

                return (
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
                );
              })}
            </nav>
            <div className={styles.mobileActions}>
              {isAuthenticated ? (
                <>
                  <span className={styles.greeting}>
                    Bonjour <span className={styles.greetingName}>{firstName || 'toi'}</span>
                  </span>
                  <Button variant="outline" size="md" onClick={signOut} className={styles.mobileBtn}>
                    <LogOut size={16} />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="md" onClick={openLogin} className={styles.mobileBtn}>
                  Connexion
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <Modal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        title={authTab === 'signup' ? 'Créer mon compte gratuit' : 'Connexion'}
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
