import React from 'react';

interface HangmanDrawingProps {
  wrongGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ wrongGuesses }) => {
  return (
    <div className="flex justify-center items-center">
      <svg
        width="120"
        height="140"
        viewBox="0 0 200 250"
        className="transition-all duration-500 ease-in-out w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36"
      >
        {/* Base */}
        <line
          x1="20"
          y1="230"
          x2="100"
          y2="230"
          stroke="#374151"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 1 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Pole */}
        <line
          x1="30"
          y1="230"
          x2="30"
          y2="20"
          stroke="#374151"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 2 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Top beam */}
        <line
          x1="30"
          y1="20"
          x2="120"
          y2="20"
          stroke="#374151"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 3 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Noose */}
        <line
          x1="120"
          y1="20"
          x2="120"
          y2="50"
          stroke="#374151"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 4 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Head */}
        <circle
          cx="120"
          cy="70"
          r="20"
          stroke="#DC2626"
          strokeWidth="4"
          fill="none"
          className={`transition-all duration-500 ${wrongGuesses >= 5 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Body */}
        <line
          x1="120"
          y1="90"
          x2="120"
          y2="170"
          stroke="#DC2626"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 6 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Left arm */}
        <line
          x1="120"
          y1="110"
          x2="90"
          y2="140"
          stroke="#DC2626"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 7 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Right arm */}
        <line
          x1="120"
          y1="110"
          x2="150"
          y2="140"
          stroke="#DC2626"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 8 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Left leg */}
        <line
          x1="120"
          y1="170"
          x2="90"
          y2="200"
          stroke="#DC2626"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 9 ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Right leg */}
        <line
          x1="120"
          y1="170"
          x2="150"
          y2="200"
          stroke="#DC2626"
          strokeWidth="4"
          className={`transition-all duration-500 ${wrongGuesses >= 10 ? 'opacity-100' : 'opacity-0'}`}
        />
      </svg>
    </div>
  );
};

export default HangmanDrawing;