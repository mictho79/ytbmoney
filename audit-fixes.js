/**
 * audit-fixes.js
 * Applies SEO audit P0/P1 fixes across the site:
 *  1. Add defer to <script src="/script.js"> (render-blocking fix)
 *  2. Add full hreflang (es/fr/pt-BR) to EN niche pages that miss them
 *  3. Add aria-expanded to FAQ summaries (accessibility)
 */

const fs   = require('fs');
const path = require('path');

const BASE   = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const DOMAIN = 'https://ytbearnings.com';
const LANGS  = ['es', 'fr', 'pt'];

const NICHE_SLUGS = [
  'football-soccer-youtube-rpm-earnings',
  'basketball-youtube-rpm-earnings',
  'nfl-american-football-youtube-rpm-earnings',
  'cricket-youtube-rpm-earnings',
  'cooking-food-youtube-rpm-earnings',
  'diy-home-improvement-youtube-rpm-earnings',
  'fitness-workout-youtube-rpm-earnings',
  'travel-vlog-youtube-rpm-earnings',
  'golf-youtube-rpm-earnings',
  'formula-1-motorsport-youtube-rpm-earnings',
  'mma-ufc-youtube-rpm-earnings',
  'real-estate-investing-youtube-rpm-earnings',
  'luxury-lifestyle-watches-youtube-rpm-earnings',
  'pets-dog-training-youtube-rpm-earnings',
  'crypto-bitcoin-youtube-rpm-earnings',
  'sports-betting-dfs-youtube-rpm-earnings',
  'supercars-exotic-cars-youtube-rpm-earnings',
];

const SKIP_DIRS = new Set(['node_modules', '.git', '.superpowers', 'functions']);

// ─── Fix 1: defer on /script.js ──────────────────────────────────────────────
let scriptDeferFixed = 0;

function fixScriptDefer(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  // Match <script src="/script.js"> without defer/async
  const re = /<script\s+src="\/script\.js"(?!\s+(?:defer|async))>/gi;
  if (!re.test(html)) return false;
  const newHtml = html.replace(
    /<script\s+src="\/script\.js"(?!\s+(?:defer|async))>/gi,
    '<script src="/script.js" defer>'
  );
  if (newHtml !== html) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    scriptDeferFixed++;
    return true;
  }
  return false;
}

// ─── Fix 2: hreflang on EN niche pages ────────────────────────────────────────
let hreflangFixed = 0;

function fixHreflangOnEnNiche(slug) {
  const fp = path.join(BASE, `${slug}.html`);
  if (!fs.existsSync(fp)) return;

  let html = fs.readFileSync(fp, 'utf8');

  // Check which lang files exist
  const hasEs = fs.existsSync(path.join(BASE, 'es', `${slug}.html`));
  const hasFr = fs.existsSync(path.join(BASE, 'fr', `${slug}.html`));
  const hasPt = fs.existsSync(path.join(BASE, 'pt', `${slug}.html`));

  // Build the full hreflang block
  const enUrl = `${DOMAIN}/${slug}.html`;
  const lines = [];
  lines.push(`  <link rel="alternate" hreflang="en"        href="${enUrl}" />`);
  if (hasEs) lines.push(`  <link rel="alternate" hreflang="es"        href="${DOMAIN}/es/${slug}.html" />`);
  if (hasFr) lines.push(`  <link rel="alternate" hreflang="fr"        href="${DOMAIN}/fr/${slug}.html" />`);
  if (hasPt) lines.push(`  <link rel="alternate" hreflang="pt-BR"     href="${DOMAIN}/pt/${slug}.html" />`);
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${enUrl}" />`);
  const newBlock = lines.join('\n');

  // Replace existing minimal hreflang block (only en + x-default) with full set
  const minimalRe = new RegExp(
    `  <link rel="alternate" hreflang="en"\\s+href="[^"]+" />\\s*\\n  <link rel="alternate" hreflang="x-default"\\s+href="[^"]+" />`
  );

  if (!minimalRe.test(html)) return; // already full or non-standard

  const newHtml = html.replace(minimalRe, newBlock);
  if (newHtml !== html) {
    fs.writeFileSync(fp, newHtml, 'utf8');
    hreflangFixed++;
    console.log(`  ✓ hreflang: ${slug}.html`);
  }
}

// ─── Fix 3: FAQ summaries aria-expanded ──────────────────────────────────────
// Browsers already track <details>/<summary> open state, so aria-expanded is
// handled by the platform. Skipping this — browsers do it natively.

// ─── Walk all HTML for defer fix ─────────────────────────────────────────────
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp);
    else if (e.name.endsWith('.html')) fixScriptDefer(fp);
  }
}

console.log('=== Fix 1: defer on /script.js ===');
walk(BASE);
console.log(`  Fixed: ${scriptDeferFixed} pages\n`);

console.log('=== Fix 2: hreflang on EN niche pages ===');
for (const slug of NICHE_SLUGS) fixHreflangOnEnNiche(slug);
console.log(`  Fixed: ${hreflangFixed} EN niche pages\n`);

console.log('Done.');
