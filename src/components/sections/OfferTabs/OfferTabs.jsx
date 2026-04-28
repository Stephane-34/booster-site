import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import styles from './OfferTabs.module.css';

const TABS = [
  { id: 'offer', label: 'Notre offre' },
  { id: 'how', label: 'Comment ça marche' },
  { id: 'pricing', label: 'Tarifs' },
];

const OFFER_CONTENT = {
  offer: {
    title: 'Investis comme un pro, dès 50 € par mois',
    description:
      'Accède à des produits d\'investissement luxembourgeois (assurance-vie) avec zéro frais d\'entrée. Des solutions habituellement réservées aux patrimoines importants, maintenant accessibles à tous.',
    points: [
      'Assurance-vie luxembourgeoise — protection maximale de tes fonds',
      '0 % de frais d\'entrée (vs 3-5 % en moyenne en banque)',
      'Dès 50 €/mois — commence à ton rythme',
      'Fonds en euros + unités de compte disponibles',
      'Gestion pilotée ou libre selon ton profil',
      'Suivi en temps réel sur le dashboard',
    ],
    cta: 'Ouvrir mon contrat',
    visual: 'investment',
  },
  how: {
    title: 'Simple comme bonjour, sérieux comme une banque',
    description:
      'En 4 étapes et moins de 10 minutes, tu bascules d\'un livret A stagnant vers un investissement qui travaille pour toi.',
    steps: [
      {
        number: '01',
        title: 'Tu crées ton compte',
        desc: 'Email + mot de passe, c\'est tout. Pas de justificatifs au départ.',
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
        desc: 'Accès au dashboard + à l\'Académie pour suivre et comprendre.',
      },
    ],
    cta: 'Commencer maintenant',
  },
  pricing: {
    title: 'Transparent, sans surprise',
    description:
      'Un modèle freemium pensé pour les jeunes — les fonctionnalités essentielles sont gratuites.',
    plans: [
      {
        name: 'Starter',
        price: 'Gratuit',
        highlight: false,
        features: [
          'Accès à l\'Académie (3 modules)',
          'Quiz du jour',
          'Simulateur basique',
          'Dashboard limité',
        ],
      },
      {
        name: 'Booster',
        price: '40 €/an',
        highlight: true,
        badge: 'Populaire',
        features: [
          'Tout Starter inclus',
          'Académie complète (6 thèmes)',
          'Dashboard complet',
          'Accès prioritaire aux experts',
          'Alertes et rappels personnalisés',
        ],
      },
    ],
    cta: 'Choisir mon plan',
  },
};

export default function OfferTabs({ onCTAClick }) {
  const [activeTab, setActiveTab] = useState('offer');
  const content = OFFER_CONTENT[activeTab];

  return (
    <section id="offres" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Badge variant="primary">Nos solutions</Badge>
          <h2 className={styles.sectionTitle}>
            Tout ce dont tu as besoin,{' '}
            <span className="gradient-text">au même endroit</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              className={[styles.tab, activeTab === id ? styles.tabActive : ''].join(' ')}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenu de l'onglet actif */}
        <div className={styles.tabContent} key={activeTab}>
          {activeTab === 'offer' && <OfferPanel content={content} onCTAClick={onCTAClick} />}
          {activeTab === 'how' && <HowPanel content={content} onCTAClick={onCTAClick} />}
          {activeTab === 'pricing' && <PricingPanel content={content} onCTAClick={onCTAClick} />}
        </div>
      </div>
    </section>
  );
}

function OfferPanel({ content, onCTAClick }) {
  return (
    <div className={styles.offerGrid}>
      <div className={styles.offerText}>
        <h3 className={styles.panelTitle}>{content.title}</h3>
        <p className={styles.panelDesc}>{content.description}</p>
        <ul className={styles.checkList}>
          {content.points.map((point) => (
            <li key={point} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Button variant="primary" size="lg" onClick={onCTAClick}>
          {content.cta}
          <ArrowRight size={18} />
        </Button>
      </div>

      {/* Visual simulé */}
      <div className={styles.offerVisual}>
        <div className={styles.contractCard}>
          <div className={styles.contractHeader}>
            <span className={styles.contractLabel}>Assurance-vie luxembourgeoise</span>
            <Badge variant="accent">Actif</Badge>
          </div>
          <div className={styles.contractStats}>
            <div className={styles.cStat}>
              <span className={styles.cStatLabel}>Valeur du contrat</span>
              <span className={styles.cStatValue}>12 840 €</span>
              <span className={styles.cStatDelta}>+682 € ce trimestre</span>
            </div>
            <div className={styles.contractBar}>
              <div className={styles.contractBarFill} style={{ width: '62%' }} />
            </div>
            <div className={styles.contractMix}>
              <span className={styles.mixItem}>
                <span className={styles.mixDot} style={{ background: 'var(--color-primary)' }} />
                Fonds € — 40%
              </span>
              <span className={styles.mixItem}>
                <span className={styles.mixDot} style={{ background: 'var(--color-accent)' }} />
                UC — 60%
              </span>
            </div>
          </div>
          <div className={styles.contractFees}>
            <span>Frais d'entrée</span>
            <span className={styles.feesValue}>0 %</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowPanel({ content, onCTAClick }) {
  return (
    <div className={styles.howWrapper}>
      <h3 className={styles.panelTitle}>{content.title}</h3>
      <p className={styles.panelDesc}>{content.description}</p>
      <div className={styles.steps}>
        {content.steps.map((step, i) => (
          <div key={step.number} className={styles.step}>
            <div className={styles.stepNumber}>{step.number}</div>
            {i < content.steps.length - 1 && <div className={styles.stepLine} />}
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="primary" size="lg" onClick={onCTAClick} className={styles.howCta}>
        {content.cta}
        <ArrowRight size={18} />
      </Button>
    </div>
  );
}

function PricingPanel({ content, onCTAClick }) {
  return (
    <div className={styles.pricingWrapper}>
      <h3 className={styles.panelTitle}>{content.title}</h3>
      <p className={styles.panelDesc}>{content.description}</p>
      <div className={styles.plans}>
        {content.plans.map((plan) => (
          <div
            key={plan.name}
            className={[styles.planCard, plan.highlight ? styles.planHighlight : ''].join(' ')}
          >
            <div className={styles.planTop}>
              <div className={styles.planNameRow}>
                <h4 className={styles.planName}>{plan.name}</h4>
                {plan.badge && <Badge variant="accent">{plan.badge}</Badge>}
              </div>
              <p className={styles.planPrice}>{plan.price}</p>
            </div>
            <ul className={styles.planFeatures}>
              {plan.features.map((f) => (
                <li key={f} className={styles.planFeature}>
                  <CheckCircle size={14} className={styles.checkIcon} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlight ? 'primary' : 'outline'}
              size="md"
              onClick={onCTAClick}
              className={styles.planBtn}
            >
              Choisir {plan.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
