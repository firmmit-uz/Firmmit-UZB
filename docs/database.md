# Ma'lumotlar bazasi sxemasi

Baza: PostgreSQL 16. Barcha jadvallar `apps/core/models.py` dagi `BaseModel` dan meros oladi — har birida `created_at` va `updated_at` maydonlari mavjud.

**Asosiy tamoyillar:**

1. Hech qanday buyurtma yoki to'lov bazadan o'chirilmaydi. Rad etilgan va bekor qilinganlar ham saqlanadi — faqat `status` o'zgaradi.
2. Xaridorning ikki turi bor: **yuridik shaxs** (shartnoma + hisob + bank o'tkazmasi) va **jismoniy shaxs** (qo'ng'iroq so'rovi).
3. To'lov usullari kengaytiriladigan qilib yoziladi — Click, Payme va ATMOS keyinroq kodga tegmasdan yoqiladi.

---

## 1. `category` — Kategoriyalar

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| parent | FK -> category, null | Ichki kategoriya |
| name_uz / name_ru / name_en | varchar(200) | Nomi uch tilda |
| slug | varchar(200), unique | URL uchun |
| description_uz / _ru / _en | text, null | |
| image | image, null | |
| sort_order | int, default 0 | |
| is_active | bool, default true | |

---

## 2. `product` — Mahsulotlar

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| category | FK -> category, PROTECT | |
| sku | varchar(50), unique | Artikul |
| name_uz / name_ru / name_en | varchar(300) | |
| slug | varchar(300), unique | |
| short_description_uz / _ru / _en | varchar(500), null | Katalog kartochkasi |
| description_uz / _ru / _en | text, null | To'liq tavsif |
| price_uzs | decimal(14,2) | **QQSsiz narx** |
| vat_rate | decimal(5,2), default 12.00 | QQS stavkasi (%) |
| price_usd | decimal(12,2), null | Ixtiyoriy |
| old_price_uzs | decimal(14,2), null | Chegirma ko'rsatish uchun |
| unit | varchar(20) | dona / kg / quti / metr |
| stock_quantity | int, default 0 | |
| min_order_quantity | int, default 1 | |
| weight_kg | decimal(8,3), null | |
| is_active | bool, default true | |
| is_featured | bool, default false | |
| views_count | int, default 0 | |

**Muhim:** narx bazada **QQSsiz** saqlanadi. Saytda QQS bilan ko'rsatiladi, shartnoma va hisobda esa uchta qator alohida chiqadi: summa, QQS, jami.

---

## 3. `product_image` — Mahsulot rasmlari

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| product | FK -> product, CASCADE | |
| image | image | |
| alt_text | varchar(200), null | |
| is_main | bool, default false | |
| sort_order | int, default 0 | |

---

## 4. `product_spec` — Texnik xususiyatlar

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| product | FK -> product, CASCADE | |
| name_uz / name_ru / name_en | varchar(150) | Masalan: Quvvat |
| value_uz / value_ru / value_en | varchar(300) | Masalan: 2.5 kVt |
| sort_order | int, default 0 | |

---

## 5. `customer` — Xaridorlar

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| customer_type | varchar(20) | `legal` (yuridik) / `individual` (jismoniy) |
| full_name | varchar(200) | Aloqa uchun shaxs |
| phone | varchar(20) | +998XXXXXXXXX |
| email | varchar(200), null | |
| password | varchar(128), null | Ro'yxatdan o'tish majburiy emas |
| is_verified | bool, default false | |
| is_active | bool, default true | |

---

## 6. `company` — Yuridik shaxs rekvizitlari

Bu jadval **yangi** — yuridik shaxs xaridorlar uchun shartnoma va hisob shakllantirishda ishlatiladi.

| Maydon | Tip | Majburiy | Izoh |
|---|---|---|---|
| id | PK | | |
| customer | FK -> customer, CASCADE | ha | |
| name | varchar(300) | ha | To'liq nomi (MChJ "..." ko'rinishida) |
| inn | varchar(9), index | ha | STIR — 9 raqam |
| bank_account | varchar(20) | ha | Hisobraqam — 20 raqam |
| bank_name | varchar(200) | ha | Bank nomi |
| mfo | varchar(5) | ha | Bank MFO — 5 raqam |
| oked | varchar(10) | yo'q | Faoliyat turi kodi |
| legal_address | varchar(400) | ha | Yuridik manzil |
| director_name | varchar(200) | ha | Rahbar F.I.Sh. |
| director_position | varchar(100) | yo'q | Lavozimi, default "Direktor" |
| vat_certificate | varchar(20), null | yo'q | QQS guvohnomasi raqami |
| phone | varchar(20) | ha | |
| email | varchar(200) | ha | Hujjatlarni yuborish uchun |
| is_verified | bool, default false | | Buxgalter tekshirganmi |

**Tekshiruvlar (validatsiya):** STIR aniq 9 raqam, hisobraqam aniq 20 raqam, MFO aniq 5 raqam. Noto'g'ri kiritilsa forma o'tmaydi.

---

## 7. `address` — Yetkazish manzillari

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| customer | FK -> customer, CASCADE | |
| region | varchar(100) | Viloyat |
| district | varchar(100) | Tuman |
| street | varchar(300) | Ko'cha, uy |
| landmark | varchar(200), null | Mo'ljal |
| phone | varchar(20) | |
| is_default | bool, default false | |

---

## 8. `order` — Buyurtmalar

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| order_number | varchar(30), unique | `FRM-2026-000001` |
| customer_type | varchar(20) | `legal` / `individual` |
| customer | FK -> customer, PROTECT, null | |
| company | FK -> company, PROTECT, null | Faqat yuridik shaxsda |
| contact_name | varchar(200) | Buyurtma paytidagi nusxa |
| phone | varchar(20) | |
| region / district / street / landmark | varchar | Manzil nusxasi |
| amount_without_vat | decimal(14,2) | QQSsiz summa |
| vat_amount | decimal(14,2) | QQS summasi |
| items_amount | decimal(14,2) | Mahsulotlar jami (QQS bilan) |
| delivery_fee | decimal(12,2), default 0 | |
| total_amount | decimal(14,2) | Umumiy summa |
| payment_method | varchar(20) | Quyidagi jadvalga qarang |
| payment_status | varchar(20) | `unpaid` / `partial` / `paid` / `refunded` |
| status | varchar(20) | Quyidagi jadvalga qarang |
| contract_number | varchar(30), null | `FRM-SH-2026-0001` |
| contract_date | date, null | |
| contract_file | file, null | Shakllangan PDF |
| invoice_number | varchar(30), null | `FRM-HI-2026-0001` |
| invoice_file | file, null | To'lov uchun hisob PDF |
| comment | text, null | Xaridor izohi |
| cancel_reason | text, null | |
| paid_at / shipped_at / delivered_at | datetime, null | |

### Buyurtma holatlari (`status`)

| Qiymat | Ma'nosi |
|---|---|
| `new` | Yangi — xaridor buyurtma berdi |
| `documents_sent` | Shartnoma va hisob shakllantirildi (faqat yuridik shaxs) |
| `awaiting_payment` | To'lov kutilmoqda |
| `confirmed` | To'lov tushdi, admin tasdiqladi |
| `preparing` | Tayyorlanmoqda |
| `shipped` | Jo'natildi |
| `delivered` | Yetkazildi |
| `cancelled` | Xaridor bekor qildi |
| `rejected` | Admin rad etdi |

### To'lov usullari (`payment_method`)

| Qiymat | Holati | Izoh |
|---|---|---|
| `bank_transfer` | **Faol** | Yuridik shaxs — hisobraqamga o'tkazma |
| `cash` | **Faol** | Naqd, yetkazishda |
| `click` | Zaxirada | Kod tayyor, o'chirilgan |
| `payme` | Zaxirada | Kod tayyor, o'chirilgan |
| `atmos` | Zaxirada | Kod tayyor, o'chirilgan |

---

## 9. `order_item` — Buyurtma tarkibi

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| order | FK -> order, CASCADE | |
| product | FK -> product, PROTECT, null | |
| product_name | varchar(300) | **Nusxa** — keyin o'zgarsa ham buyurtma o'zgarmaydi |
| product_sku | varchar(50) | Nusxa |
| unit | varchar(20) | Nusxa — shartnomada kerak |
| price | decimal(14,2) | QQSsiz narx (nusxa) |
| vat_rate | decimal(5,2) | Nusxa |
| quantity | int | |
| subtotal | decimal(14,2) | price x quantity (QQSsiz) |
| vat_amount | decimal(14,2) | |
| total | decimal(14,2) | QQS bilan |

---

## 10. `payment_method_setting` — To'lov usullari sozlamasi

Bu jadval **yangi**. Click yoki Payme ulanganda kodga tegmasdan, admin paneldan yoqiladi.

| Maydon | Tip | Izoh |
|---|---|---|
| code | varchar(20), PK | `bank_transfer`, `cash`, `click`, `payme`, `atmos` |
| name_uz / name_ru / name_en | varchar(100) | Saytda ko'rinadigan nomi |
| is_active | bool, default false | Saytda ko'rinadimi |
| available_for | varchar(20) | `legal` / `individual` / `both` |
| sort_order | int, default 0 | |
| config | jsonb, null | Kalitlar shu yerda emas — faqat ochiq sozlamalar |

**Xavfsizlik:** maxfiy kalitlar (merchant_id, secret_key) faqat `.env` faylida saqlanadi, bazada emas.

---

## 11. `payment` — To'lovlar

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| order | FK -> order, PROTECT | |
| provider | varchar(20) | `bank_transfer` / `cash` / `click` / `payme` / `atmos` |
| transaction_id | varchar(100), null | Tashqi tizim ID |
| bank_document_number | varchar(50), null | To'lov topshiriqnomasi raqami |
| amount | decimal(14,2) | |
| state | varchar(20) | Quyidagi jadvalga qarang |
| confirmed_by | FK -> user, SET_NULL, null | Qaysi buxgalter tasdiqladi |
| error_code | varchar(50), null | |
| error_message | text, null | |
| performed_at | datetime, null | |
| cancelled_at | datetime, null | |
| raw_response | jsonb, null | Tashqi tizim javobi |

### To'lov holatlari (`state`)

| Qiymat | Ma'nosi |
|---|---|
| `created` | Yaratildi |
| `pending` | Kutilmoqda (o'tkazma yo'lda) |
| `paid` | To'landi |
| `cancelled` | Bekor qilindi |
| `refunded` | Qaytarildi |

**Bank o'tkazmasi uchun:** to'lov avtomatik tasdiqlanmaydi. Buxgalter bank ko'chirmasidan ko'rib, admin panelda `paid` holatiga o'tkazadi va `bank_document_number` ni kiritadi.

---

## 12. `callback_request` — Qo'ng'iroq so'rovlari

Bu jadval **yangi** — jismoniy shaxs xaridorlar uchun.

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| request_number | varchar(30), unique | `FRM-QS-2026-0001` |
| full_name | varchar(200) | |
| phone | varchar(20) | |
| region | varchar(100), null | |
| comment | text, null | Xaridor izohi |
| items | jsonb | Savatdagi mahsulotlar ro'yxati (nomi, artikul, miqdor, narx) |
| estimated_amount | decimal(14,2) | Taxminiy summa |
| status | varchar(20) | `new` / `called` / `converted` / `rejected` |
| assigned_to | FK -> user, SET_NULL, null | Qaysi menejerga biriktirilgan |
| called_at | datetime, null | |
| manager_comment | text, null | Qo'ng'iroq natijasi |
| order | FK -> order, SET_NULL, null | Buyurtmaga aylansa |

**Oqim:** so'rov tushganda Telegram'ga xabar boradi. Menejer qo'ng'iroq qiladi, natijani yozadi. Kelishilsa qo'lda buyurtma yaratiladi va shu yozuvga bog'lanadi.

---

## 13. `order_status_log` — Holat o'zgarish tarixi

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| order | FK -> order, CASCADE | |
| from_status | varchar(20), null | |
| to_status | varchar(20) | |
| changed_by | FK -> user, SET_NULL, null | |
| comment | text, null | |

---

## 14. `delivery_zone` — Yetkazish hududlari

| Maydon | Tip | Izoh |
|---|---|---|
| id | PK | |
| region | varchar(100) | |
| district | varchar(100), null | |
| fee | decimal(12,2) | |
| free_from_amount | decimal(14,2), null | |
| estimated_days | int, default 1 | |
| is_active | bool, default true | |

---

## 15. `document_counter` — Hujjat raqamlari hisoblagichi

Shartnoma, hisob va so'rov raqamlari uzluksiz bo'lishi uchun.

| Maydon | Tip | Izoh |
|---|---|---|
| doc_type | varchar(20) | `order` / `contract` / `invoice` / `callback` |
| year | int | |
| last_number | int | |

`doc_type` + `year` birgalikda unique. Raqam olish `SELECT ... FOR UPDATE` bilan, tranzaksiya ichida.

---

## 16. `site_setting` — Sayt sozlamalari

| Maydon | Tip | Izoh |
|---|---|---|
| key | varchar(100), PK | |
| value | text | |
| description | varchar(300), null | |

**Sotuvchi rekvizitlari shu yerda saqlanadi** (shartnoma va hisobga chiqadi):
`seller_name`, `seller_inn`, `seller_account`, `seller_bank`, `seller_mfo`, `seller_oked`, `seller_address`, `seller_director`, `seller_vat_certificate`, `seller_phone`, `seller_email`.

Boshqalar: `usd_rate` (CBU dan avtomatik), `min_order_amount`, `contract_validity_days`, `telegram_chat_id`.

---

## Indekslar

| Jadval | Maydon(lar) | Sabab |
|---|---|---|
| product | `slug`, `category_id`, `is_active` | Katalog filtri |
| product | `name_uz`, `name_ru` (GIN, trigram) | Qidiruv |
| order | `order_number`, `status`, `created_at` | Admin ro'yxati |
| order | `contract_number`, `invoice_number` | Hujjat qidiruvi |
| company | `inn` | Takroriy xaridorni topish |
| callback_request | `status`, `created_at` | Menejer ro'yxati |

## Hisobotlar

1. Kunlik / oylik tushum — `payment` bo'yicha `state = paid`
2. To'lov usuli bo'yicha bo'linish
3. Yuridik va jismoniy shaxs xaridorlar nisbati
4. Shakllantirilgan lekin to'lanmagan hisoblar (`awaiting_payment` holatida qancha kun turgani bilan)
5. Rad etilgan va bekor qilingan buyurtmalar + sabablari
6. Javobsiz qolgan qo'ng'iroq so'rovlari
7. Omborda tugab qolgan mahsulotlar
