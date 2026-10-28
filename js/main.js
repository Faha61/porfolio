(function () {
  'use strict';
  var root = document.documentElement;

  // Theme
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark';
    if (dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'dark');
    try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
  });

  // Mobile menu
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menu-btn');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Copy buttons
  document.querySelectorAll('.copy').forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = label; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
      else done();
    });
  });

  // Timing race: 30.7 s is played back over 3.5 s of real time
  var BEFORE = 30.7, AFTER = 0.49, PLAY_MS = 3500;
  var tb = document.getElementById('t-before'), ta = document.getElementById('t-after');
  var fb = document.getElementById('f-before'), fa = document.getElementById('f-after');
  var raf = null;
  function show(sb, sa) {
    tb.textContent = sb.toFixed(1) + ' s';
    ta.textContent = sa.toFixed(2) + ' s';
    fb.style.width = (sb / BEFORE * 100) + '%';
    fa.style.width = Math.max(sa / BEFORE * 100, sa > 0 ? 1.6 : 0) + '%';
  }
  function final() { show(BEFORE, AFTER); }
  function run() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { final(); return; }
    cancelAnimationFrame(raf);
    var start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / PLAY_MS * BEFORE, BEFORE);
      show(t, Math.min(t, AFTER));
      if (t < BEFORE) raf = requestAnimationFrame(tick); else final();
    })(start);
  }
  document.getElementById('replay').addEventListener('click', run);
  run();
})();
