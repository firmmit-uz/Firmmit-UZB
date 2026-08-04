# Sotuvchi rekvizitlari — FIRMMIT GLOBAL MChJ XK

Bu ma'lumotlar `site_setting` jadvaliga yuklanadi va har bir shartnoma hamda to'lov uchun hisobning sotuvchi qismiga avtomatik chiqadi.

**Holati: to'liq. Qo'shimcha ma'lumot kerak emas.**

## Rekvizitlar

| Maydon | Qiymat |
|---|---|
| Nomi (lotin) | FIRMMIT GLOBAL MChJ XK |
| Nomi (kirill) | «FIRMMIT GLOBAL» МЧЖ ХК |
| STIR (INN) | 311769341 |
| QQS ro'yxat kodi | 326110330254 (guvohnoma faol) |
| Hisobraqam (X/R) | 20208000607176166001 |
| MFO | 00401 |
| Bank | АТ «АЛОҚАБАНК» Тошкент ш. Бош офиси |
| Yuridik manzil | Toshkent sh., Yashnobod tumani, Doʻstobod MFY, Maxtumquli koʻchasi, 130-uy |
| Rahbar | Abdullayev Ergash Fayzullayevich |
| Lavozimi | Direktor |
| OKED | Ishlatilmaydi — hujjatga chiqarilmaydi |
| Telefon | +998 90 063 23 15 |
| E-pochta | global@firmmit.com |
| Sayt | www.firmmit.kr |

## Rekvizitlarning hujjatdagi ko'rinishi (kirill)

```
СОТУВЧИ:
«FIRMMIT GLOBAL» МЧЖ ХК
Манзил: Тошкент ш., Яшнобод тумани, Дўстобод МФЙ,
        Махтумқули кўчаси, 130-уй
СТИР: 311769341
ҚҚС рўйхат коди: 326110330254
Х/Р: 20208000607176166001
Банк: АТ «АЛОҚАБАНК» Тошкент ш. Бош офиси
МФО: 00401
Тел: +998 90 063 23 15
E-mail: global@firmmit.com

Директор _________________ Абдуллаев Эргаш Файзуллаевич
                                                            М.Ў.
```

Shartnoma matnining kirish qismida:

```
«FIRMMIT GLOBAL» МЧЖ ХК номидан Устав асосида фаолият юритувчи
директор Абдуллаев Эргаш Файзуллаевич шахсида, кейинги ўринларда
«Сотувчи» деб юритилади, бир томондан ва ...
```

## Django uchun tayyor fixture

Fayl: `apps/core/fixtures/seller_requisites.json`

Yuklash: `python manage.py loaddata seller_requisites`

```json
[
  {"model": "core.sitesetting", "pk": "seller_name_uz_latin", "fields": {"value": "FIRMMIT GLOBAL MChJ XK", "description": "Sotuvchi nomi (lotin)"}},
  {"model": "core.sitesetting", "pk": "seller_name_uz_cyrillic", "fields": {"value": "«FIRMMIT GLOBAL» МЧЖ ХК", "description": "Sotuvchi nomi (kirill) - hujjatlarda"}},
  {"model": "core.sitesetting", "pk": "seller_inn", "fields": {"value": "311769341", "description": "STIR"}},
  {"model": "core.sitesetting", "pk": "seller_vat_code", "fields": {"value": "326110330254", "description": "QQS royxat kodi"}},
  {"model": "core.sitesetting", "pk": "seller_account", "fields": {"value": "20208000607176166001", "description": "Hisobraqam"}},
  {"model": "core.sitesetting", "pk": "seller_mfo", "fields": {"value": "00401", "description": "Bank MFO"}},
  {"model": "core.sitesetting", "pk": "seller_bank", "fields": {"value": "АТ «АЛОҚАБАНК» Тошкент ш. Бош офиси", "description": "Bank nomi"}},
  {"model": "core.sitesetting", "pk": "seller_address", "fields": {"value": "Тошкент ш., Яшнобод тумани, Дўстобод МФЙ, Махтумқули кўчаси, 130-уй", "description": "Yuridik manzil"}},
  {"model": "core.sitesetting", "pk": "seller_director", "fields": {"value": "Абдуллаев Эргаш Файзуллаевич", "description": "Rahbar F.I.Sh."}},
  {"model": "core.sitesetting", "pk": "seller_director_position", "fields": {"value": "Директор", "description": "Rahbar lavozimi"}},
  {"model": "core.sitesetting", "pk": "seller_phone", "fields": {"value": "+998 90 063 23 15", "description": "Telefon"}},
  {"model": "core.sitesetting", "pk": "seller_email", "fields": {"value": "global@firmmit.com", "description": "E-pochta"}},
  {"model": "core.sitesetting", "pk": "seller_website", "fields": {"value": "www.firmmit.kr", "description": "Sayt"}},
  {"model": "core.sitesetting", "pk": "vat_rate", "fields": {"value": "12", "description": "QQS stavkasi (%)"}},
  {"model": "core.sitesetting", "pk": "invoice_validity_days", "fields": {"value": "5", "description": "Hisob amal qilish muddati (ish kuni)"}},
  {"model": "core.sitesetting", "pk": "court_name", "fields": {"value": "Тошкент шаҳар иқтисодий суди", "description": "Nizolarni hal etish sudi"}}
]
```

## QQS bo'yicha eslatma

FIRMMIT GLOBAL — QQS to'lovchisi, guvohnoma faol. Shuning uchun:

- Mahsulot narxi bazada **QQSsiz** saqlanadi
- Saytda QQS bilan ko'rsatiladi
- Shartnoma va hisobda uch qator alohida chiqadi: сумма -> ҚҚС 12% -> жами
- Biror mahsulot QQSdan ozod bo'lsa, `product.vat_rate = 0` qilinadi va hujjatda «ҚҚСсиз» deb belgilanadi

## O'zgartirish tartibi

Rekvizitlar o'zgarsa — admin paneldan tahrirlanadi, kodga tegilmaydi. Ilgari shakllantirilgan shartnomalar PDF fayl sifatida saqlangani uchun o'zgarmaydi.
