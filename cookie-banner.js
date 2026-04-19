/* =========================================
   Cookie Consent Banner + Google Consent Mode v2
   Loads BEFORE AdSense so default=denied signals reach the SDK.
   Vanilla JS, no dependencies. Self-injecting.
   ========================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'yt_consent_v1';
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) { /* Safari private mode */ }

  // ---- Google Consent Mode v2 ----
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var initialState = saved === 'granted' ? 'granted' : 'denied';
  gtag('consent', 'default', {
    ad_storage:         initialState,
    ad_user_data:       initialState,
    ad_personalization: initialState,
    analytics_storage:  initialState,
    wait_for_update:    500
  });

  if (saved === 'granted' || saved === 'denied') return; // decision already made

  // ---- i18n ----
  var lang = (document.documentElement.lang || 'en').split('-')[0];
  var STR = {
    en: {
      text:    'We use cookies and similar tech to serve ads (Google AdSense) and measure audience. You can accept or reject non-essential cookies. Your choice is saved for 6 months.',
      accept:  'Accept all',
      reject:  'Reject non-essential',
      more:    'Privacy policy',
      privacy: '/privacy.html'
    },
    fr: {
      text:    'Nous utilisons des cookies et technologies similaires pour diffuser des publicités (Google AdSense) et mesurer l\u2019audience. Vous pouvez accepter ou refuser les cookies non essentiels. Votre choix est conservé 6 mois.',
      accept:  'Tout accepter',
      reject:  'Refuser les non-essentiels',
      more:    'Politique de confidentialité',
      privacy: '/fr/privacy.html'
    },
    es: {
      text:    'Usamos cookies y tecnologías similares para mostrar anuncios (Google AdSense) y medir la audiencia. Puedes aceptar o rechazar las cookies no esenciales. Tu elección se guarda durante 6 meses.',
      accept:  'Aceptar todo',
      reject:  'Rechazar no esenciales',
      more:    'Política de privacidad',
      privacy: '/es/privacy.html'
    },
    pt: {
      text:    'Usamos cookies e tecnologias similares para exibir anúncios (Google AdSense) e medir a audiência. Você pode aceitar ou recusar os cookies não essenciais. Sua escolha é mantida por 6 meses.',
      accept:  'Aceitar tudo',
      reject:  'Recusar não essenciais',
      more:    'Política de privacidade',
      privacy: '/pt/privacy.html'
    }
  };
  var t = STR[lang] || STR.en;

  // ---- Banner DOM ----
  function injectBanner() {
    if (document.getElementById('cookie-banner')) return;
    var style = document.createElement('style');
    style.textContent =
      '#cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
      'background:#111;color:#fff;border-radius:12px;padding:16px 20px;' +
      'box-shadow:0 10px 40px rgba(0,0,0,.35);font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
      'max-width:760px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:12px;}' +
      '#cookie-banner p{margin:0;flex:1 1 260px;color:#e5e7eb;}' +
      '#cookie-banner a{color:#fff;text-decoration:underline;}' +
      '#cookie-banner .cb-actions{display:flex;gap:8px;flex-wrap:wrap;}' +
      '#cookie-banner button{font:600 13px/1 inherit;border:none;border-radius:100px;padding:10px 16px;cursor:pointer;}' +
      '#cookie-banner .cb-accept{background:#FF0000;color:#fff;}' +
      '#cookie-banner .cb-accept:hover{background:#d70000;}' +
      '#cookie-banner .cb-reject{background:#1f2937;color:#fff;border:1px solid #374151;}' +
      '#cookie-banner .cb-reject:hover{background:#111827;}' +
      '@media (max-width:480px){#cookie-banner{padding:14px 16px;} #cookie-banner button{flex:1 1 auto;}}';
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.accept);
    banner.innerHTML =
      '<p>' + t.text + ' <a href="' + t.privacy + '">' + t.more + '</a></p>' +
      '<div class="cb-actions">' +
        '<button type="button" class="cb-reject">' + t.reject + '</button>' +
        '<button type="button" class="cb-accept">' + t.accept + '</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cb-accept').addEventListener('click', function () { setConsent('granted'); });
    banner.querySelector('.cb-reject').addEventListener('click', function () { setConsent('denied'); });
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
    gtag('consent', 'update', {
      ad_storage:         value,
      ad_user_data:       value,
      ad_personalization: value,
      analytics_storage:  value
    });
    var el = document.getElementById('cookie-banner');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBanner);
  } else {
    injectBanner();
  }
})();
