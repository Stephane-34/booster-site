/* Page EXEMPLE — terrain de test pour comparer plusieurs UI Académie.
   Aucun lien avec l'Académie réelle (/academie) ; isolé volontairement.
   3 concepts présentés bout à bout : programme 52 semaines, dashboard
   quotidien avec déblocage progressif, quiz fiscalité style "Grand Livret".
   Tout l'état est local — rien n'est persisté en base, juste localStorage. */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  BookOpen, CheckSquare, Layers, ChevronRight, ChevronLeft, RotateCw,
  RefreshCcw, Shuffle, Award, Check, X, CheckCircle, Lock, Unlock,
  Clock, RotateCcw, Trophy, TrendingUp, Calendar, Target, Gift, Sparkles,
} from 'lucide-react';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { PROGRAM_52, QUIZ_DATA, FLASHCARDS, KEY_PRINCIPLES, MOCK_PLAYERS, WEEK_1 } from './data';
import styles from './Exemple.module.css';

export default function Exemple() {
  const [section, setSection] = useState('intro');

  const sections = [
    { id: 'intro',     label: 'Présentation',  icon: Sparkles },
    { id: 'program',   label: 'Programme 52 semaines', icon: Calendar },
    { id: 'dashboard', label: 'Dashboard quotidien',   icon: Trophy },
    { id: 'livret',    label: 'Quiz Le Grand Livret',  icon: BookOpen },
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
            Cette page rassemble trois pistes d'UI pour la future Académie.
            Aucune n'est encore intégrée à l'existant — c'est un terrain de test
            pour comparer, garder ce qui marche, mixer ensuite avec l'Académie actuelle.
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
          {section === 'intro'     && <IntroSection />}
          {section === 'program'   && <ProgramSection />}
          {section === 'dashboard' && <DashboardSection />}
          {section === 'livret'    && <LivretSection />}
        </div>
      </div>
    </div>
  );
}

/* ─── Section 1 : présentation ────────────────────────────── */
function IntroSection() {
  const cards = [
    {
      tag: 'Concept A',
      title: 'Programme 52 semaines',
      text: "Cartographie complète d'une année d'apprentissage : 6 thématiques (placement, fiscalité, retraite, transmission, IARD, immobilier) × 52 semaines, découpées en 4 phases (Fondations, Structuration, Optimisation, Expertise).",
      icon: Calendar,
    },
    {
      tag: 'Concept B',
      title: 'Dashboard quotidien',
      text: "Un module se débloque chaque jour à minuit. L'utilisateur passe un quiz court, voit sa fiche mémoire après coup, et suit sa progression via une moyenne mobile sur 3 mois + un classement Top 10.",
      icon: Trophy,
    },
    {
      tag: 'Concept C',
      title: 'Quiz fiscalité — "Le Grand Livret"',
      text: "Approche carnet d'épargne : quiz approfondi, flashcards à retourner pour mémoriser les définitions, et un guide d'étude qui synthétise les principes clés. Style éditorial sobre.",
      icon: BookOpen,
    },
  ];

  return (
    <div className={styles.introGrid}>
      {cards.map(({ tag, title, text, icon: Icon }) => (
        <div key={tag} className={styles.introCard}>
          <div className={styles.introCardIcon}><Icon size={22} /></div>
          <span className={styles.introCardTag}>{tag}</span>
          <h3 className={styles.introCardTitle}>{title}</h3>
          <p className={styles.introCardText}>{text}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Section 2 : Programme 52 semaines ───────────────────── */
function ProgramSection() {
  const [openPhase, setOpenPhase] = useState(PROGRAM_52[0].id);
  const phase = PROGRAM_52.find((p) => p.id === openPhase);
  const days = ['Lundi (Placement)', 'Mardi (Fiscalité)', 'Mercredi (Retraite)', 'Jeudi (Transmission)', 'Vendredi (IARD & Prév.)', 'Samedi (Immobilier)'];

  return (
    <div className={styles.programWrap}>
      <p className={styles.sectionLead}>
        Quatre phases d'apprentissage pour transformer un novice en expert.
        Chaque semaine = un thème par jour, 6 jours sur 7. Sélectionne une phase ci-dessous.
      </p>

      <div className={styles.phasesNav}>
        {PROGRAM_52.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpenPhase(p.id)}
            className={`${styles.phaseBtn} ${openPhase === p.id ? styles.phaseBtnActive : ''}`}
          >
            <span className={styles.phaseNum}>0{i + 1}</span>
            <span className={styles.phaseName}>{p.name}</span>
            <span className={styles.phaseRange}>{p.range}</span>
          </button>
        ))}
      </div>

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
    </div>
  );
}

/* ─── Section 3 : Dashboard quotidien ─────────────────────── */
function DashboardSection() {
  const [userStart, setUserStart]     = useState(() => Date.now());
  const [simulated, setSimulated]     = useState(() => Date.now());
  const [completed, setCompleted]     = useState({});
  const [activeQuizId, setActiveQuiz] = useState(null);
  const [qIndex, setQIndex]           = useState(0);
  const [answers, setAnswers]         = useState({});
  const [view, setView]               = useState('dashboard'); // dashboard | quiz | summary | leaderboard
  const [summary, setSummary]         = useState(null);

  const dayMs        = 24 * 60 * 60 * 1000;
  const daysPassed   = Math.floor((simulated - userStart) / dayMs);
  const simulateDay  = () => setSimulated((s) => s + dayMs);
  const resetDemo    = () => {
    const now = Date.now();
    setUserStart(now);
    setSimulated(now);
    setCompleted({});
    setView('dashboard');
  };

  /* Moyenne mobile : seuls les quiz des 90 derniers jours (simulés) comptent.
     On évite ainsi qu'un mauvais score initial pèse à vie sur le classement. */
  const movingAvg = useMemo(() => {
    const ninetyDaysMs = 90 * dayMs;
    let sum = 0, max = 0;
    Object.values(completed).forEach((q) => {
      if (simulated - q.timestamp <= ninetyDaysMs) {
        sum += q.score;
        max += q.total;
      }
    });
    return max === 0 ? 0 : Math.round((sum / max) * 100);
  }, [completed, simulated]);

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

  /* ── Dashboard principal ── */
  return (
    <div className={styles.dashWrap}>
      <div className={styles.dashTop}>
        <div className={styles.dashHero}>
          <h2 className={styles.dashHeroTitle}>Semaine 1 : Les Fondations</h2>
          <p className={styles.dashHeroSub}>Un nouveau module se débloque chaque jour à minuit.</p>
          <div className={styles.simBlock}>
            <Clock size={18} />
            <div className={styles.simInfo}>
              <span className={styles.simLabel}>Date simulée</span>
              <span className={styles.simValue}>Jour n°{daysPassed + 1} ({new Date(simulated).toLocaleDateString('fr-FR')})</span>
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

/* ─── Section 4 : "Le Grand Livret" — quiz + flashcards + guide ─ */
const STORAGE_QUIZ    = 'exemple-livret-quiz';
const STORAGE_MASTERY = 'exemple-livret-mastery';

const shuffle = (list) => {
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
};
const buildSession = (src) => shuffle(src).map((q) => ({ ...q, options: shuffle(q.options) }));

function LivretSection() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [quizProgress, setQuizProgress] = useState({ bestScore: null, attempts: 0 });
  const [mastery, setMastery] = useState({});

  /* localStorage : on garde le record et l'état des fiches d'une session à l'autre. */
  useEffect(() => {
    try {
      const q = JSON.parse(localStorage.getItem(STORAGE_QUIZ) || 'null');
      if (q) setQuizProgress(q);
      const m = JSON.parse(localStorage.getItem(STORAGE_MASTERY) || 'null');
      if (m) setMastery(m);
    } catch { /* localStorage indisponible — pas grave, la démo reste utilisable */ }
  }, []);

  const handleQuizComplete = useCallback((score) => {
    setQuizProgress((prev) => {
      const updated = {
        bestScore: prev.bestScore === null ? score : Math.max(prev.bestScore, score),
        attempts: prev.attempts + 1,
      };
      try { localStorage.setItem(STORAGE_QUIZ, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const handleMarkCard = useCallback((id, status) => {
    setMastery((prev) => {
      const updated = { ...prev, [id]: status };
      try { localStorage.setItem(STORAGE_MASTERY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const handleResetMastery = useCallback(() => {
    setMastery({});
    try { localStorage.setItem(STORAGE_MASTERY, JSON.stringify({})); } catch {}
  }, []);

  const tabs = [
    { id: 'quiz',       label: 'Quiz',        icon: CheckSquare },
    { id: 'flashcards', label: 'Fiches mémo', icon: Layers },
    { id: 'guide',      label: 'Guide',       icon: BookOpen },
  ];

  return (
    <div className={styles.livretRoot}>
      <header className={styles.livretHeader}>
        <div className={styles.livretPlate}><BookOpen size={22} /></div>
        <div>
          <p className={styles.livretBrand}>Le Grand Livret</p>
          <p className={styles.livretSub}>Cahier d'éducation financière</p>
        </div>
      </header>

      <div className={styles.livretTabs}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`${styles.livretTab} ${activeTab === id ? styles.livretTabActive : ''}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className={styles.livretBody}>
        {activeTab === 'quiz'       && <QuizView progress={quizProgress} onComplete={handleQuizComplete} />}
        {activeTab === 'flashcards' && <FlashcardsView mastery={mastery} onMark={handleMarkCard} onResetMastery={handleResetMastery} />}
        {activeTab === 'guide'      && <StudyGuideView />}
      </div>
    </div>
  );
}

/* — Quiz "Livret" — */
function QuizView({ progress, onComplete }) {
  const [session, setSession]   = useState(() => buildSession(QUIZ_DATA));
  const [idx, setIdx]           = useState(0);
  const [answers, setAnswers]   = useState({});
  const [results, setResults]   = useState(false);
  const [justScore, setJustScore] = useState(null);

  const total = session.length;
  const current = session[idx];
  const answered = current.id in answers;

  const start = (src) => {
    setSession(buildSession(src));
    setIdx(0);
    setAnswers({});
    setResults(false);
    setJustScore(null);
  };

  const select = (qId, optId) => {
    if (qId in answers) return;
    setAnswers((p) => ({ ...p, [qId]: optId }));
  };

  const next = () => {
    if (idx < total - 1) { setIdx(idx + 1); return; }
    const score = session.filter((q) => answers[q.id] === q.correctOptionId).length;
    setJustScore(score);
    onComplete(score, total);
    setResults(true);
  };

  const wrong = useMemo(
    () => session.filter((q) => answers[q.id] !== q.correctOptionId),
    [session, answers],
  );

  if (results) {
    const score = justScore ?? 0;
    const isBest = progress.bestScore !== null && score >= progress.bestScore;
    const wrongIds = new Set(wrong.map((q) => q.id));
    return (
      <div className={styles.livretResults}>
        <div className={styles.livretResultsCard}>
          <p className={styles.livretMono}>Relevé de fin de session</p>
          <h2 className={styles.livretResultsTitle}>Résultats du quiz</h2>
          <div className={styles.livretScore}>{score}<span>/ {total}</span></div>
          {isBest && score > 0 && (
            <p className={styles.livretBadge}><Award size={14} /> Nouveau record personnel</p>
          )}
          <p className={styles.livretResultsMsg}>
            {score >= 8 ? 'Excellent ! Vous maîtrisez les concepts fondamentaux.'
              : score >= 5 ? 'Bon travail, quelques révisions sont nécessaires.'
              : "Il est recommandé de revoir le guide d'étude et les fiches mémo."}
          </p>
          <div className={styles.livretResultsActions}>
            <Button variant="primary" size="md" onClick={() => start(QUIZ_DATA)}>
              <RefreshCcw size={16} /> Nouvelle série mélangée
            </Button>
            {wrong.length > 0 && (
              <Button variant="ghost" size="md" onClick={() => start(wrong)}>
                Réviser mes {wrong.length} erreur{wrong.length > 1 ? 's' : ''}
              </Button>
            )}
          </div>
        </div>
        <div className={styles.livretReview}>
          {session.map((q, i) => {
            const ko = wrongIds.has(q.id);
            const chosen = q.options.find((o) => o.id === answers[q.id]);
            const correct = q.options.find((o) => o.id === q.correctOptionId);
            return (
              <div key={q.id} className={`${styles.livretReviewItem} ${ko ? styles.livretReviewKO : styles.livretReviewOK}`}>
                <p className={styles.livretMono}>Entrée n°{String(i + 1).padStart(2, '0')}</p>
                <p className={styles.livretReviewQ}>{q.question}</p>
                <p className={styles.livretReviewLine}><strong>Votre réponse :</strong> {chosen ? chosen.text : 'Aucune'}</p>
                {ko && <p className={styles.livretReviewLine}><strong>Bonne réponse :</strong> {correct.text}</p>}
                <div className={styles.livretReviewRationale}>
                  <strong>Explication</strong>
                  <p>{q.rationale}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.livretQuiz}>
      <div className={styles.livretQuizHead}>
        <span className={styles.livretMono}>Entrée {idx + 1} / {total}</span>
        <div className={styles.livretTicks}>
          {session.map((q, i) => (
            <span
              key={q.id}
              className={`${styles.livretTick} ${i === idx ? styles.livretTickCurrent : (q.id in answers ? styles.livretTickDone : '')}`}
            />
          ))}
        </div>
      </div>
      {progress.attempts > 0 && (
        <p className={styles.livretMono}>
          Solde précédent : {progress.bestScore}/{total} · {progress.attempts} tentative{progress.attempts > 1 ? 's' : ''}
        </p>
      )}
      <h2 className={styles.livretQuestion}>{current.question}</h2>
      <div className={styles.livretOptions} role="radiogroup">
        {current.options.map((opt) => {
          const selected = answers[current.id] === opt.id;
          const isCorrect = opt.id === current.correctOptionId;
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
              key={opt.id}
              role="radio"
              aria-checked={selected}
              disabled={answered}
              onClick={() => select(current.id, opt.id)}
              className={`${styles.livretOption} ${state}`}
            >
              <span className={styles.livretOptionMark}>
                {answered && isCorrect && <Check size={13} strokeWidth={3} />}
                {answered && !isCorrect && selected && <X size={13} strokeWidth={3} />}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={styles.livretRationale}>
          <div className={`${styles.livretStamp} ${answers[current.id] === current.correctOptionId ? styles.stampOK : styles.stampKO}`}>
            <div className={styles.stampInner}>{answers[current.id] === current.correctOptionId ? 'VALIDÉ' : 'À REVOIR'}</div>
          </div>
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
          {idx === total - 1 ? 'Voir les résultats' : 'Suivant'} <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

/* — Flashcards — */
function FlashcardsView({ mastery, onMark, onResetMastery }) {
  const [order, setOrder]     = useState(() => FLASHCARDS.map((c) => c.id));
  const [filter, setFilter]   = useState('all');
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
    setOrder(shuffle(order));
    setIndex(0);
    setFlipped(false);
  };

  const mark = (status) => {
    if (!current) return;
    onMark(current.id, status);
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

      {known > 0 && (
        <div className={styles.flashReset}>
          <button onClick={onResetMastery} className={styles.linkBtn}>Réinitialiser ma progression</button>
        </div>
      )}
    </div>
  );
}

/* — Guide d'étude — */
function StudyGuideView() {
  return (
    <div className={styles.guideWrap}>
      <header className={styles.guideHeader}>
        <p className={styles.livretMono}>Cahier d'étude</p>
        <h2 className={styles.guideTitle}>Fondamentaux de l'épargne</h2>
        <p className={styles.guideSub}>Finances personnelles et éducation financière</p>
      </header>
      <section>
        <h3 className={styles.guideSectionTitle}><Layers size={18} /> Résumé</h3>
        <p className={styles.guideText}>
          Ce guide synthétise les concepts essentiels pour maîtriser ses finances personnelles : mécanismes
          de la croissance du capital, stratégies de protection contre les imprévus et l'inflation, ainsi que
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
