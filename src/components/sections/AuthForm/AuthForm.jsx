import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, Calendar, Phone } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { signIn, signUp, resetPassword } from '../../../services/supabase';
import styles from './AuthForm.module.css';

/* Champs de l'inscription (voir migration 20260804000001_profile_signup_fields) :
   civilité, nom/prénom, date de naissance, téléphone, email, mot de passe,
   opt-in newsletter (non obligatoire). L'âge n'est plus saisi manuellement ;
   il est dérivé de birth_date côté trigger Supabase. */
const INITIAL_FIELDS = {
  gender:         '',
  firstName:      '',
  lastName:       '',
  birthDate:      '',
  phone:          '',
  email:          '',
  password:       '',
  newsletterOptIn: false,
};

export default function AuthForm({ defaultTab = 'login', onTabChange, onSuccess }) {
  const [tab, setTab]               = useState(defaultTab); // 'login' | 'signup' | 'forgot'
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [resetSent, setResetSent]   = useState(false);
  const [signupPending, setSignupPending] = useState(false); // signup OK mais email à confirmer
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields]         = useState(INITIAL_FIELDS);

  const switchTab = (t) => {
    setTab(t);
    setError('');
    setResetSent(false);
    setSignupPending(false);
    onTabChange?.(t);
  };

  const updateField = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
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
        if (!fields.gender) {
          setError('Sélectionne ta civilité.');
          return;
        }
        if (!fields.birthDate) {
          setError('Renseigne ta date de naissance.');
          return;
        }
        /* Cohérence de la date : entre 13 et 120 ans. On calcule en années
           écoulées et non en années civiles pour rester juste autour d'un
           anniversaire pas encore atteint. */
        const birth = new Date(fields.birthDate);
        if (Number.isNaN(birth.getTime())) {
          setError('Date de naissance invalide.');
          return;
        }
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age--;
        if (age < 13 || age > 120) {
          setError('Tu dois avoir entre 13 et 120 ans.');
          return;
        }

        const result = await signUp(fields.email, fields.password, {
          firstName:       fields.firstName.trim(),
          lastName:        fields.lastName.trim(),
          gender:          fields.gender,
          birthDate:       fields.birthDate,
          phone:           fields.phone.trim() || null,
          newsletterOptIn: fields.newsletterOptIn,
        });
        /* Si Supabase a posé une session (Confirm email = OFF), on ferme le modal - l'AuthContext
           va capter la session et l'utilisateur est immédiatement connecté.
           Sinon (Confirm email = ON), on affiche l'écran "vérifie ton email" et on ne ferme rien. */
        if (result?.session) {
          onSuccess?.();
        } else {
          setSignupPending(true);
        }
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

  /* ─── Vue post-inscription : email à confirmer ───────── */
  if (signupPending) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.successBox}>
          <CheckCircle size={32} className={styles.successIcon} />
          <p className={styles.successTitle}>Compte créé !</p>
          <p className={styles.successDesc}>
            On t'a envoyé un email à <strong>{fields.email}</strong>.
            Clique sur le lien pour valider ton compte, puis reviens te connecter ici.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => { setSignupPending(false); switchTab('login'); }}
          >
            Aller à la connexion
          </Button>
        </div>
      </div>
    );
  }

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
            {/* Civilité - deux radios en pilules */}
            <fieldset className={styles.field}>
              <legend className={styles.label}>Civilité</legend>
              <div className={styles.genderChoice}>
                <label className={`${styles.genderPill} ${fields.gender === 'monsieur' ? styles.genderPillActive : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="monsieur"
                    checked={fields.gender === 'monsieur'}
                    onChange={updateField('gender')}
                    required
                  />
                  Monsieur
                </label>
                <label className={`${styles.genderPill} ${fields.gender === 'madame' ? styles.genderPillActive : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="madame"
                    checked={fields.gender === 'madame'}
                    onChange={updateField('gender')}
                  />
                  Madame
                </label>
              </div>
            </fieldset>

            <div className={styles.row2}>
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
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="auth-birthdate" className={styles.label}>Date de naissance</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={16} className={styles.inputIcon} />
                  <input
                    id="auth-birthdate"
                    type="date"
                    className={styles.input}
                    value={fields.birthDate}
                    onChange={updateField('birthDate')}
                    required
                    autoComplete="bday"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="auth-phone" className={styles.label}>Téléphone</label>
                <div className={styles.inputWrapper}>
                  <Phone size={16} className={styles.inputIcon} />
                  <input
                    id="auth-phone"
                    type="tel"
                    className={styles.input}
                    placeholder="06 12 34 56 78"
                    value={fields.phone}
                    onChange={updateField('phone')}
                    required
                    autoComplete="tel"
                  />
                </div>
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

        {/* Opt-in newsletter - inscription uniquement, non obligatoire */}
        {tab === 'signup' && (
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={fields.newsletterOptIn}
              onChange={updateField('newsletterOptIn')}
            />
            <span>Je souhaite m'abonner à la newsletter Booster (facultatif)</span>
          </label>
        )}

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
