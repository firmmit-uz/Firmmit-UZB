# Loyihaning texnik tavsifi (Python / Django)

Bu hujjat oldingi `tech.md` (Symfony/PHP) o'rnini bosadi. Loyiha Python + Django + Django REST Framework asosida yoziladi. Docker ishlatiladi.

## Texnologiyalar

| Qism | Texnologiya | Versiya |
|---|---|---|
| Til | Python | 3.13 |
| Backend | Django | 5.2 LTS |
| API | Django REST Framework | oxirgi barqaror |
| Baza | PostgreSQL | 16+ |
| Admin panel | Django admin (django-unfold bilan bezatiladi) | — |
| Fon vazifalari | Celery + Redis | — |
| Mijoz sayti | Nuxt 4 (Vue 3, SSR) + Tailwind CSS | — |
| To'lov | paytechuz (Click, Payme) | — |
| Server | Docker + Nginx + Gunicorn + SSL | — |

## Loyiha tuzilishi

```
backend/
  config/              # settings, urls, wsgi, asgi, celery
  apps/
    core/              # umumiy: BaseModel, ParameterGetter, xatoliklar
    catalog/           # Category, Product, ProductImage
    orders/            # Order, OrderItem, OrderStatusLog
    payments/          # Payment, Click va Payme integratsiyasi
    customers/         # Customer, Address
  docs/                # har bir model uchun .md hujjat
frontend/
  app/                 # Nuxt 4 — mijoz sayti
docker/
```

Har bir app ichida: `models.py`, `serializers.py`, `views.py`, `services.py`, `admin.py`, `urls.py`, `tests/`.

## PHP loyihasidan ko'chirilgan qoidalar (kuchda qoladi)

- **Hujjat koddan muhimroq.** Avval `/docs` dagi `.md` fayl o'zgartiriladi, keyin kod. Hujjatda yozilgan narsa koddagidan ustun turadi.
- Har bir model uchun `/docs/model_nomi.md` ko'rinishida hujjat fayli bo'lishi shart.
- Backend logikasi yoki model xususiyati o'zgarsa, mos `.md` fayl **majburiy** yangilanadi.
- Fayllar har doim bitta bo'sh qator bilan tugaydi.
- Metod nomlari har doim fe'l bo'ladi. Boolean qaytaruvchi metodlar `is_` yoki `has_` bilan boshlanadi (`has_stock()`, `is_paid()`).
- Komment yozish o'rniga shu kod bo'lagi uchun tushunarli nomli private metod yaratiladi. Kod izohsiz ham o'qilishi kerak.
- `{}` o'rniga Python'da blok kodlar (`if`, `for`, `def`, `class`) o'zidan oldin va keyin bitta bo'sh qator qoldiradi. Blok boshlangandan keyin darhol bo'sh qator qoldirilmaydi.
- Imkon bo'lsa metodlar 10 qatordan oshmasin. Katta metod kichik private metodlarga bo'linadi.
- SOLID tamoyillariga amal qilinadi.

## Python uchun qat'iy qoidalar

- **PEP 8** standartiga qat'iy amal qilinadi. Formatlash: `ruff format`, tekshirish: `ruff check`. Har commit oldidan `pre-commit` ishlaydi.
- **Type hint majburiy.** Har bir funksiya argumenti va qaytaruvchi qiymati tiplanadi:
  `def calculate_total(order: Order) -> Decimal:`
- **`None` ga tekshirish aniq yoziladi.** `if user:` emas, `if user is None:` deb yoziladi. Faqat tipi `bool` bo'lgan o'zgaruvchi shartsiz yozilishi mumkin: `if is_active:`
- **Biznes logika `services.py` da.** `views.py` faqat so'rovni qabul qiladi va javob qaytaradi. Model ichida faqat o'sha modelga tegishli kichik metodlar bo'ladi.
- **Obyekt saqlash `services.py` orqali.** To'g'ridan-to'g'ri `Model.objects.create()` chaqiruvi view yoki serializer ichida yozilmaydi.
- **Erkin `dict` qaytarilmaydi.** Ma'lumot tashish uchun `dataclass` yoki serializer ishlatiladi. Dict faqat tashqi API bilan almashinuvda (JSON) ruxsat etiladi.
- **`.env` dan o'zgaruvchi to'g'ridan-to'g'ri o'qilmaydi.** `apps/core/parameters.py` ichidagi `ParameterGetter` klassi orqali olinadi. Kodda `os.environ` yozuvlari bo'lmasligi kerak.
- **Import aniq bo'ladi.** `from x import *` taqiqlanadi.
- **Pul qiymatlari `Decimal`.** `float` bilan hech qachon pul hisoblanmaydi. Bazada `DecimalField(max_digits=14, decimal_places=2)`.
- **Vaqt UTC da saqlanadi**, ko'rsatishda `Asia/Tashkent` ga o'giriladi. `datetime.now()` emas, `django.utils.timezone.now()` ishlatiladi.
- **Migratsiya avtomatik yaratiladi, lekin qo'lda ko'rib chiqiladi.** Har bir migratsiya alohida commit qilinadi.
- **Ma'lumot hech qachon o'chirilmaydi.** Rad etilgan yoki bekor qilingan buyurtma bazada qoladi — faqat `status` o'zgaradi va `ORDER_STATUS_LOG` ga yozuv tushadi.
- **Test majburiy:** to'lov, buyurtma yaratish va narx hisoblash logikasi uchun `pytest-django` bilan test yoziladi.

### Noto'g'ri misol

```python
def create_order(request):

    data = request.data
    if data.get('items'):
        total = 0
        for i in data['items']:
            total += i['price'] * i['qty']
        order = Order.objects.create(total=total, phone=data['phone'])
        return Response({'id': order.id})

```

### To'g'ri misol

```python
def create_order(self, payload: OrderPayload) -> Order:
    order = self._build_order(payload)
    self._attach_items(order, payload.items)
    self._recalculate_total(order)

    return order
```

## Modellar uchun qoidalar

- Barcha modellar `apps/core/models.py` dagi `BaseModel` dan meros oladi (`created_at`, `updated_at`).
- Model nomi birlikda: `Product`, `Order`, `Payment`.
- Har bir `status`/`type` maydoni uchun `TextChoices` klassi yoziladi, matn qatorlari kodda takrorlanmaydi.
- `ForeignKey` da `on_delete` har doim ochiq ko'rsatiladi. Buyurtma tarixini saqlash uchun `PROTECT` yoki `SET_NULL` afzal, `CASCADE` faqat rasm kabi bog'liq yozuvlarda.
- Ko'p tilli maydonlar `_uz`, `_ru`, `_en` qo'shimchasi bilan yoziladi (`name_uz`, `name_ru`, `name_en`).

## API uchun qoidalar

- URL manzillar ko'plikda va kichik harfda: `/api/v1/products/`, `/api/v1/orders/`.
- Versiya prefiksi majburiy: `/api/v1/`.
- Ro'yxat qaytaruvchi endpointlarda sahifalash (pagination) majburiy.
- Autentifikatsiya: JWT (`djangorestframework-simplejwt`). Admin qismi Django sessiyasi bilan ishlaydi.
- To'lov webhook'lari alohida, autentifikatsiyasiz, lekin imzo (signature) tekshiruvi bilan.
- Xatolik javoblari bir xil ko'rinishda: `{"detail": "...", "code": "..."}`.

## Frontend qoidalari (Nuxt 4)

- Vue 3 `<script setup>` sintaksisi va TypeScript ishlatiladi.
- Uslub uchun faqat Tailwind CSS klasslari. Inline `style=""` ishlatilmaydi.
- **Mobile-first:** asosiy uslub telefon uchun yoziladi, kattaroq ekranlar `sm:`, `md:`, `lg:`, `xl:` prefikslari bilan qo'shiladi.
- Takrorlanuvchi qismlar komponentga chiqariladi (`ProductCard`, `CategoryTile`, `CartDrawer`).
- API chaqiruvlari faqat `composables/` ichida (`useProducts`, `useCart`, `useOrder`), komponent ichida to'g'ridan-to'g'ri `fetch` yozilmaydi.
- Rasmlar `<NuxtImg>` orqali chiqariladi — avtomatik WebP/AVIF, `loading="lazy"`, ekran o'lchamiga mos hajm.
- Katalog va mahsulot sahifalari SSR rejimida (SEO uchun), savat va profil client rejimida.
- Firmmit brend rangi: `#3365FF`. Tailwind konfiguratsiyasida `primary` sifatida belgilanadi.

## Ekran o'lchamlari (Tailwind breakpoint)

| Prefiks | Kenglik | Qurilma | Katalog ustunlari |
|---|---|---|---|
| (asosiy) | < 640px | Telefon | 2 |
| `sm:` | ≥ 640px | Katta telefon | 2 |
| `md:` | ≥ 768px | Planshet | 3 |
| `lg:` | ≥ 1024px | Noutbuk | 4 |
| `xl:` | ≥ 1280px | Monitor | 5 |

## Sekin internet uchun talablar

- Bosh sahifa birinchi yuklanishi 1 MB dan oshmasin.
- Barcha rasmlar WebP/AVIF, `lazy` yuklanadi.
- PWA yoqiladi (`@vite-pwa/nuxt`) — takroriy ochilishda katalog keshdan chiqadi.
- Lighthouse Performance ko'rsatkichi mobil rejimda 85 dan past bo'lmasligi kerak.
