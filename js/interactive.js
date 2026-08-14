/* ============================================================
   FIRMMIT — interaktiv qatlam (BARCHA sahifalarda)
   1) Kursor harakatlanganda YO'NALISH bo'yicha JUDA MAYDA suv
      tomchilari sochilib/otilib chiqadi (tutun harakati kabi:
      tez harakatda kengroq/uzoqroq otiladi, tarqoq sochiladi),
      keyin tushib yo'qoladi.
   2) Magnit tugmalar.
   Faqat sichqonchali (pointer:fine); touch/mobil va reduced-motion'da
   o'chirilgan. Canvas pointer-events:none — sahifaga xalaqit bermaydi.
   ============================================================ */
(function () {
  'use strict';
  if (!window.matchMedia) return;
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    if (!document.body || document.getElementById('fmt-spray')) return;

    /* ---- Juda mayda suv tomchilari (tutun harakati) ---- */
    var cv = document.createElement('canvas');
    cv.id = 'fmt-spray';
    cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9993';
    document.body.appendChild(cv);
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() { cv.width = Math.floor(innerWidth * dpr); cv.height = Math.floor(innerHeight * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    resize(); addEventListener('resize', resize);

    var drops = [], MAX = 700, plx = null, ply = null;

    function spawn(x, y, sp, dirx, diry) {
      // tez harakat -> ko'proq va uzoqroq otiladi (tutun kabi), tarqoq sochiladi
      var n = Math.min(20, 4 + Math.floor(sp / 3));
      for (var i = 0; i < n; i++) {
        if (drops.length >= MAX) break;
        var s1 = (Math.random() - 0.5), s2 = (Math.random() - 0.5);
        drops.push({
          x: x + s1 * 30, y: y + s2 * 30,                          // tarqoq boshlanish
          vx: dirx * sp * 0.22 + s1 * 5,                           // yo'nalish bo'yicha otiladi + sochiladi
          vy: diry * sp * 0.22 + s2 * 5,
          r: 0.5 + Math.random() * 1.6,                            // JUDA MAYDA
          life: 1, decay: 0.014 + Math.random() * 0.02
        });
      }
    }

    addEventListener('mousemove', function (e) {
      var x = e.clientX, y = e.clientY;
      if (plx !== null) {
        var dx = x - plx, dy = y - ply, sp = Math.sqrt(dx * dx + dy * dy);
        if (sp > 3) { var len = sp || 1; spawn(x, y, sp, dx / len, dy / len); }
      }
      plx = x; ply = y;
    }, { passive: true });

    (function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = drops.length - 1; i >= 0; i--) {
        var d = drops[i];
        d.vy += 0.13; d.vx *= 0.98; d.x += d.vx; d.y += d.vy; d.life -= d.decay;
        if (d.life <= 0) { drops.splice(i, 1); continue; }
        var a = Math.max(0, d.life);
        var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 2.2);
        g.addColorStop(0, 'rgba(232,247,255,' + (0.55 * a) + ')');
        g.addColorStop(0.5, 'rgba(140,195,255,' + (0.3 * a) + ')');
        g.addColorStop(1, 'rgba(90,150,235,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 2.2, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(frame);
    })();

    /* ---- Magnit tugmalar (BARCHA tugmalar, dinamiklar ham) ---- */
    var MAGSEL = '.btn, .ci-add, .pd-add, .nav-catalog, .cat-chip, button, [role=button]';
    var lastMag = null;
    document.addEventListener('mousemove', function (e) {
      var b = e.target.closest ? e.target.closest(MAGSEL) : null;
      if (b) {
        if (lastMag && lastMag !== b) { lastMag.style.transform = ''; }
        lastMag = b;
        if (b.style.transition.indexOf('transform') === -1) b.style.transition = 'transform .25s cubic-bezier(.16,1,.1,1)';
        var rr = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - (rr.left + rr.width / 2)) * 0.2) + 'px,' + ((e.clientY - (rr.top + rr.height / 2)) * 0.35) + 'px)';
      } else if (lastMag) { lastMag.style.transform = ''; lastMag = null; }
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
