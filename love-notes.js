/**
 * love-notes.js — Clickable icons that reveal note cards.
 */
const LoveNotes = (() => {
  // SVG icons keyed by type
  const ICONS = {
  envelope: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.9.05 6.53 5.05a1 1 0 0 0 1.14 0l6.53-5.05H4.9Zm14.6 10.2V8.51l-5.97 4.62a2.5 2.5 0 0 1-3.06 0L4.5 8.5V17a.25.25 0 0 0 .25.25h14.5A.25.25 0 0 0 19.5 17Z"/>
    </svg>
  `,
  heart: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.5 10.55 19.2C5.4 14.6 2 11.55 2 7.8 2 4.75 4.42 2.5 7.35 2.5c1.66 0 3.25.77 4.25 2.01A5.6 5.6 0 0 1 15.85 2.5C18.78 2.5 21.2 4.75 21.2 7.8c0 3.75-3.4 6.8-8.55 11.38L12 20.5Z"/>
    </svg>
  `,
  gift: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 7h-2.18A2.99 2.99 0 0 0 18 6c0-1.66-1.34-3-3-3-1.05 0-1.97.54-2.5 1.35A2.99 2.99 0 0 0 10 3C8.34 3 7 4.34 7 6c0 .35.06.69.18 1H5a2 2 0 0 0-2 2v2h8V7h2v4h8V9a2 2 0 0 0-2-2Zm-5-2a1 1 0 1 1 0 2h-2V6a1 1 0 0 1 2-1ZM9 6a1 1 0 1 1 1 1H8a1 1 0 0 1 1-1Zm10 7h-6v8h5a1 1 0 0 0 1-1v-7Zm-8 0H5v7a1 1 0 0 0 1 1h5v-8Z"/>
    </svg>
  `,
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
