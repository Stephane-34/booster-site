import { useState, useEffect } from 'react';
import { User, Mail, Lock, LogOut, ShieldAlert, Calendar, Phone } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, updateEmail, updatePassword } from '../../services/supabase';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, profile, refreshProfile, signOut } = useAuth();

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Mon profil</h1>
          <p className={styles.subtitle}>
            Gère tes informations personnelles, ton email de connexion et ton mot de passe.
          </p>
        </div>

        <div className={styles.grid}>
          <ProfileCard user={user} profile={profile} onSaved={refreshProfile} />
          <EmailCard currentEmail={user?.email} />
          <PasswordCard />
          <DangerCard onSignOut={signOut} />
        </div>
      </div>
    </div>
  );
}

/* ─── Carte 1 : identité complète (civilité, nom/prénom, date de naissance,
       téléphone, newsletter opt-in). Reprend les champs du formulaire
       d'inscription enrichi pour permettre aux utilisateurs existants (créés
       avant la migration) de compléter les données manquantes. ─────────── */
function ProfileCard({ user, profile, onSaved }) {
  const fallback = user?.user_metadata ?? {};
  const [gender,          setGender]          = useState('');
  const [firstName,       setFirstName]       = useState('');
  const [lastName,        setLastName]        = useState('');
  const [birthDate,       setBirthDate]       = useState('');
  const [phone,           setPhone]           = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [status,          setStatus]          = useState({ type: null, msg: '' });
  const [loading,         setLoading]         = useState(false);

  /* Initialise dès que profile ou user_metadata sont disponibles. On préfère
     la ligne profiles ; à défaut on retombe sur user_metadata (utile
     immédiatement après inscription avant que le trigger ait alimenté profiles). */
  useEffect(() => {
    setGender         (profile?.gender            ?? fallback.gender          ?? '');
    setFirstName      (profile?.first_name        ?? fallback.first_name      ?? '');
    setLastName       (profile?.last_name         ?? fallback.last_name       ?? '');
    setBirthDate      (profile?.birth_date        ?? fallback.birth_date      ?? '');
    setPhone          (profile?.phone             ?? fallback.phone           ?? '');
    setNewsletterOptIn(!!profile?.newsletter_opt_in);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setStatus({ type: null, msg: '' });

    /* Validation de la date de naissance si fournie (13-120 ans). */
    if (birthDate) {
      const b = new Date(birthDate);
      if (Number.isNaN(b.getTime())) {
        setStatus({ type: 'error', msg: 'Date de naissance invalide.' });
        return;
      }
      const now = new Date();
      let age = now.getFullYear() - b.getFullYear();
      const m = now.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
      if (age < 13 || age > 120) {
        setStatus({ type: 'error', msg: 'Tu dois avoir entre 13 et 120 ans.' });
        return;
      }
    }

    setLoading(true);
    try {
      await updateProfile(user.id, {
        firstName:       firstName.trim(),
        lastName:        lastName.trim(),
        gender:          gender || null,
        birthDate:       birthDate || null,
        phone:           phone.trim() || null,
        newsletterOptIn,
      });
      await onSaved?.();
      setStatus({ type: 'success', msg: 'Profil mis à jour.' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Erreur lors de la mise à jour.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}><User size={18} /></div>
        <div>
          <div className={styles.cardTitle}>Informations personnelles</div>
          <div className={styles.cardDesc}>Ces données apparaissent dans ton espace.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Civilité en deux pilules radio */}
        <fieldset className={styles.field}>
          <legend className={styles.label}>Civilité</legend>
          <div className={styles.genderChoice}>
            <label className={`${styles.genderPill} ${gender === 'monsieur' ? styles.genderPillActive : ''}`}>
              <input
                type="radio"
                name="prof-gender"
                value="monsieur"
                checked={gender === 'monsieur'}
                onChange={(e) => setGender(e.target.value)}
              />
              Monsieur
            </label>
            <label className={`${styles.genderPill} ${gender === 'madame' ? styles.genderPillActive : ''}`}>
              <input
                type="radio"
                name="prof-gender"
                value="madame"
                checked={gender === 'madame'}
                onChange={(e) => setGender(e.target.value)}
              />
              Madame
            </label>
          </div>
        </fieldset>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label htmlFor="prof-lastname" className={styles.label}>Nom</label>
            <input id="prof-lastname" className={styles.input} value={lastName}
              onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="prof-firstname" className={styles.label}>Prénom</label>
            <input id="prof-firstname" className={styles.input} value={firstName}
              onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
          </div>
        </div>

        <div className={styles.row2}>
          <div className={styles.field}>
            <label htmlFor="prof-birthdate" className={styles.label}>
              <Calendar size={14} /> Date de naissance
            </label>
            <input id="prof-birthdate" type="date" className={styles.input}
              value={birthDate ?? ''}
              onChange={(e) => setBirthDate(e.target.value)}
              autoComplete="bday" />
          </div>
          <div className={styles.field}>
            <label htmlFor="prof-phone" className={styles.label}>
              <Phone size={14} /> Téléphone
            </label>
            <input id="prof-phone" type="tel" className={styles.input}
              placeholder="06 12 34 56 78"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel" />
          </div>
        </div>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={newsletterOptIn}
            onChange={(e) => setNewsletterOptIn(e.target.checked)}
          />
          <span>Je souhaite recevoir la newsletter Booster (facultatif)</span>
        </label>

        {status.type && (
          <p className={`${styles.message} ${status.type === 'success' ? styles.success : styles.error}`}>
            {status.msg}
          </p>
        )}

        <Button type="submit" variant="primary" size="md" loading={loading} className={styles.submitBtn}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}

/* ─── Carte 2 : email ──────────────────────────────────────── */
function EmailCard({ currentEmail }) {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState({ type: null, msg: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { setEmail(currentEmail ?? ''); }, [currentEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, msg: '' });
    if (!email || email === currentEmail) {
      setStatus({ type: 'error', msg: 'Saisis un nouvel email différent de l\'actuel.' });
      return;
    }
    setLoading(true);
    try {
      await updateEmail(email.trim());
      setStatus({
        type: 'success',
        msg: `Un email de confirmation a été envoyé à ${email}. Clique sur le lien pour valider le changement.`,
      });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Erreur lors de la mise à jour.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}><Mail size={18} /></div>
        <div>
          <div className={styles.cardTitle}>Email de connexion</div>
          <div className={styles.cardDesc}>Tu devras valider le nouvel email par lien.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="prof-email" className={styles.label}>Email</label>
          <input id="prof-email" type="email" className={styles.input} value={email}
            onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>

        {status.type && (
          <p className={`${styles.message} ${status.type === 'success' ? styles.success : styles.error}`}>
            {status.msg}
          </p>
        )}

        <Button type="submit" variant="primary" size="md" loading={loading} className={styles.submitBtn}>
          Changer l'email
        </Button>
      </form>
    </div>
  );
}

/* ─── Carte 3 : mot de passe ───────────────────────────────── */
function PasswordCard() {
  const [pwd,    setPwd]     = useState('');
  const [pwd2,   setPwd2]    = useState('');
  const [status, setStatus]  = useState({ type: null, msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, msg: '' });
    if (pwd.length < 8) {
      setStatus({ type: 'error', msg: 'Le mot de passe doit contenir au moins 8 caractères.' });
      return;
    }
    if (pwd !== pwd2) {
      setStatus({ type: 'error', msg: 'Les deux mots de passe ne correspondent pas.' });
      return;
    }
    setLoading(true);
    try {
      await updatePassword(pwd);
      setPwd(''); setPwd2('');
      setStatus({ type: 'success', msg: 'Mot de passe mis à jour.' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Erreur lors de la mise à jour.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}><Lock size={18} /></div>
        <div>
          <div className={styles.cardTitle}>Mot de passe</div>
          <div className={styles.cardDesc}>8 caractères minimum.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="prof-pwd" className={styles.label}>Nouveau mot de passe</label>
          <input id="prof-pwd" type="password" className={styles.input} value={pwd}
            onChange={(e) => setPwd(e.target.value)} autoComplete="new-password" />
        </div>
        <div className={styles.field}>
          <label htmlFor="prof-pwd2" className={styles.label}>Confirmer</label>
          <input id="prof-pwd2" type="password" className={styles.input} value={pwd2}
            onChange={(e) => setPwd2(e.target.value)} autoComplete="new-password" />
        </div>

        {status.type && (
          <p className={`${styles.message} ${status.type === 'success' ? styles.success : styles.error}`}>
            {status.msg}
          </p>
        )}

        <Button type="submit" variant="primary" size="md" loading={loading} className={styles.submitBtn}>
          Mettre à jour
        </Button>
      </form>
    </div>
  );
}

/* ─── Carte 4 : zone "dangereuse" ──────────────────────────── */
function DangerCard({ onSignOut }) {
  return (
    <div className={`${styles.card} ${styles.dangerCard}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}><ShieldAlert size={18} /></div>
        <div>
          <div className={styles.cardTitle}>Session</div>
          <div className={styles.cardDesc}>Déconnecte-toi de cet appareil.</div>
        </div>
      </div>
      <Button variant="ghost" size="md" onClick={onSignOut} className={styles.submitBtn}>
        <LogOut size={16} />
        Me déconnecter
      </Button>
    </div>
  );
}
