import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Trophy, Zap } from 'lucide-react';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import styles from './AcademyPreview.module.css';

/* Question de démonstration — les vraies sont en BDD */
const DEMO_QUESTION = {
  theme: 'Fiscalité',
  question: 'Quel est le taux du Prélèvement Forfaitaire Unique (PFU) appliqué sur les plus-values mobilières en France ?',
  options: [
    { id: 'a', text: '17,2 %' },
    { id: 'b', text: '30 %' },
    { id: 'c', text: '33 %' },
    { id: 'd', text: '45 %' },
  ],
  correct: 'b',
  explanation:
    'Le PFU (ou "flat tax") s\'applique à 30 % : 12,8 % d\'impôt sur le revenu + 17,2 % de prélèvements sociaux. Sauf si le barème progressif est plus avantageux pour toi.',
};

/* Thèmes de l'académie */
const ACADEMY_THEMES = [
  { emoji: '🏠', name: 'Immobilier', modules: 8, locked: false },
  { emoji: '🏦', name: 'Retraite', modules: 6, locked: false },
  { emoji: '📈', name: 'Enrichissement', modules: 10, locked: false },
  { emoji: '📊', name: 'Fiscalité', modules: 7, locked: true },
  { emoji: '🛡️', name: 'Protection', modules: 5, locked: true },
  { emoji: '🎁', name: 'Transmission', modules: 4, locked: true },
];

const QUIZ_STATES = { idle: 'idle', answered: 'answered' };

export default function AcademyPreview() {
  const [selected, setSelected] = useState(null);
  const [quizState, setQuizState] = useState(QUIZ_STATES.idle);

  const handleAnswer = (id) => {
    if (quizState !== QUIZ_STATES.idle) return;
    setSelected(id);
    setQuizState(QUIZ_STATES.answered);
  };

  const isCorrect = selected === DEMO_QUESTION.correct;

  return (
    <section id="academie" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {/* Colonne gauche — thèmes */}
        <div className={styles.themes}>
          <Badge variant="accent">Académie</Badge>
          <h2 className={styles.title}>
            Apprends la finance{' '}
            <span className="gradient-text">comme tu joues</span>
          </h2>
          <p className={styles.desc}>
            6 parcours thématiques, des QCM gamifiés et une note globale qui progresse
            à chaque bonne réponse. La formation financière que tu aurais dû avoir à l'école.
          </p>

          <div className={styles.themeGrid}>
            {ACADEMY_THEMES.map((theme) => (
              <div
                key={theme.name}
                className={[styles.themeCard, theme.locked ? styles.themeCardLocked : ''].join(' ')}
              >
                <span className={styles.themeEmoji}>{theme.emoji}</span>
                <div className={styles.themeInfo}>
                  <span className={styles.themeName}>{theme.name}</span>
                  <span className={styles.themeModules}>{theme.modules} modules</span>
                </div>
                {theme.locked && (
                  <span className={styles.lockBadge}>🔒 Pro</span>
                )}
              </div>
            ))}
          </div>

          <Button variant="primary" size="lg" as={Link} to="/academie">
            Explorer l'Académie
            <ArrowRight size={18} />
          </Button>
        </div>

        {/* Colonne droite — quiz démo */}
        <div className={styles.quizWrapper}>
          <div className={styles.quizCard}>
            {/* En-tête */}
            <div className={styles.quizHeader}>
              <Badge variant="primary">{DEMO_QUESTION.theme}</Badge>
              <div className={styles.quizMeta}>
                <Zap size={14} />
                <span>Quiz du jour</span>
              </div>
            </div>

            <p className={styles.question}>{DEMO_QUESTION.question}</p>

            {/* Options */}
            <div className={styles.options}>
              {DEMO_QUESTION.options.map((opt) => {
                const isSelected = selected === opt.id;
                const isRight = opt.id === DEMO_QUESTION.correct;
                const showResult = quizState === QUIZ_STATES.answered;

                let stateClass = '';
                if (showResult) {
                  if (isRight) stateClass = styles.optionCorrect;
                  else if (isSelected) stateClass = styles.optionWrong;
                  else stateClass = styles.optionDimmed;
                } else if (isSelected) {
                  stateClass = styles.optionSelected;
                }

                return (
                  <button
                    key={opt.id}
                    className={[styles.option, stateClass].join(' ')}
                    onClick={() => handleAnswer(opt.id)}
                    disabled={showResult}
                    aria-pressed={isSelected}
                  >
                    <span className={styles.optionLetter}>{opt.id.toUpperCase()}</span>
                    <span className={styles.optionText}>{opt.text}</span>
                    {showResult && isRight && <CheckCircle size={16} className={styles.iconCorrect} />}
                    {showResult && isSelected && !isRight && <XCircle size={16} className={styles.iconWrong} />}
                  </button>
                );
              })}
            </div>

            {/* Explication après réponse */}
            {quizState === QUIZ_STATES.answered && (
              <div className={[styles.explanation, isCorrect ? styles.explCorrect : styles.explWrong].join(' ')}>
                {isCorrect ? (
                  <p>
                    <Trophy size={16} className={styles.trophyIcon} />
                    <strong>Bonne réponse !</strong> {DEMO_QUESTION.explanation}
                  </p>
                ) : (
                  <p>
                    <XCircle size={16} className={styles.wrongIcon} />
                    <strong>Raté.</strong> {DEMO_QUESTION.explanation}
                  </p>
                )}
              </div>
            )}

            {/* Barre de points */}
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Ta note globale</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: quizState === QUIZ_STATES.answered && isCorrect ? '62%' : '60%' }}
                />
              </div>
              <span className={styles.progressGrade}>B+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
