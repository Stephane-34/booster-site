import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Investir from './pages/Investir';
import Academy from './pages/Academy';
import Dashboard from './pages/Dashboard';
import TonProjet from './pages/TonProjet';
import APropos from './pages/APropos';
import MentionsLegales from './pages/Legal/MentionsLegales';
import CGU from './pages/Legal/CGU';
import Confidentialite from './pages/Legal/Confidentialite';
import EmailConfirmed from './pages/EmailConfirmed';

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
            <Route path="/academie" element={<Academy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ton-projet" element={<TonProjet />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
