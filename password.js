/**
 * password.js — handles password gate unlock
 */
const Password = (() => {
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;

    const input = document.getElementById('password-input');
    const button = document.getElementById('password-submit');

    if (!input || !button) return;

    button.addEventListener('click', tryUnlock);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        tryUnlock();
      }
    });
  }

  function tryUnlock() {
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');
    const passwordSection = document.getElementById('section-password');
    const introSection = document.getElementById('section-intro');

    if (!input || !passwordSection || !introSection) return;

    const entered = input.value.trim();

    if (entered === CONFIG.password) {
      if (error) error.classList.add('hidden');

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }

      if (typeof Music !== 'undefined' && Music.start) {
        Music.start();
      }

      passwordSection.classList.add('hidden');
      introSection.classList.remove('hidden');

      const introVideo = document.getElementById('intro-video');
      const source = introVideo ? introVideo.querySelector('source') : null;

      if (introVideo && source && !source.src) {
        source.src = CONFIG.mediaBase + CONFIG.intro.videoSrc;
        introVideo.load();
      }
    } else {
      if (error) error.classList.remove('hidden');
      input.value = '';
      input.focus();
    }
  }

  return { init };
})();
