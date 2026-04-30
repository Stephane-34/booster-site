import { ArrowRight } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import styles from './OfferTabs.module.css';

/* Contenu "Comment ça marche" — objectif unique : déclencher la prise de RDV */
const STEPS = [
  {
    number: '01',
    title: 'Tu crées ton compte',
    desc: "Email + mot de passe, c'est tout. Pas de justificatifs au départ.",
  },
  {
    number: '02',
    title: 'Tu définis ton profil',
    desc: 'Quelques questions sur tes objectifs et ton appétit au risque.',
  },
  {
    number: '03',
    title: 'Tu prends RDV avec un expert',
    desc: 'Gratuit, sans engagement. Pour valider et optimiser ton contrat.',
  },
  {
    number: '04',
    title: 'Tu investis et tu apprends',
    desc: "Accès au dashboard + à l'Académie pour suivre et comprendre.",
  },
];

export default function OfferTabs({ onCTAClick }) {
  return (
    <section id="comment-ca-marche" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Badge variant="primary">Comment ça marche</Badge>
          <h2 className={styles.sectionTitle}>
            Simple comme bonjour,{' '}
            <span className="gradient-text">sérieux comme une banque</span>
          </h2>
          <p className={styles.sectionDesc}>
            En 4 étapes et moins de 10 minutes, tu bascules d'un livret A stagnant
            vers un investissement qui travaille pour toi.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              {i < STEPS.length - 1 && <div className={styles.stepLine} />}
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.howCta}>
          <Button variant="primary" size="lg" onClick={onCTAClick}>
            Commencer maintenant
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
