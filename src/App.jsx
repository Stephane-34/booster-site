import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './components/RequireAuth';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Investir from './pages/Investir';
import Academy from './pages/Academy';
import Dashboard from './pages/Dashboard';
import TonProjet from './pages/TonProjet';
import MentionsLegales from './pages/Legal/MentionsLegales';
import CGU from './pages/Legal/CGU';
import Confidentialite from './pages/Legal/Confidentialite';
import EmailConfirmed from './pages/EmailConfirmed';
import ResetPassword from './pages/ResetPassword';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investir" element={<Investir />} />
            <Route path="/academie" element={<RequireAuth><Academy /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            {/* Redirige les anciens liens /ton-projet vers /investir — à conserver tant que des partages externes peuvent pointer cette URL */}
            <Route path="/ton-projet" element={<TonProjet />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
