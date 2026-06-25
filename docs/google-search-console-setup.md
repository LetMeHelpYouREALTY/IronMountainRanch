# Google Search Console setup — Iron Mountain Ranch

Production site: **https://www.ironmountainranchlasvegas.com**

This repo is pre-wired for Search Console. Complete the dashboard steps below after deploy.

## 1. Create the property (URL prefix)

1. Open [Google Search Console](https://search.google.com/search-console/welcome).
2. Choose **URL prefix** (not Domain) unless you control apex DNS TXT for the whole domain.
3. Enter: `https://www.ironmountainranchlasvegas.com`
4. Use the **same host** for sitemap, `metadataBase`, and canonical URLs (already set via `NEXT_PUBLIC_SITE_URL`).

> Apex `https://ironmountainranchlasvegas.com` redirects to `www` in `vercel.json`. Verify the **www** property you want indexed.

## 2. Verify ownership (HTML meta tag — recommended)

1. In GSC, pick **HTML tag** verification.
2. Copy only the `content` value from the meta tag (not the full tag).
3. In Vercel → **Production** env, set:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token_here
   ```
4. Redeploy production.
5. Confirm the homepage `<head>` contains:
   ```html
   <meta name="google-site-verification" content="your_token_here" />
   ```
   (Emitted by `app/layout.tsx` → `getGoogleSearchConsoleVerification()` in `lib/site-url.ts`.)
6. Click **Verify** in Search Console.

### Alternate methods

- **HTML file**: place the file in `public/` and redeploy.
- **Google Analytics**: only if the same Google account owns GA4 property `G-7Z86DE17G8`.
- **DNS**: use Domain property verification at your DNS host (gray-cloud Cloudflare only).

## 3. Submit sitemap

After verification:

1. GSC → **Sitemaps** → add: `https://www.ironmountainranchlasvegas.com/sitemap.xml`
2. `app/sitemap.ts` builds URLs from `lib/seo-weekly/marketing-routes.generated.json`.
3. `app/robots.ts` advertises the sitemap and allows `/` while blocking `/api/`.

## 4. Request indexing (priority URLs)

After the first production deploy with the IMR SEO hub live, use **URL Inspection** → **Request indexing** for:

1. `https://www.ironmountainranchlasvegas.com/neighborhoods/iron-mountain-ranch`
2. `https://www.ironmountainranchlasvegas.com/89131-homes-for-sale`
3. `https://www.ironmountainranchlasvegas.com/89143-homes-for-sale`
4. `https://www.ironmountainranchlasvegas.com/iron-mountain-ranch-hoa`
5. `https://www.ironmountainranchlasvegas.com/buy`
6. `https://www.ironmountainranchlasvegas.com/`
7. `https://www.ironmountainranchlasvegas.com/sub-communities/iron-mountain-estates`
8. `https://www.ironmountainranchlasvegas.com/iron-mountain-ranch-vs-spring-mountain-ranch`

Re-request only after substantive content changes (monthly max per URL is fine).

## 5. Post-setup checks

| Check | How |
|-------|-----|
| Canonical host | View source on `/` — canonical should be `https://www.ironmountainranchlasvegas.com/` |
| robots.txt | `https://www.ironmountainranchlasvegas.com/robots.txt` lists `Sitemap:` |
| No accidental noindex | Preview URLs on `*.vercel.app` carry `noindex`; production should not |
| Rich results | [Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/google-business` |
| URL Inspection | Inspect `/`, `/buy`, `/google-business` after deploy |

## 6. Ongoing monitoring

- **Page indexing** — fix 404s, redirect chains, and duplicate canonicals.
- **Core Web Vitals** — field data in GSC + Vercel Speed Insights.
- **Enhancements** — FAQ / LocalBusiness JSON-LD errors.
- Weekly automation: Vercel cron → `/api/cron/seo-weekly` (see `.env.example`).

## Env reference

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin — must match GSC property |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | HTML tag verification token |

See also: `docs/google-business-profile-alignment.md`
