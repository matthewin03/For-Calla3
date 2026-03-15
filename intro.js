/**
 * intro.js — Intro video controller
 * Shows boxed intro video near top of page without locking access.
 */
const Intro = (() => {
  let section, video, nextBtn;
  let fallbackTimer = null;

  function show() {
    section = document.getElementById('section-intro');
    video   = document.getElementById('intro-video');
    nextBtn = document.getElementById('intro-next-btn');

    const movSource = video.querySelector('source[type="video/quicktime"]');
    const mp4Source = video.querySelector('source[type="video/mp4"]');

    if (mp4Source) mp4Source.src = CONFIG.mediaBase + CONFIG.intro.videoSrc;
    if (movSource) movSource.src = CONFIG.mediaBase + CONFIG.intro.videoSrc;
    video.load();

    // Show intro section
    section.classList.remove('hidden');
    section.style.opacity = '0';

    setTimeout(() => {
      section.style.transition = 'opacity 0.7s ease';
      section.style.opacity = '1';
    }, 50);

    // Show main content immediately so user can scroll right away
    _showMain();

    // Slightly lower music at first so intro video can be heard
    Music.duck();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setTimeout(() => {
            Music.unduck();
          }, 1500);
        })
        .catch(() => {
          _showFallback();
          Music.unduck();
        });
    } else {
      Music.unduck();
    }

    // Show button immediately — no forced full watch
    nextBtn.classList.remove('hidden');
    nextBtn.addEventListener('click', _onNextClick);

    // Optional fallback if video fails to load
    fallbackTimer = setTimeout(() => {
      if (video && video.readyState === 0) {
        _showFallback();
      }
    }, 5000);
  }

  function _showFallback() {
    clearTimeout(fallbackTimer);

    if (!video) return;

    video.style.display = 'none';

    const existingFallback = section.querySelector('.intro-fallback');
    if (existingFallback) return;

    const fb = document.createElement('div');
    fb.className = 'intro-fallback';

    const txt = document.createElement('p');
    txt.className = 'intro-fallback-text';
    txt.textContent = CONFIG.intro.overlayText;

    fb.appendChild(txt);
    section.appendChild(fb);
  }

  function _onNextClick() {
    const main = document.getElementById('main-content');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function _showMain() {
    const main = document.getElementById('main-content');

    if (!main || !main.classList.contains('hidden')) return;

    main.classList.remove('hidden');
    main.style.opacity = '0';

    setTimeout(() => {
      main.style.transition = 'opacity 0.7s ease';
      main.style.opacity = '1';

      setTimeout(() => {
        main.style.opacity = '';
        main.style.transition = '';
      }, 750);
    }, 30);

    ScrollObserver.init();
    Counter.start();
  }

  return { show };
})();