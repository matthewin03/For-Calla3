/**
 * letter.js — 3-phase Gravity Falls letter reveal:
 *   Phase 1: Fence gate swings open
 *   Phase 2: Waddles + envelope appear, click envelope to open
 *   Phase 3: Letter unfolds and text fades in
 */
const Letter = (() => {
  let phase = 0; // 0=fence, 1=envelope, 2=letter

  function render() {
    _buildFence();
    _buildWaddlesEnvelope();
    _buildLetter();
  }

  function init() {
    // Set up gate click
    const gate = document.getElementById('fence-gate');
    if (gate) {
      gate.addEventListener('click', _phase1);
    }
  }

  /* ============================================================
     PHASE 1: Fence
     ============================================================ */
  function _buildFence() {
    const scene = document.getElementById('fence-scene');
    if (!scene) return;

    const gate = document.getElementById('fence-gate');
    if (!gate) return;

    gate.innerHTML = `
      <div class="fence-panel">
        <div class="fence-pickets">
          <div class="fence-picket"></div>
          <div class="fence-picket"></div>
          <div class="fence-picket"></div>
          <div class="fence-picket"></div>
          <div class="fence-picket"></div>
          <div class="fence-picket"></div>
        </div>
        <div class="fence-sign-rope"></div>
        <div class="fence-sign-wrap">
          <span class="fence-sign-main">Do not open</span>
          <span class="fence-sign-sub">(you should definitely click it)</span>
        </div>
      </div>
    `;
  }

  function _phase1() {
    if (phase !== 0) return;
    phase = 1;

    const gate = document.getElementById('fence-gate');
    gate.classList.add('open');
    gate.style.pointerEvents = 'none';

    setTimeout(() => {
      gate.classList.add('hidden');
      _showWaddlesEnvelope();
    }, 950);
  }

  /* ============================================================
     PHASE 2: Waddles + Envelope
     ============================================================ */
  function _buildWaddlesEnvelope() {
    const waddlesSection = document.getElementById('waddles-letter');
    if (!waddlesSection) return;

    waddlesSection.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:flex-start;">
        <div class="letter-text-bubble">A letter for you ✉️</div>
        <img
          src="${CONFIG.mediaBase}Waddles.png"
          alt="Waddles"
          class="waddles-letter-img"
        />
      </div>

      <div class="envelope-wrap">
        <div class="envelope" id="pink-envelope" role="button" aria-label="Open the envelope" tabindex="0">
          <div class="envelope-body"></div>
          <div class="envelope-flap"></div>
          <div class="heart-seal">❤️</div>
        </div>
        <p class="envelope-cta">click to open ↑</p>
      </div>
    `;
  }

  function _showWaddlesEnvelope() {
    const wSection = document.getElementById('waddles-letter');
    wSection.classList.remove('hidden');

    // Bind envelope click
    setTimeout(() => {
      const env = document.getElementById('pink-envelope');
      if (env) {
        env.addEventListener('click', _phase2);
        env.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') _phase2();
        });
      }
    }, 100);
  }

  function _phase2() {
    if (phase !== 1) return;
    phase = 2;

    const env = document.getElementById('pink-envelope');
    env.classList.add('open');
    env.style.pointerEvents = 'none';

    setTimeout(() => {
      _showLetter();
    }, 650);
  }

  /* ============================================================
     PHASE 3: Letter
     ============================================================ */
  function _buildLetter() {
    const container = document.getElementById('letter-content');
    if (!container) return;

    const letter = CONFIG.letter;
    const paper  = document.createElement('div');
    paper.className = 'letter-paper';

    // Salutation
    const sal = document.createElement('span');
    sal.className = 'letter-salutation';
    sal.textContent = letter.salutation;
    paper.appendChild(sal);

    // Paragraphs — appended later via _showLetter() with staggered setTimeout
    // Store them as data on the container for retrieval
    paper.dataset.letterReady = '1';

    // Closing + sig also added dynamically — append placeholders
    paper.appendChild(document.createComment('paragraphs inserted by _showLetter'));

    // Closing (hidden until letter shows)
    const closing = document.createElement('span');
    closing.className = 'letter-closing';
    closing.textContent = letter.closing;
    closing.style.opacity = '0';
    paper.appendChild(closing);

    const sig = document.createElement('span');
    sig.className = 'letter-signature';
    sig.textContent = letter.signature;
    sig.style.opacity = '0';
    paper.appendChild(sig);

    // Wax stamp
    const stamp = document.createElement('div');
    stamp.className = 'letter-stamp';
    stamp.textContent = '❤';
    paper.appendChild(stamp);

    container.appendChild(paper);
  }

  function _showLetter() {
    const container = document.getElementById('letter-content');
    container.classList.remove('hidden');
    container.style.animation = 'fadeInUp 0.6s ease both';

    // Scroll letter into view smoothly
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);

    // Stagger-append paragraphs into the paper so each triggers a fresh animation
    const paper   = container.querySelector('.letter-paper');
    const closing = container.querySelector('.letter-closing');
    const sig     = container.querySelector('.letter-signature');
    const letter  = CONFIG.letter;
    const BASE_DELAY = 500; // ms before first paragraph
    const STAGGER    = 220; // ms between each

    letter.paragraphs.forEach((text, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = 'letter-paragraph';
        p.textContent = text;
        // Insert before closing span
        paper.insertBefore(p, closing);
      }, BASE_DELAY + i * STAGGER);
    });

    // Closing + signature after all paragraphs
    const totalParas = letter.paragraphs.length;
    setTimeout(() => {
      closing.style.animation = 'letterTextIn 0.5s ease both';
      closing.style.opacity   = '1';
    }, BASE_DELAY + totalParas * STAGGER);

    setTimeout(() => {
      sig.style.animation = 'letterTextIn 0.5s ease both';
      sig.style.opacity   = '1';
    }, BASE_DELAY + (totalParas + 1) * STAGGER);
  }

  return { render, init };
})();
