/* Page Académie - parcours d'apprentissage financier sur 52 semaines.
   Anciennement /exemple, promue en /academie après validation UX client.
   4 onglets :
   - Ma semaine en cours : dashboard quotidien avec déblocage jour par jour.
   - Programme 52 semaines : 4 phases dont 3 verrouillées selon la progression.
   - Bibliothèque : fiches mémoire acquises + documents pratiques.
   - Aide : principes clés et FAQ.
   Le state `completed` est remonté au parent pour être partagé entre onglets.

   ─── ALGORITHME DE DÉBLOCAGE ─────────────────────────────────
   Règle produit : le parcours est calé sur les JOURS RÉELS de la semaine.
   Lundi = module 1, mardi = module 2, … samedi = module 6 ; le dimanche est un
   jour de repos. Une inscription en cours de semaine ne démarre donc pas sur
   le champ : le parcours commence au lundi suivant, pour que « mardi »
   corresponde toujours au 2e module de la semaine.
   Concrètement :
     - `profiles.academy_start_date` contient ce lundi de démarrage (posé par
       le trigger handle_new_user, cf. migration 20260917000001).
     - Tant que ce lundi n'est pas atteint, l'Académie affiche un écran
       d'attente annonçant la date de démarrage.
     - Un nouveau quizz devient disponible chaque jour à 00h, indépendamment
       du fait que l'utilisateur ait terminé (ou raté) celui de la veille.
     - Les modules manqués restent accessibles ; on ne "perd" jamais un module,
       on prend juste du retard sur son propre calendrier.
   Toute l'arithmétique vit dans utils/academyCalendar.js (jours civils, pour
   ne pas dériver aux changements d'heure). */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  BookOpen, ChevronRight, ChevronLeft, CheckCircle, Lock, Unlock, Clock,
  Trophy, TrendingUp, Calendar, Gift, Library, FileText,
  HelpCircle, Sparkles, Route, GraduationCap, LineChart,
  Check, X, CheckSquare, Layers, RotateCw, Shuffle,
  PiggyBank, Shield, Home,
} from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import Modal from '../../components/ui/Modal/Modal';
import { useAcademyProgress } from '../../hooks/useAcademyProgress';
import { PROGRAM_52, MOCK_PLAYERS, WEEKS, KEY_PRINCIPLES, WEEK_GUIDES,
         CORPUS_A_JOUR_LABEL } from './data';
import { fichesDuModule, recapDeLaSemaine } from './memo';
import { academyState, isModuleUnlocked, isWeekGuideUnlocked, formatStartDate,
         joursAvantGuide } from '../../utils/academyCalendar';
import { melangerQuestions } from '../../utils/quizShuffle';
import { loadWeekQuestions, weekOfModule } from './weeks';
import styles from './Academy.module.css';

const DAY_MS = 24 * 60 * 60 * 1000;

/* Mode test - bypass complet du cadenas côté UI. Laissé en place au cas où,
   mais ne devrait plus être nécessaire : on décale désormais artificiellement
   la date de début (profiles.academy_start_date) au niveau BDD pour les
   comptes "admin/testeur" - plus propre car par-utilisateur. */
const TEST_MODE_UNLOCK_ALL = false;

export default function Academy() {
  const [section, setSection] = useState('week');

  /* Ouverture d'un module - remonté au niveau parent pour être accessible
     depuis n'importe quel onglet (dashboard "Ma semaine" mais aussi
     "Ma progression"). Quand `activeModuleId` est set, la vue module
     s'affiche dans DashboardSection quel que soit l'onglet d'origine. */
  const [activeModuleId, setActiveModule] = useState(null);
  const [moduleTab, setModuleTab] = useState('quiz');

  /* Ouvre le module `id` avec le sous-onglet demandé (quiz par défaut) et
     bascule sur l'onglet "Ma semaine" qui héberge la vue module. */
  const openModule = (id, tab = 'quiz') => {
    setActiveModule(id);
    setModuleTab(tab);
    setSection('week');
  };

  /* Changement d'onglet depuis le menu. On ferme le module ouvert : sans cela,
     `activeModuleId` restant renseigné, DashboardSection réaffichait la vue
     module et cliquer sur "Ma semaine en cours" depuis un quiz ne renvoyait
     pas à la semaine. */
  const changeSection = (id) => {
    setActiveModule(null);
    setSection(id);
  };

  /* Source de vérité : la table academy_quiz_results + auth.users.created_at
     (via useAcademyProgress). `simulated` reste local pour le mode démo - il
     permet de faire avancer artificiellement le calendrier en dev via le
     bouton "Tester le semainier". En prod, `simulated` reste égal à
     Date.now() puisque le bouton n'est plus affiché (cf. IS_DEV plus bas). */
  const { userStart, completed, loading: progressLoading, saveResult } = useAcademyProgress();
  const [simulated, setSimulated] = useState(() => Date.now());

  /* Aligne `simulated` sur `userStart` dès qu'on connaît la vraie date
     de démarrage. Sinon le calendrier partirait du fallback initial et
     afficherait une semaine aberrante le temps du chargement du profil. */
  useEffect(() => {
    setSimulated((s) => Math.max(s, Date.now()));
  }, [userStart]);

  const simulateDay = () => setSimulated((s) => s + DAY_MS);

  /* État du calendrier : semaine en cours, jour dans la semaine, dernier
     module débloqué, et si le parcours a seulement commencé. */
  const academy = academyState(userStart, new Date(simulated));
  const currentWeek = academy.week;

  const sections = [
    { id: 'week',        label: 'Ma semaine en cours',   icon: Trophy },
    { id: 'progression', label: 'Ma progression',        icon: LineChart },
    { id: 'program',     label: 'Programme 52 semaines', icon: Calendar },
    { id: 'library',     label: 'Bibliothèque',          icon: Library },
    { id: 'help',        label: 'Aide',                  icon: HelpCircle },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Forme-toi à la finance{' '}
            <span className="gradient-text">module par module</span>
          </h1>
          <p className={styles.pageIntro}>
            6 thèmes, des QCM gamifiés, et une note globale qui reflète ton niveau réel.
            Chaque bonne réponse te rapproche de la maîtrise financière.
          </p>
        </header>

        <nav className={styles.tabs} role="tablist" aria-label="Sections de l'aperçu">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={section === id}
              onClick={() => changeSection(id)}
              className={`${styles.tab} ${section === id ? styles.tabActive : ''}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          {section === 'week' && (
            <DashboardSection
              simulated={simulated}
              completed={completed}
              academy={academy}
              simulateDay={simulateDay}
              saveResult={saveResult}
              loading={progressLoading}
              activeModuleId={activeModuleId}
              setActiveModule={setActiveModule}
              moduleTab={moduleTab}
              setModuleTab={setModuleTab}
            />
          )}
          {section === 'progression' && (
            <ProgressionSection
              academy={academy}
              completed={completed}
              onOpenModule={openModule}
            />
          )}
          {section === 'program' && (
            <ProgramSection currentWeek={currentWeek} />
          )}
          {section === 'library' && (
            <BibliothequeSection
              completed={completed}
              academy={academy}
              onOpenModule={openModule}
              onGoToWeek={() => setSection('week')}
            />
          )}
          {section === 'help' && (
            <HelpSection goTo={setSection} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Section Aide ────────────────────────────────────────── */
/* Vue pédagogique qui explique le fonctionnement global de l'Académie.
   Pensée comme la page "Comment ça marche" à laquelle tout utilisateur
   pourrait revenir en cas de doute. Structurée en 6 principes clés
   pour se lire en < 2 minutes. */
function HelpSection({ goTo }) {
  const principles = [
    {
      icon: Sparkles,
      title: '1 · Un programme de 52 semaines, pensé sur un an',
      body: "Le cursus couvre six grandes thématiques (Placement, Fiscalité, Retraite, Transmission, IARD & Prévoyance, Immobilier) réparties sur 52 semaines. Chaque semaine = un module par thème, du lundi au samedi. Le dimanche, on souffle.",
      action: { label: 'Voir le programme', to: 'program' },
    },
    {
      icon: Route,
      title: "2 · Tu démarres au jour 1, quelle que soit ta date d'inscription",
      body: "Personne ne rate le début : que tu t'inscrives le 10 janvier ou le 30 avril, tu commences par la Semaine 1 · Lundi. Ton calendrier est personnel - il ne dépend pas d'un rythme calendaire commun à tous les utilisateurs.",
    },
    {
      icon: Clock,
      title: '3 · Un nouveau quiz débloqué chaque jour à minuit',
      body: "À 00h, le module du jour devient disponible dans « Ma semaine en cours », automatiquement. Tu peux le faire quand tu veux dans la journée (ou plus tard). Rien ne t'oblige à finir la veille avant de commencer aujourd'hui : les modules manqués restent accessibles, tu prends juste du retard sur ton propre calendrier.",
      action: { label: 'Voir ma semaine', to: 'week' },
    },
    {
      icon: GraduationCap,
      title: '4 · Quatre phases qui se débloquent au fil de ta progression',
      body: "Le programme est découpé en quatre phases progressives : Fondations, Structuration, Optimisation et Expertise. Chaque phase se débloque lorsque tu as validé un cap précis dans la précédente. Impossible de sauter en Expertise sans passer par les bases.",
    },
    {
      icon: Library,
      title: '5 · Ta Bibliothèque se remplit à chaque module validé',
      body: "Chaque quiz complété devient une fiche mémoire archivée dans ta bibliothèque personnelle. Tu y retrouves aussi les documents pratiques (checklists, simulateurs) pour approfondir ou réviser à ton rythme.",
      action: { label: 'Voir ma bibliothèque', to: 'library' },
    },
    {
      icon: LineChart,
      title: '6 · Classement et moyenne mobile 3 mois',
      body: "Ta performance est calculée sur les 90 derniers jours (moyenne mobile) - un mauvais début n'écrase donc pas ta progression sur la durée. Les 10 premiers du classement hebdomadaire reçoivent une récompense exclusive.",
    },
  ];

  const faqs = [
    {
      q: "Que se passe-t-il si je rate plusieurs jours d'affilée ?",
      a: "Rien de grave - les modules manqués restent accessibles. Tu peux les rattraper à ton rythme, en parallèle du module du jour qui, lui, continue à se débloquer à minuit.",
    },
    {
      q: "Est-ce que je peux avancer plus vite que le calendrier ?",
      a: "Non, volontairement. Le rythme d'un module par jour est pensé pour laisser le temps à la mémorisation. On préfère 15 minutes tous les jours à 3 heures une fois par semaine.",
    },
    {
      q: "Que devient mon score si je refais un quiz ?",
      a: "Ton meilleur score sur les 90 derniers jours est conservé. Refaire un module que tu as raté est encouragé - c'est même la meilleure manière de sécuriser un concept.",
    },
    {
      q: "Puis-je consulter les futurs modules à l'avance ?",
      a: "Non pour les quiz (verrouillés jour par jour), oui pour la carte globale du programme - tu peux la parcourir à tout moment depuis l'onglet « Programme 52 semaines » pour savoir ce qui t'attend.",
    },
  ];

  return (
    <div className={styles.helpWrap}>
      <div className={styles.helpHeader}>
        <div className={styles.helpHeaderIcon}><HelpCircle size={28} /></div>
        <div>
          <h2 className={styles.helpTitle}>Comment fonctionne l'Académie ?</h2>
          <p className={styles.helpSub}>
            Six principes à connaître pour tirer le meilleur de tes 52 semaines
            d'apprentissage - avec, en bas, les questions les plus courantes.
          </p>
        </div>
      </div>

      <div className={styles.helpPrinciples}>
        {principles.map(({ icon: Icon, title, body, action }) => (
          <article key={title} className={styles.helpPrinciple}>
            <div className={styles.helpPrincipleIcon}><Icon size={22} /></div>
            <div className={styles.helpPrincipleContent}>
              <h3 className={styles.helpPrincipleTitle}>{title}</h3>
              <p className={styles.helpPrincipleBody}>{body}</p>
              {action && (
                <button
                  type="button"
                  onClick={() => goTo(action.to)}
                  className={styles.helpPrincipleLink}
                >
                  {action.label} <ChevronRight size={14} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className={styles.helpFaqBlock}>
        <h3 className={styles.helpFaqHeading}>Questions fréquentes</h3>
        <div className={styles.helpFaqList}>
          {faqs.map(({ q, a }) => (
            <details key={q} className={styles.helpFaq}>
              <summary className={styles.helpFaqQ}>{q}</summary>
              <p className={styles.helpFaqA}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className={styles.helpFooter}>
        <p>Une question sans réponse ici ?</p>
        <span className={styles.helpFooterHint}>
          En prod, un CTA "Contacter le support" prendra la place de ce placeholder.
        </span>
      </div>
    </div>
  );
}

/* ─── Programme 52 semaines (avec cadenas conditionnels) ──── */
/* Déblocage temporel des phases : basé sur la semaine courante (dérivée de
   profiles.academy_start_date). Chaque phase couvre 13 semaines, on débloque
   la suivante quand l'utilisateur y arrive dans son calendrier personnel.
     - Fondations   → semaines 1-13
     - Structuration → 14-26
     - Optimisation → 27-39
     - Expertise    → 40-52
   Bypass possible en mode test (voir TEST_MODE_UNLOCK_ALL). */
const PHASE_UNLOCK_WEEK = { p1: 1, p2: 14, p3: 27, p4: 40 };

const PHASE_UNLOCK_RULES = {
  p1: () => ({ unlocked: true }),
  p2: ({ currentWeek }) => ({
    unlocked: TEST_MODE_UNLOCK_ALL || currentWeek >= PHASE_UNLOCK_WEEK.p2,
    requirement: `Cette phase se débloque à partir de la semaine ${PHASE_UNLOCK_WEEK.p2} (tu es en semaine ${currentWeek}).`,
  }),
  p3: ({ currentWeek }) => ({
    unlocked: TEST_MODE_UNLOCK_ALL || currentWeek >= PHASE_UNLOCK_WEEK.p3,
    requirement: `Cette phase se débloque à partir de la semaine ${PHASE_UNLOCK_WEEK.p3} (tu es en semaine ${currentWeek}).`,
  }),
  p4: ({ currentWeek }) => ({
    unlocked: TEST_MODE_UNLOCK_ALL || currentWeek >= PHASE_UNLOCK_WEEK.p4,
    requirement: `Cette phase se débloque à partir de la semaine ${PHASE_UNLOCK_WEEK.p4} (tu es en semaine ${currentWeek}).`,
  }),
};

function ProgramSection({ currentWeek }) {
  const phasesWithState = PROGRAM_52.map((p) => ({
    ...p,
    ...PHASE_UNLOCK_RULES[p.id]({ currentWeek }),
  }));

  /* Par défaut on ouvre la première phase débloquée. */
  const firstUnlocked = phasesWithState.find((p) => p.unlocked)?.id || 'p1';
  const [openPhase, setOpenPhase] = useState(firstUnlocked);
  const phase = phasesWithState.find((p) => p.id === openPhase);

  const days = ['Lundi (Placement)', 'Mardi (Fiscalité)', 'Mercredi (Retraite)', 'Jeudi (Transmission)', 'Vendredi (IARD & Prév.)', 'Samedi (Immobilier)'];

  return (
    <div className={styles.programWrap}>
      <p className={styles.sectionLead}>
        Quatre phases d'apprentissage pour transformer un novice en expert.
        Les phases avancées se débloquent au fur et à mesure de ta progression sur "Ma semaine en cours".
      </p>

      <div className={styles.phasesNav}>
        {phasesWithState.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpenPhase(p.id)}
            disabled={!p.unlocked}
            aria-disabled={!p.unlocked}
            className={`${styles.phaseBtn} ${openPhase === p.id ? styles.phaseBtnActive : ''} ${!p.unlocked ? styles.phaseBtnLocked : ''}`}
          >
            <span className={styles.phaseNum}>0{i + 1}</span>
            <span className={styles.phaseName}>
              {p.name}
              {!p.unlocked && <Lock size={12} className={styles.phaseNameLock} />}
            </span>
            <span className={styles.phaseRange}>{p.range}</span>
          </button>
        ))}
      </div>

      {phase.unlocked ? (
        <div className={styles.phaseCard}>
          <p className={styles.phaseDesc}>{phase.description}</p>
          <div className={styles.scrollWrap}>
            <table className={styles.weekTable}>
              <thead>
                <tr>
                  <th className={styles.weekColHead}>Sem.</th>
                  {days.map((d) => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {phase.weeks.map((week) => (
                  <tr key={week.n}>
                    <td className={styles.weekNum}>{week.n}</td>
                    {week.topics.map((topic, i) => (
                      <td key={i} className={styles.weekTopic}>{topic}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.phaseLockedCard}>
          <div className={styles.phaseLockedIcon}><Lock size={28} /></div>
          <h3 className={styles.phaseLockedTitle}>Phase verrouillée</h3>
          <p className={styles.phaseLockedText}>{phase.requirement}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Section "Ma progression" ────────────────────────────── */
/* Timeline 52 semaines × 6 modules (312 carrés) groupée par les 4 phases.
   Chaque carré affiche le statut du module correspondant :
     - validated : score ≥ 80 %
     - review    : quiz complété mais < 80 %
     - todo      : semaine débloquée, module non commencé
     - locked    : semaine > currentWeek
   Les semaines rédigées sont listées dans WEEKS (indexé par n° de sem).
   Cliquer sur un module d'une semaine non rédigée ouvre un modal
   "Contenu à venir". */

const VALIDATION_THRESHOLD = 80; // seuil vert ≥ 80 %
const DAYS_HEADER = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

function moduleStatus(weekN, dayIdx, academy, completed) {
  /* Même règle que la vue semaine : la comparaison porte sur le JOUR atteint,
     pas seulement sur la semaine. L'ancienne version ne testait que
     `weekN > currentWeek`, si bien que les six jours de la semaine en cours
     apparaissaient ouverts dans « Ma progression » — on pouvait y démarrer le
     quiz de vendredi un mardi, alors que la vue semaine le cadenassait. */
  if (!isModuleUnlocked(weekN, dayIdx, academy)) return 'locked';
  /* On regarde la complétion uniquement pour les semaines dont le corpus
     est rédigé (présentes dans WEEKS). Les autres restent en "todo"
     quelle que soit la progression. */
  const week = WEEKS[weekN];
  if (week) {
    const id = week[dayIdx]?.id;
    const rec = id ? completed[id] : null;
    if (rec) {
      const pct = (rec.score / rec.total) * 100;
      return pct >= VALIDATION_THRESHOLD ? 'validated' : 'review';
    }
  }
  return 'todo';
}

function ProgressionSection({ academy, completed, onOpenModule }) {
  const [comingSoonWeek, setComingSoonWeek] = useState(null);

  /* Stats globales - sur les modules effectivement validés parmi les
     312 possibles. `completedCount` inclut les scores faibles ; `validated`
     ne compte que les modules ≥ 80 %. */
  const totalModules   = 52 * 6;
  const completedList  = Object.values(completed);
  const completedCount = completedList.length;
  const validatedCount = completedList.filter((r) => (r.score / r.total) * 100 >= VALIDATION_THRESHOLD).length;
  const progressPct    = Math.round((validatedCount / totalModules) * 100);
  const avgScore = completedCount > 0
    ? Math.round(completedList.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / completedCount)
    : 0;

  const handleClick = (weekN, dayIdx) => {
    const status = moduleStatus(weekN, dayIdx, academy, completed);
    if (status === 'locked') return;
    const week = WEEKS[weekN];
    if (week) {
      const id = week[dayIdx].id;
      onOpenModule(id);
    } else {
      setComingSoonWeek(weekN);
    }
  };

  return (
    <div className={styles.progressionWrap}>
      {/* Barre de progression globale */}
      <div className={styles.progressGlobal}>
        <div className={styles.progressGlobalHead}>
          <p className={styles.progressGlobalLabel}>Progression globale</p>
          <span className={styles.progressGlobalPct}>{progressPct} %</span>
        </div>
        <div className={styles.progressGlobalBar}>
          <div
            className={styles.progressGlobalFill}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className={styles.progressGlobalMeta}>
          <span><strong>{validatedCount}</strong> module{validatedCount > 1 ? 's' : ''} validé{validatedCount > 1 ? 's' : ''} sur {totalModules}</span>
          {completedCount > 0 && <span>Score moyen <strong>{avgScore} %</strong></span>}
        </div>
      </div>

      {/* Légende des états */}
      <div className={styles.progressLegend}>
        <span className={styles.progressLegendItem}>
          <span className={`${styles.statusDot} ${styles.statusValidated}`} /> Validé (≥ 80 %)
        </span>
        <span className={styles.progressLegendItem}>
          <span className={`${styles.statusDot} ${styles.statusReview}`} /> À revoir (&lt; 80 %)
        </span>
        <span className={styles.progressLegendItem}>
          <span className={`${styles.statusDot} ${styles.statusTodo}`} /> À faire
        </span>
        <span className={styles.progressLegendItem}>
          <span className={`${styles.statusDot} ${styles.statusLocked}`} /> Verrouillé
        </span>
      </div>

      {/* Timeline par phase */}
      <div className={styles.progressionPhases}>
        {PROGRAM_52.map((phase, phaseIdx) => (
          <section key={phase.id} className={styles.progressionPhase}>
            <header className={styles.progressionPhaseHeader}>
              <span className={styles.progressionPhaseNum}>Phase 0{phaseIdx + 1}</span>
              <h3 className={styles.progressionPhaseTitle}>{phase.name}</h3>
              <span className={styles.progressionPhaseRange}>{phase.range}</span>
            </header>

            <div className={styles.progressionGrid}>
              <div className={styles.progressionDaysHeader}>
                <span /> {/* colonne du numéro de semaine */}
                {DAYS_HEADER.map((d) => (
                  <span key={d} className={styles.progressionDayLabel}>{d}</span>
                ))}
              </div>

              {phase.weeks.map((week) => (
                <div key={week.n} className={styles.progressionWeekRow}>
                  <span className={styles.progressionWeekLabel}>S{week.n}</span>
                  {week.topics.map((topic, dayIdx) => {
                    const status = moduleStatus(week.n, dayIdx, academy, completed);
                    const isLocked = status === 'locked';
                    return (
                      <button
                        key={dayIdx}
                        type="button"
                        onClick={() => handleClick(week.n, dayIdx)}
                        disabled={isLocked}
                        aria-label={`Semaine ${week.n} · ${DAYS_HEADER[dayIdx]} · ${topic} · ${status}`}
                        title={`S${week.n} · ${DAYS_HEADER[dayIdx]} - ${topic}`}
                        className={`${styles.progressionCell} ${styles[`cellStatus_${status}`]}`}
                      >
                        {status === 'validated' && <Check size={12} strokeWidth={3} />}
                        {status === 'review'    && <X size={12} strokeWidth={3} />}
                        {status === 'locked'    && <Lock size={10} />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal "Contenu à venir" pour les semaines 2-52.
          Passe par le composant Modal pour hériter du focus trap, de la
          fermeture Escape et du role="dialog" (l'ancienne version était un
          simple div, inatteignable au clavier). */}
      <Modal
        isOpen={comingSoonWeek !== null}
        onClose={() => setComingSoonWeek(null)}
        title={`Contenu de la semaine ${comingSoonWeek} à venir`}
        size="sm"
      >
        <div className={styles.comingSoonBody}>
          <div className={styles.comingSoonIcon}>
            <Clock size={28} />
          </div>
          <p className={styles.comingSoonText}>
            Le corpus de quiz pour cette semaine est en cours de rédaction.
            Il sera disponible prochainement - reviens la semaine prochaine !
          </p>
          <Button variant="ghost" size="md" onClick={() => setComingSoonWeek(null)}>
            Fermer
          </Button>
        </div>
      </Modal>
    </div>
  );
}

/* Charge les questions du module demandé. Elles ne sont plus dans WEEKS :
   les 1560 questions pèsent ~950 Ko et ne concernent qu'un module à la fois
   (cf. weeks.js). Retourne null tant que le chargement est en cours. */
function useModuleQuestions(moduleId) {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    if (!moduleId) { setQuestions(null); return; }
    let vivant = true;
    setQuestions(null);
    const semaine = weekOfModule(moduleId);
    loadWeekQuestions(semaine)
      /* Les options sont permutées à la volée : le corpus place la bonne
         réponse en B une fois sur deux (cf. utils/quizShuffle.js). */
      .then((parModule) => {
        if (vivant) setQuestions(melangerQuestions(parModule?.[moduleId] ?? [], moduleId));
      })
      .catch((err) => {
        /* Réseau coupé ou chunk absent : on retombe sur une liste vide plutôt
           que de laisser la vue bloquée sur son écran de chargement. */
        console.error('[Academy] chargement des questions', err);
        if (vivant) setQuestions([]);
      });
    return () => { vivant = false; };
  }, [moduleId]);

  return questions;
}

/* ─── Section "Ma semaine en cours" ───────────────────────── */
/* `activeModuleId` / `moduleTab` viennent du parent Academy : ils sont
   partagés avec ProgressionSection pour permettre d'ouvrir un module
   depuis "Ma progression" (on bascule ici et on affiche direct la vue module). */
function DashboardSection({
  simulated, completed, academy, simulateDay, saveResult, loading,
  activeModuleId, setActiveModule, moduleTab, setModuleTab,
}) {
  const [view, setView] = useState('dashboard'); // dashboard | leaderboard | guide
  /* Semaine affichée. Par défaut la semaine atteinte, mais l'utilisateur peut
     revenir en arrière pour relire un module ou un guide déjà débloqué. On ne
     peut jamais dépasser academy.week : les semaines futures restent fermées. */
  const [viewedWeek, setViewedWeek] = useState(null);
  /* Sous-onglets à l'intérieur d'un module ouvert (quiz / flashcards / guide).
     La vue module s'affiche dès que `activeModuleId` est set - indépendant
     de `view`, qui gère seulement dashboard vs leaderboard. */

  /* Appelé inconditionnellement, avant tout retour anticipé : un hook ne peut
     pas être placé derrière un `if`. Il ne déclenche un chargement que si un
     module est ouvert. */
  const moduleQuestions = useModuleQuestions(activeModuleId);

  const movingAvg = useMemo(() => {
    const ninetyDaysMs = 90 * DAY_MS;
    let sum = 0, max = 0;
    Object.values(completed).forEach((q) => {
      if (simulated - q.timestamp <= ninetyDaysMs) {
        sum += q.score;
        max += q.total;
      }
    });
    return max === 0 ? 0 : Math.round((sum / max) * 100);
  }, [completed, simulated]);

  /* Statut d'un module de la semaine affichée. Le déblocage dépend du jour
     réel de la semaine (lundi = module 1, …), jamais de la complétion du
     module précédent : cf. règle produit "un nouveau quizz débloqué chaque
     jour à 00h, quoi qu'il arrive".
     L'ancienne version comparait `i <= daysPassed`, ce qui ouvrait d'un coup
     toute la semaine dès que daysPassed dépassait 5 - le déblocage quotidien
     ne fonctionnait donc qu'en semaine 1.
     Bypass complet en mode test (voir TEST_MODE_UNLOCK_ALL). */
  const dayStatus = (weekN, i, id) => {
    if (completed[id]) return 'completed';
    if (TEST_MODE_UNLOCK_ALL || isModuleUnlocked(weekN, i, academy)) return 'unlocked';
    return 'locked';
  };

  /* Ouverture locale d'un module (depuis la grille de la semaine). Fonctionne
     via les états parents pour être cohérent avec l'ouverture depuis d'autres
     onglets (Progression). */
  const openModuleLocal = (id) => {
    setActiveModule(id);
    setModuleTab('quiz');
  };

  const closeModule = () => setActiveModule(null);

  /* Enregistrement du résultat via le hook - délégué à Supabase.
     Le hook fait l'optimistic update + le upsert en base. */
  const saveQuizResult = (day, results) => saveResult(day, results);

  /* ── Vue module (ouverte au clic sur un module de la semaine ou depuis
        l'onglet "Ma progression"). Prime sur la vue dashboard/leaderboard. ── */
  if (activeModuleId) {
    /* On cherche le jour dans toutes les semaines rédigées : le module id
       est unique globalement (sem 1 = 'day-N', sem 2+ = 'wN-dI'). */
    const day = Object.values(WEEKS).flat().find((d) => d.id === activeModuleId);
    /* Sécurité : si l'id ne correspond à aucun module connu (par ex.
       arrivée d'un id de semaine 2+ non implémenté), on ferme la vue. */
    if (!day) {
      closeModule();
      return null;
    }
    const existingRecord = completed[day.id]; // récap si déjà complété

    /* Les questions arrivent en différé : tant qu'elles ne sont pas là, on
       affiche l'en-tête du module et un message d'attente plutôt qu'une page
       vide ou un quiz sans contenu. */
    if (!moduleQuestions) {
      return (
        <div className={styles.dashWrap}>
          <div className={styles.livretRoot}>
            <header className={styles.moduleHero}>
              <div className={styles.moduleHeroTop}>
                <button type="button" onClick={closeModule} className={styles.moduleBackBtn}
                        aria-label="Retour à ma semaine">
                  <ChevronLeft size={18} />
                </button>
                <div className={styles.moduleHeroText}>
                  <p className={styles.moduleHeroMeta}>{day.dayName} · {day.theme}</p>
                  <h2 className={styles.moduleHeroTitle}>{day.title}</h2>
                </div>
              </div>
            </header>
            <p className={styles.dashLoading}>Chargement du module…</p>
          </div>
        </div>
      );
    }

    /* Le reste du composant travaille sur un jour complet, questions
       comprises : on les raccroche ici. */
    const dayWithQuestions = { ...day, questions: moduleQuestions };
    /* Le Guide ne figure plus ici : il est passé hebdomadaire et vit sur la
       vue semaine (cf. WeekGuideCard). Restent les deux contenus liés au
       module du jour : le quiz et ses fiches mémo. */
    const moduleTabs = [
      { id: 'quiz',       label: 'Quiz du jour',  icon: CheckSquare },
      { id: 'flashcards', label: 'Fiches mémo',   icon: Layers },
    ];
    return (
      <div className={styles.dashWrap}>
        <div className={styles.livretRoot}>
          {/* Header du module, en un seul bloc. Les quatre niveaux empilés
              (retour, jour/thème, titre, onglets) tenaient sur quatre lignes
              distinctes : le retour passe en bouton rond aligné sur le titre,
              le jour et le thème en surtitre, et les deux contenus en
              sélecteur compact sur la même ligne que le titre en grand écran. */}
          <header className={styles.moduleHero}>
            <div className={styles.moduleHeroTop}>
              <button
                type="button"
                onClick={closeModule}
                className={styles.moduleBackBtn}
                aria-label="Retour à ma semaine"
              >
                <ChevronLeft size={18} />
              </button>
              <div className={styles.moduleHeroText}>
                <p className={styles.moduleHeroMeta}>
                  {day.dayName} · {day.theme}
                </p>
                <h2 className={styles.moduleHeroTitle}>{day.title}</h2>
              </div>
            </div>

            <div className={styles.moduleSwitch} role="tablist" aria-label="Contenu du module">
              {moduleTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={moduleTab === id}
                  onClick={() => setModuleTab(id)}
                  className={`${styles.moduleSwitchBtn} ${moduleTab === id ? styles.moduleSwitchBtnActive : ''}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Les questions citent des seuils et des taux qui changent chaque
                année : on affiche la date de référence plutôt que de laisser
                croire à un contenu intemporel. */}
            <p className={styles.moduleHeroDate}>
              Contenu à jour au regard de la réglementation en vigueur en {CORPUS_A_JOUR_LABEL}.
            </p>
          </header>

          <div className={styles.livretBody}>
            {moduleTab === 'quiz' && (
              <ModuleQuizView
                day={dayWithQuestions}
                existingRecord={existingRecord}
                onSubmit={(results) => saveQuizResult(dayWithQuestions, results)}
              />
            )}
            {moduleTab === 'flashcards' && (
              <ModuleFlashcardsView
                key={day.id}
                cards={fichesDuModule(day.id, moduleQuestions)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'leaderboard') {
    const all = [...MOCK_PLAYERS, { id: 'me', name: 'Vous', score: movingAvg, isCurrent: true }];
    const sorted = all.sort((a, b) => b.score - a.score).slice(0, 10);
    const myRank = all.findIndex((p) => p.id === 'me') + 1;
    return (
      <div className={styles.dashWrap}>
        <button onClick={() => setView('dashboard')} className={styles.linkBtn}>← Retour au tableau de bord</button>
        <div className={styles.leaderHeader}>
          <h2 className={styles.leaderTitle}>Classement général (3 mois)</h2>
          <p className={styles.leaderSub}>
            Calculé sur la moyenne mobile des 90 derniers jours. Les 10 premiers à la fin de la semaine reçoivent une récompense exclusive.
          </p>
        </div>
        {myRank > 10 && movingAvg > 0 && (
          <div className={styles.leaderMyPos}>
            <span>Votre position : <strong>#{myRank}</strong> sur {all.length}</span>
            <span className={styles.leaderMyScore}>{movingAvg}%</span>
          </div>
        )}
        <div className={styles.leaderboard}>
          {sorted.map((p, i) => (
            <div key={p.id} className={`${styles.leaderRow} ${p.isCurrent ? styles.leaderRowMe : ''} ${i < 3 ? styles.leaderRowTop : ''}`}>
              <div className={`${styles.leaderRank} ${i === 0 ? styles.rankGold : i === 1 ? styles.rankSilver : i === 2 ? styles.rankBronze : ''}`}>
                {i + 1}
              </div>
              <span className={styles.leaderName}>
                {p.name}
                {p.isCurrent && <span className={styles.leaderMeChip}>Vous</span>}
              </span>
              <Gift size={16} className={`${styles.leaderGift} ${i < 10 ? styles.leaderGiftActive : ''}`} />
              <span className={styles.leaderScore}>{p.score}<span className={styles.leaderScoreUnit}>%</span></span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'guide') {
    /* Le guide hérite de la palette « Grand Livret » (thème papier clair)
       comme la vue module : ses variables --paper / --ink ne sont définies
       que sur .livretRoot. Sans cette enveloppe, le fond papier et les
       bordures du guide tombaient silencieusement, var() non résolu. */
    return (
      <div className={styles.dashWrap}>
        <div className={styles.livretRoot}>
          <WeekGuideView
            weekN={Math.min(viewedWeek ?? academy.week, academy.week)}
            onBack={() => setView('dashboard')}
          />
        </div>
      </div>
    );
  }

  /* Inscription en cours de semaine : le parcours ne commence qu'au lundi
     suivant, on annonce la date plutôt que d'afficher une semaine vide. Les
     autres onglets (Programme, Aide) restent accessibles pour patienter. */
  if (!academy.started) {
    return (
      <div className={styles.dashWrap}>
        <div className={styles.notStarted}>
          <div className={styles.notStartedIcon}><Calendar size={28} /></div>
          <p className={styles.notStartedEyebrow}>Ton parcours démarre</p>
          <h2 className={styles.notStartedTitle}>
            Rendez-vous {academy.startDate ? formatStartDate(academy.startDate) : 'lundi prochain'}
          </h2>
          <p className={styles.notStartedText}>
            L'Académie suit les jours de la semaine : un module chaque matin du lundi
            au samedi. Comme tu t'inscris en cours de semaine, ton parcours démarre au
            prochain lundi pour que tu commences par le premier module.
          </p>
          {academy.daysUntilStart > 0 && (
            <p className={styles.notStartedCount}>
              <strong>{academy.daysUntilStart}</strong>
              {academy.daysUntilStart > 1 ? ' jours à patienter' : ' jour à patienter'}
            </p>
          )}
          <p className={styles.notStartedHint}>
            En attendant, va jeter un œil au <strong>Programme 52 semaines</strong> pour
            découvrir ce qui t'attend.
          </p>
        </div>
      </div>
    );
  }

  /* Semaine du programme atteinte, calculée une seule fois par le parent. */
  const reachedWeek = academy.week;
  /* viewedWeek === null : on suit la semaine en cours, y compris quand elle
     avance d'elle-même à minuit. Dès que l'utilisateur navigue, on fige. */
  const currentWeek = Math.min(viewedWeek ?? reachedWeek, reachedWeek);
  const isPastWeek  = currentWeek < reachedWeek;

  return (
    <div className={styles.dashWrap}>
      <div className={styles.dashTop}>
        <div className={styles.dashHero}>
          <p className={styles.dashHeroEyebrow}>Ton parcours personnel</p>
          <div className={styles.weekNav}>
            <button
              className={styles.weekNavBtn}
              onClick={() => setViewedWeek(Math.max(1, currentWeek - 1))}
              disabled={currentWeek <= 1}
              aria-label="Semaine précédente"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className={styles.dashHeroTitle}>
              Semaine <span className={styles.dashHeroBig}>{currentWeek}</span>
              <span className={styles.dashHeroTotal}> / 52</span>
            </h2>
            <button
              className={styles.weekNavBtn}
              onClick={() => setViewedWeek(Math.min(reachedWeek, currentWeek + 1))}
              disabled={currentWeek >= reachedWeek}
              aria-label="Semaine suivante"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {isPastWeek ? (
            <>
              <p className={styles.dashHeroSub}>
                Tu consultes une semaine passée : tous ses modules et son guide
                restent ouverts.
              </p>
              <Button variant="outline" size="md" onClick={() => setViewedWeek(null)}
                      className={styles.weekNavBack}>
                <RotateCw size={16} /> Revenir à la semaine {reachedWeek}
              </Button>
            </>
          ) : (
            <p className={styles.dashHeroSub}>
              Un nouveau module chaque matin du lundi au samedi, le dimanche au repos.
              Rien ne se perd si tu sautes un jour, tu peux revenir sur les semaines
              précédentes avec les flèches.
            </p>
          )}
        </div>
        <div className={styles.dashStat}>
          <TrendingUp size={22} />
          <span className={styles.dashStatLabel}>Moyenne mobile (3 mois)</span>
          <span className={styles.dashStatValue}>{movingAvg}<span className={styles.dashStatUnit}>%</span></span>
          <button onClick={() => setView('leaderboard')} className={styles.linkBtn}>
            <Trophy size={14} /> Voir le classement
          </button>
        </div>
      </div>

      {/* Bouton "Tester le semainier" uniquement en dev - permet de simuler
          l'avancement du calendrier sans attendre 24h. Retiré en prod car le
          user réel avance automatiquement de +1 jour à minuit. */}
      {import.meta.env.DEV && (
        <div className={styles.dashActions}>
          <Button variant="ghost" size="sm" onClick={simulateDay}>
            <Clock size={14} /> Tester le semainier (dev)
          </Button>
        </div>
      )}

      {loading && (
        <p className={styles.dashLoading}>Chargement de ta progression…</p>
      )}

      {/* `WEEKS[currentWeek] || WEEKS[1]` retombait silencieusement sur la
          semaine 1 quand le corpus d'une semaine n'était pas rédigé : on
          croyait avancer en refaisant les mêmes six quiz. On le dit
          explicitement à la place. */}
      {!WEEKS[currentWeek] ? (
        <div className={styles.weekEmpty}>
          <div className={styles.weekEmptyIcon}><FileText size={26} /></div>
          <h3 className={styles.weekEmptyTitle}>
            Le corpus de la semaine {currentWeek} est en cours de rédaction
          </h3>
          <p className={styles.weekEmptyText}>
            Les quiz de cette semaine ne sont pas encore publiés. En attendant, tu
            peux revenir sur les semaines précédentes avec les flèches : tous leurs
            modules et leurs guides restent ouverts.
          </p>
        </div>
      ) : (
      <div className={styles.modulesGrid}>
        {WEEKS[currentWeek].map((day, i) => {
          const status = dayStatus(currentWeek, i, day.id);
          return (
            <div key={day.id} className={`${styles.moduleCard} ${styles[`moduleStatus_${status}`]}`}>
              <div className={styles.moduleHead}>
                <div>
                  <p className={styles.moduleDay}>{day.dayName}</p>
                  <span className={styles.moduleTheme}>{day.theme}</span>
                </div>
                {status === 'completed' && <CheckCircle size={22} className={styles.moduleIconDone} />}
                {status === 'locked'    && <Lock size={22} className={styles.moduleIconLock} />}
                {status === 'unlocked'  && <Unlock size={22} className={styles.moduleIconOpen} />}
              </div>
              <h3 className={styles.moduleTitle}>{day.title}</h3>
              {status === 'locked' && (
                <p className={styles.moduleLockedHint}><Clock size={14} /> Débloqué jour {i + 1}</p>
              )}
              {status === 'unlocked' && (
                <Button variant="primary" size="md" onClick={() => openModuleLocal(day.id)} className={styles.moduleBtn}>
                  Démarrer le module <ChevronRight size={16} />
                </Button>
              )}
              {status === 'completed' && (
                <Button variant="ghost" size="md" onClick={() => openModuleLocal(day.id)} className={styles.moduleBtn}>
                  <BookOpen size={14} /> Consulter la fiche
                </Button>
              )}
            </div>
          );
        })}
      </div>
      )}

      {/* Guide de la semaine : se débloque le samedi, une fois les six modules
          sortis. Présenté comme une récompense de fin de semaine plutôt que
          comme un septième module, puisqu'il les récapitule tous. */}
      {(() => {
        const unlocked = isWeekGuideUnlocked(currentWeek, academy);
        const redige   = WEEK_GUIDES[currentWeek];
        /* Nombre de jours avant la publication, pour la semaine en cours.
           L'ancien libellé « Disponible samedi » restait identique du lundi au
           vendredi : impossible de savoir si la carte allait s'ouvrir un jour,
           ni quand. */
        const restant = joursAvantGuide(academy);
        const attente = restant === 1 ? 'Disponible demain' : `Disponible dans ${restant} jours`;
        return (
          <div className={`${styles.guideCard} ${unlocked ? styles.guideCardUnlocked : ''}`}>
            <div className={styles.guideCardIcon}>
              {unlocked ? <BookOpen size={26} /> : <Lock size={24} />}
            </div>
            <div className={styles.guideCardBody}>
              <p className={styles.guideCardEyebrow}>
                {redige ? 'Guide hebdomadaire' : 'Récap de la semaine'}
                {unlocked && <span className={styles.guideCardBadge}>Nouveau</span>}
              </p>
              <h3 className={styles.guideCardTitle}>
                {unlocked
                  ? (redige?.title ?? `Les six modules de la semaine ${currentWeek}`)
                  : attente}
              </h3>
              <p className={styles.guideCardText}>
                {unlocked
                  ? (redige
                      ? "La synthèse des six sujets de la semaine, et ce qu'ils ont en commun."
                      : 'Les questions posées cette semaine et leurs réponses, thème par thème.')
                  : 'Publié le samedi, une fois les six modules sortis : de quoi revoir la semaine entière en cinq minutes.'}
              </p>
            </div>
            {unlocked && (
              <Button variant="accent" size="lg" onClick={() => setView('guide')}
                      className={styles.guideCardBtn}>
                <BookOpen size={18} /> {redige ? 'Lire le guide' : 'Lire le récap'}
              </Button>
            )}
          </div>
        );
      })()}
    </div>
  );
}

/* ─── Section Bibliothèque ────────────────────────────────── */
/* Organisée par THÉMATIQUE, et non plus en liste plate des quiz validés.
   Le programme tient sur six thèmes, un par jour de la semaine (lundi =
   Enrichissement & Placement, mardi = Fiscalité, … samedi = Immobilier), et
   chaque thème revient 26 fois sur les 26 semaines rédigées. Chercher la
   fiche d'un sujet revenait à la retrouver au milieu de toutes les autres,
   rangées par date de validation : on entre désormais par le thème.

   La rubrique « Vidéos courtes » a été retirée avant le lancement, faute de
   contenu vidéo : elle promettait un format qui n'existe pas encore. */

const LIBRARY_DOCS = [
  { title: 'Checklist "Ma première assurance vie"',         type: 'PDF', pages: 4 },
  { title: 'Modèle de budget mensuel (règle 50/30/20)',     type: 'XLS', pages: 1 },
  { title: 'Guide "Comprendre son bulletin de salaire"',    type: 'PDF', pages: 8 },
  { title: 'Simulateur "Apport pour mon 1er achat"',        type: 'XLS', pages: 2 },
];

/* Icône par thème. Les libellés viennent de WEEKS et sont stables : six
   valeurs exactement, vérifiées sur les 156 modules. */
const THEME_ICONS = {
  'Enrichissement & Placement': TrendingUp,
  'Fiscalité':                  FileText,
  'Retraite':                   PiggyBank,
  'Transmission':               Gift,
  'IARD & Prévoyance':          Shield,
  'Immobilier':                 Home,
};

/* Tous les modules rédigés, regroupés par thème et classés par semaine.
   Calculé une fois au chargement du module JS : WEEKS est statique. */
const MODULES_PAR_THEME = (() => {
  const parTheme = new Map();
  Object.entries(WEEKS).forEach(([semaine, modules]) => {
    modules.forEach((module, dayIdx) => {
      if (!parTheme.has(module.theme)) parTheme.set(module.theme, []);
      parTheme.get(module.theme).push({ ...module, week: Number(semaine), dayIdx });
    });
  });
  parTheme.forEach((liste) => liste.sort((a, b) => a.week - b.week));
  return parTheme;
})();

/* Ordre d'affichage : celui des jours de la semaine, pas l'ordre alphabétique. */
const THEMES_ORDONNES = (WEEKS[1] ?? []).map((m) => ({ theme: m.theme, dayName: m.dayName }));

function BibliothequeSection({ completed, academy, onOpenModule, onGoToWeek }) {
  const [themeOuvert, setThemeOuvert] = useState(null);

  /* Compteurs par thème : ce qui est validé, et ce qui est déjà ouvert par le
     calendrier. Le total (26) reste affiché pour situer l'effort restant. */
  const stats = useMemo(() => {
    const parTheme = {};
    THEMES_ORDONNES.forEach(({ theme }) => {
      const modules = MODULES_PAR_THEME.get(theme) ?? [];
      parTheme[theme] = {
        total:     modules.length,
        debloques: modules.filter((m) => isModuleUnlocked(m.week, m.dayIdx, academy)).length,
        valides:   modules.filter((m) => completed[m.id]).length,
      };
    });
    return parTheme;
  }, [completed, academy]);

  const totalValide = Object.values(stats).reduce((n, s) => n + s.valides, 0);

  if (themeOuvert) {
    return (
      <ThemeFichesView
        theme={themeOuvert}
        completed={completed}
        academy={academy}
        onOpenModule={onOpenModule}
        onBack={() => setThemeOuvert(null)}
      />
    );
  }

  return (
    <div className={styles.libraryWrap}>
      <p className={styles.sectionLead}>
        Toutes tes ressources d&apos;apprentissage réunies au même endroit : les fiches mémo de tes
        quiz, rangées par thématique, et les documents pratiques à télécharger.
      </p>

      <section className={styles.librarySection}>
        <div className={styles.librarySectionHead}>
          <div>
            <h2 className={styles.librarySectionTitle}>
              <BookOpen size={20} /> Mes fiches mémo par thématique
            </h2>
            <p className={styles.librarySectionSub}>
              Six thématiques, une par jour de la semaine. {totalValide} module
              {totalValide > 1 ? 's' : ''} validé{totalValide > 1 ? 's' : ''} au total -
              ouvre une thématique pour retrouver toutes ses fiches.
            </p>
          </div>
        </div>

        <div className={styles.libraryThemes}>
          {THEMES_ORDONNES.map(({ theme, dayName }) => {
            const Icon = THEME_ICONS[theme] ?? BookOpen;
            const s = stats[theme];
            const pct = s.total ? Math.round((s.valides / s.total) * 100) : 0;
            return (
              <button
                key={theme}
                type="button"
                onClick={() => setThemeOuvert(theme)}
                className={styles.libraryTheme}
              >
                <div className={styles.libraryThemeIcon}><Icon size={22} /></div>
                <div className={styles.libraryThemeBody}>
                  <p className={styles.libraryThemeDay}>{dayName}</p>
                  <h3 className={styles.libraryThemeName}>{theme}</h3>
                  <p className={styles.libraryThemeMeta}>
                    {s.valides} fiche{s.valides > 1 ? 's' : ''} sur {s.total} ·{' '}
                    {s.debloques} module{s.debloques > 1 ? 's' : ''} ouvert{s.debloques > 1 ? 's' : ''}
                  </p>
                  <div className={styles.libraryThemeBar}>
                    <div className={styles.libraryThemeFill} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <ChevronRight size={18} className={styles.libraryThemeArrow} />
              </button>
            );
          })}
        </div>

        {totalValide === 0 && (
          <div className={styles.libraryEmpty}>
            <p className={styles.libraryEmptyTitle}>Aucune fiche validée pour l&apos;instant</p>
            <p className={styles.libraryEmptyText}>
              Les thématiques ci-dessus sont déjà consultables : tu y vois les modules ouverts et
              ceux qui restent à venir. Valide un premier quiz pour que ses fiches s&apos;y ajoutent.
            </p>
            <Button variant="primary" size="md" onClick={onGoToWeek}>
              Aller sur &quot;Ma semaine en cours&quot; <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </section>

      <section className={styles.librarySection}>
        <div className={styles.librarySectionHead}>
          <div>
            <h2 className={styles.librarySectionTitle}>
              <FileText size={20} /> Documents &amp; simulateurs
            </h2>
            <p className={styles.librarySectionSub}>
              Ressources téléchargeables pour passer à l&apos;action.
            </p>
          </div>
        </div>
        <div className={styles.libraryDocs}>
          {LIBRARY_DOCS.map((d) => (
            <div key={d.title} className={styles.libraryDoc}>
              <div className={styles.libraryDocIcon}><FileText size={18} /></div>
              <div className={styles.libraryDocInfo}>
                <h3 className={styles.libraryDocTitle}>{d.title}</h3>
                <p className={styles.libraryDocMeta}>{d.type} · {d.pages} page{d.pages > 1 ? 's' : ''}</p>
              </div>
              <ChevronRight size={16} className={styles.libraryDocArrow} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* Détail d'une thématique : ses 26 modules, du plus ancien au plus récent.
   Un module validé mène à ses fiches mémo, un module ouvert mais non fait à
   son quiz, un module à venir reste affiché pour montrer la suite du
   parcours. */
function ThemeFichesView({ theme, completed, academy, onOpenModule, onBack }) {
  const modules = MODULES_PAR_THEME.get(theme) ?? [];
  const Icon = THEME_ICONS[theme] ?? BookOpen;

  return (
    <div className={styles.libraryWrap}>
      <button className={styles.libraryBack} onClick={onBack}>
        <ChevronLeft size={16} /> Toutes les thématiques
      </button>

      <div className={styles.libraryThemeHeader}>
        <div className={styles.libraryThemeIcon}><Icon size={24} /></div>
        <div>
          <h2 className={styles.librarySectionTitle}>{theme}</h2>
          <p className={styles.librarySectionSub}>
            {modules.length} module{modules.length > 1 ? 's' : ''} sur les 26 semaines rédigées,
            un par semaine. Les fiches mémo s&apos;ouvrent une fois le quiz passé.
          </p>
        </div>
      </div>

      <div className={styles.libraryModules}>
        {modules.map((module) => {
          const record = completed[module.id];
          const ouvert = isModuleUnlocked(module.week, module.dayIdx, academy);
          const pct = record ? Math.round((record.score / record.total) * 100) : null;

          return (
            <div
              key={module.id}
              className={`${styles.libraryModule} ${!ouvert ? styles.libraryModuleLocked : ''}`}
            >
              <span className={styles.libraryModuleWeek}>S{module.week}</span>
              <div className={styles.libraryModuleBody}>
                <h3 className={styles.libraryModuleTitle}>{module.title}</h3>
                {record ? (
                  <p className={styles.libraryModuleMeta}>
                    <Calendar size={12} /> Validé le {record.completedAt}
                  </p>
                ) : (
                  <p className={styles.libraryModuleMeta}>
                    {ouvert ? 'Quiz disponible, fiches à débloquer' : `Ouvre en semaine ${module.week}`}
                  </p>
                )}
              </div>

              {record && (
                <span className={`${styles.libraryFichePct} ${pct >= 80 ? styles.scoreGood : pct >= 50 ? styles.scoreMid : styles.scoreLow}`}>
                  {pct}%
                </span>
              )}

              {!ouvert && <Lock size={16} className={styles.libraryModuleLock} />}
              {ouvert && (
                <Button
                  variant={record ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={() => onOpenModule(module.id, record ? 'flashcards' : 'quiz')}
                >
                  {record ? <><Layers size={14} /> Fiches mémo</> : <>Faire le quiz <ChevronRight size={14} /></>}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Vue module - 3 sous-onglets (Quiz / Fiches mémo / Guide).
   Style "Le Grand Livret" (thème éditorial papier + violet).
   ═══════════════════════════════════════════════════════════════ */

/* Tampon "VALIDÉ / À REVOIR" apposé après une réponse. */
function StampSeal({ ok }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.livretStamp} ${ok ? styles.stampOK : styles.stampKO}`}
    >
      <div className={styles.stampInner}>{ok ? 'VALIDÉ' : 'À REVOIR'}</div>
    </div>
  );
}

/* ── Sous-onglet Quiz du module ──────────────────────────── */
function ModuleQuizView({ day, existingRecord, onSubmit }) {
  const [idx, setIdx]           = useState(0);
  const [answers, setAnswers]   = useState({});
  const [showResults, setShow]  = useState(!!existingRecord);

  /* Si on ré-ouvre un module déjà complété, on affiche direct le récap. */
  useEffect(() => {
    if (existingRecord) setShow(true);
  }, [existingRecord]);

  const total = day.questions.length;
  const current = day.questions[idx];
  const answered = idx in answers;

  const restart = () => {
    setIdx(0);
    setAnswers({});
    setShow(false);
  };

  const select = (optIdx) => {
    if (idx in answers) return;
    setAnswers((a) => ({ ...a, [idx]: optIdx }));
  };

  const next = () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
      return;
    }
    onSubmit(answers);
    setShow(true);
  };

  /* ── Récap (vue post-quiz ou consultation d'une fiche déjà complétée) ── */
  if (showResults) {
    const record = existingRecord || {
      score: day.questions.filter((q, i) => answers[i] === q.correct).length,
      total,
      details: day.questions.map((q, i) => ({
        question: q.q,
        userAnswer: q.options[answers[i]],
        correctAnswer: q.options[q.correct],
        isCorrect: answers[i] === q.correct,
        rationale: q.rationale,
      })),
    };
    const pct = Math.round((record.score / record.total) * 100);
    return (
      <div className={styles.livretResults}>
        <div className={styles.livretResultsCard}>
          <p className={styles.livretMono}>Relevé de fin de session</p>
          <h2 className={styles.livretResultsTitle}>Ta fiche mémoire</h2>
          <div className={styles.livretScore}>{record.score}<span>/ {record.total}</span></div>
          <p className={styles.livretResultsMsg}>
            {pct >= 80 ? 'Excellent ! Concept maîtrisé.'
              : pct >= 50 ? 'Bien, mais quelques concepts à revoir.'
              : 'Prends le temps de revoir la fiche mémo et le guide avant de refaire ce module.'}
          </p>
          <div className={styles.livretResultsActions}>
            <Button variant="primary" size="md" onClick={restart}>
              <RotateCw size={16} /> Refaire le quiz
            </Button>
          </div>
        </div>
        <div className={styles.livretReview}>
          {record.details.map((it, i) => (
            <div key={i} className={`${styles.livretReviewItem} ${it.isCorrect ? styles.livretReviewOK : styles.livretReviewKO}`}>
              <p className={styles.livretMono}>Entrée n°{String(i + 1).padStart(2, '0')}</p>
              <p className={styles.livretReviewQ}>{it.question}</p>
              <p className={styles.livretReviewLine}><strong>Ta réponse :</strong> {it.userAnswer ?? 'Aucune'}</p>
              {!it.isCorrect && (
                <p className={styles.livretReviewLine}><strong>Bonne réponse :</strong> {it.correctAnswer}</p>
              )}
              <div className={styles.livretReviewRationale}>
                <strong>Explication</strong>
                <p>{it.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Question courante ── */
  return (
    <div className={styles.livretQuiz}>
      <div className={styles.livretQuizHead}>
        <span className={styles.livretMono}>Entrée {idx + 1} / {total}</span>
        <div className={styles.livretTicks}>
          {day.questions.map((_, i) => (
            <span
              key={i}
              className={`${styles.livretTick} ${i === idx ? styles.livretTickCurrent : (i in answers ? styles.livretTickDone : '')}`}
            />
          ))}
        </div>
      </div>
      <h2 className={styles.livretQuestion}>{current.q}</h2>
      <div className={styles.livretOptions} role="radiogroup">
        {current.options.map((opt, optIdx) => {
          const selected = answers[idx] === optIdx;
          const isCorrect = optIdx === current.correct;
          let state = '';
          if (answered) {
            if (isCorrect) state = styles.optionCorrect;
            else if (selected) state = styles.optionIncorrect;
            else state = styles.optionMuted;
          } else if (selected) {
            state = styles.optionSelected;
          }
          return (
            <button
              key={optIdx}
              role="radio"
              aria-checked={selected}
              disabled={answered}
              onClick={() => select(optIdx)}
              className={`${styles.livretOption} ${state}`}
            >
              <span className={styles.livretOptionMark}>
                {answered && isCorrect && <Check size={13} strokeWidth={3} />}
                {answered && !isCorrect && selected && <X size={13} strokeWidth={3} />}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={styles.livretRationale}>
          <StampSeal ok={answers[idx] === current.correct} />
          <div>
            <strong>Explication</strong>
            <p>{current.rationale}</p>
          </div>
        </div>
      )}
      <div className={styles.livretFooter}>
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className={styles.linkBtn}
        >
          <ChevronLeft size={16} /> Précédent
        </button>
        <Button variant="primary" size="md" onClick={next} disabled={!answered}>
          {idx === total - 1 ? 'Valider mon score' : 'Suivant'} <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

/* ── Sous-onglet Fiches mémo ─────────────────────────────── */
/* Les fiches sont TOUJOURS celles du module affiché : rédigées à la main
   quand elles existent (semaines 1 et 2), dérivées de ses propres questions
   sinon (cf. fichesDuModule dans memo.js). Il n'y a plus de corpus global de
   repli : c'est lui qui servait les mêmes treize fiches génériques sur 144
   modules, quel que soit le quiz qu'on venait de passer. */
const shuffleFlashcards = (list) => {
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
};

function ModuleFlashcardsView({ cards }) {
  const [order, setOrder]     = useState(() => cards.map((c) => c.id));
  const [filter, setFilter]   = useState('all');
  const [mastery, setMastery] = useState({});
  const [index, setIndex]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const sceneRef = useRef(null);

  const cardsById = useMemo(() => Object.fromEntries(cards.map((c) => [c.id, c])), [cards]);

  const visible = useMemo(() => {
    if (filter === 'all') return order;
    return order.filter((id) => (mastery[id] || 'review') === filter);
  }, [order, filter, mastery]);

  useEffect(() => { setIndex(0); setFlipped(false); }, [filter]);
  useEffect(() => {
    if (index >= visible.length && visible.length > 0) setIndex(visible.length - 1);
  }, [visible, index]);

  const known      = cards.filter((c) => mastery[c.id] === 'known').length;
  const reviewN    = cards.length - known;
  const pctKnown   = cards.length ? Math.round((known / cards.length) * 100) : 0;
  const current    = visible.length > 0 ? cardsById[visible[index]] : null;

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (visible.length ? (i + 1) % visible.length : 0));
  }, [visible.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (visible.length ? (i - 1 + visible.length) % visible.length : 0));
  }, [visible.length]);

  const onShuffle = () => {
    setOrder(shuffleFlashcards(order));
    setIndex(0);
    setFlipped(false);
  };

  const mark = (status) => {
    if (!current) return;
    setMastery((m) => ({ ...m, [current.id]: status }));
    setTimeout(goNext, 120);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped((f) => !f); }
  };

  const filters = [
    { id: 'all',    label: `Toutes (${cards.length})` },
    { id: 'review', label: `À revoir (${reviewN})` },
    { id: 'known',  label: `Connues (${known})` },
  ];

  return (
    <div className={styles.flashWrap}>
      <div className={styles.flashProgress}>
        <div className={styles.flashProgressMeta}><span>Maîtrisées</span><span>{pctKnown}%</span></div>
        <div className={styles.flashProgressBar}>
          <div className={styles.flashProgressFill} style={{ width: `${pctKnown}%` }} />
        </div>
      </div>

      <div className={styles.flashFilters}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`${styles.flashFilter} ${filter === f.id ? styles.flashFilterActive : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!current ? (
        <div className={styles.flashEmpty}>
          <p className={styles.flashEmptyTitle}>Rien à afficher ici</p>
          <p>{filter === 'review' ? 'Bravo, toutes les fiches sont marquées comme connues !' : 'Aucune fiche dans cette catégorie.'}</p>
        </div>
      ) : (
        <>
          <div className={styles.flashCount}>Fiche {index + 1} / {visible.length}</div>
          <div
            ref={sceneRef}
            tabIndex={0}
            role="button"
            aria-label={`Carte mémo : ${flipped ? 'définition' : 'terme'}. Entrée pour retourner.`}
            onKeyDown={onKey}
            onClick={() => setFlipped((f) => !f)}
            className={styles.flipScene}
          >
            <div className={`${styles.flipCard} ${flipped ? styles.flipCardFlipped : ''}`}>
              <div className={`${styles.flipFace} ${styles.flipFront}`}>
                <RotateCw size={16} className={styles.flipHint} />
                <p className={styles.livretMono}>
                  {current.type === 'question' ? 'Question' : 'Terme'}
                </p>
                <h3 className={`${styles.flipText} ${current.front.length > 70 ? styles.flipTextLong : ''}`}>
                  {current.front}
                </h3>
                <p className={styles.flipFooter}>Cliquez ou appuyez sur Entrée pour voir la définition</p>
              </div>
              <div className={`${styles.flipFace} ${styles.flipBack}`}>
                <p className={styles.livretMono}>Définition</p>
                <p className={styles.flipBackText}>{current.back}</p>
                {/* Les fiches dérivées d'un quiz portent la réponse au recto
                    du verso et l'explication en dessous ; les fiches rédigées
                    à la main n'ont pas ce second niveau. */}
                {current.detail && (
                  <p className={styles.flipBackDetail}>{current.detail}</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.flashActions}>
            <Button variant="ghost" size="sm" onClick={() => mark('review')}>
              <RotateCw size={14} /> À revoir
            </Button>
            <Button variant="ghost" size="sm" onClick={() => mark('known')}>
              <Check size={14} /> Je connais
            </Button>
          </div>
          <div className={styles.flashNav}>
            <button onClick={goPrev} className={styles.flashNavBtn} aria-label="Précédente"><ChevronLeft size={18} /></button>
            <button onClick={onShuffle} className={styles.flashNavBtn} aria-label="Mélanger"><Shuffle size={18} /></button>
            <button onClick={goNext} className={styles.flashNavBtn} aria-label="Suivante"><ChevronRight size={18} /></button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Guide hebdomadaire ──────────────────────────────────────────────────
   Remplace l'ancien guide quotidien, qui répétait le même contenu générique
   sur les six modules d'une semaine. Le guide est désormais MACRO : il relie
   entre eux les six sujets de la semaine et en dégage le concept général,
   là où les fiches mémo restent MICRO, rattachées à une question de quiz.
   Publié le samedi, une fois les six modules sortis.

   Deux formats cohabitent :
     - le guide RÉDIGÉ (WEEK_GUIDES), qui dégage un fil rouge entre les six
       thèmes. Écrit pour les semaines 1 et 2 ;
     - le RÉCAP dérivé (recapDeLaSemaine), construit à partir des questions
       réellement posées dans la semaine. Il couvre les 24 autres semaines,
       qui n'affichaient jusqu'ici qu'un « guide en cours de rédaction »,
       autant dire rien, le samedi venu. */

/* Questions des six modules d'une semaine, pour le récap. Un seul chunk est
   téléchargé : loadWeekQuestions renvoie la semaine entière, et le cache de
   weeks.js évite de la reprendre à chaque ouverture. */
function useWeekQuestions(weekN) {
  /* La semaine chargée est stockée AVEC son numéro, et l'état « en cours de
     chargement » se déduit de la comparaison. Remettre l'état à null en tête
     d'effet, comme le fait useModuleQuestions, déclencherait un rendu en
     cascade à chaque changement de semaine. */
  const [charge, setCharge] = useState({ weekN: null, parModule: null });

  useEffect(() => {
    if (!weekN) return;
    let vivant = true;
    loadWeekQuestions(weekN)
      .then((q) => { if (vivant) setCharge({ weekN, parModule: q ?? {} }); })
      .catch((err) => {
        console.error('[Academy] chargement du récap hebdomadaire', err);
        if (vivant) setCharge({ weekN, parModule: {} });
      });
    return () => { vivant = false; };
  }, [weekN]);

  return charge.weekN === weekN ? charge.parModule : null;
}

function WeekGuideView({ weekN, onBack }) {
  const redige = WEEK_GUIDES[weekN];
  /* Le récap n'est construit que si aucun guide n'est rédigé : inutile de
     charger 60 questions pour les semaines qui ont leur texte. */
  const parModule = useWeekQuestions(redige ? null : weekN);
  const recap = useMemo(
    () => (redige || !parModule ? null : recapDeLaSemaine(weekN, WEEKS[weekN] ?? [], parModule)),
    [redige, parModule, weekN],
  );
  const guide = redige;

  return (
    <div className={styles.guideWrap}>
      <button className={styles.guideBack} onClick={onBack}>
        <ChevronLeft size={16} /> Retour à ma semaine
      </button>

      <header className={styles.guideHeader}>
        <p className={styles.livretMono}>
          {guide ? 'Guide hebdomadaire' : 'Récap de la semaine'} · Semaine {weekN}
        </p>
        <h2 className={styles.guideTitle}>
          {guide ? guide.title : (recap?.title ?? `Semaine ${weekN}`)}
        </h2>
        <p className={styles.guideSub}>
          {guide
            ? 'Le récap macro de ta semaine, publié chaque samedi'
            : 'Ce que tes six quiz de la semaine ont posé, publié chaque samedi'}
        </p>
      </header>

      {/* Trois cas : un guide rédigé, un récap dérivé des six quiz, ou une
          semaine dont le corpus n'existe pas encore. */}
      {!guide && !recap ? (
        <p className={styles.guideText}>
          {parModule === null
            ? 'Chargement du récap…'
            : "Les quiz de cette semaine ne sont pas encore publiés : il n'y a rien à récapituler pour l'instant."}
        </p>
      ) : !guide ? (
        <>
          <section>
            <p className={styles.guideIntro}>{recap.intro}</p>
          </section>

          {recap.sections.map((module) => (
            <section key={module.id} className={styles.recapModule}>
              <h3 className={styles.guideSectionTitle}>
                <span className={styles.recapDay}>{module.dayName}</span>
                {module.title}
              </h3>
              <p className={styles.recapTheme}>{module.theme}</p>
              <dl className={styles.recapPoints}>
                {module.points.map((point) => (
                  <div key={point.question} className={styles.recapPoint}>
                    <dt className={styles.recapQuestion}>{point.question}</dt>
                    <dd className={styles.recapAnswer}>{point.reponse}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </>
      ) : (
        <>
          <section>
            <p className={styles.guideIntro}>{guide.intro}</p>
          </section>

          {guide.sections.map((sec, i) => (
            <section key={sec.title}>
              <h3 className={styles.guideSectionTitle}>
                <span className={styles.guidePrincipleNum}>{String(i + 1).padStart(2, '0')}</span>
                {sec.title}
              </h3>
              <p className={styles.guideText}>{sec.body}</p>
            </section>
          ))}

          <section className={styles.guideTakeaway}>
            <p className={styles.guideTakeawayLabel}>À retenir</p>
            <p className={styles.guideTakeawayText}>{guide.takeaway}</p>
          </section>

          <section>
            <h3 className={styles.guideSectionTitle}>Principes transverses</h3>
            <div className={styles.guidePrinciples}>
              {KEY_PRINCIPLES.map((p, i) => (
                <div key={p.title} className={styles.guidePrinciple}>
                  <span className={styles.guidePrincipleNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={styles.guidePrincipleTitle}>{p.title}</p>
                    <p className={styles.guidePrincipleBody}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
