import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import clsx from 'clsx';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import styles from './TonProjet.module.css';

const TABS = [
  { id: 'assurance-vie', label: "L'assurance vie" },
  { id: 'epargner', label: 'Épargner et fructifier' },
  { id: 'immobilier', label: 'Projet immobilier' },
  { id: 'futur', label: 'Futur projet' },
  { id: 'retraite', label: 'Préparer sa retraite' },
];

const CONTENT = {
  'assurance-vie': {
    badge: 'Les bases',
    title: "L'assurance vie, bien plus qu'une épargne",
    desc: "Souvent mal comprise, l'assurance vie est pourtant le placement préféré des Français — et pour de bonnes raisons. C'est l'outil idéal pour un jeune actif qui veut faire fructifier son argent sans le bloquer.",
    points: [
      "Enveloppe fiscale avantageuse : abattement annuel de 4 600 € sur les gains après 8 ans",
      "Capital disponible à tout moment — les rachats partiels sont libres et sans pénalité",
      "Transmission optimisée hors succession, jusqu'à 152 500 € par bénéficiaire",
      "Deux poches complémentaires : fonds en euros (capital garanti) + unités de compte (rendement potentiel)",
      "Protection renforcée grâce au droit luxembourgeois — triangle de sécurité unique en Europe",
    ],
    highlight: {
      label: "frais d'entrée",
      value: '0 %',
      sub: 'vs 3 à 5 % en banque traditionnelle',
    },
  },
  epargner: {
    badge: 'Stratégie',
    title: "Faites travailler votre argent, même à petit budget",
    desc: "100 € par mois placés à 25 ans valent plus du double qu'à 35 ans. Le temps est votre meilleur allié. Voici comment maximiser chaque euro que vous épargnez.",
    steps: [
      {
        number: '01',
        title: 'Versez régulièrement (méthode DCA)',
        desc: "Investir un montant fixe chaque mois réduit l'impact des fluctuations de marché. Pas besoin de surveiller les cours ou de \"timer\" le marché.",
      },
      {
        number: '02',
        title: 'Laissez les intérêts composer',
        desc: "À 7 % net par an, votre capital double en ~10 ans (règle des 72). Chaque année supplémentaire compte exponentiellement.",
      },
      {
        number: '03',
        title: 'Adaptez le risque à votre horizon',
        desc: 'Court terme (< 3 ans) → fonds euros sécurisé. Moyen terme → profil équilibré. Long terme (> 8 ans) → unités de compte orientées croissance mondiale.',
      },
    ],
    highlight: {
      label: 'différence de capital à 65 ans',
      value: '+60 %',
      sub: 'en commençant à 25 ans vs 35 ans, même effort mensuel',
    },
  },
  immobilier: {
    badge: 'Projet immobilier',
    title: 'Constituez votre apport autrement',
    desc: "Vous visez un achat immobilier dans 3 à 7 ans ? L'assurance vie est l'outil idéal pour faire fructifier votre futur apport tout en restant disponible quand l'opportunité se présente.",
    points: [
      "Rachat partiel possible à tout moment — vous restez maître de votre timing d'achat",
      "Profil équilibré recommandé pour un horizon 3-7 ans : rendement potentiel sans volatilité excessive",
      "Accès aux SCPI via l'assurance vie : rendement immobilier (4-6 % brut/an) sans contrainte de gestion locative",
      "0 % de frais d'entrée — chaque euro épargné travaille entièrement pour votre apport",
      "Simulation d'apport personnalisée réalisée avec votre conseiller dédié",
    ],
    highlight: {
      label: 'rendement moyen SCPI',
      value: '4-6 %',
      sub: 'brut par an, accessible dès quelques centaines d\'euros',
    },
  },
  futur: {
    badge: 'Flexibilité',
    title: 'Financez vos grandes étapes de vie',
    desc: "Mariage, voyage au long cours, création d'entreprise, études à l'étranger... L'assurance vie s'adapte à tous vos horizons et vous permet de concrétiser vos projets progressivement.",
    projects: [
      { emoji: '💍', label: 'Mariage', horizon: '2-3 ans' },
      { emoji: '✈️', label: 'Tour du monde', horizon: '1-2 ans' },
      { emoji: '🎓', label: 'Études à l\'étranger', horizon: '2-4 ans' },
      { emoji: '🚀', label: 'Créer son entreprise', horizon: '3-5 ans' },
      { emoji: '🏠', label: 'Résidence principale', horizon: '5-7 ans' },
      { emoji: '🚗', label: 'Véhicule / Équipement', horizon: '1-3 ans' },
    ],
    points: [
      "Flexibilité totale : rachetez tout ou partie quand vous en avez besoin",
      "Profil personnalisé selon votre horizon et votre tolérance au risque",
      "Pas de pénalité de sortie anticipée — votre argent reste le vôtre",
    ],
  },
  retraite: {
    badge: 'Long terme',
    title: 'La retraite, ça se prépare maintenant',
    desc: "Le système de retraite par répartition ne suffira pas. Préparer sa retraite à 25 ans, c'est se donner 40 ans pour laisser les intérêts composés faire le travail — et arriver libre.",
    points: [
      "Assurance vie + PER (Plan Épargne Retraite) : deux enveloppes complémentaires, deux avantages fiscaux",
      "PER : vos versements sont déductibles de votre revenu imposable — économie fiscale immédiate",
      "Assurance vie : capital disponible avant la retraite si besoin, sans contrainte de blocage",
      "Choix à la sortie : rente viagère, capital unique ou versements programmés",
      "Stratégie de désensibilisation : on réduit progressivement le risque à l'approche de la retraite",
    ],
    highlight: {
      label: 'capital estimé à 65 ans pour 100 €/mois à 7 %/an',
      value: '263 000 €',
      sub: "en commençant à 25 ans — 122 000 € seulement à partir de 35 ans",
    },
  },
};

export default function TonProjet() {
  const [activeTab, setActiveTab] = useState('assurance-vie');
  const content = CONTENT[activeTab];

  return (
    <div className={styles.page}>
      <div className="container">

        {/* En-tête de page */}
        <header className={styles.hero}>
          <Badge variant="accent">Ton projet</Badge>
          <h1 className={styles.heroTitle}>
            Quel est ton{' '}
            <span className="gradient-text">objectif financier ?</span>
          </h1>
          <p className={styles.heroDesc}>
            Chaque projet mérite une stratégie adaptée. Explore les différents
            usages de l'assurance vie luxembourgeoise et découvre comment Booster
            t'accompagne pas à pas.
          </p>
        </header>

        {/* Onglets navigation */}
        <div className={styles.tabs} role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              className={clsx(styles.tab, activeTab === id && styles.tabActive)}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenu de l'onglet */}
        <div className={styles.tabContent} key={activeTab}>
          <TabPanel content={content} tabId={activeTab} />
        </div>

        {/* CTA global */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Un conseiller analyse votre situation gratuitement et vous propose
            la stratégie la plus adaptée à votre projet.
          </p>
          <Button variant="primary" size="lg" as={Link} to="/investir#rdv">
            <Calendar size={18} />
            Prendre RDV gratuitement
          </Button>
        </div>

      </div>
    </div>
  );
}

/* ─── Panneau de contenu selon l'onglet actif ────────────── */
function TabPanel({ content, tabId }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Badge variant="primary">{content.badge}</Badge>
        <h2 className={styles.panelTitle}>{content.title}</h2>
        <p className={styles.panelDesc}>{content.desc}</p>
      </div>

      <div className={styles.panelBody}>
        {/* Onglet avec liste de points */}
        {content.points && (
          <ul className={styles.checkList}>
            {content.points.map((point) => (
              <li key={point} className={styles.checkItem}>
                <CheckCircle size={16} className={styles.checkIcon} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Onglet "épargner" : étapes numérotées */}
        {content.steps && (
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
        )}

        {/* Onglet "futur projet" : grille de projets */}
        {content.projects && (
          <>
            <div className={styles.projectGrid}>
              {content.projects.map(({ emoji, label, horizon }) => (
                <div key={label} className={styles.projectCard}>
                  <span className={styles.projectEmoji}>{emoji}</span>
                  <span className={styles.projectLabel}>{label}</span>
                  <span className={styles.projectHorizon}>{horizon}</span>
                </div>
              ))}
            </div>
            <ul className={styles.checkList}>
              {content.points.map((point) => (
                <li key={point} className={styles.checkItem}>
                  <CheckCircle size={16} className={styles.checkIcon} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Chiffre clé */}
        {content.highlight && (
          <div className={styles.highlight}>
            <span className={styles.highlightValue}>{content.highlight.value}</span>
            <div>
              <p className={styles.highlightLabel}>{content.highlight.label}</p>
              <p className={styles.highlightSub}>{content.highlight.sub}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
