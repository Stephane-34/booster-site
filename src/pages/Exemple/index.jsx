/* Page EXEMPLE — terrain de test pour comparer plusieurs UI Académie.
   Aucun lien avec l'Académie réelle (/academie) ; isolé volontairement.
   3 onglets :
   - Ma semaine en cours : dashboard quotidien avec déblocage jour par jour.
   - Programme 52 semaines : 4 phases dont 3 verrouillées selon la progression.
   - Bibliothèque : fiches mémoire acquises + vidéos et ressources (placeholders).
   Le state `completed` est remonté au parent pour être partagé entre onglets.

   ─── ALGORITHME DE DÉBLOCAGE ─────────────────────────────────
   Règle produit : chaque utilisateur suit les 52 semaines à SON rythme, à partir
   de sa date d'inscription. Personne ne rate le début : quelqu'un qui s'inscrit
   le 30 avril démarre au Jour 1 comme celui qui s'est inscrit le 10 janvier.
   Concrètement :
     - Le déblocage se fait en `daysPassed = (aujourd'hui − date_inscription)`,
       pas sur la date calendaire globale.
     - Un nouveau quizz devient disponible chaque jour à 00h, indépendamment
       du fait que l'utilisateur ait terminé (ou raté) celui de la veille.
     - Les modules manqués restent accessibles ; on ne "perd" jamais un module,
       on prend juste du retard sur son propre calendrier.
   En prod, `userStart` viendra du profil (created_at Supabase). Ici on utilise
   Date.now() au premier rendu + un bouton "+24h" pour tester la mécanique. */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  BookOpen, ChevronRight, ChevronLeft, CheckCircle, Lock, Unlock, Clock, RotateCcw,
  Trophy, TrendingUp, Calendar, Target, Gift, Library, PlayCircle, FileText,
  HelpCircle, Sparkles, Route, GraduationCap, LineChart,
  Check, X, CheckSquare, Layers, RotateCw, Shuffle,
} from 'lucide-react';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { PROGRAM_52, MOCK_PLAYERS, WEEK_1, FLASHCARDS, KEY_PRINCIPLES } from './data';
import styles from './Exemple.module.css';

const DAY_MS = 24 * 60 * 60 * 1000;

export default function Exemple() {
  const [section, setSection] = useState('week');

  /* State partagé entre onglets : la progression de l'utilisateur (démo)
     conditionne à la fois l'affichage du dashboard, le déblocage des phases
     du programme, et le contenu de la bibliothèque. */
  const [userStart, setUserStart] = useState(() => Date.now());
  const [simulated, setSimulated] = useState(() => Date.now());
  const [completed, setCompleted] = useState({});

  const daysPassed = Math.floor((simulated - userStart) / DAY_MS);
  const simulateDay = () => setSimulated((s) => s + DAY_MS);
  const resetDemo = () => {
    const now = Date.now();
    setUserStart(now);
    setSimulated(now);
    setCompleted({});
  };

  const completedCount = Object.keys(completed).length;
  const globalScore = useMemo(() => {
    const vals = Object.values(completed);
    if (vals.length === 0) return 0;
    const sum = vals.reduce((acc, q) => acc + q.score, 0);
    const max = vals.reduce((acc, q) => acc + q.total, 0);
    return max === 0 ? 0 : Math.round((sum / max) * 100);
  }, [completed]);

  const sections = [
    { id: 'week',    label: 'Ma semaine en cours',    icon: Trophy },
    { id: 'program', label: 'Programme 52 semaines',  icon: Calendar },
    { id: 'library', label: 'Bibliothèque',           icon: Library },
    { id: 'help',    label: 'Aide',                   icon: HelpCircle },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.pageHeader}>
          <Badge variant="primary">Aperçu — terrain de test</Badge>
          <h1 className={styles.pageTitle}>
            Académie : <span className="gradient-text">comparer les concepts</span>
          </h1>
          <p className={styles.pageIntro}>
            Terrain de test isolé pour valider l'UX de la future Académie avant intégration.
            Ta progression sur "Ma semaine en cours" débloque les phases suivantes du programme
            et alimente ta bibliothèque.
          </p>
        </header>

        <nav className={styles.tabs} role="tablist" aria-label="Sections de l'aperçu">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={section === id}
              onClick={() => setSection(id)}
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
              userStart={userStart} simulated={simulated} completed={completed}
              setCompleted={setCompleted} daysPassed={daysPassed}
              simulateDay={simulateDay} resetDemo={resetDemo}
            />
          )}
          {section === 'program' && (
            <ProgramSection completedCount={completedCount} globalScore={globalScore} />
          )}
          {section === 'library' && (
            <BibliothequeSection completed={completed} onGoToWeek={() => setSection('week')} />
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
      body: "Personne ne rate le début : que tu t'inscrives le 10 janvier ou le 30 avril, tu commences par la Semaine 1 · Lundi. Ton calendrier est personnel — il ne dépend pas d'un rythme calendaire commun à tous les utilisateurs.",
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
      body: "Chaque quiz complété devient une fiche mémoire archivée dans ta bibliothèque personnelle. Tu y retrouves aussi les vidéos courtes (3 à 6 min) et les documents pratiques (checklists, simulateurs) pour approfondir ou réviser à ton rythme.",
      action: { label: 'Voir ma bibliothèque', to: 'library' },
    },
    {
      icon: LineChart,
      title: '6 · Classement et moyenne mobile 3 mois',
      body: "Ta performance est calculée sur les 90 derniers jours (moyenne mobile) — un mauvais début n'écrase donc pas ta progression sur la durée. Les 10 premiers du classement hebdomadaire reçoivent une récompense exclusive.",
    },
  ];

  const faqs = [
    {
      q: "Que se passe-t-il si je rate plusieurs jours d'affilée ?",
      a: "Rien de grave — les modules manqués restent accessibles. Tu peux les rattraper à ton rythme, en parallèle du module du jour qui, lui, continue à se débloquer à minuit.",
    },
    {
      q: "Est-ce que je peux avancer plus vite que le calendrier ?",
      a: "Non, volontairement. Le rythme d'un module par jour est pensé pour laisser le temps à la mémorisation. On préfère 15 minutes tous les jours à 3 heures une fois par semaine.",
    },
    {
      q: "Que devient mon score si je refais un quiz ?",
      a: "Ton meilleur score sur les 90 derniers jours est conservé. Refaire un module que tu as raté est encouragé — c'est même la meilleure manière de sécuriser un concept.",
    },
    {
      q: "Puis-je consulter les futurs modules à l'avance ?",
      a: "Non pour les quiz (verrouillés jour par jour), oui pour la carte globale du programme — tu peux la parcourir à tout moment depuis l'onglet « Programme 52 semaines » pour savoir ce qui t'attend.",
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
            d'apprentissage — avec, en bas, les questions les plus courantes.
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
/* Seuils de déblocage — pensés pour être atteignables dans la démo :
   la Semaine 1 compte 6 modules, on débloque au fur et à mesure. */
const PHASE_UNLOCK_RULES = {
  p1: () => ({ unlocked: true }),
  p2: ({ completedCount }) => ({
    unlocked: completedCount >= 3,
    requirement: `Valide ${Math.max(3 - completedCount, 0)} module${completedCount >= 2 ? '' : 's'} supplémentaire${completedCount >= 2 ? '' : 's'} de ta semaine (${completedCount}/3 fait).`,
  }),
  p3: ({ completedCount }) => ({
    unlocked: completedCount >= 6,
    requirement: `Termine ta première semaine complète (${completedCount}/6 modules validés).`,
  }),
  p4: ({ completedCount, globalScore }) => ({
    unlocked: completedCount >= 6 && globalScore >= 80,
    requirement: completedCount < 6
      ? `Termine d'abord la Semaine 1 (${completedCount}/6 modules).`
      : `Atteins 80 % de score global (actuellement ${globalScore} %).`,
  }),
};

function ProgramSection({ completedCount, globalScore }) {
  const phasesWithState = PROGRAM_52.map((p) => ({
    ...p,
    ...PHASE_UNLOCK_RULES[p.id]({ completedCount, globalScore }),
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

/* ─── Section "Ma semaine en cours" ───────────────────────── */
function DashboardSection({ userStart, simulated, completed, setCompleted, daysPassed, simulateDay, resetDemo }) {
  const [activeModuleId, setActiveModule] = useState(null);
  /* Sous-onglets à l'intérieur d'un module ouvert :
     - quiz : les questions du jour (style Grand Livret) + récap après complétion
     - flashcards : les fiches mémo du corpus global
     - guide : synthèse pédagogique (résumé + principes + glossaire)
     Voir choix "C" du brief : quiz spécifique par module, fiches/guide partagés. */
  const [moduleTab, setModuleTab] = useState('quiz');
  const [view, setView] = useState('dashboard'); // dashboard | module | leaderboard

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

  /* Statut d'un module de la semaine — la seule chose qui compte pour
     débloquer, c'est le nombre de jours écoulés depuis l'inscription. On ne
     regarde JAMAIS si le module de la veille a été complété : cf. règle
     produit "un nouveau quizz débloqué chaque jour à 00h, quoi qu'il arrive". */
  const dayStatus = (i, id) => {
    if (completed[id]) return 'completed';
    if (i <= daysPassed) return 'unlocked';
    return 'locked';
  };

  const openModule = (id) => {
    setActiveModule(id);
    setModuleTab('quiz');
    setView('module');
  };

  /* Enregistrement du résultat d'un quiz — on garde la même forme dans
     `completed` (title/theme/details/score) pour que la Bibliothèque et
     le récap continuent de fonctionner sans changement. */
  const saveQuizResult = (day, results) => {
    let score = 0;
    const details = day.questions.map((q, i) => {
      const ok = results[i] === q.correct;
      if (ok) score++;
      return {
        question: q.q,
        userAnswer: q.options[results[i]],
        correctAnswer: q.options[q.correct],
        isCorrect: ok,
        rationale: q.rationale,
      };
    });
    setCompleted((c) => ({
      ...c,
      [day.id]: {
        score,
        total: day.questions.length,
        details,
        timestamp: simulated,
        completedAt: new Date(simulated).toLocaleDateString('fr-FR'),
        title: day.title,
        theme: day.theme,
      },
    }));
  };

  /* ── Vue module (ouverte au clic sur un module de la semaine) ── */
  if (view === 'module') {
    const day = WEEK_1.find((d) => d.id === activeModuleId);
    const existingRecord = completed[day.id]; // récap si déjà complété
    const moduleTabs = [
      { id: 'quiz',       label: 'Quiz du jour',  icon: CheckSquare },
      { id: 'flashcards', label: 'Fiches mémo',   icon: Layers },
      { id: 'guide',      label: 'Guide',         icon: BookOpen },
    ];
    return (
      <div className={styles.dashWrap}>
        <div className={styles.moduleTopbar}>
          <button onClick={() => setView('dashboard')} className={styles.linkBtn}>
            <ChevronLeft size={16} /> Retour à ma semaine
          </button>
          <div className={styles.moduleTopbarMeta}>
            <span className={styles.moduleTopbarDay}>{day.dayName}</span>
            <span className={styles.moduleTopbarTheme}>{day.theme}</span>
          </div>
        </div>

        <div className={styles.livretRoot}>
          <header className={styles.livretHeader}>
            <div className={styles.livretPlate}><BookOpen size={22} /></div>
            <div>
              <p className={styles.livretBrand}>{day.title}</p>
              <p className={styles.livretSub}>Module {day.dayName.toLowerCase()} · {day.theme}</p>
            </div>
          </header>

          <div className={styles.livretTabs}>
            {moduleTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setModuleTab(id)}
                className={`${styles.livretTab} ${moduleTab === id ? styles.livretTabActive : ''}`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <div className={styles.livretBody}>
            {moduleTab === 'quiz' && (
              <ModuleQuizView
                day={day}
                existingRecord={existingRecord}
                onSubmit={(results) => saveQuizResult(day, results)}
              />
            )}
            {moduleTab === 'flashcards' && <ModuleFlashcardsView />}
            {moduleTab === 'guide'      && <ModuleGuideView theme={day.theme} title={day.title} />}
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

  /* Semaine du programme atteinte : 6 modules par semaine (Lun→Sam),
     donc floor(daysPassed / 6) + 1 = numéro de la semaine en cours. */
  const currentWeek = Math.floor(daysPassed / 6) + 1;

  return (
    <div className={styles.dashWrap}>
      <div className={styles.dashTop}>
        <div className={styles.dashHero}>
          <p className={styles.dashHeroEyebrow}>Ton parcours personnel</p>
          <h2 className={styles.dashHeroTitle}>
            Jour <span className={styles.dashHeroBig}>{daysPassed + 1}</span> de ta formation
          </h2>
          <p className={styles.dashHeroSub}>
            Tu es en <strong>Semaine {currentWeek}</strong> — quel que soit ton jour d'inscription,
            tu démarres au début et tu avances à ton rythme. Un nouveau module se débloque
            chaque jour à minuit, même si tu n'as pas fini celui de la veille.
          </p>
          <div className={styles.simBlock}>
            <Clock size={18} />
            <div className={styles.simInfo}>
              <span className={styles.simLabel}>Simulateur (démo)</span>
              <span className={styles.simValue}>+ 24h fait avancer d'un jour ta formation</span>
            </div>
            <Button variant="ghost" size="sm" onClick={simulateDay}>+24h (minuit)</Button>
          </div>
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

      <div className={styles.dashActions}>
        <Button variant="ghost" size="sm" onClick={resetDemo}>
          <RotateCcw size={14} /> Reset démo
        </Button>
      </div>

      <div className={styles.modulesGrid}>
        {WEEK_1.map((day, i) => {
          const status = dayStatus(i, day.id);
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
                <Button variant="primary" size="md" onClick={() => openModule(day.id)} className={styles.moduleBtn}>
                  Démarrer le module <ChevronRight size={16} />
                </Button>
              )}
              {status === 'completed' && (
                <Button variant="ghost" size="md" onClick={() => openModule(day.id)} className={styles.moduleBtn}>
                  <BookOpen size={14} /> Consulter la fiche
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section Bibliothèque ────────────────────────────────── */
/* Contenu volontairement en 3 rubriques distinctes pour donner un aperçu :
   - Fiches acquises : agrégation dynamique des quiz complétés (state parent).
   - Vidéos, Documents : placeholders pour visualiser le principe. */
const LIBRARY_VIDEOS = [
  { title: "Les intérêts composés en 3 minutes",        author: 'Booster', duration: '3:24', theme: 'Placement' },
  { title: "Comprendre le PFU (flat tax) sans jargon",  author: 'Booster', duration: '5:12', theme: 'Fiscalité' },
  { title: "Retraite : 3 idées reçues à démonter",      author: 'Booster', duration: '4:48', theme: 'Retraite' },
  { title: "Faut-il acheter ou louer ? Le vrai calcul", author: 'Booster', duration: '6:20', theme: 'Immobilier' },
];

const LIBRARY_DOCS = [
  { title: 'Checklist "Ma première assurance vie"',         type: 'PDF', pages: 4 },
  { title: 'Modèle de budget mensuel (règle 50/30/20)',     type: 'XLS', pages: 1 },
  { title: 'Guide "Comprendre son bulletin de salaire"',    type: 'PDF', pages: 8 },
  { title: 'Simulateur "Apport pour mon 1er achat"',        type: 'XLS', pages: 2 },
];

function BibliothequeSection({ completed, onGoToWeek }) {
  const fiches = Object.entries(completed).map(([id, rec]) => ({ id, ...rec }));

  return (
    <div className={styles.libraryWrap}>
      <p className={styles.sectionLead}>
        Toutes tes ressources d'apprentissage réunies au même endroit : les fiches mémoire de tes quiz validés,
        les vidéos courtes pour approfondir, et les documents pratiques à télécharger.
      </p>

      <section className={styles.librarySection}>
        <div className={styles.librarySectionHead}>
          <div>
            <h2 className={styles.librarySectionTitle}>
              <BookOpen size={20} /> Mes fiches mémoire acquises
            </h2>
            <p className={styles.librarySectionSub}>
              {fiches.length} fiche{fiches.length > 1 ? 's' : ''} validée{fiches.length > 1 ? 's' : ''} —
              se remplit à mesure que tu complètes tes modules quotidiens.
            </p>
          </div>
        </div>

        {fiches.length === 0 ? (
          <div className={styles.libraryEmpty}>
            <p className={styles.libraryEmptyTitle}>Ta bibliothèque est encore vide</p>
            <p className={styles.libraryEmptyText}>
              Valide un premier module quotidien pour voir sa fiche mémoire s'ajouter ici.
            </p>
            <Button variant="primary" size="md" onClick={onGoToWeek}>
              Aller sur "Ma semaine en cours" <ChevronRight size={16} />
            </Button>
          </div>
        ) : (
          <div className={styles.libraryGrid}>
            {fiches.map((f) => {
              const pct = Math.round((f.score / f.total) * 100);
              return (
                <div key={f.id} className={styles.libraryFiche}>
                  <div className={styles.libraryFicheHead}>
                    <span className={styles.libraryFicheTheme}>{f.theme}</span>
                    <span className={`${styles.libraryFichePct} ${pct >= 80 ? styles.scoreGood : pct >= 50 ? styles.scoreMid : styles.scoreLow}`}>
                      {pct}%
                    </span>
                  </div>
                  <h3 className={styles.libraryFicheTitle}>{f.title}</h3>
                  <p className={styles.libraryFicheDate}>
                    <Calendar size={12} /> Validé le {f.completedAt}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className={styles.librarySection}>
        <div className={styles.librarySectionHead}>
          <div>
            <h2 className={styles.librarySectionTitle}>
              <PlayCircle size={20} /> Vidéos courtes
            </h2>
            <p className={styles.librarySectionSub}>
              Format 3 à 6 minutes pour approfondir un concept sans engagement.
            </p>
          </div>
        </div>
        <div className={styles.libraryGrid}>
          {LIBRARY_VIDEOS.map((v) => (
            <div key={v.title} className={styles.libraryVideo}>
              <div className={styles.libraryVideoThumb}>
                <PlayCircle size={36} />
                <span className={styles.libraryVideoDuration}>{v.duration}</span>
              </div>
              <span className={styles.libraryFicheTheme}>{v.theme}</span>
              <h3 className={styles.libraryFicheTitle}>{v.title}</h3>
              <p className={styles.libraryVideoAuthor}>Par {v.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.librarySection}>
        <div className={styles.librarySectionHead}>
          <div>
            <h2 className={styles.librarySectionTitle}>
              <FileText size={20} /> Documents & simulateurs
            </h2>
            <p className={styles.librarySectionSub}>
              Ressources téléchargeables pour passer à l'action.
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

/* ═══════════════════════════════════════════════════════════════
   Vue module — 3 sous-onglets (Quiz / Fiches mémo / Guide).
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

/* ── Sous-onglet Fiches mémo (corpus global partagé) ─────── */
/* Le brief (choix C) : réutiliser le corpus FLASHCARDS pour tous les
   modules dans la démo — chaque module aura son propre corpus en prod. */
const shuffleFlashcards = (list) => {
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
};

function ModuleFlashcardsView() {
  const [order, setOrder]     = useState(() => FLASHCARDS.map((c) => c.id));
  const [filter, setFilter]   = useState('all');
  const [mastery, setMastery] = useState({});
  const [index, setIndex]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const sceneRef = useRef(null);

  const cardsById = useMemo(() => Object.fromEntries(FLASHCARDS.map((c) => [c.id, c])), []);

  const visible = useMemo(() => {
    if (filter === 'all') return order;
    return order.filter((id) => (mastery[id] || 'review') === filter);
  }, [order, filter, mastery]);

  useEffect(() => { setIndex(0); setFlipped(false); }, [filter]);
  useEffect(() => {
    if (index >= visible.length && visible.length > 0) setIndex(visible.length - 1);
  }, [visible, index]);

  const known      = FLASHCARDS.filter((c) => mastery[c.id] === 'known').length;
  const reviewN    = FLASHCARDS.length - known;
  const pctKnown   = Math.round((known / FLASHCARDS.length) * 100);
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
    { id: 'all',    label: `Toutes (${FLASHCARDS.length})` },
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
                <p className={styles.livretMono}>Terme</p>
                <h3 className={styles.flipText}>{current.front}</h3>
                <p className={styles.flipFooter}>Cliquez ou appuyez sur Entrée pour voir la définition</p>
              </div>
              <div className={`${styles.flipFace} ${styles.flipBack}`}>
                <p className={styles.livretMono}>Définition</p>
                <p className={styles.flipBackText}>{current.back}</p>
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

/* ── Sous-onglet Guide (corpus global partagé) ───────────── */
function ModuleGuideView({ theme, title }) {
  return (
    <div className={styles.guideWrap}>
      <header className={styles.guideHeader}>
        <p className={styles.livretMono}>Cahier d'étude · {theme}</p>
        <h2 className={styles.guideTitle}>{title}</h2>
        <p className={styles.guideSub}>Synthèse pédagogique du corpus Booster</p>
      </header>
      <section>
        <h3 className={styles.guideSectionTitle}><Layers size={18} /> Résumé</h3>
        <p className={styles.guideText}>
          Ce guide synthétise les concepts essentiels de finances personnelles : mécanismes de la
          croissance du capital, stratégies de protection contre les imprévus et l'inflation, et
          principes pour construire un portefeuille équilibré entre risque et rendement.
        </p>
      </section>
      <section>
        <h3 className={styles.guideSectionTitle}>Principes clés</h3>
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
      <section>
        <h3 className={styles.guideSectionTitle}>Glossaire</h3>
        <div className={styles.guideGlossary}>
          {FLASHCARDS.map((c) => (
            <div key={c.id} className={styles.guideTerm}>
              <span className={styles.guideTermFront}>{c.front}</span>
              <span className={styles.guideTermBack}>{c.back}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
