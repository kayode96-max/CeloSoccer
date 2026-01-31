'use client';

import { useState, useEffect } from 'react';
import Stadium from '@/components/Stadium';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuizScreen from '@/components/QuizScreen';
import ScoreRevealScreen from '@/components/ScoreRevealScreen';
import ScoreBreakdownScreen from '@/components/ScoreBreakdownScreen';
import { questions } from '@/lib/questions';

export type Answer = {
  questionIndex: number;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
};

export type QuizState = 'welcome' | 'quiz' | 'score' | 'breakdown';

export default function Home() {
  const [state, setState] = useState<QuizState>('welcome');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (state !== 'quiz') return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - finish quiz
          setState('score');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  const handleStartQuiz = () => {
    setAnswers([]);
    setTimeRemaining(60);
    setQuizStartTime(Date.now());
    setState('quiz');
  };

  const handleAnswerQuestion = (questionIndex: number, selectedIndex: number) => {
    const correctIndex = questions[questionIndex].correctIndex;
    const isCorrect = selectedIndex === correctIndex;

    const newAnswer: Answer = {
      questionIndex,
      selectedIndex,
      isCorrect,
      timeSpent: 0,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // Check if quiz is complete
    if (newAnswers.length === 10) {
      calculateScore(newAnswers);
      setState('score');
    }
  };

  const calculateScore = (answersData: Answer[]) => {
    let basePoints = 0;

    // Calculate base points (10 per correct answer)
    answersData.forEach((answer) => {
      if (answer.isCorrect) {
        basePoints += 10;
      }
    });

    setScore(basePoints);
  };

  const handleViewBreakdown = () => {
    setState('breakdown');
  };

  const handlePlayAgain = () => {
    setState('welcome');
    setAnswers([]);
    setTimeRemaining(60);
    setScore(0);
  };

  return (
    <Stadium showFootballs={state === 'quiz' || state === 'welcome'}>
      {state === 'welcome' && (
        <WelcomeScreen onStartQuiz={handleStartQuiz} />
      )}
      {state === 'quiz' && (
        <QuizScreen
          answers={answers}
          timeRemaining={timeRemaining}
          onAnswerQuestion={handleAnswerQuestion}
        />
      )}
      {state === 'score' && (
        <ScoreRevealScreen
          score={score}
          onViewBreakdown={handleViewBreakdown}
          onPlayAgain={handlePlayAgain}
        />
      )}
      {state === 'breakdown' && (
        <ScoreBreakdownScreen
          answers={answers}
          score={score}
          timeRemaining={timeRemaining}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </Stadium>
  );
}
