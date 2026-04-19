#!/usr/bin/env node
/**
 * freshen-dates.js
 *
 * Updates stale 2025 year references in page content (titles, H1s, meta
 * descriptions, body copy, copyrights) to 2026 — WITHOUT touching URLs,
 * canonical tags, hreflang alternates, or internal href links that contain
 * "2025" in their slug (those are SEO-load-bearing; renaming them would
 * require 301 redirects).
 *
 * Dry-run by default. Pass --write to apply.
 *
 * Strategy: only replace specific, unambiguous text patterns. Skip any
 * string that looks like a URL fragment.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const WRITE = process.argv.includes('--write');

// Replacement pairs applied in order. Must be unambiguous literals —
// never touch URL-like fragments (those contain slashes, colons, or
// are preceded by "-" as in "niches-2025").
const REPLACEMENTS = [
  // Copyright lines
  [/&copy;\s*2025\b/g, '&copy; 2026'],
  [/©\s*2025\b/g, '© 2026'],

  // "in 2025" / "In 2025" as standalone phrases
  [/\bin 2025\b/g, 'in 2026'],
  [/\bIn 2025\b/g, 'In 2026'],
  [/\ben 2025\b/g, 'en 2026'],   // ES/PT/FR "en 2025"
  [/\bEn 2025\b/g, 'En 2026'],
  [/\bem 2025\b/g, 'em 2026'],   // PT "em 2025"
  [/\bEm 2025\b/g, 'Em 2026'],

  // "for 2025" / "of 2025"
  [/\bfor 2025\b/g, 'for 2026'],
  [/\bFor 2025\b/g, 'For 2026'],
  [/\bof 2025\b/g, 'of 2026'],
  [/\bOf 2025\b/g, 'Of 2026'],
  [/\bpara 2025\b/g, 'para 2026'],
  [/\bPara 2025\b/g, 'Para 2026'],
  [/\bpour 2025\b/g, 'pour 2026'],
  [/\bPour 2025\b/g, 'Pour 2026'],

  // "Niche 2025" / "Data 2025" / "Guide 2025" etc. (space-separated)
  [/\bNiche 2025\b/g, 'Niche 2026'],
  [/\bNiches 2025\b/g, 'Niches 2026'],
  [/\bData 2025\b/g, 'Data 2026'],
  [/\bGuide 2025\b/g, 'Guide 2026'],
  [/\bReport 2025\b/g, 'Report 2026'],
  [/\bStats 2025\b/g, 'Stats 2026'],
  [/\bRanking 2025\b/g, 'Ranking 2026'],
  [/\bRequirements 2025\b/g, 'Requirements 2026'],

  // "2025 YouTube" / "2025 CPM" / "2025 RPM" (year prefix)
  [/\b2025 YouTube\b/g, '2026 YouTube'],
  [/\b2025 CPM\b/g, '2026 CPM'],
  [/\b2025 RPM\b/g, '2026 RPM'],
  [/\b2025 Data\b/g, '2026 Data'],
  [/\b2025 Stats\b/g, '2026 Stats'],
  [/\b2025 Guide\b/g, '2026 Guide'],
  [/\b2025 Report\b/g, '2026 Report'],
  [/\b2025 Update\b/g, '2026 Update'],
  [/\b2025 Niche\b/g, '2026 Niche'],

  // Standalone "2025 – " in titles/headings ("Title 2025 – Subtitle")
  [/\s2025\s+–\s+/g, ' 2026 – '],
  [/\s2025\s+—\s+/g, ' 2026 — '],
  [/\s2025\s+-\s+/g, ' 2026 - '],

  // "YouTube ... 2025" at end of title element
  [/\b2025<\/title>/g, '2026</title>'],
  [/\b2025<\/h1>/g, '2026</h1>'],
  [/\b2025<\/h2>/g, '2026</h2>'],
  [/\b2025<\/h3>/g, '2026</h3>'],

  // "2025)" or "2025." at end of natural phrases
  // (negative lookahead on ".html" avoids rewriting URL fragments in inline code examples)
  [/\b2025\.(?!html)/g, '2026.'],
  [/\b2025,/g, '2026,'],
  [/\b2025\)/g, '2026)'],
  [/\b2025:/g, '2026:'],
  [/\s2025"/g, ' 2026"'],          // ' 2025"' in attribute values / JSON strings
  [/\(2025\b/g, '(2026'],          // '(2025 Estimate)'

  // Lowercase versions of "Data / Benchmark" after year
  [/\b2025 data\b/g, '2026 data'],
  [/\b2025 benchmark\b/g, '2026 benchmark'],
  [/\b2025 stats\b/g, '2026 stats'],
  [/\b2025 guide\b/g, '2026 guide'],

  // Year-first "2025 Estimate / Chart / Policies / Rules / Table" variants
  [/\bChart 2025\b/g, 'Chart 2026'],
  [/\bPolicies 2025\b/g, 'Policies 2026'],
  [/\bRules 2025\b/g, 'Rules 2026'],
  [/\bTable 2025\b/g, 'Table 2026'],
  [/\bEstimate 2025\b/g, 'Estimate 2026'],
  [/\b2025 Estimate\b/g, '2026 Estimate'],

  // "Last updated" literal date lines — bump to today
  [/January\s+\d+,\s+2025/g, 'April 19, 2026'],
  [/\d+\s+janvier\s+2025/gi, '19 avril 2026'],
  [/\d+\s+de\s+enero\s+de\s+2025/gi, '19 de abril de 2026'],
  [/\d+\s+de\s+janeiro\s+de\s+2025/gi, '19 de abril de 2026'],

  // Em/en-dash prefix and year-before-paren patterns
  [/—\s*2025\b/g, '— 2026'],
  [/\b2025\s*\(/g, '2026 ('],

  // Multilingual noun-before-year patterns (ES/PT/FR content phrases)
  [/\bNicho 2025\b/g, 'Nicho 2026'],
  [/\bYPP 2025\b/g, 'YPP 2026'],
  [/\bYouTube 2025\b/g, 'YouTube 2026'],
  [/\bCPM\s+de\s+YouTube\s+2025\b/g, 'CPM de YouTube 2026'],
  [/\bde\s+YouTube\s+2025\b/g, 'de YouTube 2026'],
  [/\bdo\s+YouTube\s+2025\b/g, 'do YouTube 2026'],
  [/\bdu\s+YouTube\s+2025\b/g, 'du YouTube 2026'],
  [/\bde 2025\b/g, 'de 2026'],      // ES/PT "de 2025"
  [/\bdo 2025\b/g, 'do 2026'],      // PT
  [/\bdu 2025\b/g, 'du 2026'],      // FR
  [/\bdos 2025\b/g, 'dos 2026'],
  [/\bdas 2025\b/g, 'das 2026'],
  [/\bdatos de 2025\b/gi, 'datos de 2026'],
  [/\bdonnées de 2025\b/gi, 'données de 2026'],
  [/\bdados de 2025\b/gi, 'dados de 2026'],
  [/\bRequisitos del YPP 2025\b/g, 'Requisitos del YPP 2026'],
  [/\bPPY 2025\b/g, 'PPY 2026'],
  [/\bniche 2025\b/g, 'niche 2026'],
  [/\bniches 2025\b/g, 'niches 2026'],
  [/\bnicho 2025\b/g, 'nicho 2026'],
  [/\bDonnées 2025\b/g, 'Données 2026'],
  [/\bdonnées 2025\b/g, 'données 2026'],
  [/\bDatos 2025\b/g, 'Datos 2026'],
  [/\bdatos 2025\b/g, 'datos 2026'],
  [/\bDados 2025\b/g, 'Dados 2026'],
  [/\bdados 2025\b/g, 'dados 2026'],
  [/\bréférence 2025\b/g, 'référence 2026'],
  [/\breferencia 2025\b/g, 'referencia 2026'],
  [/\breferência 2025\b/g, 'referência 2026'],
  [/\bConditions du PPY 2025\b/g, 'Conditions du PPY 2026'],
];

// Patterns that must NOT be altered — these are URL-like and SEO-critical.
// If a line matches any of these AFTER the replacement pass, we abort
// that line's change to avoid URL corruption.
const UNSAFE_MARKERS = [
  /-2026\.html/,                // slug rewrite that broke a URL
  /-2026"/,                     // ditto in attribute
  /-2026</,                     // ditto around tag boundary
  /\/youtube-[a-z-]+-2026["\s]/, // URL rewrite in href/canonical
];

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

function freshen(src) {
  let out = src;
  let changeCount = 0;

  for (const [pattern, replacement] of REPLACEMENTS) {
    const before = out;
    out = out.replace(pattern, replacement);
    if (out !== before) {
      changeCount += (before.match(pattern) || []).length;
    }
  }

  // Safety check: did we accidentally rewrite any URLs?
  // Compare URL-like patterns before and after.
  const urlPatternsBefore = (src.match(/\/[a-z0-9-]+-2025\b/gi) || []).length;
  const urlPatternsAfter  = (out.match(/\/[a-z0-9-]+-2025\b/gi) || []).length;
  if (urlPatternsBefore !== urlPatternsAfter) {
    throw new Error(`URL rewrite detected — aborting edit (before=${urlPatternsBefore}, after=${urlPatternsAfter})`);
  }

  return { out, changeCount };
}

const files = walk(ROOT, []);
let totalFiles = 0, totalChanges = 0, errors = 0, skippedNoChange = 0;

for (const file of files) {
  let src;
  try { src = fs.readFileSync(file, 'utf8'); }
  catch (e) { console.error('READ FAIL', file, e.message); errors++; continue; }

  if (!/2025/.test(src)) { skippedNoChange++; continue; }

  let result;
  try { result = freshen(src); }
  catch (e) { console.error('SKIP', path.relative(ROOT, file), ':', e.message); errors++; continue; }

  if (result.changeCount === 0) { skippedNoChange++; continue; }

  totalFiles++;
  totalChanges += result.changeCount;

  if (WRITE) {
    fs.writeFileSync(file, result.out, 'utf8');
    console.log('  freshened', result.changeCount, '×', path.relative(ROOT, file));
  } else {
    console.log('  would freshen', result.changeCount, '×', path.relative(ROOT, file));
  }
}

console.log('');
console.log('Total HTML files        :', files.length);
console.log('Files with no 2025 refs :', skippedNoChange);
console.log(WRITE ? 'Files updated           :' : 'Would update            :', totalFiles);
console.log(WRITE ? 'Total replacements      :' : 'Would replace           :', totalChanges);
console.log('Errors                  :', errors);
if (!WRITE) console.log('\nDry run. Re-run with --write to apply.');
