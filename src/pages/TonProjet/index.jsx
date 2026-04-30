import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, TrendingUp, Info } from 'lucide-react';
import clsx from 'clsx';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { computeFutureValue, computeRequiredMonthly, computeMonthsToGoal } from '../../utils/calculators';
import { formatCurrency } from '../../utils/formatters';
import styles from './TonProjet.module.css';

const TABS = [
  { id: 'assurance-vie', label: "L'assurance vie" },
  { id: 'epargner',      label: 'Épargner et fructifier' },
  { id: 'immobilier',    label: 'Projet immobilier' },
  { id: 'futur',         label: 'Futur projet' },
  { id: 'retraite',      label: 'Préparer sa retraite' },
];

const RATE_BOOSTER  = 0.055; // 5,5 % annuel (hypothétique)
const RATE_LIVRET_A = 0.03;  // 3 %

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
  },
  epargner: {
    badge: 'Stratégie',
    title: "Faites travailler votre argent, même à petit budget",
    desc: "100 € par mois placés à 25 ans valent plus du double qu'à 35 ans. Le temps est votre meilleur allié. Voici comment maximiser chaque euro que vous épargnez.",
    steps: [
      {
        number: '01',
        title: 'Versez régulièrement (méthode DCA)',
        desc: "Investir un montant fixe chaque mois réduit l'impact des fluctuations de marché. Pas besoin de surveiller les cours.",
      },
      {
        number: '02',
        title: 'Laissez les intérêts composer',
        desc: "À 7 % net par an, votre capital double en ~10 ans. Chaque année supplémentaire compte exponentiellement.",
      },
      {
        number: '03',
        title: 'Adaptez le risque à votre horizon',
        desc: 'Court terme → fonds euros sécurisé. Long terme → unités de compte orientées croissance mondiale.',
      },
    ],
  },
  immobilier: {
    badge: 'Projet immobilier',
    title: 'Constituez votre apport autrement',
    desc: "Vous visez un achat immobilier dans 3 à 7 ans ? L'assurance vie est l'outil idéal pour faire fructifier votre futur apport tout en restant disponible quand l'opportunité se présente.",
    points: [
      "Rachat partiel possible à tout moment — vous restez maître de votre timing d'achat",
      "Profil équilibré recommandé pour un horizon 3-7 ans",
      "Accès aux SCPI : rendement immobilier (4-6 % brut/an) sans contrainte de gestion locative",
      "0 % de frais d'entrée — chaque euro épargné travaille entièrement pour votre apport",
    ],
  },
  futur: {
    badge: 'Flexibilité',
    title: 'Financez vos grandes étapes de vie',
    desc: "Mariage, voyage, création d'entreprise, études à l'étranger... L'assurance vie s'adapte à tous vos horizons.",
    projects: [
      { emoji: '💍', label: 'Mariage',          horizon: '2-3 ans' },
      { emoji: '✈️', label: 'Tour du monde',    horizon: '1-2 ans' },
      { emoji: '🎓', label: "Études à l'étranger", horizon: '2-4 ans' },
      { emoji: '🚀', label: 'Créer son entreprise', horizon: '3-5 ans' },
      { emoji: '🏠', label: 'Résidence principale', horizon: '5-7 ans' },
      { emoji: '🚗', label: 'Véhicule / Équipement', horizon: '1-3 ans' },
    ],
    points: [
      "Flexibilité totale : rachetez tout ou partie quand vous en avez besoin",
      "Profil personnalisé selon votre horizon et votre tolérance au risque",
      "Pas de pénalité de sortie anticipée",
    ],
  },
  retraite: {
    badge: 'Long terme',
    title: 'La retraite, ça se prépare maintenant',
    desc: "Le système de retraite par répartition ne suffira pas. Préparer sa retraite à 25 ans, c'est se donner 40 ans pour laisser les intérêts composés faire le travail — et arriver libre.",
    points: [
      "Assurance vie + PER (Plan Épargne Retraite) : deux enveloppes complémentaires",
      "PER : vos versements sont déductibles de votre revenu imposable",
      "Assurance vie : capital disponible avant la retraite si besoin",
      "Choix à la sortie : rente viagère, capital unique ou versements programmés",
      "Stratégie de désensibilisation progressive du risque à l'approche de la retraite",
    ],
  },
};

export default function TonProjet() {
  const [activeTab, setActiveTab] = useState('assurance-vie');
  const content = CONTENT[activeTab];

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.hero}>
          <Badge variant="accent">Ton projet</Badge>
          <h1 className={styles.heroTitle}>
            Quel est ton{' '}
            <span className="gradient-text">objectif financier ?</span>
          </h1>
          <p className={styles.heroDesc}>
            Chaque projet mérite une stratégie adaptée. Explore les différents
            usages de l'assurance vie luxembourgeoise et simule ton futur capital.
          </p>
        </header>

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

        <div className={styles.tabContent} key={activeTab}>
          <TabPanel content={content} tabId={activeTab} />
        </div>

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

/* ─── Panneau principal ──────────────────────────────────── */
function TabPanel({ content, tabId }) {
  const SIMULATORS = {
    'assurance-vie': SimAssuranceVie,
    'epargner':      SimEpargner,
    'immobilier':    SimImmobilier,
    'futur':         SimFutur,
    'retraite':      SimRetraite,
  };
  const Simulator = SIMULATORS[tabId];

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Badge variant="primary">{content.badge}</Badge>
        <h2 className={styles.panelTitle}>{content.title}</h2>
        <p className={styles.panelDesc}>{content.desc}</p>
      </div>

      <div className={styles.panelBody}>
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

        <Simulator />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIMULATEURS — un par onglet
   ═══════════════════════════════════════════════════════════ */

/* ── 1. Assurance vie : combien aurai-je dans X ans ? ─────── */
function SimAssuranceVie() {
  const HORIZONS = [5, 8, 10, 15, 20, 30];
  const [monthly, setMonthly] = useState(100);
  const [horizon, setHorizon] = useState(10);

  const result = useMemo(() => {
    const months    = horizon * 12;
    const capital   = computeFutureValue(monthly, RATE_BOOSTER, months);
    const invested  = monthly * months;
    const gains     = capital - invested;
    const livret    = computeFutureValue(monthly, RATE_LIVRET_A, months);
    const fiscalOk  = horizon >= 8;
    return { capital, invested, gains, livret, fiscalOk, diff: capital - livret };
  }, [monthly, horizon]);

  return (
    <div className={styles.simCard}>
      <div className={styles.simHeader}>
        <TrendingUp size={14} />
        <span>Simulateur — combien aurai-je dans {horizon} ans ?</span>
      </div>

      <div className={styles.simControls}>
        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Versement mensuel</label>
            <span className={styles.simSliderValue}>{formatCurrency(monthly)}</span>
          </div>
          <input type="range" min={50} max={1000} step={50} value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
        </div>

        <div className={styles.simSliderGroup}>
          <label>Horizon</label>
          <div className={styles.simPills}>
            {HORIZONS.map((h) => (
              <button key={h}
                className={clsx(styles.simPill, horizon === h && styles.simPillActive)}
                onClick={() => setHorizon(h)}>
                {h} ans
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.simResult}>
        <div className={styles.simResultMain}>
          <span className={styles.simResultLabel}>Capital estimé dans {horizon} ans</span>
          <span className={styles.simResultValue}>{formatCurrency(result.capital)}</span>
          <span className={styles.simResultSub}>
            dont <strong>{formatCurrency(result.gains)}</strong> de gains
          </span>
        </div>
        <div className={styles.simComparisons}>
          <div className={styles.simCompRow}>
            <span>Livret A (3 %)</span>
            <span className={styles.simValueLow}>{formatCurrency(result.livret)}</span>
          </div>
          <div className={styles.simCompRow}>
            <span>Booster (5,5 %)</span>
            <span className={styles.simValueHigh}>{formatCurrency(result.capital)}</span>
          </div>
          <div className={styles.simDiff}>+{formatCurrency(result.diff)} de plus avec Booster</div>
          {result.fiscalOk && (
            <div className={styles.simFiscal}>
              <Info size={12} />
              Abattement fiscal de 4 600 €/an sur les gains actif après 8 ans
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 2. Épargner : l'effet du temps ──────────────────────── */
function SimEpargner() {
  const [monthly, setMonthly] = useState(100);

  const result = useMemo(() => {
    const now    = computeFutureValue(monthly, RATE_BOOSTER, 30 * 12);
    const delay5 = computeFutureValue(monthly, RATE_BOOSTER, 25 * 12);
    const loss   = now - delay5;
    const lossPct = Math.round((loss / now) * 100);
    return { now, delay5, loss, lossPct };
  }, [monthly]);

  return (
    <div className={styles.simCard}>
      <div className={styles.simHeader}>
        <TrendingUp size={14} />
        <span>Simulateur — l'effet du temps sur votre capital</span>
      </div>

      <div className={styles.simControls}>
        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Versement mensuel</label>
            <span className={styles.simSliderValue}>{formatCurrency(monthly)}</span>
          </div>
          <input type="range" min={50} max={1000} step={50} value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
        </div>
      </div>

      <div className={styles.simResult}>
        <div className={styles.simCompRow}>
          <span>Commencer <strong>maintenant</strong> (30 ans)</span>
          <span className={styles.simValueHigh}>{formatCurrency(result.now)}</span>
        </div>
        <div className={styles.simCompRow}>
          <span>Commencer <strong>dans 5 ans</strong> (25 ans)</span>
          <span className={styles.simValueLow}>{formatCurrency(result.delay5)}</span>
        </div>
        <div className={styles.simDiff}>
          -{formatCurrency(result.loss)} perdus en attendant 5 ans ({result.lossPct} % du capital)
        </div>
        <p className={styles.simNote}>
          Simulation sur 30 ans à {(RATE_BOOSTER * 100).toFixed(1)} % annuel.
        </p>
      </div>
    </div>
  );
}

/* ── 3. Immobilier : quand aurai-je mon apport ? ─────────── */
function SimImmobilier() {
  const [target, setTarget]   = useState(30000);
  const [monthly, setMonthly] = useState(300);

  const result = useMemo(() => {
    const months     = computeMonthsToGoal(target, monthly, RATE_BOOSTER);
    const years      = Math.floor(months / 12);
    const remMonths  = months % 12;
    const livretMths = computeMonthsToGoal(target, monthly, RATE_LIVRET_A);
    const gainMths   = livretMths - months;
    return { months, years, remMonths, livretMths, gainMths };
  }, [target, monthly]);

  return (
    <div className={styles.simCard}>
      <div className={styles.simHeader}>
        <TrendingUp size={14} />
        <span>Simulateur — quand aurai-je mon apport ?</span>
      </div>

      <div className={styles.simControls}>
        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Apport visé</label>
            <span className={styles.simSliderValue}>{formatCurrency(target)}</span>
          </div>
          <input type="range" min={10000} max={100000} step={5000} value={target}
            onChange={(e) => setTarget(Number(e.target.value))} className={styles.simSlider} />
        </div>

        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Versement mensuel</label>
            <span className={styles.simSliderValue}>{formatCurrency(monthly)}</span>
          </div>
          <input type="range" min={100} max={2000} step={50} value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
        </div>
      </div>

      <div className={styles.simResult}>
        <div className={styles.simResultMain}>
          <span className={styles.simResultLabel}>Apport constitué en</span>
          <span className={styles.simResultValue}>
            {result.years > 0 ? `${result.years} an${result.years > 1 ? 's' : ''}` : ''}
            {result.years > 0 && result.remMonths > 0 ? ' ' : ''}
            {result.remMonths > 0 ? `${result.remMonths} mois` : ''}
          </span>
          <span className={styles.simResultSub}>avec Booster à 5,5 %</span>
        </div>
        {result.gainMths > 0 && (
          <div className={styles.simDiff}>
            {result.gainMths} mois de moins qu'avec un Livret A
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 4. Futur projet : combien épargner par mois ? ────────── */
function SimFutur() {
  const HORIZONS = [1, 2, 3, 5, 7, 10];
  const [target, setTarget]   = useState(10000);
  const [horizon, setHorizon] = useState(3);

  const result = useMemo(() => {
    const months         = horizon * 12;
    const required       = computeRequiredMonthly(target, RATE_BOOSTER, months);
    const requiredLivret = computeRequiredMonthly(target, RATE_LIVRET_A, months);
    const saving         = requiredLivret - required;
    return { required, saving };
  }, [target, horizon]);

  return (
    <div className={styles.simCard}>
      <div className={styles.simHeader}>
        <TrendingUp size={14} />
        <span>Simulateur — combien épargner par mois pour mon projet ?</span>
      </div>

      <div className={styles.simControls}>
        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Montant du projet</label>
            <span className={styles.simSliderValue}>{formatCurrency(target)}</span>
          </div>
          <input type="range" min={1000} max={50000} step={1000} value={target}
            onChange={(e) => setTarget(Number(e.target.value))} className={styles.simSlider} />
        </div>

        <div className={styles.simSliderGroup}>
          <label>Horizon</label>
          <div className={styles.simPills}>
            {HORIZONS.map((h) => (
              <button key={h}
                className={clsx(styles.simPill, horizon === h && styles.simPillActive)}
                onClick={() => setHorizon(h)}>
                {h} an{h > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.simResult}>
        <div className={styles.simResultMain}>
          <span className={styles.simResultLabel}>Versement mensuel nécessaire</span>
          <span className={styles.simResultValue}>{formatCurrency(result.required)}</span>
          <span className={styles.simResultSub}>pour {formatCurrency(target)} en {horizon} an{horizon > 1 ? 's' : ''}</span>
        </div>
        {result.saving > 0.5 && (
          <div className={styles.simDiff}>
            {formatCurrency(result.saving)}/mois économisés vs Livret A
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 5. Retraite : mon capital à 65 ans ──────────────────── */
function SimRetraite() {
  const [age, setAge]         = useState(25);
  const [monthly, setMonthly] = useState(100);

  const result = useMemo(() => {
    const monthsNow   = Math.max(0, (65 - age) * 12);
    const monthsLater = Math.max(0, (65 - (age + 10)) * 12);
    const capitalNow   = computeFutureValue(monthly, RATE_BOOSTER, monthsNow);
    const capitalLater = computeFutureValue(monthly, RATE_BOOSTER, monthsLater);
    const loss         = capitalNow - capitalLater;
    const lossPct      = capitalNow > 0 ? Math.round((loss / capitalNow) * 100) : 0;
    return { capitalNow, capitalLater, loss, lossPct };
  }, [age, monthly]);

  return (
    <div className={styles.simCard}>
      <div className={styles.simHeader}>
        <TrendingUp size={14} />
        <span>Simulateur — mon capital à 65 ans</span>
      </div>

      <div className={styles.simControls}>
        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Mon âge actuel</label>
            <span className={styles.simSliderValue}>{age} ans</span>
          </div>
          <input type="range" min={18} max={45} step={1} value={age}
            onChange={(e) => setAge(Number(e.target.value))} className={styles.simSlider} />
        </div>

        <div className={styles.simSliderGroup}>
          <div className={styles.simSliderRow}>
            <label>Versement mensuel</label>
            <span className={styles.simSliderValue}>{formatCurrency(monthly)}</span>
          </div>
          <input type="range" min={50} max={500} step={50} value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
        </div>
      </div>

      <div className={styles.simResult}>
        <div className={styles.simResultMain}>
          <span className={styles.simResultLabel}>Capital estimé à 65 ans</span>
          <span className={styles.simResultValue}>{formatCurrency(result.capitalNow)}</span>
          <span className={styles.simResultSub}>en commençant à {age} ans ({65 - age} ans d'épargne)</span>
        </div>
        {result.loss > 0 && (
          <>
            <div className={styles.simCompRow}>
              <span>En commençant dans 10 ans</span>
              <span className={styles.simValueLow}>{formatCurrency(result.capitalLater)}</span>
            </div>
            <div className={styles.simDiff}>
              -{formatCurrency(result.loss)} perdus en attendant ({result.lossPct} % du capital)
            </div>
          </>
        )}
        <p className={styles.simNote}>
          Simulation à {(RATE_BOOSTER * 100).toFixed(1)} % annuel. Indicatif, ne constitue pas un conseil.
        </p>
      </div>
    </div>
  );
}
