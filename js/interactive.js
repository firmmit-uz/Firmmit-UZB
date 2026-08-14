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

    var drops = [], MAX = 1400, plx = null, ply = null;

    function spawn(x, y, sp, ang) {
      // Purkagich KONUSI: zich, JUDA MAYDA tuman; chetlarida eng mayda tomchilar
      var n = Math.min(44, 10 + Math.floor(sp / 1.4));
      var maxSpread = 0.5 + Math.min(sp * 0.012, 0.4);   // tez harakat -> kengroq konus
      for (var i = 0; i < n; i++) {
        if (drops.length >= MAX) break;
        var sa = (Math.random() - 0.5) * 2 * maxSpread;   // konus ichidagi burchak
        var a2 = ang + sa;
        var speed = sp * (0.08 + Math.random() * 0.22);
        var edge = Math.abs(sa) / maxSpread;              // 0 = markaz, 1 = chet
        var r = 0.28 + (1 - edge) * 0.9 + Math.random() * 0.28;   // chetda maydaroq
        drops.push({
          x: x + (Math.random() - 0.5) * 14, y: y + (Math.random() - 0.5) * 14,
          vx: Math.cos(a2) * speed + (Math.random() - 0.5) * 1.1,
          vy: Math.sin(a2) * speed + (Math.random() - 0.5) * 1.1,
          r: r, life: 1, decay: 0.011 + Math.random() * 0.02
        });
      }
    }

    addEventListener('mousemove', function (e) {
      var x = e.clientX, y = e.clientY;
      if (plx !== null) {
        var dx = x - plx, dy = y - ply, sp = Math.sqrt(dx * dx + dy * dy);
        if (sp > 2.5) spawn(x, y, sp, Math.atan2(dy, dx));
      }
      plx = x; ply = y;
    }, { passive: true });

    (function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = drops.length - 1; i >= 0; i--) {
        var d = drops[i];
        d.vy += 0.06; d.vx *= 0.985; d.vy *= 0.985; d.x += d.vx; d.y += d.vy; d.life -= d.decay;
        if (d.life <= 0) { drops.splice(i, 1); continue; }
        var a = Math.max(0, d.life);
        var rr = d.r * 2.1;
        var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rr);
        g.addColorStop(0, 'rgba(255,255,255,' + (0.5 * a) + ')');
        g.addColorStop(0.5, 'rgba(214,236,255,' + (0.22 * a) + ')');
        g.addColorStop(1, 'rgba(150,200,245,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(d.x, d.y, rr, 0, 6.2832); ctx.fill();
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
