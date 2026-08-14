/* ============================================================
   FIRMMIT — interaktiv qatlam (BARCHA sahifalarda)
   1) Suv-purkash kursor: sichqoncha harakatlanganda purkagichdan
      suv purkalgandek mayda tomchilar sochiladi (issiqxona ruhida).
   2) Magnit tugmalar: asosiy tugmalar kursorga ozgina tortiladi.
   Faqat sichqonchali (pointer:fine) qurilmalarda; touch/mobil va
   reduced-motion'da o'chirilgan. Canvas pointer-events:none — sahifaga
   xalaqit bermaydi (fail-safe).
   ============================================================ */
(function () {
  'use strict';
  if (!window.matchMedia) return;
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    if (!document.body || document.getElementById('fmt-spray')) return;

    /* ---------- Suv-purkash ---------- */
    var cv = document.createElement('canvas');
    cv.id = 'fmt-spray';
    cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9998';
    document.body.appendChild(cv);
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      cv.width = Math.floor(innerWidth * dpr);
      cv.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    addEventListener('resize', resize);

    var drops = [], MAX = 1600;
    var lastX = null, lastY = null;

    function spawn(x, y, speed, dirx, diry) {
      // mayda, JUDA KO'P, KENG doira (purkagich tumani)
      var n = Math.min(34, 8 + Math.floor(speed / 1.6));
      var R = 26;   // keng ta'sir doirasi
      for (var i = 0; i < n; i++) {
        if (drops.length >= MAX) break;
        var spread = (Math.random() - 0.5);
        var sp = 0.4 + Math.random() * 1.2;
        drops.push({
          x: x + (Math.random() - 0.5) * R,
          y: y + (Math.random() - 0.5) * R,
          vx: dirx * sp * (0.3 + speed * 0.035) + spread * 2.6,
          vy: diry * sp * (0.3 + speed * 0.035) + spread * 2.2 + 0.25,
          r: 0.28 + Math.random() * 0.85,          // mayda tomchilar
          life: 1,
          decay: 0.016 + Math.random() * 0.026
        });
      }
    }

    addEventListener('mousemove', function (e) {
      var x = e.clientX, y = e.clientY;
      if (lastX !== null) {
        var dx = x - lastX, dy = y - lastY;
        var speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 1.2) {
          var len = speed || 1;
          spawn(x, y, speed, dx / len, dy / len);
        }
      }
      lastX = x; lastY = y;
    }, { passive: true });

    function frame() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = drops.length - 1; i >= 0; i--) {
        var d = drops[i];
        d.vy += 0.14;          // tortishish (suv pastga tushadi)
        d.vx *= 0.99;
        d.x += d.vx; d.y += d.vy;
        d.life -= d.decay;
        if (d.life <= 0) { drops.splice(i, 1); continue; }
        var a = Math.max(0, d.life);
        var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 2.2);
        g.addColorStop(0, 'rgba(230,246,255,' + (0.34 * a) + ')');
        g.addColorStop(0.5, 'rgba(130,185,255,' + (0.18 * a) + ')');
        g.addColorStop(1, 'rgba(80,140,230,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 2.2, 0, 6.2832);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    /* ---------- Suv-linza kursor: ostidagi HAQIQIY sahifani sindiradi ---------- */
    (function () {
      var supported = (window.CSS && CSS.supports &&
        (CSS.supports('backdrop-filter', 'url(#x)') || CSS.supports('-webkit-backdrop-filter', 'url(#x)') ||
         CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')));
      if (!supported) return;

      // Linza displacement xaritasi (yumaloq shisha tomchi)
      var SZ = 160;
      var c = document.createElement('canvas'); c.width = c.height = SZ;
      var g = c.getContext('2d'); var idata = g.createImageData(SZ, SZ), D = idata.data;
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
      g.putImageData(idata, 0, 0);
      var mapUrl = c.toDataURL();

      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
      svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      var filter = document.createElementNS(ns, 'filter');
      filter.setAttribute('id', 'fmt-lens');
      filter.setAttribute('x', '-30%'); filter.setAttribute('y', '-30%');
      filter.setAttribute('width', '160%'); filter.setAttribute('height', '160%');
      filter.setAttribute('color-interpolation-filters', 'sRGB');
      var feImg = document.createElementNS(ns, 'feImage');
      feImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapUrl);
      feImg.setAttribute('href', mapUrl);
      feImg.setAttribute('result', 'map'); feImg.setAttribute('preserveAspectRatio', 'none');
      feImg.setAttribute('x', '0'); feImg.setAttribute('y', '0'); feImg.setAttribute('width', '100%'); feImg.setAttribute('height', '100%');
      var feDisp = document.createElementNS(ns, 'feDisplacementMap');
      feDisp.setAttribute('in', 'SourceGraphic'); feDisp.setAttribute('in2', 'map');
      feDisp.setAttribute('scale', '60'); feDisp.setAttribute('xChannelSelector', 'R'); feDisp.setAttribute('yChannelSelector', 'G');
      filter.appendChild(feImg); filter.appendChild(feDisp); svg.appendChild(filter);
      document.body.appendChild(svg);

      var lens = document.createElement('div'); lens.id = 'fmt-lens-el';
      lens.style.cssText = 'position:fixed;top:0;left:0;width:120px;height:120px;border-radius:50%;' +
        'pointer-events:none;z-index:9990;transform:translate(-50%,-50%);opacity:0;' +
        'transition:opacity .35s ease, width .25s ease, height .25s ease;' +
        'box-shadow:inset 0 0 16px rgba(255,255,255,.28), inset 0 -6px 14px rgba(0,40,90,.14), 0 8px 22px rgba(0,50,110,.18);' +
        'backdrop-filter:url(#fmt-lens) brightness(1.05) saturate(1.08);' +
        '-webkit-backdrop-filter:url(#fmt-lens) brightness(1.05) saturate(1.08);';
      document.body.appendChild(lens);

      var lx = innerWidth / 2, ly = innerHeight / 2, tx = lx, ty = ly, shown = false;
      addEventListener('mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!shown) { shown = true; lens.style.opacity = '1'; }
      }, { passive: true });
      document.addEventListener('mouseleave', function () { lens.style.opacity = '0'; shown = false; });
      (function loop() {
        lx += (tx - lx) * 0.25; ly += (ty - ly) * 0.25;
        lens.style.left = lx + 'px'; lens.style.top = ly + 'px';
        requestAnimationFrame(loop);
      })();
    })();

    /* ---------- Magnit tugmalar ---------- */
    var mags = document.querySelectorAll('.btn-primary, .ci-add, .pd-add, .nav-catalog');
    mags.forEach(function (el) {
      el.style.transition = 'transform .25s cubic-bezier(.16,1,.1,1)';
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
