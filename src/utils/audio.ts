// Web Audio API tactile scrapbooking sound synthesizer

class ScrapbookAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;
  private ambientSource: AudioNode | null = null;

  constructor() {
    // Check saved mute state
    const saved = localStorage.getItem('art_of_us_audio_muted');
    if (saved === 'true') {
      this.isMuted = true;
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('art_of_us_audio_muted', String(this.isMuted));
    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx ? this.ctx.currentTime : 0);
    } else if (!this.isMuted && this.ambientGain && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx ? this.ctx.currentTime : 0);
    }
    return this.isMuted;
  }

  // Soft paper rustle / page turn
  public playPaperRustle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink-ish noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.12;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.22);
      filter.Q.value = 1.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Vintage mechanical camera shutter click
  public playCameraClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;

      // 1st click (curtain opening)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.035);

      oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);

      // 2nd mechanical shutter release (45ms later)
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const o2 = this.ctx.createOscillator();
        const g2 = this.ctx.createGain();
        o2.type = 'triangle';
        o2.frequency.setValueAtTime(950, this.ctx.currentTime);
        o2.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.05);

        g2.gain.setValueAtTime(0.2, this.ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        o2.connect(g2);
        g2.connect(this.ctx.destination);
        o2.start();
        o2.stop(this.ctx.currentTime + 0.06);
      }, 45);
    } catch {
      // Audio fallback
    }
  }

  // Washi tape peel
  public playTapePeel() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.08);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2200;

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio fallback
    }
  }

  // Heavy rubber ink stamp thud
  public playStampThud() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // Audio fallback
    }
  }

  // Toggle ambient room sound (soft rain + vinyl crackle)
  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      }
      if (this.ambientSource) {
        try {
          (this.ambientSource as AudioBufferSourceNode).stop();
        } catch {
          // fallback
        }
        this.ambientSource = null;
      }
      this.isAmbientPlaying = false;
      return false;
    }

    try {
      this.initCtx();
      if (!this.ctx) return false;
      const ctx = this.ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink rain noise with occasional vinyl crackle
      let lastVal = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastVal = (lastVal + 0.02 * white) / 1.02;
        // occasional needle pop
        const pop = Math.random() < 0.0006 ? (Math.random() - 0.5) * 0.8 : 0;
        data[i] = lastVal * 0.15 + pop;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      const targetGain = this.isMuted ? 0 : 0.08;
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      noise.start();
      this.ambientSource = noise;
      this.isAmbientPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const scrapbookAudio = new ScrapbookAudio();
