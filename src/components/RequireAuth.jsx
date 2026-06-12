import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* Wrapper de route : si l'utilisateur n'est pas connecté, redirige vers / et
   déclenche l'ouverture du modal de connexion via un event global écouté par Header.
   On attend la fin du chargement de session pour éviter un flash de redirection
   au refresh d'une page protégée. */
export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'login' } }));
    }
  }, [loading, isAuthenticated]);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
