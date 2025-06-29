import { HangmanWord, Difficulty } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export async function generateHangmanWords(text: string, difficulty: Difficulty): Promise<HangmanWord[]> {
  // Require API key - no fallback to samples
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is required. Please configure VITE_GEMINI_API_KEY in your environment variables.');
  }

  // Generate a random seed for variety in question generation
  const randomSeed = Math.floor(Math.random() * 10000);
  
  // Define difficulty-specific requirements
  const difficultySpecs = {
    Easy: {
      wordLength: '4-7 letters',
      complexity: 'basic concepts, common academic terms, fundamental principles',
      examples: 'atom, cell, force, light, sound, plant, water',
      count: 15,
      format: 'single words only (no spaces, hyphens, apostrophes)'
    },
    Medium: {
      wordLength: '8-12 letters',
      complexity: 'intermediate concepts, technical terms, processes and systems',
      examples: 'molecule, organism, velocity, reaction, equation, function',
      count: 15,
      format: 'single words only (no spaces, hyphens, apostrophes)'
    },
    Hard: {
      wordLength: '13+ letters OR multi-word phrases (2-4 words)',
      complexity: 'advanced concepts, specialized terminology, complex processes, scientific phrases',
      examples: 'photosynthesis, mitochondria, electromagnetic, thermodynamics, cellular respiration, quantum mechanics, natural selection',
      count: 15,
      format: 'single long words (13+ letters) OR multi-word phrases (2-4 words with spaces between them)'
    }
  };

  const spec = difficultySpecs[difficulty];
  
  const prompt = `You are an educational game designer creating ${difficulty} level Hangman questions from academic content.

RANDOMIZATION SEED: ${randomSeed} (use this to vary your selection approach and question styles)

DIFFICULTY LEVEL: ${difficulty}
- Word/Phrase Length: ${spec.wordLength}
- Complexity: ${spec.complexity}
- Examples: ${spec.examples}
- Format: ${spec.format}

From the following educational text, create exactly ${spec.count} unique academic terms suitable for ${difficulty} level Hangman gameplay.

WORD/PHRASE REQUIREMENTS FOR ${difficulty} LEVEL:
- Length: ${spec.wordLength}
- Complexity: ${spec.complexity}
- Format: ${spec.format}
${difficulty === 'Hard' ? `
- For Hard level specifically:
  * Can be single long words (13+ letters) like "photosynthesis", "electromagnetic"
  * OR multi-word phrases (2-4 words) like "cellular respiration", "natural selection", "quantum mechanics"
  * Multi-word phrases should have spaces between words
  * Only use alphabetic characters and spaces (no hyphens, apostrophes, numbers, punctuation)
  * No proper nouns or brand names` : `
- Only alphabetic characters (a-z, A-Z)
- No proper nouns or brand names`}
- Educationally valuable terms from the provided text

QUESTION CREATION STRATEGY:
- Vary your selection approach each time using the randomization seed
- Mix question types: definitions, functions, examples, relationships, processes
- Use different question starters: "What is...", "Which process...", "What term describes...", "What concept explains..."
- Make questions engaging and educational
- Ensure questions clearly point to the target word/phrase
- Match question complexity to ${difficulty} level

HINT GUIDELINES:
- Provide complementary information that doesn't repeat the question
- Include context, examples, or related concepts appropriate for ${difficulty} level
- Help students learn while playing
- Add educational value beyond the main question

For each term, create a JSON object:
{
  "word": "${difficulty === 'Hard' ? 'single long word (13+ letters) OR multi-word phrase with spaces' : 'single word only, ' + spec.wordLength + ', letters only'}",
  "question": "engaging ${difficulty}-level question testing understanding",
  "hint": "additional educational clue for ${difficulty} level",
  "level": "${difficulty}"
}

IMPORTANT: All words/phrases must be exactly ${difficulty} level difficulty. ${difficulty === 'Hard' ? 'For Hard level, ensure proper spacing in multi-word phrases (e.g., "cellular respiration" not "cellularrespiration").' : `Focus only on terms that match the ${spec.wordLength} requirement and ${spec.complexity} complexity.`}

Text to analyze: ${text.substring(0, 4000)}

Respond with a valid JSON array only (no additional text):`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8, // High creativity for variety
          topK: 50, // Diverse token selection
          topP: 0.9,
          maxOutputTokens: 4000, // Enough space for detailed responses
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No content generated from API');
    }

    // Extract JSON array from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON array found in API response');
    }

    const hangmanWords = JSON.parse(jsonMatch[0]) as HangmanWord[];
    
    // Validate the structure
    if (!Array.isArray(hangmanWords) || hangmanWords.length === 0) {
      throw new Error('Invalid response format from API');
    }

    // Validate and filter words for the specific difficulty
    const validWords = hangmanWords.filter(word => {
      // Check required fields
      if (!word.word || !word.question || !word.hint || !word.level) {
        return false;
      }
      
      // Check that level matches requested difficulty
      if (word.level !== difficulty) {
        return false;
      }
      
      // Check word format based on difficulty
      if (difficulty === 'Hard') {
        // For Hard: allow letters and spaces only
        if (!/^[a-zA-Z\s]+$/.test(word.word)) {
          return false;
        }
        
        // Trim and normalize spaces
        word.word = word.word.trim().replace(/\s+/g, ' ');
        
        // Check if it's a single long word (13+ letters) or multi-word phrase
        const wordParts = word.word.split(' ');
        if (wordParts.length === 1) {
          // Single word - must be 13+ letters
          return word.word.length >= 13;
        } else if (wordParts.length >= 2 && wordParts.length <= 4) {
          // Multi-word phrase - each word should be meaningful (2+ letters)
          return wordParts.every(part => part.length >= 2);
        } else {
          return false;
        }
      } else {
        // For Easy/Medium: only letters, no spaces
        if (!/^[a-zA-Z]+$/.test(word.word)) {
          return false;
        }
        
        // Check word length matches difficulty requirements
        const wordLength = word.word.length;
        switch (difficulty) {
          case 'Easy':
            return wordLength >= 4 && wordLength <= 7;
          case 'Medium':
            return wordLength >= 8 && wordLength <= 12;
          default:
            return false;
        }
      }
    });

    if (validWords.length === 0) {
      throw new Error(`No valid ${difficulty} level words could be generated from the provided text. Please try a different PDF or check that it contains appropriate ${difficulty.toLowerCase()} level academic content.`);
    }

    // Shuffle the words for additional randomization
    const shuffledWords = validWords.sort(() => Math.random() - 0.5);
    
    // Return all valid words (up to the requested count)
    return shuffledWords;

  } catch (error) {
    console.error('Error generating hangman words:', error);
    
    if (error instanceof Error) {
      throw new Error(`Failed to generate ${difficulty} level questions: ${error.message}`);
    } else {
      throw new Error(`Failed to generate ${difficulty} level questions from the provided text.`);
    }
  }
}