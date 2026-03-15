/**
 * love-notes.js — Clickable icons that reveal note cards.
 */
const LoveNotes = (() => {
  // SVG icons keyed by type
  const ICONS = {
    envelope: '',
    heart: '',
    gift: '',
  };

  function render() {
    const grid = document.getElementById('love-notes-grid');
    if (!grid) return;

    grid.innerHTML = '';

    CONFIG.loveNotes.forEach((note, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'note-trigger-wrap fade-target';
      wrap.setAttribute('data-delay', String(idx * 150));

      // Trigger button
      const trigger = document.createElement('button');
      trigger.className = `note-trigger icon-${note.icon}`;
      trigger.setAttribute('aria-label', note.label);
      trigger.innerHTML = ICONS[note.icon] || ICONS.heart;
      trigger.addEventListener('click', () => _open(wrap));
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
        _close(wrap);
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

  function _open(wrap) {
    const trigger = wrap.querySelector('.note-trigger');
    const label = wrap.querySelector('.note-trigger-label');
    const card = wrap.querySelector('.note-card');

    if (!trigger || !label || !card) return;

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

  function _close(wrap) {
    const trigger = wrap.querySelector('.note-trigger');
    const label = wrap.querySelector('.note-trigger-label');
    const card = wrap.querySelector('.note-card');

    if (!trigger || !label || !card) return;

    card.classList.add('hidden');
    trigger.classList.remove('hidden', 'opening');
    label.classList.remove('hidden');
  }

  return { render };
})();
