import { useState, useEffect } from 'react';
import { User, Mail, Lock, LogOut, ShieldAlert } from 'lucide-react';
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

/* ─── Carte 1 : prénom / nom / âge ─────────────────────────── */
function ProfileCard({ user, profile, onSaved }) {
  const fallback = user?.user_metadata ?? {};
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [age,       setAge]       = useState('');
  const [status,    setStatus]    = useState({ type: null, msg: '' });
  const [loading,   setLoading]   = useState(false);

  /* Initialise les champs dès que profile ou user_metadata sont disponibles.
     On préfère la valeur de la table profiles ; à défaut, on retombe sur user_metadata. */
  useEffect(() => {
    setFirstName(profile?.first_name ?? fallback.first_name ?? '');
    setLastName (profile?.last_name  ?? fallback.last_name  ?? '');
    setAge      (profile?.age ?? (fallback.age ? Number(fallback.age) : '') ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setStatus({ type: null, msg: '' });
    const ageNum = age === '' ? null : Number(age);
    if (ageNum !== null && (Number.isNaN(ageNum) || ageNum < 13 || ageNum > 120)) {
      setStatus({ type: 'error', msg: 'Âge invalide (entre 13 et 120 ans).' });
      return;
    }
    setLoading(true);
    try {
      await updateProfile(user.id, {
        firstName: firstName.trim(),
        lastName:  lastName.trim(),
        age:       ageNum,
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
        <div className={styles.row2}>
          <div className={styles.field}>
            <label htmlFor="prof-firstname" className={styles.label}>Prénom</label>
            <input id="prof-firstname" className={styles.input} value={firstName}
              onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="prof-lastname" className={styles.label}>Nom</label>
            <input id="prof-lastname" className={styles.input} value={lastName}
              onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="prof-age" className={styles.label}>Âge</label>
          <input id="prof-age" type="number" min={13} max={120}
            className={styles.input} value={age}
            onChange={(e) => setAge(e.target.value)} />
        </div>

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
