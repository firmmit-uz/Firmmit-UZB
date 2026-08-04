# Hujjatlar va to'lov arxitekturasi

Bu hujjat ikki narsani belgilaydi:

1. Yuridik shaxs xaridor uchun **shartnoma va to'lov uchun hisob** qanday shakllantiriladi.
2. To'lov usullari kodda qanday yoziladi — Click, Payme va ATMOS keyinroq **kodni qayta yozmasdan** ulanishi uchun.

---

## 1-qism. Hujjatlar

### Qaysi hujjatlar sayt tomonidan shakllantiriladi

| Hujjat | Sayt shakllantiradimi | Izoh |
|---|---|---|
| **Shartnoma** (Шартнома) | **Ha** | Xaridor yuklab oladi, imzolab qaytaradi |
| **To'lov uchun hisob** (Тўлов учун ҳисоб) | **Ha** | Bank o'tkazmasi uchun asos |
| **Hisob-faktura (EHF)** | **Yo'q** | Tovar jo'natilgandan keyin, davlat tizimi orqali (soliq.uz / Didox). Sayt buni shakllantirmaydi |
| **Yuk xati / TTN** | **Yo'q** | Alohida jarayon |

**Muhim:** sayt shakllantirgan hujjatlar buxgalteriya hisobini almashtirmaydi. Ular xaridorga to'lov qilish uchun asos beradi, xolos. Rasmiy elektron hisob-faktura tovar jo'natilgandan so'ng alohida chiqariladi.

### Hujjat raqamlari

| Hujjat | Format | Misol |
|---|---|---|
| Buyurtma | `FRM-YYYY-NNNNNN` | FRM-2026-000123 |
| Shartnoma | `FRM-SH-YYYY-NNNN` | FRM-SH-2026-0045 |
| Hisob | `FRM-HI-YYYY-NNNN` | FRM-HI-2026-0045 |
| Qo'ng'iroq so'rovi | `FRM-QS-YYYY-NNNN` | FRM-QS-2026-0087 |

Raqamlar uzluksiz, har yil boshida 1 dan boshlanadi. `document_counter` jadvali orqali, tranzaksiya ichida `SELECT ... FOR UPDATE` bilan olinadi — ikki buyurtma bir xil raqam olmasligi uchun.

### Shartnoma tarkibi

| Bo'lim | Mazmuni |
|---|---|
| Sarlavha | Shartnoma raqami, sanasi, tuzilgan joyi (Toshkent sh.) |
| Tomonlar | Sotuvchi: FIRMMIT GLOBAL MChJ to'liq rekvizitlari. Xaridor: `company` jadvalidan |
| 1. Shartnoma predmeti | Tovar yetkazib berish, ilova bo'yicha |
| 2. Shartnoma summasi | QQSsiz summa, QQS 12%, jami — raqamda va so'z bilan |
| 3. To'lov tartibi | Oldindan 100% to'lov, hisobraqamga o'tkazma |
| 4. Yetkazib berish | Muddat, manzil, transport kimning hisobidan |
| 5. Tomonlar javobgarligi | Standart bandlar |
| 6. Fors-major | Standart bandlar |
| 7. Nizolarni hal etish | Toshkent viloyat iqtisodiy sudi |
| 8. Amal qilish muddati | Imzolangandan to majburiyatlar bajarilgunga qadar |
| 9. Rekvizitlar va imzolar | Ikki tomon, muhr uchun joy |
| **Ilova №1** | **Tovarlar spetsifikatsiyasi** — savatdagi ro'yxat |

### Spetsifikatsiya jadvali (Ilova №1)

| № | Товар номи | Артикул | Ўлчов бирлиги | Миқдори | Нархи (ҚҚСсиз) | Суммаси | ҚҚС 12% | Жами |
|---|---|---|---|---|---|---|---|---|

Pastida: Жами суммаси, ҚҚС, Умумий сумма — raqamda va so'z bilan.

### To'lov uchun hisob tarkibi

Bir sahifali, sodda hujjat:

- Sarlavha: hisob raqami va sanasi
- Sotuvchi rekvizitlari (to'liq — bank nomi, hisobraqam, MFO, STIR)
- Xaridor: nomi va STIR
- Tovarlar jadvali (spetsifikatsiya bilan bir xil)
- Jami summa raqamda va so'z bilan
- To'lov izohida yozilishi shart bo'lgan matn: **"FRM-HI-2026-0045 raqamli hisob bo'yicha to'lov"**
- Hisob amal qilish muddati (default 5 ish kuni — `site_setting` da sozlanadi)

**To'lov izohidagi hisob raqami muhim** — buxgalter bank ko'chirmasidan qaysi buyurtmaga pul tushganini shu orqali topadi.

### PDF texnik talablari

| Talab | Qiymat |
|---|---|
| Format | A4, **vertikal** |
| Til | O'zbek — **kirill** alifbosida. Rus tili ixtiyoriy variant |
| Logotip | Firmmit logotipi, **o'ng yuqori burchakda**, fon shaffof |
| Brend rangi | #3365FF — sarlavhalar va jadval boshi |
| Pastki kolontitul | Har sahifaning **eng pastida, bir xil joyda**: kompaniya nomi, manzil, telefon, sahifa raqami |
| Shrift | Kirill va lotin harflarini to'liq qo'llab-quvvatlaydigan shrift |
| Kutubxona | WeasyPrint (HTML shablondan PDF) |
| Saqlash | `order.contract_file` va `order.invoice_file` maydonlariga |

Shablon fayllari: `apps/orders/templates/documents/contract.html` va `invoice.html`.

### Hujjat shakllantirish oqimi

1. Xaridor savatda "Rasmiylashtirish" tugmasini bosadi
2. Xaridor turini tanlaydi: yuridik / jismoniy shaxs
3. **Yuridik shaxs:** rekvizitlar formasi to'ldiriladi (STIR, hisobraqam, MFO, bank, manzil, rahbar)
4. Rekvizitlar tekshiriladi (raqamlar soni), `company` yozuvi yaratiladi yoki STIR bo'yicha topiladi
5. `order` yaratiladi, holati `documents_sent`
6. Shartnoma va hisob PDF shakllanadi
7. Xaridor ikkalasini yuklab oladi; nusxasi ko'rsatilgan e-pochtaga ham yuboriladi
8. Buyurtma admin panelda ko'rinadi, Telegram'ga xabar boradi
9. Pul tushgach buxgalter admin panelda tasdiqlaydi, holat `confirmed` ga o'tadi

**Takroriy xaridor:** STIR bo'yicha topilsa, rekvizitlar avtomatik to'ldiriladi — qayta kiritish shart emas.

---

## 2-qism. To'lov arxitekturasi

Maqsad: bugun bank o'tkazmasi ishlaydi, ertaga Click yoki Payme ulanganda **faqat bitta yangi fayl qo'shiladi**, mavjud kod o'zgarmaydi.

### Fayllar tuzilishi

```
apps/payments/
  providers/
    base.py            # PaymentProvider — abstrakt klass
    bank_transfer.py   # FAOL
    cash.py            # FAOL
    click.py           # ZAXIRA — tayyor, o'chirilgan
    payme.py           # ZAXIRA — tayyor, o'chirilgan
    atmos.py           # ZAXIRA — tayyor, o'chirilgan
  registry.py          # provayderlarni ro'yxatga oluvchi
  services.py
  views.py             # webhook endpointlari
```

### Abstrakt interfeys

Har bir provayder shu to'rt metodni bajaradi:

| Metod | Vazifasi |
|---|---|
| `create_payment(order)` | To'lov yozuvini yaratadi, kerak bo'lsa havola qaytaradi |
| `handle_callback(payload)` | Tashqi tizimdan kelgan xabarni qayta ishlaydi |
| `check_status(payment)` | To'lov holatini tekshiradi |
| `cancel(payment, reason)` | To'lovni bekor qiladi |

`bank_transfer` uchun `create_payment` to'lov havolasi emas, hisob PDF havolasini qaytaradi. `handle_callback` esa admin qo'lda tasdiqlaganda chaqiriladi.

### Provayderni yoqish

Yangi provayder ulanganda faqat uch qadam:

1. `.env` ga kalitlar qo'shiladi (`CLICK_SERVICE_ID`, `CLICK_SECRET` va h.k.)
2. `payment_method_setting` jadvalida `is_active = true` qilinadi (admin paneldan)
3. Webhook manzili to'lov tizimi kabinetida ko'rsatiladi

**Kod o'zgartirilmaydi.** Shu maqsadda `click.py`, `payme.py`, `atmos.py` fayllari **hozirdanoq yoziladi** — ichida to'liq mantiq bo'ladi, lekin `is_active = false` bo'lgani uchun ishlamaydi.

### Webhook manzillari (hozirdan band qilinadi)

| Manzil | Holati |
|---|---|
| `/api/v1/payments/click/` | 503 qaytaradi (o'chirilgan) |
| `/api/v1/payments/payme/` | 503 qaytaradi (o'chirilgan) |
| `/api/v1/payments/atmos/` | 503 qaytaradi (o'chirilgan) |
| `/api/v1/payments/bank-transfer/confirm/` | Faol — faqat admin uchun |

### Saytda ko'rinishi

`payment_method_setting` jadvalidagi `is_active` va `available_for` maydonlariga qarab, to'lov usullari ro'yxati **avtomatik** shakllanadi. Frontend'da usullar qo'lda yozilmaydi — API dan olinadi.

Bugungi holat:

| Usul | Yuridik shaxs | Jismoniy shaxs |
|---|---|---|
| Bank o'tkazmasi | Ko'rinadi | Ko'rinmaydi |
| Naqd (yetkazishda) | Ko'rinmaydi | Ko'rinmaydi (qo'ng'iroq orqali) |
| Click / Payme / ATMOS | O'chirilgan | O'chirilgan |

Click ulangan kunda jismoniy shaxs uchun to'liq onlayn xarid oqimi ochiladi — qo'ng'iroq varianti esa qo'shimcha usul sifatida qoladi.

---

## 3-qism. Jismoniy shaxs oqimi

Hozircha jismoniy shaxs saytda to'lay olmaydi. Uning uchun:

1. Savatga mahsulot qo'shadi
2. "Rasmiylashtirish" da jismoniy shaxsni tanlaydi
3. Ism va telefon raqamini qoldiradi (ixtiyoriy izoh bilan)
4. `callback_request` yozuvi yaratiladi, savat tarkibi `items` maydoniga saqlanadi
5. Telegram'ga xabar boradi
6. Menejer qo'ng'iroq qiladi, kelishadi, qo'lda buyurtma yaratadi

Saytda aniq yozib qo'yiladi: **"Jismoniy shaxslar uchun onlayn to'lov tez orada ishga tushadi. Hozircha menejerimiz siz bilan bog'lanadi."**

Bu matn `site_setting` da saqlanadi — Click ulanganda kodga tegmasdan o'chiriladi.
