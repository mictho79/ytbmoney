/**
 * setup-adsense.js
 * 1. Replaces placeholder `ca-pub-XXXXXXXXXXXXXXXX` with real publisher ID
 * 2. Injects the AdSense async snippet into <head> of pages missing it
 * 3. Creates /ads.txt at repo root
 *
 * Idempotent: safe to re-run.
 */

const fs   = require('fs');
const path = require('path');

const BASE      = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const PUB_ID    = 'ca-pub-4020973443671350';
const SKIP_DIRS = new Set(['node_modules', '.git', '.superpowers', 'functions']);

const ADSENSE_SNIPPET =
`  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}" crossorigin="anonymous"></script>`;

let placeholdersReplaced = 0;
let snippetsInjected     = 0;
let alreadyHadSnippet    = 0;

function processFile(fp) {
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // 1. Replace placeholder pub ID
  if (html.includes('ca-pub-XXXXXXXXXXXXXXXX')) {
    html = html.replace(/ca-pub-XXXXXXXXXXXXXXXX/g, PUB_ID);
    placeholdersReplaced++;
    changed = true;
  }

  // 2. Inject snippet if missing from <head>
  const hasSnippet = html.includes(`client=${PUB_ID}`) ||
                     html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');

  if (!hasSnippet) {
    // Insert right before </head>
    const newHtml = html.replace(/(\n\s*)<\/head>/i, `\n${ADSENSE_SNIPPET}$1</head>`);
    if (newHtml !== html) {
      html = newHtml;
      snippetsInjected++;
      changed = true;
    }
  } else if (!html.includes(`client=${PUB_ID}`)) {
    // Has a generic adsbygoogle script but not our client — leave alone
    alreadyHadSnippet++;
  } else {
    alreadyHadSnippet++;
  }

  if (changed) fs.writeFileSync(fp, html, 'utf8');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp);
    else if (e.name.endsWith('.html')) processFile(fp);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log(`Setting up AdSense (${PUB_ID})...`);
walk(BASE);

// 3. Create ads.txt
const adsTxt = `google.com, ${PUB_ID.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`;
fs.writeFileSync(path.join(BASE, 'ads.txt'), adsTxt, 'utf8');

console.log(`\n  Placeholders replaced: ${placeholdersReplaced}`);
console.log(`  Snippets injected:     ${snippetsInjected}`);
console.log(`  Already had snippet:   ${alreadyHadSnippet}`);
console.log(`  ads.txt created at root`);
