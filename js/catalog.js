/* ============================================================
   FIRMMIT — jonli mahsulot katalogi (backend API'dan)
   API manzili: window.FIRMMIT_CONFIG.API_BASE (js/config.js)
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.FIRMMIT_CONFIG || {};
  var API = String(CFG.API_BASE || 'http://localhost:8000/api/v1/').replace(/\/+$/, '') + '/';

  /* ---- localized UI strings ---- */
  var T = {
    en: { search:"Search products…", all:"All", sortDefault:"Sort: default", priceAsc:"Price: low to high", priceDesc:"Price: high to low", inStock:"In stock only", pmin:"Price from", pmax:"to", loadMore:"Load more", loading:"Loading…", empty:"No products found.", error:"Could not load products. Check that the server is running and try again.", retry:"Retry", found:"products", vat:"incl. VAT", cur:"UZS", inStockBadge:"In stock", outStock:"On order", pdf:"Catalog (PDF)", eyebrow:"Online Store", title:"Product catalog", subtitle:"Browse our smart-farm components — live prices and availability.", ctaTitle:"Need pricing or bulk orders?", ctaText:"Tell us what you need — we'll send a quote and current availability for your project.", ctaBtn:"Contact us", add:"Add to cart", added:"Added" },
    uz: { search:"Mahsulot qidirish…", all:"Barchasi", sortDefault:"Saralash: standart", priceAsc:"Narx: arzondan qimmatga", priceDesc:"Narx: qimmatdan arzonga", inStock:"Faqat omborda", pmin:"Narx", pmax:"gacha", loadMore:"Ko'proq ko'rish", loading:"Yuklanmoqda…", empty:"Mahsulot topilmadi.", error:"Mahsulotlarni yuklab bo'lmadi. Server ishlayotganini tekshirib, qayta urinib ko'ring.", retry:"Qayta urinish", found:"ta mahsulot", vat:"QQS bilan", cur:"so'm", inStockBadge:"Omborda", outStock:"Buyurtma asosida", pdf:"Katalog (PDF)", eyebrow:"Online savdo", title:"Mahsulot katalogi", subtitle:"Aqlli ferma komponentlari — jonli narx va mavjudlik.", ctaTitle:"Narx yoki ulgurji buyurtma kerakmi?", ctaText:"Nima kerakligini ayting — loyihangiz uchun narx va joriy mavjudlikni yuboramiz.", ctaBtn:"Bog'lanish", add:"Savatga", added:"Qo'shildi" },
    ru: { search:"Поиск товаров…", all:"Все", sortDefault:"Сортировка: по умолчанию", priceAsc:"Цена: по возрастанию", priceDesc:"Цена: по убыванию", inStock:"Только в наличии", pmin:"Цена от", pmax:"до", loadMore:"Показать ещё", loading:"Загрузка…", empty:"Товары не найдены.", error:"Не удалось загрузить товары. Проверьте, что сервер запущен, и повторите.", retry:"Повторить", found:"товаров", vat:"с НДС", cur:"сум", inStockBadge:"В наличии", outStock:"Под заказ", pdf:"Каталог (PDF)", eyebrow:"Онлайн-магазин", title:"Каталог продукции", subtitle:"Компоненты для умных ферм — актуальные цены и наличие.", ctaTitle:"Нужны цены или оптовые заказы?", ctaText:"Сообщите, что вам нужно — пришлём расчёт и актуальное наличие.", ctaBtn:"Связаться с нами", add:"В корзину", added:"Добавлено" },
    ko: { search:"제품 검색…", all:"전체", sortDefault:"정렬: 기본", priceAsc:"가격: 낮은순", priceDesc:"가격: 높은순", inStock:"재고 있음만", pmin:"가격", pmax:"까지", loadMore:"더 보기", loading:"불러오는 중…", empty:"제품을 찾을 수 없습니다.", error:"제품을 불러오지 못했습니다. 서버가 실행 중인지 확인 후 다시 시도하세요.", retry:"다시 시도", found:"개 제품", vat:"VAT 포함", cur:"UZS", inStockBadge:"재고 있음", outStock:"주문 제작", pdf:"카탈로그 (PDF)", eyebrow:"온라인 스토어", title:"제품 카탈로그", subtitle:"스마트팜 부품 — 실시간 가격과 재고", ctaTitle:"가격이나 대량 주문이 필요하신가요?", ctaText:"필요하신 것을 알려주세요 — 견적과 재고를 보내드립니다.", ctaBtn:"문의하기", add:"담기", added:"추가됨" }
  };
  function lang() { try { return (window.FirmmitI18N && FirmmitI18N.get()) || localStorage.getItem('firmmit-lang') || 'uz'; } catch (e) { return 'uz'; } }
  function t(k) { var d = T[lang()] || T.en; return d[k] != null ? d[k] : (T.en[k] || k); }

  /* ---- state ---- */
  var state = { category:'', search:'', ordering:'', in_stock:false, price_min:'', price_max:'', nextUrl:null, count:0, items:[], loading:false };

  /* ---- helpers ---- */
  function nameOf(o) {
    var l = lang();
    if (l === 'ko' && !o.name_ko && window.FIRMMIT_KO_NAMES) { var kn = window.FIRMMIT_KO_NAMES[o.name_en]; if (kn) return kn; }
    return o['name_' + l] || o.name_en || o.name_uz || o.name_ru || '';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function fmtPrice(v) { var n = parseFloat(v); if (!isFinite(n)) return ''; return Math.round(n).toLocaleString('ru-RU'); }
  // upgrade http image URLs to https on secure pages (avoids mixed-content block)
  function fixImg(u) { if (!u) return u; if (location.protocol === 'https:' && /^http:\/\//i.test(u)) return u.replace(/^http:\/\//i, 'https://'); return u; }
  function $(id) { return document.getElementById(id); }

  /* ---- DOM refs (set on init) ---- */
  var grid, chipsBox, countBox, loadingBox, emptyBox, errorBox, moreWrap, moreBtn;

  function boxIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H14l6 6v10.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>'; }

  function cardHTML(pr) {
    var inStock = Number(pr.stock_quantity) > 0;
    var thumb = pr.main_image
      ? '<div class="ci-thumb"><img loading="lazy" alt="' + esc(nameOf(pr)) + '" src="' + esc(fixImg(pr.main_image)) + '"></div>'
      : '<div class="ci-thumb ci-noimg">' + boxIcon() + '</div>';
    var pv = parseFloat(pr.price_with_vat);
    var priceLine = (isFinite(pv) && pv > 0)
      ? '<div class="ci-price">' + fmtPrice(pr.price_with_vat) + ' <span class="ci-cur">' + t('cur') + '</span> <span class="ci-vat">' + t('vat') + '</span></div>'
      : '';
    var unitLine = pr.unit ? '<div class="ci-cat">' + esc(pr.unit) + '</div>' : '';
    var stockCls = inStock ? 'ci-stock' : 'ci-stock ci-out';
    var stockTxt = inStock ? t('inStockBadge') : t('outStock');
    var link = 'product.html?slug=' + encodeURIComponent(pr.slug);
    return '<div class="cat-item">' +
      '<a class="ci-link" href="' + link + '"><div class="ci-thumb-wrap">' + thumb + '<span class="' + stockCls + '">' + stockTxt + '</span></div></a>' +
      '<div class="ci-body">' +
        '<a class="ci-link" href="' + link + '"><h3>' + esc(nameOf(pr)) + '</h3></a>' + priceLine + unitLine +
        '<button type="button" class="ci-add" data-slug="' + esc(pr.slug) + '">' + esc(t('add')) + '</button></div>' +
    '</div>';
  }

  function renderGrid() {
    grid.innerHTML = state.items.map(cardHTML).join('');
  }

  // Yangi kartochkalarni ketma-ket (stagger) suzib chiqarish.
  // Kartochka HECH QACHON yashirilmaydi — .a-in faqat animatsiya qo'shadi (fail-safe).
  // renderdan keyin darhol (paintdan oldin) qo'llanadi, shuning uchun "miltillash" bo'lmaydi.
  function animateCards(fromIndex) {
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var cards = grid.querySelectorAll('.cat-item');
    var wave = 0;
    for (var i = fromIndex; i < cards.length; i++) {
      cards[i].style.setProperty('--as', (wave % 8) * 100 + 'ms');
      cards[i].classList.add('a-in');
      wave++;
    }
  }

  function setState(which) {
    loadingBox.style.display = which === 'loading' ? '' : 'none';
    errorBox.style.display = which === 'error' ? '' : 'none';
    emptyBox.style.display = which === 'empty' ? '' : 'none';
  }

  function updateCount() {
    countBox.textContent = state.count ? (state.count + ' ' + t('found')) : '';
  }
  function updateMore() {
    moreWrap.style.display = state.nextUrl ? '' : 'none';
    moreBtn.textContent = t('loadMore');
  }

  function productsUrl() {
    var p = new URLSearchParams();
    if (state.category) p.set('category', state.category);
    if (state.search) p.set('search', state.search);
    if (state.ordering) p.set('ordering', state.ordering);
    if (state.in_stock) p.set('in_stock', 'true');
    if (state.price_min) p.set('price_min', state.price_min);
    if (state.price_max) p.set('price_max', state.price_max);
    var qs = p.toString();
    return API + 'products/' + (qs ? ('?' + qs) : '');
  }

  function load(reset) {
    if (state.loading) return;
    var url = reset ? productsUrl() : state.nextUrl;
    if (!url) return;
    state.loading = true;
    if (reset) { setState('loading'); moreWrap.style.display = 'none'; }
    else { moreBtn.textContent = t('loading'); }

    fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        var results = data.results || data || [];
        state.count = (data.count != null) ? data.count : results.length;
        state.nextUrl = data.next || null;
        var prevLen = reset ? 0 : state.items.length;
        if (reset) state.items = results.slice();
        else state.items = state.items.concat(results);
        renderGrid();
        animateCards(prevLen);
        updateCount();
        updateMore();
        setState(state.items.length ? '' : 'empty');
      })
      .catch(function () { setState('error'); moreWrap.style.display = 'none'; })
      .then(function () { state.loading = false; });
  }

  function loadCategories() {
    fetch(API + 'categories/', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (data) {
        var cats = data.results || data || [];
        renderChips(cats);
      })
      .catch(function () { /* chips stay empty */ });
  }

  var CATS = [];
  function renderChips(cats) {
    CATS = cats;
    var html = '<button class="cat-chip' + (state.category ? '' : ' active') + '" data-slug="">' + esc(t('all')) + '</button>';
    html += cats.map(function (c) {
      return '<button class="cat-chip' + (state.category === c.slug ? ' active' : '') + '" data-slug="' + esc(c.slug) + '">' + esc(nameOf(c)) + '</button>';
    }).join('');
    chipsBox.innerHTML = html;
    chipsBox.querySelectorAll('.cat-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        state.category = b.getAttribute('data-slug') || '';
        chipsBox.querySelectorAll('.cat-chip').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        load(true);
      });
    });
  }

  /* ---- localize static controls + PDF button ---- */
  function applyLabels() {
    var d = T[lang()] || T.en;
    var s = $('cat-search'); if (s) s.placeholder = d.search;
    var pmin = $('cat-pmin'); if (pmin) pmin.placeholder = d.pmin;
    var pmax = $('cat-pmax'); if (pmax) pmax.placeholder = d.pmax;
    var il = $('cat-instock-label'); if (il) il.textContent = d.inStock;
    var sort = $('cat-sort');
    if (sort) { sort.options[0].textContent = d.sortDefault; sort.options[1].textContent = d.priceAsc; sort.options[2].textContent = d.priceDesc; }
    var pdf = $('cat-pdf'); if (pdf) { var span = pdf.querySelector('span.lbl'); if (span) span.textContent = d.pdf; var map = CFG.CATALOG_PDF || {}; pdf.setAttribute('href', map[lang()] || map.en || 'assets/firmmit-catalog.pdf'); }
    var eb = $('cat-eyebrow'); if (eb) eb.textContent = d.eyebrow;
    var eb2 = $('cat-eyebrow2'); if (eb2) eb2.textContent = d.eyebrow;
    var ti = $('cat-title'); if (ti) ti.textContent = d.title;
    var su = $('cat-subtitle'); if (su) su.textContent = d.subtitle;
    var ct = $('cat-cta-title'); if (ct) ct.textContent = d.ctaTitle;
    var cx = $('cat-cta-text'); if (cx) cx.textContent = d.ctaText;
    var cb = $('cat-cta-btn'); if (cb) { var arr = cb.querySelector('.arrow'); cb.textContent = d.ctaBtn + ' '; if (arr) cb.appendChild(arr); }
    var rt = $('cat-retry'); if (rt) rt.textContent = d.retry;
    loadingBox.textContent = d.loading;
    emptyBox.textContent = d.empty;
    var em = errorBox.querySelector('.err-msg'); if (em) em.textContent = d.error;
    updateCount(); updateMore();
  }

  /* ---- init ---- */
  function debounce(fn, ms) { var h; return function () { clearTimeout(h); h = setTimeout(fn, ms); }; }

  document.addEventListener('DOMContentLoaded', function () {
    grid = $('cat-grid'); chipsBox = $('cat-chips'); countBox = $('cat-count');
    loadingBox = $('cat-loading'); emptyBox = $('cat-empty'); errorBox = $('cat-error');
    moreWrap = $('cat-more-wrap'); moreBtn = $('cat-more');
    if (!grid) return;
    document.documentElement.classList.add('js-anim');

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.ci-add') : null;
      if (!btn) return;
      var slug = btn.getAttribute('data-slug');
      var pr = state.items.filter(function (x) { return x.slug === slug; })[0];
      if (pr && window.FirmmitCart) {
        FirmmitCart.add(pr);
        btn.textContent = t('added');
        setTimeout(function () { btn.textContent = t('add'); }, 1200);
      }
    });

    var search = $('cat-search');
    if (search) search.addEventListener('input', debounce(function () { state.search = search.value.trim(); load(true); }, 350));

    var sort = $('cat-sort');
    if (sort) sort.addEventListener('change', function () { state.ordering = sort.value; load(true); });

    var inst = $('cat-instock');
    if (inst) inst.addEventListener('change', function () { state.in_stock = inst.checked; load(true); });

    function priceApply() { state.price_min = ($('cat-pmin').value || '').trim(); state.price_max = ($('cat-pmax').value || '').trim(); load(true); }
    ['cat-pmin', 'cat-pmax'].forEach(function (id) {
      var e = $(id);
      if (e) { e.addEventListener('change', priceApply); e.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') priceApply(); }); }
    });

    if (moreBtn) moreBtn.addEventListener('click', function () { load(false); });
    var retry = $('cat-retry'); if (retry) retry.addEventListener('click', function () { load(true); });

    applyLabels();
    loadCategories();
    load(true);

    document.addEventListener('firmmit:lang', function () {
      applyLabels();
      renderGrid();           // localized product names refresh
      renderChips(CATS);      // localized category names refresh
    });
  });
})();
