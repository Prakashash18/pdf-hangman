import React from 'react';

interface OnScreenKeyboardProps {
  guessedLetters: string[];
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({
  guessedLetters,
  onLetterClick,
  disabled
}) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getLetterStatus = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      return 'guessed';
    }
    return 'available';
  };

  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1 sm:gap-2 max-w-3xl mx-auto px-1 sm:px-2">
      {letters.map((letter) => {
        const status = getLetterStatus(letter);
        const isGuessed = status === 'guessed';
        
        return (
          <button
            key={letter}
            onClick={() => !disabled && !isGuessed && onLetterClick(letter)}
            disabled={disabled || isGuessed}
            className={`
              aspect-square rounded-lg font-bold text-sm sm:text-base md:text-lg transition-all duration-200 transform border
              ${isGuessed
                ? 'bg-gray-300/50 text-gray-500 cursor-not-allowed border-gray-400/50 backdrop-blur-sm'
                : disabled
                ? 'bg-gray-200/50 text-gray-400 cursor-not-allowed border-gray-300/50 backdrop-blur-sm'
                : 'bg-white/90 text-blue-600 shadow-lg hover:bg-white hover:scale-110 active:scale-95 cursor-pointer border-blue-200 hover:border-blue-400 backdrop-blur-sm hover:shadow-xl'
              }
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default OnScreenKeyboard;