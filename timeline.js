/**
 * timeline.js — Renders both timeline sections from config.
 * Each entry alternates left/right on desktop.
 */
const Timeline = (() => {

  function renderBefore() {
    const container = document.getElementById('timeline-before-container');
    if (!container) return;
    _render(container, CONFIG.timelineBefore);
  }

  function renderAfter() {
    const container = document.getElementById('timeline-after-container');
    if (!container) return;

    if (!CONFIG.timelineAfter || CONFIG.timelineAfter.length === 0) {
      // Empty state — show placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'timeline-empty-hearts fade-target';
      placeholder.setAttribute('data-delay', '0');
      placeholder.innerHTML = '♡ &nbsp; ♡ &nbsp; ♡';
      container.appendChild(placeholder);
      return;
    }

    _render(container, CONFIG.timelineAfter);
  }

  function _render(container, entries) {
    entries.forEach((entry, idx) => {
      const side = idx % 2 === 0 ? 'right' : 'left';
      const delay = idx * 120;

      const el = document.createElement('div');
      el.className = `timeline-entry ${side} fade-target`;
      el.setAttribute('data-delay', delay);

      // Dot
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      el.appendChild(dot);

      // Card
      const card = document.createElement('div');
      card.className = 'timeline-card';

      // Date label
      const dateEl = document.createElement('span');
      dateEl.className = 'timeline-date';
      dateEl.textContent = entry.date;
      card.appendChild(dateEl);

      // Media
      const mediasEl = _buildMedia(entry.media, side);
      card.appendChild(mediasEl);

      el.appendChild(card);
      container.appendChild(el);
    });
  }

  function _buildMedia(mediaItems, side) {
    const wrap = document.createElement('div');

    const images = mediaItems.filter(m => m.type === 'image');
    const videos = mediaItems.filter(m => m.type === 'video');

    if (images.length > 0) {
      const pWrap = document.createElement('div');
      pWrap.className = 'timeline-polaroids';
      images.forEach(item => {
        const pol = _makePolaroid(item, side);
        pWrap.appendChild(pol);
      });
      wrap.appendChild(pWrap);
    }

    if (videos.length > 0) {
      videos.forEach(item => {
        const vWrap = _makeVideo(item);
        wrap.appendChild(vWrap);
      });
    }

    return wrap;
  }

  function _makePolaroid(item, side) {
    const pol = document.createElement('div');
    pol.className = 'polaroid';

    const img = document.createElement('img');
    img.src     = CONFIG.mediaBase + item.src;
    img.alt     = item.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';

    pol.appendChild(img);
    return pol;
  }

  function _makeVideo(item) {
    const wrapper = document.createElement('div');
    wrapper.className = 'timeline-video-wrapper';

    const video = document.createElement('video');
    video.controls  = true;
    video.playsInline = true;
    video.muted     = false;
    video.preload   = 'none';
    video.setAttribute('playsinline', '');

    const source = document.createElement('source');
    source.src  = CONFIG.mediaBase + item.src;
    // Determine type
    const ext = item.src.split('.').pop().toLowerCase();
    source.type = ext === 'mp4' ? 'video/mp4' : 'video/quicktime';

    video.appendChild(source);
    wrapper.appendChild(video);
    return wrapper;
  }

  return { renderBefore, renderAfter };
})();
