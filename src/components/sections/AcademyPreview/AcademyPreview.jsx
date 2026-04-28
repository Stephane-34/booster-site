import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Trophy, Zap } from 'lucide-react';
import clsx from 'clsx';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import { ACADEMY_THEMES } from '../../../data/themes';
import styles from './AcademyPreview.module.css';

/* Question de démonstration — les vraies questions viennent de Supabase */
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

export default function AcademyPreview() {
  const [selected, setSelected] = useState(null);

  const isAnswered = selected !== null;
  const isCorrect = selected === DEMO_QUESTION.correct;

  const handleAnswer = (id) => {
    if (isAnswered) return;
    setSelected(id);
  };

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
                className={clsx(styles.themeCard, theme.locked && styles.themeCardLocked)}
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

                return (
                  <button
                    key={opt.id}
                    className={clsx(
                      styles.option,
                      isAnswered && isRight && styles.optionCorrect,
                      isAnswered && isSelected && !isRight && styles.optionWrong,
                      isAnswered && !isSelected && !isRight && styles.optionDimmed,
                      !isAnswered && isSelected && styles.optionSelected,
                    )}
                    onClick={() => handleAnswer(opt.id)}
                    disabled={isAnswered}
                    aria-pressed={isSelected}
                  >
                    <span className={styles.optionLetter}>{opt.id.toUpperCase()}</span>
                    <span className={styles.optionText}>{opt.text}</span>
                    {isAnswered && isRight && <CheckCircle size={16} className={styles.iconCorrect} />}
                    {isAnswered && isSelected && !isRight && <XCircle size={16} className={styles.iconWrong} />}
                  </button>
                );
              })}
            </div>

            {/* Explication après réponse */}
            {isAnswered && (
              <div className={clsx(styles.explanation, isCorrect ? styles.explCorrect : styles.explWrong)}>
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
                  style={{ width: isAnswered && isCorrect ? '62%' : '60%' }}
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
