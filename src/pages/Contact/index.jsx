import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import styles from './Contact.module.css';

/* Page de contact.
   Le formulaire poste vers /api/contact, une fonction serverless : la clé
   Resend ne peut pas transiter par le navigateur. */
export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '', website: '' });
  const [state, setState]   = useState('idle');   // idle | sending | sent | error
  const [error, setError]   = useState('');

  const update = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (state === 'error') setState('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "L'envoi a échoué.");
      setState('sent');
      setFields({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setState('error');
      setError(err.message || "L'envoi a échoué. Réessaie dans un instant.");
    }
  };

  if (state === 'sent') {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.successIcon}><CheckCircle size={30} /></div>
            <h1 className={styles.title}>Message envoyé</h1>
            <p className={styles.text}>
              Merci, on te répond dès que possible à l'adresse que tu as indiquée.
            </p>
            <Button variant="ghost" size="md" onClick={() => setState('idle')}>
              Envoyer un autre message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.icon}><Mail size={28} /></div>
          <h1 className={styles.title}>Une question ?</h1>
          <p className={styles.text}>
            Écris-nous, on te répond directement par email. Pour parler à un conseiller,
            tu peux aussi <a href="/investir#rdv">prendre rendez-vous</a>.
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="contact-name" className={styles.label}>Nom</label>
              <input
                id="contact-name" type="text" className={styles.input}
                value={fields.name} onChange={update('name')}
                required maxLength={100} autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-email" className={styles.label}>Email</label>
              <input
                id="contact-email" type="email" className={styles.input}
                placeholder="ton@email.com"
                value={fields.email} onChange={update('email')}
                required maxLength={150} autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>Message</label>
              <textarea
                id="contact-message" rows={7} className={styles.textarea}
                value={fields.message} onChange={update('message')}
                required maxLength={4000}
              />
              <p className={styles.counter}>{fields.message.length} / 4000</p>
            </div>

            {/* Honeypot : masqué en CSS et retiré de l'ordre de tabulation, donc
                invisible pour un humain comme pour un lecteur d'écran. Un robot
                qui remplit tous les champs le remplit aussi, ce qui le trahit. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-website">Ne pas remplir</label>
              <input
                id="contact-website" type="text" tabIndex={-1} autoComplete="off"
                value={fields.website} onChange={update('website')}
              />
            </div>

            {state === 'error' && (
              <p className={styles.error} role="alert">
                <AlertCircle size={16} /> {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg"
                    loading={state === 'sending'} className={styles.submit}>
              <Send size={18} /> Envoyer
            </Button>

            <p className={styles.legal}>
              Les informations transmises servent uniquement à traiter ta demande.
              Elles ne sont ni cédées ni utilisées à des fins commerciales.
              Voir notre <a href="/confidentialite">politique de confidentialité</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
