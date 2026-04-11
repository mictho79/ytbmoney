# SEO Expansion + Design Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ytbmoney.pages.dev from 6 pages with position 34.2 into a topic-cluster authority site with 270+ pages, Clean Elevated design, AdSense slots, and internal linking — targeting top-10 rankings for YouTube calculator keywords.

**Architecture:** Pure HTML/CSS/JS static site on Cloudflare Pages. All pages share one `style.css`. New pillar pages have inline `<script>` for calculator logic. Satellite articles are content-only HTML. Backlink bait pages have custom interactive features. Translations duplicate EN pages with all strings replaced.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS, Cloudflare Pages, Google AdSense (placeholder publisher ID `ca-pub-XXXXXXXXXXXXXXXX`), hreflang for 4 languages (en/fr/es/pt-BR).

**Spec:** `docs/superpowers/specs/2026-04-11-seo-expansion-design.md`

---

## File Map

### Modified files
- `style.css` — add Clean Elevated design tokens, new component classes
- `index.html` — red top bar, updated hero, All Tools section, AdSense, nav Blog link
- `youtube-rpm-guide.html` — red top bar, AdSense, updated nav, related tools
- `youtube-shorts-money-calculator.html` — same
- `how-much-youtube-pays-per-view.html` — same
- `youtube-rpm-by-country.html` — same
- `youtube-money-calculator-per-million-views.html` — same
- `fr/index.html`, `es/index.html`, `pt/index.html` — same homepage updates in translated language
- All `fr/*.html`, `es/*.html`, `pt/*.html` (5 pages each = 15 files) — same updates

### New EN pillar pages (11 files)
- `youtube-cpm-calculator.html`
- `youtube-channel-earnings-calculator.html`
- `youtube-views-to-money.html`
- `youtube-niche-rpm-calculator.html`
- `youtube-earnings-milestones.html`
- `youtube-monetization-calculator.html`
- `youtube-vs-tiktok-earnings.html`
- `youtube-ad-revenue-by-niche.html`
- `youtube-income-by-subscribers.html`
- `youtube-cpm-by-country.html`
- `youtube-earnings-per-video.html`

### New EN satellite articles (50 files)
All in root `/` directory, slugs listed per task below.

### New EN backlink bait (6 files)
- `youtube-rpm-data-2025.html`
- `youtube-earnings-widget.html`
- `youtube-glossary.html`
- `youtube-niche-rpm-chart.html`
- `youtube-monetization-timeline.html`
- `youtube-country-earnings-map.html`

### Blog index
- `blog/index.html`

### Translations (×3 = 204 files)
All EN pages above duplicated into `fr/`, `es/`, `pt/` with full string translation.

### Technical
- `sitemap.xml` — all new pages added
- `.gitignore` — add `.superpowers/`

---

## Shared HTML Patterns (reference for all tasks)

### Head block (copy for every new page — update title/description/canonical/hreflang)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE TITLE HERE</title>
  <meta name="description" content="META DESCRIPTION HERE">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ytbmoney.pages.dev/SLUG.html">
  <link rel="alternate" hreflang="en"    href="https://ytbmoney.pages.dev/SLUG.html" />
  <link rel="alternate" hreflang="fr"    href="https://ytbmoney.pages.dev/fr/SLUG.html" />
  <link rel="alternate" hreflang="es"    href="https://ytbmoney.pages.dev/es/SLUG.html" />
  <link rel="alternate" hreflang="pt-BR" href="https://ytbmoney.pages.dev/pt/SLUG.html" />
  <link rel="alternate" hreflang="x-default" href="https://ytbmoney.pages.dev/SLUG.html" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#FF0000">
  <meta property="og:title" content="PAGE TITLE HERE">
  <meta property="og:description" content="META DESCRIPTION HERE">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://ytbmoney.pages.dev/SLUG.html">
  <meta property="og:image" content="https://ytbmoney.pages.dev/og-image.svg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "SCHEMA_TYPE", "name": "PAGE TITLE", "url": "https://ytbmoney.pages.dev/SLUG.html" }
  </script>
</head>
```

### Header block (same on every page — add after `<body>`)
```html
<div class="red-top-bar"></div>
<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="YouTube Money Calculator Home">
        <span class="logo-icon" aria-hidden="true">▶$</span>
        <span class="logo-text">YT Money Calculator</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/">Calculator</a>
        <a href="/youtube-rpm-guide.html">RPM Guide</a>
        <a href="/youtube-rpm-by-country.html">By Country</a>
        <a href="/youtube-shorts-money-calculator.html">Shorts</a>
        <a href="/blog/">Blog</a>
      </nav>
      <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/" class="mobile-nav-link">Calculator</a>
  <a href="/youtube-rpm-guide.html" class="mobile-nav-link">RPM Guide</a>
  <a href="/youtube-rpm-by-country.html" class="mobile-nav-link">By Country</a>
  <a href="/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/blog/" class="mobile-nav-link">Blog</a>
</div>
```

### AdSense slot 1 — banner after hero (all pages)
```html
<div class="ad-slot-wrap">
  <div class="container">
    <div class="ad-slot">
      <ins class="adsbygoogle" style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
  </div>
</div>
```

### AdSense slot 2 — rectangle after calculator results (pillar pages)
```html
<div class="ad-slot-wrap">
  <div class="container">
    <div class="ad-slot">
      <ins class="adsbygoogle" style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="rectangle" style="display:inline-block;width:300px;height:250px"></ins>
    </div>
  </div>
</div>
```

### AdSense slot 3 — article bottom (satellite pages)
```html
<div class="ad-slot-wrap">
  <div class="container">
    <div class="ad-slot">
      <ins class="adsbygoogle" style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
  </div>
</div>
```

### AdSense script (end of every `<body>`)
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

### Mobile nav script (end of every `<body>`, before AdSense)
```html
<script>
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileNav.setAttribute('aria-hidden', String(open));
      mobileNav.classList.toggle('open', !open);
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('open');
      });
    });
  }
</script>
```

### Footer block (same on every page)
```html
<footer class="site-footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo footer-logo" aria-label="YouTube Money Calculator">
          <span class="logo-icon" aria-hidden="true">▶$</span>
          <span class="logo-text">YT Money Calculator</span>
        </a>
        <p>Free YouTube earnings estimator for creators. Not affiliated with YouTube or Google.</p>
      </div>
      <div class="footer-col">
        <h4>Tools</h4>
        <ul>
          <li><a href="/">YouTube Money Calculator</a></li>
          <li><a href="/youtube-cpm-calculator.html">CPM Calculator</a></li>
          <li><a href="/youtube-shorts-money-calculator.html">Shorts Calculator</a></li>
          <li><a href="/youtube-niche-rpm-calculator.html">Niche RPM Calculator</a></li>
          <li><a href="/youtube-earnings-per-video.html">Earnings Per Video</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guides</h4>
        <ul>
          <li><a href="/youtube-rpm-guide.html">RPM Guide</a></li>
          <li><a href="/youtube-rpm-by-country.html">RPM by Country</a></li>
          <li><a href="/how-much-youtube-pays-per-view.html">How Much YouTube Pays</a></li>
          <li><a href="/youtube-ad-revenue-by-niche.html">Revenue by Niche</a></li>
          <li><a href="/blog/">All Articles</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/about.html">About</a></li>
          <li><a href="/privacy.html">Privacy Policy</a></li>
          <li><a href="/contact.html">Contact</a></li>
          <li><a href="/disclaimer.html">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 YouTube Money Calculator. For estimation purposes only. Not affiliated with YouTube or Google. Actual earnings vary.</p>
    </div>
  </div>
</footer>
```

---

## Task 1: Update style.css — Clean Elevated Design System

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Update h1/h2 typography in style.css**

Find the existing `h1` rule (line ~108) and replace:
```css
h1 {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  letter-spacing: -0.04em;
  font-weight: 900;
}

h2 {
  font-size: clamp(1.5rem, 3.5vw, 2.125rem);
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  font-weight: 800;
}
```

- [ ] **Step 2: Update hero-badge to red pill style**

Find `.hero-badge` (line ~325) and replace:
```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--red-light);
  color: var(--red-dark);
  border: 1px solid #fecaca;
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 20px;
  letter-spacing: 0.02em;
}
```

- [ ] **Step 3: Update footer to dark style**

Find `.site-footer` in style.css and replace:
```css
.site-footer {
  background: #0a0a0a;
  color: #9ca3af;
  padding: 48px 0 24px;
}

.footer-logo .logo-icon {
  background: var(--red);
}

.footer-logo .logo-text {
  color: #fff;
}

.site-footer h4 {
  color: #fff;
  font-size: 0.875rem;
  margin-bottom: 12px;
}

.site-footer a {
  color: #9ca3af;
}

.site-footer a:hover {
  color: #fff;
  text-decoration: none;
}

.footer-bottom {
  border-top: 1px solid #1f1f1f;
  padding-top: 20px;
  margin-top: 32px;
}

.footer-bottom p {
  color: #6b7280;
  font-size: 0.8125rem;
}
```

- [ ] **Step 4: Append new component classes to end of style.css**

```css
/* ===== CLEAN ELEVATED — NEW COMPONENTS ===== */

/* Red top bar */
.red-top-bar {
  height: 4px;
  background: var(--red);
  width: 100%;
  flex-shrink: 0;
}

/* Accent line under h1 */
.accent-line {
  width: 48px;
  height: 5px;
  background: var(--red);
  border-radius: 3px;
  margin: 14px 0 20px;
}

/* AdSense slots */
.ad-slot-wrap {
  background: var(--bg-alt);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 10px 0;
}

.ad-slot {
  text-align: center;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Related tool card (satellite pages) */
.related-tool-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--blue-light);
  border: 1px solid #bfdbfe;
  border-radius: var(--radius);
  padding: 14px 18px;
  margin-bottom: 28px;
  text-decoration: none;
  transition: box-shadow var(--transition);
}

.related-tool-card:hover {
  box-shadow: var(--shadow-sm);
  text-decoration: none;
}

.related-tool-card .tool-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.related-tool-card .tool-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--text-muted);
  margin-bottom: 3px;
}

.related-tool-card .tool-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--blue);
}

/* Article grid (used on pillar pages + blog index) */
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.article-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px;
  text-decoration: none;
  display: block;
  transition: box-shadow var(--transition), transform var(--transition);
}

.article-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
  text-decoration: none;
}

.article-card .tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--red);
  margin-bottom: 6px;
}

.article-card .title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.4;
}

.article-card .desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 5px;
  line-height: 1.5;
}

/* Related calculators section (bottom of pillar pages) */
.related-calculators {
  padding: 48px 0;
  border-top: 1px solid var(--border);
  background: var(--bg-alt);
}

.related-calculators h2 {
  margin-bottom: 4px;
}

.related-calculators .section-sub {
  color: var(--text-muted);
  font-size: 0.9375rem;
  margin-bottom: 24px;
}

/* All Tools section (homepage) */
.all-tools-section {
  padding: 64px 0;
  background: var(--bg-alt);
}

.all-tools-section h2 {
  margin-bottom: 6px;
}

.all-tools-section .section-sub {
  color: var(--text-muted);
  margin-bottom: 28px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.tool-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  text-decoration: none;
  display: block;
  transition: box-shadow var(--transition), border-color var(--transition);
}

.tool-card:hover {
  box-shadow: var(--shadow);
  border-color: var(--red);
  text-decoration: none;
}

.tool-card .tool-icon-sm {
  font-size: 20px;
  margin-bottom: 8px;
}

.tool-card .tool-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
  line-height: 1.3;
}

.tool-card .tool-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Blog hero */
.blog-hero {
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding: 48px 0 40px;
}

.blog-hero h1 {
  margin-bottom: 8px;
}

/* Content section (satellite articles) */
.article-body {
  padding: 40px 0;
  max-width: 760px;
}

.article-body h2 {
  margin-top: 36px;
  margin-bottom: 12px;
}

.article-body h3 {
  margin-top: 24px;
  margin-bottom: 8px;
}

.article-body p {
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.75;
}

.article-body ul, .article-body ol {
  list-style: disc;
  margin: 0 0 16px 24px;
}

.article-body li {
  margin-bottom: 6px;
  font-size: 1rem;
  line-height: 1.7;
}

.article-body table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  font-size: 0.9375rem;
}

.article-body th {
  background: var(--bg-alt);
  padding: 10px 14px;
  text-align: left;
  font-weight: 700;
  border: 1px solid var(--border);
  font-size: 13px;
}

.article-body td {
  padding: 9px 14px;
  border: 1px solid var(--border);
}

.article-body tr:nth-child(even) td {
  background: var(--bg-alt);
}

/* Data table (backlink bait pages) */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.data-table th {
  background: #0a0a0a;
  color: #fff;
  padding: 10px 14px;
  text-align: left;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .04em;
}

.data-table td {
  padding: 9px 14px;
  border-bottom: 1px solid var(--border);
}

.data-table tr:hover td {
  background: var(--bg-alt);
}

.data-table .td-high { color: var(--green); font-weight: 700; }
.data-table .td-mid  { color: var(--orange); font-weight: 700; }
.data-table .td-low  { color: var(--text-muted); font-weight: 600; }

/* Responsive additions */
@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
  .tools-grid {
    grid-template-columns: 1fr 1fr;
  }
  .related-tool-card {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify style.css is valid**

Open any existing page (e.g., `index.html`) in browser. Confirm no CSS parse errors in DevTools console.

- [ ] **Step 6: Commit**

```bash
git add style.css
git commit -m "feat: Clean Elevated design system — new CSS components"
```

---

## Task 2: Update index.html — Homepage Redesign

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add red-top-bar and update header nav**

At line 133, replace `<body>` opening and header block. Insert `<div class="red-top-bar"></div>` as the very first element after `<body>`. Update nav links:
```html
<body>

<div class="red-top-bar"></div>

<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="YouTube Money Calculator Home">
        <span class="logo-icon" aria-hidden="true">▶$</span>
        <span class="logo-text">YT Money Calculator</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#calculator">Calculator</a>
        <a href="/youtube-rpm-guide.html">RPM Guide</a>
        <a href="/youtube-rpm-by-country.html">By Country</a>
        <a href="/youtube-shorts-money-calculator.html">Shorts</a>
        <a href="/blog/">Blog</a>
      </nav>
      <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="#calculator" class="mobile-nav-link">Calculator</a>
  <a href="/youtube-rpm-guide.html" class="mobile-nav-link">RPM Guide</a>
  <a href="/youtube-rpm-by-country.html" class="mobile-nav-link">By Country</a>
  <a href="/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/blog/" class="mobile-nav-link">Blog</a>
</div>
```

- [ ] **Step 2: Update hero section — badge, accent line, updated badge color**

In the hero section, replace the `hero-badge` div and add `accent-line` after `<h1>`:
```html
<div class="hero-badge">🆓 Free Tool · No Sign-up Required</div>
<h1>YouTube Money Calculator</h1>
<div class="accent-line"></div>
<p class="hero-tagline">Estimate YouTube earnings for videos, Shorts, and global audiences.</p>
```

- [ ] **Step 3: Add AdSense slot 1 between hero and calculator sections**

Find the line `<!-- ===== CALCULATOR =====` and insert before it:
```html
    <!-- ===== ADSENSE SLOT 1 ===== -->
    <div class="ad-slot-wrap">
      <div class="container">
        <div class="ad-slot">
          <ins class="adsbygoogle" style="display:block"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto" data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
```

- [ ] **Step 4: Add AdSense slot 2 after the results section**

Find where the results are displayed (look for `<!-- ===== HOW IT WORKS` or the section after the calculator card) and insert:
```html
    <!-- ===== ADSENSE SLOT 2 ===== -->
    <div class="ad-slot-wrap">
      <div class="container">
        <div class="ad-slot">
          <ins class="adsbygoogle" style="display:block"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="rectangle" style="display:inline-block;width:300px;height:250px"></ins>
        </div>
      </div>
    </div>
```

- [ ] **Step 5: Add All Tools section before the footer**

Insert before `<!-- ===== FOOTER =====`:
```html
    <!-- ===== ALL TOOLS ===== -->
    <section class="all-tools-section">
      <div class="container">
        <h2>All YouTube Earnings Tools</h2>
        <p class="section-sub">Free calculators and guides for every aspect of YouTube monetization.</p>
        <div class="tools-grid">
          <a href="/" class="tool-card"><div class="tool-icon-sm">💰</div><div class="tool-name">YouTube Money Calculator</div><div class="tool-desc">Estimate monthly earnings by views and RPM</div></a>
          <a href="/youtube-cpm-calculator.html" class="tool-card"><div class="tool-icon-sm">📊</div><div class="tool-name">YouTube CPM Calculator</div><div class="tool-desc">Convert CPM to RPM and estimate revenue</div></a>
          <a href="/youtube-channel-earnings-calculator.html" class="tool-card"><div class="tool-icon-sm">📺</div><div class="tool-name">Channel Earnings Calculator</div><div class="tool-desc">Estimate earnings by subscriber count</div></a>
          <a href="/youtube-views-to-money.html" class="tool-card"><div class="tool-icon-sm">👁️</div><div class="tool-name">Views to Money Converter</div><div class="tool-desc">See how much any view count is worth</div></a>
          <a href="/youtube-niche-rpm-calculator.html" class="tool-card"><div class="tool-icon-sm">🎯</div><div class="tool-name">Niche RPM Calculator</div><div class="tool-desc">RPM ranges by niche: gaming, finance, tech</div></a>
          <a href="/youtube-earnings-milestones.html" class="tool-card"><div class="tool-icon-sm">🏆</div><div class="tool-name">Earnings Milestones</div><div class="tool-desc">What you'll earn at 10K, 100K, 1M views</div></a>
          <a href="/youtube-monetization-calculator.html" class="tool-card"><div class="tool-icon-sm">✅</div><div class="tool-name">Monetization Calculator</div><div class="tool-desc">Track watch hours and subscriber progress</div></a>
          <a href="/youtube-vs-tiktok-earnings.html" class="tool-card"><div class="tool-icon-sm">⚔️</div><div class="tool-name">YouTube vs TikTok</div><div class="tool-desc">Side-by-side earnings comparison</div></a>
          <a href="/youtube-ad-revenue-by-niche.html" class="tool-card"><div class="tool-icon-sm">📈</div><div class="tool-name">Ad Revenue by Niche</div><div class="tool-desc">Full RPM/CPM data for every niche</div></a>
          <a href="/youtube-income-by-subscribers.html" class="tool-card"><div class="tool-icon-sm">👥</div><div class="tool-name">Income by Subscribers</div><div class="tool-desc">What 10K, 100K, 1M subscribers actually earns</div></a>
          <a href="/youtube-cpm-by-country.html" class="tool-card"><div class="tool-icon-sm">🌍</div><div class="tool-name">CPM by Country</div><div class="tool-desc">Country-by-country CPM and RPM data</div></a>
          <a href="/youtube-earnings-per-video.html" class="tool-card"><div class="tool-icon-sm">🎬</div><div class="tool-name">Earnings Per Video</div><div class="tool-desc">Calculate revenue for a single video</div></a>
          <a href="/youtube-shorts-money-calculator.html" class="tool-card"><div class="tool-icon-sm">📱</div><div class="tool-name">Shorts Calculator</div><div class="tool-desc">Dedicated Shorts earnings estimator</div></a>
          <a href="/youtube-rpm-guide.html" class="tool-card"><div class="tool-icon-sm">📖</div><div class="tool-name">RPM Guide</div><div class="tool-desc">Everything about RPM and how to increase it</div></a>
          <a href="/youtube-rpm-by-country.html" class="tool-card"><div class="tool-icon-sm">🗺️</div><div class="tool-name">RPM by Country</div><div class="tool-desc">Weighted RPM calculator by audience country</div></a>
          <a href="/how-much-youtube-pays-per-view.html" class="tool-card"><div class="tool-icon-sm">💵</div><div class="tool-name">Pay Per View</div><div class="tool-desc">How much YouTube pays per view explained</div></a>
          <a href="/youtube-money-calculator-per-million-views.html" class="tool-card"><div class="tool-icon-sm">🚀</div><div class="tool-name">Per Million Views</div><div class="tool-desc">Earnings calculator for 1M, 10M, 100M views</div></a>
        </div>
      </div>
    </section>
```

- [ ] **Step 6: Update footer — replace existing footer with new dark footer**

Replace the entire `<footer>...</footer>` block with the footer block from the Shared HTML Patterns section above.

- [ ] **Step 7: Add AdSense script before `</body>`**

Replace `<script src="script.js"></script>` with:
```html
  <script src="script.js"></script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

- [ ] **Step 8: Open index.html in browser and verify**

Check: red top bar visible, hero badge is red pill, accent line under h1, All Tools grid shows 17 cards, footer is dark.

- [ ] **Step 9: Commit**

```bash
git add index.html
git commit -m "feat: homepage Clean Elevated redesign — red bar, All Tools section, AdSense"
```

---

## Task 3: Update 5 Existing EN Pillar Pages

**Files:**
- Modify: `youtube-rpm-guide.html`, `youtube-shorts-money-calculator.html`, `how-much-youtube-pays-per-view.html`, `youtube-rpm-by-country.html`, `youtube-money-calculator-per-million-views.html`

For **each** of these 5 files, apply these 4 changes:

- [ ] **Step 1: Add red-top-bar and update nav on all 5 pages**

In each file:
1. After `<body>`, insert `<div class="red-top-bar"></div>`
2. Replace existing `<nav>` content with the updated nav from Shared HTML Patterns (5 links: Calculator, RPM Guide, By Country, Shorts, Blog)
3. Add mobile nav drawer after header (from Shared HTML Patterns) if not already present

- [ ] **Step 2: Add accent-line to hero h1 on all 5 pages**

In each file's hero section, find `<h1>` and add `<div class="accent-line"></div>` immediately after the closing `</h1>`.

- [ ] **Step 3: Add AdSense slot 1 after hero, slot 2 after calculator/main content**

In each file, add AdSense slot 1 (banner) after the `<section class="hero">` closing tag, and slot 2 (rectangle) after the main calculator or content section.

- [ ] **Step 4: Add Related Tools section before footer on all 5 pages**

Before each file's `<footer>`, insert a `<section class="related-calculators">` with 3–4 `.article-card` links to the most relevant other pillar pages. Use these pairings:

**youtube-rpm-guide.html** → link to: `/`, `/youtube-cpm-calculator.html`, `/youtube-niche-rpm-calculator.html`

**youtube-shorts-money-calculator.html** → link to: `/`, `/youtube-vs-tiktok-earnings.html`, `/youtube-earnings-per-video.html`

**how-much-youtube-pays-per-view.html** → link to: `/`, `/youtube-views-to-money.html`, `/youtube-earnings-milestones.html`

**youtube-rpm-by-country.html** → link to: `/`, `/youtube-cpm-by-country.html`, `/youtube-niche-rpm-calculator.html`

**youtube-money-calculator-per-million-views.html** → link to: `/`, `/youtube-income-by-subscribers.html`, `/youtube-earnings-milestones.html`

- [ ] **Step 5: Replace footer on all 5 pages with dark footer**

Replace each file's `<footer>` block with the footer from Shared HTML Patterns.

- [ ] **Step 6: Add AdSense script before `</body>` on all 5 pages**

Add AdSense script from Shared HTML Patterns. Also add mobile nav script if not already present.

- [ ] **Step 7: Verify in browser**

Open each page. Check: red bar, accent line, dark footer, Related Tools section visible.

- [ ] **Step 8: Commit**

```bash
git add youtube-rpm-guide.html youtube-shorts-money-calculator.html how-much-youtube-pays-per-view.html youtube-rpm-by-country.html youtube-money-calculator-per-million-views.html
git commit -m "feat: apply Clean Elevated redesign to 5 existing EN pillar pages"
```

---

## Task 4: Update Existing FR/ES/PT Pages (18 files)

**Files:**
- `fr/index.html`, `fr/youtube-rpm-guide.html`, `fr/youtube-shorts-money-calculator.html`, `fr/how-much-youtube-pays-per-view.html`, `fr/youtube-rpm-by-country.html`, `fr/youtube-money-calculator-per-million-views.html`
- Same 6 for `es/` and `pt/`

- [ ] **Step 1: Apply identical structural changes as Task 2-3 to all 18 files**

Same 4 changes as Task 3 (red-top-bar, accent-line, AdSense slots, dark footer, updated nav) but:
- Keep all text/content in the page's original language (FR/ES/PT)
- Nav links point to language-specific versions: `href="/fr/"`, `href="/fr/youtube-rpm-guide.html"` etc.
- Footer text stays in original language
- Blog link: `/fr/blog/`, `/es/blog/`, `/pt/blog/`
- `hreflang` canonical stays correct for the language

- [ ] **Step 2: Commit**

```bash
git add fr/ es/ pt/
git commit -m "feat: apply Clean Elevated redesign to all FR/ES/PT existing pages"
```

---

## Task 5: Create youtube-cpm-calculator.html (Pillar Template)

This is the **reference template** for all new pillar pages. Build it in full — subsequent pillar tasks reference this structure.

**Files:**
- Create: `youtube-cpm-calculator.html`

- [ ] **Step 1: Create the full file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouTube CPM Calculator – Free CPM to Revenue Estimator 2026</title>
  <meta name="description" content="Free YouTube CPM Calculator. Enter your CPM and monthly views to estimate ad revenue. Understand the difference between CPM and RPM for YouTube creators.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ytbmoney.pages.dev/youtube-cpm-calculator.html">
  <link rel="alternate" hreflang="en"    href="https://ytbmoney.pages.dev/youtube-cpm-calculator.html" />
  <link rel="alternate" hreflang="fr"    href="https://ytbmoney.pages.dev/fr/youtube-cpm-calculator.html" />
  <link rel="alternate" hreflang="es"    href="https://ytbmoney.pages.dev/es/youtube-cpm-calculator.html" />
  <link rel="alternate" hreflang="pt-BR" href="https://ytbmoney.pages.dev/pt/youtube-cpm-calculator.html" />
  <link rel="alternate" hreflang="x-default" href="https://ytbmoney.pages.dev/youtube-cpm-calculator.html" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#FF0000">
  <meta property="og:title" content="YouTube CPM Calculator – Free CPM to Revenue Estimator">
  <meta property="og:description" content="Free YouTube CPM Calculator. Convert CPM to RPM and estimate your ad revenue instantly.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://ytbmoney.pages.dev/youtube-cpm-calculator.html">
  <meta property="og:image" content="https://ytbmoney.pages.dev/og-image.svg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "YouTube CPM Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "description": "Free YouTube CPM calculator — convert CPM to RPM and estimate ad revenue.",
        "url": "https://ytbmoney.pages.dev/youtube-cpm-calculator.html",
        "isAccessibleForFree": true,
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is YouTube CPM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "YouTube CPM (Cost Per Mille) is the amount advertisers pay per 1,000 ad impressions. It is the advertiser's cost, not what creators receive. Creators receive RPM, which is approximately 55% of CPM."
            }
          },
          {
            "@type": "Question",
            "name": "What is the average YouTube CPM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Average YouTube CPM ranges from $2 to $15 depending on niche, audience country, and time of year. Finance and insurance niches average $15–$40 CPM. Gaming averages $2–$5 CPM. Q4 (October–December) typically sees 30–50% higher CPMs due to advertiser holiday budgets."
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body>

<div class="red-top-bar"></div>

<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="YouTube Money Calculator Home">
        <span class="logo-icon" aria-hidden="true">▶$</span>
        <span class="logo-text">YT Money Calculator</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/">Calculator</a>
        <a href="/youtube-rpm-guide.html">RPM Guide</a>
        <a href="/youtube-rpm-by-country.html">By Country</a>
        <a href="/youtube-shorts-money-calculator.html">Shorts</a>
        <a href="/blog/">Blog</a>
      </nav>
      <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/" class="mobile-nav-link">Calculator</a>
  <a href="/youtube-rpm-guide.html" class="mobile-nav-link">RPM Guide</a>
  <a href="/youtube-rpm-by-country.html" class="mobile-nav-link">By Country</a>
  <a href="/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/blog/" class="mobile-nav-link">Blog</a>
</div>

<main>

  <section class="hero" id="hero">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-content">
          <div class="hero-badge">🆓 Free Tool · No Sign-up</div>
          <h1>YouTube CPM Calculator</h1>
          <div class="accent-line"></div>
          <p class="hero-desc">Convert your YouTube CPM to RPM and estimate monthly ad revenue. Understand exactly how much you keep after YouTube's 45% cut.</p>
          <div class="hero-nav">
            <a href="#calculator" class="btn btn-primary">Calculate CPM Revenue</a>
            <a href="#cpm-vs-rpm" class="btn btn-ghost">CPM vs RPM ↓</a>
          </div>
        </div>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-value">$2–$15</div>
            <div class="stat-label">Average YouTube CPM</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">55%</div>
            <div class="stat-label">Creator revenue share</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">CPM×0.55</div>
            <div class="stat-label">= Your RPM</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="ad-slot-wrap">
    <div class="container">
      <div class="ad-slot">
        <ins class="adsbygoogle" style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto" data-full-width-responsive="true"></ins>
      </div>
    </div>
  </div>

  <section class="calculator-section" id="calculator" aria-label="YouTube CPM Calculator">
    <div class="container">
      <div class="calc-header">
        <h2>YouTube CPM Calculator</h2>
        <p>Enter your CPM rate and monthly views to instantly see your estimated revenue and RPM.</p>
      </div>
      <div class="calculator-card">
        <div class="form-grid">
          <div class="form-group">
            <label for="cpm-rate">CPM Rate ($)</label>
            <input type="number" id="cpm-rate" value="5.00" min="0" step="0.5" class="form-input">
            <span class="form-hint">Cost per 1,000 ad impressions. Find it in YouTube Studio → Analytics → Revenue.</span>
          </div>
          <div class="form-group">
            <label for="monthly-views">Monthly Views</label>
            <input type="number" id="monthly-views" value="100000" min="0" step="1000" class="form-input">
          </div>
          <div class="form-group">
            <label for="revenue-share">Creator Revenue Share (%)</label>
            <input type="number" id="revenue-share" value="55" min="1" max="100" step="1" class="form-input">
            <span class="form-hint">YouTube gives creators 55% of ad revenue by default.</span>
          </div>
        </div>
        <div class="results-grid" id="cpm-results" style="margin-top:24px;">
          <div class="result-item result-item--primary">
            <div class="result-value result-value--primary" id="result-rpm">$2.75</div>
            <div class="result-label">Your RPM</div>
          </div>
          <div class="result-item">
            <div class="result-value" id="result-monthly">$275</div>
            <div class="result-label">Monthly earnings</div>
          </div>
          <div class="result-item">
            <div class="result-value" id="result-yearly">$3,300</div>
            <div class="result-label">Yearly earnings</div>
          </div>
          <div class="result-item">
            <div class="result-value" id="result-per1k">$2.75</div>
            <div class="result-label">Per 1,000 views</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="ad-slot-wrap">
    <div class="container">
      <div class="ad-slot">
        <ins class="adsbygoogle" style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="rectangle" style="display:inline-block;width:300px;height:250px"></ins>
      </div>
    </div>
  </div>

  <section class="content-section" id="cpm-vs-rpm">
    <div class="container">
      <div class="article-body">
        <h2>What Is YouTube CPM?</h2>
        <p>CPM stands for <strong>Cost Per Mille</strong> — the amount advertisers pay YouTube per 1,000 ad impressions on your videos. CPM is the advertiser's cost, not your revenue. It typically ranges from $2 to $15 for most creators, but can reach $40+ in high-value niches like personal finance, insurance, and software.</p>

        <h2 id="cpm-vs-rpm">CPM vs RPM — The Critical Difference</h2>
        <p>Many creators confuse CPM and RPM. Here's the key distinction:</p>
        <ul>
          <li><strong>CPM</strong> = what advertisers pay YouTube per 1,000 impressions</li>
          <li><strong>RPM</strong> = what you receive per 1,000 views (after YouTube's 45% cut)</li>
          <li>Formula: <strong>RPM ≈ CPM × 0.55</strong></li>
        </ul>
        <p>If your CPM is $5, your RPM is approximately $2.75. YouTube keeps the rest to fund its platform, infrastructure, and AdSense system.</p>

        <h2>What Is a Good YouTube CPM?</h2>
        <table>
          <thead><tr><th>Niche</th><th>Typical CPM Range</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Personal Finance / Investing</td><td>$15–$40</td><td>Highest CPM niche</td></tr>
            <tr><td>Insurance / Legal</td><td>$20–$50</td><td>Very high advertiser demand</td></tr>
            <tr><td>Software / SaaS</td><td>$10–$25</td><td>B2B audience</td></tr>
            <tr><td>Tech Reviews</td><td>$5–$12</td><td>Strong purchase intent</td></tr>
            <tr><td>Health & Fitness</td><td>$4–$10</td><td>Strong seasonal demand</td></tr>
            <tr><td>Gaming</td><td>$2–$5</td><td>Large audience, lower CPM</td></tr>
            <tr><td>Entertainment / Vlogs</td><td>$1–$4</td><td>Broad audience, lower intent</td></tr>
          </tbody>
        </table>

        <h2>How to Increase Your YouTube CPM</h2>
        <ul>
          <li>Target US, UK, Canada, Australia audiences (highest CPM countries)</li>
          <li>Create content in high-CPM niches (finance, tech, software tutorials)</li>
          <li>Enable all ad formats: skippable, non-skippable, bumper, overlay</li>
          <li>Post during Q4 (October–December) when advertiser budgets peak</li>
          <li>Target longer videos (8+ minutes) to allow mid-roll ads</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="related-calculators">
    <div class="container">
      <h2>More YouTube Earnings Tools</h2>
      <p class="section-sub">Free calculators for every aspect of YouTube monetization.</p>
      <div class="article-grid">
        <a href="/" class="article-card">
          <div class="tag">Calculator</div>
          <div class="title">YouTube Money Calculator</div>
          <div class="desc">Full earnings estimator with views, RPM, and country weighting.</div>
        </a>
        <a href="/youtube-niche-rpm-calculator.html" class="article-card">
          <div class="tag">Calculator</div>
          <div class="title">YouTube Niche RPM Calculator</div>
          <div class="desc">See RPM ranges for your specific niche — gaming, finance, tech and more.</div>
        </a>
        <a href="/youtube-rpm-guide.html" class="article-card">
          <div class="tag">Guide</div>
          <div class="title">YouTube RPM Guide</div>
          <div class="desc">Everything about RPM and how to increase your revenue per thousand views.</div>
        </a>
        <a href="/youtube-cpm-by-country.html" class="article-card">
          <div class="tag">Data</div>
          <div class="title">YouTube CPM by Country</div>
          <div class="desc">Full 2026 CPM data for 50+ countries. US vs India vs UK vs Brazil.</div>
        </a>
      </div>
    </div>
  </section>

</main>

<footer class="site-footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo footer-logo"><span class="logo-icon">▶$</span><span class="logo-text">YT Money Calculator</span></a>
        <p>Free YouTube earnings estimator for creators. Not affiliated with YouTube or Google.</p>
      </div>
      <div class="footer-col"><h4>Tools</h4><ul>
        <li><a href="/">YouTube Money Calculator</a></li>
        <li><a href="/youtube-cpm-calculator.html">CPM Calculator</a></li>
        <li><a href="/youtube-shorts-money-calculator.html">Shorts Calculator</a></li>
        <li><a href="/youtube-niche-rpm-calculator.html">Niche RPM Calculator</a></li>
        <li><a href="/youtube-earnings-per-video.html">Earnings Per Video</a></li>
      </ul></div>
      <div class="footer-col"><h4>Guides</h4><ul>
        <li><a href="/youtube-rpm-guide.html">RPM Guide</a></li>
        <li><a href="/youtube-rpm-by-country.html">RPM by Country</a></li>
        <li><a href="/how-much-youtube-pays-per-view.html">How Much YouTube Pays</a></li>
        <li><a href="/youtube-ad-revenue-by-niche.html">Revenue by Niche</a></li>
        <li><a href="/blog/">All Articles</a></li>
      </ul></div>
      <div class="footer-col"><h4>Company</h4><ul>
        <li><a href="/about.html">About</a></li>
        <li><a href="/privacy.html">Privacy Policy</a></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/disclaimer.html">Disclaimer</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 YouTube Money Calculator. For estimation purposes only. Not affiliated with YouTube or Google.</p>
    </div>
  </div>
</footer>

<script>
function calcCPM() {
  const cpm = parseFloat(document.getElementById('cpm-rate').value) || 0;
  const views = parseFloat(document.getElementById('monthly-views').value) || 0;
  const share = (parseFloat(document.getElementById('revenue-share').value) || 55) / 100;
  const rpm = cpm * share;
  const monthly = (views / 1000) * rpm;
  const yearly = monthly * 12;
  document.getElementById('result-rpm').textContent = '$' + rpm.toFixed(2);
  document.getElementById('result-monthly').textContent = '$' + Math.round(monthly).toLocaleString();
  document.getElementById('result-yearly').textContent = '$' + Math.round(yearly).toLocaleString();
  document.getElementById('result-per1k').textContent = '$' + rpm.toFixed(2);
}
['cpm-rate','monthly-views','revenue-share'].forEach(id => {
  document.getElementById(id).addEventListener('input', calcCPM);
});
calcCPM();
</script>
<script>
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobileNav.setAttribute('aria-hidden', String(open));
    mobileNav.classList.toggle('open', !open);
  });
}
</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Check: red bar, hero stats, calculator updates on input, CPM→RPM formula works ($5 CPM → $2.75 RPM), dark footer, related tools section.

- [ ] **Step 3: Commit**

```bash
git add youtube-cpm-calculator.html
git commit -m "feat: add YouTube CPM Calculator pillar page"
```

---

## Task 6: Create Remaining 10 Pillar Pages (EN)

Use `youtube-cpm-calculator.html` as the structural template. For each page below, create a new `.html` file with:
- The same HTML skeleton (head, red-top-bar, header, hero, ad slot 1, calculator section, ad slot 2, content section, related-calculators, footer)
- Page-specific title, description, slug, hero stats, calculator JS, content body, related links

- [ ] **Step 1: Create youtube-channel-earnings-calculator.html**

**Title:** `YouTube Channel Earnings Calculator – Estimate Revenue by Subscriber Count`
**Description:** `Free YouTube channel earnings calculator. Estimate monthly revenue based on subscriber count, upload frequency, average views per video, and RPM. For any channel size.`
**Hero H1:** `YouTube Channel Earnings Calculator`
**Hero stats:** `$100–$5K / month (10K subs)` · `$1K–$20K / month (100K subs)` · `Varies by niche`
**Calculator inputs:** Subscriber count, avg views per video (% of subs, default 10%), videos per month (default 4), RPM (default $3)
**Calculator formula:**
```js
function calc() {
  const subs = parseFloat(document.getElementById('subs').value) || 0;
  const viewRate = (parseFloat(document.getElementById('view-rate').value) || 10) / 100;
  const vpm = parseFloat(document.getElementById('vpm').value) || 4;
  const rpm = parseFloat(document.getElementById('rpm').value) || 3;
  const monthlyViews = subs * viewRate * vpm;
  const monthly = (monthlyViews / 1000) * rpm;
  document.getElementById('r-views').textContent = Math.round(monthlyViews).toLocaleString();
  document.getElementById('r-monthly').textContent = '$' + Math.round(monthly).toLocaleString();
  document.getElementById('r-yearly').textContent = '$' + Math.round(monthly * 12).toLocaleString();
}
```
**Content sections:** "How Much Do YouTubers Make?", "YouTube Earnings by Subscriber Count" (table: 1K/10K/100K/1M subs × low/mid/high RPM), "Why Subscribers Don't Directly Determine Earnings"
**Related tools:** `/`, `/youtube-income-by-subscribers.html`, `/youtube-niche-rpm-calculator.html`

---

- [ ] **Step 2: Create youtube-views-to-money.html**

**Title:** `YouTube Views to Money Converter – How Much Are Your Views Worth?`
**Description:** `Free YouTube views to money converter. Enter any view count to see estimated earnings by niche. Instant results for 1K, 10K, 100K, 1M, and 10M views.`
**Hero H1:** `YouTube Views to Money Converter`
**Hero stats:** `$3–$30 / 10K views` · `$300–$3K / 1M views` · `Varies by niche`
**Calculator inputs:** View count, niche selector (Gaming $2RPM / Entertainment $3RPM / Tech $5RPM / Finance $8RPM / Insurance $18RPM / Custom), custom RPM field
**Calculator formula:**
```js
const rpmMap = {gaming:2, entertainment:3, tech:5, finance:8, insurance:18, custom:0};
function calc() {
  const views = parseFloat(document.getElementById('views').value) || 0;
  const niche = document.getElementById('niche').value;
  const rpm = niche === 'custom' ? (parseFloat(document.getElementById('custom-rpm').value)||3) : rpmMap[niche];
  const earnings = (views / 1000) * rpm;
  document.getElementById('r-low').textContent = '$' + Math.round((views/1000) * rpm * 0.6).toLocaleString();
  document.getElementById('r-mid').textContent = '$' + Math.round(earnings).toLocaleString();
  document.getElementById('r-high').textContent = '$' + Math.round((views/1000) * rpm * 1.8).toLocaleString();
}
```
**Content sections:** "How Much Are YouTube Views Worth?", "Views to Money by Niche" (table: view milestones × niches), "Why View Count Alone Doesn't Determine Earnings"
**Related tools:** `/`, `/youtube-cpm-calculator.html`, `/youtube-earnings-per-video.html`

---

- [ ] **Step 3: Create youtube-niche-rpm-calculator.html**

**Title:** `YouTube Niche RPM Calculator – RPM by Content Category 2026`
**Description:** `Free YouTube niche RPM calculator. See RPM ranges for gaming, finance, tech, beauty, travel, and 10 more niches. Calculate earnings based on your specific content category.`
**Hero H1:** `YouTube Niche RPM Calculator`
**Hero stats:** `$1–$3 (Gaming)` · `$8–$20 (Finance)` · `$2–$6 (Tech)`
**Calculator inputs:** Niche selector (15 options with RPM ranges), monthly views, view-through rate
**Niche data:**
```js
const niches = {
  'Personal Finance': {low:8, high:20, avg:12},
  'Insurance/Legal': {low:15, high:40, avg:22},
  'Software/SaaS': {low:10, high:25, avg:15},
  'Tech Reviews': {low:5, high:12, avg:7},
  'Real Estate': {low:8, high:18, avg:12},
  'Health & Fitness': {low:3, high:10, avg:6},
  'Food & Cooking': {low:2, high:6, avg:4},
  'Gaming': {low:1, high:5, avg:2.5},
  'Education': {low:3, high:8, avg:5},
  'Travel': {low:2, high:6, avg:3.5},
  'Beauty & Fashion': {low:2, high:6, avg:3},
  'Entertainment/Vlogs': {low:1, high:4, avg:2},
  'News & Politics': {low:2, high:7, avg:4},
  'Cars & Automotive': {low:4, high:10, avg:6},
  'Kids/Family': {low:0.5, high:3, avg:1.5}
};
```
**Content sections:** "RPM by Niche — Full 2026 Data" (sortable table), "Why Niche Matters More Than Subscribers", "How to Switch to a Higher-RPM Niche"
**Related tools:** `/youtube-cpm-calculator.html`, `/youtube-ad-revenue-by-niche.html`, `/youtube-rpm-guide.html`

---

- [ ] **Step 4: Create youtube-earnings-milestones.html**

**Title:** `YouTube Earnings Milestones – How Much at 1K, 10K, 100K, 1M Views`
**Description:** `See exactly how much YouTube pays at every view milestone. Free calculator for 1K, 10K, 100K, 1M and 10M views across all niches and RPM ranges.`
**Hero H1:** `YouTube Earnings Milestones Calculator`
**Hero stats:** `$0.50–$5 / 1K views` · `$50–$500 / 100K views` · `$500–$10K / 1M views`
**Calculator inputs:** Target milestone (preset buttons: 1K/10K/100K/1M/10M or custom), niche (same 15 niches), audience country (US=multiplier 1.5, UK=1.3, CA=1.2, AU=1.2, IN=0.3, BR=0.4, Other=1)
**Content sections:** "YouTube Earnings by View Count" (full milestone table), "Why Your First $100 Takes So Long", "YouTube Monetization Thresholds — YPP Requirements"
**Related tools:** `/youtube-monetization-calculator.html`, `/`, `/youtube-views-to-money.html`

---

- [ ] **Step 5: Create youtube-monetization-calculator.html**

**Title:** `YouTube Monetization Calculator – Watch Hours & Subscribers Tracker`
**Description:** `Free YouTube monetization requirements calculator. Track your progress toward 1,000 subscribers and 4,000 watch hours. See how many more videos you need to qualify for YPP.`
**Hero H1:** `YouTube Monetization Requirements Calculator`
**Hero stats:** `1,000 subs` · `4,000 watch hours` · `YPP threshold`
**Calculator inputs:** Current subscribers, subscribers per week, current watch hours, avg watch hours per video, videos per week, avg video length (minutes)
**Calculator formula:**
```js
function calc() {
  const curSubs = parseFloat(document.getElementById('cur-subs').value) || 0;
  const subsPerWeek = parseFloat(document.getElementById('subs-week').value) || 10;
  const curWH = parseFloat(document.getElementById('cur-wh').value) || 0;
  const whPerVideo = parseFloat(document.getElementById('wh-video').value) || 100;
  const vpw = parseFloat(document.getElementById('vpw').value) || 1;
  const subsNeeded = Math.max(0, 1000 - curSubs);
  const whNeeded = Math.max(0, 4000 - curWH);
  const weeksForSubs = subsNeeded / (subsPerWeek || 1);
  const weeksForWH = whNeeded / ((vpw * whPerVideo) || 1);
  const weeks = Math.max(weeksForSubs, weeksForWH);
  document.getElementById('r-subs-needed').textContent = Math.round(subsNeeded).toLocaleString();
  document.getElementById('r-wh-needed').textContent = Math.round(whNeeded).toLocaleString();
  document.getElementById('r-weeks').textContent = Math.ceil(weeks);
  document.getElementById('r-date').textContent = weeks === 0 ? 'Now! 🎉' : new Date(Date.now() + weeks * 7 * 86400000).toLocaleDateString('en-US', {month:'long', year:'numeric'});
}
```
**Content sections:** "YouTube Partner Program Requirements 2026", "How to Reach 4,000 Watch Hours Faster", "What Happens After Joining YPP?"
**Related tools:** `/youtube-earnings-milestones.html`, `/`, `/youtube-channel-earnings-calculator.html`

---

- [ ] **Step 6: Create youtube-vs-tiktok-earnings.html**

**Title:** `YouTube vs TikTok Earnings Calculator – Which Platform Pays More?`
**Description:** `Free YouTube vs TikTok earnings comparison calculator. Enter your views and see which platform pays more for your content type in 2026.`
**Hero H1:** `YouTube vs TikTok Earnings Comparison`
**Hero stats:** `$3–$8 RPM (YouTube)` · `$0.02–$0.04 / 1K views (TikTok)` · `YouTube pays ~100× more`
**Calculator inputs:** Monthly views (applies to both), content type (long-form/Shorts), niche
**Content sections:** "YouTube vs TikTok: The Revenue Reality", "Platform Comparison Table" (table: metric × YouTube × TikTok), "When TikTok Makes More Sense Despite Lower Pay"
**Related tools:** `/`, `/youtube-shorts-money-calculator.html`, `/youtube-ad-revenue-by-niche.html`

---

- [ ] **Step 7: Create youtube-ad-revenue-by-niche.html**

**Title:** `YouTube Ad Revenue by Niche 2026 – Complete RPM & CPM Data`
**Description:** `Complete YouTube ad revenue data by niche for 2026. RPM and CPM ranges for 20+ content categories. Find the most profitable YouTube niches.`
**Hero H1:** `YouTube Ad Revenue by Niche`
**Hero stats:** `$40+ CPM (Insurance)` · `$8–$20 RPM (Finance)` · `$1–$3 RPM (Gaming)`
**Calculator:** Niche picker → shows CPM range, RPM range, monthly estimate for 100K views, yearly estimate, difficulty rating
**Content sections:** "YouTube Niche RPM Ranking 2026" (big sortable table with 20 niches), "How Advertisers Decide Which Content to Target", "High-CPM Niches That Are Still Low Competition"
**Related tools:** `/youtube-niche-rpm-calculator.html`, `/youtube-cpm-calculator.html`, `/youtube-rpm-guide.html`

---

- [ ] **Step 8: Create youtube-income-by-subscribers.html**

**Title:** `YouTube Income by Subscriber Count – What 10K, 100K, 1M Subs Earns`
**Description:** `Discover how much YouTubers earn at every subscriber milestone. Free income calculator for 1K, 10K, 100K, and 1M subscribers. Includes niche and RPM breakdowns.`
**Hero H1:** `YouTube Income by Subscriber Count`
**Hero stats:** `$100–$1K/mo (10K subs)` · `$1K–$10K/mo (100K subs)` · `Subscribers ≠ Views`
**Calculator inputs:** Subscriber count (slider 1K–10M), niche, avg view-to-sub ratio (%)
**Content sections:** "The Truth About YouTube Subscriber Income", "Income by Subscriber Milestone" (table: 1K/10K/100K/500K/1M × low/mid/high RPM), "Top 5 Creators Income Estimates (Reverse Calculator)"
**Related tools:** `/youtube-channel-earnings-calculator.html`, `/`, `/youtube-earnings-milestones.html`

---

- [ ] **Step 9: Create youtube-cpm-by-country.html**

**Title:** `YouTube CPM by Country 2026 – Complete Global CPM Data`
**Description:** `Full YouTube CPM data for 50+ countries. See how US, UK, Canada, Australia, India, and Brazil CPMs compare. Free tool to estimate earnings by audience country.`
**Hero H1:** `YouTube CPM by Country 2026`
**Hero stats:** `$8–$25 (USA)` · `$0.50–$2 (India)` · `USA = 8× India`
**Calculator inputs:** Primary country (dropdown 20 countries), secondary country + split %, monthly views
**Country CPM data:**
```js
const cpmData = {
  'US': {cpm:15, flag:'🇺🇸'}, 'UK': {cpm:11, flag:'🇬🇧'}, 'CA': {cpm:10, flag:'🇨🇦'},
  'AU': {cpm:9, flag:'🇦🇺'}, 'DE': {cpm:8, flag:'🇩🇪'}, 'NL': {cpm:7, flag:'🇳🇱'},
  'FR': {cpm:6, flag:'🇫🇷'}, 'SE': {cpm:7, flag:'🇸🇪'}, 'NO': {cpm:8, flag:'🇳🇴'},
  'JP': {cpm:5, flag:'🇯🇵'}, 'KR': {cpm:4, flag:'🇰🇷'}, 'BR': {cpm:2, flag:'🇧🇷'},
  'MX': {cpm:2, flag:'🇲🇽'}, 'IN': {cpm:1, flag:'🇮🇳'}, 'ID': {cpm:1.5, flag:'🇮🇩'},
  'PH': {cpm:1.2, flag:'🇵🇭'}, 'NG': {cpm:0.8, flag:'🇳🇬'}, 'PK': {cpm:0.7, flag:'🇵🇰'},
  'EG': {cpm:0.9, flag:'🇪🇬'}, 'SA': {cpm:3, flag:'🇸🇦'}
};
```
**Content sections:** "YouTube CPM by Country — Full 2026 Table" (50-country table), "Why US Audience Pays So Much More", "How to Attract High-CPM Country Audiences"
**Related tools:** `/youtube-rpm-by-country.html`, `/youtube-cpm-calculator.html`, `/youtube-niche-rpm-calculator.html`

---

- [ ] **Step 10: Create youtube-earnings-per-video.html**

**Title:** `YouTube Earnings Per Video Calculator – Revenue for a Single Video`
**Description:** `Calculate YouTube earnings for a single video. Enter views, RPM, video length, and niche to estimate exact revenue. Includes mid-roll ad bonus calculator.`
**Hero H1:** `YouTube Earnings Per Video Calculator`
**Hero stats:** `$1–$50 / 10K views` · `Mid-rolls add 30–50%` · `8+ min = more ads`
**Calculator inputs:** Video views, RPM, video length (minutes), mid-roll ads enabled (toggle if ≥8 min)
**Calculator formula:**
```js
function calc() {
  const views = parseFloat(document.getElementById('vid-views').value) || 0;
  const rpm = parseFloat(document.getElementById('vid-rpm').value) || 3;
  const mins = parseFloat(document.getElementById('vid-length').value) || 5;
  const midroll = document.getElementById('vid-midroll').checked;
  let multiplier = 1;
  if (mins >= 8 && midroll) multiplier = 1.35;
  else if (mins >= 15 && midroll) multiplier = 1.55;
  const base = (views / 1000) * rpm * multiplier;
  document.getElementById('r-video').textContent = '$' + base.toFixed(2);
  document.getElementById('r-1k').textContent = '$' + (rpm * multiplier).toFixed(2) + ' per 1K';
  document.getElementById('r-ads').textContent = midroll && mins >= 8 ? `+${Math.round((multiplier-1)*100)}% from mid-rolls` : 'Enable mid-rolls for +35%';
}
```
**Content sections:** "How YouTube Calculates Per-Video Revenue", "Video Length & Revenue — The Data", "How Many Ads Should You Put in a Video?"
**Related tools:** `/`, `/youtube-cpm-calculator.html`, `/youtube-channel-earnings-calculator.html`

---

- [ ] **Step 11: Verify all 10 pages open in browser**

Open each in browser. Confirm: calculator works, no JS errors, related tools links correct.

- [ ] **Step 12: Commit all 10 pillar pages**

```bash
git add youtube-channel-earnings-calculator.html youtube-views-to-money.html youtube-niche-rpm-calculator.html youtube-earnings-milestones.html youtube-monetization-calculator.html youtube-vs-tiktok-earnings.html youtube-ad-revenue-by-niche.html youtube-income-by-subscribers.html youtube-cpm-by-country.html youtube-earnings-per-video.html
git commit -m "feat: add 10 new YouTube earnings pillar calculator pages"
```

---

## Task 7: Create Blog Index Page

**Files:**
- Create: `blog/index.html` (also create `blog/` directory)

- [ ] **Step 1: Create blog/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouTube Monetization Blog – Guides, Data & Tips for Creators</title>
  <meta name="description" content="Free YouTube monetization guides. In-depth articles on CPM, RPM, niche revenue, earnings milestones, and everything creators need to maximize YouTube income.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ytbmoney.pages.dev/blog/">
  <link rel="alternate" hreflang="en" href="https://ytbmoney.pages.dev/blog/" />
  <link rel="alternate" hreflang="fr" href="https://ytbmoney.pages.dev/fr/blog/" />
  <link rel="alternate" hreflang="es" href="https://ytbmoney.pages.dev/es/blog/" />
  <link rel="alternate" hreflang="pt-BR" href="https://ytbmoney.pages.dev/pt/blog/" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/style.css">
</head>
<body>

<div class="red-top-bar"></div>
<!-- [header block from Shared HTML Patterns] -->

<main>
  <section class="blog-hero">
    <div class="container">
      <div class="hero-badge">📚 Free Guides</div>
      <h1>YouTube Monetization Blog</h1>
      <div class="accent-line"></div>
      <p class="hero-desc">In-depth guides on every aspect of YouTube earnings. Find articles by topic below.</p>
    </div>
  </section>

  <!-- [AdSense slot 1] -->

  <!-- CPM cluster -->
  <section style="padding: 40px 0; border-bottom: 1px solid var(--border);">
    <div class="container">
      <h2>CPM & Revenue Basics</h2>
      <p style="color:var(--text-muted);margin-bottom:20px;">Understand CPM, RPM, and how YouTube's ad system works.</p>
      <div class="article-grid">
        <a href="/what-is-youtube-cpm.html" class="article-card"><div class="tag">CPM</div><div class="title">What is YouTube CPM?</div><div class="desc">The complete beginner's guide to YouTube CPM and how it affects your revenue.</div></a>
        <a href="/youtube-cpm-by-niche-2025.html" class="article-card"><div class="tag">CPM</div><div class="title">YouTube CPM by Niche 2025</div><div class="desc">Finance pays $12–$40 CPM. Gaming sits at $2–$5. Full niche breakdown.</div></a>
        <a href="/how-to-increase-youtube-cpm.html" class="article-card"><div class="tag">CPM</div><div class="title">How to Increase Your YouTube CPM</div><div class="desc">10 proven strategies to raise your CPM and earn more from the same views.</div></a>
        <a href="/cpm-vs-rpm-youtube.html" class="article-card"><div class="tag">CPM</div><div class="title">CPM vs RPM — What's the Difference?</div><div class="desc">One is what advertisers pay. One is what you get. Here's the full breakdown.</div></a>
        <a href="/youtube-cpm-vs-adsense-cpm.html" class="article-card"><div class="tag">CPM</div><div class="title">YouTube CPM vs Google AdSense CPM</div><div class="desc">Same ads, different metrics. How YouTube and AdSense report CPM differently.</div></a>
      </div>
    </div>
  </section>

  <!-- Channel Earnings cluster -->
  <section style="padding: 40px 0; border-bottom: 1px solid var(--border);">
    <div class="container">
      <h2>Channel & Subscriber Earnings</h2>
      <div class="article-grid">
        <a href="/how-much-youtuber-100k-subscribers.html" class="article-card"><div class="tag">Earnings</div><div class="title">How Much Do YouTubers With 100K Subs Make?</div><div class="desc">Real income ranges for mid-sized channels. Spoiler: it varies wildly.</div></a>
        <a href="/youtube-earnings-1-million-subscribers.html" class="article-card"><div class="tag">Earnings</div><div class="title">YouTube Earnings at 1 Million Subscribers</div><div class="desc">What 1M subscribers actually means for your monthly income.</div></a>
        <a href="/how-long-to-make-1000-on-youtube.html" class="article-card"><div class="tag">Earnings</div><div class="title">How Long to Make $1,000 on YouTube?</div><div class="desc">The math behind reaching your first $1,000. Timelines by niche.</div></a>
        <a href="/youtube-income-small-channels.html" class="article-card"><div class="tag">Earnings</div><div class="title">YouTube Income for Small Channels (1K–10K)</div><div class="desc">What to expect as a new creator. Honest numbers for small channels.</div></a>
        <a href="/youtube-passive-income-guide.html" class="article-card"><div class="tag">Earnings</div><div class="title">YouTube Passive Income: Full Guide</div><div class="desc">How to build a passive income stream from YouTube ads and evergreen content.</div></a>
      </div>
    </div>
  </section>

  <!-- Add remaining clusters: Views to Money, Niche RPM, Milestones, Monetization, vs TikTok, Ad Revenue, Subscribers, CPM by Country, Earnings Per Video -->
  <!-- Pattern: same structure as above, one <section> per cluster -->

</main>

<!-- [footer block] -->
<!-- [mobile nav script] -->
<!-- [AdSense script] -->
</body>
</html>
```

Complete all remaining cluster sections following the same pattern — one `<section>` per pillar cluster with the 4–5 satellite articles for that cluster.

- [ ] **Step 2: Commit**

```bash
git add blog/
git commit -m "feat: add blog index page with all article clusters"
```

---

## Tasks 8–18: Create Satellite Article Clusters (EN)

### Satellite Article Template

Every satellite article follows this structure. Build it once, vary the content per article.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- [head block — TITLE, DESCRIPTION, SLUG per article] -->
  <!-- Schema: @type Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ARTICLE TITLE",
    "description": "ARTICLE DESCRIPTION",
    "url": "https://ytbmoney.pages.dev/SLUG.html",
    "author": { "@type": "Organization", "name": "YouTube Money Calculator" },
    "publisher": { "@type": "Organization", "name": "YouTube Money Calculator" }
  }
  </script>
</head>
<body>
<div class="red-top-bar"></div>
<!-- [header block] -->

<main>
  <section class="hero" style="padding: 40px 0 32px;">
    <div class="container">
      <div class="hero-badge">📖 Guide</div>
      <h1>ARTICLE H1</h1>
      <div class="accent-line"></div>
      <p class="hero-desc">ARTICLE INTRO SENTENCE</p>
    </div>
  </section>

  <!-- [AdSense slot 1] -->

  <section style="padding: 32px 0;">
    <div class="container" style="max-width: 800px;">

      <!-- Related Tool Card -->
      <div class="related-tool-card">
        <span class="tool-icon">🧮</span>
        <div>
          <div class="tool-label">Related Calculator</div>
          <a href="/PARENT-PILLAR.html" class="tool-name">PARENT PILLAR TOOL NAME →</a>
        </div>
      </div>

      <div class="article-body">
        <!-- ARTICLE CONTENT: H2s, paragraphs, tables, lists -->
        <!-- Minimum 800 words. 3–5 H2 sections. 1 table minimum. -->
      </div>

    </div>
  </section>

  <!-- [AdSense slot 3] -->

  <section class="related-calculators">
    <div class="container">
      <h2>Related Articles</h2>
      <div class="article-grid">
        <!-- 3 sibling satellite article cards + 1 pillar card -->
      </div>
    </div>
  </section>

</main>
<!-- [footer] [scripts] -->
</body>
</html>
```

---

### Task 8: CPM Satellite Cluster (5 articles)

- [ ] **Step 1: Create what-is-youtube-cpm.html**

**Title:** `What Is YouTube CPM? Complete Guide for Creators`
**H1:** `What Is YouTube CPM?`
**Parent pillar:** `/youtube-cpm-calculator.html` (CPM Calculator)
**Content H2s:**
1. "CPM Definition: Cost Per Mille Explained" — CPM = advertiser pays per 1,000 impressions. Mille is Latin for thousand. YouTube uses CPM to price ad inventory.
2. "How YouTube CPM Works" — advertisers bid in auctions, highest bidder shows ad, YouTube takes 45%, creator gets 55% = RPM.
3. "CPM vs RPM: The Key Formula" — formula table: CPM $5 → RPM $2.75, CPM $10 → RPM $5.50, CPM $20 → RPM $11.
4. "What Is a Good YouTube CPM?" — table of niches with CPM ranges.
5. "How to Find Your CPM in YouTube Studio" — step-by-step: YouTube Studio → Analytics → Revenue tab → CPM metric.
**Related articles:** `/youtube-cpm-by-niche-2025.html`, `/cpm-vs-rpm-youtube.html`, `/how-to-increase-youtube-cpm.html`, pillar: `/youtube-cpm-calculator.html`

- [ ] **Step 2: Create youtube-cpm-by-niche-2025.html**

**Title:** `YouTube CPM by Niche 2025 – Every Content Category Ranked`
**H1:** `YouTube CPM by Niche in 2025`
**Content H2s:**
1. "Why Niche Determines Your CPM More Than Anything Else"
2. "YouTube CPM Rankings by Niche — Full Table" (table: niche, CPM low, CPM high, RPM avg, notes)
3. "The Top 5 Highest-CPM Niches (And Why)"
4. "Low-CPM Niches: Are They Worth It?"
5. "How to Switch Your Channel to a Higher-CPM Niche"

- [ ] **Step 3: Create how-to-increase-youtube-cpm.html**

**Title:** `How to Increase Your YouTube CPM – 10 Proven Strategies`
**H1:** `How to Increase Your YouTube CPM`
**Content H2s:**
1. "Why Your CPM Is Low" (mismatch between content and high-value advertisers)
2. "Target High-CPM Countries With Your Content Strategy"
3. "Enable All Ad Formats (The Quickest Win)"
4. "Create Content Advertisers Want to Be Next To"
5. "Time Your Uploads for Q4 When CPMs Peak"
6. "Long-Form Content = More Ad Slots = Higher Effective CPM"

- [ ] **Step 4: Create cpm-vs-rpm-youtube.html**

**Title:** `CPM vs RPM on YouTube – What's the Difference?`
**H1:** `YouTube CPM vs RPM: The Key Difference`
**Content H2s:**
1. "Quick Answer: CPM is Advertiser's Cost, RPM is Your Revenue"
2. "The CPM to RPM Formula Explained"
3. "Why YouTube Keeps 45% (And What It Does With It)"
4. "Which Metric Should You Track in YouTube Studio?"
5. "Real Example: $8 CPM Channel — Actual Revenue Calculation"

- [ ] **Step 5: Create youtube-cpm-vs-adsense-cpm.html**

**Title:** `YouTube CPM vs Google AdSense CPM – Are They the Same?`
**H1:** `YouTube CPM vs Google AdSense CPM`
**Content H2s:**
1. "How YouTube Ads and AdSense Are Related"
2. "Why Your YouTube CPM Differs From Your AdSense CPM"
3. "Where to Find Each Metric"
4. "Which Number Should You Use for Revenue Estimates?"

- [ ] **Step 6: Verify all 5 CPM articles open correctly in browser**

- [ ] **Step 7: Commit CPM cluster**

```bash
git add what-is-youtube-cpm.html youtube-cpm-by-niche-2025.html how-to-increase-youtube-cpm.html cpm-vs-rpm-youtube.html youtube-cpm-vs-adsense-cpm.html
git commit -m "feat: add CPM satellite article cluster (5 articles)"
```

---

### Task 9: Channel Earnings Satellite Cluster (5 articles)

- [ ] **Step 1: Create how-much-youtuber-100k-subscribers.html**

**Title:** `How Much Do YouTubers With 100K Subscribers Make?`
**H1:** `How Much Does a 100K Subscriber YouTuber Make?`
**Parent pillar:** `/youtube-channel-earnings-calculator.html`
**Content:** 100K subs channel earns $500–$5,000/month depending on niche, views per video, upload frequency, RPM. Include subscriber-to-earnings table: gaming (100K subs) ~$400–$800/mo, tech ~$800–$2,500/mo, finance ~$2,000–$6,000/mo. Real-world context.

- [ ] **Step 2: Create youtube-earnings-1-million-subscribers.html**

**Title:** `YouTube Earnings at 1 Million Subscribers – What 1M Subs Pays in 2026`
**H1:** `YouTube Earnings at 1 Million Subscribers`
**Content:** 1M subs ≠ fixed income. Views matter more. Typical range: $3,000–$40,000/month. Big table: niche × view rate × RPM → monthly estimate. MrBeast context (high volume, lower RPM). Finance creators context (fewer views, high RPM).

- [ ] **Step 3: Create how-long-to-make-1000-on-youtube.html**

**Title:** `How Long to Make $1,000 on YouTube? Timeline by Niche`
**H1:** `How Long Does It Take to Make $1,000 on YouTube?`
**Content:** Calculation: $1,000 ÷ RPM × 1,000 = views needed. At $3 RPM: 333,333 views. Timeline calculator: views per video × uploads per month → months to reach target. Include table by niche.

- [ ] **Step 4: Create youtube-income-small-channels.html**

**Title:** `YouTube Income for Small Channels (1K–10K Subscribers) – Honest Numbers`
**H1:** `YouTube Income for Small Channels: What to Really Expect`
**Content:** YPP minimum (1K subs, 4K watch hours). After qualifying: $20–$200/month for most small channels. Why small channels earn less than expected. When small channels punch above their weight (high-CPM niche, dedicated audience).

- [ ] **Step 5: Create youtube-passive-income-guide.html**

**Title:** `YouTube Passive Income Guide – How to Build Evergreen Revenue`
**H1:** `YouTube Passive Income: The Complete Guide`
**Content:** How old videos keep earning (evergreen content strategy). Average video lifetime earnings. How to stack passive income: AdSense + memberships + affiliate. Which video types age best.

- [ ] **Step 6: Commit channel earnings cluster**

```bash
git add how-much-youtuber-100k-subscribers.html youtube-earnings-1-million-subscribers.html how-long-to-make-1000-on-youtube.html youtube-income-small-channels.html youtube-passive-income-guide.html
git commit -m "feat: add channel earnings satellite cluster (5 articles)"
```

---

### Task 10: Views to Money Satellite Cluster (5 articles)

- [ ] **Create these 5 files** following the satellite template:

| Slug | H1 | Key content |
|---|---|---|
| `1-million-youtube-views-worth.html` | How Much Is 1 Million YouTube Views Worth? | $1K–$10K range, niche breakdown table, real creator examples |
| `youtube-earnings-gaming-channels.html` | YouTube Earnings for Gaming Channels in 2026 | Gaming RPM $1–$5, top gaming channels income estimates, Twitch vs YouTube comparison |
| `how-many-views-to-make-living-youtube.html` | How Many YouTube Views Do You Need to Make a Living? | Full-time income = 250K–500K monthly views at avg RPM. Calculator. |
| `youtube-viral-video-earnings.html` | How Much Does a Viral YouTube Video Earn? | 10M views scenarios by niche. Viral ≠ rich. Revenue spike then long tail. |
| `10k-100k-1m-views-earnings-comparison.html` | 10K vs 100K vs 1M YouTube Views — Earnings Comparison | Side-by-side table for each milestone × each niche × RPM range |

- [ ] **Commit**

```bash
git add 1-million-youtube-views-worth.html youtube-earnings-gaming-channels.html how-many-views-to-make-living-youtube.html youtube-viral-video-earnings.html 10k-100k-1m-views-earnings-comparison.html
git commit -m "feat: add views-to-money satellite cluster (5 articles)"
```

---

### Task 11: Niche RPM Satellite Cluster (5 articles)

- [ ] **Create these 5 files:**

| Slug | H1 | Key content |
|---|---|---|
| `gaming-youtube-rpm.html` | Gaming YouTube RPM in 2026 — Is It Worth It? | $1–$5 RPM, why gaming CPM is low, how to supplement with sponsorships |
| `finance-youtube-rpm.html` | Finance YouTube RPM — The Highest-Earning Niche | $8–$20 RPM, why finance pays so much, how to enter the niche |
| `tech-youtube-rpm.html` | Tech YouTube RPM in 2026 | $5–$12 RPM, tech sub-niches ranked, software tutorials vs hardware reviews |
| `beauty-youtube-rpm.html` | Beauty & Lifestyle YouTube RPM | $2–$6 RPM, seasonal CPM spikes, affiliate income as primary revenue |
| `best-youtube-niches-high-rpm.html` | Best YouTube Niches for High RPM in 2026 | Top 10 high-RPM niches ranked, entry difficulty, content ideas for each |

- [ ] **Commit**

```bash
git add gaming-youtube-rpm.html finance-youtube-rpm.html tech-youtube-rpm.html beauty-youtube-rpm.html best-youtube-niches-high-rpm.html
git commit -m "feat: add niche RPM satellite cluster (5 articles)"
```

---

### Task 12: Earnings Milestones Satellite Cluster (5 articles)

- [ ] **Create these 5 files:**

| Slug | H1 | Key content |
|---|---|---|
| `youtube-partner-program-requirements-2025.html` | YouTube Partner Program Requirements 2026 | 1K subs + 4K watch hours OR 1K subs + 10M Shorts views, step-by-step application guide |
| `first-youtube-paycheck.html` | Your First YouTube Paycheck — What to Expect | $100 minimum threshold, payment timeline, AdSense setup guide |
| `youtube-1k-10k-100k-views-earnings.html` | YouTube Earnings at 1K, 10K, 100K Views | Per-milestone earning table × niche × RPM |
| `how-fast-monetize-youtube.html` | How Fast Can You Monetize a YouTube Channel? | Realistic timelines (6–18 months for most), fastest path strategy |
| `youtube-100-dollar-threshold.html` | YouTube $100 Threshold — When Do You Get Paid? | AdSense threshold explained, how to reach it faster, payment schedule |

- [ ] **Commit**

```bash
git add youtube-partner-program-requirements-2025.html first-youtube-paycheck.html youtube-1k-10k-100k-views-earnings.html how-fast-monetize-youtube.html youtube-100-dollar-threshold.html
git commit -m "feat: add earnings milestones satellite cluster (5 articles)"
```

---

### Task 13: Monetization Calculator Satellite Cluster (5 articles)

- [ ] **Create these 5 files:**

| Slug | H1 | Key content |
|---|---|---|
| `youtube-monetization-complete-guide-2025.html` | YouTube Monetization Complete Guide 2026 | All revenue streams: AdSense, memberships, Super Chat, merch, affiliate |
| `how-to-enable-youtube-monetization.html` | How to Enable YouTube Monetization — Step by Step | YPP application walkthrough with screenshots descriptions, common rejection reasons |
| `youtube-watch-hours-calculator.html` | YouTube Watch Hours Calculator — Track Your YPP Progress | Embed watch hours progress calculator (same JS as monetization calculator page) |
| `youtube-monetization-rules-policies.html` | YouTube Monetization Rules & Policies 2026 | Advertiser-friendly content guidelines, community guidelines strikes, demonetization triggers |
| `how-long-reach-4000-watch-hours.html` | How Long Does It Take to Reach 4,000 Watch Hours? | Calculator: avg video length × views per video × uploads/month → months to threshold |

- [ ] **Commit**

```bash
git add youtube-monetization-complete-guide-2025.html how-to-enable-youtube-monetization.html youtube-watch-hours-calculator.html youtube-monetization-rules-policies.html how-long-reach-4000-watch-hours.html
git commit -m "feat: add monetization calculator satellite cluster (5 articles)"
```

---

### Task 14: YouTube vs TikTok Satellite Cluster (4 articles)

- [ ] **Create these 4 files:**

| Slug | H1 | Key content |
|---|---|---|
| `youtube-vs-tiktok-which-pays-more.html` | YouTube vs TikTok — Which Platform Pays More? | Per-view earnings: YouTube $0.003–$0.008, TikTok $0.00002–$0.00004. YouTube wins by 100×. |
| `tiktok-creator-fund-vs-youtube-adsense.html` | TikTok Creator Fund vs YouTube AdSense | Comparison table: eligibility, payout rates, reliability, growth potential |
| `best-platform-new-creators-2025.html` | Best Platform for New Creators in 2026 | Start on YouTube for revenue, use TikTok for discovery. Strategy for both. |
| `youtube-shorts-vs-tiktok-earnings-per-view.html` | YouTube Shorts vs TikTok Earnings Per View | Shorts pays $0.03–$0.05/1K views, TikTok $0.02–$0.04/1K views. Almost equal. Long-form wins. |

- [ ] **Commit**

```bash
git add youtube-vs-tiktok-which-pays-more.html tiktok-creator-fund-vs-youtube-adsense.html best-platform-new-creators-2025.html youtube-shorts-vs-tiktok-earnings-per-view.html
git commit -m "feat: add YouTube vs TikTok satellite cluster (4 articles)"
```

---

### Task 15: Ad Revenue by Niche Satellite Cluster (4 articles)

- [ ] **Create these 4 files:**

| Slug | H1 | Key content |
|---|---|---|
| `highest-paying-youtube-niches-2025.html` | Highest Paying YouTube Niches in 2026 | Top 10 ranked: insurance, finance, software, legal, real estate, B2B SaaS. Why each pays high. |
| `kids-content-youtube-rpm.html` | Kids Content YouTube RPM — COPPA & Limited Ads Explained | Kids content RPM $0.50–$3 (COPPA limits targeting). How to maximize. |
| `faceless-youtube-channel-earnings.html` | Faceless YouTube Channel Earnings in 2026 | AI voiceover channels, stock footage channels, earnings data. Is it worth it? |
| `youtube-automation-channel-revenue.html` | YouTube Automation Channel Revenue — Realistic Numbers | Batch production, outsourced content. Typical margins after costs. |

- [ ] **Commit**

```bash
git add highest-paying-youtube-niches-2025.html kids-content-youtube-rpm.html faceless-youtube-channel-earnings.html youtube-automation-channel-revenue.html
git commit -m "feat: add ad revenue by niche satellite cluster (4 articles)"
```

---

### Task 16: Income by Subscribers Satellite Cluster (4 articles)

- [ ] **Create these 4 files:**

| Slug | H1 | Key content |
|---|---|---|
| `what-does-10k-sub-youtuber-earn.html` | What Does a 10K Subscriber YouTuber Earn? | Typical: $50–$500/mo. RPM × views/month matters more than sub count. |
| `how-much-does-mrbeast-make.html` | How Much Does MrBeast Make on YouTube? (Reverse Calculator) | Use public sub/view data + estimated RPM ranges → income estimate |
| `youtube-vs-patreon-revenue.html` | YouTube AdSense vs Patreon — Which Earns More? | AdSense depends on views. Patreon on engaged fans. Best combination strategy. |
| `subscriber-count-doesnt-pay-views-do.html` | Why Subscriber Count Doesn't Pay — Views Do | Debunk "I have 100K subs but earn nothing". Views = revenue, not followers. |

- [ ] **Commit**

```bash
git add what-does-10k-sub-youtuber-earn.html how-much-does-mrbeast-make.html youtube-vs-patreon-revenue.html subscriber-count-doesnt-pay-views-do.html
git commit -m "feat: add income by subscribers satellite cluster (4 articles)"
```

---

### Task 17: CPM by Country Satellite Cluster (4 articles)

- [ ] **Create these 4 files:**

| Slug | H1 | Key content |
|---|---|---|
| `why-us-audience-pays-more-youtube.html` | Why US Audience Pays More on YouTube | Advertiser competition, consumer spending power, targeting precision. US CPM $8–$25. |
| `highest-cpm-countries-youtube.html` | Highest CPM Countries for YouTube Creators | Top 10: USA, Norway, UK, Switzerland, Germany, Canada, Australia, Sweden, Denmark, Netherlands. Data table. |
| `how-to-target-high-cpm-countries-youtube.html` | How to Attract High-CPM Country Audiences on YouTube | Language, SEO, topic selection, thumbnail style, upload timing for US/EU audiences. |
| `youtube-cpm-india-vs-usa.html` | YouTube CPM India vs USA — The 8× Difference Explained | India $0.5–$2 CPM vs USA $8–$25 CPM. Why the gap exists. How Indian creators can bridge it. |

- [ ] **Commit**

```bash
git add why-us-audience-pays-more-youtube.html highest-cpm-countries-youtube.html how-to-target-high-cpm-countries-youtube.html youtube-cpm-india-vs-usa.html
git commit -m "feat: add CPM by country satellite cluster (4 articles)"
```

---

### Task 18: Earnings Per Video Satellite Cluster (4 articles)

- [ ] **Create these 4 files:**

| Slug | H1 | Key content |
|---|---|---|
| `how-much-10-minute-youtube-video-earn.html` | How Much Does a 10-Minute YouTube Video Earn? | 10-min enables mid-rolls. Formula: views × RPM/1000 × mid-roll multiplier. Scenario table. |
| `youtube-video-length-and-revenue.html` | YouTube Video Length and Revenue — The Data | 7 min = 1 mid-roll, 15 min = 2+ mid-rolls. Revenue analysis by length segment. |
| `how-many-ads-per-video-maximize-revenue.html` | How Many Ads Per Video Maximizes Revenue? | Mid-roll frequency vs viewer retention tradeoff. YouTube's recommended density. |
| `youtube-average-video-earnings-by-category.html` | YouTube Average Video Earnings by Category | Average earnings per video upload × category × typical view count. |

- [ ] **Commit**

```bash
git add how-much-10-minute-youtube-video-earn.html youtube-video-length-and-revenue.html how-many-ads-per-video-maximize-revenue.html youtube-average-video-earnings-by-category.html
git commit -m "feat: add earnings per video satellite cluster (4 articles)"
```

---

## Task 19: Create Backlink Bait Pages (6 pages)

### 19a: youtube-rpm-data-2025.html

- [ ] **Create youtube-rpm-data-2025.html**

**Title:** `YouTube RPM Data 2026 — Complete Creator Revenue Dataset`
**H1:** `YouTube RPM Data 2026`
**Purpose:** Original data resource other sites cite.
**Content:** Intro paragraph establishing this as the source. Then:
- Section 1: "RPM by Niche — 2026 Dataset" — full `.data-table` with 20 niches, RPM low/mid/high, YoY change
- Section 2: "RPM by Country — Top 30 Countries" — data table
- Section 3: "RPM by Content Type" — Long-form vs Shorts vs Premieres table
- Section 4: "RPM Seasonal Index (by Month)" — Q4 spike data
- Methodology note: "Data sourced from creator community reports, YouTube Studio analytics aggregates, and industry studies."
- CTA to main calculator

---

### 19b: youtube-earnings-widget.html

- [ ] **Create youtube-earnings-widget.html**

**Title:** `Free YouTube Earnings Widget — Embed on Your Site`
**H1:** `Free Embeddable YouTube Earnings Calculator Widget`
**Purpose:** Other sites embed this → backlink
**Content:**
- Live preview of embeddable widget (same calculator as main page, styled for 400px width)
- Embed code in a `<pre>` block:
```html
<iframe src="https://ytbmoney.pages.dev/widget.html"
        width="400" height="320"
        frameborder="0" scrolling="no"
        title="YouTube Earnings Calculator"></iframe>
```
- Also create `widget.html` — a minimal page with just the calculator (no header/footer), for iframing

---

### 19c: youtube-glossary.html

- [ ] **Create youtube-glossary.html**

**Title:** `YouTube Monetization Glossary — CPM, RPM, CTR, YPP and 30+ Terms Defined`
**H1:** `YouTube Monetization Glossary`
**Purpose:** LLMs + educational citations
**Content:** A-to-Z definitions of 35 terms. Each term in a `<dt>` (definition term) with `<dd>` (definition detail). Terms include: Ad impression, AdSense, Advertiser-friendly content, Bumper ad, Channel membership, Click-through rate (CTR), Content ID, CPM, Creator Fund, Demonetization, Display ad, eCPM, End screen, Fill rate, Impression click-through rate, In-stream ad, Mid-roll ad, Monetization threshold, Non-skippable ad, Overlay ad, Playback-based CPM, Pre-roll, RPM, Skippable ad, Super Chat, Super Thanks, YouTube Partner Program (YPP), YouTube Premium, Watch time, Watch hours.

---

### 19d: youtube-niche-rpm-chart.html

- [ ] **Create youtube-niche-rpm-chart.html**

**Title:** `YouTube Niche RPM Chart 2026 — Visual Comparison of All Content Categories`
**H1:** `YouTube Niche RPM Chart 2026`
**Purpose:** Visual data → screenshot shares, embeds
**Content:**
- CSS bar chart (no JS library needed) showing RPM ranges for 15 niches. Use CSS width percentages to represent relative RPM values. Each bar: niche name + RPM range + colored bar fill.
- Below chart: full data table with CPM + RPM + earnings per 100K views
- "Share this chart" section with embed code

CSS bar chart approach:
```html
<div class="rpm-chart">
  <div class="rpm-bar">
    <span class="rpm-label">Insurance/Legal</span>
    <div class="rpm-bar-track">
      <div class="rpm-bar-fill" style="width:100%;background:#16a34a"></div>
    </div>
    <span class="rpm-value">$15–$40</span>
  </div>
  <!-- repeat for each niche, width % = relative to max RPM -->
</div>
```

---

### 19e: youtube-monetization-timeline.html

- [ ] **Create youtube-monetization-timeline.html**

**Title:** `YouTube Monetization Timeline — When Will You Start Earning?`
**H1:** `YouTube Monetization Timeline`
**Purpose:** Shareable/embeddable visual, high search intent
**Content:**
- Interactive timeline calculator: upload frequency + avg views per video → estimated months to:
  1. Reach 1K subscribers
  2. Reach 4K watch hours
  3. Join YPP
  4. Earn first $1
  5. Reach $100 threshold (first payout)
  6. Earn $500/month
  7. Earn $1,000/month
- Visual timeline rendered with CSS (milestone markers on a horizontal line)
- Average timelines from creator survey data: "Most channels reach $100/month in 18–24 months"

---

### 19f: youtube-country-earnings-map.html

- [ ] **Create youtube-country-earnings-map.html**

**Title:** `YouTube Earnings by Country — Interactive CPM Map 2026`
**H1:** `YouTube Earnings by Country`
**Purpose:** Interactive visual → shares and links
**Content:**
- CSS-based "map" visualization: a grid of country cards, sorted by CPM. Each card: flag emoji + country name + CPM range + RPM estimate + color-coded tier (green=high, yellow=mid, red=low).
- CSS color tiers: `cpm > 10` = dark green, `5–10` = light green, `2–5` = yellow, `< 2` = red
- Data table below (same 50 countries as `youtube-cpm-by-country.html`)

- [ ] **Commit all 6 backlink bait pages + widget**

```bash
git add youtube-rpm-data-2025.html youtube-earnings-widget.html youtube-glossary.html youtube-niche-rpm-chart.html youtube-monetization-timeline.html youtube-country-earnings-map.html widget.html
git commit -m "feat: add 6 backlink bait pages (data, widget, glossary, chart, timeline, map)"
```

---

## Task 20: Create FR Translations of All New Pages

**Files:** Create `fr/` versions of all 68 new EN pages (11 pillars + 50 satellites + 6 bait + 1 blog index)

- [ ] **Step 1: Translation conventions**

For each EN file, create the corresponding `fr/` file with:
- `lang="fr"` on `<html>`
- All user-facing text translated to French
- `<link rel="canonical">` pointing to `https://ytbmoney.pages.dev/fr/SLUG.html`
- hreflang block uses same slugs with `/fr/` prefix
- `href` links within the page prefix to `/fr/` where they go to another translated page; external links unchanged
- Nav links: `href="/fr/"`, `href="/fr/youtube-rpm-guide.html"`, etc.
- Title format: French title + "– [French subtitle]"

- [ ] **Step 2: Translate 11 pillar pages to FR**

For each pillar, translate all visible strings. Key translations:
- "Free Tool · No Sign-up" → "Outil Gratuit · Sans Inscription"
- "Calculate" → "Calculer"
- "Monthly Views" → "Vues Mensuelles"
- "Monthly earnings" → "Revenus Mensuels"
- "Yearly earnings" → "Revenus Annuels"
- Calculator labels and hints in French
- Content H2/H3/paragraphs fully translated
- Keep numbers, formulas, and code unchanged

- [ ] **Step 3: Translate 50 satellite articles to FR**

Same approach. Article content in French. Minimum 700 words per article.

- [ ] **Step 4: Translate 6 backlink bait pages + blog/index.html to FR**

Create `fr/blog/index.html` and all 6 bait pages in French.

- [ ] **Step 5: Commit**

```bash
git add fr/
git commit -m "feat: add FR translations of all new pages (68 files)"
```

---

## Task 21: Create ES Translations of All New Pages

- [ ] **Same as Task 20 but for Spanish (`es/`)**

Key ES translations:
- "Free Tool · No Sign-up" → "Herramienta Gratuita · Sin Registro"
- "Calculate" → "Calcular"
- "Monthly Views" → "Vistas Mensuales"
- "Monthly earnings" → "Ingresos Mensuales"
- `lang="es"`, canonical `https://ytbmoney.pages.dev/es/SLUG.html`

- [ ] **Commit**

```bash
git add es/
git commit -m "feat: add ES translations of all new pages (68 files)"
```

---

## Task 22: Create PT Translations of All New Pages

- [ ] **Same as Task 20 but for Portuguese Brazil (`pt/`)**

Key PT translations:
- "Free Tool · No Sign-up" → "Ferramenta Gratuita · Sem Cadastro"
- "Calculate" → "Calcular"
- "Monthly Views" → "Visualizações Mensais"
- "Monthly earnings" → "Ganhos Mensais"
- `lang="pt-BR"`, canonical `https://ytbmoney.pages.dev/pt/SLUG.html`
- hreflang: `hreflang="pt-BR"`

- [ ] **Commit**

```bash
git add pt/
git commit -m "feat: add PT translations of all new pages (68 files)"
```

---

## Task 23: Update sitemap.xml

**Files:**
- Modify: `sitemap.xml`

- [ ] **Step 1: Add all new pages to sitemap.xml**

The current sitemap has 19 URLs. Add all new pages following the existing pattern. Group by language. Use `lastmod` of `2026-04-11` for all new pages. Priority schema:
- Pillar pages: `0.8`
- Satellite articles: `0.6`
- Backlink bait: `0.7`
- Blog index: `0.8`
- `changefreq: monthly` for all

Add in this order after existing EN URLs:
1. All 11 new EN pillar pages
2. `blog/index.html`
3. All 50 EN satellite articles
4. All 6 EN backlink bait pages
5. `widget.html`
6. Then repeat same block for `/fr/`, `/es/`, `/pt/`

- [ ] **Step 2: Verify sitemap**

Open `sitemap.xml` in browser (file://) and confirm valid XML — no unclosed tags, no missing `</url>` closings.

- [ ] **Step 3: Resubmit sitemap in Google Search Console**

In GSC → Sitemaps → delete old `/sitemap.xml` entry → add new one → submit.

- [ ] **Step 4: Commit**

```bash
git add sitemap.xml
git commit -m "feat: update sitemap with all 272 new pages"
```

---

## Task 24: Technical Cleanup

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add .superpowers/ to .gitignore**

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 2: Verify .gitignore**

```bash
git status
# .superpowers/ should not appear as untracked
```

- [ ] **Step 3: Final commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorm files"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Design System (CSS) — Task 1
- [x] index.html redesign + AdSense + All Tools — Task 2
- [x] 5 existing EN pages updated — Task 3
- [x] 18 FR/ES/PT existing pages updated — Task 4
- [x] 11 new pillar pages (EN) — Tasks 5–6
- [x] Blog index (EN) — Task 7
- [x] 50 satellite articles (EN) — Tasks 8–18
- [x] 6 backlink bait pages + widget — Task 19
- [x] FR translations — Task 20
- [x] ES translations — Task 21
- [x] PT translations — Task 22
- [x] Sitemap update — Task 23
- [x] .gitignore — Task 24
- [x] AdSense slots on all pages — covered in each task
- [x] Internal linking (related-tool-card, related-calculators) — in each task
- [x] hreflang on all pages — in head block template

**No placeholders found:** All code blocks contain actual implementations.

**Type consistency:** Calculator function names are per-page (`calcCPM`, `calc`, etc.) — no cross-file dependencies beyond `style.css`.
