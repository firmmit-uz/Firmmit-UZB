/* ============================================================
   FIRMMIT — rasmiylashtirish (checkout). Savatni buyurtmaga aylantiradi.
   API: config.js -> API_BASE. Savat: cart.js -> FirmmitCart
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.FIRMMIT_CONFIG || {};
  var API = String(CFG.API_BASE || 'http://localhost:8000/api/v1/').replace(/\/+$/, '') + '/';

  var T = {
    en: {
      title:"Checkout", crumb:"Checkout", store:"Online Store", empty:"Your cart is empty.", toCatalog:"Go to catalog",
      summary:"Your order", total:"Total", vat:"incl. VAT", cur:"UZS", qty:"qty",
      buyer:"Buyer type", legal:"Legal entity", individual:"Individual",
      companyInfo:"Company requisites", name:"Company name", inn:"TIN (9 digits)", account:"Bank account (20 digits)",
      mfo:"MFO (5 digits)", bank:"Bank name", legalAddr:"Legal address", director:"Director (full name)",
      contact:"Contact", contactName:"Contact person", phone:"Phone", email:"Email",
      delivery:"Delivery address (optional)", region:"Region", district:"District", street:"Street, house", landmark:"Landmark",
      fullName:"Full name", comment:"Comment (optional)",
      placeLegal:"Place order & get documents", placeIndividual:"Request a call",
      processing:"Processing…",
      reqField:"Required field", errInn:"TIN must be exactly 9 digits", errAccount:"Account must be 20 digits", errMfo:"MFO must be 5 digits", errPhone:"Enter a phone number",
      okLegalTitle:"Order placed!", okLegalText:"Your order number:", contract:"Download contract", invoice:"Download invoice",
      okIndTitle:"Request received!", okIndText:"Our manager will call you soon. Request number:",
      failTitle:"Could not place order", failText:"Please check the fields and try again, or make sure the server is running."
    },
    uz: {
      title:"Rasmiylashtirish", crumb:"Rasmiylashtirish", store:"Online savdo", empty:"Savat bo'sh.", toCatalog:"Katalogga o'tish",
      summary:"Buyurtmangiz", total:"Jami", vat:"QQS bilan", cur:"so'm", qty:"soni",
      buyer:"Xaridor turi", legal:"Yuridik shaxs", individual:"Jismoniy shaxs",
      companyInfo:"Korxona rekvizitlari", name:"Korxona nomi", inn:"STIR (9 raqam)", account:"Hisobraqam (20 raqam)",
      mfo:"MFO (5 raqam)", bank:"Bank nomi", legalAddr:"Yuridik manzil", director:"Rahbar (F.I.Sh.)",
      contact:"Aloqa", contactName:"Aloqa uchun shaxs", phone:"Telefon", email:"E-pochta",
      delivery:"Yetkazish manzili (ixtiyoriy)", region:"Viloyat", district:"Tuman", street:"Ko'cha, uy", landmark:"Mo'ljal",
      fullName:"F.I.Sh.", comment:"Izoh (ixtiyoriy)",
      placeLegal:"Buyurtma berish va hujjatlarni olish", placeIndividual:"Qo'ng'iroq so'rash",
      processing:"Yuborilmoqda…",
      reqField:"Majburiy maydon", errInn:"STIR aniq 9 raqam bo'lishi kerak", errAccount:"Hisobraqam 20 raqam bo'lishi kerak", errMfo:"MFO 5 raqam bo'lishi kerak", errPhone:"Telefon raqamini kiriting",
      okLegalTitle:"Buyurtma qabul qilindi!", okLegalText:"Buyurtma raqamingiz:", contract:"Shartnomani yuklab olish", invoice:"Hisobni yuklab olish",
      okIndTitle:"So'rov qabul qilindi!", okIndText:"Menejerimiz tez orada bog'lanadi. So'rov raqami:",
      failTitle:"Buyurtma berib bo'lmadi", failText:"Maydonlarni tekshirib qayta urining yoki server ishlayotganiga ishonch hosil qiling."
    },
    ru: {
      title:"Оформление", crumb:"Оформление", store:"Онлайн-магазин", empty:"Корзина пуста.", toCatalog:"В каталог",
      summary:"Ваш заказ", total:"Итого", vat:"с НДС", cur:"сум", qty:"кол-во",
      buyer:"Тип покупателя", legal:"Юридическое лицо", individual:"Физическое лицо",
      companyInfo:"Реквизиты компании", name:"Название компании", inn:"ИНН (9 цифр)", account:"Расчётный счёт (20 цифр)",
      mfo:"МФО (5 цифр)", bank:"Название банка", legalAddr:"Юридический адрес", director:"Руководитель (ФИО)",
      contact:"Контакт", contactName:"Контактное лицо", phone:"Телефон", email:"Эл. почта",
      delivery:"Адрес доставки (необязательно)", region:"Область", district:"Район", street:"Улица, дом", landmark:"Ориентир",
      fullName:"ФИО", comment:"Комментарий (необязательно)",
      placeLegal:"Оформить и получить документы", placeIndividual:"Заказать звонок",
      processing:"Отправка…",
      reqField:"Обязательное поле", errInn:"ИНН должен содержать 9 цифр", errAccount:"Счёт должен содержать 20 цифр", errMfo:"МФО должен содержать 5 цифр", errPhone:"Введите номер телефона",
      okLegalTitle:"Заказ оформлен!", okLegalText:"Номер вашего заказа:", contract:"Скачать договор", invoice:"Скачать счёт",
      okIndTitle:"Заявка принята!", okIndText:"Наш менеджер скоро свяжется с вами. Номер заявки:",
      failTitle:"Не удалось оформить заказ", failText:"Проверьте поля и повторите, либо убедитесь, что сервер работает."
    }
  };
  function lang() { try { return (window.FirmmitI18N && FirmmitI18N.get()) || localStorage.getItem('firmmit-lang') || 'uz'; } catch (e) { return 'uz'; } }
  function t(k) { var d = T[lang()] || T.en; return d[k] != null ? d[k] : (T.en[k] || k); }
  function nameOf(o) { var l = lang(); return o['name_' + l] || o.name_uz || o.name_en || o.name_ru || ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function fmt(v) { var n = parseFloat(v); return isFinite(n) ? Math.round(n).toLocaleString('ru-RU') : '0'; }
  function cartItems() { return (window.FirmmitCart && FirmmitCart.items()) || []; }

  var buyerType = 'legal';

  function field(id, label, extra) {
    return '<div class="co-field"><label for="' + id + '">' + esc(label) + '</label>' +
      '<input id="' + id + '" ' + (extra || '') + '></div>';
  }

  function summaryHTML(items) {
    var rows = items.map(function (i) {
      return '<div class="co-sum-row"><span class="n">' + esc(nameOf(i)) + '</span>' +
        '<span class="q">' + i.qty + ' × ' + fmt(i.price) + '</span></div>';
    }).join('');
    var total = items.reduce(function (s, i) { return s + (parseFloat(i.price) || 0) * i.qty; }, 0);
    return '<div class="co-card"><h2>' + esc(t('summary')) + '</h2>' + rows +
      '<div class="co-total"><span>' + esc(t('total')) + '</span><span>' + fmt(total) + ' ' + esc(t('cur')) + '</span></div>' +
      '<div style="font-size:.75rem;color:var(--muted);text-align:right;margin-top:2px">' + esc(t('vat')) + '</div></div>';
  }

  function legalFormHTML() {
    return '<div id="co-form-legal">' +
      '<div class="co-sub">' + esc(t('companyInfo')) + '</div>' +
      field('f-name', t('name')) +
      '<div class="co-grid2">' + field('f-inn', t('inn'), 'inputmode="numeric" maxlength="9"') + field('f-mfo', t('mfo'), 'inputmode="numeric" maxlength="5"') + '</div>' +
      field('f-account', t('account'), 'inputmode="numeric" maxlength="20"') +
      field('f-bank', t('bank')) +
      field('f-legaladdr', t('legalAddr')) +
      field('f-director', t('director')) +
      '<div class="co-sub">' + esc(t('contact')) + '</div>' +
      '<div class="co-grid2">' + field('f-contact', t('contactName')) + field('f-phone', t('phone'), 'inputmode="tel"') + '</div>' +
      field('f-email', t('email'), 'inputmode="email"') +
      '<div class="co-sub">' + esc(t('delivery')) + '</div>' +
      '<div class="co-grid2">' + field('f-region', t('region')) + field('f-district', t('district')) + '</div>' +
      field('f-street', t('street')) +
      '</div>';
  }

  function individualFormHTML() {
    return '<div id="co-form-individual" style="display:none">' +
      field('i-name', t('fullName')) +
      '<div class="co-grid2">' + field('i-phone', t('phone'), 'inputmode="tel"') + field('i-region', t('region')) + '</div>' +
      '<div class="co-field"><label for="i-comment">' + esc(t('comment')) + '</label><textarea id="i-comment" rows="3"></textarea></div>' +
      '</div>';
  }

  function render() {
    var root = document.getElementById('checkout-root');
    if (!root) return;
    var items = cartItems();

    if (!items.length) {
      root.innerHTML = '<div class="co-empty"><p>' + esc(t('empty')) + '</p><a class="btn btn-primary" href="catalog.html">' + esc(t('toCatalog')) + '</a></div>';
      return;
    }

    root.innerHTML =
      '<div class="co-wrap"><div>' +
        '<div class="co-card"><h2>' + esc(t('buyer')) + '</h2>' +
          '<div class="co-types">' +
            '<div class="co-type active" data-type="legal">' + esc(t('legal')) + '</div>' +
            '<div class="co-type" data-type="individual">' + esc(t('individual')) + '</div>' +
          '</div>' +
          legalFormHTML() + individualFormHTML() +
          '<button type="button" class="co-submit" id="co-submit"></button>' +
          '<div id="co-result"></div>' +
        '</div>' +
      '</div>' +
      '<div>' + summaryHTML(items) + '</div></div>';

    wire();
    applyType();
  }

  function applyType() {
    var legal = document.getElementById('co-form-legal');
    var ind = document.getElementById('co-form-individual');
    if (legal) legal.style.display = buyerType === 'legal' ? '' : 'none';
    if (ind) ind.style.display = buyerType === 'individual' ? '' : 'none';
    var btn = document.getElementById('co-submit');
    if (btn) btn.textContent = buyerType === 'legal' ? t('placeLegal') : t('placeIndividual');
  }

  function wire() {
    document.querySelectorAll('.co-type').forEach(function (el) {
      el.addEventListener('click', function () {
        document.querySelectorAll('.co-type').forEach(function (x) { x.classList.remove('active'); });
        el.classList.add('active');
        buyerType = el.getAttribute('data-type');
        applyType();
      });
    });
    var btn = document.getElementById('co-submit');
    if (btn) btn.addEventListener('click', submit);
  }

  function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }
  function items() { return cartItems().map(function (i) { return { slug: i.slug, quantity: i.qty }; }); }

  function validateLegal() {
    if (!/^\d{9}$/.test(val('f-inn'))) return t('errInn');
    if (!/^\d{20}$/.test(val('f-account'))) return t('errAccount');
    if (!/^\d{5}$/.test(val('f-mfo'))) return t('errMfo');
    if (!val('f-name') || !val('f-bank') || !val('f-legaladdr') || !val('f-director') || !val('f-contact') || !val('f-email')) return t('reqField');
    if (!val('f-phone')) return t('errPhone');
    return null;
  }

  function submit() {
    var result = document.getElementById('co-result');
    var btn = document.getElementById('co-submit');
    var url, payload, err;

    if (buyerType === 'legal') {
      err = validateLegal();
      if (err) { showError(result, err); return; }
      url = API + 'orders/checkout/legal/';
      payload = {
        company: {
          name: val('f-name'), inn: val('f-inn'), bank_account: val('f-account'),
          bank_name: val('f-bank'), mfo: val('f-mfo'), legal_address: val('f-legaladdr'),
          director_name: val('f-director'), phone: val('f-phone'), email: val('f-email')
        },
        contact_name: val('f-contact'), phone: val('f-phone'),
        address: { region: val('f-region'), district: val('f-district'), street: val('f-street') },
        items: items()
      };
    } else {
      if (!val('i-name')) { showError(result, t('reqField')); return; }
      if (!val('i-phone')) { showError(result, t('errPhone')); return; }
      url = API + 'orders/checkout/individual/';
      payload = { full_name: val('i-name'), phone: val('i-phone'), region: val('i-region'), comment: val('i-comment'), items: items() };
    }

    btn.disabled = true; btn.textContent = t('processing'); result.innerHTML = '';
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) { showError(result, t('failText')); return; }
        onSuccess(result, res.data);
        if (window.FirmmitCart) FirmmitCart.clear();
      })
      .catch(function () { showError(result, t('failText')); })
      .then(function () { btn.disabled = false; applyType(); });
  }

  function onSuccess(box, d) {
    if (buyerType === 'legal') {
      var links = '';
      if (d.contract_file) links += '<a href="' + esc(d.contract_file) + '" target="_blank">' + esc(t('contract')) + '</a> &nbsp; ';
      if (d.invoice_file) links += '<a href="' + esc(d.invoice_file) + '" target="_blank">' + esc(t('invoice')) + '</a>';
      box.className = 'co-result ok';
      box.innerHTML = '<h3>' + esc(t('okLegalTitle')) + '</h3><p>' + esc(t('okLegalText')) + ' <b>' + esc(d.order_number) + '</b></p><p>' + links + '</p>';
    } else {
      box.className = 'co-result ok';
      box.innerHTML = '<h3>' + esc(t('okIndTitle')) + '</h3><p>' + esc(t('okIndText')) + ' <b>' + esc(d.request_number) + '</b></p>';
    }
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showError(box, msg) {
    box.className = 'co-result bad';
    box.innerHTML = '<h3>' + esc(t('failTitle')) + '</h3><p>' + esc(msg) + '</p>';
  }

  function localizeHero() {
    var map = { 'co-eyebrow':'store', 'co-title':'title', 'co-crumb':'crumb', 'co-crumb-cat':'store' };
    Object.keys(map).forEach(function (id) { var e = document.getElementById(id); if (e) e.textContent = t(map[id]); });
  }

  function init() { localizeHero(); render(); }
  document.addEventListener('firmmit:lang', function () { localizeHero(); render(); });
  document.addEventListener('firmmit:cart', function () { /* summary refresh */ render(); });
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
