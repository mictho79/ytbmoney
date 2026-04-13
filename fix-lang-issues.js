/**
 * fix-lang-issues.js
 * Phase 1: Create ES/FR/PT versions of about/contact/privacy/disclaimer
 * Phase 2: Fix remaining root-level EN body links in ES/FR/PT pages
 *
 * Run: node fix-lang-issues.js
 */

const fs   = require('fs');
const path = require('path');

const BASE  = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const LANGS = ['es', 'fr', 'pt'];
const UTILITY_PAGES = ['about', 'contact', 'privacy', 'disclaimer'];

// Translated page titles for utility pages
const TITLES = {
  es: {
    about:      'Acerca de – Calculadora de Dinero de YouTube',
    contact:    'Contacto – Calculadora de Dinero de YouTube',
    privacy:    'Política de Privacidad – Calculadora de Dinero de YouTube',
    disclaimer: 'Aviso Legal – Calculadora de Dinero de YouTube',
  },
  fr: {
    about:      'À propos – Calculateur de Revenus YouTube',
    contact:    'Contact – Calculateur de Revenus YouTube',
    privacy:    'Politique de Confidentialité – Calculateur de Revenus YouTube',
    disclaimer: 'Avertissement – Calculateur de Revenus YouTube',
  },
  pt: {
    about:      'Sobre – Calculadora de Ganhos do YouTube',
    contact:    'Contato – Calculadora de Ganhos do YouTube',
    privacy:    'Política de Privacidade – Calculadora de Ganhos do YouTube',
    disclaimer: 'Aviso Legal – Calculadora de Ganhos do YouTube',
  },
};

// ─── Helper: fix all body links for a given lang ──────────────────────────────
function fixBodyLinks(html, lang, langFiles) {
  const bodyIdx = html.indexOf('<body');
  if (bodyIdx === -1) return html;

  const head = html.slice(0, bodyIdx);
  let body   = html.slice(bodyIdx);

  // href="/" → href="/{lang}/"
  body = body.replace(/href="\/"/g, `href="/${lang}/"`);

  // href="/#anchor" → href="/{lang}/#anchor"
  body = body.replace(/href="\/(#[^"]+)"/g, `href="/${lang}/$1"`);

  // href="/slug.html" → href="/{lang}/slug.html"
  // Only when the file exists in langDir OR is a utility page we're creating
  body = body.replace(/href="\/([a-z][a-z0-9-]*\.html)"/g, (match, filename) => {
    const slug = path.basename(filename, '.html');
    if (langFiles.has(filename) || UTILITY_PAGES.includes(slug)) {
      return `href="/${lang}/${filename}"`;
    }
    return match;
  });

  return head + body;
}

// ─── Phase 1: Create utility pages ───────────────────────────────────────────
function createUtilityPages() {
  let created = 0;

  for (const lang of LANGS) {
    const langDir = path.join(BASE, lang);
    if (!fs.existsSync(langDir)) continue;

    const langFiles = new Set(
      fs.readdirSync(langDir).filter(f => f.endsWith('.html'))
    );

    for (const page of UTILITY_PAGES) {
      const targetPath = path.join(langDir, `${page}.html`);
      if (fs.existsSync(targetPath)) {
        console.log(`  Skip (exists): ${lang}/${page}.html`);
        continue;
      }

      const sourcePath = path.join(BASE, `${page}.html`);
      if (!fs.existsSync(sourcePath)) continue;

      let html = fs.readFileSync(sourcePath, 'utf8');

      // Fix lang attribute
      html = html.replace(/(<html\s+lang=")[^"]*(")/i, `$1${lang}$2`);

      // Fix <title>
      const newTitle = TITLES[lang][page];
      if (newTitle) {
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);
      }

      // Fix canonical + og:url full URLs: .../page.html → .../{lang}/page.html
      html = html.replace(
        new RegExp(`(https://[^"]+)/${page}\\.html`, 'g'),
        `$1/${lang}/${page}.html`
      );

      // Fix body links
      html = fixBodyLinks(html, lang, langFiles);

      fs.writeFileSync(targetPath, html, 'utf8');
      created++;
      console.log(`  Created: ${lang}/${page}.html`);
    }
  }

  return created;
}

// ─── Phase 2: Fix remaining EN body links in existing pages ──────────────────
function fixExistingPages() {
  let fixed = 0;

  for (const lang of LANGS) {
    const langDir = path.join(BASE, lang);
    if (!fs.existsSync(langDir)) continue;

    // Rebuild langFiles AFTER phase 1 created utility pages
    const langFiles = new Set(
      fs.readdirSync(langDir).filter(f => f.endsWith('.html'))
    );

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));

    for (const file of files) {
      const fp = path.join(langDir, file);
      const html = fs.readFileSync(fp, 'utf8');

      const newHtml = fixBodyLinks(html, lang, langFiles);

      if (newHtml !== html) {
        fs.writeFileSync(fp, newHtml, 'utf8');
        fixed++;
        console.log(`  Fixed: ${lang}/${file}`);
      }
    }
  }

  return fixed;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('=== Phase 1: Creating utility pages ===');
const created = createUtilityPages();
console.log(`\nCreated: ${created} utility pages\n`);

console.log('=== Phase 2: Fixing body links ===');
const fixed = fixExistingPages();
console.log(`\nFixed: ${fixed} files\n`);

console.log('All done.');
