interface TimerProps {
  timeRemaining: number;
}

export default function Timer({ timeRemaining }: TimerProps) {
  const isLow = timeRemaining <= 10;
  const isWarning = timeRemaining <= 30;

  return (
    <div
      className={`
        text-lg font-display font-bold px-3 py-1 rounded
        transition-all duration-300
        ${
          isLow
            ? 'timer-warning text-red-400'
            : isWarning
              ? 'text-yellow-400'
              : 'text-blue-400'
        }
      `}
    >
      {timeRemaining}s
    </div>
  );
}
