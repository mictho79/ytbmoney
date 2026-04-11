# SEO Expansion + Design Refresh — ytbmoney.pages.dev

**Date:** 2026-04-11  
**Status:** Approved  
**Scope:** Full aggressive SEO expansion + Clean Elevated design refresh + AdSense integration

---

## Context

The site ytbmoney.pages.dev is a YouTube earnings calculator micro-site (pure HTML/CSS/JS, hosted on Cloudflare Pages). After ~1 month indexed, it ranks on 318 queries with 5.38k impressions but sits at average position 34.2 — no clicks on most keywords. The foundation is strong; the goal is to dominate the niche with a full topic cluster strategy and a design refresh that makes it more trustworthy and linkable.

---

## Decisions

| Decision | Choice |
|---|---|
| Design direction | Clean Elevated |
| Monetization | Google AdSense only |
| Languages | EN + FR + ES + PT (all 4) |
| Content scope | Aggressive (~272 new HTML files) |
| Execution approach | C — Design + piliers en parallèle, then satellites |

---

## Section 1 — Design System (Clean Elevated)

### Changes to `style.css`

- **Red top bar**: 4px `#FF0000` bar at very top of every page (above header). Signature brand mark.
- **H1 weight**: bump to `font-weight: 900`, size `clamp(2.5rem, 6vw, 3.5rem)`, `letter-spacing: -0.04em`
- **H2 weight**: bump to `font-weight: 800`, tighter tracking
- **Accent line**: add `.accent-line` utility — `48px wide, 5px tall, #FF0000, border-radius: 3px` — used below H1 in heroes
- **Hero badge**: `.hero-badge` — pill shape, `background: #fff5f5`, `color: #CC0000`, `border: 1px solid #fecaca` — shows "Free Tool · No sign-up"
- **Stat cards**: `background: #f9fafb`, `border: 1px solid #e5e7eb`, `border-radius: 10px` — value in `font-weight: 900`, green variant for positive earnings
- **Calculator result box**: `background: #fff5f5`, `border: 1.5px solid #fecaca` — makes result visually distinct
- **Article grid**: 3-column CSS grid for satellite article links at bottom of pillar pages
- **Article card**: hover shadow, tag in `#FF0000`, title bold 700
- **Footer**: dark `#0a0a0a` background, white logo text — stronger contrast vs white body
- **Nav**: add "Blog" link pointing to a `/blog/` index page (list of all satellite articles)

### Files to update with new design
All 6 existing pages (EN) + their FR/ES/PT versions = 24 files total.

---

## Section 2 — Information Architecture

### Execution Order (Approach C)
1. **Week 1**: Design refresh on all existing pages + 11 new pillar pages (EN only)
2. **Week 2**: ~48 satellite articles (EN only) + translate all new pillar pages to FR/ES/PT
3. **Week 3**: 6 backlink bait pages (EN) + translate satellites to FR/ES/PT + sitemap update

### Existing Pillars (update only)
| Page | URL |
|---|---|
| YouTube Money Calculator | `/` |
| YouTube RPM Guide | `/youtube-rpm-guide.html` |
| YouTube Shorts Money Calculator | `/youtube-shorts-money-calculator.html` |
| How Much YouTube Pays Per View | `/how-much-youtube-pays-per-view.html` |
| YouTube RPM by Country | `/youtube-rpm-by-country.html` |
| YouTube Calculator per Million Views | `/youtube-money-calculator-per-million-views.html` |

### New Pillar Pages (11 pages × 4 languages = 44 files)

| Pillar | URL slug | Tool/Calculator inside |
|---|---|---|
| YouTube CPM Calculator | `youtube-cpm-calculator.html` | CPM ↔ RPM ↔ Revenue converter |
| YouTube Channel Earnings Calculator | `youtube-channel-earnings-calculator.html` | Subs + upload freq → monthly estimate |
| YouTube Views to Money Converter | `youtube-views-to-money.html` | Views → $ range by niche |
| YouTube Niche RPM Calculator | `youtube-niche-rpm-calculator.html` | Niche selector → RPM range + revenue |
| YouTube Earnings Milestones | `youtube-earnings-milestones.html` | Goal setter → views/subs needed |
| YouTube Monetization Requirements Calculator | `youtube-monetization-calculator.html` | Watch hours + subs tracker |
| YouTube vs TikTok Earnings Comparison | `youtube-vs-tiktok-earnings.html` | Side-by-side calculator |
| YouTube Ad Revenue by Niche | `youtube-ad-revenue-by-niche.html` | Niche table + interactive filter |
| YouTube Income by Subscriber Count | `youtube-income-by-subscribers.html` | Subs → estimated monthly income |
| YouTube CPM by Country (deep dive) | `youtube-cpm-by-country.html` | Country picker → CPM range |
| YouTube Earnings Per Video Calculator | `youtube-earnings-per-video.html` | Per-video: length + views + niche → $ |

### Satellite Articles (50 articles × 4 languages = 200 files)

**Around CPM Calculator (5 articles)**
- `what-is-youtube-cpm.html`
- `youtube-cpm-by-niche-2025.html`
- `how-to-increase-youtube-cpm.html`
- `cpm-vs-rpm-youtube.html`
- `youtube-cpm-vs-adsense-cpm.html`

**Around Channel Earnings (5 articles)**
- `how-much-youtuber-100k-subscribers.html`
- `youtube-earnings-1-million-subscribers.html`
- `how-long-to-make-1000-on-youtube.html`
- `youtube-income-small-channels.html`
- `youtube-passive-income-guide.html`

**Around Views to Money (5 articles)**
- `1-million-youtube-views-worth.html`
- `youtube-earnings-gaming-channels.html`
- `how-many-views-to-make-living-youtube.html`
- `youtube-viral-video-earnings.html`
- `10k-100k-1m-views-earnings-comparison.html`

**Around Niche RPM (5 articles)**
- `gaming-youtube-rpm.html`
- `finance-youtube-rpm.html`
- `tech-youtube-rpm.html`
- `beauty-youtube-rpm.html`
- `best-youtube-niches-high-rpm.html`

**Around Earnings Milestones (5 articles)**
- `youtube-partner-program-requirements-2025.html`
- `first-youtube-paycheck.html`
- `youtube-1k-10k-100k-views-earnings.html`
- `how-fast-monetize-youtube.html`
- `youtube-100-dollar-threshold.html`

**Around Monetization Calculator (5 articles)**
- `youtube-monetization-complete-guide-2025.html`
- `how-to-enable-youtube-monetization.html`
- `youtube-watch-hours-calculator.html`
- `youtube-monetization-rules-policies.html`
- `how-long-reach-4000-watch-hours.html`

**Around YouTube vs TikTok (4 articles)**
- `youtube-vs-tiktok-which-pays-more.html`
- `tiktok-creator-fund-vs-youtube-adsense.html`
- `best-platform-new-creators-2025.html`
- `youtube-shorts-vs-tiktok-earnings-per-view.html`

**Around Ad Revenue by Niche (4 articles)**
- `highest-paying-youtube-niches-2025.html`
- `kids-content-youtube-rpm.html`
- `faceless-youtube-channel-earnings.html`
- `youtube-automation-channel-revenue.html`

**Around Income by Subscribers (4 articles)**
- `what-does-10k-sub-youtuber-earn.html`
- `how-much-does-mrbeast-make.html`
- `youtube-vs-patreon-revenue.html`
- `subscriber-count-doesnt-pay-views-do.html`

**Around CPM by Country (4 articles)**
- `why-us-audience-pays-more-youtube.html`
- `highest-cpm-countries-youtube.html`
- `how-to-target-high-cpm-countries-youtube.html`
- `youtube-cpm-india-vs-usa.html`

**Around Earnings Per Video (4 articles)**
- `how-much-10-minute-youtube-video-earn.html`
- `youtube-video-length-and-revenue.html`
- `how-many-ads-per-video-maximize-revenue.html`
- `youtube-average-video-earnings-by-category.html`

### Backlink Bait Pages (6 pages × 4 languages = 24 files)

| Page | URL | Why it earns links |
|---|---|---|
| YouTube RPM Data 2025 | `youtube-rpm-data-2025.html` | Original data tables — bloggers cite this |
| Free Embeddable Earnings Widget | `youtube-earnings-widget.html` | Other sites embed it → backlink |
| YouTube Monetization Glossary | `youtube-glossary.html` | LLMs + Wikipedia-style reference |
| Niche RPM Comparison Chart | `youtube-niche-rpm-chart.html` | Visual data → screenshot shares |
| YouTube Monetization Timeline | `youtube-monetization-timeline.html` | "When will I earn?" — shareable |
| YouTube Earnings by Country Map | `youtube-country-earnings-map.html` | Interactive map → embed + share |

### Blog Index Page
- `blog/index.html` — lists all satellite articles, grouped by pillar, in all 4 languages

---

## Section 3 — AdSense Integration

### 3 slots per page

**Slot 1 — Hero Banner** (all pages)
```html
<div class="ad-slot ad-banner">
  <ins class="adsbygoogle" style="display:block" 
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto" data-full-width-responsive="true"></ins>
</div>
```
Position: between hero section and calculator section. Highest CTR zone.

**Slot 2 — Rectangle After Results** (pillar/calculator pages)
```html
<div class="ad-slot ad-rectangle">
  <ins class="adsbygoogle" style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="rectangle"></ins>
</div>
```
Position: immediately after the calculator result box.

**Slot 3 — Article Bottom Banner** (satellite pages only)
```html
<div class="ad-slot ad-article">
  <ins class="adsbygoogle" style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto" data-full-width-responsive="true"></ins>
</div>
```
Position: after main article content, before "Related articles" section.

### CSS for ad slots
```css
.ad-slot { 
  text-align: center; 
  padding: 12px 0;
  min-height: 90px; /* prevent layout shift */
}
```

### Publisher ID placeholder
Use `ca-pub-XXXXXXXXXXXXXXXX` as placeholder throughout all files. User replaces with real ID when AdSense approved. Custom domain required for approval.

---

## Section 4 — Internal Linking

### Rule 1: Satellite → Pillar
Every satellite article includes a "Related Tool" card near the top:
```html
<div class="related-tool-card">
  <span class="tool-icon">🧮</span>
  <div>
    <div class="tool-label">Related Calculator</div>
    <a href="/youtube-cpm-calculator.html">YouTube CPM Calculator →</a>
  </div>
</div>
```

### Rule 2: Pillar → Adjacent Pillars
Each pillar page ends with a "Related Calculators" section (3-4 links max):
```html
<section class="related-calculators">
  <h2>More YouTube Earnings Tools</h2>
  <div class="article-grid">
    <!-- 3-4 sibling pillar cards -->
  </div>
</section>
```

### Rule 3: Homepage → All Pillars
The index page gets a new "All YouTube Earnings Tools" section listing all 17 pillar pages in a grid. This concentrates PageRank from the strongest page across the entire site.

### Rule 4: Language consistency
Each page has `hreflang` alternates pointing to its equivalents in all 4 languages.

---

## Section 5 — Technical Updates

### Sitemap
- Add all new pages to `sitemap.xml`
- Update `lastmod` dates
- Re-submit in Google Search Console after deployment

### robots.txt
- No changes needed. Currently allows all crawling.

### `_headers` (Cloudflare Pages)
- Already correct for sitemap `Content-Type`
- No changes needed

### `.gitignore`
- Add `.superpowers/` to avoid committing brainstorm files

---

## File Count Summary

| Category | EN files | × 4 langs | Total |
|---|---|---|---|
| Existing pages (update) | 6 | 24 | 24 |
| New pillar pages | 11 | 44 | 44 |
| Satellite articles | 50 | 200 | 200 |
| Backlink bait | 6 | 24 | 24 |
| Blog index | 1 | 4 | 4 |
| **Total new files** | **68** | **272** | **272** |

Plus updates to: `style.css`, `sitemap.xml`, `.gitignore`, all 24 existing EN+FR+ES+PT pages (design refresh)

---

## Success Metrics

- Average position: 34.2 → target < 10 on top 20 keywords within 3 months
- Impressions: 5.38k/month → target 50k+/month within 3 months
- Clicks: 11/3 months → target 500+/month
- Indexed pages: 4 → target 200+
- AdSense approved: requires custom domain first
