import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, PiggyBank, BookOpen, BarChart2, Shield, RefreshCw,
  ChevronRight, Trophy, Star, Zap, CheckCircle, XCircle, Lock
} from 'lucide-react';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import styles from './Academy.module.css';

/* Données statiques — en prod, elles viennent de Supabase */
const THEMES = [
  {
    id: 'immobilier',
    icon: Home,
    name: 'Immobilier',
    desc: 'SCPI, effet de levier, taxe foncière, stratégies d\'optimisation.',
    modules: 8,
    locked: false,
    color: 'violet',
    progress: 62,
  },
  {
    id: 'retraite',
    icon: PiggyBank,
    name: 'Retraite',
    desc: 'PER, simulation de retraite, stratégies de versement.',
    modules: 6,
    locked: false,
    color: 'blue',
    progress: 33,
  },
  {
    id: 'enrichissement',
    icon: BarChart2,
    name: 'Enrichissement',
    desc: 'Règle des 72, ETF world, DCA, diversification internationale.',
    modules: 10,
    locked: false,
    color: 'green',
    progress: 0,
  },
  {
    id: 'fiscalite',
    icon: BookOpen,
    name: 'Fiscalité',
    desc: 'PFU, PEA, abattements assurance-vie, optimisation fiscale.',
    modules: 7,
    locked: true,
    color: 'orange',
    progress: 0,
  },
  {
    id: 'protection',
    icon: Shield,
    name: 'Protection',
    desc: 'Prévoyance, arrêt maladie, invalidité, couverture optimale.',
    modules: 5,
    locked: true,
    color: 'teal',
    progress: 0,
  },
  {
    id: 'transmission',
    icon: RefreshCw,
    name: 'Transmission',
    desc: 'Succession, donations, optimisation patrimoniale familiale.',
    modules: 4,
    locked: true,
    color: 'pink',
    progress: 0,
  },
];

const QUESTIONS = [
  {
    id: 1,
    theme: 'Enrichissement',
    question: 'Qu\'est-ce que le Dollar-Cost Averaging (DCA) ?',
    options: [
      { id: 'a', text: 'Acheter une seule fois une grande quantité d\'actifs' },
      { id: 'b', text: 'Investir un montant fixe régulièrement, quelle que soit la valeur' },
      { id: 'c', text: 'Vendre ses actifs quand le marché baisse' },
      { id: 'd', text: 'Diversifier uniquement dans des obligations' },
    ],
    correct: 'b',
    explanation:
      'Le DCA consiste à investir un montant fixe à intervalles réguliers (ex: 100€/mois). Cela réduit l\'impact de la volatilité et évite le biais de market timing.',
  },
  {
    id: 2,
    theme: 'Fiscalité',
    question: 'Quel est le taux du Prélèvement Forfaitaire Unique (PFU) ?',
    options: [
      { id: 'a', text: '17,2 %' },
      { id: 'b', text: '30 %' },
      { id: 'c', text: '33 %' },
      { id: 'd', text: '45 %' },
    ],
    correct: 'b',
    explanation:
      'Le PFU (ou "flat tax") = 12,8 % d\'IR + 17,2 % de prélèvements sociaux = 30 % total.',
  },
  {
    id: 3,
    theme: 'Immobilier',
    question: 'Qu\'est-ce qu\'une SCPI ?',
    options: [
      { id: 'a', text: 'Une société qui vend des appartements' },
      { id: 'b', text: 'Un fond qui investit dans l\'immobilier et distribue des loyers' },
      { id: 'c', text: 'Un prêt immobilier à taux variable' },
      { id: 'd', text: 'Une assurance habitation collective' },
    ],
    correct: 'b',
    explanation:
      'La SCPI (Société Civile de Placement Immobilier) te permet d\'investir dans la pierre dès quelques centaines d\'euros et de percevoir des loyers proportionnels à ta part.',
  },
];

export default function Academy() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const handleAnswer = (questionId, optionId) => {
    if (answers[questionId] !== undefined) return;

    const question = QUESTIONS[currentQuestion];
    const correct = optionId === question.correct;

    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizDone(false);
  };

  const q = QUESTIONS[currentQuestion];
  const answered = answers[q?.id] !== undefined;

  return (
    <div className={styles.page}>
      {/* Hero académie */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <Badge variant="accent">
              <Trophy size={12} />
              Académie Booster
            </Badge>
            <h1 className={styles.heroTitle}>
              Forme-toi à la finance
              <br />
              <span className="gradient-text">module par module</span>
            </h1>
            <p className={styles.heroDesc}>
              6 thèmes, des QCM gamifiés, et une note globale qui reflète ton niveau réel.
              Chaque bonne réponse te rapproche de la maîtrise financière.
            </p>
          </div>

          {/* Statistiques utilisateur */}
          <div className={styles.heroStats}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>B+</span>
              <span className={styles.statLabel}>Note globale</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>14</span>
              <span className={styles.statLabel}>Questions répondues</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>71 %</span>
              <span className={styles.statLabel}>Taux de réussite</span>
            </div>
          </div>
        </div>
      </section>

      <div className={`container ${styles.content}`}>
        {/* Grille thèmes */}
        <section className={styles.themesSection}>
          <h2 className={styles.sectionTitle}>Tes parcours</h2>
          <div className={styles.themesGrid}>
            {THEMES.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedTheme === theme.id}
                onSelect={() => !theme.locked && setSelectedTheme(theme.id)}
              />
            ))}
          </div>
        </section>

        {/* Quiz section */}
        <section className={styles.quizSection}>
          <div className={styles.quizHeader}>
            <h2 className={styles.sectionTitle}>
              <Zap size={20} />
              Quiz du jour
            </h2>
            <span className={styles.quizProgress}>
              {currentQuestion + 1} / {QUESTIONS.length}
            </span>
          </div>

          {!quizDone ? (
            <div className={styles.quizCard}>
              {/* Barre de progression */}
              <div className={styles.quizProgressBar}>
                <div
                  className={styles.quizProgressFill}
                  style={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <div className={styles.questionTheme}>
                <Badge variant="primary">{q.theme}</Badge>
              </div>

              <p className={styles.questionText}>{q.question}</p>

              <div className={styles.options}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.id;
                  const isRight = opt.id === q.correct;
                  const showResult = answered;

                  let cls = styles.option;
                  if (showResult) {
                    if (isRight) cls += ` ${styles.optionCorrect}`;
                    else if (isSelected) cls += ` ${styles.optionWrong}`;
                    else cls += ` ${styles.optionDimmed}`;
                  } else if (isSelected) {
                    cls += ` ${styles.optionSelected}`;
                  }

                  return (
                    <button
                      key={opt.id}
                      className={cls}
                      onClick={() => handleAnswer(q.id, opt.id)}
                      disabled={answered}
                    >
                      <span className={styles.optionLetter}>{opt.id.toUpperCase()}</span>
                      <span>{opt.text}</span>
                      {showResult && isRight && <CheckCircle size={16} className={styles.iconCorrect} />}
                      {showResult && isSelected && !isRight && <XCircle size={16} className={styles.iconWrong} />}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <>
                  <div className={[
                    styles.explanation,
                    answers[q.id] === q.correct ? styles.explCorrect : styles.explWrong
                  ].join(' ')}>
                    <p>{q.explanation}</p>
                  </div>
                  <Button variant="primary" size="md" onClick={nextQuestion} className={styles.nextBtn}>
                    {currentQuestion < QUESTIONS.length - 1 ? 'Question suivante' : 'Voir mes résultats'}
                    <ChevronRight size={16} />
                  </Button>
                </>
              )}
            </div>
          ) : (
            <QuizResults score={score} total={QUESTIONS.length} onReset={resetQuiz} />
          )}
        </section>
      </div>
    </div>
  );
}

/* ─── Sous-composants ─────────────────────────────────────── */

function ThemeCard({ theme, isSelected, onSelect }) {
  const Icon = theme.icon;

  return (
    <div
      className={[
        styles.themeCard,
        styles[`theme-${theme.color}`],
        theme.locked ? styles.themeCardLocked : '',
        isSelected ? styles.themeCardSelected : '',
      ].join(' ')}
      onClick={onSelect}
      role={theme.locked ? 'presentation' : 'button'}
      tabIndex={theme.locked ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && !theme.locked && onSelect()}
    >
      <div className={styles.themeCardTop}>
        <div className={styles.themeIcon}>
          <Icon size={20} />
        </div>
        {theme.locked ? (
          <Lock size={14} className={styles.lockIcon} />
        ) : (
          <span className={styles.themeModuleCount}>{theme.modules} modules</span>
        )}
      </div>

      <div className={styles.themeCardBody}>
        <h3 className={styles.themeName}>{theme.name}</h3>
        <p className={styles.themeDesc}>{theme.desc}</p>
      </div>

      {!theme.locked && theme.progress > 0 && (
        <div className={styles.themeProgress}>
          <div className={styles.themeProgressBar}>
            <div
              className={styles.themeProgressFill}
              style={{ width: `${theme.progress}%` }}
            />
          </div>
          <span className={styles.themeProgressText}>{theme.progress} %</span>
        </div>
      )}

      {theme.locked && (
        <div className={styles.lockedOverlay}>
          <Lock size={16} />
          <span>Disponible en Booster Pro</span>
        </div>
      )}
    </div>
  );
}

function QuizResults({ score, total, onReset }) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 80 ? 'A' : pct >= 60 ? 'B+' : pct >= 40 ? 'C' : 'D';

  return (
    <div className={styles.resultsCard}>
      <div className={styles.resultsGrade}>{grade}</div>
      <h3 className={styles.resultsTitle}>
        {score} / {total} correctes
      </h3>
      <p className={styles.resultsSubtitle}>
        {pct >= 80
          ? 'Excellent ! Tu maîtrises bien ces concepts.'
          : pct >= 60
          ? 'Bien ! Continue à t\'entraîner pour atteindre le niveau A.'
          : 'Pas mal pour un début. Relis les explications et réessaie.'}
      </p>
      <div className={styles.resultStars}>
        {Array.from({ length: Math.ceil(pct / 20) }).map((_, i) => (
          <Star key={i} size={24} className={styles.resultStar} />
        ))}
      </div>
      <Button variant="primary" size="lg" onClick={onReset}>
        Rejouer
      </Button>
    </div>
  );
}
