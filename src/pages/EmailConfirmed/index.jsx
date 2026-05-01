import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import styles from './EmailConfirmed.module.css';

export default function EmailConfirmed() {
  const navigate  = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      navigate('/dashboard', { replace: true });
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <CheckCircle size={52} className={styles.icon} />
        <h1 className={styles.title}>Email confirmé !</h1>
        <p className={styles.desc}>
          Ton compte est activé. Bienvenue sur Booster&nbsp;🎉
        </p>
        <p className={styles.countdown}>
          Redirection dans <strong>{count}</strong> seconde{count > 1 ? 's' : ''}…
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/dashboard', { replace: true })}>
          Accéder à mon espace
        </Button>
      </div>
    </div>
  );
}
