'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onSelectAnswer: (index: number) => void;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  onSelectAnswer,
  disabled = false,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Reset selected index when question changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [questionNumber]);

  const handleSelect = (index: number) => {
    if (disabled || selectedIndex !== null) return;
    setSelectedIndex(index);
    setTimeout(() => {
      onSelectAnswer(index);
    }, 150);
  };

  return (
    <div className="w-full px-3 space-y-3">
      {/* Question Text */}
      <div className="bg-white/10 border border-white/30 rounded p-2.5">
        <h2 className="text-sm font-semibold text-white leading-tight text-balance">
          {question.text}
        </h2>
      </div>

      {/* Answer Options - Vertical Stack for Mobile */}
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabled || selectedIndex !== null}
            className={`
              w-full p-2 rounded
              transition-all duration-200
              text-left font-medium text-xs
              border
              ${
                selectedIndex === index
                  ? 'bg-yellow-400 border-yellow-300 text-black'
                  : 'bg-white/10 border-white/20 text-gray-100 hover:bg-white/20'
              }
              ${disabled && selectedIndex === null ? 'opacity-50 cursor-not-allowed' : ''}
              active:scale-95
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
