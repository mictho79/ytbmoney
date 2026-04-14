/**
 * strip-html-from-urls.js
 * Cloudflare Pages redirects /slug.html → /slug with 308.
 * This script aligns all URL references with the final clean URL:
 *  - canonical tags
 *  - og:url / og:image URLs (only .html parts, og-image stays)
 *  - hreflang href URLs
 *  - JSON-LD url fields
 *  - sitemap.xml <loc> entries
 *  - internal <a href> links (so users avoid the redirect hop)
 *
 * File names on disk stay as .html (Cloudflare serves them at clean URL).
 */

const fs   = require('fs');
const path = require('path');

const BASE      = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const SITEMAP   = path.join(BASE, 'sitemap.xml');
const SKIP_DIRS = new Set(['node_modules', '.git', '.superpowers', 'functions']);

let filesChanged = 0;
let totalReplacements = 0;

function stripHtmlUrls(content) {
  let count = 0;
  let out = content;

  // 1. Absolute URLs in attributes: href/content="https://ytbearnings.com/anything.html"
  out = out.replace(
    /((?:href|content|url)\s*[:=]?\s*["']?)(https:\/\/ytbearnings\.com\/[^"'\s>]+?)\.html(["'<\s>])/g,
    (m, pre, url, post) => { count++; return `${pre}${url}${post}`; }
  );

  // 2. Relative root-relative URLs: href="/anything.html"
  //    But NOT files like style.css/script.js (no .html match anyway)
  //    Excluding .html via mailto, tel, external http://
  out = out.replace(
    /(href\s*=\s*["'])(\/[a-z0-9][a-z0-9\/-]*?)\.html(["#?])/gi,
    (m, pre, pathOnly, post) => { count++; return `${pre}${pathOnly}${post}`; }
  );

  // 3. JSON-LD "url": "https://ytbearnings.com/anything.html"
  out = out.replace(
    /("url"\s*:\s*"https:\/\/ytbearnings\.com\/[^"]+?)\.html(")/g,
    (m, pre, post) => { count++; return `${pre}${post}`; }
  );

  // 4. Sitemap <loc>
  out = out.replace(
    /(<loc>https:\/\/ytbearnings\.com\/[^<]+?)\.html(<\/loc>)/g,
    (m, pre, post) => { count++; return `${pre}${post}`; }
  );

  return { out, count };
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(fp);
    } else if (e.name.endsWith('.html') || e.name === 'sitemap.xml') {
      const content = fs.readFileSync(fp, 'utf8');
      const { out, count } = stripHtmlUrls(content);
      if (count > 0 && out !== content) {
        fs.writeFileSync(fp, out, 'utf8');
        filesChanged++;
        totalReplacements += count;
      }
    }
  }
}

console.log('Stripping .html from URLs across site...');
walk(BASE);
console.log(`\nFiles modified: ${filesChanged}`);
console.log(`Total URL .html strips: ${totalReplacements}`);
