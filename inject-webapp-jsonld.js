/**
 * inject-webapp-jsonld.js
 * Adds a WebApplication JSON-LD block to calculator pages across all langs.
 * Idempotent — skips pages that already have "WebApplication" schema.
 */

const fs   = require('fs');
const path = require('path');

const BASE   = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';
const DOMAIN = 'https://ytbearnings.com';

// Calculator pages by slug + metadata
const CALCULATORS = [
  { slug: 'index',                                name: 'YouTube Money Calculator',          desc: 'Estimate YouTube ad revenue from views, RPM, and audience location.' },
  { slug: 'youtube-shorts-money-calculator',      name: 'YouTube Shorts Money Calculator',   desc: 'Calculate estimated YouTube Shorts earnings based on views and Shorts RPM.' },
  { slug: 'youtube-cpm-calculator',               name: 'YouTube CPM Calculator',            desc: 'Calculate effective YouTube CPM and compare rates across countries.' },
  { slug: 'youtube-niche-rpm-calculator',         name: 'YouTube Niche RPM Calculator',      desc: 'Calculate your estimated YouTube RPM based on your content niche.' },
  { slug: 'youtube-channel-earnings-calculator',  name: 'YouTube Channel Earnings Calculator', desc: 'Estimate your entire YouTube channel\'s monthly and yearly earnings.' },
  { slug: 'youtube-watch-hours-calculator',       name: 'YouTube Watch Hours Calculator',    desc: 'Calculate watch hours needed to reach YouTube monetization thresholds.' },
  { slug: 'youtube-monetization-calculator',      name: 'YouTube Monetization Calculator',   desc: 'Calculate when your YouTube channel will qualify for monetization.' },
  { slug: 'youtube-money-calculator-per-million-views', name: 'YouTube Earnings Per Million Views', desc: 'Calculate YouTube earnings for 1 million views across all niches.' },
];

const NAME_I18N = {
  es: {
    'YouTube Money Calculator':               'Calculadora de dinero de YouTube',
    'YouTube Shorts Money Calculator':        'Calculadora de dinero de YouTube Shorts',
    'YouTube CPM Calculator':                 'Calculadora CPM de YouTube',
    'YouTube Niche RPM Calculator':           'Calculadora de RPM por nicho de YouTube',
    'YouTube Channel Earnings Calculator':    'Calculadora de ganancias del canal de YouTube',
    'YouTube Watch Hours Calculator':         'Calculadora de horas de visualización de YouTube',
    'YouTube Monetization Calculator':        'Calculadora de monetización de YouTube',
    'YouTube Earnings Per Million Views':     'Ganancias de YouTube por millón de vistas',
  },
  fr: {
    'YouTube Money Calculator':               'Calculateur de revenus YouTube',
    'YouTube Shorts Money Calculator':        'Calculateur de revenus YouTube Shorts',
    'YouTube CPM Calculator':                 'Calculateur CPM YouTube',
    'YouTube Niche RPM Calculator':           'Calculateur RPM par niche YouTube',
    'YouTube Channel Earnings Calculator':    'Calculateur de revenus de chaîne YouTube',
    'YouTube Watch Hours Calculator':         'Calculateur d\'heures de visionnage YouTube',
    'YouTube Monetization Calculator':        'Calculateur de monétisation YouTube',
    'YouTube Earnings Per Million Views':     'Revenus YouTube par million de vues',
  },
  pt: {
    'YouTube Money Calculator':               'Calculadora de ganhos do YouTube',
    'YouTube Shorts Money Calculator':        'Calculadora de ganhos do YouTube Shorts',
    'YouTube CPM Calculator':                 'Calculadora CPM do YouTube',
    'YouTube Niche RPM Calculator':           'Calculadora de RPM por nicho do YouTube',
    'YouTube Channel Earnings Calculator':    'Calculadora de ganhos do canal YouTube',
    'YouTube Watch Hours Calculator':         'Calculadora de horas de visualização YouTube',
    'YouTube Monetization Calculator':        'Calculadora de monetização YouTube',
    'YouTube Earnings Per Million Views':     'Ganhos do YouTube por milhão de visualizações',
  },
};

const LANGS = ['', 'es', 'fr', 'pt'];

function buildJsonLd(name, desc, url) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description: desc,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'YouTube Money Calculator', url: DOMAIN },
  };
  return `  <script type="application/ld+json">
${JSON.stringify(obj, null, 2).split('\n').map(l => '  ' + l).join('\n')}
  </script>`;
}

let injected = 0;
let skipped  = 0;

for (const lang of LANGS) {
  const langDir = lang ? path.join(BASE, lang) : BASE;

  for (const calc of CALCULATORS) {
    const fileName = `${calc.slug}.html`;       // disk file (always .html)
    const urlSlug  = calc.slug === 'index' ? '' : calc.slug;  // URL path (clean, no .html)
    const fp = path.join(langDir, fileName);
    if (!fs.existsSync(fp)) continue;

    let html = fs.readFileSync(fp, 'utf8');

    // Skip if WebApplication schema already present
    if (html.includes('"WebApplication"') || html.includes('"@type": "WebApplication"')) {
      skipped++;
      continue;
    }

    // Build localized name and URL (clean URL, no .html)
    const name = lang ? (NAME_I18N[lang][calc.name] || calc.name) : calc.name;
    const url  = lang ? `${DOMAIN}/${lang}/${urlSlug}`
                      : `${DOMAIN}/${urlSlug}`;

    const jsonLd = buildJsonLd(name, calc.desc, url);

    // Inject right before </head>
    const newHtml = html.replace(/(\n\s*)<\/head>/i, `\n${jsonLd}$1</head>`);
    if (newHtml === html) {
      console.log(`  ⚠ Could not inject into ${fp.replace(BASE, '').replace(/\\/g, '/')} (no </head>)`);
      continue;
    }

    fs.writeFileSync(fp, newHtml, 'utf8');
    injected++;
    console.log(`  ✓ ${(lang ? `${lang}/` : '')}${fileName}`);
  }
}

console.log(`\nDone. Injected: ${injected} | Skipped (already had WebApplication): ${skipped}`);
