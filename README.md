# Firmmit Uzbekistan — firmmit-shop

Firmmit Korea kompaniyasining O'zbekistondagi filiali uchun rasmiy veb-sayt.
Aqlli ferma (smart-farm) texnologiyalari, issiqxonalar, qulupnay yetishtirish
va agronomiya xizmatlarini taqdim etadi.

Sayt 4 tilda ishlaydi: **O'zbek (UZ) · Rus (RU) · Ingliz (EN) · Koreys (KO)**.

---

## Loyiha hozir nima qiladi

Bu — **statik "vizitka" sayt** (marketing sayti). Foydalanuvchi ko'radigan
sahifalar:

- **Bosh sahifa** — hero video/rasm, kompaniya tanishtiruvi, statistika
- **Biz haqimizda** — missiya, qadriyatlar, jamoa
- **Mahsulotlar** — issiqxona tizimlari, ehtiyot qismlar, ko'chatlar
- **Xizmatlar** — loyihalash, qurish, agronomik qo'llab-quvvatlash
- **Import & Eksport**
- **Online savdo** — mahsulot katalogi (hozircha PDF ko'rinishida)
- **Aloqa** — bog'lanish shakli va rekvizitlar

Har bir sahifa 4 tilda ishlaydi (tilni yuqoridagi menyudan almashtirish mumkin).

> **Eslatma:** Hozirgi versiya — `docs/roadmap.md` dagi rejaning **0-bosqichi**.
> Kelajakda bu sayt to'liq internet-do'konga (buyurtma, to'lov, admin panel)
> aylantiriladi. Reja `docs/` papkasida batafsil yozilgan.

---

## Texnologiyalar

Hozirgi (statik) versiya — hech qanday server yoki ma'lumotlar bazasi talab
qilmaydi:

- **HTML** — sahifalar tuzilishi
- **CSS** — dizayn (`css/style.css`), brend rangi `#3365FF`
- **JavaScript (vanilla)** — `js/site.js`: til almashtirish (i18n),
  menyu/footer, rasmlar, animatsiyalar
- Shriftlar: **Pretendard** + **Poppins**

Hosting: **Cloudflare Pages** (statik fayllar to'g'ridan-to'g'ri joylashtiriladi).

Kelajakdagi to'liq versiya uchun rejalashtirilgan (hali qurilmagan):
Python 3.13 · Django 5.2 · PostgreSQL 16 · Nuxt 4 · Docker — batafsil `docs/` da.

---

## `docs/` papkasidagi fayllar

Bu fayllar loyihaning **kelajakdagi rivojlanish rejasi**ni tavsiflaydi:

| Fayl | Nima haqida |
|------|-------------|
| `docs/roadmap.md` | Umumiy reja: 0-bosqichdan (hozirgi sayt) 9-bosqichgacha (Click/Payme/ATMOS to'lovlari). Har bir bosqich nima qilishini tushuntiradi. |
| `docs/tech-python.md` | Kelajakdagi backend texnologiyalari va dasturlash qoidalari (Django, DRF, Nuxt, Tailwind, Docker). |
| `docs/database.md` | Ma'lumotlar bazasi tuzilishi: jadvallar (kategoriya, mahsulot, buyurtma, to'lov va h.k.) va ular orasidagi bog'lanishlar. |
| `docs/documents.md` | Avtomatik hujjatlar: shartnoma va hisob-faktura PDF yaratish, to'lov usullari arxitekturasi. |
| `docs/seller-requisites.md` | Sotuvchi (kompaniya) rasmiy rekvizitlari — hujjatlarda ishlatiladigan STIR, hisobraqam va manzil ma'lumotlari. |

---

## Saytni ishga tushirish (lokal ko'rish)

Bu statik sayt — o'rnatish shart emas. Uch xil yo'l:

**1) Eng oddiy:** `index.html` faylini brauzerda (Chrome/Edge) ochish yetarli.

**2) Lokal server bilan** (til almashtirish va rasmlar to'g'ri ishlashi uchun
tavsiya etiladi). Papka ichida terminal ochib:

```bash
# Python o'rnatilgan bo'lsa:
python -m http.server 8000
```

So'ng brauzerda oching: <http://localhost:8000>

**3) Internetga chiqarish:** `dist/` papkasidagi fayllarni **Cloudflare Pages**
ga yuklash (batafsil `DEPLOY.md` da).

---

## Papkalar tuzilishi

```
firmmit-uzbekistan/
├── index.html, about.html, products.html, ...   # sahifalar
├── css/style.css                                # dizayn
├── js/site.js                                   # til almashtirish + logika
├── assets/                                      # logo, rasmlar, video, PDF katalog
├── docs/                                        # kelajak rejasi (5 ta hujjat)
├── .gitignore                                   # git'ga tushmaydigan fayllar
├── .env.example                                 # maxfiy kalitlar namunasi (bo'sh)
└── README.md                                    # ushbu fayl
```

---

## Maxfiylik

- Haqiqiy maxfiy ma'lumotlar (parollar, API kalitlar) **hech qachon** git'ga
  tushmaydi — `.gitignore` buni bloklaydi.
- `.env.example` — faqat kalit **nomlari** (qiymatlarsiz) namunasi.
- Repozitoriya **private (yopiq)**.

---

© Firmmit Uzbekistan. Barcha huquqlar himoyalangan.
