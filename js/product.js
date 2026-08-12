/* ============================================================
   FIRMMIT — mahsulot sahifasi (detail): rasm slayder + tavsif + savatga
   API: config.js -> API_BASE (products/<slug>/). Savat: cart.js
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.FIRMMIT_CONFIG || {};
  var API = String(CFG.API_BASE || 'http://localhost:8000/api/v1/').replace(/\/+$/, '') + '/';

  var T = {
    en: { back:"← Catalog", store:"Online Store", loading:"Loading…", notfound:"Product not found.", cur:"UZS", vat:"incl. VAT", add:"Add to cart", added:"Added ✓", inStock:"In stock", outStock:"On order", desc:"Description", specs:"Specifications", sku:"SKU", unit:"Unit", minOrder:"Min. order" },
    uz: { back:"← Katalog", store:"Online savdo", loading:"Yuklanmoqda…", notfound:"Mahsulot topilmadi.", cur:"so'm", vat:"QQS bilan", add:"Savatga qo'shish", added:"Qo'shildi ✓", inStock:"Omborda", outStock:"Buyurtma asosida", desc:"Tavsif", specs:"Texnik xususiyatlar", sku:"Artikul", unit:"O'lchov birligi", minOrder:"Min. buyurtma" },
    ru: { back:"← Каталог", store:"Онлайн-магазин", loading:"Загрузка…", notfound:"Товар не найден.", cur:"сум", vat:"с НДС", add:"В корзину", added:"Добавлено ✓", inStock:"В наличии", outStock:"Под заказ", desc:"Описание", specs:"Характеристики", sku:"Артикул", unit:"Ед. изм.", minOrder:"Мин. заказ" },
    ko: { back:"← 카탈로그", store:"온라인 스토어", loading:"불러오는 중…", notfound:"제품을 찾을 수 없습니다.", cur:"UZS", vat:"VAT 포함", add:"장바구니 담기", added:"추가됨 ✓", inStock:"재고 있음", outStock:"주문 제작", desc:"설명", specs:"사양", sku:"SKU", unit:"단위", minOrder:"최소 주문" }
  };
  function lang() { try { return (window.FirmmitI18N && FirmmitI18N.get()) || localStorage.getItem('firmmit-lang') || 'en'; } catch (e) { return 'en'; } }
  function t(k) { var d = T[lang()] || T.en; return d[k] != null ? d[k] : (T.en[k] || k); }
  function loc(o, base) { var l = lang(); return o[base + '_' + l] || o[base + '_uz'] || o[base + '_en'] || o[base + '_ru'] || ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function fmt(v) { var n = parseFloat(v); return isFinite(n) ? Math.round(n).toLocaleString('ru-RU') : ''; }
  function fixImg(u) { if (!u) return u; if (location.protocol === 'https:' && /^http:\/\//i.test(u)) return u.replace(/^http:\/\//i, 'https://'); return u; }
  function $(id) { return document.getElementById(id); }
  function boxIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H14l6 6v10.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z"/><path d="M14 3v6h6"/></svg>'; }

  var product = null;
  var imgs = [];
  var idx = 0;
  var entered = false;

  function getSlug() { var m = location.search.match(/[?&]slug=([^&]+)/); return m ? decodeURIComponent(m[1]) : ''; }

  function galleryHTML() {
    var main = imgs.length
      ? '<div class="pd-main"><img id="pd-img" src="' + esc(imgs[idx]) + '" alt=""></div>'
      : '<div class="pd-main pd-noimg">' + boxIcon() + '</div>';
    var nav = imgs.length > 1
      ? '<button class="pd-nav pd-prev" id="pd-prev">‹</button><button class="pd-nav pd-next" id="pd-next">›</button>'
      : '';
    var thumbs = imgs.length > 1
      ? '<div class="pd-thumbs">' + imgs.map(function (u, i) {
          return '<div class="pd-thumb' + (i === idx ? ' active' : '') + '" data-i="' + i + '"><img src="' + esc(u) + '" alt=""></div>';
        }).join('') + '</div>'
      : '';
    return '<div class="pd-gallery">' + main + nav + thumbs + '</div>';
  }

  function infoHTML() {
    var inStock = Number(product.stock_quantity) > 0;
    var pv = parseFloat(product.price_with_vat);
    var priceLine = (isFinite(pv) && pv > 0)
      ? '<div class="pd-price">' + fmt(product.price_with_vat) + ' <span class="cur">' + t('cur') + '</span><span class="vat">' + t('vat') + '</span></div>'
      : '';
    var meta = '<div class="pd-meta">' + t('sku') + ': <b>' + esc(product.sku) + '</b>';
    if (product.unit) meta += ' &nbsp;·&nbsp; ' + t('unit') + ': ' + esc(product.unit);
    meta += '</div>';
    var stock = '<span class="pd-stock' + (inStock ? '' : ' out') + '">' + (inStock ? t('inStock') : t('outStock')) + '</span>';

    var descText = loc(product, 'description') || loc(product, 'short_description');
    var descBlock = descText ? '<div class="pd-section"><h3>' + t('desc') + '</h3><div class="pd-desc">' + esc(descText) + '</div></div>' : '';

    var specs = (product.specs || []).filter(function (s) { return loc(s, 'name'); });
    var specBlock = specs.length
      ? '<div class="pd-section"><h3>' + t('specs') + '</h3><table class="pd-specs">' +
          specs.map(function (s) { return '<tr><td>' + esc(loc(s, 'name')) + '</td><td>' + esc(loc(s, 'value')) + '</td></tr>'; }).join('') +
        '</table></div>'
      : '';

    return '<div class="pd-info">' +
      '<h1>' + esc(loc(product, 'name')) + '</h1>' +
      '<div class="pd-sku">' + stock + '</div>' +
      priceLine + meta +
      '<button class="pd-add" id="pd-add">' + t('add') + '</button>' +
      descBlock + specBlock +
    '</div>';
  }

  function render() {
    var enterCls = entered ? '' : ' pd-enter';
    entered = true;
    $('product-root').innerHTML = '<div class="pd-wrap' + enterCls + '">' + galleryHTML() + infoHTML() + '</div>';
    wire();
    var hero = $('pd-hero-title'); if (hero) hero.textContent = loc(product, 'name');
    document.title = loc(product, 'name') + ' — Firmmit Uzbekistan';
  }

  function show(i) { idx = (i + imgs.length) % imgs.length; render(); }

  function wire() {
    var prev = $('pd-prev'); if (prev) prev.addEventListener('click', function () { show(idx - 1); });
    var next = $('pd-next'); if (next) next.addEventListener('click', function () { show(idx + 1); });
    document.querySelectorAll('.pd-thumb').forEach(function (el) {
      el.addEventListener('click', function () { show(parseInt(el.getAttribute('data-i'), 10)); });
    });
    var add = $('pd-add');
    if (add) add.addEventListener('click', function () {
      if (window.FirmmitCart) {
        FirmmitCart.add({ slug: product.slug, name_uz: product.name_uz, name_ru: product.name_ru,
          name_en: product.name_en, price_with_vat: product.price_with_vat, unit: product.unit,
          main_image: imgs[0] || product.main_image });
        add.textContent = t('added');
        setTimeout(function () { add.textContent = t('add'); }, 1400);
      }
    });
  }

  function localizeStatic() {
    var b = $('pd-back'); if (b) b.textContent = t('back');
    var c = $('pd-crumb-cat'); if (c) c.textContent = t('store');
    $('pd-loading').textContent = t('loading');
    $('pd-error').textContent = t('notfound');
  }

  function load() {
    var slug = getSlug();
    if (!slug) { $('pd-loading').style.display = 'none'; $('pd-error').style.display = ''; return; }
    fetch(API + 'products/' + encodeURIComponent(slug) + '/', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        product = data;
        imgs = (data.images && data.images.length)
          ? data.images.map(function (im) { return fixImg(im.image); })
          : (data.main_image ? [fixImg(data.main_image)] : []);
        idx = 0;
        $('pd-loading').style.display = 'none';
        render();
      })
      .catch(function () { $('pd-loading').style.display = 'none'; $('pd-error').style.display = ''; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    localizeStatic();
    load();
    document.addEventListener('firmmit:lang', function () { localizeStatic(); if (product) render(); });
  });
})();
