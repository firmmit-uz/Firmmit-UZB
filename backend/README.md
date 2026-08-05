# FIRMMIT-UZB — Backend

Django 5.2 + DRF + PostgreSQL + Redis. Barchasi Docker ichida ishlaydi.
Loyiha qoidalari uchun `../docs/tech-python.md` ga qarang.

## Ishga tushirish (birinchi marta)

1. `.env` faylini tayyorlang (namunadan nusxa oling):

   ```
   cp .env.example .env
   ```

2. Konteynerlarni ko'taring:

   ```
   docker compose up --build
   ```

3. Boshqa terminalda migratsiyalarni bajaring va admin foydalanuvchi yarating:

   ```
   docker compose exec backend python manage.py migrate
   docker compose exec backend python manage.py createsuperuser
   ```

4. Brauzerda oching: <http://localhost:8000/admin/>

## Tuzilma

```
backend/
  config/          # Django sozlamalari, urls, wsgi, asgi, celery
  apps/
    core/          # BaseModel, ParameterGetter, DocumentCounter, xatoliklar
  Dockerfile
  docker-compose.yml
  requirements.txt
```

## `apps/core` nimalarni beradi

- **BaseModel** — har bir modelga `created_at` va `updated_at` qo'shadi.
- **DocumentCounter** + **DocumentNumberService** — hujjat raqamlarini
  uzluksiz shakllantiradi (`FRM-2026-000001`), tranzaksiya ichida qulflab.
- **ParameterGetter** — sozlamalarga yagona tiplangan kirish nuqtasi.
- **custom_exception_handler** — barcha API xatoliklarini bir xil
  `{"detail": "...", "code": "..."}` ko'rinishida qaytaradi.
