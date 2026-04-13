/**
 * rename-domain.js
 * Replaces all occurrences of `ytbearnings.com` with `ytbearnings.com`
 * across HTML, XML, TXT, JSON, webmanifest, SVG, CSS, JS files.
 *
 * Run: node rename-domain.js
 */

const fs   = require('fs');
const path = require('path');

const BASE = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const OLD  = 'ytbearnings.com';
const NEW  = 'ytbearnings.com';

const EXTS = new Set(['.html', '.xml', '.txt', '.json', '.webmanifest', '.svg', '.css', '.js']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.superpowers']);

let scanned = 0;
let changed = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(fp);
    } else if (EXTS.has(path.extname(e.name).toLowerCase())) {
      scanned++;
      const content = fs.readFileSync(fp, 'utf8');
      if (content.includes(OLD)) {
        const updated = content.split(OLD).join(NEW);
        fs.writeFileSync(fp, updated, 'utf8');
        changed++;
        console.log(`  ✓ ${path.relative(BASE, fp).replace(/\\/g, '/')}`);
      }
    }
  }
}

console.log(`Renaming "${OLD}" → "${NEW}"\n`);
walk(BASE);
console.log(`\nScanned: ${scanned} | Changed: ${changed}`);
