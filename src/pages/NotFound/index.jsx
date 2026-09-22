import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import styles from './NotFound.module.css';

/* Page 404.
   Le rewrite Vercel renvoie index.html pour toute URL inconnue (nécessaire au
   routage côté client) : sans cette route attrape-tout, une adresse erronée
   affichait silencieusement la page d'accueil, sans jamais dire que la page
   n'existait pas. */
export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.icon}><Compass size={30} /></div>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Cette page n'existe pas</h1>
          <p className={styles.text}>
            Le lien est peut-être erroné, ou la page a été déplacée. Rien de grave :
            tout le reste du site est à sa place.
          </p>
          <div className={styles.actions}>
            <Button as={Link} to="/" variant="primary" size="lg">
              <ArrowLeft size={18} /> Retour à l'accueil
            </Button>
            <Button as={Link} to="/academie" variant="ghost" size="lg">
              Aller à l'Académie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
