#!/usr/bin/env node
/**
 * inject-cookie-banner.js
 *
 * One-shot propagator: inserts `<script src="/cookie-banner.js"></script>`
 * right BEFORE the AdSense loader tag on every HTML page that embeds AdSense.
 *
 * - Idempotent: skips any page that already references /cookie-banner.js
 * - Dry-run by default. Pass --write to actually edit files.
 *
 * Usage:
 *   node inject-cookie-banner.js            # preview
 *   node inject-cookie-banner.js --write    # apply
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const WRITE = process.argv.includes('--write');

const ADSENSE_LINE_RE = /<script\s+async\s+src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"]*"[^>]*><\/script>/;
const ALREADY_RE = /cookie-banner\.js/;
const INSERT_TAG = '<script src="/cookie-banner.js"></script>\n';

function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'docs') continue;
      walk(full, acc);
    } else if (name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

const files = walk(ROOT, []);
let skippedNoAds = 0, skippedDone = 0, touched = 0, errors = 0;

for (const file of files) {
  let src;
  try { src = fs.readFileSync(file, 'utf8'); }
  catch (e) { console.error('READ FAIL', file, e.message); errors++; continue; }

  if (!ADSENSE_LINE_RE.test(src)) { skippedNoAds++; continue; }
  if (ALREADY_RE.test(src))       { skippedDone++; continue; }

  const updated = src.replace(ADSENSE_LINE_RE, (match) => {
    // Indent the new tag to match the AdSense line's leading whitespace.
    const lineStart = src.lastIndexOf('\n', src.indexOf(match)) + 1;
    const indent = src.slice(lineStart, src.indexOf(match));
    return INSERT_TAG.replace(/^/, indent).replace(/\n$/, '\n' + indent) + match;
  });

  if (updated === src) { errors++; console.error('NO CHANGE', file); continue; }
  touched++;
  if (WRITE) {
    try { fs.writeFileSync(file, updated, 'utf8'); }
    catch (e) { console.error('WRITE FAIL', file, e.message); errors++; continue; }
    console.log('  injected ->', path.relative(ROOT, file));
  } else {
    console.log('  would inject ->', path.relative(ROOT, file));
  }
}

console.log('');
console.log('Total HTML files scanned :', files.length);
console.log('Already had banner       :', skippedDone);
console.log('No AdSense tag (skipped) :', skippedNoAds);
console.log(WRITE ? 'Injected                 :' : 'Would inject             :', touched);
console.log('Errors                   :', errors);
if (!WRITE) console.log('\nPreview only. Re-run with --write to apply changes.');
