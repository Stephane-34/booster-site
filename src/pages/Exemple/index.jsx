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

import { useState, useMemo } from 'react';
import {
  BookOpen, ChevronRight, CheckCircle, Lock, Unlock, Clock, RotateCcw,
  Trophy, TrendingUp, Calendar, Target, Gift, Library, PlayCircle, FileText,
  HelpCircle, Sparkles, Route, GraduationCap, LineChart,
} from 'lucide-react';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { PROGRAM_52, MOCK_PLAYERS, WEEK_1 } from './data';
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
  const [activeQuizId, setActiveQuiz] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [view, setView] = useState('dashboard'); // dashboard | quiz | summary | leaderboard
  const [summary, setSummary] = useState(null);

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

  const startQuiz = (id) => {
    setActiveQuiz(id);
    setQIndex(0);
    setAnswers({});
    setView('quiz');
  };

  const handleAnswer = (idx) => setAnswers((a) => ({ ...a, [qIndex]: idx }));

  const nextQuestion = () => {
    const day = WEEK_1.find((d) => d.id === activeQuizId);
    if (qIndex < day.questions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      finishQuiz(day);
    }
  };

  const finishQuiz = (day) => {
    let score = 0;
    const details = day.questions.map((q, i) => {
      const ok = answers[i] === q.correct;
      if (ok) score++;
      return {
        question: q.q,
        userAnswer: q.options[answers[i]],
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
    setView('dashboard');
  };

  const viewSummary = (id) => {
    const day = WEEK_1.find((d) => d.id === id);
    setSummary({ day, record: completed[id] });
    setView('summary');
  };

  /* ── Sous-vues ── */
  if (view === 'quiz') {
    const day = WEEK_1.find((d) => d.id === activeQuizId);
    const q = day.questions[qIndex];
    const answered = answers[qIndex] !== undefined;
    return (
      <div className={styles.dashWrap}>
        <div className={styles.quizHeader}>
          <button onClick={() => setView('dashboard')} className={styles.linkBtn}>← Quitter</button>
          <div className={styles.quizProgress}>
            {day.questions.map((_, i) => (
              <span key={i} className={`${styles.quizTick} ${i <= qIndex ? styles.quizTickDone : ''}`} />
            ))}
          </div>
        </div>
        <div className={styles.quizCard}>
          <p className={styles.quizTheme}>{day.theme}</p>
          <h3 className={styles.quizQuestion}>{q.q}</h3>
          <div className={styles.quizOptions}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`${styles.quizOption} ${answers[qIndex] === idx ? styles.quizOptionActive : ''}`}
              >
                <span className={styles.quizOptionDot} />
                <span>{opt}</span>
              </button>
            ))}
          </div>
          <div className={styles.quizFooter}>
            <Button variant="primary" size="md" onClick={nextQuestion} disabled={!answered}>
              {qIndex < day.questions.length - 1 ? 'Question suivante' : 'Valider & voir le score'}
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'summary' && summary) {
    const { day, record } = summary;
    const pct = Math.round((record.score / record.total) * 100);
    return (
      <div className={styles.dashWrap}>
        <button onClick={() => setView('dashboard')} className={styles.linkBtn}>← Retour au programme</button>
        <div className={styles.summaryHeader}>
          <div>
            <p className={styles.summaryDate}><Calendar size={14} /> Validé le {record.completedAt}</p>
            <h2 className={styles.summaryTitle}>Fiche mémoire — {day.title}</h2>
            <p className={styles.summarySub}>{day.theme}</p>
          </div>
          <div className={styles.summaryScore}>
            <Target size={20} />
            <span className={styles.summaryScoreLabel}>Précision</span>
            <span className={`${styles.summaryScoreValue} ${pct >= 80 ? styles.scoreGood : pct >= 50 ? styles.scoreMid : styles.scoreLow}`}>
              {pct}%
            </span>
          </div>
        </div>
        <div className={styles.summaryItems}>
          {record.details.map((it, idx) => (
            <div key={idx} className={styles.summaryItem}>
              <h4 className={styles.summaryItemTitle}><span className={styles.summaryItemNum}>{idx + 1}.</span> {it.question}</h4>
              <div className={styles.summaryAnswers}>
                <div className={`${styles.summaryAnswer} ${it.isCorrect ? styles.answerGood : styles.answerBad}`}>
                  <span className={styles.answerLabel}>Votre réponse</span>
                  <span>{it.userAnswer}</span>
                </div>
                {!it.isCorrect && (
                  <div className={`${styles.summaryAnswer} ${styles.answerGood}`}>
                    <span className={styles.answerLabel}>La bonne réponse</span>
                    <span>{it.correctAnswer}</span>
                  </div>
                )}
              </div>
              <div className={styles.summaryRationale}>
                <span className={styles.rationaleLabel}><BookOpen size={14} /> L'explication Booster</span>
                <p>{it.rationale}</p>
              </div>
            </div>
          ))}
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
                <Button variant="primary" size="md" onClick={() => startQuiz(day.id)} className={styles.moduleBtn}>
                  Démarrer le module <ChevronRight size={16} />
                </Button>
              )}
              {status === 'completed' && (
                <Button variant="ghost" size="md" onClick={() => viewSummary(day.id)} className={styles.moduleBtn}>
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
