'use client';

import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

export default function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 text-white">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-display font-bold text-yellow-400">
          SOCCER IQ
        </h1>
        <p className="text-sm text-gray-200">
          Test your football knowledge
        </p>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-lg p-3 space-y-2 text-xs w-full max-w-xs">
        <p className="text-yellow-300 font-semibold">10 Questions</p>
        <p className="text-gray-200">10 points per correct answer</p>
        <p className="text-gray-400">Max score: 100</p>
      </div>

      <Button
        onClick={onStartQuiz}
        className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-black font-display font-bold py-4 rounded-lg transition-all"
      >
        KICK OFF
      </Button>
    </div>
  );
}
