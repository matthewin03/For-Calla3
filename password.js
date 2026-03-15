/**
 * password.js — Password gate controller
 * Handles unlock sequence: validate → confetti → hearts → music → intro
 */
const Password = (() => {
  let unlocked = false;

  function init() {
    const input  = document.getElementById('password-input');
    const btn    = document.getElementById('password-submit');
    const errMsg = document.getElementById('password-error');

    btn.addEventListener('click', () => attempt(input, errMsg));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attempt(input, errMsg);
    });

    // Spawn subtle background deco hearts
    _spawnDecoHearts();
  }

  function attempt(input, errMsg) {
    if (unlocked) return;

    const val = input.value.trim();
    if (val === CONFIG.password) {
      unlocked = true;
      _unlock();
    } else {
      _shake(input, errMsg);
    }
  }

  function _shake(input, errMsg) {
    input.classList.remove('shake');
    void input.offsetWidth; // reflow
    input.classList.add('shake');
    input.value = '';
    errMsg.classList.remove('hidden');

    setTimeout(() => {
      input.classList.remove('shake');
      errMsg.classList.add('hidden');
    }, 1500);
  }

  function _unlock() {
    // 1. Fire confetti — inside click handler (user gesture) ✓
    _fireConfetti();

    // 2. Spawn floating hearts
    Cursor.spawnHearts(14);

    // 3. Start background music — inside click handler (user gesture) ✓
    Music.start();

    // 4. After brief celebration, hide pig + transition to intro
    setTimeout(() => {
      PigRunner.stop();

      const pw = document.getElementById('section-password');
      pw.classList.add('fade-out');

      setTimeout(() => {
        pw.classList.add('hidden');
        Intro.show();
      }, 700);
    }, 1400);
  }

  function _fireConfetti() {
    if (typeof confetti === 'undefined') return;

    // Burst from center
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#f9c0cb', '#ffffff', '#ec407a', '#fce4ec', '#f48fb1', '#e91e8c'],
      scalar: 1.1,
    });

    // Side canons
    setTimeout(() => {
      confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ['#f9c0cb', '#fff', '#ec407a'] });
      confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ['#f9c0cb', '#fff', '#ec407a'] });
    }, 250);

    // Slower drift
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 100, startVelocity: 12, decay: 0.94, origin: { x: 0.5, y: 0.4 }, colors: ['#fce4ec', '#f9c0cb', '#fff'] });
    }, 500);
  }

  function _spawnDecoHearts() {
    const wrap = document.querySelector('.pw-deco-hearts');
    if (!wrap) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
      const h = document.createElement('span');
      h.textContent = '❤';
      h.className = 'pw-deco-heart';
      h.style.left = (Math.random() * 100) + '%';
      h.style.bottom = (-10 + Math.random() * 40) + '%';
      h.style.animationDuration = (6 + Math.random() * 8) + 's';
      h.style.animationDelay = (Math.random() * 6) + 's';
      h.style.fontSize = (1 + Math.random() * 2) + 'rem';
      wrap.appendChild(h);
    }
  }

  return { init };
})();
