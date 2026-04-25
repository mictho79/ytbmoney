#!/usr/bin/env node
/**
 * fix-dataset-schema.js
 *
 * GSC flagged "Dataset" structured-data blocks across 24 pages (6 templates
 * × 4 languages) for missing recommended fields:
 *   - creator (recommended)
 *   - license  (recommended)
 *
 * This patcher injects both fields into every <script type="application/ld+json">
 * block whose @type is "Dataset". Idempotent (skips blocks that already have
 * the fields). Dry-run by default.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const WRITE = process.argv.includes('--write');

const CREATOR_BLOCK = `\n    "creator": {\n      "@type": "Organization",\n      "name": "YouTube Money Calculator",\n      "url": "https://ytbearnings.com"\n    },\n    "license": "https://creativecommons.org/licenses/by/4.0/",`;

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

const files = walk(ROOT, []);
let touched = 0;

for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  if (!src.includes('"@type": "Dataset"') && !src.includes('"@type":"Dataset"')) continue;
  if (src.includes('"creator":') && src.includes('"license":')) continue; // idempotent

  // Insert creator + license right after the "@type": "Dataset" line.
  // Match either "@type": "Dataset" or "@type":"Dataset" (with/without space).
  const re = /("@type":\s*"Dataset",)/g;
  const before = src;
  src = src.replace(re, '$1' + CREATOR_BLOCK);
  if (src === before) continue;

  touched++;
  if (WRITE) {
    fs.writeFileSync(f, src, 'utf8');
    console.log('  patched', path.relative(ROOT, f));
  } else {
    console.log('  would patch', path.relative(ROOT, f));
  }
}

console.log('');
console.log(WRITE ? 'Files patched :' : 'Would patch   :', touched);
if (!WRITE) console.log('\nDry run. Re-run with --write to apply.');
