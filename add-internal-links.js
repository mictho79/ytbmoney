/**
 * add-internal-links.js
 * Injects a "Related Articles" section into every satellite/pillar page
 * across EN, ES, FR, PT. Idempotent — skips pages already processed.
 *
 * Usage: node add-internal-links.js
 */

const fs   = require('fs');
const path = require('path');

const BASE = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';

// ─── Labels ──────────────────────────────────────────────────────────────────
const LABELS = {
  en: { heading: 'Related Articles',      sub: 'More guides on this topic' },
  fr: { heading: 'Articles liés',         sub: 'Plus de guides sur ce sujet' },
  es: { heading: 'Artículos relacionados',sub: 'Más guías sobre este tema' },
  pt: { heading: 'Artigos relacionados',  sub: 'Mais guias sobre este tópico' },
};

// ─── Cluster definitions ──────────────────────────────────────────────────────
// Each cluster: pillar slug + ordered satellite slugs.
// Pages appear in ONE cluster (primary assignment).
// The pillar is always included in a satellite's related list; satellites
// from the same cluster fill the rest (up to MAX_LINKS).

const MAX_LINKS = 5;

const CLUSTERS = [
  {
    id: 'rpm',
    pillar: 'youtube-rpm-guide',
    satellites: [
      'youtube-rpm-by-country',
      'youtube-rpm-data-2025',
      'youtube-niche-rpm-chart',
      'youtube-niche-rpm-calculator',
      'cpm-vs-rpm-youtube',
      'youtube-ad-revenue-by-niche',
      'youtube-cpm-by-niche-2025',
      'beauty-youtube-rpm',
      'finance-youtube-rpm',
      'gaming-youtube-rpm',
      'tech-youtube-rpm',
      'kids-content-youtube-rpm',
      'youtube-average-video-earnings-by-category',
    ],
  },
  {
    id: 'cpm',
    pillar: 'what-is-youtube-cpm',
    satellites: [
      'youtube-cpm-calculator',
      'youtube-cpm-by-country',
      'youtube-cpm-india-vs-usa',
      'youtube-cpm-vs-adsense-cpm',
      'highest-cpm-countries-youtube',
      'how-to-increase-youtube-cpm',
      'how-to-target-high-cpm-countries-youtube',
      'why-us-audience-pays-more-youtube',
      'youtube-country-earnings-map',
    ],
  },
  {
    id: 'earnings',
    pillar: 'youtube-views-to-money',
    satellites: [
      'how-much-youtube-pays-per-view',
      'youtube-earnings-per-video',
      'youtube-income-by-subscribers',
      'youtube-earnings-1-million-subscribers',
      'youtube-income-small-channels',
      'how-much-youtuber-100k-subscribers',
      'what-does-10k-sub-youtuber-earn',
      'youtube-1k-10k-100k-views-earnings',
      '1-million-youtube-views-worth',
      'youtube-money-calculator-per-million-views',
      'youtube-earnings-milestones',
      '10k-100k-1m-views-earnings-comparison',
      'how-long-to-make-1000-on-youtube',
      'how-many-views-to-make-living-youtube',
      'youtube-100-dollar-threshold',
      'subscriber-count-doesnt-pay-views-do',
      'how-much-10-minute-youtube-video-earn',
      'youtube-video-length-and-revenue',
      'how-many-ads-per-video-maximize-revenue',
      'youtube-channel-earnings-calculator',
    ],
  },
  {
    id: 'monetization',
    pillar: 'youtube-monetization-complete-guide-2025',
    satellites: [
      'youtube-partner-program-requirements-2025',
      'how-fast-monetize-youtube',
      'how-to-enable-youtube-monetization',
      'how-long-reach-4000-watch-hours',
      'youtube-watch-hours-calculator',
      'youtube-monetization-timeline',
      'youtube-monetization-rules-policies',
      'first-youtube-paycheck',
      'youtube-monetization-calculator',
    ],
  },
  {
    id: 'niches',
    pillar: 'best-youtube-niches-high-rpm',
    satellites: [
      'highest-paying-youtube-niches-2025',
      'youtube-automation-channel-revenue',
      'faceless-youtube-channel-earnings',
      'youtube-earnings-gaming-channels',
      'youtube-passive-income-guide',
      'best-platform-new-creators-2025',
      'how-much-does-mrbeast-make',
      'football-soccer-youtube-rpm-earnings',
      'basketball-youtube-rpm-earnings',
      'nfl-american-football-youtube-rpm-earnings',
      'cricket-youtube-rpm-earnings',
      'cooking-food-youtube-rpm-earnings',
      'diy-home-improvement-youtube-rpm-earnings',
    ],
  },
  {
    id: 'comparisons',
    pillar: 'youtube-vs-tiktok-earnings',
    satellites: [
      'youtube-vs-tiktok-which-pays-more',
      'tiktok-creator-fund-vs-youtube-adsense',
      'youtube-shorts-vs-tiktok-earnings-per-view',
      'youtube-vs-patreon-revenue',
      'youtube-shorts-money-calculator',
    ],
  },
];

// Pages to skip entirely
const SKIP_SLUGS = new Set([
  'index', 'about', 'contact', 'privacy', 'disclaimer', 'blog/index',
]);

// ─── Build lookup maps ────────────────────────────────────────────────────────
// slug → { cluster, role: 'pillar'|'satellite' }
const slugToCluster = new Map();

for (const cluster of CLUSTERS) {
  slugToCluster.set(cluster.pillar, { cluster, role: 'pillar' });
  for (const sat of cluster.satellites) {
    slugToCluster.set(sat, { cluster, role: 'satellite' });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLang(filePath) {
  if (filePath.includes(`${path.sep}es${path.sep}`) || filePath.includes('/es/')) return 'es';
  if (filePath.includes(`${path.sep}fr${path.sep}`) || filePath.includes('/fr/')) return 'fr';
  if (filePath.includes(`${path.sep}pt${path.sep}`) || filePath.includes('/pt/')) return 'pt';
  return 'en';
}

function getLangPrefix(lang) {
  return lang === 'en' ? '' : `/${lang}`;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].trim() : '';
}

function extractSlug(filePath) {
  // e.g. "es/youtube-rpm-guide.html" → "youtube-rpm-guide"
  return path.basename(filePath, '.html');
}

function buildRelatedList(slug, lang, titleMap) {
  const entry = slugToCluster.get(slug);
  if (!entry) return null;

  const { cluster, role } = entry;
  const prefix = getLangPrefix(lang);

  // Candidate slugs: for a satellite → [pillar, ...other satellites]
  //                  for a pillar    → [...all satellites]
  let candidates;
  if (role === 'satellite') {
    const others = cluster.satellites.filter(s => s !== slug);
    candidates = [cluster.pillar, ...others];
  } else {
    candidates = [...cluster.satellites];
  }

  // Keep only slugs that have a translated file (exist in titleMap for this lang)
  const langKey = (s) => `${lang}:${s}`;
  const links = candidates
    .filter(s => titleMap.has(langKey(s)))
    .slice(0, MAX_LINKS)
    .map(s => ({
      href: `${prefix}/${s}.html`,
      title: titleMap.get(langKey(s)),
    }));

  return links.length >= 2 ? links : null;
}

function buildSection(links, lang) {
  const { heading, sub } = LABELS[lang];
  const cards = links.map(({ href, title }) => `      <a href="${href}" class="article-card">
        <div class="title">${escapeHtml(title)}</div>
      </a>`).join('\n');

  return `
  <section class="related-calculators" id="related-articles">
    <div class="container">
      <h2>${heading}</h2>
      <p class="section-sub">${sub}</p>
      <div class="article-grid">
${cards}
      </div>
    </div>
  </section>
`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Scan phase: build title map ──────────────────────────────────────────────

function scanTitles() {
  const map = new Map(); // "lang:slug" → title

  const dirs = [
    { dir: BASE,          lang: 'en' },
    { dir: `${BASE}/es`,  lang: 'es' },
    { dir: `${BASE}/fr`,  lang: 'fr' },
    { dir: `${BASE}/pt`,  lang: 'pt' },
  ];

  for (const { dir, lang } of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const slug = path.basename(file, '.html');
      if (SKIP_SLUGS.has(slug)) continue;
      const html = fs.readFileSync(path.join(dir, file), 'utf8');
      const title = extractTitle(html);
      if (title) map.set(`${lang}:${slug}`, title);
    }
  }

  return map;
}

// ─── Inject phase ─────────────────────────────────────────────────────────────

function processFile(filePath, titleMap) {
  const slug = extractSlug(filePath);
  if (SKIP_SLUGS.has(slug)) return false;

  // Only process pages that belong to a cluster
  if (!slugToCluster.has(slug)) return false;

  const html = fs.readFileSync(filePath, 'utf8');

  // Idempotent: skip if already injected
  if (html.includes('id="related-articles"')) return false;

  const lang = getLang(filePath);
  const links = buildRelatedList(slug, lang, titleMap);
  if (!links) return false;

  const section = buildSection(links, lang);
  const newHtml = html.replace('</main>', `${section}</main>`);

  if (newHtml === html) return false; // </main> not found

  fs.writeFileSync(filePath, newHtml, 'utf8');
  return true;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

function run() {
  console.log('Scanning titles...');
  const titleMap = scanTitles();
  console.log(`Found ${titleMap.size} page titles.\n`);

  const dirs = [
    { dir: BASE,         lang: 'en' },
    { dir: `${BASE}/es`, lang: 'es' },
    { dir: `${BASE}/fr`, lang: 'fr' },
    { dir: `${BASE}/pt`, lang: 'pt' },
  ];

  let processed = 0;
  let skipped   = 0;

  for (const { dir } of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(dir, f));

    for (const fp of files) {
      const ok = processFile(fp, titleMap);
      if (ok) {
        processed++;
        console.log(`  ✓ ${fp.replace(BASE, '').replace(/\\/g, '/')}`);
      } else {
        skipped++;
      }
    }
  }

  console.log(`\nDone. Injected: ${processed} | Skipped: ${skipped}`);
}

run();
