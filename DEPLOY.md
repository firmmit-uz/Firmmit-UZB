# Deploy Firmmit Uzbekistan to Cloudflare Pages

Your site is 100% static (HTML/CSS/JS) — no build step, no server. The
ready-to-upload files are in the **`dist/`** folder, and a zip of it is at
**`firmmit-uzbekistan-site.zip`**.

---

## Option A — Direct Upload (easiest, no Git, no CLI)

1. Sign in at **https://dash.cloudflare.com**
2. Left sidebar → **Workers & Pages** → **Create** → open the **Pages** tab
   → **Upload assets**.
3. **Project name:** `firmmit-uzbekistan`
   (this becomes your URL: `https://firmmit-uzbekistan.pages.dev`) → **Create project**.
4. Upload the site:
   - **Drag the `dist` folder** (`C:\Users\Pro\Claude\firmmit-uzbekistan\dist`)
     onto the upload box, **or**
   - click **select from computer** and choose **`firmmit-uzbekistan-site.zip`**.
5. Click **Deploy site**. In ~30 seconds it's live at
   **https://firmmit-uzbekistan.pages.dev** — open it on any computer, no login.

### Update it later
Same project → **Create new deployment** → drag the `dist` folder / zip again.

---

## Option B — Wrangler CLI (for later / automation)
Requires Node.js. From the project folder:
```
npx wrangler login
npx wrangler pages deploy dist --project-name=firmmit-uzbekistan
```

---

## Custom domain (e.g. uz.firmmit.com)
In the Pages project → **Custom domains** → **Set up a custom domain** →
enter `uz.firmmit.com` → follow the CNAME step. If `firmmit.com` DNS is already
on Cloudflare, it's applied automatically; otherwise add the CNAME record shown
at your DNS provider.

---

## Dropping in more files later (then redeploy)
Put these into `dist/assets/` and re-upload:
- `logo.png` — blue FIRMMIT. logo (transparent) → auto-appears on white headers
- `logo-light.png` — white FIRMMIT. logo (transparent) → hero header & footer
- `firmmit-uzbekistan-catalog.pdf` → makes the "Download catalog (PDF)" button work

Replacing any file in `dist/assets/photos/` swaps that photo on the site.
