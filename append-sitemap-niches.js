/**
 * Append translated niche URLs (es/fr/pt × 12) to sitemap.xml
 * Run once — idempotent via duplicate-check on loc.
 */
const fs   = require('fs');
const path = require('path');

const BASE    = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const SITEMAP = path.join(BASE, 'sitemap.xml');
const DOMAIN  = 'https://ytbearnings.com';
const TODAY   = '2026-04-14';

const SLUGS = [
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
];
const LANGS = ['es', 'fr', 'pt'];

let xml = fs.readFileSync(SITEMAP, 'utf8');
let added = 0;

const entries = [];
for (const lang of LANGS) {
  for (const slug of SLUGS) {
    const loc = `${DOMAIN}/${lang}/${slug}.html`;
    if (xml.includes(loc)) continue; // already present
    entries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    added++;
  }
}

if (added > 0) {
  xml = xml.replace('</urlset>', entries.join('\n') + '\n\n</urlset>');
  fs.writeFileSync(SITEMAP, xml, 'utf8');
}

console.log(`Added ${added} URLs to sitemap.xml`);
