/**
 * pig.js — Little Waddles roaming randomly around the entire screen.
 * Wanders toward random target points, bounces off edges, leaves mud footprints.
 */
const PigRunner = (() => {
  let el;
  const SIZE         = 68;  // px — pig width/height approx
  const SPEED        = 1.6; // px per frame (slower = calmer)
  const FOOTSTEP_GAP = 42;  // travel distance between footprint drops
  const ARRIVE_DIST  = 90;  // pick new target when within this distance
  const FALLBACK_MS  = 6000; // fallback retarget if somehow stuck

  // Current position (fixed viewport coords)
  let px = 0, py = 0;
  // Current velocity
  let vx = 0, vy = 0;
  // Target position
  let tx = 0, ty = 0;

  let distSinceLastPrint = 0;
  let hoofToggle  = 0;
  let retargetTimer = null;
  let justRetargeted = false; // debounce rapid retarget
  let stopped = false;

  const HOOF_PAIRS = [
    { offsets: [-14, 4]  },
    { offsets: [-4,  14] },
  ];

  function init() {
    el = document.createElement('div');
    el.id = 'running-pig';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<img src="${CONFIG.mediaBase}Waddles.png" alt="">`;
    document.body.appendChild(el);

    // Start near bottom center
    px = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4;
    py = window.innerHeight * 0.7;

    _pickTarget();
    requestAnimationFrame(_loop);
  }

  function _pickTarget() {
    // Random spot anywhere on screen with padding
    const pad = SIZE + 24;
    tx = pad + Math.random() * (window.innerWidth  - pad * 2);
    ty = pad + Math.random() * (window.innerHeight - pad * 2);

    justRetargeted = true;
    setTimeout(() => { justRetargeted = false; }, 800);

    // Fallback: force a new target if somehow pig gets stuck
    clearTimeout(retargetTimer);
    retargetTimer = setTimeout(_pickTarget, FALLBACK_MS + Math.random() * 3000);
  }

  function _loop() {
    if (stopped) return;
    const dx   = tx - px;
    const dy   = ty - py;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Arrive at target → pick a new one
    if (dist < ARRIVE_DIST && !justRetargeted) {
      _pickTarget();
    }

    // Smoothly blend velocity toward target direction (higher = snappier turns)
    const targetVx = (dx / dist) * SPEED;
    const targetVy = (dy / dist) * SPEED;
    vx += (targetVx - vx) * 0.055;
    vy += (targetVy - vy) * 0.055;

    // Advance position
    px += vx;
    py += vy;

    // Soft bounce off all edges (dampen, don't reverse sharply)
    if (px < 0)                        { px = 0;                        vx =  Math.abs(vx) * 0.5; }
    if (px > window.innerWidth - SIZE) { px = window.innerWidth - SIZE; vx = -Math.abs(vx) * 0.5; }
    if (py < 0)                        { py = 0;                        vy =  Math.abs(vy) * 0.5; }
    if (py > window.innerHeight - SIZE){ py = window.innerHeight - SIZE; vy = -Math.abs(vy) * 0.5; }

    // Bob only when actually moving, to avoid jitter when nearly still
    const speed = Math.sqrt(vx * vx + vy * vy);
    const bob = speed > 0.4 ? Math.sin(Date.now() * 0.01) * 2.5 : 0;

    // Flip based on horizontal velocity (with a small dead-zone)
    const facing = vx > 0.1 ? 1 : vx < -0.1 ? -1 : (el._facing || 1);
    el._facing = facing;

    el.style.left      = px + 'px';
    el.style.top       = (py + bob) + 'px';
    el.style.bottom    = 'auto';
    el.style.transform = `scaleX(${facing})`;

    // Footprints — only when moving meaningfully
    if (speed > 0.3) {
      distSinceLastPrint += speed;
      if (distSinceLastPrint >= FOOTSTEP_GAP) {
        _dropFootprint(px, py, facing);
        distSinceLastPrint = 0;
      }
    }

    requestAnimationFrame(_loop);
  }

  function _dropFootprint(pigX, pigY, facing) {
    const pair = HOOF_PAIRS[hoofToggle % HOOF_PAIRS.length];
    hoofToggle++;

    pair.offsets.forEach(offset => {
      const fp = document.createElement('div');
      fp.className = 'mud-footprint';
      fp.setAttribute('aria-hidden', 'true');

      fp.innerHTML = `<svg width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="3.5" cy="4.5" rx="3" ry="4" fill="#7a4f2e" opacity="0.6"/>
        <ellipse cx="9.5" cy="4.5" rx="3" ry="4" fill="#7a4f2e" opacity="0.6"/>
      </svg>`;

      const cx = pigX + SIZE / 2;
      fp.style.position  = 'fixed';
      fp.style.left      = (cx + offset * facing - 6) + 'px';
      fp.style.top       = (pigY + SIZE - 10) + 'px';
      if (facing === -1) fp.style.transform = 'scaleX(-1)';

      document.body.appendChild(fp);
      setTimeout(() => fp.remove(), 2400);
    });
  }

  function stop() {
    stopped = true;
    clearTimeout(retargetTimer);
    if (el) el.style.display = 'none';
    // Remove any lingering footprints immediately
    document.querySelectorAll('.mud-footprint').forEach(fp => fp.remove());
  }

  return { init, stop };
})();
