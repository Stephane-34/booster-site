import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, getProfile, signOut as supaSignOut } from '../services/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Récupère la ligne `profiles` correspondant à l'utilisateur courant. */
  const loadProfile = useCallback(async (currentUser) => {
    if (!currentUser) { setProfile(null); return; }
    try {
      const data = await getProfile(currentUser.id);
      setProfile(data);
    } catch {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    /* Session au montage. On débloque l'UI dès qu'on connaît l'utilisateur ;
       le fetch du profil étendu se fait en parallèle pour ne pas retarder l'affichage
       (3-5 s observés en prod si on attendait). Le user_metadata Supabase contient déjà
       first_name / last_name / age, donc on a une valeur affichable immédiate. */
    supabase.auth.getSession()
      .then(({ data }) => {
        const u = data?.session?.user ?? null;
        setUser(u);
        setLoading(false);
        loadProfile(u);
      })
      .catch(() => {
        setUser(null);
        setProfile(null);
        setLoading(false);
      });

    /* Login / logout / refresh token */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      loadProfile(u);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await supaSignOut();
    setUser(null);
    setProfile(null);
  }, []);

  /* Force le rechargement du profil étendu — appelé après modification depuis la page Profil. */
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    await loadProfile(user);
  }, [user, loadProfile]);

  /* Fallback : si la requête profile a échoué (RLS, latence), on prend le metadata Supabase. */
  const firstName = profile?.first_name ?? user?.user_metadata?.first_name ?? '';

  const value = {
    user,
    profile,
    firstName,
    loading,
    isAuthenticated: !!user,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return ctx;
}
