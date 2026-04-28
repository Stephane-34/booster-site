import { useState } from 'react';

/**
 * Encapsule toute la logique d'état d'un quiz.
 * Complètement découplé de l'UI — facile à tester unitairement.
 */
export function useQuiz(questions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;
  const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;

  function answer(questionId, optionId) {
    // Ignorer si déjà répondu
    if (answers[questionId] !== undefined) return;

    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = optionId === question.correct;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (isCorrect) setScore((s) => s + 1);
  }

  function next() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsDone(true);
    }
  }

  function reset() {
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setIsDone(false);
  }

  return {
    currentQuestion,
    currentIndex,
    answers,
    score,
    isDone,
    isAnswered,
    totalQuestions: questions.length,
    answer,
    next,
    reset,
  };
}
