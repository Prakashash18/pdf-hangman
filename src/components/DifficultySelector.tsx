import React from 'react';
import { Star, Zap, Flame } from 'lucide-react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  wordCounts: Record<Difficulty, number>;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelectDifficulty,
  wordCounts
}) => {
  const difficulties = [
    {
      level: 'Easy' as Difficulty,
      icon: Star,
      color: 'green',
      description: 'Perfect for getting started',
      gradient: 'from-green-400 to-emerald-500',
      emoji: '🌟',
      borderColor: 'border-green-300'
    },
    {
      level: 'Medium' as Difficulty,
      icon: Zap,
      color: 'yellow',
      description: 'Challenge your knowledge',
      gradient: 'from-yellow-400 to-orange-500',
      emoji: '⚡',
      borderColor: 'border-yellow-300'
    },
    {
      level: 'Hard' as Difficulty,
      icon: Flame,
      color: 'red',
      description: 'For the brave and bold',
      gradient: 'from-red-400 to-pink-500',
      emoji: '🔥',
      borderColor: 'border-red-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
      {difficulties.map(({ level, icon: Icon, color, description, gradient, emoji, borderColor }) => (
        <button
          key={level}
          onClick={() => onSelectDifficulty(level)}
          className={`
            group relative p-3 sm:p-4 lg:p-6 rounded-3xl transition-all duration-300 transform
            hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50
            bg-gradient-to-br ${gradient} text-white border-4 ${borderColor}
            shadow-xl hover:shadow-3xl
          `}
        >
          {/* Floating emoji */}
          <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 text-xl sm:text-2xl lg:text-3xl animate-bounce group-hover:animate-spin">
            {emoji}
          </div>

          <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4">
            {/* Icon container with cartoon style */}
            <div className="relative">
              <div className="bg-white/30 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-white/40 transition-all duration-300 shadow-lg">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              {/* Sparkle effects */}
              <div className="absolute -top-0.5 -left-0.5 lg:-top-1 lg:-left-1 text-yellow-200 text-xs lg:text-sm animate-pulse">✨</div>
              <div className="absolute -bottom-0.5 -right-0.5 lg:-bottom-1 lg:-right-1 text-yellow-200 text-xs animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
            </div>
            
            <div className="space-y-1 sm:space-y-2 lg:space-y-3">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold drop-shadow-lg">{level}</h3>
              <p className="text-white/90 text-xs sm:text-sm lg:text-base font-medium">{description}</p>
              
              {/* Word count badge */}
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 shadow-lg">
                <div className="text-base sm:text-lg lg:text-xl font-bold mb-0.5">{wordCounts[level]}</div>
                <div className="text-white/80 text-xs font-medium">questions available</div>
              </div>
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;