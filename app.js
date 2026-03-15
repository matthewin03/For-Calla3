document.addEventListener('DOMContentLoaded', () => {
  if (window.__CALLA_APP_INITIALIZED__) return;
  window.__CALLA_APP_INITIALIZED__ = true;

  Password.init();

  const finalImg = document.getElementById('final-polaroid-img');
  if (finalImg) {
    finalImg.src = CONFIG.mediaBase + CONFIG.finalPolaroid.imageSrc;
  }

  const btsVideo = document.getElementById('bts-video');
  const btsSource = btsVideo ? btsVideo.querySelector('source') : null;
  if (btsSource) {
    btsSource.src = CONFIG.mediaBase + CONFIG.bts.src;
    btsVideo.load();
  }

  const introOverlayText = document.querySelector('.intro-overlay-text');
  if (introOverlayText) introOverlayText.textContent = CONFIG.intro.overlayText;

  const introNextBtn = document.getElementById('intro-next-btn');
  if (introNextBtn) introNextBtn.textContent = CONFIG.intro.buttonText;

  Music.init();
  Cursor.init();
  PigRunner.init();

  Timeline.renderBefore();
  Timeline.renderAfter();
  LoveNotes.render();
  Letter.render();

  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle && !musicToggle.dataset.bound) {
    musicToggle.addEventListener('click', Music.toggle);
    musicToggle.dataset.bound = 'true';
  }

  Letter.init();
});
