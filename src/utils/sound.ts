// Synthesized Sound System using Web Audio API to prevent external asset load issues

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    this.enabled = false;
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  toggleSound() {
    this.enabled = false;
    return false;
  }

  isSoundEnabled() {
    return false;
  }

  playChip() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Bell sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Chip click frequency
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  playCardFlip() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Create high-pass noise for card swish
      const bufferSize = ctx.sampleRate * 0.12; // 0.12 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.12);
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  playTick() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  playWin() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Play rising major scale fanfare chord
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.5);
      });
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  playShuffle() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Play 3 rapid card flips
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          this.playCardFlip();
        }, i * 150);
      }
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }

  playDragonRoar() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Low-frequency detuned oscillators for the rumble
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainOsc = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(65, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 1.8);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(66.5, now);
      osc2.frequency.exponentialRampToValueAtTime(46, now + 1.8);

      // LFO for growling frequency modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(9, now); // 9 Hz vibration
      lfoGain.gain.setValueAtTime(25, now);

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      // Noise generator for wind / fire breath
      const bufferSize = ctx.sampleRate * 1.8; // 1.8s
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.Q.value = 4;
      noiseFilter.frequency.setValueAtTime(150, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(900, now + 0.6);
      noiseFilter.frequency.exponentialRampToValueAtTime(220, now + 1.8);

      const gainNoise = ctx.createGain();
      gainNoise.gain.setValueAtTime(0.01, now);
      gainNoise.gain.linearRampToValueAtTime(0.35, now + 0.1);
      gainNoise.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      gainOsc.gain.setValueAtTime(0.01, now);
      gainOsc.gain.linearRampToValueAtTime(0.30, now + 0.15);
      gainOsc.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      // Connect
      osc1.connect(gainOsc);
      osc2.connect(gainOsc);
      noise.connect(noiseFilter);
      noiseFilter.connect(gainNoise);

      gainOsc.connect(ctx.destination);
      gainNoise.connect(ctx.destination);

      lfo.start(now);
      osc1.start(now);
      osc2.start(now);
      noise.start(now);

      lfo.stop(now + 1.8);
      osc1.stop(now + 1.8);
      osc2.stop(now + 1.8);
      noise.stop(now + 1.8);
    } catch (e) {
      console.warn('Audio failed to play dragon roar', e);
    }
  }

  playTigerRoar() {
    if (!this.enabled) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Aggressive detuned sawtooth oscillators
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainOsc = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(95, now);
      osc1.frequency.exponentialRampToValueAtTime(65, now + 1.4);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(97, now);
      osc2.frequency.exponentialRampToValueAtTime(66.2, now + 1.4);

      // High-speed LFO to simulate roaring throat vibrations (amplitude modulation)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(24, now); // 24 Hz vibration
      lfoGain.gain.setValueAtTime(35, now);

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      // Noise source
      const bufferSize = ctx.sampleRate * 1.4; // 1.4s
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Tight, screaming throat bandpass filter
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.Q.value = 5;
      noiseFilter.frequency.setValueAtTime(250, now);
      noiseFilter.frequency.linearRampToValueAtTime(550, now + 0.15);
      noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 1.4);

      // WaveShaper node for raw animal distortion
      const shaper = ctx.createWaveShaper();
      const makeDistortionCurve = (amount = 40) => {
        const k = typeof amount === 'number' ? amount : 50;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < n_samples; ++i) {
          const x = (i * 2) / n_samples - 1;
          curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
      };
      shaper.curve = makeDistortionCurve(60);
      shaper.oversample = '4x';

      const gainNoise = ctx.createGain();
      gainNoise.gain.setValueAtTime(0.01, now);
      gainNoise.gain.linearRampToValueAtTime(0.40, now + 0.05);
      gainNoise.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      gainOsc.gain.setValueAtTime(0.01, now);
      gainOsc.gain.linearRampToValueAtTime(0.35, now + 0.08);
      gainOsc.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      // Connect
      osc1.connect(shaper);
      osc2.connect(shaper);
      shaper.connect(gainOsc);

      noise.connect(noiseFilter);
      noiseFilter.connect(gainNoise);

      gainOsc.connect(ctx.destination);
      gainNoise.connect(ctx.destination);

      lfo.start(now);
      osc1.start(now);
      osc2.start(now);
      noise.start(now);

      lfo.stop(now + 1.4);
      osc1.stop(now + 1.4);
      osc2.stop(now + 1.4);
      noise.stop(now + 1.4);
    } catch (e) {
      console.warn('Audio failed to play tiger roar', e);
    }
  }
}

export const sound = new SoundManager();
