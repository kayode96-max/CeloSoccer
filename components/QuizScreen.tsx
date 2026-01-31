'use client';

import { useState } from 'react';
import { questions } from '@/lib/questions';
import { Answer } from '@/app/page';
import QuestionCard from './QuestionCard';
import Timer from './Timer';

interface QuizScreenProps {
  answers: Answer[];
  timeRemaining: number;
  onAnswerQuestion: (questionIndex: number, selectedIndex: number) => void;
}

export default function QuizScreen({
  answers,
  timeRemaining,
  onAnswerQuestion,
}: QuizScreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentQuestionIndex = answers.length;
  const isComplete = currentQuestionIndex >= questions.length;

  const handleSelectAnswer = (selectedIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      onAnswerQuestion(currentQuestionIndex, selectedIndex);
      setIsTransitioning(false);
    }, 300);
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full gap-3">
      {/* Header with progress and timer */}
      <div className="flex justify-between items-center px-2">
        <span className="text-xs font-semibold text-yellow-400">
          Q{currentQuestionIndex + 1}/10
        </span>
        <Timer timeRemaining={timeRemaining} />
      </div>

      {/* Progress bar */}
      <div className="px-2">
        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <div
            className="bg-yellow-400 h-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card - with fade animation */}
      <div
        className={`flex-1 flex items-center justify-center transition-all duration-300 overflow-y-auto ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <QuestionCard
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          onSelectAnswer={handleSelectAnswer}
          disabled={isTransitioning}
        />
      </div>
    </div>
  );
}
