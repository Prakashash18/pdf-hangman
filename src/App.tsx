import React, { useState } from 'react';
import { BookOpen, Play, Upload, AlertCircle, Zap, Code } from 'lucide-react';
import { HangmanWord, Difficulty } from './types';
import { extractTextFromPDF } from './utils/pdfParser';
import { generateHangmanWords } from './utils/geminiApi';
import { sampleContent, SampleType } from './utils/sampleContent';
import PDFUploader from './components/PDFUploader';
import DifficultySelector from './components/DifficultySelector';
import GameScreen from './components/GameScreen';
import BoltLogo from './components/BoltLogo';

type AppState = 'menu' | 'upload' | 'processing' | 'difficulty' | 'game' | 'sample-select';

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [words, setWords] = useState<HangmanWord[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<SampleType | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError('');
    setAppState('processing');
    setSelectedSample(null); // Clear sample selection when uploading PDF

    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      setExtractedText(text);
      setAppState('difficulty');
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : 'Failed to process PDF file');
      setAppState('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectSample = (sampleType: SampleType) => {
    setSelectedSample(sampleType);
    setExtractedText(sampleContent[sampleType].text);
    setAppState('difficulty');
  };

  const handleSelectDifficulty = async (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setIsProcessing(true);
    setError('');
    setAppState('processing');

    try {
      let hangmanWords: HangmanWord[];
      
      if (selectedSample) {
        // Use pre-defined sample words
        hangmanWords = sampleContent[selectedSample].words[difficulty];
      } else {
        // Generate hangman words for uploaded PDF
        hangmanWords = await generateHangmanWords(extractedText, difficulty);
      }
      
      setWords(hangmanWords);
      setAppState('game');
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
      setAppState('difficulty');
    } finally {
      setIsProcessing(false);
    }
  };

  const getWordsForDifficulty = (difficulty: Difficulty) => {
    return words.filter(word => word.level === difficulty);
  };

  const getWordCounts = () => {
    if (selectedSample) {
      // Return actual counts for sample content
      return {
        Easy: sampleContent[selectedSample].words.Easy.length,
        Medium: sampleContent[selectedSample].words.Medium.length,
        Hard: sampleContent[selectedSample].words.Hard.length,
      };
    }
    // Since we now generate for specific difficulty, show estimated counts
    return {
      Easy: extractedText ? 15 : 0,
      Medium: extractedText ? 15 : 0,
      Hard: extractedText ? 15 : 0,
    };
  };

  const resetApp = () => {
    setAppState('menu');
    setWords([]);
    setExtractedText('');
    setSelectedSample(null);
    setError('');
    setIsProcessing(false);
  };

  // Top Left Logo Component
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

  return (
    <div className="h-screen overflow-hidden">
      {/* Menu Screen */}
      {appState === 'menu' && (
        <div className="h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 overflow-hidden relative">
          <TopLeftLogo />
          
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 h-full flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-7xl mx-auto h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center w-full">
                
                {/* Left side - Hangman Image - Now visible on all screen sizes */}
                <div className="flex justify-center items-center order-2 lg:order-1">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    {/* Main hangman illustration - Responsive sizing */}
                    <div className="relative transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="banner.png" 
                        alt="Hangman Game Illustration" 
                        className="w-full h-auto max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-72 object-contain drop-shadow-2xl rounded-2xl"
                      />
                      
                      {/* Floating elements around the image - Responsive positioning */}
                      <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 lg:-top-4 lg:-left-4 bg-white/90 backdrop-blur-sm rounded-full p-1 sm:p-1.5 lg:p-2 shadow-lg animate-bounce">
                        <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-purple-600" />
                      </div>
                      
                      <div className="absolute -top-1 -right-3 sm:-top-2 sm:-right-4 lg:-top-3 lg:-right-6 bg-white/90 backdrop-blur-sm rounded-full p-1 sm:p-1.5 lg:p-2 shadow-lg animate-pulse">
                        <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-blue-600" />
                      </div>
                      
                      <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 bg-white/90 backdrop-blur-sm rounded-full p-1 sm:p-1.5 lg:p-2 shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                        <Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600" />
                      </div>
                      
                      {/* Sparkle effects - Responsive sizing */}
                      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 text-yellow-300 text-sm sm:text-base lg:text-lg animate-pulse">✨</div>
                      <div className="absolute bottom-4 left-2 sm:bottom-6 sm:left-3 lg:bottom-8 lg:left-4 text-yellow-300 text-xs sm:text-sm lg:text-base animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
                      <div className="absolute top-2 right-1 sm:top-3 sm:right-2 lg:top-4 lg:right-2 text-yellow-300 text-xs sm:text-sm animate-pulse" style={{animationDelay: '1.5s'}}>💫</div>
                    </div>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="text-center lg:text-left space-y-2 sm:space-y-3 order-1 lg:order-2">
                  <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      PDF Hangman
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Turn study notes into fun, animated Hangman games using AI. Upload a PDF or try our sample content—no login needed!
                    </p>
                    
                    {/* Powered by Bolt.new Badge */}
                    <div className="flex items-center justify-center lg:justify-start gap-2 mt-1 sm:mt-2">
                      <a 
                        href="https://bolt.new" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-200"
                      >
                        <BoltLogo className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-white text-xs sm:text-sm font-medium">
                          Powered by <span className="font-bold">Bolt.new</span>
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 sm:space-y-3">
                    {/* Upload Button */}
                    <button
                      onClick={() => setAppState('upload')}
                      className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-bold text-sm sm:text-base shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:from-yellow-500 hover:to-orange-600 w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center gap-2">
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Upload PDF Notes</span>
                      </div>
                    </button>

                    {/* Sample Content Button */}
                    <button
                      onClick={() => setAppState('sample-select')}
                      className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl font-bold text-sm sm:text-base shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:from-green-500 hover:to-blue-600 w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center gap-2">
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Try Sample Content</span>
                      </div>
                    </button>

                    <p className="text-blue-200 text-xs sm:text-sm">
                      Upload your own PDFs or explore our curated samples
                    </p>
                  </div>

                  {/* Feature highlights - Compact */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <div className="text-center lg:text-left space-y-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200" />
                      </div>
                      <h3 className="font-semibold text-white text-xs sm:text-sm">Smart Extraction</h3>
                      <p className="text-blue-200 text-xs">AI reads your PDFs</p>
                    </div>
                    
                    <div className="text-center lg:text-left space-y-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200" />
                      </div>
                      <h3 className="font-semibold text-white text-xs sm:text-sm">Adaptive Difficulty</h3>
                      <p className="text-blue-200 text-xs">Easy to Hard levels</p>
                    </div>
                    
                    <div className="text-center lg:text-left space-y-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                        <div className="text-sm">🎯</div>
                      </div>
                      <h3 className="font-semibold text-white text-xs sm:text-sm">Engaging Gameplay</h3>
                      <p className="text-blue-200 text-xs">Interactive hangman</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Selection Screen */}
      {appState === 'sample-select' && (
        <div className="h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
          <TopLeftLogo />
          
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-4 lg:space-y-6">
            {/* Header */}
            <div className="space-y-2 lg:space-y-4">
              <div className="relative inline-block">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 lg:mb-4 animate-bounce">🎮</div>
                <div className="absolute -top-1 -right-1 text-lg lg:text-2xl animate-pulse">✨</div>
                <div className="absolute -bottom-1 -left-1 text-base lg:text-xl animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-4 drop-shadow-lg">
                Choose Sample Content
              </h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-2">
                Try our curated educational content to experience the game before uploading your own PDFs
              </p>
            </div>

            {/* Sample Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto">
              {/* Python Programming Sample */}
              <button
                onClick={() => handleSelectSample('python')}
                className="group relative p-4 sm:p-6 lg:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-4 border-blue-300 shadow-xl hover:shadow-3xl"
              >
                {/* Floating emoji */}
                <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 text-2xl sm:text-3xl lg:text-4xl animate-bounce group-hover:animate-spin">
                  🐍
                </div>

                <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4">
                  {/* Icon container */}
                  <div className="relative">
                    <div className="bg-white/30 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto group-hover:bg-white/40 transition-all duration-300 shadow-lg">
                      <Code className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -left-1 text-yellow-200 text-sm animate-pulse">✨</div>
                    <div className="absolute -bottom-1 -right-1 text-yellow-200 text-sm animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold drop-shadow-lg">Python Programming</h3>
                    <p className="text-white/90 text-xs sm:text-sm lg:text-base font-medium">Learn Python concepts through interactive gameplay</p>
                    
                    {/* Word count badges */}
                    <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                      <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold">
                        Easy: {sampleContent.python.words.Easy.length}
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold">
                        Medium: {sampleContent.python.words.Medium.length}
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold">
                        Hard: {sampleContent.python.words.Hard.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>

              {/* Electronics Sample */}
              <button
                onClick={() => handleSelectSample('electronics')}
                className="group relative p-4 sm:p-6 lg:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 bg-gradient-to-br from-yellow-500 to-red-600 text-white border-4 border-yellow-300 shadow-xl hover:shadow-3xl"
              >
                {/* Floating emoji */}
                <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 text-2xl sm:text-3xl lg:text-4xl animate-bounce group-hover:animate-spin">
                  ⚡
                </div>

                <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4">
                  {/* Icon container */}
                  <div className="relative">
                    <div className="bg-white/30 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto group-hover:bg-white/40 transition-all duration-300 shadow-lg">
                      <Zap className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -left-1 text-yellow-200 text-sm animate-pulse">✨</div>
                    <div className="absolute -bottom-1 -right-1 text-yellow-200 text-sm animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold drop-shadow-lg">Electronics Engineering</h3>
                    <p className="text-white/90 text-xs sm:text-sm lg:text-base font-medium">Master electronics concepts through engaging puzzles</p>
                    
                    {/* Word count badges */}
                    <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                      <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold">
                        Easy: {sampleContent.electronics.words.Easy.length}
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold">
                        Medium: {sampleContent.electronics.words.Medium.length}
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold">
                        Hard: {sampleContent.electronics.words.Hard.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
            </div>

            <button
              onClick={resetApp}
              className="inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm lg:text-base border-2 border-white/30"
            >
              <span>←</span> Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Upload Screen */}
      {appState === 'upload' && (
        <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
          <TopLeftLogo />
          
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-4 lg:space-y-6">
            {/* Cartoon-style header */}
            <div className="space-y-2 lg:space-y-4">
              <div className="relative inline-block">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 lg:mb-4 animate-bounce">📚</div>
                <div className="absolute -top-1 -right-1 text-lg lg:text-2xl animate-spin">✨</div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-4 drop-shadow-lg">
                Upload Your Study Notes
              </h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto px-2">
                Choose a PDF file containing your educational materials. 
                We'll extract the content and create personalized Hangman games!
              </p>
            </div>

            <PDFUploader 
              onFileUpload={handleFileUpload} 
              isProcessing={isProcessing}
            />

            {error && (
              <div className="bg-red-100/90 backdrop-blur-sm border-2 border-red-300 rounded-2xl p-3 lg:p-4 flex items-center gap-2 lg:gap-3 text-red-700 shadow-xl mx-2">
                <div className="bg-red-200 rounded-full p-1.5">
                  <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                </div>
                <p className="text-sm lg:text-base font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={resetApp}
              className="inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm lg:text-base"
            >
              <span>←</span> Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Processing Screen */}
      {appState === 'processing' && (
        <div className="h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
          <TopLeftLogo />
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/20 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-yellow-300/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-pink-300/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10 text-center space-y-4 lg:space-y-6 max-w-lg mx-auto">
            {/* Animated processing character */}
            <div className="relative">
              <div className="text-4xl sm:text-5xl lg:text-6xl animate-spin mb-3 lg:mb-6">⚙️</div>
              <div className="absolute -top-2 -right-2 text-lg lg:text-2xl animate-bounce">🤖</div>
              <div className="absolute -bottom-1 -left-2 text-base lg:text-xl animate-pulse">💭</div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-6 drop-shadow-lg">
              {selectedSample 
                ? `Preparing ${sampleContent[selectedSample].title} - ${selectedDifficulty} Level`
                : extractedText 
                  ? `Generating ${selectedDifficulty} Questions` 
                  : 'Processing Your PDF'
              }
            </h2>
            
            <div className="space-y-2 lg:space-y-3 text-white/90">
              {!extractedText ? (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2.5 lg:p-3 flex items-center gap-2 lg:gap-3">
                    <div className="text-xl lg:text-2xl">📖</div>
                    <p className="text-sm lg:text-base font-medium">Extracting text from your document...</p>
                  </div>
                </>
              ) : selectedSample ? (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2.5 lg:p-3 flex items-center gap-2 lg:gap-3">
                    <div className="text-xl lg:text-2xl">{sampleContent[selectedSample].emoji}</div>
                    <p className="text-sm lg:text-base font-medium">Loading {sampleContent[selectedSample].title} content...</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2.5 lg:p-3 flex items-center gap-2 lg:gap-3">
                    <div className="text-xl lg:text-2xl">🎮</div>
                    <p className="text-sm lg:text-base font-medium">Preparing your {selectedDifficulty} level Hangman game...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2.5 lg:p-3 flex items-center gap-2 lg:gap-3">
                    <div className="text-xl lg:text-2xl">🤖</div>
                    <p className="text-sm lg:text-base font-medium">AI is generating {selectedDifficulty} level questions...</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2.5 lg:p-3 flex items-center gap-2 lg:gap-3">
                    <div className="text-xl lg:text-2xl">🎮</div>
                    <p className="text-sm lg:text-base font-medium">Preparing your personalized Hangman game...</p>
                  </div>
                </>
              )}
            </div>
            
            {/* Animated progress bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white/30 rounded-full h-2.5 lg:h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full animate-pulse shadow-lg" style={{width: extractedText ? '80%' : '40%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Difficulty Selection Screen */}
      {appState === 'difficulty' && (
        <div className="h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
          <TopLeftLogo />
          
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-green-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto text-center space-y-4 lg:space-y-6 h-full flex flex-col justify-center">
            {/* Cartoon-style header */}
            <div className="space-y-2 lg:space-y-4">
              <div className="relative inline-block">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 lg:mb-4 animate-bounce">🎯</div>
                <div className="absolute -top-1 -right-1 text-lg lg:text-2xl animate-pulse">⭐</div>
                <div className="absolute -bottom-1 -left-1 text-base lg:text-xl animate-pulse" style={{animationDelay: '0.5s'}}>💫</div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-4 drop-shadow-lg">
                Choose Your Challenge Level
              </h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-2">
                {selectedSample 
                  ? `${sampleContent[selectedSample].title} content is ready! Select your preferred difficulty level.`
                  : 'Your PDF has been processed successfully! Select your preferred difficulty to generate personalized questions.'
                }
              </p>
            </div>

            <DifficultySelector
              onSelectDifficulty={handleSelectDifficulty}
              wordCounts={getWordCounts()}
            />

            {error && (
              <div className="bg-red-100/90 backdrop-blur-sm border-2 border-red-300 rounded-2xl p-3 lg:p-4 flex items-center gap-2 lg:gap-3 text-red-700 shadow-xl max-w-2xl mx-auto">
                <div className="bg-red-200 rounded-full p-1.5">
                  <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                </div>
                <p className="text-sm lg:text-base font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={resetApp}
              className="inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm lg:text-base"
            >
              <span>←</span> {selectedSample ? 'Back to Menu' : 'Upload Different PDF'}
            </button>
          </div>
        </div>
      )}

      {/* Game Screen */}
      {appState === 'game' && (
        <GameScreen
          words={words}
          difficulty={selectedDifficulty}
          onBackToMenu={resetApp}
          onBackToDifficulty={() => setAppState('difficulty')}
        />
      )}
    </div>
  );
}

export default App;