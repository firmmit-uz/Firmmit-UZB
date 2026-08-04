# Ishlab chiqish rejasi — Claude Code uchun topshiriqlar

Mavjud holat: statik "vizitka" sayt. "Online savdo" bo'limida PDF katalog yuklab olish tugmasi bor.

Maqsad: to'liq katalog + yuridik shaxslar uchun shartnoma va hisobraqam orqali savdo. Click, Payme va ATMOS keyinroq, ishni to'xtatmasdan ulanadi.

Har bir bosqich alohida topshiriq. Bosqich tugagach tekshiriladi, keyin keyingisiga o'tiladi.

**Qoida:** har bosqichda `tech-python.md`, `database.md` va `documents.md` talablariga qat'iy amal qilinadi. Kod yozishdan oldin `/docs` dagi mos `.md` fayl yangilanadi.

---

## 0-bosqich — Tayyorgarlik

- Mavjud loyihani ko'rib chiqish, "Online savdo" bo'limining hozirgi kodini aniqlash
- `tech-python.md`, `database.md`, `documents.md`, `roadmap.md` fayllarini loyihaning `/docs` papkasiga joylash
- PDF katalogdagi mahsulotlarni ro'yxatga chiqarish (nomi, artikul, o'lchov birligi, narxi, rasmi)
- FIRMMIT GLOBAL MChJ rekvizitlarini yig'ish (STIR, hisobraqam, MFO, bank, yuridik manzil, rahbar, QQS guvohnomasi)

**Natija:** loyiha tuzilishi aniq, mahsulotlar va rekvizitlar tayyor.

---

## 1-bosqich — Backend poydevori

- Docker Compose: PostgreSQL, Redis, backend
- Django 5.2 LTS + DRF, `config/` va `apps/` tuzilishi
- `apps/core`: `BaseModel`, `ParameterGetter`, umumiy xatolik javoblari, `document_counter` mantiqi
- `.env.example`, `ruff` + `pre-commit`

**Tekshiruv:** `docker compose up` bilan loyiha ko'tariladi, `/admin/` ochiladi.

---

## 2-bosqich — Katalog va admin panel

- `apps/catalog`: `Category`, `Product`, `ProductImage`, `ProductSpec`
- Django admin (`django-unfold`, Firmmit ranglari #3365FF): rasm yuklash, narx QQSsiz, o'lchov birligi, qoldiq
- API: kategoriyalar, mahsulotlar ro'yxati va bitta mahsulot
- Filtr (kategoriya, narx, mavjudlik), qidiruv, saralash
- Rasmni avtomatik WebP ga o'girish, bir necha o'lchamda saqlash
- `site_setting`: sotuvchi rekvizitlarini kiritish

**Tekshiruv:** admin panelda mahsulot qo'shiladi, API orqali chiqadi, narx QQS bilan to'g'ri hisoblanadi.

---

## 3-bosqich — Katalogni saytga chiqarish

- Nuxt 4 + Tailwind CSS, brend rangi
- "Online savdo" bo'limidagi PDF tugmasi olib tashlanadi, o'rniga katalog qo'yiladi
- Sahifalar: katalog, kategoriya, mahsulot
- Ekran o'lchamiga qarab ustunlar soni (`tech-python.md` jadvali)
- `<NuxtImg>`, lazy loading
- Til almashtirish: o'zbek / rus / ingliz

**Tekshiruv:** telefon, planshet, kompyuterda ochiladi. Lighthouse mobil >= 85.

---

## 4-bosqich — Savat va ikki xil rasmiylashtirish

- `apps/orders`: `Order`, `OrderItem`, `OrderStatusLog`, `DeliveryZone`
- `apps/customers`: `Customer`, `Company`, `Address`
- Savat frontend'da (localStorage)
- Rasmiylashtirishda xaridor turi tanlanadi
- **Yuridik shaxs:** rekvizitlar formasi (STIR 9 raqam, hisobraqam 20 raqam, MFO 5 raqam tekshiruvi bilan). STIR mavjud bo'lsa avtomatik to'ldiriladi
- **Jismoniy shaxs:** `callback_request` yozuvi, savat tarkibi bilan
- Narx va qoldiq serverda qayta tekshiriladi
- Buyurtma raqami `document_counter` orqali
- Telegram'ga xabar (ikkala tur uchun ham)

**Tekshiruv:** ikkala oqim ham oxirigacha ishlaydi, ma'lumot bazaga to'g'ri tushadi.

---

## 5-bosqich — Shartnoma va hisob shakllantirish

- WeasyPrint o'rnatish, kirill shriftini qo'shish
- HTML shablonlar: `contract.html` va `invoice.html`
- A4 vertikal, logotip o'ng yuqorida, pastki kolontitul har sahifada bir xil joyda
- Spetsifikatsiya jadvali: QQSsiz summa, QQS 12%, jami — raqamda va **so'z bilan**
- Shartnoma va hisob raqamlari `document_counter` orqali
- PDF `order.contract_file` va `order.invoice_file` ga saqlanadi
- Xaridor yuklab oladi + e-pochtaga yuboriladi
- Admin panelda qayta yuklab olish tugmasi

**Tekshiruv:** shakllangan PDF ochiladi, raqamlar to'g'ri, kirill matni buzilmagan, logotip va kolontitul joyida. Chop etib ko'riladi.

---

## 6-bosqich — To'lov arxitekturasi

- `apps/payments`: `Payment`, `PaymentMethodSetting`
- `providers/base.py` — abstrakt interfeys
- `providers/bank_transfer.py` va `cash.py` — **faol**
- `providers/click.py`, `payme.py`, `atmos.py` — **to'liq yoziladi, lekin o'chirilgan holatda**
- Webhook manzillari band qilinadi, o'chirilgan holatda 503 qaytaradi
- Admin panelda: bank ko'chirmasidan to'lovni tasdiqlash, to'lov topshiriqnomasi raqamini kiritish
- Saytdagi to'lov usullari ro'yxati bazadan olinadi, kodda yozilmaydi

**Tekshiruv:** buxgalter to'lovni tasdiqlaydi, buyurtma holati o'zgaradi, tarix yoziladi. Click provayderini `is_active = true` qilib ko'riladi — sayt uni ko'rsatishi kerak (kalitlar yo'qligi sababli ishlamaydi, lekin ro'yxatda paydo bo'ladi).

---

## 7-bosqich — Hisobot va nazorat

- Boshqaruv paneli: kunlik/oylik tushum, to'lov usuli bo'yicha bo'linish
- Shakllantirilgan lekin to'lanmagan hisoblar (necha kun turgani bilan)
- Yuridik va jismoniy shaxs nisbati
- Javobsiz qolgan qo'ng'iroq so'rovlari
- Rad etilgan va bekor qilingan buyurtmalar + sabablari
- Ombor qoldig'i kam mahsulotlar
- Excel/CSV ga chiqarish

**Tekshiruv:** hisobot raqamlari bazadagi yozuvlarga mos.

---

## 8-bosqich — Ishga tushirish

- VPS, domen, SSL
- Nginx + Gunicorn, statik va media fayllar
- Har kuni avtomatik zaxira nusxa (baza + rasm + PDF hujjatlar)
- PWA
- Sitemap, robots.txt, meta teglar
- Yuklama va xavfsizlik tekshiruvi

**Tekshiruv:** sayt jonli manzilda ishlaydi, hujjatlar shakllanadi.

---

## 9-bosqich — Click, Payme, ATMOS (keyinroq, ochiq qoldiriladi)

Shartnoma tuzilgach boshlanadi. Kod 6-bosqichda yozilgani uchun bu bosqich qisqa:

- `.env` ga kalitlar qo'shiladi
- Test muhitida sinov
- `payment_method_setting` da `is_active = true`
- Webhook manzili to'lov tizimi kabinetida ko'rsatiladi
- Jismoniy shaxs uchun to'liq onlayn xarid ochiladi

**Bu bosqich boshqa bosqichlarni to'xtatib qo'ymaydi.**

---

## Ketma-ketlik

| Bosqich | Nima ishlaydi |
|---|---|
| 1 | Backend ko'tariladi |
| 2 | Admin mahsulot qo'sha oladi |
| 3 | **Xaridor katalogni ko'radi** (PDF o'rniga) |
| 4 | **Buyurtma va so'rov qabul qilinadi** |
| 5 | **Shartnoma va hisob avtomatik shakllanadi** |
| 6 | **Bank o'tkazmasi nazorat qilinadi** |
| 7 | Firmmit to'liq hisobot ko'radi |
| 8 | Sayt jonli ishlaydi |
| 9 | Onlayn karta to'lovi qo'shiladi (keyinroq) |
