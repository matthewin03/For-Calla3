/**
 * app.js — Main orchestrator
 * Initializes all modules on DOMContentLoaded.
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Set static asset srcs from config ---- */
  const finalImg = document.getElementById('final-polaroid-img');
  if (finalImg) {
    finalImg.src = CONFIG.mediaBase + CONFIG.finalPolaroid.imageSrc;
  }

  const btsVideo  = document.getElementById('bts-video');
  const btsSource = btsVideo ? btsVideo.querySelector('source') : null;
  if (btsSource) {
    btsSource.src = CONFIG.mediaBase + CONFIG.bts.src;
    btsVideo.load(); // reset source selection so play() works after preload="none"
  }

  /* ---- Set intro overlay text from config ---- */
  const introOverlayText = document.querySelector('.intro-overlay-text');
  if (introOverlayText) introOverlayText.textContent = CONFIG.intro.overlayText;

  const introNextBtn = document.getElementById('intro-next-btn');
  if (introNextBtn) introNextBtn.textContent = CONFIG.intro.buttonText;

  /* ---- Init modules ---- */
  Music.init();
  Cursor.init();
  PigRunner.init();

  /* ---- Render dynamic sections ---- */
  Timeline.renderBefore();
  Timeline.renderAfter();
  LoveNotes.render();
  Letter.render();

  /* ---- Wire music toggle ---- */
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', Music.toggle);
  }

  /* ---- Init password gate (starts the whole flow) ---- */
  Password.init();

  /* ---- Letter fence init (called once, waits for user interaction) ---- */
  // Letter.init() is deferred until after waddles-letter is shown;
  // it's set up inside letter.js _showWaddlesEnvelope().
  // Call it now to set up the fence gate click listener.
  Letter.init();

  /* ---- Keyboard accessibility: Enter on password input ---- */
  // Already handled inside password.js
});
