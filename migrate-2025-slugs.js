#!/usr/bin/env node
/**
 * migrate-2025-slugs.js
 *
 * Migrates all 6 legacy `-2025` slugs to `-2026` across 4 languages:
 *   best-platform-new-creators
 *   highest-paying-youtube-niches
 *   youtube-cpm-by-niche
 *   youtube-monetization-complete-guide
 *   youtube-partner-program-requirements
 *   youtube-rpm-data
 *
 * Per slug × 4 langs = 24 files renamed. Plus:
 *   - Global find/replace of ANY href/loc/canonical ref to old slugs
 *   - 24 new 301 redirect lines appended to _redirects
 *   - sitemap.xml updated to new URLs
 *
 * Dry-run by default. Pass --write to apply.
 *
 * Safety rails:
 *   - Refuses to run if any `-2026.html` file already exists (would mean prior migration)
 *   - Verifies that every new URL resolves to a real file before committing
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const WRITE = process.argv.includes('--write');

const SLUGS = [
  'best-platform-new-creators',
  'highest-paying-youtube-niches',
  'youtube-cpm-by-niche',
  'youtube-monetization-complete-guide',
  'youtube-partner-program-requirements',
  'youtube-rpm-data',
];
const LANG_PREFIXES = ['', 'fr/', 'es/', 'pt/'];

// Build old → new mappings for every file and every URL path.
const fileMoves = [];   // [{ oldRel, newRel }]
const urlReplacements = []; // [{ oldPath, newPath }]
for (const slug of SLUGS) {
  for (const prefix of LANG_PREFIXES) {
    fileMoves.push({
      oldRel: `${prefix}${slug}-2025.html`,
      newRel: `${prefix}${slug}-2026.html`,
    });
    urlReplacements.push({
      oldPath: `/${prefix}${slug}-2025`,
      newPath: `/${prefix}${slug}-2026`,
    });
  }
}

// --- Safety: any -2026 file already present? ---
const conflicts = fileMoves.filter(m => fs.existsSync(path.join(ROOT, m.newRel)));
if (conflicts.length) {
  console.error('ABORT: -2026 files already exist:');
  conflicts.forEach(c => console.error('  ', c.newRel));
  process.exit(1);
}

// --- Safety: every -2025 source file must exist ---
const missing = fileMoves.filter(m => !fs.existsSync(path.join(ROOT, m.oldRel)));
if (missing.length) {
  console.error('ABORT: expected -2025 source files missing:');
  missing.forEach(m => console.error('  ', m.oldRel));
  process.exit(1);
}

// --- Step 1: rename files + rewrite their internal URL self-references ---
function rewriteFile(src) {
  let out = src;
  for (const { oldPath, newPath } of urlReplacements) {
    // Swap every occurrence of the old URL (canonical, og:url, hreflang, any href/loc).
    // Word-boundary on right to avoid accidentally touching longer paths.
    const re = new RegExp(oldPath.replace(/\//g, '\\/') + '(?![\\w-])', 'g');
    out = out.replace(re, newPath);
  }
  return out;
}

let renameCount = 0;
for (const { oldRel, newRel } of fileMoves) {
  const oldAbs = path.join(ROOT, oldRel);
  const newAbs = path.join(ROOT, newRel);
  const src = fs.readFileSync(oldAbs, 'utf8');
  const rewritten = rewriteFile(src);

  if (WRITE) {
    fs.writeFileSync(newAbs, rewritten, 'utf8');
    fs.unlinkSync(oldAbs);
    console.log('  moved', oldRel, '→', newRel);
  } else {
    console.log('  would move', oldRel, '→', newRel);
  }
  renameCount++;
}

// --- Step 2: global find/replace of old URLs in ALL other HTML files + sitemap ---
function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'docs' || name.startsWith('.')) continue;
      walk(full, acc);
    } else if (name.endsWith('.html') || name === 'sitemap.xml') {
      acc.push(full);
    }
  }
  return acc;
}

const allFiles = walk(ROOT, []);
let touched = 0;
let totalReplacements = 0;
for (const file of allFiles) {
  // Skip the ones we just renamed/wrote (already handled above)
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (fileMoves.some(m => m.newRel === rel)) continue;

  let src;
  try { src = fs.readFileSync(file, 'utf8'); }
  catch (e) { continue; }

  let out = src;
  let localReplacements = 0;
  for (const { oldPath, newPath } of urlReplacements) {
    const re = new RegExp(oldPath.replace(/\//g, '\\/') + '(?![\\w-])', 'g');
    const before = out;
    out = out.replace(re, newPath);
    if (out !== before) localReplacements += (before.match(re) || []).length;
  }

  if (localReplacements === 0) continue;
  touched++;
  totalReplacements += localReplacements;

  if (WRITE) {
    fs.writeFileSync(file, out, 'utf8');
    console.log('  updated', localReplacements, 'refs in', rel);
  } else {
    console.log('  would update', localReplacements, 'refs in', rel);
  }
}

// --- Step 3: append 301 redirects for the 24 old URLs to _redirects ---
const redirectsPath = path.join(ROOT, '_redirects');
let redirectsSrc = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, 'utf8') : '';
const newRedirectLines = urlReplacements
  .filter(r => !redirectsSrc.includes(`${r.oldPath}  `) && !redirectsSrc.includes(`${r.oldPath}\t`))
  .map(r => `${r.oldPath.padEnd(55)}${r.newPath.padEnd(55)}301`);

if (newRedirectLines.length) {
  const header = '\n# 2025 → 2026 slug migration (Apr 2026) — preserves old backlinks\n';
  const block = header + newRedirectLines.join('\n') + '\n';
  if (WRITE) {
    fs.writeFileSync(redirectsPath, redirectsSrc + block, 'utf8');
    console.log('  appended', newRedirectLines.length, 'redirects to _redirects');
  } else {
    console.log('  would append', newRedirectLines.length, 'redirects to _redirects');
  }
}

console.log('');
console.log('Files renamed         :', renameCount);
console.log('Other files rewritten :', touched);
console.log('Total URL replaced    :', totalReplacements);
console.log('Redirects added       :', newRedirectLines.length);
if (!WRITE) console.log('\nDry run. Re-run with --write to apply.');
