/**
 * love-notes.js — Clickable icons that reveal note cards.
 */
const LoveNotes = (() => {

  // SVG icons keyed by type
  const ICONS = {
    envelope: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="52" height="36" rx="4" fill="#f48fb1"/>
      <path d="M6 18 L32 36 L58 18" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M6 50 L24 34" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <path d="M58 50 L40 34" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <!-- bow -->
      <circle cx="32" cy="12" r="5" fill="#e91e8c"/>
      <path d="M27 9 Q24 6 22 9 Q24 12 27 9Z" fill="#e91e8c"/>
      <path d="M37 9 Q40 6 42 9 Q40 12 37 9Z" fill="#e91e8c"/>
    </svg>`,

    heart: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 54 C32 54 8 38 8 22 C8 14 14 8 22 8 C26 8 30 10 32 14 C34 10 38 8 42 8 C50 8 56 14 56 22 C56 38 32 54 32 54Z" fill="#ec407a"/>
      <path d="M22 18 C20 18 18 20 18 22" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,

    gift: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="28" width="48" height="28" rx="3" fill="#f48fb1"/>
      <rect x="6" y="20" width="52" height="12" rx="3" fill="#e91e8c"/>
      <!-- ribbon vertical -->
      <rect x="28" y="20" width="8" height="36" fill="#fff" opacity="0.6"/>
      <!-- ribbon horizontal -->
      <rect x="6" y="24" width="52" height="4" fill="#fff" opacity="0.6"/>
      <!-- bow loops -->
      <path d="M32 20 C32 20 20 14 22 8 C24 4 30 6 32 12" fill="#c2185b"/>
      <path d="M32 20 C32 20 44 14 42 8 C40 4 34 6 32 12" fill="#c2185b"/>
      <circle cx="32" cy="20" r="4" fill="#e91e8c"/>
    </svg>`,
  };

  function render() {
  const grid = document.getElementById('love-notes-grid');
  if (!grid) return;

  grid.innerHTML = '';

  CONFIG.loveNotes.forEach((note, idx) => {
    // rest of your existing code...
  });
}

    CONFIG.loveNotes.forEach((note, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'note-trigger-wrap fade-target';
      wrap.setAttribute('data-delay', idx * 150 + '');

      // Trigger button
      const trigger = document.createElement('button');
      trigger.className = `note-trigger icon-${note.icon}`;
      trigger.setAttribute('aria-label', note.label);
      trigger.innerHTML = ICONS[note.icon] || ICONS.heart;
      trigger.addEventListener('click', () => _open(wrap, idx));
      wrap.appendChild(trigger);

      // Label below icon
      const label = document.createElement('span');
      label.className = 'note-trigger-label';
      label.textContent = note.label;
      wrap.appendChild(label);

      // Note card (hidden)
      const card = document.createElement('div');
      card.className = 'note-card hidden';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'note-close';
      closeBtn.textContent = '×';
      closeBtn.setAttribute('aria-label', 'Close note');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        _close(wrap, idx);
      });

      const category = document.createElement('span');
      category.className = 'note-category';
      category.textContent = note.label;

      const msg = document.createElement('p');
      msg.className = 'note-message';
      msg.textContent = note.message;

      card.appendChild(closeBtn);
      card.appendChild(category);
      card.appendChild(msg);
      wrap.appendChild(card);

      grid.appendChild(wrap);
    });
  }

  function _open(wrap, idx) {
    const trigger = wrap.querySelector('.note-trigger');
    const label   = wrap.querySelector('.note-trigger-label');
    const card    = wrap.querySelector('.note-card');

    trigger.classList.add('opening');
    setTimeout(() => {
      trigger.classList.add('hidden');
      label.classList.add('hidden');
      card.classList.remove('hidden');
      // Re-trigger animation
      card.style.animation = 'none';
      void card.offsetWidth;
      card.style.animation = '';
    }, 380);
  }

  function _close(wrap, idx) {
    const trigger = wrap.querySelector('.note-trigger');
    const label   = wrap.querySelector('.note-trigger-label');
    const card    = wrap.querySelector('.note-card');

    card.classList.add('hidden');
    trigger.classList.remove('hidden', 'opening');
    label.classList.remove('hidden');
  }

  return { render };
})();
