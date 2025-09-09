/**
 * renderer.js
 * Small helpers exposed globally for script.js to use.
 */

window.createStatsHTML = function(name, level, hpPercent = 100){
  return `
    <div class="stats-row">
      <span class="stats-name">${name}</span>
      <span class="stats-level">Lv ${level}</span>
    </div>
    <div class="hp"><div class="hp-fill" style="width:${hpPercent}%"></div></div>
  `;
};

/**
 * loadImageSafe(imgEl, src, fallback)
 * Attempts to set imgEl.src to src; if it errors, uses fallback (if provided).
 */
window.loadImageSafe = function(imgEl, src, fallback){
  const test = new Image();
  test.onload = () => { imgEl.src = src; };
  test.onerror = () => {
    if (fallback) imgEl.src = fallback;
  };
  test.src = src;
};
