/**
 * music.js — Background audio controller
 * Music starts only after user interaction (password button click)
 * to satisfy browser autoplay policy.
 */
const Music = (() => {
  let audio = null;
  let playing = false;
  let initialized = false;

  function init() {
    audio = new Audio();
    audio.loop = true;
    audio.volume = 0.32;
    audio.preload = 'none';
  }

  function start() {
    if (!audio) return;
    // Set src here (inside user gesture chain) for best compatibility
    audio.src = CONFIG.mediaBase + CONFIG.audio.src;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          playing = true;
          initialized = true;
          _showToggle();
          _updateToggle();
        })
        .catch((err) => {
          // Autoplay blocked — show toggle so user can manually start
          console.warn('Music autoplay blocked:', err);
          initialized = true;
          playing = false;
          _showToggle();
          _updateToggle();
        });
    }
  }

  function toggle() {
    if (!audio) return;
    if (playing) {
      audio.pause();
      playing = false;
    } else {
      audio.play().then(() => { playing = true; _updateToggle(); });
    }
    _updateToggle();
  }

  function _showToggle() {
    const btn = document.getElementById('music-toggle');
    if (btn) {
      btn.classList.remove('hidden');
      btn.style.animation = 'fadeInUp 0.5s ease both';
    }
  }

  function _updateToggle() {
    const btn = document.getElementById('music-toggle');
    if (!btn) return;
    btn.textContent = playing
      ? 'Music too much? Tap me.'
      : 'Okay okay I\'ll shut up';
  }

  // Lower volume for video playback, restore after
  function duck() {
    if (!audio) return;
    _fadeTo(0.06, 800);
  }

  function unduck() {
    if (!audio) return;
    _fadeTo(0.32, 1200);
  }

  function _fadeTo(target, durationMs) {
    const start = audio.volume;
    const diff   = target - start;
    const steps  = 30;
    const interval = durationMs / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      audio.volume = Math.max(0, Math.min(1, start + diff * (step / steps)));
      if (step >= steps) clearInterval(t);
    }, interval);
  }

  return { init, start, toggle, duck, unduck };
})();
