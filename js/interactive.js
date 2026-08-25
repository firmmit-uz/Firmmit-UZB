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
/* ====== Sarlavha/lidlardan gap oxiridagi nuqtani olib tashlash (BARCHA til) ======
   i18n keshlanган originallariga tegmaydi (kalitlar buzilmaydi) — faqat ko'rinadigan
   matndan oxirgi nuqtani olib tashlaydi. Har render/til almashuvidan keyin ishlaydi. */
(function () {
  var SEL = '.display, .section-title, .lead, .eyebrow, .hero-title, .page-hero h1, .hero h1, .cta-band h2, .flow-step h3, .flow-step p, .card h3, .card p';
  function stripEl(el) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), last = null, n;
    while ((n = w.nextNode())) { if (n.nodeValue && n.nodeValue.trim()) last = n; }
    if (last) { var v = last.nodeValue.replace(/([.。．])(\s*)$/, '$2'); if (v !== last.nodeValue) last.nodeValue = v; }
  }
  function run() { try { document.querySelectorAll(SEL).forEach(stripEl); } catch (e) {} }
  function schedule() { setTimeout(run, 80); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule); else schedule();
  document.addEventListener('firmmit:lang', schedule);
})();

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

    var drops = [], MAX = 850, plx = null, ply = null;

    function spawn(x, y, sp, ang) {
      // Yumshoq oq TUMAN (fog) konusi: yirik yumshoq bo'laklar qo'shilib bulut hosil qiladi,
      // chetlarida eng mayda tomchilar sochiladi.
      var n = Math.min(30, 10 + Math.floor(sp / 2));
      var maxSpread = 0.56 + Math.min(sp * 0.014, 0.5);   // kengroq konus
      for (var i = 0; i < n; i++) {
        if (drops.length >= MAX) break;
        var sa = (Math.random() - 0.5) * 2 * maxSpread;
        var a2 = ang + sa;
        var speed = sp * (0.05 + Math.random() * 0.2);
        var edge = Math.abs(sa) / maxSpread;               // 0 markaz .. 1 chet
        var haze = Math.random() < 0.72;                   // ko'pi yumshoq tuman, ozi mayda tomchi
        var r = haze ? (2 + (1 - edge) * 6 + Math.random() * 3) : (0.35 + Math.random() * 1.1);
        drops.push({
          x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(a2) * speed + (Math.random() - 0.5) * 0.9,
          vy: Math.sin(a2) * speed + (Math.random() - 0.5) * 0.9,
          r: r, grow: haze ? 0.18 : 0.02,
          alpha: haze ? 0.09 : 0.42,
          life: 1, decay: haze ? (0.008 + Math.random() * 0.012) : (0.02 + Math.random() * 0.02)
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
        d.vy += 0.04;
        d.vx += (Math.random() - 0.5) * 0.14; d.vy += (Math.random() - 0.5) * 0.14;  // billowing (tuman aylanishi)
        d.vx *= 0.985; d.vy *= 0.985; d.x += d.vx; d.y += d.vy; d.r += d.grow; d.life -= d.decay;
        if (d.life <= 0) { drops.splice(i, 1); continue; }
        var a = Math.max(0, d.life);
        var rr = d.r * 2.1;
        var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rr);
        g.addColorStop(0, 'rgba(255,255,255,' + (d.alpha * a * 0.55) + ')');
        g.addColorStop(0.5, 'rgba(250,252,255,' + (d.alpha * 0.3 * a) + ')');
        g.addColorStop(1, 'rgba(245,250,255,0)');
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
