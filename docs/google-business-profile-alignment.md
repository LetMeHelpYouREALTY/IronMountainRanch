# Google Business Profile alignment — Iron Mountain Ranch

**GBP business name:** `Iron Mountain Ranch | Homes by Dr. Jan Duffy`  
**Website (GBP field):** `https://www.ironmountainranchlasvegas.com`  
**Office NAP:** `6628 Sky Pointe Dr., Las Vegas, NV 89131` · `(702) 996-3758`  
**Primary category:** Real Estate Agent

Research basis (June 2026): [Google GBP representation guidelines](https://support.google.com/business/answer/3038177), current local-SEO practice emphasizing **NAP + schema + visible page parity**, and realtor-specific guidance (primary category *Real Estate Agent*, personal website URL in GBP, service-area focus).

## Site ↔ GBP mirror

| GBP field | Site source |
|-----------|-------------|
| Business name | `lib/site-config.ts` → `siteConfig.name` |
| Address / phone / email | `officeInfo` + `agentInfo` |
| Hours | `lib/google-business-profile.ts` → `businessHoursLines` |
| Website | `NEXT_PUBLIC_SITE_URL` / `lib/google-business-profile.ts` |
| Dedicated location page | `/google-business` |
| JSON-LD | `lib/gbp-schema.ts` + root `lib/schema-blueprint.ts` |
| Map + CTAs | `components/shared/GBPMapCard.tsx`, `GbpActionLinks.tsx` |

**Rule:** When GBP changes, update `lib/google-business-profile.ts` and `lib/site-config.ts` together, then mirror in the GBP dashboard.

## 2026 GBP checklist (dashboard + site)

### Name & categories
- [ ] Business name matches real-world branding — **no keyword stuffing** (Google suspends stuffed names).
- [ ] Primary category: **Real Estate Agent**.
- [ ] Secondary (optional): Real Estate Consultant, Real Estate Agency — keep to 3–5 total.
- [ ] One profile per business location.

### NAP & website
- [ ] Address matches `6628 Sky Pointe Dr., Las Vegas, NV 89131` on site footer, `/contact`, `/google-business`, and JSON-LD.
- [ ] Phone `(702) 996-3758` visible with `tel:+17029963758` links.
- [ ] Website field = `https://www.ironmountainranchlasvegas.com` (this microsite, not a portfolio parent URL).
- [ ] Email `DrDuffy@IronMountainRanchLasVegas.com` matches visible copy.

### Hours
- [ ] GBP hours match site:
  - Mon–Fri 9:00 AM – 6:00 PM
  - Sat 10:00 AM – 4:00 PM
  - Sun by appointment

### Service area
- [ ] List Iron Mountain Ranch + northwest Las Vegas (89131, 89143) in GBP service areas.
- [ ] Site `/google-business` lists the same areas in copy and FAQ.

### Reviews (after verification)
- [ ] Set `NEXT_PUBLIC_GBP_PLACE_ID=ChIJ...` in Vercel Production.
- [ ] Optional: `NEXT_PUBLIC_GBP_WRITEREVIEW_URL` from GBP dashboard (`g.page/r/...`).
- [ ] Optional browse URL override: `NEXT_PUBLIC_GBP_BROWSE_REVIEWS_URL`.
- [ ] While pending verification: `NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true` (hides review CTAs).
- [ ] After 5+ real reviews: set `NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE` + `NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT` for JSON-LD stars.

### Content & engagement (GBP dashboard — not duplicated in code)
- [ ] Business description aligned with `/google-business` (hyper-local IMR focus).
- [ ] Services/products reflect buyer, seller, and valuation offers.
- [ ] Photos: office, agent, Iron Mountain Ranch villages (no stock-only gallery).
- [ ] Posts 1–2×/week: new listings, market notes, consultation CTA.
- [ ] Answer Q&A using FAQs from `/google-business` / homepage FAQ.

### Optional map upgrade
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — upgrades embed to Place ID pin when `NEXT_PUBLIC_GBP_PLACE_ID` is set.

## Search Console link

After GBP is stable, verify the site in Search Console per `docs/google-search-console-setup.md` and submit `sitemap.xml`.

## Compliance notes

- Do not emit `aggregateRating` in schema until real review count/value are set via env.
- Supervising brokerage **Berkshire Hathaway HomeServices Nevada Properties** must remain visible (NV NAC 645.610).
- Agent name: **Dr. Jan Duffy** (never “Janet”).
