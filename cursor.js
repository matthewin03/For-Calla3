/**
 * cursor.js — Floating heart cursor trail
 * Disabled on touch devices (pointer: coarse).
 */
const Cursor = (() => {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  let layer, dot;
  let lastX = 0, lastY = 0;
  let frameId = null;

  const HEARTS = ['♥', '❤', '♡'];

  function init() {
    layer = document.getElementById('cursor-trail-layer');
    dot = document.getElementById('cursor-dot');

    if (isTouch) {
      // On touch devices: show the default cursor, hide dot
      document.body.style.cursor = 'auto';
      document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
        el.style.cursor = 'auto';
      });
      if (dot) dot.style.display = 'none';
      return;
    }

    document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(e) {
    lastX = e.clientX;
    lastY = e.clientY;

    // Move the dot
    if (dot) {
      dot.style.left = lastX + 'px';
      dot.style.top  = lastY + 'px';
    }

    // Throttle heart spawning
    if (Math.random() > 0.55) return;
    spawnHeart(lastX, lastY);
  }

  function spawnHeart(x, y) {
    if (!layer) return;
    const heart = document.createElement('span');
    heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    heart.className = 'cursor-heart';

    const size = 9 + Math.random() * 9;
    const offsetX = (Math.random() - 0.5) * 20;
    const duration = 800 + Math.random() * 400;

    heart.style.cssText = `
      position: absolute;
      left: ${x + offsetX}px;
      top: ${y}px;
      font-size: ${size}px;
      color: var(--color-rose);
      pointer-events: none;
      user-select: none;
      animation: heartFloat ${duration}ms ease-out forwards;
      transform: translate(-50%, -50%);
    `;

    layer.appendChild(heart);
    setTimeout(() => heart.remove(), duration + 50);
  }

  /**
   * Spawn n hearts at random viewport positions — called on password unlock.
   */
  function spawnHearts(n) {
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.8;
        const heart = document.createElement('span');
        heart.textContent = '❤';
        heart.className = 'cursor-heart';
        const size = 18 + Math.random() * 24;
        heart.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          font-size: ${size}px;
          color: var(--color-rose);
          pointer-events: none;
          user-select: none;
          animation: heartSpawn 1.6s ease-out forwards;
          z-index: 99999;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1700);
      }, i * 80);
    }
  }

  return { init, spawnHearts };
})();
