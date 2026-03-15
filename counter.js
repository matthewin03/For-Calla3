/**
 * counter.js — Live relationship counter
 * Counts up from CONFIG.anniversaryDate.
 */
const Counter = (() => {
  let intervalId = null;
  let prevDays = -1, prevHours = -1, prevMins = -1;

  function start() {
    _tick();
    intervalId = setInterval(_tick, 15000); // update every 15s
  }

  function _tick() {
    const now  = new Date();
    const diff = now - CONFIG.anniversaryDate; // ms

    if (diff < 0) {
      // Before the anniversary date — show 0s
      _set('count-days', 0);
      _set('count-hours', 0);
      _set('count-mins', 0);
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);

    if (days  !== prevDays)  { _set('count-days',  days,  prevDays  !== -1); prevDays  = days; }
    if (hours !== prevHours) { _set('count-hours', hours, prevHours !== -1); prevHours = hours; }
    if (mins  !== prevMins)  { _set('count-mins',  mins,  prevMins  !== -1); prevMins  = mins; }
  }

  function _set(id, val, animate) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = val;
    if (animate) {
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    }
  }

  return { start };
})();
