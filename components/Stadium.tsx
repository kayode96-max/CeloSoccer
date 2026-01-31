'use client';

import React from "react"

interface StadiumProps {
  children: React.ReactNode;
  showFootballs?: boolean;
}

export default function Stadium({ children, showFootballs = true }: StadiumProps) {
  const footballPositions = [
    { top: '15%', left: '10%', delay: '0s', size: 'w-6 h-6' },
    { top: '25%', right: '8%', delay: '0.5s', size: 'w-5 h-5' },
    { top: '70%', left: '5%', delay: '1s', size: 'w-4 h-4' },
    { top: '80%', right: '10%', delay: '1.5s', size: 'w-5 h-5' },
  ];

  return (
    <div className="stadium-container relative w-full min-h-screen flex flex-col">
      {/* Stadium seating background */}
      <div className="absolute inset-0 stadium-seating"></div>

      {/* Field container */}
      <div className="relative flex-1 flex items-center justify-center p-2">
        <div className="football-field relative w-full max-w-lg aspect-video">
          {/* Field lines */}
          <div className="field-lines"></div>

          {/* Central field section for content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="field-section w-full h-full rounded-lg flex items-center justify-center">
              {children}
            </div>
          </div>

          {/* Floating footballs */}
          {showFootballs &&
            footballPositions.map((pos, idx) => (
              <div
                key={idx}
                className={`absolute ${pos.size} pointer-events-none`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  animation: `float-ball 4s ease-in-out infinite`,
                  animationDelay: pos.delay,
                }}
              >
                <div className="w-full h-full bg-white rounded-full shadow-lg relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-300 rounded-full opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 border-2 border-gray-400"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
