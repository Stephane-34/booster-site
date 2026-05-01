import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import { supabase } from '../../services/supabase';
import styles from './ResetPassword.module.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [done, setDone]                 = useState(false);

  /* Supabase injecte automatiquement la session depuis le hash URL au montage */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setDone(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 3000);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Réessaie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {done ? (
          <>
            <CheckCircle size={52} className={styles.icon} />
            <h1 className={styles.title}>Mot de passe mis à jour !</h1>
            <p className={styles.desc}>Redirection vers ton espace dans quelques secondes…</p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Nouveau mot de passe</h1>
            <p className={styles.desc}>Choisis un mot de passe d'au moins 8 caractères.</p>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="rp-password" className={styles.label}>Nouveau mot de passe</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    id="rp-password"
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="rp-confirm" className={styles.label}>Confirmer le mot de passe</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    id="rp-confirm"
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && <p className={styles.error} role="alert">{error}</p>}

              <Button type="submit" variant="primary" size="lg" loading={loading} className={styles.submitBtn}>
                Enregistrer le mot de passe
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
