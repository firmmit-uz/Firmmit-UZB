# FIRMMIT-UZB — loyiha qoidalari (Claude Code uchun)

Bu faylni Claude Code har sessiya boshida avtomatik o'qiydi.
Quyidagi qoidalarga QAT'IY amal qilinadi.

## Git bilan ishlash — MAJBURIY

Bu loyiha bir necha kishi tomonidan GitHub orqali birgalikda ishlanadi
(repozitoriya: `firmmit-uz/Firmmit-UZB`). Ish yo'qolib qolmasligi va
konflikt bo'lmasligi uchun har sessiyada shu tartibga amal qil:

1. **Ish boshida** — eng oxirgi holatni GitHub'dan yuklab ol:

   ```
   git pull
   ```

2. **Har bir tugallangan o'zgarishdan keyin** — darhol saqla va yubor:

   ```
   git add -A
   git commit -m "<qisqa, aniq o'zbekcha xabar>"
   git push
   ```

3. Commit xabari o'zgarishni aniq tavsiflasin.
   Masalan: `"Katalog sahifasiga narx filtri qo'shildi"`.

4. Agar `git pull` yoki `git push` da konflikt/xatolik chiqsa — **TO'XTA**,
   foydalanuvchiga oddiy tilda tushuntir. O'zboshimchalik bilan `--force`
   yoki majburiy push **QILMA**.

5. Har `push`'dan keyin foydalanuvchiga "GitHub'ga saqlandi" deb tasdiqla.

## Loyiha hujjatlari

`docs/` papkasidagi `.md` fayllar — reja va texnik talablar
(`roadmap.md`, `database.md`, `documents.md`, `tech-python.md`,
`seller-requisites.md`). Kod yozishdan oldin mos hujjatga qara; kerak
bo'lsa **avval hujjatni yangila, keyin kod yoz** (tech-python.md qoidasi:
hujjat koddan ustun turadi).
