import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './components/RequireAuth';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import CookieBanner from './components/layout/CookieBanner/CookieBanner';
import Home from './pages/Home';

/* Home reste en import statique : c'est la page d'atterrissage, elle doit
   s'afficher sans aller-retour réseau supplémentaire.

   Tout le reste est chargé à la demande. L'Académie à elle seule pèse ~150 Ko
   de source (corpus de quiz inclus) et se trouve derrière RequireAuth : sans
   découpage, chaque visiteur non connecté la téléchargeait quand même. */
const Investir         = lazy(() => import('./pages/Investir'));
const Academy          = lazy(() => import('./pages/Academy'));
const Dashboard        = lazy(() => import('./pages/Dashboard'));
const Profile          = lazy(() => import('./pages/Profile'));
const TonProjet        = lazy(() => import('./pages/TonProjet'));
const MentionsLegales  = lazy(() => import('./pages/Legal/MentionsLegales'));
const CGU              = lazy(() => import('./pages/Legal/CGU'));
const Confidentialite  = lazy(() => import('./pages/Legal/Confidentialite'));
const EmailConfirmed   = lazy(() => import('./pages/EmailConfirmed'));
const ResetPassword    = lazy(() => import('./pages/ResetPassword'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Réserve la hauteur d'un écran pendant le chargement d'une route pour que le
   footer ne remonte pas brutalement (évite un décalage de mise en page). */
function RouteFallback() {
  return <div style={{ minHeight: '60vh' }} aria-busy="true" aria-live="polite" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        {/* Premier élément focusable de la page - voir .skip-link dans global.css */}
        <a href="#contenu" className="skip-link">Aller au contenu principal</a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* /investir : signup par défaut (parcours découverte depuis la Home).
                  /academie, /dashboard, /profil : login par défaut (l'user est censé
                  déjà avoir un compte, il revient s'identifier). */}
              <Route path="/investir" element={<RequireAuth defaultTab="signup"><Investir /></RequireAuth>} />
              <Route path="/academie" element={<RequireAuth defaultTab="login"><Academy /></RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth defaultTab="login"><Dashboard /></RequireAuth>} />
              <Route path="/profil" element={<RequireAuth defaultTab="login"><Profile /></RequireAuth>} />
              {/* Redirige les anciens liens /ton-projet vers /investir - à conserver tant que des partages externes peuvent pointer cette URL */}
              <Route path="/ton-projet" element={<TonProjet />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="/confidentialite" element={<Confidentialite />} />
              <Route path="/email-confirmed" element={<EmailConfirmed />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
      </AuthProvider>
    </BrowserRouter>
  );
}
