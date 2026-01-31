'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ScoreRevealScreenProps {
  score: number;
  onViewBreakdown: () => void;
  onPlayAgain: () => void;
}

export default function ScoreRevealScreen({
  score,
  onViewBreakdown,
  onPlayAgain,
}: ScoreRevealScreenProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Determine tier
  const getTier = (s: number) => {
    if (s === 100) return { label: 'Perfect!', emoji: '👑' };
    if (s >= 80) return { label: 'Excellent', emoji: '⭐' };
    if (s >= 60) return { label: 'Good', emoji: '✅' };
    if (s >= 40) return { label: 'Fair', emoji: '👍' };
    return { label: 'Keep Learning', emoji: '📚' };
  };

  const tier = getTier(score);

  // Count up animation
  useEffect(() => {
    let currentCount = 0;
    const increment = Math.ceil(score / 30);

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(currentCount);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 gap-4">
      <div className="text-center space-y-2">
        <div className="text-4xl">{tier.emoji}</div>
        <h2 className="text-2xl font-display font-bold text-white">{tier.label}</h2>
        
        <div className="text-4xl font-display font-bold text-yellow-400 py-2">
          {displayScore}
          <span className="text-lg text-gray-300">/100</span>
        </div>
      </div>

      <Button
        onClick={onPlayAgain}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-display font-bold py-3 rounded-lg text-sm"
      >
        PLAY AGAIN
      </Button>
    </div>
  );
}
