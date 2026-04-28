import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { signIn, signUp } from '../../../services/supabase';
import styles from './AuthForm.module.css';

export default function AuthForm({ defaultTab = 'login', onTabChange, onSuccess }) {
  const [tab, setTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', password: '' });

  const switchTab = (t) => {
    setTab(t);
    setError('');
    onTabChange?.(t);
  };

  const updateField = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        await signIn(fields.email, fields.password);
      } else {
        if (fields.password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères.');
          return;
        }
        await signUp(fields.email, fields.password, fields.name);
      }
      onSuccess?.();
    } catch (err) {
      setError(
        err.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : err.message || 'Une erreur est survenue. Réessaie.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'login'}
          className={[styles.tab, tab === 'login' ? styles.tabActive : ''].join(' ')}
          onClick={() => switchTab('login')}
        >
          Connexion
        </button>
        <button
          role="tab"
          aria-selected={tab === 'signup'}
          className={[styles.tab, tab === 'signup' ? styles.tabActive : ''].join(' ')}
          onClick={() => switchTab('signup')}
        >
          Inscription
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Champ prénom (inscription seulement) */}
        {tab === 'signup' && (
          <div className={styles.field}>
            <label htmlFor="auth-name" className={styles.label}>Prénom</label>
            <div className={styles.inputWrapper}>
              <User size={16} className={styles.inputIcon} />
              <input
                id="auth-name"
                type="text"
                className={styles.input}
                placeholder="Ton prénom"
                value={fields.name}
                onChange={updateField('name')}
                required
                autoComplete="given-name"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className={styles.field}>
          <label htmlFor="auth-email" className={styles.label}>Email</label>
          <div className={styles.inputWrapper}>
            <Mail size={16} className={styles.inputIcon} />
            <input
              id="auth-email"
              type="email"
              className={styles.input}
              placeholder="ton@email.com"
              value={fields.email}
              onChange={updateField('email')}
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div className={styles.field}>
          <label htmlFor="auth-password" className={styles.label}>
            Mot de passe
            {tab === 'signup' && (
              <span className={styles.labelHint}>(min. 8 caractères)</span>
            )}
          </label>
          <div className={styles.inputWrapper}>
            <Lock size={16} className={styles.inputIcon} />
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              className={styles.input}
              placeholder="••••••••"
              value={fields.password}
              onChange={updateField('password')}
              required
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <p className={styles.error} role="alert">{error}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className={styles.submitBtn}
        >
          {tab === 'login' ? 'Se connecter' : 'Créer mon compte'}
        </Button>

        {tab === 'signup' && (
          <p className={styles.legal}>
            En t'inscrivant, tu acceptes nos{' '}
            <a href="/cgu" target="_blank" rel="noopener noreferrer">CGU</a>{' '}
            et notre{' '}
            <a href="/confidentialite" target="_blank" rel="noopener noreferrer">
              politique de confidentialité
            </a>.
          </p>
        )}
      </form>
    </div>
  );
}
