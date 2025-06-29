export interface HangmanWord {
  word: string;
  question: string;
  hint: string;
  level: 'Easy' | 'Medium' | 'Hard';
}

export interface GameState {
  currentWordIndex: number;
  guessedLetters: string[];
  wrongGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
  showHint: boolean;
  score: number;
  totalWords: number;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface GameStats {
  wordsCompleted: number;
  totalWords: number;
  correctGuesses: number;
  wrongGuesses: number;
  hintsUsed: number;
}