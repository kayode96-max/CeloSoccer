'use client';

import { Button } from '@/components/ui/button';
import { questions } from '@/lib/questions';
import { Answer } from '@/app/page';

interface ScoreBreakdownScreenProps {
  answers: Answer[];
  score: number;
  timeRemaining: number;
  onPlayAgain: () => void;
}

export default function ScoreBreakdownScreen({
  answers,
  score,
  timeRemaining,
  onPlayAgain,
}: ScoreBreakdownScreenProps) {
  const correctCount = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="w-full h-full px-3 py-2 overflow-y-auto flex flex-col">
      {/* Header with Score Summary */}
      <div className="text-center mb-3 pb-2 border-b border-white/20">
        <h1 className="text-lg font-display font-bold text-white">Results</h1>
        <p className="text-xs text-yellow-400 font-semibold">{correctCount}/10 Correct • {score}/100 Points</p>
        <p className="text-xs text-gray-400 mt-1">10 points per correct answer</p>
      </div>

      {/* Questions Review */}
      <div className="space-y-2 flex-1 overflow-y-auto mb-3">
        {answers.map((answer, index) => {
          const question = questions[index];
          const selectedAnswer = question.options[answer.selectedIndex];
          const correctAnswer = question.options[question.correctIndex];
          const isCorrect = answer.isCorrect;

          return (
            <div
              key={index}
              className={`rounded border p-2 ${
                isCorrect
                  ? 'bg-green-500/20 border-green-400/40'
                  : 'bg-red-500/20 border-red-400/40'
              }`}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-400">Q{index + 1}</span>
                <span className={`text-xs ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '✓ Correct' : '✗ Wrong'}
                </span>
                {isCorrect && <span className="text-xs text-green-400">+10 pts</span>}
              </div>
              
              <p className="text-xs text-white mb-1.5 font-medium">
                {question.text}
              </p>
              
              <div className="space-y-1 text-xs border-t border-white/10 pt-1">
                <div>
                  <p className="text-gray-400">Your answer:</p>
                  <p className={isCorrect ? 'text-green-300' : 'text-red-300'}>{selectedAnswer}</p>
                </div>
                
                {!isCorrect && (
                  <div>
                    <p className="text-gray-400">Correct answer:</p>
                    <p className="text-green-300">{correctAnswer}</p>
                  </div>
                )}

                {/* Explanation */}
                <div className="bg-white/5 rounded p-1.5 mt-1">
                  <p className="text-gray-300 leading-tight">{question.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Play Again Button */}
      <Button
        onClick={onPlayAgain}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-display font-bold py-2 rounded text-sm"
      >
        PLAY AGAIN
      </Button>
    </div>
  );
}
