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
    /* Session au montage. Le catch garantit qu'on ne bloque pas loading=true si Supabase est down. */
    supabase.auth.getSession()
      .then(async ({ data }) => {
        const u = data?.session?.user ?? null;
        setUser(u);
        await loadProfile(u);
      })
      .catch(() => { setUser(null); setProfile(null); })
      .finally(() => setLoading(false));

    /* Login / logout / refresh token */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      await loadProfile(u);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await supaSignOut();
    setUser(null);
    setProfile(null);
  }, []);

  /* Fallback : si la requête profile a échoué (RLS, latence), on prend le metadata Supabase. */
  const firstName = profile?.first_name ?? user?.user_metadata?.first_name ?? '';

  const value = {
    user,
    profile,
    firstName,
    loading,
    isAuthenticated: !!user,
    signOut,
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
