/* ============================================================
   FIRMMIT — interaktiv qatlam (maxsus kursor + magnit tugmalar)
   Faqat sichqonchali (pointer:fine) qurilmalarda ishlaydi.
   Mobil/touch va reduced-motion'da BUTUNLAY o'chirilgan.
   Native kursor saqlanadi (halqa unga qo'shimcha) — xavfsiz.
   ============================================================ */
(function () {
  'use strict';
  if (!window.matchMedia) return;
  if (!matchMedia('(pointer: fine)').matches) return;               // faqat sichqoncha
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    if (!document.body || document.querySelector('.fmt-ring')) return;

    var css =
      '.fmt-ring{position:fixed;top:0;left:0;width:38px;height:38px;border:1.6px solid rgba(50,100,255,.5);' +
        'border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:0;' +
        'transition:width .28s var(--ease,ease),height .28s var(--ease,ease),background-color .28s,' +
        'border-color .28s,opacity .35s;will-change:left,top}' +
      '.fmt-ring.on{opacity:1}' +
      '.fmt-ring.grow{width:66px;height:66px;background:rgba(50,100,255,.08);border-color:rgba(50,100,255,.75)}' +
      '.fmt-ring.press{width:30px;height:30px}' +
      '.fmt-mag{transition:transform .25s var(--ease,ease)}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var ring = document.createElement('div'); ring.className = 'fmt-ring';
    document.body.appendChild(ring);

    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, shown = false;

    addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; ring.classList.add('on'); }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { ring.classList.remove('on'); shown = false; });
    addEventListener('mousedown', function () { ring.classList.add('press'); });
    addEventListener('mouseup', function () { ring.classList.remove('press'); });

    (function loop() {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();

    // Interaktiv elementlar ustida halqa kattalashsin
    var GROW = 'a,button,.btn,.cat-item,.ci-add,.pd-add,.cat-chip,.pd-thumb,.pd-nav,.fc-fab,input,textarea,select,label,[role=button]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(GROW)) ring.classList.add('grow');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(GROW)) ring.classList.remove('grow');
    });

    // Magnit effekt — asosiy tugmalar kursorga ozgina tortiladi
    var mags = document.querySelectorAll('.btn-primary, .ci-add, .pd-add, .nav-catalog');
    mags.forEach(function (el) {
      el.classList.add('fmt-mag');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
