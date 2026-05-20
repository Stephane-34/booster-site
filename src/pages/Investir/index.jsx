import { useState, useMemo } from 'react';
import { CheckCircle, TrendingUp, Info, ArrowRight, Landmark, BarChart2, Percent } from 'lucide-react';
import clsx from 'clsx';
import OfferTabs from '../../components/sections/OfferTabs/OfferTabs';
import BookingCTA from '../../components/sections/BookingCTA/BookingCTA';
import Modal from '../../components/ui/Modal/Modal';
import AuthForm from '../../components/sections/AuthForm/AuthForm';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { computeFutureValue, computeRequiredMonthly, computeMonthsToGoal } from '../../utils/calculators';
import { formatCurrency } from '../../utils/formatters';
import styles from './Investir.module.css';

const RATE_BOOSTER  = 0.05;   // 5 % annuel
const RATE_LIVRET_A = 0.015;  // 1,5 % annuel

/* ─── Page principale ─────────────────────────────────────── */
export default function Investir() {
  const [authModal, setAuthModal] = useState(false);
  return (
    <div className={styles.page}>
      <HeroAV onCTAClick={() => setAuthModal(true)} />
      <OfferTabs onCTAClick={() => setAuthModal(true)} />
      <CompareSimulator />
      <ProjectTabs onCTAClick={() => setAuthModal(true)} />
      <BookingCTA />
      <Modal isOpen={authModal} onClose={() => setAuthModal(false)} title="Créer mon compte gratuit">
        <AuthForm defaultTab="signup" onSuccess={() => setAuthModal(false)} />
      </Modal>
    </div>
  );
}

/* ─── Hero assurance vie ──────────────────────────────────── */
const AV_GLASS_SECTIONS = [
  {
    icon: Landmark,
    title: 'Comment ça fonctionne ?',
    content: "Un contrat entre vous et un assureur : vous versez, l'assureur fait fructifier. Votre argent n'est jamais bloqué — vous pouvez effectuer des rachats partiels ou totaux à tout moment, sans pénalité. Vous choisissez librement le rythme : versement initial, versements libres ou programmés (mensuel, trimestriel…).",
  },
  {
    icon: BarChart2,
    title: 'Fonds euros vs Unités de compte',
    rows: [
      { label: 'Fonds en euros', detail: 'Capital garanti + effet cliquet — les intérêts sont définitivement acquis. Rendement modéré, idéal pour sécuriser.' },
      { label: 'Unités de compte', detail: 'Investi sur les marchés (actions, ETF, SCPI…). Capital non garanti, mais rendement potentiel nettement supérieur.' },
    ],
  },
  {
    icon: Percent,
    title: 'Une fiscalité très avantageuse',
    items: [
      { highlight: 'Avant 8 ans', text: 'Gains soumis au PFU de 30 % (12,8 % IR + 17,2 % prélèvements sociaux).' },
      { highlight: 'Après 8 ans', text: 'Abattement annuel de 4 600 € sur les gains (9 200 € en couple) — exonéré d\'IR en dessous.' },
      { highlight: 'Succession', text: 'Capital hors succession. Chaque bénéficiaire bénéficie de 152 500 € nets d\'impôts (versements avant 70 ans).' },
    ],
  },
];

function HeroAV({ onCTAClick }) {
  return (
    <section className={styles.heroAV}>
      <div className="container">
        {/* Titre centré */}
        <div className={styles.heroAVHead}>
          <Badge variant="primary">Assurance vie</Badge>
          <h1 className={styles.heroAVTitle}>
            Mon assurance vie,{' '}
            <span className="gradient-text">mon couteau suisse</span>{' '}
            de l'épargne
          </h1>
          <p className={styles.heroAVDesc}>
            L'outil le plus puissant pour transformer tes économies d'aujourd'hui en gros projets demain.
          </p>
          <Button variant="accent" size="lg" onClick={onCTAClick}>
            Créer mon compte
            <ArrowRight size={18} />
          </Button>
        </div>

        {/* Glass card */}
        <div className={styles.glassCard}>
          <p className={styles.glassIntro}>
            L'assurance vie est souvent considérée comme le « couteau suisse » de l'épargne en France.
            Contrairement à ce que son nom pourrait laisser penser, il ne s'agit pas principalement d'une
            assurance décès, mais d'un produit d'épargne et de placement qui permet de se constituer un
            capital de son vivant, avec des avantages fiscaux très intéressants.
          </p>

          <div className={styles.glassSections}>
            {AV_GLASS_SECTIONS.map(({ icon: Icon, title, content, rows, items }) => (
              <div key={title} className={styles.glassSection}>
                <div className={styles.glassSectionHead}>
                  <div className={styles.glassSectionIcon}><Icon size={16} /></div>
                  <h3 className={styles.glassSectionTitle}>{title}</h3>
                </div>

                {content && <p className={styles.glassSectionText}>{content}</p>}

                {rows && (
                  <div className={styles.glassRows}>
                    {rows.map(({ label, detail }) => (
                      <div key={label} className={styles.glassRow}>
                        <span className={styles.glassRowLabel}>{label}</span>
                        <span className={styles.glassRowDetail}>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {items && (
                  <ul className={styles.glassItems}>
                    {items.map(({ highlight, text }) => (
                      <li key={highlight} className={styles.glassItem}>
                        <span className={styles.glassItemHighlight}>{highlight}</span>
                        <span className={styles.glassItemText}>{text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Simulateur comparatif ───────────────────────────────── */
const COMPARE_HORIZONS = [5, 10, 15, 20, 30];

function CompareSimulator() {
  const [monthly, setMonthly] = useState(150);
  const [horizon, setHorizon] = useState(10);

  const result = useMemo(() => {
    const months  = horizon * 12;
    const booster = computeFutureValue(monthly, RATE_BOOSTER, months);
    const livret  = computeFutureValue(monthly, RATE_LIVRET_A, months);
    return { booster, livret, diff: booster - livret };
  }, [monthly, horizon]);

  return (
    <section className={styles.compareSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Badge variant="primary">Simulateur</Badge>
          <h2 className={styles.sectionTitle}>
            Vois la différence en{' '}
            <span className="gradient-text">temps réel</span>
          </h2>
          <p className={styles.sectionDesc}>
            Même versement, même durée — mais pas le même résultat.
            Voici ce que font 1,5 % vs 5 % sur la durée.
          </p>
        </div>

        <div className={styles.compareInner}>
          <div className={styles.compareControls}>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderRow}>
                <label>Versement mensuel</label>
                <span className={styles.sliderVal}>{formatCurrency(monthly)}</span>
              </div>
              <input type="range" min={50} max={2000} step={50} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.sliderGroup}>
              <label>Horizon</label>
              <div className={styles.pills}>
                {COMPARE_HORIZONS.map((h) => (
                  <button key={h}
                    className={clsx(styles.pill, horizon === h && styles.pillActive)}
                    onClick={() => setHorizon(h)}>
                    {h} ans
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.compareBars}>
            <div className={styles.compareBar}>
              <div className={styles.compareBarMeta}>
                <span className={styles.compareBarName}>Livret A — 1,5 %</span>
                <span className={styles.compareBarValue}>{formatCurrency(result.livret)}</span>
              </div>
              <div className={styles.compareBarTrack}>
                <div className={styles.compareBarFillLow}
                  style={{ width: `${(result.livret / result.booster) * 100}%` }} />
              </div>
            </div>
            <div className={styles.compareBar}>
              <div className={styles.compareBarMeta}>
                <span className={styles.compareBarName}>Rendement boosté — 5 %</span>
                <span className={clsx(styles.compareBarValue, styles.compareBarValueHigh)}>
                  {formatCurrency(result.booster)}
                </span>
              </div>
              <div className={styles.compareBarTrack}>
                <div className={styles.compareBarFillHigh} style={{ width: '100%' }} />
              </div>
            </div>
            <div className={styles.compareDiff}>
              <TrendingUp size={14} />
              +{formatCurrency(result.diff)} de plus avec Booster sur {horizon} ans
            </div>
            <p className={styles.compareNote}>
              <Info size={11} />
              Simulation indicative à 1,5 % et 5 % brut/an. Ne constitue pas un conseil en investissement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Choisir mon projet ──────────────────────────────────── */
const PROJECT_TABS = [
  { id: 'epargner',   label: 'Épargner et fructifier' },
  { id: 'immobilier', label: 'Projet immobilier' },
  { id: 'personnel',  label: 'Projet personnel' },
  { id: 'retraite',   label: 'Préparer sa retraite' },
];

function ProjectTabs({ onCTAClick }) {
  const [active, setActive] = useState('epargner');

  return (
    <section className={styles.projectSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Badge variant="accent">Choisir mon projet</Badge>
          <h2 className={styles.sectionTitle}>
            Quel est ton{' '}
            <span className="gradient-text">objectif financier ?</span>
          </h2>
          <p className={styles.sectionDesc}>
            Chaque projet mérite une stratégie adaptée. Explore les différents usages
            de l'assurance vie luxembourgeoise et simule ton futur capital.
          </p>
        </div>

        <div className={styles.tabs} role="tablist">
          {PROJECT_TABS.map(({ id, label }) => (
            <button key={id} role="tab" aria-selected={active === id}
              className={clsx(styles.tab, active === id && styles.tabActive)}
              onClick={() => setActive(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent} key={active}>
          {active === 'epargner'   && <TabEpargner />}
          {active === 'immobilier' && <TabImmobilier />}
          {active === 'personnel'  && <TabPersonnel />}
          {active === 'retraite'   && <TabRetraite />}
        </div>

        <div className={styles.projectCta}>
          <p className={styles.projectCtaText}>
            Un conseiller analyse votre situation gratuitement et vous propose
            la stratégie la plus adaptée à votre projet.
          </p>
          <Button variant="accent" size="lg" onClick={onCTAClick}>
            <CheckCircle size={18} />
            Créer mon compte
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ONGLETS
   ══════════════════════════════════════════════════════════ */

/* ── 1. Épargner et fructifier ────────────────────────────── */
const STEPS_EPARGNER = [
  { number: '01', title: 'Versez régulièrement (méthode DCA)',
    desc: "Investir un montant fixe chaque mois réduit l'impact des fluctuations de marché. Pas besoin de surveiller les cours." },
  { number: '02', title: 'Laissez les intérêts composer',
    desc: "À 5 % net par an, votre capital double en ~14 ans. Chaque année supplémentaire compte exponentiellement." },
  { number: '03', title: 'Adaptez le risque à votre horizon',
    desc: 'Court terme → fonds euros sécurisé. Long terme → unités de compte orientées croissance mondiale.' },
];

function TabEpargner() {
  const [monthly, setMonthly] = useState(100);
  const result = useMemo(() => {
    const now    = computeFutureValue(monthly, RATE_BOOSTER, 30 * 12);
    const delay5 = computeFutureValue(monthly, RATE_BOOSTER, 25 * 12);
    return { now, delay5, loss: now - delay5 };
  }, [monthly]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Badge variant="primary">Stratégie</Badge>
        <h3 className={styles.panelTitle}>Faites travailler votre argent, même à petit budget</h3>
        <p className={styles.panelDesc}>
          100 € par mois placés à 25 ans valent plus du double qu'à 35 ans.
          Le temps est votre meilleur allié.
        </p>
      </div>
      <div className={styles.panelBody}>
        <div className={styles.steps}>
          {STEPS_EPARGNER.map((step, i) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNum}>{step.number}</div>
              {i < STEPS_EPARGNER.length - 1 && <div className={styles.stepLine} />}
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <SimCard title="L'effet du temps sur votre capital">
          <div className={styles.simControls}>
            <SliderGroup label="Versement mensuel" value={formatCurrency(monthly)}>
              <input type="range" min={50} max={1000} step={50} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
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
            <div className={styles.simDiff}>-{formatCurrency(result.loss)} perdus en attendant 5 ans</div>
            <p className={styles.simNote}>Simulation sur 30 ans à {(RATE_BOOSTER * 100).toFixed(0)} % annuel.</p>
          </div>
        </SimCard>
      </div>
    </div>
  );
}

/* ── 2. Projet immobilier ─────────────────────────────────── */
const IMMO_TIMELINE = [
  { step: '01', title: "Définir son projet",                   detail: "Budget, localisation, surface, critères essentiels.",                                  tag: "Mois 1" },
  { step: '02', title: "Constituer l'apport",                  detail: "Votre assurance vie Booster fait travailler votre épargne pendant cette phase.",         tag: "Mois 1 → 18+" },
  { step: '03', title: "Recherche active du bien",             detail: "Visites, comparaisons, négociation du prix.",                                           tag: "Mois 12 → 24" },
  { step: '04', title: "Offre d'achat acceptée",               detail: "Lettre d'intention formelle au vendeur.",                                               tag: "Mois 20" },
  { step: '05', title: "Compromis de vente",                   detail: "Signature chez le notaire, dépôt de séquestre (5–10 %).",                               tag: "Mois 21" },
  { step: '06', title: "Dossier de financement",               detail: "Comparaison des offres bancaires, assurance emprunteur.",                                tag: "Mois 22–24" },
  { step: '07', title: "Acte définitif + remise des clés",     detail: "Signature notariale, virement du financement — vous êtes propriétaire.",                 tag: "Mois 28" },
];

const IMMO_POINTS = [
  "Rachat partiel possible à tout moment — vous restez maître de votre timing d'achat",
  "Profil équilibré recommandé pour un horizon 3-7 ans",
  "Accès aux SCPI : rendement immobilier (4-6 % brut/an) sans contrainte de gestion locative",
  "0 % de frais d'entrée — chaque euro épargné travaille entièrement pour votre apport",
];

function TabImmobilier() {
  const [target, setTarget]   = useState(30000);
  const [monthly, setMonthly] = useState(300);

  const result = useMemo(() => {
    const months     = computeMonthsToGoal(target, monthly, RATE_BOOSTER);
    const years      = Math.floor(months / 12);
    const remMonths  = months % 12;
    const livretMths = computeMonthsToGoal(target, monthly, RATE_LIVRET_A);
    return { years, remMonths, gainMths: livretMths - months };
  }, [target, monthly]);

  const durationStr = [
    result.years > 0 ? `${result.years} an${result.years > 1 ? 's' : ''}` : '',
    result.remMonths > 0 ? `${result.remMonths} mois` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Badge variant="primary">Projet immobilier</Badge>
        <h3 className={styles.panelTitle}>Constituez votre apport autrement</h3>
        <p className={styles.panelDesc}>
          Vous visez un achat immobilier dans 3 à 7 ans ? L'assurance vie est l'outil
          idéal pour faire fructifier votre futur apport tout en restant disponible.
        </p>
      </div>
      <div className={styles.panelBody}>
        <ul className={styles.checkList}>
          {IMMO_POINTS.map((p) => (
            <li key={p} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} /><span>{p}</span>
            </li>
          ))}
        </ul>

        <div className={styles.timeline}>
          <p className={styles.timelineHeading}>Timeline d'un achat immobilier</p>
          {IMMO_TIMELINE.map((item, i) => (
            <div key={item.step} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={styles.timelineDot} />
                {i < IMMO_TIMELINE.length - 1 && <div className={styles.timelineConnector} />}
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineTop}>
                  <strong className={styles.timelineItemTitle}>{item.title}</strong>
                  <span className={styles.timelineTag}>{item.tag}</span>
                </div>
                <p className={styles.timelineDetail}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <SimCard title="Quand aurai-je mon apport ?">
          <div className={styles.simControls}>
            <SliderGroup label="Apport visé" value={formatCurrency(target)}>
              <input type="range" min={10000} max={100000} step={5000} value={target}
                onChange={(e) => setTarget(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Versement mensuel" value={formatCurrency(monthly)}>
              <input type="range" min={100} max={2000} step={50} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
          </div>
          <div className={styles.simResult}>
            <div className={styles.simResultMain}>
              <span className={styles.simResultLabel}>Apport constitué en</span>
              <span className={styles.simResultValue}>{durationStr}</span>
              <span className={styles.simResultSub}>avec Booster à {(RATE_BOOSTER * 100).toFixed(0)} %</span>
            </div>
            {result.gainMths > 0 && (
              <div className={styles.simDiff}>{result.gainMths} mois de moins qu'avec un Livret A</div>
            )}
          </div>
        </SimCard>
      </div>
    </div>
  );
}

/* ── 3. Projet personnel ──────────────────────────────────── */
const PERSONAL_PROJECTS = [
  { emoji: '💍', label: 'Mariage',               horizon: '2-3 ans' },
  { emoji: '✈️', label: 'Tour du monde',          horizon: '1-2 ans' },
  { emoji: '🎓', label: "Études à l'étranger",    horizon: '2-4 ans' },
  { emoji: '🚀', label: 'Créer son entreprise',   horizon: '3-5 ans' },
  { emoji: '🏠', label: 'Résidence principale',   horizon: '5-7 ans' },
  { emoji: '🚗', label: 'Véhicule / Équipement',  horizon: '1-3 ans' },
];
const PERSONAL_POINTS = [
  "Flexibilité totale : rachetez tout ou partie quand vous en avez besoin",
  "Profil personnalisé selon votre horizon et votre tolérance au risque",
  "Pas de pénalité de sortie anticipée",
];
const HORIZONS_P = [1, 2, 3, 5, 7, 10];

function TabPersonnel() {
  const [target, setTarget]   = useState(10000);
  const [horizon, setHorizon] = useState(3);

  const result = useMemo(() => {
    const months         = horizon * 12;
    const required       = computeRequiredMonthly(target, RATE_BOOSTER, months);
    const requiredLivret = computeRequiredMonthly(target, RATE_LIVRET_A, months);
    return { required, saving: requiredLivret - required };
  }, [target, horizon]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Badge variant="primary">Flexibilité</Badge>
        <h3 className={styles.panelTitle}>Financez vos grandes étapes de vie</h3>
        <p className={styles.panelDesc}>
          Mariage, voyage, création d'entreprise, études à l'étranger...
          L'assurance vie s'adapte à tous vos horizons.
        </p>
      </div>
      <div className={styles.panelBody}>
        <div className={styles.projectGrid}>
          {PERSONAL_PROJECTS.map(({ emoji, label, horizon: h }) => (
            <div key={label} className={styles.projectCard}>
              <span className={styles.projectEmoji}>{emoji}</span>
              <span className={styles.projectLabel}>{label}</span>
              <span className={styles.projectHorizon}>{h}</span>
            </div>
          ))}
        </div>
        <ul className={styles.checkList}>
          {PERSONAL_POINTS.map((p) => (
            <li key={p} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} /><span>{p}</span>
            </li>
          ))}
        </ul>
        <SimCard title="Combien épargner par mois pour mon projet ?">
          <div className={styles.simControls}>
            <SliderGroup label="Montant du projet" value={formatCurrency(target)}>
              <input type="range" min={1000} max={50000} step={1000} value={target}
                onChange={(e) => setTarget(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <div className={styles.simSliderGroup}>
              <span className={styles.simSliderLabel}>Horizon</span>
              <div className={styles.pills}>
                {HORIZONS_P.map((h) => (
                  <button key={h}
                    className={clsx(styles.pill, horizon === h && styles.pillActive)}
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
              <span className={styles.simResultSub}>
                pour {formatCurrency(target)} en {horizon} an{horizon > 1 ? 's' : ''}
              </span>
            </div>
            {result.saving > 0.5 && (
              <div className={styles.simDiff}>
                {formatCurrency(result.saving)}/mois économisés vs Livret A
              </div>
            )}
          </div>
        </SimCard>
      </div>
    </div>
  );
}

/* ── 4. Préparer sa retraite ──────────────────────────────── */
const RETRAITE_POINTS = [
  "Assurance vie + PER (Plan Épargne Retraite) : deux enveloppes complémentaires",
  "PER : vos versements sont déductibles de votre revenu imposable",
  "Assurance vie : capital disponible avant la retraite si besoin",
  "Choix à la sortie : rente viagère, capital unique ou versements programmés",
  "Stratégie de désensibilisation progressive du risque à l'approche de la retraite",
];

function TabRetraite() {
  const [age, setAge]         = useState(25);
  const [salary, setSalary]   = useState(2500);
  const [monthly, setMonthly] = useState(100);

  const result = useMemo(() => {
    const monthsNow    = Math.max(0, (65 - age) * 12);
    const monthsLater  = Math.max(0, (65 - (age + 10)) * 12);
    const capitalNow   = computeFutureValue(monthly, RATE_BOOSTER, monthsNow);
    const capitalLater = computeFutureValue(monthly, RATE_BOOSTER, monthsLater);
    const pension      = Math.round(salary * 0.50);
    const gap          = salary - pension;
    return {
      capitalNow, capitalLater, capitalLoss: capitalNow - capitalLater,
      pension, gap,
      capitalNeeded: gap * 12 * 20,
      replacementRate: Math.round((pension / salary) * 100),
    };
  }, [age, salary, monthly]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <Badge variant="primary">Long terme</Badge>
        <h3 className={styles.panelTitle}>La retraite, ça se prépare maintenant</h3>
        <p className={styles.panelDesc}>
          Le système par répartition ne suffira pas. Préparer sa retraite à 25 ans,
          c'est se donner 40 ans pour laisser les intérêts composés faire le travail.
        </p>
      </div>
      <div className={styles.panelBody}>
        <ul className={styles.checkList}>
          {RETRAITE_POINTS.map((p) => (
            <li key={p} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} /><span>{p}</span>
            </li>
          ))}
        </ul>

        <SimCard title="Simulateur taux de remplacement">
          <div className={styles.simControls}>
            <SliderGroup label="Salaire net mensuel actuel" value={formatCurrency(salary)}>
              <input type="range" min={1000} max={8000} step={100} value={salary}
                onChange={(e) => setSalary(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
          </div>
          <div className={styles.simResult}>
            <div className={styles.retirementGrid}>
              <div className={styles.retirementStat}>
                <span className={styles.retirementVal}>{result.replacementRate} %</span>
                <span className={styles.retirementStatLabel}>Taux de remplacement estimé</span>
              </div>
              <div className={styles.retirementStat}>
                <span className={clsx(styles.retirementVal, styles.retirementNeg)}>
                  -{formatCurrency(result.gap)}/mois
                </span>
                <span className={styles.retirementStatLabel}>Manque à gagner mensuel</span>
              </div>
            </div>
            <div className={styles.simCompRow}>
              <span>Retraite estimée (50 % du salaire)</span>
              <span className={styles.simValueLow}>{formatCurrency(result.pension)}/mois</span>
            </div>
            <div className={styles.simCompRow}>
              <span>Capital à constituer (65 → 85 ans)</span>
              <span className={styles.simValueHigh}>{formatCurrency(result.capitalNeeded)}</span>
            </div>
            <p className={styles.simNote}>
              Estimation indicative basée sur un taux de remplacement moyen de 50 % au régime général.
            </p>
          </div>
        </SimCard>

        <SimCard title="Mon capital à 65 ans">
          <div className={styles.simControls}>
            <SliderGroup label="Mon âge actuel" value={`${age} ans`}>
              <input type="range" min={18} max={45} step={1} value={age}
                onChange={(e) => setAge(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Versement mensuel" value={formatCurrency(monthly)}>
              <input type="range" min={50} max={500} step={50} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
          </div>
          <div className={styles.simResult}>
            <div className={styles.simResultMain}>
              <span className={styles.simResultLabel}>Capital estimé à 65 ans</span>
              <span className={styles.simResultValue}>{formatCurrency(result.capitalNow)}</span>
              <span className={styles.simResultSub}>
                en commençant à {age} ans ({65 - age} ans d'épargne)
              </span>
            </div>
            {result.capitalLoss > 0 && (
              <>
                <div className={styles.simCompRow}>
                  <span>En commençant dans 10 ans</span>
                  <span className={styles.simValueLow}>{formatCurrency(result.capitalLater)}</span>
                </div>
                <div className={styles.simDiff}>
                  -{formatCurrency(result.capitalLoss)} perdus en attendant
                </div>
              </>
            )}
            <p className={styles.simNote}>
              Simulation à {(RATE_BOOSTER * 100).toFixed(0)} % annuel. Ne constitue pas un conseil.
            </p>
          </div>
        </SimCard>
      </div>
    </div>
  );
}

/* ─── Composants utilitaires partagés ────────────────────── */
function SimCard({ title, children }) {
  return (
    <div className={styles.simCard}>
      <div className={styles.simHeader}>
        <TrendingUp size={14} />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function SliderGroup({ label, value, children }) {
  return (
    <div className={styles.simSliderGroup}>
      <div className={styles.simSliderRow}>
        <label>{label}</label>
        <span className={styles.simSliderVal}>{value}</span>
      </div>
      {children}
    </div>
  );
}
