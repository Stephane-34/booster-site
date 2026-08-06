import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* Wrapper de route : si l'utilisateur n'est pas connecté, redirige vers / et
   déclenche l'ouverture du modal via un event global écouté par Header.
   On attend la fin du chargement de session pour éviter un flash de redirection
   au refresh d'une page protégée.

   `defaultTab` = onglet à afficher au visiteur : 'signup' (défaut, pour les
   pages découverte comme /investir où le user vient a priori de cliquer sur
   "Commencer à épargner") ou 'login' (pour /academie où l'utilisateur habitué
   revient s'identifier). */
export default function RequireAuth({ children, defaultTab = 'signup' }) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: defaultTab } }));
    }
  }, [loading, isAuthenticated, defaultTab]);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
