/* ============================================================
   FIRMMIT — global frontend configuration (SINGLE SOURCE)
   Jonli saytda faqat shu faylni o'zgartiring.
   ============================================================ */
window.FIRMMIT_CONFIG = {
  // Backend API base URL — avtomatik aniqlanadi:
  //  - mahalliy ishlab chiqish (localhost): http://localhost:8000/api/v1/
  //  - jonli sayt (domen): o'sha domenning /api/v1/ manzili (bir xil origin)
  // Odatda bu qatorga tegish shart emas.
  API_BASE: (function () {
    var h = location.hostname;
    if (h === 'localhost' || h === '127.0.0.1') return 'http://localhost:8000/api/v1/';
    return location.origin + '/api/v1/';
  })(),

  // Katalog PDF (til bo'yicha). Hozircha barchasi bitta fayl —
  // tilga mos PDF'lar tayyor bo'lganda shu qiymatlarni almashtiring.
  CATALOG_PDF: {
    uz: 'assets/firmmit-catalog.pdf',
    ru: 'assets/firmmit-catalog.pdf',
    en: 'assets/firmmit-catalog.pdf',
    ko: 'assets/firmmit-catalog.pdf'
  }
};
