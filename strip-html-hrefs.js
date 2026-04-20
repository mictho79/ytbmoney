#!/usr/bin/env node
/**
 * strip-html-hrefs.js
 *
 * Removes the .html extension from internal page hrefs, e.g.
 *   href="/about.html"            -> href="/about"
 *   href="/fr/foo-bar.html"       -> href="/fr/foo-bar"
 *
 * CF Pages 308-redirects .html URLs to their extension-less form, so every
 * internal link with .html costs a redirect hop and dilutes link equity.
 *
 * Scope:
 * - Only internal hrefs (start with "/")
 * - Only hrefs ending in .html (not asset files)
 * - Leaves <code> block contents alone (those are deliberate code examples)
 * - Leaves sitemap.xml / robots.txt / _headers alone (passed via --ignore)
 *
 * Dry-run by default. Pass --write to apply.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const WRITE = process.argv.includes('--write');

// Match href="/anything.html" — captures the inner path so we can rewrite it.
const HREF_HTML_RE = /href="(\/[^"]*)\.html"/g;

// Asset extensions that look like ".html" preceded by nothing — we still
// shouldn't touch those. But since we anchor on ".html" at the end, any
// .png/.xml/.css/.js is naturally excluded by the regex above.

function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'docs' || name.startsWith('.')) continue;
      walk(full, acc);
    } else if (name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Replace href="/xxx.html" with href="/xxx" — EXCEPT inside <code>...</code>
 * blocks, where the .html text is intentional (widget doc examples).
 */
function stripHtmlHrefs(src) {
  // Split on <code>...</code> to protect code blocks.
  const parts = src.split(/(<code[\s\S]*?<\/code>)/g);
  let replacements = 0;

  const out = parts.map(chunk => {
    if (chunk.startsWith('<code')) return chunk; // leave untouched
    return chunk.replace(HREF_HTML_RE, (match, innerPath) => {
      replacements++;
      return `href="${innerPath}"`;
    });
  }).join('');

  return { out, replacements };
}

const files = walk(ROOT, []);
let totalFiles = 0, totalReplacements = 0, errors = 0;

for (const file of files) {
  let src;
  try { src = fs.readFileSync(file, 'utf8'); }
  catch (e) { console.error('READ FAIL', file, e.message); errors++; continue; }

  const { out, replacements } = stripHtmlHrefs(src);
  if (replacements === 0) continue;

  totalFiles++;
  totalReplacements += replacements;

  if (WRITE) {
    fs.writeFileSync(file, out, 'utf8');
    console.log('  stripped', replacements, '×', path.relative(ROOT, file));
  } else {
    console.log('  would strip', replacements, '×', path.relative(ROOT, file));
  }
}

console.log('');
console.log('Total HTML files :', files.length);
console.log(WRITE ? 'Files modified   :' : 'Would modify     :', totalFiles);
console.log(WRITE ? 'Links stripped   :' : 'Would strip      :', totalReplacements);
console.log('Errors           :', errors);
if (!WRITE) console.log('\nDry run. Re-run with --write to apply.');
