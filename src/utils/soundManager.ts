class SoundManager {
  private correctSound: HTMLAudioElement | null = null;
  private errorSound: HTMLAudioElement | null = null;
  private backgroundMusic: HTMLAudioElement | null = null;
  private isEnabled: boolean = true;
  private isMusicEnabled: boolean = true;
  private musicVolume: number = 0.3;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    try {
      // Initialize correct sound
      this.correctSound = new Audio('/correct.mp3');
      this.correctSound.preload = 'auto';
      this.correctSound.volume = 0.7;

      // Initialize error sound
      this.errorSound = new Audio('/error.mp3');
      this.errorSound.preload = 'auto';
      this.errorSound.volume = 0.7;

      // Initialize background music
      this.backgroundMusic = new Audio('/background.mp3');
      this.backgroundMusic.preload = 'auto';
      this.backgroundMusic.volume = this.musicVolume;
      this.backgroundMusic.loop = true; // Loop the background music

      // Handle loading errors gracefully
      this.correctSound.addEventListener('error', () => {
        console.warn('Could not load correct.mp3 sound file');
        this.correctSound = null;
      });

      this.errorSound.addEventListener('error', () => {
        console.warn('Could not load error.mp3 sound file');
        this.errorSound = null;
      });

      this.backgroundMusic.addEventListener('error', () => {
        console.warn('Could not load background.mp3 music file');
        this.backgroundMusic = null;
      });

      // Handle music ended event (shouldn't happen with loop, but just in case)
      this.backgroundMusic.addEventListener('ended', () => {
        if (this.isMusicEnabled) {
          this.playBackgroundMusic();
        }
      });

    } catch (error) {
      console.warn('Sound initialization failed:', error);
      this.correctSound = null;
      this.errorSound = null;
      this.backgroundMusic = null;
    }
  }

  playCorrect() {
    if (this.isEnabled && this.correctSound) {
      try {
        this.correctSound.currentTime = 0; // Reset to start
        this.correctSound.play().catch(error => {
          console.warn('Could not play correct sound:', error);
        });
      } catch (error) {
        console.warn('Error playing correct sound:', error);
      }
    }
  }

  playError() {
    if (this.isEnabled && this.errorSound) {
      try {
        this.errorSound.currentTime = 0; // Reset to start
        this.errorSound.play().catch(error => {
          console.warn('Could not play error sound:', error);
        });
      } catch (error) {
        console.warn('Error playing error sound:', error);
      }
    }
  }

  playBackgroundMusic() {
    if (this.isMusicEnabled && this.backgroundMusic) {
      try {
        this.backgroundMusic.play().catch(error => {
          console.warn('Could not play background music:', error);
        });
      } catch (error) {
        console.warn('Error playing background music:', error);
      }
    }
  }

  pauseBackgroundMusic() {
    if (this.backgroundMusic) {
      try {
        this.backgroundMusic.pause();
      } catch (error) {
        console.warn('Error pausing background music:', error);
      }
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      try {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
      } catch (error) {
        console.warn('Error stopping background music:', error);
      }
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  toggleMusic() {
    this.isMusicEnabled = !this.isMusicEnabled;
    if (this.isMusicEnabled) {
      this.playBackgroundMusic();
    } else {
      this.pauseBackgroundMusic();
    }
    return this.isMusicEnabled;
  }

  setSoundEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  setMusicEnabled(enabled: boolean) {
    this.isMusicEnabled = enabled;
    if (enabled) {
      this.playBackgroundMusic();
    } else {
      this.pauseBackgroundMusic();
    }
  }

  isSoundEnabled() {
    return this.isEnabled;
  }

  isMusicEnabled() {
    return this.isMusicEnabled;
  }

  setVolume(volume: number) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (this.correctSound) {
      this.correctSound.volume = clampedVolume;
    }
    if (this.errorSound) {
      this.errorSound.volume = clampedVolume;
    }
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.musicVolume;
    }
  }

  getMusicVolume() {
    return this.musicVolume;
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();