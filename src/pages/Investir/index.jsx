import { useState, useMemo } from 'react';
import { CheckCircle, TrendingUp, Info, ArrowRight, Landmark, BarChart2, Percent, Shield, Rocket } from 'lucide-react';
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

/* Taux utilisés uniquement à des fins d'illustration dans les simulateurs.
   5 % est le rendement moyen cible du portefeuille Booster — non garanti.
   1,5 % est le taux réglementé du Livret A en vigueur au 1er février 2025. */
const RATE_BOOSTER  = 0.05;
const RATE_LIVRET_A = 0.015;

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
const RISK_PROFILES = [
  {
    label: 'Profil Sécuritaire',
    emoji: '🛡️',
    allocation: '100 % Fonds Euro',
    desc: "Ton capital est garanti à 100 %, il ne peut pas baisser. Tu gagnes un peu moins, mais tu dors sur tes deux oreilles.",
    barEuro: 100,
    barUC: 0,
  },
  {
    label: 'Profil Équilibré',
    emoji: '⚖️',
    allocation: '70 % Fonds Euro / 30 % Actions & ETF',
    desc: "Une base solide qui ne bouge pas, boostée par une dose de marchés financiers pour aller chercher plus de performance.",
    barEuro: 70,
    barUC: 30,
  },
  {
    label: 'Profil Dynamique',
    emoji: '🚀',
    allocation: '30 % Fonds Euro / 70 % Actions & ETF',
    desc: "Le temps est ton meilleur allié. Ton capital fluctue, mais tu maximises tes chances de forte croissance sur le long terme.",
    barEuro: 30,
    barUC: 70,
  },
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
        <Badge variant="primary">Épargner et fructifier</Badge>
        <h3 className={styles.panelTitle}>Fais travailler ton argent 🚀</h3>
        <p className={styles.panelDesc}>
          Laisser 1 000 € sur un compte courant pendant tes études, c'est accepter que ton pouvoir
          d'achat diminue à cause de l'inflation. Ton argent doit devenir un moteur, pas un poids mort.
        </p>
      </div>
      <div className={styles.panelBody}>

        {/* Règle des 3 ans */}
        <div className={styles.ruleCard}>
          <div className={styles.ruleCardHead}>
            <span className={styles.ruleCardEmoji}>⏳</span>
            <h4 className={styles.ruleCardTitle}>La règle des 3 ans</h4>
          </div>
          <p className={styles.ruleCardText}>
            Pour qu'un placement soit efficace, il lui faut de l'oxygène. L'horizon idéal ?
            Minimum 3 ans pour lisser les variations des marchés financiers. Si tu commences
            en première année, ton épargne arrive à maturité pile pour ton diplôme. Tu pourras
            alors financer ta vie active (caution d'appartement, première voiture) ou laisser
            la magie des intérêts composés continuer d'opérer.
          </p>
        </div>

        {/* Profils de risque */}
        <div>
          <p className={styles.profilesLabel}>Choisis ton camp — Les profils de risque</p>
          <div className={styles.profiles}>
            {RISK_PROFILES.map(({ label, emoji, allocation, desc, barEuro, barUC }) => (
              <div key={label} className={styles.profileCard}>
                <div className={styles.profileHead}>
                  <span className={styles.profileEmoji}>{emoji}</span>
                  <span className={styles.profileLabel}>{label}</span>
                </div>
                <span className={styles.profileAllocation}>{allocation}</span>
                <div className={styles.profileBar}>
                  {barEuro > 0 && (
                    <div className={styles.profileBarEuro} style={{ width: `${barEuro}%` }} title={`Fonds Euro ${barEuro}%`} />
                  )}
                  {barUC > 0 && (
                    <div className={styles.profileBarUC} style={{ width: `${barUC}%` }} title={`Actions & ETF ${barUC}%`} />
                  )}
                </div>
                <p className={styles.profileDesc}>{desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.profileLegend}>
            <span><span className={styles.legendDotEuro} />Fonds Euro</span>
            <span><span className={styles.legendDotUC} />Actions & ETF</span>
          </div>
        </div>

        {/* Simulateur */}
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
  { title: "L'offre d'achat",                          detail: "Tu as trouvé la perle ! Tu fais une proposition de prix. Si elle est acceptée, le bien t'est réservé." },
  { title: "Le compromis de vente",                    detail: "Signature chez le notaire. Un dépôt de garantie (le séquestre) te sera demandé : c'est une avance sur les frais de notaire pour prouver ton sérieux." },
  { title: "La recherche de financement",              detail: "Tu as en général 3 mois pour obtenir ton crédit. La banque étudiera ton comportement financier (salaires, absence d'agios, gestion du découvert pour voir si tu sais épargner). Ton taux d'effort (crédit + assurance) ne doit pas dépasser 35 % de tes revenus." },
  { title: "L'assurance emprunteur",                   detail: "Obligatoire (Décès, Invalidité, PTIA). Tu devras remplir un questionnaire de santé. Anticipe ! Les analyses médicales peuvent prendre plus d'un mois. Sans assurance, pas de prêt." },
  { title: "L'Apport, la Caution et l'épargne résiduelle", detail: "Ton apport paye les frais annexes. Ton dossier doit être validé par une société de caution. Si ton apport est trop faible ou si tu ne gardes pas assez d'épargne après l'achat pour les imprévus, elle refusera. Sans caution l'hypothèque étant souvent refusée, la banque ne prête pas." },
  { title: "Offre de prêt & 11 jours",                 detail: "Tu signes le récépissé de l'offre. Tu as 11 jours de réflexion obligatoires avant de renvoyer l'offre signée. Conseil : les frais de dossier et de garantie sont prélevés à ce moment, alimente bien ton compte pour éviter un impayé !" },
  { title: "La signature définitive",                  detail: "Le grand jour chez le notaire. On te remet les clés. Tu es propriétaire ! 🎉" },
];

const IMMO_PROFILES = [
  {
    title: 'Sécuritaire',
    subtitle: '< 3 ans',
    icon: Shield,
    back: "Achat prévu d'ici 3 ans : On sécurise à 100 % sur le Fonds Euro pour ne prendre aucun risque sur ton apport.",
  },
  {
    title: 'Équilibré',
    subtitle: '3 à 5 ans',
    icon: BarChart2,
    back: "Achat prévu entre 3 et 5 ans : Un mix prudent pour dynamiser un peu l'épargne tout en limitant les risques de perte à l'approche de la date.",
  },
  {
    title: 'Dynamique',
    subtitle: '> 5 ans',
    icon: Rocket,
    back: "Achat lointain : On va chercher du rendement sur les marchés financiers pour faire grossir ton apport plus vite, en profitant du temps devant nous.",
  },
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
        <h3 className={styles.panelTitle}>Prépare ton futur chez-toi 🏠</h3>
        <p className={styles.panelDesc}>
          Acheter ton premier appart' te semble lointain ? Détrompe-toi ! La clé,
          c'est l'anticipation. Découvre les coulisses d'un achat et bâtis l'apport
          qui convaincra les banques.
        </p>
      </div>
      <div className={styles.panelBody}>

        {/* Timeline */}
        <div className={styles.timeline}>
          <p className={styles.timelineHeading}>La Timeline d'un achat réussi 🔑</p>
          {IMMO_TIMELINE.map((item, i) => (
            <div key={item.title} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={styles.timelineNum}>{i + 1}</div>
                {i < IMMO_TIMELINE.length - 1 && <div className={styles.timelineConnector} />}
              </div>
              <div className={styles.timelineContent}>
                <strong className={styles.timelineItemTitle}>{item.title}</strong>
                <p className={styles.timelineDetail}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profils de risque */}
        <div>
          <p className={styles.profilesLabel}>Choisis ton camp (Profils de Risque)</p>
          <div className={styles.immoProfiles}>
            {IMMO_PROFILES.map(({ title, subtitle, icon: Icon, back }) => (
              <div key={title} className={styles.immoProfileCard}>
                <div className={styles.immoProfileHead}>
                  <Icon size={20} className={styles.immoProfileIcon} />
                  <span className={styles.immoProfileLabel}>{title}</span>
                </div>
                <span className={styles.immoProfileSub}>{subtitle}</span>
                <p className={styles.immoProfileDesc}>{back}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simulateur */}
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

/* Taux de remplacement moyens estimés par le COR (Conseil d'Orientation des Retraites).
   Les TNS sont particulièrement pénalisés par la réforme de 2023. */
const REPLACEMENT_RATES = [
  { statut: 'Fonctionnaire',                rate: 0.75 },
  { statut: 'Cadre',                        rate: 0.65 },
  { statut: 'Salarié',                      rate: 0.55 },
  { statut: 'TNS (Travailleur Non Salarié)', rate: 0.25 },
];

function TabRetraite() {
  const [salary, setSalary]         = useState(2000);
  const [age, setAge]               = useState(25);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthly, setMonthly]       = useState(100);
  const [rate, setRate]             = useState(5);

  const capital = useMemo(() => {
    /* Math.max(0, …) évite les mois négatifs si l'âge actuel dépasse l'âge de retraite */
    const months = Math.max(0, (retirementAge - age) * 12);
    return computeFutureValue(monthly, rate / 100, months);
  }, [age, retirementAge, monthly, rate]);

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

        {/* Simulateur taux de remplacement */}
        <SimCard title="Simulateur taux de remplacement">
          <SliderGroup label="Salaire net mensuel de référence" value={formatCurrency(salary)}>
            <input type="range" min={500} max={8000} step={100} value={salary}
              onChange={(e) => setSalary(Number(e.target.value))} className={styles.simSlider} />
          </SliderGroup>
          <div className={styles.rateTable}>
            <div className={styles.rateTableHead}>
              <span>Statut</span>
              <span>Taux</span>
              <span>Rente estimée</span>
              <span>Manque / mois</span>
            </div>
            {REPLACEMENT_RATES.map(({ statut, rate: r }) => {
              const pension = Math.round(salary * r);
              const gap     = salary - pension;
              return (
                <div key={statut} className={styles.rateTableRow}>
                  <span className={styles.rateTableStatut}>{statut}</span>
                  <span className={styles.rateTableRate}>{Math.round(r * 100)} %</span>
                  <span className={styles.rateTablePension}>{formatCurrency(pension)}</span>
                  <span className={clsx(styles.rateTableGap, gap > 0 && styles.rateTableGapNeg)}>
                    -{formatCurrency(gap)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className={styles.simNote}>
            Estimation indicative. Les taux réels varient selon la carrière et le régime.
          </p>
        </SimCard>

        {/* Simulateur capital retraite */}
        <SimCard title="Mon capital à la retraite">
          <div className={styles.simControls}>
            <SliderGroup label="Mon âge actuel" value={`${age} ans`}>
              <input type="range" min={18} max={60} step={1} value={age}
                onChange={(e) => setAge(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Âge de retraite souhaité" value={`${retirementAge} ans`}>
              <input type="range" min={55} max={70} step={1} value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Capacité d'épargne mensuelle" value={formatCurrency(monthly)}>
              <input type="range" min={50} max={2000} step={50} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Taux de rentabilité souhaité" value={`${rate} %`}>
              <input type="range" min={1} max={10} step={0.5} value={rate}
                onChange={(e) => setRate(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
          </div>
          <div className={styles.simResult}>
            <div className={styles.simResultMain}>
              <span className={styles.simResultLabel}>
                Capital estimé à {retirementAge} ans
              </span>
              <span className={styles.simResultValue}>{formatCurrency(capital)}</span>
              <span className={styles.simResultSub}>
                {retirementAge - age} ans d'épargne · {formatCurrency(monthly)}/mois · {rate} %/an
              </span>
            </div>
            <p className={styles.simNote}>
              Formule : versement × ((1 + taux/12)^(durée×12) − 1) / (taux/12).
              Ne constitue pas un conseil en investissement.
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
