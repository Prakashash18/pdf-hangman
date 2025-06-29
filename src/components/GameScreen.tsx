import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, RotateCcw, Volume2, VolumeX, Music, Music as MusicOff } from 'lucide-react';
import { HangmanWord, GameState, Difficulty } from '../types';
import HangmanDrawing from './HangmanDrawing';
import WordDisplay from './WordDisplay';
import OnScreenKeyboard from './OnScreenKeyboard';
import GameStats from './GameStats';
import BoltLogo from './BoltLogo';
import { soundManager } from '../utils/soundManager';

interface GameScreenProps {
  words: HangmanWord[];
  difficulty: Difficulty;
  onBackToMenu: () => void;
  onBackToDifficulty: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  words,
  difficulty,
  onBackToMenu,
  onBackToDifficulty
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    guessedLetters: [],
    wrongGuesses: 0,
    gameStatus: 'playing',
    showHint: false,
    score: 0,
    totalWords: words.length
  });

  const [stats, setStats] = useState({
    wordsCompleted: 0,
    totalWords: words.length,
    correctGuesses: 0,
    wrongGuesses: 0,
    hintsUsed: 0
  });

  const [showStatsScreen, setShowStatsScreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  const currentWord = words[gameState.currentWordIndex];
  const maxWrongGuesses = 10;

  // Start background music when game screen loads
  useEffect(() => {
    soundManager.playBackgroundMusic();
    
    // Cleanup: stop music when component unmounts
    return () => {
      soundManager.stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    // Auto-show hint after 3 wrong guesses
    if (gameState.wrongGuesses >= 3 && !gameState.showHint) {
      setGameState(prev => ({ ...prev, showHint: true }));
      setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    }
  }, [gameState.wrongGuesses, gameState.showHint]);

  const handleLetterClick = (letter: string) => {
    if (gameState.gameStatus !== 'playing' || gameState.guessedLetters.includes(letter)) {
      return;
    }

    const newGuessedLetters = [...gameState.guessedLetters, letter];
    // Check if letter exists in the word (ignoring spaces for multi-word phrases)
    const isCorrectGuess = currentWord.word.toUpperCase().replace(/\s/g, '').includes(letter);
    
    // Play sound effect
    if (isCorrectGuess) {
      soundManager.playCorrect();
      setStats(prev => ({ ...prev, correctGuesses: prev.correctGuesses + 1 }));
    } else {
      soundManager.playError();
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1 }));
    }

    const newWrongGuesses = isCorrectGuess 
      ? gameState.wrongGuesses 
      : gameState.wrongGuesses + 1;

    // Check if word is completely guessed (excluding spaces)
    const lettersInWord = currentWord.word.toUpperCase().replace(/\s/g, '').split('');
    const wordComplete = lettersInWord.every(letter => newGuessedLetters.includes(letter));

    let newGameStatus: 'playing' | 'won' | 'lost' = 'playing';
    
    if (wordComplete) {
      newGameStatus = 'won';
      setStats(prev => ({ ...prev, wordsCompleted: prev.wordsCompleted + 1 }));
    } else if (newWrongGuesses >= maxWrongGuesses) {
      newGameStatus = 'lost';
    }

    setGameState(prev => ({
      ...prev,
      guessedLetters: newGuessedLetters,
      wrongGuesses: newWrongGuesses,
      gameStatus: newGameStatus,
      score: prev.score + (isCorrectGuess ? 10 : 0)
    }));
  };

  const handleContinueAfterStats = () => {
    setShowStatsScreen(false);
    
    if (gameState.currentWordIndex < words.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentWordIndex: prev.currentWordIndex + 1,
        guessedLetters: [],
        wrongGuesses: 0,
        gameStatus: 'playing',
        showHint: false
      }));
    } else {
      // All words completed - stop music before going back
      soundManager.stopBackgroundMusic();
      onBackToDifficulty();
    }
  };

  const handleNextWord = () => {
    // Show stats screen first
    setShowStatsScreen(true);
  };

  const handleRestart = () => {
    setGameState({
      currentWordIndex: 0,
      guessedLetters: [],
      wrongGuesses: 0,
      gameStatus: 'playing',
      showHint: false,
      score: 0,
      totalWords: words.length
    });
    setStats({
      wordsCompleted: 0,
      totalWords: words.length,
      correctGuesses: 0,
      wrongGuesses: 0,
      hintsUsed: 0
    });
    setShowStatsScreen(false);
    // Restart background music
    soundManager.playBackgroundMusic();
  };

  const handleShowHint = () => {
    if (!gameState.showHint) {
      setGameState(prev => ({ ...prev, showHint: true }));
      setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
    }
  };

  const toggleSound = () => {
    const newSoundState = soundManager.toggleSound();
    setSoundEnabled(newSoundState);
  };

  const toggleMusic = () => {
    const newMusicState = soundManager.toggleMusic();
    setMusicEnabled(newMusicState);
  };

  const handleBackToMenu = () => {
    soundManager.stopBackgroundMusic();
    onBackToMenu();
  };

  const handleBackToDifficulty = () => {
    soundManager.stopBackgroundMusic();
    onBackToDifficulty();
  };

  // Top Left Logo Component for Game Screen
  const TopLeftLogo = () => (
    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-50">
      <a 
        href="https://bolt.new" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
      >
        <BoltLogo className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200" />
        <span className="text-white text-xs sm:text-sm font-bold hidden sm:inline">
          Bolt.new
        </span>
      </a>
    </div>
  );

  // Stats Screen - shown after each completed question
  if (showStatsScreen) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
        <TopLeftLogo />
        
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4 h-full flex flex-col justify-center">
          <div className="text-center mb-4 sm:mb-6">
            <div className="relative inline-block">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4 animate-bounce">📊</div>
              <div className="absolute -top-1 -right-1 text-lg sm:text-2xl animate-pulse">⭐</div>
              <div className="absolute -bottom-1 -left-1 text-base sm:text-xl animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
              Question Complete!
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg">
              Here's how you're doing so far
            </p>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 border-2 border-white/30 flex-1 flex flex-col justify-center">
            <GameStats {...stats} />
            
            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="flex justify-between text-xs sm:text-sm text-white/80 mb-2">
                <span className="font-medium">Progress</span>
                <span className="font-medium">{stats.wordsCompleted} of {stats.totalWords} completed</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2.5 sm:h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${(stats.wordsCompleted / stats.totalWords) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-blue-100/90 backdrop-blur-sm p-2 sm:p-3 rounded-2xl border-2 border-blue-200">
                <h3 className="font-bold text-blue-800 mb-1 flex items-center gap-1 text-xs sm:text-sm">
                  <span className="text-sm sm:text-base">🎯</span> Accuracy
                </h3>
                <p className="text-blue-700 text-xs font-medium">
                  {stats.correctGuesses + stats.wrongGuesses > 0 
                    ? `${Math.round((stats.correctGuesses / (stats.correctGuesses + stats.wrongGuesses)) * 100)}% of your guesses were correct`
                    : 'No guesses made yet'
                  }
                </p>
              </div>
              
              <div className="bg-yellow-100/90 backdrop-blur-sm p-2 sm:p-3 rounded-2xl border-2 border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-1 flex items-center gap-1 text-xs sm:text-sm">
                  <span className="text-sm sm:text-base">💡</span> Hints
                </h3>
                <p className="text-yellow-700 text-xs font-medium">
                  {stats.hintsUsed === 0 
                    ? 'Great job! No hints needed so far'
                    : `You've used ${stats.hintsUsed} hint${stats.hintsUsed > 1 ? 's' : ''} to help you`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center space-y-3 sm:space-y-4">
            {gameState.currentWordIndex < words.length - 1 ? (
              <>
                <button
                  onClick={handleContinueAfterStats}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-2xl border-2 border-white/30"
                >
                  Continue to Next Word ✨
                </button>
                <p className="text-white/80 text-sm sm:text-base font-medium">
                  {words.length - gameState.currentWordIndex - 1} words remaining
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4 animate-bounce">🎊</div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-6 drop-shadow-lg">
                  Congratulations! You completed all {difficulty} level words!
                </h2>
                <button
                  onClick={handleContinueAfterStats}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-2xl border-2 border-white/30"
                >
                  Choose Another Difficulty 🎯
                </button>
              </>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium border-2 border-white/30 text-xs sm:text-sm"
              >
                🔄 Restart Level
              </button>
              <button
                onClick={handleBackToMenu}
                className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium border-2 border-white/30 text-xs sm:text-sm"
              >
                🏠 Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 relative overflow-hidden flex flex-col">
      <TopLeftLogo />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 py-1 sm:py-2 h-full flex flex-col">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-1 sm:mb-2 flex-shrink-0 pt-12 sm:pt-16">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 text-white font-medium border-2 border-white/30 text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Menu</span>
          </button>
          
          <div className="text-center flex-1 mx-2 sm:mx-4">
            <h1 className="text-sm sm:text-lg lg:text-2xl font-bold text-white drop-shadow-lg">
              {difficulty} • {gameState.currentWordIndex + 1}/{words.length}
            </h1>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleMusic}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 text-white font-medium border-2 border-white/30"
              title={musicEnabled ? 'Disable Music' : 'Enable Music'}
            >
              {musicEnabled ? <Music className="w-3 h-3 sm:w-4 sm:h-4" /> : <MusicOff className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
            <button
              onClick={toggleSound}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 text-white font-medium border-2 border-white/30"
              title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200 text-white font-medium border-2 border-white/30"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-white/30 flex-1 flex flex-col min-h-0">
          {gameState.gameStatus === 'playing' && (
            <>
              {/* Question Section - Fixed height */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 sm:p-3 lg:p-4 relative overflow-hidden flex-shrink-0">
                {/* Background decorations */}
                <div className="absolute top-1 right-2 text-base sm:text-lg animate-pulse">💭</div>
                <div className="absolute bottom-1 left-2 text-sm sm:text-base animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
                
                <h2 className="text-xs sm:text-sm lg:text-base font-bold text-center leading-tight mb-1 sm:mb-2 drop-shadow-lg">
                  {currentWord.question}
                </h2>
                
                {/* Hint Section - Compact */}
                {gameState.showHint && (
                  <div className="mt-1 sm:mt-2 bg-white/20 backdrop-blur-sm rounded-xl p-1.5 sm:p-2 border border-white/30">
                    <div className="flex items-start gap-1 sm:gap-2 text-yellow-100">
                      <div className="bg-yellow-400/30 rounded-full p-0.5 sm:p-1">
                        <Lightbulb className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-xs sm:text-sm font-bold">Hint:</strong>
                        <p className="text-xs sm:text-sm mt-0.5 font-medium leading-tight">{currentWord.hint}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!gameState.showHint && gameState.wrongGuesses < 3 && (
                  <div className="mt-1 sm:mt-2 text-center">
                    <button
                      onClick={handleShowHint}
                      className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 font-medium border border-white/30 text-xs sm:text-sm"
                    >
                      <Lightbulb className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Get Hint 💡
                    </button>
                  </div>
                )}
              </div>

              {/* Game Area - Flexible height */}
              <div className="p-1 sm:p-2 lg:p-3 space-y-1 sm:space-y-2 flex-1 flex flex-col justify-between min-h-0">
                {/* Top section with hangman and word */}
                <div className="flex-shrink-0 space-y-1 sm:space-y-2">
                  {/* Hangman Drawing - Compact */}
                  <div className="flex justify-center">
                    <HangmanDrawing wrongGuesses={gameState.wrongGuesses} />
                  </div>

                  {/* Word Display - Compact */}
                  <WordDisplay 
                    word={currentWord.word} 
                    guessedLetters={gameState.guessedLetters} 
                  />
                  
                  {/* Wrong Guesses Counter - Compact */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/30 backdrop-blur-sm rounded-xl text-white font-bold text-xs sm:text-sm border border-white/30">
                      <span className="text-sm sm:text-base">💀</span>
                      <span>Wrong: {gameState.wrongGuesses}/{maxWrongGuesses}</span>
                    </div>
                  </div>
                </div>
                
                {/* On-Screen Keyboard - Bottom */}
                <div className="flex-shrink-0">
                  <OnScreenKeyboard
                    guessedLetters={gameState.guessedLetters}
                    onLetterClick={handleLetterClick}
                    disabled={gameState.gameStatus !== 'playing'}
                  />
                </div>
              </div>
            </>
          )}

          {/* Game Over Screen */}
          {gameState.gameStatus !== 'playing' && (
            <div className="p-3 sm:p-4 lg:p-6 text-center space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
              <div className={`text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 animate-bounce ${gameState.gameStatus === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                {gameState.gameStatus === 'won' ? '🎉' : '💀'}
              </div>
              
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg ${gameState.gameStatus === 'won' ? 'text-green-100' : 'text-red-100'}`}>
                {gameState.gameStatus === 'won' ? 'Correct! 🎊' : 'Game Over! 😵'}
              </h2>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border-2 border-white/30">
                <p className="text-base sm:text-lg lg:text-xl mb-2 text-white font-bold">
                  The {currentWord.word.includes(' ') ? 'phrase' : 'word'} was: <span className="text-yellow-300">{currentWord.word.toUpperCase()}</span>
                </p>
                <p className="text-white/80 text-sm sm:text-base font-medium">{currentWord.question}</p>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleNextWord}
                  className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-xl border-2 border-white/30"
                >
                  {gameState.gameStatus === 'won' ? 'Continue ✨' : 'Next Word 🚀'}
                </button>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={handleRestart}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium border-2 border-white/30 text-xs sm:text-sm"
                  >
                    🔄 Restart
                  </button>
                  <button
                    onClick={handleBackToMenu}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium border-2 border-white/30 text-xs sm:text-sm"
                  >
                    🏠 Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;