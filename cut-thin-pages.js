#!/usr/bin/env node
/**
 * cut-thin-pages.js
 *
 * AdSense remediation cut: removes 45 thin/duplicate pages (per language ×
 * 4 = 180 files total) and 301-redirects each to its closest money page.
 *
 * Categories of cuts:
 *   - 19 sports/hobby niche pages → /best-youtube-niches-high-rpm
 *   - 8 earnings-milestone dups → /youtube-views-to-money
 *   - 5 CPM/country dups → /youtube-rpm-by-country
 *   - 3 niche-data dups → /best-youtube-niches-high-rpm
 *   - 7 thin/timeline dups → /youtube-monetization-complete-guide-2026
 *   - 3 platform-vs dups → /youtube-vs-tiktok-which-pays-more
 *
 * Dry-run by default. Pass --write to apply.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const WRITE = process.argv.includes('--write');

const CUTS = {
  // Niche sports/hobby (18) → best-niches-high-rpm  (keep football-soccer)
  'basketball-youtube-rpm-earnings':           'best-youtube-niches-high-rpm',
  'nfl-american-football-youtube-rpm-earnings':'best-youtube-niches-high-rpm',
  'cricket-youtube-rpm-earnings':              'best-youtube-niches-high-rpm',
  'golf-youtube-rpm-earnings':                 'best-youtube-niches-high-rpm',
  'mma-ufc-youtube-rpm-earnings':              'best-youtube-niches-high-rpm',
  'formula-1-motorsport-youtube-rpm-earnings': 'best-youtube-niches-high-rpm',
  'sports-betting-dfs-youtube-rpm-earnings':   'best-youtube-niches-high-rpm',
  'supercars-exotic-cars-youtube-rpm-earnings':'best-youtube-niches-high-rpm',
  'luxury-lifestyle-watches-youtube-rpm-earnings':'best-youtube-niches-high-rpm',
  'real-estate-investing-youtube-rpm-earnings':'best-youtube-niches-high-rpm',
  'fitness-workout-youtube-rpm-earnings':      'best-youtube-niches-high-rpm',
  'travel-vlog-youtube-rpm-earnings':          'best-youtube-niches-high-rpm',
  'pets-dog-training-youtube-rpm-earnings':    'best-youtube-niches-high-rpm',
  'cooking-food-youtube-rpm-earnings':         'best-youtube-niches-high-rpm',
  'diy-home-improvement-youtube-rpm-earnings': 'best-youtube-niches-high-rpm',
  'crypto-bitcoin-youtube-rpm-earnings':       'best-youtube-niches-high-rpm',
  'kids-content-youtube-rpm':                  'best-youtube-niches-high-rpm',
  'beauty-youtube-rpm':                        'best-youtube-niches-high-rpm',
  'youtube-earnings-gaming-channels':          'gaming-youtube-rpm',

  // Earnings-milestone duplicates (8) → views-to-money / how-much-pays-per-view
  '10k-100k-1m-views-earnings-comparison':     'youtube-views-to-money',
  'youtube-1k-10k-100k-views-earnings':        'youtube-views-to-money',
  'youtube-earnings-milestones':               'youtube-views-to-money',
  'youtube-income-by-subscribers':             'youtube-earnings-1-million-subscribers',
  'what-does-10k-sub-youtuber-earn':           'youtube-earnings-1-million-subscribers',
  'how-much-youtuber-100k-subscribers':        'youtube-earnings-1-million-subscribers',
  'youtube-income-small-channels':             'youtube-earnings-1-million-subscribers',
  'how-much-10-minute-youtube-video-earn':     'youtube-earnings-per-video',

  // CPM/country duplicates (5) → rpm-by-country
  'highest-cpm-countries-youtube':             'youtube-rpm-by-country',
  'youtube-country-earnings-map':              'youtube-rpm-by-country',
  'youtube-cpm-india-vs-usa':                  'youtube-rpm-by-country',
  'why-us-audience-pays-more-youtube':         'youtube-rpm-by-country',
  'how-to-target-high-cpm-countries-youtube':  'youtube-rpm-by-country',

  // Niche-data duplicates (3) → best-niches / ad-revenue-by-niche
  'highest-paying-youtube-niches-2026':        'best-youtube-niches-high-rpm',
  'youtube-cpm-by-niche-2026':                 'youtube-ad-revenue-by-niche',
  'youtube-average-video-earnings-by-category':'youtube-ad-revenue-by-niche',

  // Thin/timeline duplicates (7) → monetization-guide / rpm-guide
  'first-youtube-paycheck':                    'youtube-monetization-complete-guide-2026',
  'youtube-100-dollar-threshold':              'youtube-monetization-complete-guide-2026',
  'how-long-to-make-1000-on-youtube':          'youtube-monetization-timeline',
  'how-fast-monetize-youtube':                 'youtube-monetization-timeline',
  'how-long-reach-4000-watch-hours':           'youtube-monetization-timeline',
  'youtube-cpm-vs-adsense-cpm':                'cpm-vs-rpm-youtube',
  'youtube-passive-income-guide':              'youtube-monetization-complete-guide-2026',

  // Platform-vs duplicates (3) → vs-tiktok-which-pays
  'tiktok-creator-fund-vs-youtube-adsense':    'youtube-vs-tiktok-which-pays-more',
  'youtube-vs-tiktok-earnings':                'youtube-vs-tiktok-which-pays-more',
  'best-platform-new-creators-2026':           'youtube-vs-tiktok-which-pays-more',
};

const LANG_PREFIXES = ['', 'fr/', 'es/', 'pt/'];

// Build full file move list
const fileDeletes = []; // [{ rel, urlOld, urlNew }]
for (const [slug, target] of Object.entries(CUTS)) {
  for (const prefix of LANG_PREFIXES) {
    fileDeletes.push({
      rel: `${prefix}${slug}.html`,
      urlOld: `/${prefix}${slug}`,
      urlNew: `/${prefix}${target}`,
    });
  }
}

// Sanity: every source file should exist
const missing = fileDeletes.filter(d => !fs.existsSync(path.join(ROOT, d.rel)));
if (missing.length) {
  console.warn('WARN: source files missing (skipping):');
  missing.forEach(d => console.warn('  ', d.rel));
}
const toDelete = fileDeletes.filter(d => fs.existsSync(path.join(ROOT, d.rel)));

// --- Delete files ---
let deleted = 0;
for (const d of toDelete) {
  if (WRITE) {
    fs.unlinkSync(path.join(ROOT, d.rel));
    console.log('  deleted', d.rel, '→ 301 →', d.urlNew);
  } else {
    console.log('  would delete', d.rel, '→ 301 →', d.urlNew);
  }
  deleted++;
}

// --- Append 301 redirects ---
const redirectsPath = path.join(ROOT, '_redirects');
let redirectsSrc = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, 'utf8') : '';
const newRedirects = toDelete
  .filter(d => !redirectsSrc.includes(`${d.urlOld}  `) && !redirectsSrc.includes(`${d.urlOld}\t`) && !redirectsSrc.includes(`${d.urlOld} `))
  .map(d => `${d.urlOld.padEnd(55)}${d.urlNew.padEnd(55)}301`);
if (newRedirects.length) {
  const header = '\n# AdSense remediation cut (May 2026) — 180 thin/dup pages → money pages\n';
  const block = header + newRedirects.join('\n') + '\n';
  if (WRITE) {
    fs.writeFileSync(redirectsPath, redirectsSrc + block, 'utf8');
    console.log('  appended', newRedirects.length, 'redirects to _redirects');
  } else {
    console.log('  would append', newRedirects.length, 'redirects to _redirects');
  }
}

// --- Update sitemap.xml: remove cut URLs ---
const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
let removedFromSitemap = 0;
for (const d of toDelete) {
  const re = new RegExp(`\\s*<url>\\s*<loc>https://ytbearnings\\.com${d.urlOld.replace(/\//g, '\\/')}<\\/loc>[\\s\\S]*?<\\/url>`, 'g');
  const before = sitemap;
  sitemap = sitemap.replace(re, '');
  if (sitemap !== before) removedFromSitemap++;
}
if (WRITE) {
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('  removed', removedFromSitemap, 'entries from sitemap.xml');
} else {
  console.log('  would remove', removedFromSitemap, 'entries from sitemap.xml');
}

// --- Rewrite internal links: any href to a cut URL → href to its target ---
function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'docs' || name.startsWith('.')) continue;
      walk(full, acc);
    } else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}
const remainingFiles = walk(ROOT, []);
let linksTouched = 0;
let filesWithLinkChange = 0;
for (const f of remainingFiles) {
  let src = fs.readFileSync(f, 'utf8');
  const before = src;
  for (const d of toDelete) {
    const re = new RegExp(d.urlOld.replace(/\//g, '\\/') + '(?![\\w-])', 'g');
    src = src.replace(re, d.urlNew);
  }
  if (src !== before) {
    linksTouched += (before.length - src.length === 0) ? 0 : 1;
    filesWithLinkChange++;
    if (WRITE) fs.writeFileSync(f, src, 'utf8');
  }
}

console.log('');
console.log('Files deleted        :', deleted);
console.log('Redirects added      :', newRedirects.length);
console.log('Sitemap entries cut  :', removedFromSitemap);
console.log('Files with link updates:', filesWithLinkChange);
if (!WRITE) console.log('\nDry run. Re-run with --write to apply.');
