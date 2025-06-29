import React from 'react';
import { Trophy, Target, HelpCircle, AlertCircle } from 'lucide-react';

interface GameStatsProps {
  wordsCompleted: number;
  totalWords: number;
  correctGuesses: number;
  wrongGuesses: number;
  hintsUsed: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  wordsCompleted,
  totalWords,
  correctGuesses,
  wrongGuesses,
  hintsUsed
}) => {
  const accuracy = correctGuesses + wrongGuesses > 0 
    ? Math.round((correctGuesses / (correctGuesses + wrongGuesses)) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
      <div className="bg-green-100/90 backdrop-blur-sm p-3 sm:p-6 rounded-2xl text-center border-2 border-green-200 relative overflow-hidden">
        <div className="absolute top-1 right-1 text-lg animate-pulse">🏆</div>
        <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2 sm:mb-3" />
        <div className="text-2xl sm:text-3xl font-bold text-green-700">{wordsCompleted}</div>
        <div className="text-xs sm:text-sm text-green-600 font-medium">Completed</div>
      </div>
      
      <div className="bg-blue-100/90 backdrop-blur-sm p-3 sm:p-6 rounded-2xl text-center border-2 border-blue-200 relative overflow-hidden">
        <div className="absolute top-1 right-1 text-lg animate-pulse">🎯</div>
        <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
        <div className="text-2xl sm:text-3xl font-bold text-blue-700">{accuracy}%</div>
        <div className="text-xs sm:text-sm text-blue-600 font-medium">Accuracy</div>
      </div>
      
      <div className="bg-yellow-100/90 backdrop-blur-sm p-3 sm:p-6 rounded-2xl text-center border-2 border-yellow-200 relative overflow-hidden">
        <div className="absolute top-1 right-1 text-lg animate-pulse">💡</div>
        <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-2 sm:mb-3" />
        <div className="text-2xl sm:text-3xl font-bold text-yellow-700">{hintsUsed}</div>
        <div className="text-xs sm:text-sm text-yellow-600 font-medium">Hints Used</div>
      </div>
      
      <div className="bg-red-100/90 backdrop-blur-sm p-3 sm:p-6 rounded-2xl text-center border-2 border-red-200 relative overflow-hidden">
        <div className="absolute top-1 right-1 text-lg animate-pulse">❌</div>
        <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2 sm:mb-3" />
        <div className="text-2xl sm:text-3xl font-bold text-red-700">{wrongGuesses}</div>
        <div className="text-xs sm:text-sm text-red-600 font-medium">Wrong Guesses</div>
      </div>
    </div>
  );
};

export default GameStats;