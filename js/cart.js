/* ============================================================
   FIRMMIT — savat (cart). localStorage'da saqlanadi.
   Ochiq API: window.FirmmitCart
   ============================================================ */
(function () {
  'use strict';

  var LS = 'firmmit-cart';

  var T = {
    en: { cart:"Cart", empty:"Your cart is empty.", total:"Total", checkout:"Checkout", vat:"incl. VAT", cur:"UZS", add:"Add to cart", added:"Added" },
    uz: { cart:"Savat", empty:"Savat bo'sh.", total:"Jami", checkout:"Rasmiylashtirish", vat:"QQS bilan", cur:"so'm", add:"Savatga", added:"Qo'shildi" },
    ru: { cart:"Корзина", empty:"Корзина пуста.", total:"Итого", checkout:"Оформить", vat:"с НДС", cur:"сум", add:"В корзину", added:"Добавлено" },
    ko: { cart:"장바구니", empty:"장바구니가 비었습니다.", total:"합계", checkout:"주문하기", vat:"VAT 포함", cur:"UZS", add:"담기", added:"추가됨" }
  };
  function lang() { try { return (window.FirmmitI18N && FirmmitI18N.get()) || localStorage.getItem('firmmit-lang') || 'uz'; } catch (e) { return 'uz'; } }
  function t(k) { var d = T[lang()] || T.en; return d[k] != null ? d[k] : (T.en[k] || k); }
  function nameOf(o) { var l = lang(); return o['name_' + l] || o.name_uz || o.name_en || o.name_ru || ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function fmt(v) { var n = parseFloat(v); return isFinite(n) ? Math.round(n).toLocaleString('ru-RU') : '0'; }

  function read() { try { return JSON.parse(localStorage.getItem(LS)) || []; } catch (e) { return []; } }
  function write(items) { localStorage.setItem(LS, JSON.stringify(items)); document.dispatchEvent(new CustomEvent('firmmit:cart')); }

  var API = {
    items: read,
    count: function () { return read().reduce(function (s, i) { return s + i.qty; }, 0); },
    total: function () { return read().reduce(function (s, i) { return s + (parseFloat(i.price) || 0) * i.qty; }, 0); },
    add: function (p) {
      var items = read();
      var found = items.filter(function (i) { return i.slug === p.slug; })[0];
      if (found) { found.qty += 1; }
      else {
        items.push({ slug: p.slug, name_uz: p.name_uz, name_ru: p.name_ru, name_en: p.name_en,
          price: p.price_with_vat, unit: p.unit, image: p.main_image, qty: 1 });
      }
      write(items);
      openDrawer();
    },
    setQty: function (slug, qty) {
      var items = read().map(function (i) { if (i.slug === slug) i.qty = Math.max(1, qty); return i; });
      write(items);
    },
    remove: function (slug) { write(read().filter(function (i) { return i.slug !== slug; })); },
    clear: function () { write([]); }
  };
  window.FirmmitCart = API;

  /* ---- UI (o'zi uslub va tugma qo'shadi) ---- */
  function injectStyles() {
    if (document.getElementById('firmmit-cart-css')) return;
    var css = document.createElement('style');
    css.id = 'firmmit-cart-css';
    css.textContent = [
      '.fc-fab{position:fixed;right:20px;bottom:20px;z-index:900;width:56px;height:56px;border-radius:50%;background:#3365FF;color:#fff;border:none;box-shadow:0 8px 24px rgba(51,101,255,.35);cursor:pointer;display:flex;align-items:center;justify-content:center}',
      '.fc-fab svg{width:24px;height:24px}',
      '.fc-badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#e11d48;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}',
      '.fc-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:950;opacity:0;visibility:hidden;transition:.2s}',
      '.fc-overlay.open{opacity:1;visibility:visible}',
      '.fc-drawer{position:fixed;top:0;right:0;height:100%;width:380px;max-width:90vw;background:#fff;z-index:960;box-shadow:-8px 0 30px rgba(0,0,0,.15);transform:translateX(100%);transition:.25s;display:flex;flex-direction:column;font-family:var(--font,sans-serif)}',
      '.fc-drawer.open{transform:none}',
      '.fc-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #eee}',
      '.fc-head h3{margin:0;font-size:1.1rem}',
      '.fc-close{background:none;border:none;font-size:26px;line-height:1;cursor:pointer;color:#666}',
      '.fc-list{flex:1;overflow-y:auto;padding:10px 16px}',
      '.fc-empty{text-align:center;color:#888;padding:50px 0}',
      '.fc-row{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid #f2f2f2}',
      '.fc-row img{width:56px;height:56px;object-fit:contain;background:#f7f7f8;border-radius:8px}',
      '.fc-row .fc-info{flex:1;min-width:0}',
      '.fc-row .fc-name{font-size:.9rem;font-weight:600;margin-bottom:3px}',
      '.fc-row .fc-price{font-size:.82rem;color:#555}',
      '.fc-qty{display:inline-flex;align-items:center;gap:8px;margin-top:6px}',
      '.fc-qty button{width:26px;height:26px;border:1px solid #ddd;background:#fff;border-radius:6px;cursor:pointer;font-size:15px}',
      '.fc-rm{background:none;border:none;color:#e11d48;cursor:pointer;font-size:.8rem;margin-top:4px}',
      '.fc-foot{padding:16px 20px;border-top:1px solid #eee}',
      '.fc-total{display:flex;justify-content:space-between;font-weight:700;font-size:1.05rem;margin-bottom:12px}',
      '.fc-checkout{display:block;width:100%;text-align:center;padding:14px;background:#3365FF;color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer;text-decoration:none}',
      '.ci-add{margin-top:8px;width:100%;padding:9px;border:1.5px solid #3365FF;background:#fff;color:#3365FF;border-radius:10px;font-weight:600;cursor:pointer;font-family:var(--font,sans-serif)}',
      '.ci-add:hover{background:#3365FF;color:#fff}',
      '.ci-link{text-decoration:none;color:inherit;display:block;cursor:pointer}',
      '.ci-link:hover h3{color:#3365FF}'
    ].join('');
    document.head.appendChild(css);
  }

  var fab, overlay, drawer, listBox, totalBox;

  function cartIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/></svg>'; }

  function build() {
    injectStyles();
    fab = document.createElement('button');
    fab.className = 'fc-fab';
    fab.setAttribute('aria-label', 'Cart');
    fab.innerHTML = cartIcon() + '<span class="fc-badge" style="display:none">0</span>';
    fab.addEventListener('click', openDrawer);
    document.body.appendChild(fab);

    overlay = document.createElement('div');
    overlay.className = 'fc-overlay';
    overlay.addEventListener('click', closeDrawer);
    document.body.appendChild(overlay);

    drawer = document.createElement('aside');
    drawer.className = 'fc-drawer';
    drawer.innerHTML =
      '<div class="fc-head"><h3></h3><button class="fc-close" aria-label="close">&times;</button></div>' +
      '<div class="fc-list"></div>' +
      '<div class="fc-foot"><div class="fc-total"><span></span><span class="fc-total-val"></span></div>' +
      '<a class="fc-checkout" href="checkout.html"></a></div>';
    document.body.appendChild(drawer);
    drawer.querySelector('.fc-close').addEventListener('click', closeDrawer);
    listBox = drawer.querySelector('.fc-list');
    render();
  }

  function openDrawer() { if (!drawer) return; render(); overlay.classList.add('open'); drawer.classList.add('open'); }
  function closeDrawer() { overlay.classList.remove('open'); drawer.classList.remove('open'); }

  function render() {
    if (!fab) return;
    var items = read();
    var badge = fab.querySelector('.fc-badge');
    var c = API.count();
    badge.textContent = c; badge.style.display = c ? '' : 'none';
    drawer.querySelector('.fc-head h3').textContent = t('cart');
    drawer.querySelector('.fc-total span:first-child').textContent = t('total');
    drawer.querySelector('.fc-total-val').textContent = fmt(API.total()) + ' ' + t('cur');
    var co = drawer.querySelector('.fc-checkout'); co.textContent = t('checkout');
    co.style.display = items.length ? '' : 'none';

    if (!items.length) { listBox.innerHTML = '<div class="fc-empty">' + esc(t('empty')) + '</div>'; return; }
    listBox.innerHTML = items.map(function (i) {
      var img = i.image ? '<img src="' + esc(i.image) + '" alt="">' : '<div style="width:56px;height:56px;background:#f0f0f0;border-radius:8px"></div>';
      return '<div class="fc-row" data-slug="' + esc(i.slug) + '">' + img +
        '<div class="fc-info"><div class="fc-name">' + esc(nameOf(i)) + '</div>' +
        '<div class="fc-price">' + fmt(i.price) + ' ' + t('cur') + ' · ' + t('vat') + '</div>' +
        '<div class="fc-qty"><button class="fc-minus">−</button><span>' + i.qty + '</span><button class="fc-plus">+</button></div>' +
        '<button class="fc-rm">×</button></div></div>';
    }).join('');
    listBox.querySelectorAll('.fc-row').forEach(function (row) {
      var slug = row.getAttribute('data-slug');
      var it = read().filter(function (x) { return x.slug === slug; })[0];
      row.querySelector('.fc-plus').addEventListener('click', function () { API.setQty(slug, it.qty + 1); });
      row.querySelector('.fc-minus').addEventListener('click', function () { API.setQty(slug, it.qty - 1); });
      row.querySelector('.fc-rm').addEventListener('click', function () { API.remove(slug); });
    });
  }

  document.addEventListener('firmmit:cart', render);
  document.addEventListener('firmmit:lang', render);
  if (document.readyState !== 'loading') build(); else document.addEventListener('DOMContentLoaded', build);
})();
