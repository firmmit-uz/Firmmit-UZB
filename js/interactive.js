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
    feDisp.setAttribute('scale', '26'); feDisp.setAttribute('xChannelSelector', 'R'); feDisp.setAttribute('yChannelSelector', 'G');
    filter.appendChild(feImg); filter.appendChild(feDisp); svg.appendChild(filter);
    document.body.appendChild(svg);

    var style = document.createElement('style');
    style.textContent = '.fmt-drop{position:fixed;top:0;left:0;border-radius:50%;pointer-events:none;z-index:9990;' +
      'box-shadow:inset 0 0 4px rgba(255,255,255,.4), inset 0 -2px 4px rgba(0,40,90,.18), 0 2px 6px rgba(0,60,120,.16);' +
      (supported ? 'backdrop-filter:url(#fmt-lens) brightness(1.06);-webkit-backdrop-filter:url(#fmt-lens) brightness(1.06);' :
                   'background:radial-gradient(circle at 40% 35%, rgba(255,255,255,.5), rgba(150,195,255,.22) 60%, rgba(120,170,255,0));') +
      'will-change:transform,opacity;}';
    document.head.appendChild(style);

    /* ---- Purkash: kursor harakatida mayda linza-tomchilar ---- */
    var drops = [], MAX = 48, lastX = null, lastY = null;
    var R = 60;   // linza kengligidagi ta'sir doirasi

    function spawn(x, y, speed, dx, dy) {
      var n = Math.min(6, 2 + Math.floor(speed / 7));
      for (var i = 0; i < n; i++) {
        if (drops.length >= MAX) break;
        var ang = Math.random() * 6.2832, rad = Math.sqrt(Math.random()) * R;
        var px = x + Math.cos(ang) * rad, py = y + Math.sin(ang) * rad;
        var size = 9 + Math.random() * 17;
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

    /* ---- Magnit tugmalar ---- */
    var mags = document.querySelectorAll('.btn-primary, .ci-add, .pd-add, .nav-catalog');
    mags.forEach(function (el) {
      el.style.transition = 'transform .25s cubic-bezier(.16,1,.1,1)';
      el.addEventListener('mousemove', function (e) {
        var rr = el.getBoundingClientRect();
        var mx = (e.clientX - (rr.left + rr.width / 2)) * 0.18;
        var my = (e.clientY - (rr.top + rr.height / 2)) * 0.28;
        el.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
