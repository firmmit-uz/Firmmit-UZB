/* ============================================================
   FIRMMIT — interaktiv qatlam (BARCHA sahifalarda)
   1) Sarlavha oxiridagi nuqtani olib tashlash.
   2) Magnit tugmalar (faqat sichqonchali qurilmada, reduced-motion'da o'chiq).
   Sichqoncha izi (tuman) v1.1 hujjati bo'yicha olib tashlangan.
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
    if (!document.body) return;
    // Sichqoncha izi (tuman effekti) v1.1 tuzatish hujjati bo'yicha olib tashlandi.

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
