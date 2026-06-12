import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, Calendar } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { signIn, signUp, resetPassword } from '../../../services/supabase';
import styles from './AuthForm.module.css';

export default function AuthForm({ defaultTab = 'login', onTabChange, onSuccess }) {
  const [tab, setTab]               = useState(defaultTab); // 'login' | 'signup' | 'forgot'
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [resetSent, setResetSent]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields]         = useState({
    firstName: '',
    lastName:  '',
    age:       '',
    email:     '',
    password:  '',
  });

  const switchTab = (t) => {
    setTab(t);
    setError('');
    setResetSent(false);
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
        onSuccess?.();
      } else if (tab === 'signup') {
        if (fields.password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères.');
          return;
        }
        const ageNum = fields.age ? Number(fields.age) : null;
        if (ageNum !== null && (Number.isNaN(ageNum) || ageNum < 13 || ageNum > 120)) {
          setError('Renseigne un âge valide (entre 13 et 120 ans).');
          return;
        }
        await signUp(fields.email, fields.password, {
          firstName: fields.firstName.trim(),
          lastName:  fields.lastName.trim(),
          age:       ageNum,
        });
        onSuccess?.();
      } else if (tab === 'forgot') {
        await resetPassword(fields.email);
        setResetSent(true);
      }
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

  /* ─── Vue mot de passe oublié ─────────────────────────── */
  if (tab === 'forgot') {
    return (
      <div className={styles.wrapper}>
        <button className={styles.backLink} onClick={() => switchTab('login')}>
          <ArrowLeft size={14} />
          Retour à la connexion
        </button>

        {resetSent ? (
          <div className={styles.successBox}>
            <CheckCircle size={32} className={styles.successIcon} />
            <p className={styles.successTitle}>Email envoyé !</p>
            <p className={styles.successDesc}>
              Vérifie ta boîte mail et clique sur le lien pour réinitialiser ton mot de passe.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.forgotHeader}>
              <p className={styles.forgotTitle}>Mot de passe oublié ?</p>
              <p className={styles.forgotDesc}>
                Saisis ton email et on t'envoie un lien de réinitialisation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="forgot-email" className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    id="forgot-email"
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

              {error && <p className={styles.error} role="alert">{error}</p>}

              <Button type="submit" variant="primary" size="lg" loading={loading} className={styles.submitBtn}>
                Envoyer le lien
              </Button>
            </form>
          </>
        )}
      </div>
    );
  }

  /* ─── Vue connexion / inscription ─────────────────────── */
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
        {/* Identité (inscription seulement) */}
        {tab === 'signup' && (
          <>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="auth-firstname" className={styles.label}>Prénom</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input
                    id="auth-firstname"
                    type="text"
                    className={styles.input}
                    placeholder="Ton prénom"
                    value={fields.firstName}
                    onChange={updateField('firstName')}
                    required
                    autoComplete="given-name"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="auth-lastname" className={styles.label}>Nom</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input
                    id="auth-lastname"
                    type="text"
                    className={styles.input}
                    placeholder="Ton nom"
                    value={fields.lastName}
                    onChange={updateField('lastName')}
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="auth-age" className={styles.label}>Âge</label>
              <div className={styles.inputWrapper}>
                <Calendar size={16} className={styles.inputIcon} />
                <input
                  id="auth-age"
                  type="number"
                  min={13}
                  max={120}
                  className={styles.input}
                  placeholder="Ex. 22"
                  value={fields.age}
                  onChange={updateField('age')}
                  required
                />
              </div>
            </div>
          </>
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
          <div className={styles.labelRow}>
            <label htmlFor="auth-password" className={styles.label}>
              Mot de passe
              {tab === 'signup' && (
                <span className={styles.labelHint}>(min. 8 caractères)</span>
              )}
            </label>
            {tab === 'login' && (
              <button
                type="button"
                className={styles.forgotLink}
                onClick={() => switchTab('forgot')}
              >
                Mot de passe oublié ?
              </button>
            )}
          </div>
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

        {error && <p className={styles.error} role="alert">{error}</p>}

        <Button type="submit" variant="primary" size="lg" loading={loading} className={styles.submitBtn}>
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
