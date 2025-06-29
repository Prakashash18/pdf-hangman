import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-1 sm:gap-2 px-2">
      {word.toUpperCase().split('').map((char, index) => {
        // Handle spaces in multi-word phrases
        if (char === ' ') {
          return (
            <div
              key={index}
              className="w-3 sm:w-4 md:w-5 h-8 sm:h-10 md:h-12 flex items-center justify-center"
            >
              {/* Space indicator - small gap */}
            </div>
          );
        }

        const isGuessed = guessedLetters.includes(char);
        
        return (
          <div
            key={index}
            className={`
              w-6 h-8 sm:w-8 sm:h-10 md:w-10 md:h-12 border-b-2 sm:border-b-4 flex items-center justify-center
              text-lg sm:text-xl md:text-2xl font-bold transition-all duration-500 relative
              ${isGuessed 
                ? 'text-white border-yellow-400 animate-pulse' 
                : 'text-transparent border-white/50'
              }
            `}
          >
            {isGuessed && (
              <>
                <span className="relative z-10">{char}</span>
                {/* Glow effect for revealed letters */}
                <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-sm"></div>
              </>
            )}
            {/* Sparkle effect when letter is revealed */}
            {isGuessed && (
              <div className="absolute -top-1 -right-0.5 text-yellow-300 text-xs animate-bounce">✨</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;