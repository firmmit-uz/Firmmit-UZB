/* ============================================================
   FIRMMIT — interaktiv qatlam (BARCHA sahifalarda)
   1) Suv-purkash: kursor HARAKATLANGANDA mayda tomchilar sepiladi;
      har bir tomcha KICHIK SUV LINZASI bo'lib, ostidagi haqiqiy
      sahifani sindirib (refraksiya) ko'rsatadi, keyin tushib yo'qoladi.
      Doimiy linza YO'Q — faqat harakatda paydo bo'ladi.
   2) Magnit tugmalar.
   Faqat sichqonchali (pointer:fine); touch/mobil va reduced-motion'da
   o'chirilgan. Elementlar pointer-events:none — sahifaga xalaqit bermaydi.
   ============================================================ */
(function () {
  'use strict';
  if (!window.matchMedia) return;
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    if (!document.body || document.getElementById('fmt-lens-defs')) return;

    var supported = window.CSS && CSS.supports &&
      (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'));

    /* ---- Suv-linza displacement xaritasi (yumaloq shisha tomchi) ---- */
    var SZ = 128;
    var c = document.createElement('canvas'); c.width = c.height = SZ;
    var gg = c.getContext('2d'); var idata = gg.createImageData(SZ, SZ), D = idata.data;
    for (var y = 0; y < SZ; y++) for (var x = 0; x < SZ; x++) {
      var idx = (y * SZ + x) * 4;
      var nx = (x / (SZ - 1)) * 2 - 1, ny = (y / (SZ - 1)) * 2 - 1, r = Math.sqrt(nx * nx + ny * ny);
      if (r < 1) {
        var m = Math.pow(r, 1.7), ux = r > 1e-4 ? nx / r : 0, uy = r > 1e-4 ? ny / r : 0;
        D[idx] = Math.round((0.5 - ux * m * 0.5) * 255);
        D[idx + 1] = Math.round((0.5 - uy * m * 0.5) * 255);
        D[idx + 2] = 128; D[idx + 3] = 255;
      } else { D[idx] = 128; D[idx + 1] = 128; D[idx + 2] = 128; D[idx + 3] = 0; }
    }
    gg.putImageData(idata, 0, 0);
    var mapUrl = c.toDataURL();

    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.id = 'fmt-lens-defs';
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    var filter = document.createElementNS(ns, 'filter');
    filter.setAttribute('id', 'fmt-lens');
    filter.setAttribute('x', '-40%'); filter.setAttribute('y', '-40%');
    filter.setAttribute('width', '180%'); filter.setAttribute('height', '180%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    var feImg = document.createElementNS(ns, 'feImage');
    feImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapUrl);
    feImg.setAttribute('href', mapUrl);
    feImg.setAttribute('result', 'map'); feImg.setAttribute('preserveAspectRatio', 'none');
    feImg.setAttribute('x', '0'); feImg.setAttribute('y', '0'); feImg.setAttribute('width', '100%'); feImg.setAttribute('height', '100%');
    var feDisp = document.createElementNS(ns, 'feDisplacementMap');
    feDisp.setAttribute('in', 'SourceGraphic'); feDisp.setAttribute('in2', 'map');
    feDisp.setAttribute('scale', '8'); feDisp.setAttribute('xChannelSelector', 'R'); feDisp.setAttribute('yChannelSelector', 'G');
    filter.appendChild(feImg); filter.appendChild(feDisp); svg.appendChild(filter);
    document.body.appendChild(svg);

    var style = document.createElement('style');
    style.textContent = '.fmt-drop{position:fixed;top:0;left:0;border-radius:50%;pointer-events:none;z-index:9990;' +
      'box-shadow:inset 0 0 1.5px rgba(255,255,255,.45), 0 1px 2px rgba(0,60,120,.14);' +
      (supported ? 'backdrop-filter:url(#fmt-lens) brightness(1.06);-webkit-backdrop-filter:url(#fmt-lens) brightness(1.06);' :
                   'background:radial-gradient(circle at 40% 35%, rgba(255,255,255,.5), rgba(150,195,255,.22) 60%, rgba(120,170,255,0));') +
      'will-change:transform,opacity;}';
    document.head.appendChild(style);

    /* ---- Purkash: kursor harakatida mayda linza-tomchilar ---- */
    var drops = [], MAX = 170, lastX = null, lastY = null;
    var R = 46;   // ta'sir doirasi (zichroq)

    function spawn(x, y, speed, dx, dy) {
      var n = Math.min(18, 5 + Math.floor(speed / 3));
      for (var i = 0; i < n; i++) {
        if (drops.length >= MAX) break;
        var ang = Math.random() * 6.2832, rad = Math.sqrt(Math.random()) * R;
        var px = x + Math.cos(ang) * rad, py = y + Math.sin(ang) * rad;
        var size = 2 + Math.random() * 4;
        var el = document.createElement('div');
        el.className = 'fmt-drop';
        el.style.width = el.style.height = size + 'px';
        document.body.appendChild(el);
        drops.push({
          el: el, x: px, y: py, size: size,
          vx: dx * speed * 0.02 + (Math.random() - 0.5) * 1.3,
          vy: dy * speed * 0.02 + (Math.random() - 0.5) * 0.9 + 0.3,
          life: 1, decay: 0.016 + Math.random() * 0.02
        });
      }
    }

    addEventListener('mousemove', function (e) {
      var x = e.clientX, y = e.clientY;
      if (lastX !== null) {
        var ddx = x - lastX, ddy = y - lastY, sp = Math.sqrt(ddx * ddx + ddy * ddy);
        if (sp > 1.4) { var len = sp || 1; spawn(x, y, sp, ddx / len, ddy / len); }
      }
      lastX = x; lastY = y;
    }, { passive: true });

    (function frame() {
      for (var i = drops.length - 1; i >= 0; i--) {
        var d = drops[i];
        d.vy += 0.12; d.x += d.vx; d.y += d.vy; d.life -= d.decay;
        if (d.life <= 0) { d.el.parentNode && d.el.parentNode.removeChild(d.el); drops.splice(i, 1); continue; }
        var s = 0.7 + d.life * 0.3;
        d.el.style.transform = 'translate(' + (d.x - d.size / 2) + 'px,' + (d.y - d.size / 2) + 'px) scale(' + s + ')';
        d.el.style.opacity = Math.min(1, d.life * 1.5);
      }
      requestAnimationFrame(frame);
    })();

    /* ---- Kursor-yorug'lik (leoparpeix 1-sahifa uslubi): iliq nur kursorda "gullaydi";
           harakatda kuchayib portlab yoritadi (bloom/flare), sekinlashsa pasayadi ---- */
    (function () {
      var f = document.createElement('div'); f.id = 'fmt-glow';
      f.style.cssText = 'position:fixed;top:0;left:0;width:540px;height:540px;border-radius:50%;' +
        'pointer-events:none;z-index:9992;transform:translate(-50%,-50%) scale(.6);opacity:0;mix-blend-mode:screen;' +
        'background:radial-gradient(circle, rgba(255,255,255,.92) 0%, rgba(255,246,218,.6) 16%, rgba(255,228,166,.28) 40%, rgba(255,212,132,0) 70%);';
      document.body.appendChild(f);
      var gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy, lx = null, ly = null, inten = 0, shown = false;
      addEventListener('mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (lx !== null) { var dx = tx - lx, dy = ty - ly; inten = Math.min(inten + Math.sqrt(dx * dx + dy * dy) * 0.02, 1.1); }
        lx = tx; ly = ty; shown = true;
      }, { passive: true });
      document.addEventListener('mouseleave', function () { inten = 0; shown = false; });
      (function loop() {
        gx += (tx - gx) * 0.16; gy += (ty - gy) * 0.16;   // seamless ergashish
        inten *= 0.9;
        var op = shown ? Math.min(0.28 + inten * 0.85, 1) : Math.max(0, inten);
        var sc = 0.55 + inten * 0.6;
        f.style.opacity = op;
        f.style.transform = 'translate(' + gx + 'px,' + gy + 'px) translate(-50%,-50%) scale(' + sc + ')';
        requestAnimationFrame(loop);
      })();
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
        var mx = (e.clientX - (rr.left + rr.width / 2)) * 0.2;
        var my = (e.clientY - (rr.top + rr.height / 2)) * 0.35;
        b.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      } else if (lastMag) { lastMag.style.transform = ''; lastMag = null; }
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
