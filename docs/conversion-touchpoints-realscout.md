# Iron Mountain Ranch — RealScout Conversion Touchpoints

**Site:** https://www.ironmountainranchlasvegas.com  
**Agent ID:** `QWdlbnQtMjI1MDUw`  
**CRM path:** RealScout → Follow Up Boss (native dashboard integration — do not custom-sync)  
**Last updated:** June 2026

---

## Executive summary

| Intent | Fastest path to RealScout | Steps (after fixes) |
|--------|---------------------------|---------------------|
| **Buyer** | Homepage hero `#imr-search` | 0 clicks — `realscout-simple-search` |
| **Buyer** | Nav **Buy** → `/buy#imr-search` | 1 click — search in hero |
| **Buyer** | `/listings` | 0 — `realscout-office-listings` above fold |
| **Seller** | Nav **Sell** → `/sell#imr-home-value` | 0–1 click — `realscout-home-value` in hero |
| **Seller** | **Home Value** → `/home-valuation` | 0 — home-value in hero |

**Inherited friction removed (this release):**

- Homepage footer **Send a Message** → replaced with **What's My Home Worth?** (RealScout path)
- **View All Properties** external portal → in-site `/listings`
- `/sell` and `/home-valuation` led with **Calendly** → **realscout-home-value** primary; Calendly secondary
- `/buy` hero was GBP-only → **simple-search** in hero
- Duplicate mid-page search on `/buy` removed (hero + listings only)
- GA4 events added for CTA + widget mount tracking

---

## RealScout widgets on this site

| Widget | Tag | Primary intent | Pages |
|--------|-----|----------------|-------|
| Simple search | `realscout-simple-search` | Buyer MLS search | `/`, `/buy` |
| Office listings | `realscout-office-listings` | Browse MLS grid | `/`, `/buy`, `/listings`, footer sections |
| Home value | `realscout-home-value` | Seller estimate | `/sell`, `/home-valuation` |

**Not used:** `realscout-advanced-search`, `realscout-your-listings` (portfolio allows; not needed for IMR scope).

**Script:** loaded once in `app/layout.tsx` from `em.realscout.com`.

---

## Full touchpoint map (first click → inside widget)

Legend: **R** = required (RealScout registration/save flow), **I** = inherited (extra hop we control), **B** = blocker (non-RealScout conversion)

### 1. Global navigation (`Navbar`)

| # | Touchpoint | Destination | Widget / blocker | Step |
|---|------------|-------------|------------------|------|
| 1 | Logo | `/` | Hero `#imr-search` (deferred ≤2s) | I → R |
| 2 | Home | `/` | same | I → R |
| 3 | Buy | `/buy#imr-search` | `simple-search` in hero | **R** |
| 4 | Sell | `/sell#imr-home-value` | `home-value` in hero | **R** |
| 5 | Home Value | `/home-valuation` | `home-value` in hero | **R** |
| 6 | Sub-Communities | `/sub-communities` | Deferred `office-listings` | I → R |
| 7 | Market Report | `/market-report` | Footer listings only | I → R |
| 8 | Contact | `/contact` | Calendly inline | **B** |
| 9 | Call (mobile/desktop) | `tel:+17029963758` | Phone | **B** |

### 2. Homepage `/`

| # | Touchpoint | Fields / screens | Widget | Step |
|---|------------|------------------|--------|------|
| 1 | Hero headline + subcopy | None | — | I (marketing) |
| 2 | **`#imr-search`** | RealScout: location/address input → results → save/search signup | `simple-search` | **R** |
| 3 | Trust stats row | None | — | I |
| 4 | Why Work With Dr. Jan | None | — | I |
| 5 | Market stats + Full Market Report | Link only | — | I |
| 6 | Featured Properties (deferred) | Scroll; MLS cards; click listing → RealScout detail/register | `office-listings` | I → R |
| 7 | Reviews / FAQ | None | — | I |
| 8 | Footer CTA **Search Listings** | → `/buy#imr-search` | `simple-search` | I → R |
| 9 | Footer CTA **What's My Home Worth?** | → `/home-valuation#imr-home-value` | `home-value` | I → R |
| 10 | Footer CTA **Call** | Phone | — | B |

**RealScout fields (buyer search):** address/city/MLS query → results list → optional account to save search/alerts (handled inside RealScout iframe/shadow DOM).

### 3. Buy `/buy`

| # | Touchpoint | Widget | Step |
|---|------------|--------|------|
| 1 | Hero **`#imr-search`** | `simple-search` | **R** |
| 2 | Value prop cards | — | I |
| 3 | MLS grid | `office-listings` ($350k–$1M filter) | **R** |
| 4 | Sub-communities link | Content page | I |

### 4. Sell `/sell`

| # | Touchpoint | Widget | Step |
|---|------------|--------|------|
| 1 | Hero **`#imr-home-value`** | `home-value` — **address field** → estimate flow | **R** |
| 2 | Service cards | — | I |
| 3 | Schedule Consultation | `/contact` → Calendly | B (secondary) |
| 4 | Call Now | Phone | B |

**RealScout fields (seller):** street address → property confirm → contact info for report → FUB lead.

### 5. Home valuation `/home-valuation`

| # | Touchpoint | Widget | Step |
|---|------------|--------|------|
| 1 | Hero **`#imr-home-value`** | `home-value` | **R** |
| 2 | BHHS value prop copy | — | I |
| 3 | Calendly (optional CMA) | Scheduling fields | B |
| 4 | Long SEO sections / FAQ | — | I |
| 5 | Footer listings | `office-listings` | I → R |

### 6. Listings `/listings`

| # | Touchpoint | Widget | Step |
|---|------------|--------|------|
| 1 | Hero marketing | — | I |
| 2 | **MLS grid (top)** | `office-listings` (full MLS) | **R** |
| 3 | Popular searches / neighborhoods | Internal links | I |
| 4 | Bottom phone/contact | Calendly/phone | B |

### 7. Contact `/contact`

| Touchpoint | Widget | Notes |
|------------|--------|-------|
| Calendly inline | **B** | Secondary conversion; not property search |
| Footer listings | I → R | Below fold |

### 8. Redirects (inherited URLs)

| Source | Destination | Note |
|--------|-------------|------|
| `/buyers`, `/buyers/*` | `/buy` | Legacy paths; no separate buyer guide pages in repo |
| `/sellers`, `/sellers/*` | `/sell` | Legacy paths |

---

## Inside RealScout (not controlled by site code)

After a visitor interacts with a widget, RealScout owns:

1. **Search** — query → results → listing detail → save favorite / sign up for alerts  
2. **Registration** — name, email, phone (required to save search or request showing)  
3. **Confirmation** — RealScout UI thank-you / continue browsing  
4. **CRM** — lead appears in FUB via RealScout integration (configure in RealScout admin)

Do **not** duplicate this with `LeadCaptureForm` or `/api/leads/capture` on marketing pages.

---

## GA4 tracking (add `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel)

| Event | When | Params |
|-------|------|--------|
| `page_view` | Automatic (gtag config) | — |
| `cta_click` | TrackedLink / TrackedAnchor | `cta_name`, `cta_destination`, `intent`, `proximity` |
| `realscout_widget_mount` | Widget component mount | `widget_type`, `page_path`, `deferred` |
| `conversion_funnel_step` | Optional future | `step`, `intent`, `required` |

**GSC + GA4:** Use GA4 Exploration → path + event `realscout_widget_mount` to see widget proximity by landing page.

---

## Messaging — Parallel research (June 2026)

Use in hero, ads, and widget-adjacent copy (hyperlocal IMR):

**Buyer phrases**

- Iron Mountain Ranch homes for sale  
- gated community northwest Las Vegas 89131  
- Iron Mountain Ranch village homes  
- Centennial Hills gated homes  
- Iron Mountain Ranch MLS listings  
- homes for sale 89131 89143  

**Seller phrases**

- what is my Iron Mountain Ranch home worth  
- Iron Mountain Ranch home value estimate  
- sell Iron Mountain Ranch home  
- Iron Mountain Ranch CMA  
- gated community home valuation 89131  

**Competitor pattern:** IDX sites use long scroll + contact forms *before* search — our edge is **widget-first** above the fold.

---

## Verification checklist

- [ ] Homepage hero: `realscout-simple-search` visible after idle defer  
- [ ] `/buy`: search in hero, listings below  
- [ ] `/sell` + `/home-valuation`: `realscout-home-value` in hero  
- [ ] Nav Buy/Sell/Home Value land on widget anchors  
- [ ] No homepage footer link to `/contact` as primary CTA  
- [ ] `View all MLS listings` → `/listings` (not external portal)  
- [ ] GA4 DebugView shows `realscout_widget_mount` on widget pages  
- [ ] FUB receives test lead from RealScout dashboard test mode  

---

## Files

| Concern | Path |
|---------|------|
| Widget IDs | `lib/realscout-config.ts` |
| GA4 events | `lib/analytics.ts`, `components/analytics/GoogleAnalytics.tsx` |
| Buyer widget | `components/realscout/RealScoutSimpleSearch.tsx` |
| Seller widget | `components/realscout/RealScoutHomeValue.tsx` |
| Deferred hero search | `components/realscout/DeferredRealScoutSimpleSearch.tsx` |
