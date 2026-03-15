/**
 * letter.js — 3-phase Gravity Falls letter reveal:
 *   Phase 1: Fence gate swings open
 *   Phase 2: Waddles + envelope appear, click envelope to open
 *   Phase 3: Letter unfolds and text fades in
 */
const Letter = (() => {
  let phase = 0; // 0=fence, 1=envelope, 2=letter
  let initialized = false;

  function render() {
    const gate = document.getElementById('fence-gate');
    const waddles = document.getElementById('waddles-letter');
    const letter = document.getElementById('letter-content');

    if (gate) {
      gate.innerHTML = '';
      gate.classList.remove('open', 'hidden');
      gate.style.pointerEvents = '';
    }

    if (waddles) {
      waddles.innerHTML = '';
      waddles.classList.add('hidden');
    }

    if (letter) {
      letter.innerHTML = '';
      letter.classList.add('hidden');
      letter.style.animation = '';
    }

    phase = 0;

    _buildFence();
    _buildWaddlesEnvelope();
    _buildLetter();
  }

  function init() {
    if (initialized) return;
    initialized = true;

    const gate = document.getElementById('fence-gate');
    if (gate) {
      gate.addEventListener('click', _phase1);
    }
  }

  /* ============================================================
     PHASE 1: Fence
     ============================================================ */
  function _buildFence() {
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
    if (!gate) return;

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
    if (!wSection) return;

    wSection.classList.remove('hidden');

    setTimeout(() => {
      const env = document.getElementById('pink-envelope');
      if (env && !env.dataset.bound) {
        env.addEventListener('click', _phase2);
        env.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') _phase2();
        });
        env.dataset.bound = 'true';
      }
    }, 100);
  }

  function _phase2() {
    if (phase !== 1) return;
    phase = 2;

    const env = document.getElementById('pink-envelope');
    if (!env) return;

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
    const paper = document.createElement('div');
    paper.className = 'letter-paper';

    const sal = document.createElement('span');
    sal.className = 'letter-salutation';
    sal.textContent = letter.salutation;
    paper.appendChild(sal);

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

    const stamp = document.createElement('div');
    stamp.className = 'letter-stamp';
    stamp.textContent = '❤';
    paper.appendChild(stamp);

    container.appendChild(paper);
  }

  function _showLetter() {
    const container = document.getElementById('letter-content');
    if (!container) return;

    const paper = container.querySelector('.letter-paper');
    const closing = container.querySelector('.letter-closing');
    const sig = container.querySelector('.letter-signature');
    const letter = CONFIG.letter;

    if (!paper || !closing || !sig) return;

    // prevent paragraphs from being appended twice
    if (paper.dataset.revealed === 'true') return;
    paper.dataset.revealed = 'true';

    container.classList.remove('hidden');
    container.style.animation = 'fadeInUp 0.6s ease both';

    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);

    const BASE_DELAY = 500;
    const STAGGER = 220;

    letter.paragraphs.forEach((text, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = 'letter-paragraph';
        p.textContent = text;
        paper.insertBefore(p, closing);
      }, BASE_DELAY + i * STAGGER);
    });

    const totalParas = letter.paragraphs.length;

    setTimeout(() => {
      closing.style.animation = 'letterTextIn 0.5s ease both';
      closing.style.opacity = '1';
    }, BASE_DELAY + totalParas * STAGGER);

    setTimeout(() => {
      sig.style.animation = 'letterTextIn 0.5s ease both';
      sig.style.opacity = '1';
    }, BASE_DELAY + (totalParas + 1) * STAGGER);
  }

  return { render, init };
})();
