import { useState, useMemo } from 'react';
import {
  CheckCircle, TrendingUp, Info, ArrowRight, Landmark, BarChart2, Percent, Shield, Rocket,
  Calendar, Lock, RotateCw, Wallet, Banknote, Sparkles, Clock, Hourglass, PiggyBank,
} from 'lucide-react';
import clsx from 'clsx';
import Modal from '../../components/ui/Modal/Modal';
import AuthForm from '../../components/sections/AuthForm/AuthForm';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { computeFutureValue, computeRequiredMonthly, computeMonthsToGoal } from '../../utils/calculators';
import { formatCurrency } from '../../utils/formatters';
import styles from './Investir.module.css';

/* Taux utilisés uniquement à des fins d'illustration dans les simulateurs.
   5 % est le rendement moyen cible du portefeuille Booster — non garanti.
   1,5 % est le taux réglementé du Livret A en vigueur au 1er février 2025. */
const RATE_BOOSTER  = 0.05;
const RATE_LIVRET_A = 0.015;

/* Lien de prise de RDV — dupliqué depuis BookingCTA pour rester indépendant.
   À centraliser dans une config si un troisième endroit apparaît. */
const HUBSPOT_CALENDAR_URL = 'https://meetings.hubspot.com/booster';

/* ─── Page principale ─────────────────────────────────────── */
export default function Investir() {
  const [authModal, setAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  /* Le CTA change de rôle selon l'état de connexion :
     - Visiteur → ouvre le modal d'inscription ("Créer mon compte")
     - Connecté → ouvre HubSpot dans un nouvel onglet ("Prendre RDV") */
  const handleCTA = () => {
    if (isAuthenticated) {
      window.open(HUBSPOT_CALENDAR_URL, '_blank', 'noopener,noreferrer');
    } else {
      setAuthModal(true);
    }
  };

  const ctaLabel = isAuthenticated ? 'Prendre RDV' : 'Créer mon compte';

  return (
    <div className={styles.page}>
      <HeroAV onCTAClick={handleCTA} ctaLabel={ctaLabel} />
      <CompareSimulator />
      <ProjectTabs onCTAClick={handleCTA} ctaLabel={ctaLabel} />
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

function HeroAV({ onCTAClick, ctaLabel }) {
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
            {ctaLabel}
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
  /* Rentabilité souhaitée — slider 0 à 30 %/an, demandé dans le brief client */
  const [rate, setRate]       = useState(5);

  const result = useMemo(() => {
    const months   = horizon * 12;
    const targeted = computeFutureValue(monthly, rate / 100, months);
    const livret   = computeFutureValue(monthly, RATE_LIVRET_A, months);
    return { targeted, livret, diff: targeted - livret };
  }, [monthly, horizon, rate]);

  /* On normalise la barre Livret A par rapport au max des deux résultats pour
     éviter une largeur > 100 % quand la rentabilité descend sous le Livret A. */
  const maxVal      = Math.max(result.targeted, result.livret) || 1;
  const livretRatio = (result.livret / maxVal) * 100;
  const targetRatio = (result.targeted / maxVal) * 100;

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
            Choisis la rentabilité que tu vises et compare-la au Livret A.
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
              <div className={styles.sliderRow}>
                <label>Rentabilité souhaitée</label>
                <span className={styles.sliderVal}>{rate.toFixed(1)} %/an</span>
              </div>
              <input type="range" min={0} max={30} step={0.5} value={rate}
                onChange={(e) => setRate(Number(e.target.value))} className={styles.slider} />
            </div>
            <div className={styles.sliderGroup}>
              <label>Durée</label>
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
                <div className={styles.compareBarFillLow} style={{ width: `${livretRatio}%` }} />
              </div>
            </div>
            <div className={styles.compareBar}>
              <div className={styles.compareBarMeta}>
                <span className={styles.compareBarName}>Rentabilité visée — {rate.toFixed(1)} %</span>
                <span className={clsx(styles.compareBarValue, styles.compareBarValueHigh)}>
                  {formatCurrency(result.targeted)}
                </span>
              </div>
              <div className={styles.compareBarTrack}>
                <div className={styles.compareBarFillHigh} style={{ width: `${targetRatio}%` }} />
              </div>
            </div>
            {result.diff > 0 && (
              <div className={styles.compareDiff}>
                <TrendingUp size={14} />
                +{formatCurrency(result.diff)} de plus que le Livret A sur {horizon} ans
              </div>
            )}
            <p className={styles.compareNote}>
              <Info size={11} />
              Simulation indicative à 1,5 % et {rate.toFixed(1)} % brut/an. Ne constitue pas un conseil en investissement.
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

function ProjectTabs({ onCTAClick, ctaLabel }) {
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
            {ctaLabel}
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
/* Profils de risque affichés en flip-cards indépendantes.
   Recto = présentation courte, verso = allocation détaillée + description. */
const RISK_PROFILES = [
  {
    id: 'securitaire',
    icon: Shield,
    label: 'Profil Sécuritaire',
    allocation: '100 % Fonds Euro',
    detail: "Ton capital est garanti à 100 %, il ne peut pas baisser. Tu gagnes un peu moins, mais tu dors sur tes deux oreilles.",
  },
  {
    id: 'equilibre',
    icon: BarChart2,
    label: 'Profil Équilibré',
    allocation: '70 % Fonds Euro / 30 % Actions & ETF',
    detail: "Une base solide qui ne bouge pas, boostée par une dose de marchés financiers pour aller chercher plus de performance.",
  },
  {
    id: 'dynamique',
    icon: Rocket,
    label: 'Profil Dynamique',
    allocation: '30 % Fonds Euro / 70 % Actions & ETF',
    detail: "Le temps est ton meilleur allié. Ton capital fluctue, mais tu maximises tes chances de forte croissance sur le long terme.",
  },
];

/* Détermine le profil selon le rendement souhaité — règle produit :
   1-5 % : Sécuritaire · 5-10 % : Équilibré · 10 %+ : Dynamique. */
function profileForRate(rate) {
  if (rate < 5)  return { key: 'securitaire', label: 'Sécuritaire', color: 'securitaire' };
  if (rate < 10) return { key: 'equilibre',   label: 'Équilibré',   color: 'equilibre' };
  return             { key: 'dynamique',   label: 'Dynamique',   color: 'dynamique' };
}

function TabEpargner() {
  const [flipped, setFlipped] = useState({}); // { profileId: true }
  const toggleFlip = (id) => setFlipped((f) => ({ ...f, [id]: !f[id] }));

  /* Simulateur profil de risque */
  const [capital, setCapital]   = useState(2000);
  const [monthly, setMonthly]   = useState(150);
  const [rate, setRate]         = useState(7);
  const detectedProfile = profileForRate(rate);

  /* Projection à 10 ans pour donner un ordre de grandeur — pas un conseil.
     Formule capitalisation + versements : C₀·(1+t)^n + m·((1+t/12)^(n·12)−1)/(t/12). */
  const projection = useMemo(() => {
    const years = 10;
    const monthlyValue = computeFutureValue(monthly, rate / 100, years * 12);
    const capitalValue = capital * Math.pow(1 + rate / 100, years);
    return Math.round(capitalValue + monthlyValue);
  }, [capital, monthly, rate]);

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

        {/* Profils de risque en flip-cards */}
        <div>
          <p className={styles.profilesLabel}>Choisis ton camp — Les profils de risque</p>
          <div className={styles.flipGrid}>
            {RISK_PROFILES.map(({ id, icon: Icon, label, allocation, detail }) => {
              const isFlipped = !!flipped[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFlip(id)}
                  aria-pressed={isFlipped}
                  className={styles.flipCardScene}
                >
                  <div className={clsx(styles.flipCardInner, isFlipped && styles.flipped)}>
                    <div className={clsx(styles.flipCardFace, styles.flipCardFront)}>
                      <Icon size={28} className={styles.flipCardIcon} />
                      <span className={styles.flipCardTitle}>{label}</span>
                      <span className={styles.flipCardHint}>
                        <RotateCw size={12} /> Cliquer pour retourner
                      </span>
                    </div>
                    <div className={clsx(styles.flipCardFace, styles.flipCardBack)}>
                      <span className={styles.flipCardAllocation}>{allocation}</span>
                      <p className={styles.flipCardDetail}>{detail}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulateur de profil de risque */}
        <SimCard title="Simulateur de profil de risque">
          <div className={styles.simControls}>
            <SliderGroup label="Capital initialement investi" value={formatCurrency(capital)}>
              <input type="range" min={0} max={50000} step={500} value={capital}
                onChange={(e) => setCapital(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Versement mensuel souhaité" value={formatCurrency(monthly)}>
              <input type="range" min={0} max={2000} step={50} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
            <SliderGroup label="Rendement souhaité" value={`${rate.toFixed(1)} %/an`}>
              <input type="range" min={0} max={30} step={0.5} value={rate}
                onChange={(e) => setRate(Number(e.target.value))} className={styles.simSlider} />
            </SliderGroup>
          </div>
          <div className={styles.profileResult}>
            <div className={styles.profileResultMain}>
              <span className={styles.profileResultLabel}>Ton profil détecté</span>
              <span className={clsx(styles.profileResultValue, styles[`profile_${detectedProfile.color}`])}>
                {detectedProfile.label}
              </span>
            </div>
            <div className={styles.profileResultProjection}>
              <span className={styles.profileResultLabel}>Projection à 10 ans</span>
              <span className={styles.profileResultProjectionValue}>{formatCurrency(projection)}</span>
            </div>
          </div>
          <p className={styles.simNote}>
            <Info size={11} />
            Simulation indicative — 1-5 % : Sécuritaire · 5-10 % : Équilibré · 10 %+ : Dynamique. Ne constitue pas un conseil en investissement.
          </p>
        </SimCard>

        <InlineBookingCTA />
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

        {/* La Stratégie Booster — 3 leviers propres à l'immobilier via l'AV */}
        <div className={styles.strategyCard}>
          <div className={styles.strategyHead}>
            <span className={styles.strategyEmoji}>🇮🇹</span>
            <h4 className={styles.strategyTitle}>La Stratégie Booster</h4>
          </div>
          <ul className={styles.strategyList}>
            <li className={styles.strategyItem}>
              <CheckCircle size={18} className={styles.strategyCheck} />
              <div>
                <p className={styles.strategyItemTitle}>Apport progressif</p>
                <p className={styles.strategyItemText}>
                  On automatise ton épargne mensuelle pour lisser l'effort et arriver prêt le jour J face au banquier.
                </p>
              </div>
            </li>
            <li className={styles.strategyItem}>
              <CheckCircle size={18} className={styles.strategyCheck} />
              <div>
                <p className={styles.strategyItemTitle}>Argent disponible pour le séquestre</p>
                <p className={styles.strategyItemText}>
                  L'enveloppe reste liquide. Tu as besoin de virer tes fonds pour le notaire ? C'est disponible à tout moment.
                </p>
              </div>
            </li>
            <li className={styles.strategyItem}>
              <CheckCircle size={18} className={styles.strategyCheck} />
              <div>
                <p className={styles.strategyItemTitle}>Fiscalité optimisée</p>
                <p className={styles.strategyItemText}>
                  Tu ne touches que l'apport dont tu as besoin. Le reste continue de profiter du cadre fiscal
                  avantageux de l'assurance-vie pour la suite de tes projets.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <InlineBookingCTA />
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

        <InlineBookingCTA />
      </div>
    </div>
  );
}

/* ── 4. Préparer sa retraite ──────────────────────────────── */
const RETRAITE_PILLARS = [
  {
    icon: Sparkles,
    title: "L'âge — le point de départ",
    body: "Plus tôt tu commences, plus l'effort d'épargne est doux. Commencer à 25, 35 ou 45 ans ne demande pas du tout la même implication financière. Le temps est ton meilleur allié pour lisser l'effort.",
  },
  {
    icon: Hourglass,
    title: 'Le temps — le pouvoir de la durée',
    body: "Grâce au mécanisme des intérêts composés, l'argent que tu mets de côté travaille pour toi au fil des années. Plus la période de capitalisation est longue, plus le rendement potentiel est important sans forcer ton budget mensuel.",
  },
  {
    icon: PiggyBank,
    title: "La capacité d'épargne — la régularité",
    body: "Il ne s'agit pas de te priver aujourd'hui, mais d'apprendre à mettre de côté une fraction, même modeste, de tes revenus de manière régulière. C'est la constance qui fait la différence, pas les gros montants occasionnels.",
  },
];

const RETRAITE_SOLUTIONS = [
  {
    icon: Wallet,
    title: 'Se constituer un capital à ton rythme',
    body: "Des solutions d'épargne souples te permettent de verser mensuellement ce que tu veux, quand tu veux — sans engagement de durée ni pénalité de sortie anticipée.",
  },
  {
    icon: Banknote,
    title: 'Défiscaliser tout en préparant ton avenir',
    body: "Des dispositifs performants (comme le PER) te permettent de réduire ton impôt aujourd'hui en préparant ta retraite. Chaque euro placé travaille deux fois : pour ton avenir et contre ta fiscalité actuelle.",
  },
];


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

        {/* Bloc pédagogique — Anticiper sa retraite */}
        <div className={styles.pedagoBlock}>
          <div className={styles.pedagoHeader}>
            <Badge variant="accent">Éducatif</Badge>
            <h4 className={styles.pedagoTitle}>
              Anticiper sa retraite :{' '}
              <span className="gradient-text">pourquoi il ne faut jamais s'y prendre trop tard</span>
            </h4>
            <p className={styles.pedagoIntro}>
              On a tous tendance à repousser ce sujet à « plus tard ». Entre les projets du moment,
              les factures et le quotidien, la retraite semble souvent être une lointaine préoccupation.
              Pourtant, c'est l'un des investissements les plus cruciaux de ta vie.
            </p>
            <p className={styles.pedagoIntro}>
              Préparer sa retraite, ce n'est pas seulement penser à arrêter de travailler : c'est
              s'offrir la liberté de profiter de cette nouvelle étape sans contrainte financière,
              maintenir son niveau de vie et réaliser les projets qui te tiennent à cœur.
            </p>
          </div>

          <div className={styles.pedagoSection}>
            <h5 className={styles.pedagoSectionTitle}>
              Les 3 piliers incontournables pour réussir sa préparation
            </h5>
            <p className={styles.pedagoText}>
              Pour construire une retraite sereine, inutile d'attendre d'avoir des revenus astronomiques.
              Tout repose sur une équation simple, fondée sur trois piliers fondamentaux :
            </p>
            <div className={styles.pillars}>
              {RETRAITE_PILLARS.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className={styles.pillar}>
                  <div className={styles.pillarIcon}><Icon size={20} /></div>
                  <span className={styles.pillarNum}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={styles.pillarTitle}>{title}</p>
                  <p className={styles.pillarBody}>{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.pedagoSection}>
            <h5 className={styles.pedagoSectionTitle}>
              Des solutions concrètes, adaptées à chaque profil
            </h5>
            <p className={styles.pedagoText}>
              Parce que chaque parcours de vie est unique, il n'existe pas de stratégie unique, mais
              <em> ta </em>stratégie. Que tu sois en début de carrière avec une petite capacité d'épargne,
              ou au sommet de ton activité avec des revenus à optimiser, il existe des leviers adaptés :
            </p>
            <div className={styles.solutions}>
              {RETRAITE_SOLUTIONS.map(({ icon: Icon, title, body }) => (
                <div key={title} className={styles.solution}>
                  <div className={styles.solutionIcon}><Icon size={18} /></div>
                  <div>
                    <p className={styles.solutionTitle}>{title}</p>
                    <p className={styles.solutionBody}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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

        <InlineBookingCTA />
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

/* Bloc de prise de RDV compact — répété en bas de chaque onglet de projet.
   Réservé aux utilisateurs connectés (iframe HubSpot) ; les visiteurs voient
   un overlay les incitant à créer un compte, qui utilise l'event global
   `open-auth-modal` écouté par le Header. */
function InlineBookingCTA() {
  const { isAuthenticated } = useAuth();

  const openAuth = (tab = 'signup') =>
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab } }));

  return (
    <div className={styles.bookingBlock}>
      <div className={styles.bookingHeader}>
        <Badge variant="primary">
          <Calendar size={12} />
          Prise de RDV
        </Badge>
        <h4 className={styles.bookingTitle}>Prends rendez-vous avec un conseiller</h4>
        <p className={styles.bookingDesc}>
          30 minutes, sans engagement — pour valider ta stratégie et optimiser ton contrat.
        </p>
      </div>
      <div className={styles.bookingSlot}>
        {isAuthenticated ? (
          <iframe
            src={HUBSPOT_CALENDAR_URL}
            title="Prendre rendez-vous avec un conseiller Booster"
            className={styles.bookingIframe}
            loading="lazy"
          />
        ) : (
          <div className={styles.bookingLock}>
            <div className={styles.bookingLockIcon}><Lock size={22} /></div>
            <p className={styles.bookingLockTitle}>Crée ton compte pour réserver</p>
            <p className={styles.bookingLockDesc}>
              La prise de rendez-vous est réservée aux membres Booster.
              Crée ton compte gratuit en 30 secondes pour accéder à l'agenda.
            </p>
            <div className={styles.bookingLockActions}>
              <Button variant="primary" size="sm" onClick={() => openAuth('signup')}>
                Créer mon compte
              </Button>
              <Button variant="ghost" size="sm" onClick={() => openAuth('login')}>
                J'ai déjà un compte
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
