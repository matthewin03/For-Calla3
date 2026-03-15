/**
 * scroll-observer.js — IntersectionObserver for fade-in animations.
 * Call init() after #main-content is visible.
 */
const ScrollObserver = (() => {
  let observer = null;

  function init() {
    // Clean up old observer if called again
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(_onIntersect, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    // Observe all fade targets inside main content
    const targets = document.querySelectorAll('#main-content .fade-target');
    targets.forEach(el => observer.observe(el));

    // Auto-play/pause videos on scroll
    _initVideoPlay();
  }

  function _initVideoPlay() {
    const vidObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          // Try with audio first; fall back to muted if browser blocks it
          v.muted = false;
          v.play().catch(() => {
            v.muted = true;
            v.play().catch(() => {});
          });
        } else {
          v.pause();
          v.muted = false; // reset so next scroll-in plays with audio
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('#main-content video').forEach(v => {
      vidObs.observe(v);
    });
  }

  function _onIntersect(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      observer.unobserve(el); // fire once
    });
  }

  // Expose refresh for dynamically added elements
  function refresh() {
    if (!observer) { init(); return; }
    const targets = document.querySelectorAll('#main-content .fade-target:not(.visible)');
    targets.forEach(el => observer.observe(el));
  }

  return { init, refresh };
})();
