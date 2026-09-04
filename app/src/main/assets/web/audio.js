// Color Fun - Web Audio Sound Synthesizer
(function() {
  class SoundEffects {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.activeNotes = 0;
      this.suspendTimer = null;
    }

    init() {
      try {
        if (!this.ctx && typeof window !== 'undefined') {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            this.ctx = new AudioCtx();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      } catch (e) {
        console.warn('Audio initialization notice:', e);
      }
    }

    scheduleSuspend() {
      if (this.suspendTimer) {
        clearTimeout(this.suspendTimer);
      }
      this.suspendTimer = setTimeout(() => {
        try {
          if (this.ctx && this.ctx.state === 'running' && this.activeNotes <= 0) {
            this.ctx.suspend().catch(() => {});
          }
        } catch (e) {}
      }, 800);
    }

    setEnabled(enabled) {
      this.enabled = !!enabled;
      if (!enabled && this.ctx && this.ctx.state === 'running') {
        try {
          this.ctx.suspend().catch(() => {});
        } catch (e) {}
      }
    }

    playPop() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx || this.ctx.state === 'closed') return;
        
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        this.activeNotes++;
        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch (e) {}
          this.activeNotes = Math.max(0, this.activeNotes - 1);
          this.scheduleSuspend();
        };

        osc.start(now);
        osc.stop(now + 0.09);
      } catch (e) {}
    }

    playClick() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx || this.ctx.state === 'closed') return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        this.activeNotes++;
        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch (e) {}
          this.activeNotes = Math.max(0, this.activeNotes - 1);
          this.scheduleSuspend();
        };

        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    playSparkle() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx || this.ctx.state === 'closed') return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const now = this.ctx.currentTime;

        notes.forEach((freq, i) => {
          try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.06);

            gain.gain.setValueAtTime(0.2, now + i * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            this.activeNotes++;
            osc.onended = () => {
              try {
                osc.disconnect();
                gain.disconnect();
              } catch (e) {}
              this.activeNotes = Math.max(0, this.activeNotes - 1);
              this.scheduleSuspend();
            };

            osc.start(now + i * 0.06);
            osc.stop(now + i * 0.06 + 0.26);
          } catch (e) {}
        });
      } catch (e) {}
    }

    playUndo() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx || this.ctx.state === 'closed') return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.07);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        this.activeNotes++;
        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch (e) {}
          this.activeNotes = Math.max(0, this.activeNotes - 1);
          this.scheduleSuspend();
        };

        osc.start(now);
        osc.stop(now + 0.07);
      } catch (e) {}
    }

    playTrash() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx || this.ctx.state === 'closed') return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        this.activeNotes++;
        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch (e) {}
          this.activeNotes = Math.max(0, this.activeNotes - 1);
          this.scheduleSuspend();
        };

        osc.start(now);
        osc.stop(now + 0.12);
      } catch (e) {}
    }
  }

  const soundsInstance = new SoundEffects();
  window.sounds = soundsInstance;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sounds: soundsInstance };
  }
})();
