# FIRMMIT — jonli serverга chiqarish (qadamma-qadam)

Butun sayt (frontend + backend + baza + avtomatik SSL) bitta Docker to'plami
sifatida ishga tushadi. Quyida Oracle Cloud (tekin) misolida, lekin **istalgan
Ubuntu serverда** (arzon VPS ham) shu qadamlar ishlaydi.

---

## 1-qadam — Server olish (Oracle Cloud "Always Free")

1. <https://www.oracle.com/cloud/free/> ga kiring → **Start for free**.
2. Ro'yxatdan o'ting (email, davlat: Uzbekistan). Tekshiruv uchun **bank kartasi**
   so'raladi — **pul yechilmaydi**, faqat tasdiqlash uchun.
3. Console → **Compute → Instances → Create Instance**.
4. Image: **Ubuntu 22.04**. Shape: **Ampere (Always Free, ARM)** yoki
   **VM.Standard.E2.1.Micro (Always Free)**.
5. **SSH kaliti** yarating/yuklang (yoki Oracle yaratganini saqlang) — serverга
   kirish uchun kerak.
6. Instance yaratilгач, uning **Public IP** manzilини yozib oling.
7. **Networking → Security List** da **80** va **443** portlarни oching
   (Ingress rule: 0.0.0.0/0, TCP, 80 va 443).

> Karta ishlatishни xohlamasangiz: arzon VPS (Hetzner ~€4/oy) yoki hozircha
> Cloudflare tunnel bilan davom etамиз — ayting.

---

## 2-qadam — Serverга ulanish (SSH)

O'z kompyuteringizda (PowerShell):

```
ssh -i sizning-kalit.key ubuntu@SERVER_IP
```

---

## 3-qadam — Docker o'rnatish (server ичида)

```
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```
So'ng bir marta chiqib qayta kiring (`exit`, keyin qayta `ssh ...`).

---

## 4-qadam — Loyihани ko'chirib olish

```
sudo apt update && sudo apt install -y git
git clone https://github.com/firmmit-uz/Firmmit-UZB.git
cd Firmmit-UZB
```

---

## 5-qadam — Sozlama faylini tayyorlash

```
cp .env.prod.example .env
nano .env
```
Quyidagilarni to'ldiring va saqlang (Ctrl+O, Enter, Ctrl+X):
- `SITE_DOMAIN` — domeningiz (masalan `firmmit.uz`). Domen hali yo'q bo'lsa: `:80`
- `DJANGO_ALLOWED_HOSTS` va `DJANGO_CSRF_TRUSTED_ORIGINS` — domeningiz
- `DJANGO_SECRET_KEY` — uzun tasodifiy matn
- `POSTGRES_PASSWORD` — kuchli parol

---

## 6-qadam — Domenni serverга yo'naltirish (SSL uchun)

Domen olсangiz (arzon `.uz`/`.com`), uning **A yozuvi**ni serverнинг **Public IP**
sига yo'naltiring. Cloudflare (tekin) orqали DNS boshqarsangiz ham bo'ladi.
Domen server IP'sига ishlагач, Caddy **avtomatик HTTPS (SSL)** o'rnатади.

> Domen hali yo'q bo'lса: `.env` да `SITE_DOMAIN=:80` qo'ying — sayt IP orqали
> (http) ochiladi. Domen olgach o'zgартирасиз.

---

## 7-qadam — Ishga tushirish

```
docker compose -f docker-compose.prod.yml up -d --build
```
Birinची marта bir-ikки daqiqа oladi (baza tayyorланади, mahsулотлар va
rekvизитлар yuklanади).

Admin foydаланувчи yaratish:
```
docker compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

---

## 8-qadam — Tekshirish

Brauzерда oching:
- Sayt: `https://sizning-domen` (yoки `http://SERVER_IP`)
- Katалог: `.../catalog.html`
- Admin: `.../admin/`

---

## Keyинчалик yangилаш (kod o'zgарса)

```
cd Firmmit-UZB
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

## Zaxira nusxa (baza)

```
docker compose -f docker-compose.prod.yml exec db pg_dump -U firmmit firmmit > zaxira_$(date +%F).sql
```
