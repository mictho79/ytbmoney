const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/micth/Desktop/dev/seo/claud/ytb';

// ============================================================
// SHARED SNIPPETS
// ============================================================

const AD_SLOT_1 = `<div class="ad-slot-wrap">
  <div class="container">
    <div class="ad-slot">
      <ins class="adsbygoogle" style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
  </div>
</div>`;

const AD_SLOT_2 = `<div class="ad-slot-wrap">
  <div class="container">
    <div class="ad-slot">
      <ins class="adsbygoogle"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="rectangle" style="display:inline-block;width:300px;height:250px"></ins>
    </div>
  </div>
</div>`;

const SCRIPTS = `<script>
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileNav.setAttribute('aria-hidden', String(open));
      mobileNav.classList.toggle('open', !open);
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('open');
      });
    });
  }
</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`;

// ============================================================
// LANGUAGE CONFIGS
// ============================================================

const FR_NAV = `<nav class="main-nav" aria-label="Navigation principale">
          <a href="/fr/">Calculateur</a>
          <a href="/fr/youtube-rpm-guide.html">Guide RPM</a>
          <a href="/fr/youtube-rpm-by-country.html">Par Pays</a>
          <a href="/fr/youtube-shorts-money-calculator.html">Shorts</a>
          <a href="/fr/blog/">Blog</a>
        </nav>`;

const FR_TOGGLE = `<button class="nav-toggle" aria-label="Ouvrir la navigation" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>`;

const FR_MOBILE_NAV = `<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/fr/" class="mobile-nav-link">Calculateur</a>
  <a href="/fr/youtube-rpm-guide.html" class="mobile-nav-link">Guide RPM</a>
  <a href="/fr/youtube-rpm-by-country.html" class="mobile-nav-link">Par Pays</a>
  <a href="/fr/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/fr/blog/" class="mobile-nav-link">Blog</a>
</div>`;

const FR_FOOTER = `<footer class="site-footer" aria-label="Pied de page">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/fr/" class="logo footer-logo" aria-label="Calculateur YouTube">
          <span class="logo-icon" aria-hidden="true">&#9654;$</span>
          <span class="logo-text">YT Money Calculator</span>
        </a>
        <p>Estimateur gratuit de revenus YouTube pour les créateurs. Non affilié à YouTube ou Google.</p>
      </div>
      <div class="footer-col">
        <h4>Outils</h4>
        <ul>
          <li><a href="/fr/">Calculateur YouTube</a></li>
          <li><a href="/fr/youtube-cpm-calculator.html">Calculateur CPM</a></li>
          <li><a href="/fr/youtube-shorts-money-calculator.html">Calculateur Shorts</a></li>
          <li><a href="/fr/youtube-niche-rpm-calculator.html">RPM par Niche</a></li>
          <li><a href="/fr/youtube-earnings-per-video.html">Revenus par Vidéo</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guides</h4>
        <ul>
          <li><a href="/fr/youtube-rpm-guide.html">Guide RPM</a></li>
          <li><a href="/fr/youtube-rpm-by-country.html">RPM par Pays</a></li>
          <li><a href="/fr/how-much-youtube-pays-per-view.html">Combien paye YouTube</a></li>
          <li><a href="/fr/youtube-ad-revenue-by-niche.html">Revenus par Niche</a></li>
          <li><a href="/fr/blog/">Tous les Articles</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>À propos</h4>
        <ul>
          <li><a href="/fr/about.html">À propos</a></li>
          <li><a href="/fr/privacy.html">Politique de confidentialité</a></li>
          <li><a href="/fr/contact.html">Contact</a></li>
          <li><a href="/fr/disclaimer.html">Avertissement</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 YouTube Money Calculator. À titre indicatif uniquement. Non affilié à YouTube ou Google.</p>
    </div>
  </div>
</footer>`;

const ES_NAV = `<nav class="main-nav" aria-label="Navegación principal">
          <a href="/es/">Calculadora</a>
          <a href="/es/youtube-rpm-guide.html">Guía RPM</a>
          <a href="/es/youtube-rpm-by-country.html">Por País</a>
          <a href="/es/youtube-shorts-money-calculator.html">Shorts</a>
          <a href="/es/blog/">Blog</a>
        </nav>`;

const ES_TOGGLE = `<button class="nav-toggle" aria-label="Abrir navegación" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>`;

const ES_MOBILE_NAV = `<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/es/" class="mobile-nav-link">Calculadora</a>
  <a href="/es/youtube-rpm-guide.html" class="mobile-nav-link">Guía RPM</a>
  <a href="/es/youtube-rpm-by-country.html" class="mobile-nav-link">Por País</a>
  <a href="/es/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/es/blog/" class="mobile-nav-link">Blog</a>
</div>`;

const ES_FOOTER = `<footer class="site-footer" aria-label="Pie de página">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/es/" class="logo footer-logo" aria-label="Calculadora YouTube">
          <span class="logo-icon" aria-hidden="true">&#9654;$</span>
          <span class="logo-text">YT Money Calculator</span>
        </a>
        <p>Estimador gratuito de ingresos de YouTube para creadores. No afiliado a YouTube ni a Google.</p>
      </div>
      <div class="footer-col">
        <h4>Herramientas</h4>
        <ul>
          <li><a href="/es/">Calculadora YouTube</a></li>
          <li><a href="/es/youtube-cpm-calculator.html">Calculadora CPM</a></li>
          <li><a href="/es/youtube-shorts-money-calculator.html">Calculadora Shorts</a></li>
          <li><a href="/es/youtube-niche-rpm-calculator.html">RPM por Nicho</a></li>
          <li><a href="/es/youtube-earnings-per-video.html">Ingresos por Vídeo</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guías</h4>
        <ul>
          <li><a href="/es/youtube-rpm-guide.html">Guía RPM</a></li>
          <li><a href="/es/youtube-rpm-by-country.html">RPM por País</a></li>
          <li><a href="/es/how-much-youtube-pays-per-view.html">Cuánto paga YouTube</a></li>
          <li><a href="/es/youtube-ad-revenue-by-niche.html">Ingresos por Nicho</a></li>
          <li><a href="/es/blog/">Todos los Artículos</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <ul>
          <li><a href="/es/about.html">Acerca de</a></li>
          <li><a href="/es/privacy.html">Política de privacidad</a></li>
          <li><a href="/es/contact.html">Contacto</a></li>
          <li><a href="/es/disclaimer.html">Aviso legal</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 YouTube Money Calculator. Solo con fines estimativos. No afiliado a YouTube ni a Google.</p>
    </div>
  </div>
</footer>`;

const PT_NAV = `<nav class="main-nav" aria-label="Navegação principal">
          <a href="/pt/">Calculadora</a>
          <a href="/pt/youtube-rpm-guide.html">Guia RPM</a>
          <a href="/pt/youtube-rpm-by-country.html">Por País</a>
          <a href="/pt/youtube-shorts-money-calculator.html">Shorts</a>
          <a href="/pt/blog/">Blog</a>
        </nav>`;

const PT_TOGGLE = `<button class="nav-toggle" aria-label="Abrir navegação" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>`;

const PT_MOBILE_NAV = `<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <a href="/pt/" class="mobile-nav-link">Calculadora</a>
  <a href="/pt/youtube-rpm-guide.html" class="mobile-nav-link">Guia RPM</a>
  <a href="/pt/youtube-rpm-by-country.html" class="mobile-nav-link">Por País</a>
  <a href="/pt/youtube-shorts-money-calculator.html" class="mobile-nav-link">Shorts</a>
  <a href="/pt/blog/" class="mobile-nav-link">Blog</a>
</div>`;

const PT_FOOTER = `<footer class="site-footer" aria-label="Rodapé do site">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/pt/" class="logo footer-logo" aria-label="Calculadora YouTube">
          <span class="logo-icon" aria-hidden="true">&#9654;$</span>
          <span class="logo-text">YT Money Calculator</span>
        </a>
        <p>Estimador gratuito de ganhos do YouTube para criadores. Não afiliado ao YouTube ou Google.</p>
      </div>
      <div class="footer-col">
        <h4>Ferramentas</h4>
        <ul>
          <li><a href="/pt/">Calculadora YouTube</a></li>
          <li><a href="/pt/youtube-cpm-calculator.html">Calculadora CPM</a></li>
          <li><a href="/pt/youtube-shorts-money-calculator.html">Calculadora Shorts</a></li>
          <li><a href="/pt/youtube-niche-rpm-calculator.html">RPM por Nicho</a></li>
          <li><a href="/pt/youtube-earnings-per-video.html">Ganhos por Vídeo</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guias</h4>
        <ul>
          <li><a href="/pt/youtube-rpm-guide.html">Guia RPM</a></li>
          <li><a href="/pt/youtube-rpm-by-country.html">RPM por País</a></li>
          <li><a href="/pt/how-much-youtube-pays-per-view.html">Quanto paga o YouTube</a></li>
          <li><a href="/pt/youtube-ad-revenue-by-niche.html">Receita por Nicho</a></li>
          <li><a href="/pt/blog/">Todos os Artigos</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <ul>
          <li><a href="/pt/about.html">Sobre</a></li>
          <li><a href="/pt/privacy.html">Política de Privacidade</a></li>
          <li><a href="/pt/contact.html">Contato</a></li>
          <li><a href="/pt/disclaimer.html">Aviso Legal</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 YouTube Money Calculator. Apenas para fins estimativos. Não afiliado ao YouTube ou Google.</p>
    </div>
  </div>
</footer>`;

// ============================================================
// RELATED CALCULATORS
// ============================================================

const RELATED = {
  'fr/youtube-rpm-guide.html': `<section class="related-calculators">
  <div class="container">
    <h2>Plus d'outils YouTube</h2>
    <p class="section-sub">Calculateurs et guides gratuits pour la monétisation YouTube.</p>
    <div class="article-grid">
      <a href="/fr/" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur de revenus YouTube</div>
        <div class="desc">Estimez vos revenus mensuels par vues et RPM.</div>
      </a>
      <a href="/fr/youtube-cpm-calculator.html" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Convertisseur CPM YouTube</div>
        <div class="desc">Convertissez le CPM en RPM et estimez vos gains.</div>
      </a>
      <a href="/fr/youtube-niche-rpm-calculator.html" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur RPM par Niche</div>
        <div class="desc">Estimez le RPM selon votre niche de contenu.</div>
      </a>
    </div>
  </div>
</section>`,

  'fr/youtube-shorts-money-calculator.html': `<section class="related-calculators">
  <div class="container">
    <h2>Plus d'outils YouTube</h2>
    <p class="section-sub">Calculateurs et guides gratuits pour la monétisation YouTube.</p>
    <div class="article-grid">
      <a href="/fr/" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur de revenus YouTube</div>
        <div class="desc">Estimez vos revenus mensuels par vues et RPM.</div>
      </a>
      <a href="/fr/youtube-vs-tiktok-earnings.html" class="article-card">
        <div class="tag">Comparaison</div>
        <div class="title">YouTube vs TikTok</div>
        <div class="desc">Comparez les gains entre YouTube et TikTok.</div>
      </a>
      <a href="/fr/youtube-earnings-per-video.html" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Revenus par Vidéo</div>
        <div class="desc">Calculez les gains estimés par vidéo publiée.</div>
      </a>
    </div>
  </div>
</section>`,

  'fr/how-much-youtube-pays-per-view.html': `<section class="related-calculators">
  <div class="container">
    <h2>Plus d'outils YouTube</h2>
    <p class="section-sub">Calculateurs et guides gratuits pour la monétisation YouTube.</p>
    <div class="article-grid">
      <a href="/fr/" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur de revenus YouTube</div>
        <div class="desc">Estimez vos revenus mensuels par vues et RPM.</div>
      </a>
      <a href="/fr/youtube-views-to-money.html" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Convertisseur Vues en Argent</div>
        <div class="desc">Convertissez vos vues en revenus estimés.</div>
      </a>
      <a href="/fr/youtube-earnings-milestones.html" class="article-card">
        <div class="tag">Guide</div>
        <div class="title">Jalons de Revenus YouTube</div>
        <div class="desc">À combien de vues gagne-t-on sur YouTube ?</div>
      </a>
    </div>
  </div>
</section>`,

  'fr/youtube-rpm-by-country.html': `<section class="related-calculators">
  <div class="container">
    <h2>Plus d'outils YouTube</h2>
    <p class="section-sub">Calculateurs et guides gratuits pour la monétisation YouTube.</p>
    <div class="article-grid">
      <a href="/fr/" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur de revenus YouTube</div>
        <div class="desc">Estimez vos revenus mensuels par vues et RPM.</div>
      </a>
      <a href="/fr/youtube-cpm-by-country.html" class="article-card">
        <div class="tag">Guide</div>
        <div class="title">CPM YouTube par Pays</div>
        <div class="desc">Données CPM pour chaque grande région mondiale.</div>
      </a>
      <a href="/fr/youtube-niche-rpm-calculator.html" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur RPM par Niche</div>
        <div class="desc">Estimez le RPM selon votre niche de contenu.</div>
      </a>
    </div>
  </div>
</section>`,

  'fr/youtube-money-calculator-per-million-views.html': `<section class="related-calculators">
  <div class="container">
    <h2>Plus d'outils YouTube</h2>
    <p class="section-sub">Calculateurs et guides gratuits pour la monétisation YouTube.</p>
    <div class="article-grid">
      <a href="/fr/" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Calculateur de revenus YouTube</div>
        <div class="desc">Estimez vos revenus mensuels par vues et RPM.</div>
      </a>
      <a href="/fr/youtube-income-by-subscribers.html" class="article-card">
        <div class="tag">Guide</div>
        <div class="title">Revenus par Abonnés</div>
        <div class="desc">Combien gagnent les créateurs selon leur nombre d'abonnés ?</div>
      </a>
      <a href="/fr/youtube-earnings-milestones.html" class="article-card">
        <div class="tag">Guide</div>
        <div class="title">Jalons de Revenus YouTube</div>
        <div class="desc">À combien de vues gagne-t-on sur YouTube ?</div>
      </a>
    </div>
  </div>
</section>`,

  'fr/index.html': `<section class="related-calculators">
  <div class="container">
    <h2>Plus d'outils YouTube</h2>
    <p class="section-sub">Calculateurs et guides gratuits pour la monétisation YouTube.</p>
    <div class="article-grid">
      <a href="/fr/youtube-cpm-calculator.html" class="article-card">
        <div class="tag">Calculateur</div>
        <div class="title">Convertisseur CPM YouTube</div>
        <div class="desc">Convertissez le CPM en RPM et estimez vos gains.</div>
      </a>
      <a href="/fr/youtube-rpm-guide.html" class="article-card">
        <div class="tag">Guide</div>
        <div class="title">Guide RPM YouTube</div>
        <div class="desc">Tout ce que vous devez savoir sur le RPM YouTube.</div>
      </a>
      <a href="/fr/youtube-rpm-by-country.html" class="article-card">
        <div class="tag">Guide</div>
        <div class="title">RPM par Pays</div>
        <div class="desc">Comparez les taux RPM selon la région géographique.</div>
      </a>
    </div>
  </div>
</section>`,

  'es/youtube-rpm-guide.html': `<section class="related-calculators">
  <div class="container">
    <h2>Más herramientas de YouTube</h2>
    <p class="section-sub">Calculadoras y guías gratuitas para la monetización de YouTube.</p>
    <div class="article-grid">
      <a href="/es/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ingresos YouTube</div>
        <div class="desc">Estima tus ingresos mensuales por vistas y RPM.</div>
      </a>
      <a href="/es/youtube-cpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora CPM YouTube</div>
        <div class="desc">Convierte el CPM en RPM y estima tus ganancias.</div>
      </a>
      <a href="/es/youtube-niche-rpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora RPM por Nicho</div>
        <div class="desc">Estima el RPM según tu nicho de contenido.</div>
      </a>
    </div>
  </div>
</section>`,

  'es/youtube-shorts-money-calculator.html': `<section class="related-calculators">
  <div class="container">
    <h2>Más herramientas de YouTube</h2>
    <p class="section-sub">Calculadoras y guías gratuitas para la monetización de YouTube.</p>
    <div class="article-grid">
      <a href="/es/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ingresos YouTube</div>
        <div class="desc">Estima tus ingresos mensuales por vistas y RPM.</div>
      </a>
      <a href="/es/youtube-vs-tiktok-earnings.html" class="article-card">
        <div class="tag">Comparación</div>
        <div class="title">YouTube vs TikTok</div>
        <div class="desc">Compara las ganancias entre YouTube y TikTok.</div>
      </a>
      <a href="/es/youtube-earnings-per-video.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Ingresos por Vídeo</div>
        <div class="desc">Calcula las ganancias estimadas por vídeo publicado.</div>
      </a>
    </div>
  </div>
</section>`,

  'es/how-much-youtube-pays-per-view.html': `<section class="related-calculators">
  <div class="container">
    <h2>Más herramientas de YouTube</h2>
    <p class="section-sub">Calculadoras y guías gratuitas para la monetización de YouTube.</p>
    <div class="article-grid">
      <a href="/es/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ingresos YouTube</div>
        <div class="desc">Estima tus ingresos mensuales por vistas y RPM.</div>
      </a>
      <a href="/es/youtube-views-to-money.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Convertidor Vistas a Dinero</div>
        <div class="desc">Convierte tus vistas en ingresos estimados.</div>
      </a>
      <a href="/es/youtube-earnings-milestones.html" class="article-card">
        <div class="tag">Guía</div>
        <div class="title">Hitos de Ingresos YouTube</div>
        <div class="desc">¿A cuántas vistas se empieza a ganar en YouTube?</div>
      </a>
    </div>
  </div>
</section>`,

  'es/youtube-rpm-by-country.html': `<section class="related-calculators">
  <div class="container">
    <h2>Más herramientas de YouTube</h2>
    <p class="section-sub">Calculadoras y guías gratuitas para la monetización de YouTube.</p>
    <div class="article-grid">
      <a href="/es/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ingresos YouTube</div>
        <div class="desc">Estima tus ingresos mensuales por vistas y RPM.</div>
      </a>
      <a href="/es/youtube-cpm-by-country.html" class="article-card">
        <div class="tag">Guía</div>
        <div class="title">CPM de YouTube por País</div>
        <div class="desc">Datos de CPM para cada gran región mundial.</div>
      </a>
      <a href="/es/youtube-niche-rpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora RPM por Nicho</div>
        <div class="desc">Estima el RPM según tu nicho de contenido.</div>
      </a>
    </div>
  </div>
</section>`,

  'es/youtube-money-calculator-per-million-views.html': `<section class="related-calculators">
  <div class="container">
    <h2>Más herramientas de YouTube</h2>
    <p class="section-sub">Calculadoras y guías gratuitas para la monetización de YouTube.</p>
    <div class="article-grid">
      <a href="/es/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ingresos YouTube</div>
        <div class="desc">Estima tus ingresos mensuales por vistas y RPM.</div>
      </a>
      <a href="/es/youtube-income-by-subscribers.html" class="article-card">
        <div class="tag">Guía</div>
        <div class="title">Ingresos por Suscriptores</div>
        <div class="desc">¿Cuánto ganan los creadores según sus suscriptores?</div>
      </a>
      <a href="/es/youtube-earnings-milestones.html" class="article-card">
        <div class="tag">Guía</div>
        <div class="title">Hitos de Ingresos YouTube</div>
        <div class="desc">¿A cuántas vistas se empieza a ganar en YouTube?</div>
      </a>
    </div>
  </div>
</section>`,

  'es/index.html': `<section class="related-calculators">
  <div class="container">
    <h2>Más herramientas de YouTube</h2>
    <p class="section-sub">Calculadoras y guías gratuitas para la monetización de YouTube.</p>
    <div class="article-grid">
      <a href="/es/youtube-cpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora CPM YouTube</div>
        <div class="desc">Convierte el CPM en RPM y estima tus ganancias.</div>
      </a>
      <a href="/es/youtube-rpm-guide.html" class="article-card">
        <div class="tag">Guía</div>
        <div class="title">Guía RPM YouTube</div>
        <div class="desc">Todo lo que necesitas saber sobre el RPM de YouTube.</div>
      </a>
      <a href="/es/youtube-rpm-by-country.html" class="article-card">
        <div class="tag">Guía</div>
        <div class="title">RPM por País</div>
        <div class="desc">Compara las tasas de RPM según la región geográfica.</div>
      </a>
    </div>
  </div>
</section>`,

  'pt/youtube-rpm-guide.html': `<section class="related-calculators">
  <div class="container">
    <h2>Mais ferramentas do YouTube</h2>
    <p class="section-sub">Calculadoras e guias gratuitos para monetização do YouTube.</p>
    <div class="article-grid">
      <a href="/pt/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ganhos YouTube</div>
        <div class="desc">Estime seus ganhos mensais por views e RPM.</div>
      </a>
      <a href="/pt/youtube-cpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora CPM YouTube</div>
        <div class="desc">Converta CPM em RPM e estime seus ganhos.</div>
      </a>
      <a href="/pt/youtube-niche-rpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora RPM por Nicho</div>
        <div class="desc">Estime o RPM conforme seu nicho de conteúdo.</div>
      </a>
    </div>
  </div>
</section>`,

  'pt/youtube-shorts-money-calculator.html': `<section class="related-calculators">
  <div class="container">
    <h2>Mais ferramentas do YouTube</h2>
    <p class="section-sub">Calculadoras e guias gratuitos para monetização do YouTube.</p>
    <div class="article-grid">
      <a href="/pt/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ganhos YouTube</div>
        <div class="desc">Estime seus ganhos mensais por views e RPM.</div>
      </a>
      <a href="/pt/youtube-vs-tiktok-earnings.html" class="article-card">
        <div class="tag">Comparação</div>
        <div class="title">YouTube vs TikTok</div>
        <div class="desc">Compare os ganhos entre YouTube e TikTok.</div>
      </a>
      <a href="/pt/youtube-earnings-per-video.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Ganhos por Vídeo</div>
        <div class="desc">Calcule os ganhos estimados por vídeo publicado.</div>
      </a>
    </div>
  </div>
</section>`,

  'pt/how-much-youtube-pays-per-view.html': `<section class="related-calculators">
  <div class="container">
    <h2>Mais ferramentas do YouTube</h2>
    <p class="section-sub">Calculadoras e guias gratuitos para monetização do YouTube.</p>
    <div class="article-grid">
      <a href="/pt/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ganhos YouTube</div>
        <div class="desc">Estime seus ganhos mensais por views e RPM.</div>
      </a>
      <a href="/pt/youtube-views-to-money.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Conversor Views para Dinheiro</div>
        <div class="desc">Converta suas views em ganhos estimados.</div>
      </a>
      <a href="/pt/youtube-earnings-milestones.html" class="article-card">
        <div class="tag">Guia</div>
        <div class="title">Marcos de Ganhos YouTube</div>
        <div class="desc">Quantas views para começar a ganhar no YouTube?</div>
      </a>
    </div>
  </div>
</section>`,

  'pt/youtube-rpm-by-country.html': `<section class="related-calculators">
  <div class="container">
    <h2>Mais ferramentas do YouTube</h2>
    <p class="section-sub">Calculadoras e guias gratuitos para monetização do YouTube.</p>
    <div class="article-grid">
      <a href="/pt/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ganhos YouTube</div>
        <div class="desc">Estime seus ganhos mensais por views e RPM.</div>
      </a>
      <a href="/pt/youtube-cpm-by-country.html" class="article-card">
        <div class="tag">Guia</div>
        <div class="title">CPM do YouTube por País</div>
        <div class="desc">Dados de CPM para cada grande região mundial.</div>
      </a>
      <a href="/pt/youtube-niche-rpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora RPM por Nicho</div>
        <div class="desc">Estime o RPM conforme seu nicho de conteúdo.</div>
      </a>
    </div>
  </div>
</section>`,

  'pt/youtube-money-calculator-per-million-views.html': `<section class="related-calculators">
  <div class="container">
    <h2>Mais ferramentas do YouTube</h2>
    <p class="section-sub">Calculadoras e guias gratuitos para monetização do YouTube.</p>
    <div class="article-grid">
      <a href="/pt/" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora de ganhos YouTube</div>
        <div class="desc">Estime seus ganhos mensais por views e RPM.</div>
      </a>
      <a href="/pt/youtube-income-by-subscribers.html" class="article-card">
        <div class="tag">Guia</div>
        <div class="title">Ganhos por Inscritos</div>
        <div class="desc">Quanto ganham criadores conforme seus inscritos?</div>
      </a>
      <a href="/pt/youtube-earnings-milestones.html" class="article-card">
        <div class="tag">Guia</div>
        <div class="title">Marcos de Ganhos YouTube</div>
        <div class="desc">Quantas views para começar a ganhar no YouTube?</div>
      </a>
    </div>
  </div>
</section>`,

  'pt/index.html': `<section class="related-calculators">
  <div class="container">
    <h2>Mais ferramentas do YouTube</h2>
    <p class="section-sub">Calculadoras e guias gratuitos para monetização do YouTube.</p>
    <div class="article-grid">
      <a href="/pt/youtube-cpm-calculator.html" class="article-card">
        <div class="tag">Calculadora</div>
        <div class="title">Calculadora CPM YouTube</div>
        <div class="desc">Converta CPM em RPM e estime seus ganhos.</div>
      </a>
      <a href="/pt/youtube-rpm-guide.html" class="article-card">
        <div class="tag">Guia</div>
        <div class="title">Guia RPM YouTube</div>
        <div class="desc">Tudo o que você precisa saber sobre RPM do YouTube.</div>
      </a>
      <a href="/pt/youtube-rpm-by-country.html" class="article-card">
        <div class="tag">Guia</div>
        <div class="title">RPM por País</div>
        <div class="desc">Compare as taxas de RPM por região geográfica.</div>
      </a>
    </div>
  </div>
</section>`,
};

// ============================================================
// FILE CONFIGS
// ============================================================

// For each file: lang, nav, toggle, mobileNav, footer
const FILES = [
  { rel: 'fr/index.html',         lang: 'fr', nav: FR_NAV, toggle: FR_TOGGLE, mobileNav: FR_MOBILE_NAV, footer: FR_FOOTER, isIndex: true },
  { rel: 'fr/youtube-rpm-guide.html', lang: 'fr', nav: FR_NAV, toggle: FR_TOGGLE, mobileNav: FR_MOBILE_NAV, footer: FR_FOOTER },
  { rel: 'fr/youtube-shorts-money-calculator.html', lang: 'fr', nav: FR_NAV, toggle: FR_TOGGLE, mobileNav: FR_MOBILE_NAV, footer: FR_FOOTER },
  { rel: 'fr/how-much-youtube-pays-per-view.html', lang: 'fr', nav: FR_NAV, toggle: FR_TOGGLE, mobileNav: FR_MOBILE_NAV, footer: FR_FOOTER },
  { rel: 'fr/youtube-rpm-by-country.html', lang: 'fr', nav: FR_NAV, toggle: FR_TOGGLE, mobileNav: FR_MOBILE_NAV, footer: FR_FOOTER },
  { rel: 'fr/youtube-money-calculator-per-million-views.html', lang: 'fr', nav: FR_NAV, toggle: FR_TOGGLE, mobileNav: FR_MOBILE_NAV, footer: FR_FOOTER },

  { rel: 'es/index.html',         lang: 'es', nav: ES_NAV, toggle: ES_TOGGLE, mobileNav: ES_MOBILE_NAV, footer: ES_FOOTER, isIndex: true },
  { rel: 'es/youtube-rpm-guide.html', lang: 'es', nav: ES_NAV, toggle: ES_TOGGLE, mobileNav: ES_MOBILE_NAV, footer: ES_FOOTER },
  { rel: 'es/youtube-shorts-money-calculator.html', lang: 'es', nav: ES_NAV, toggle: ES_TOGGLE, mobileNav: ES_MOBILE_NAV, footer: ES_FOOTER },
  { rel: 'es/how-much-youtube-pays-per-view.html', lang: 'es', nav: ES_NAV, toggle: ES_TOGGLE, mobileNav: ES_MOBILE_NAV, footer: ES_FOOTER },
  { rel: 'es/youtube-rpm-by-country.html', lang: 'es', nav: ES_NAV, toggle: ES_TOGGLE, mobileNav: ES_MOBILE_NAV, footer: ES_FOOTER },
  { rel: 'es/youtube-money-calculator-per-million-views.html', lang: 'es', nav: ES_NAV, toggle: ES_TOGGLE, mobileNav: ES_MOBILE_NAV, footer: ES_FOOTER },

  { rel: 'pt/index.html',         lang: 'pt', nav: PT_NAV, toggle: PT_TOGGLE, mobileNav: PT_MOBILE_NAV, footer: PT_FOOTER, isIndex: true },
  { rel: 'pt/youtube-rpm-guide.html', lang: 'pt', nav: PT_NAV, toggle: PT_TOGGLE, mobileNav: PT_MOBILE_NAV, footer: PT_FOOTER },
  { rel: 'pt/youtube-shorts-money-calculator.html', lang: 'pt', nav: PT_NAV, toggle: PT_TOGGLE, mobileNav: PT_MOBILE_NAV, footer: PT_FOOTER },
  { rel: 'pt/how-much-youtube-pays-per-view.html', lang: 'pt', nav: PT_NAV, toggle: PT_TOGGLE, mobileNav: PT_MOBILE_NAV, footer: PT_FOOTER },
  { rel: 'pt/youtube-rpm-by-country.html', lang: 'pt', nav: PT_NAV, toggle: PT_TOGGLE, mobileNav: PT_MOBILE_NAV, footer: PT_FOOTER },
  { rel: 'pt/youtube-money-calculator-per-million-views.html', lang: 'pt', nav: PT_NAV, toggle: PT_TOGGLE, mobileNav: PT_MOBILE_NAV, footer: PT_FOOTER },
];

// ============================================================
// TRANSFORM FUNCTION
// ============================================================

function transformFile(fileConfig) {
  const filepath = path.join(BASE, fileConfig.rel);
  let html = fs.readFileSync(filepath, 'utf8');

  // ---- Change 1a: Insert red-top-bar after <body>
  if (!html.includes('class="red-top-bar"')) {
    html = html.replace(/<body>/, () => '<body>\n\n<div class="red-top-bar"></div>');
  }

  // ---- Change 1b: Replace nav content
  // Replace existing <nav class="main-nav" ...>...</nav> with new nav
  html = html.replace(/<nav class="main-nav"[^>]*>[\s\S]*?<\/nav>/, () => fileConfig.nav);

  // ---- Change 1c: Add/update nav-toggle button
  // Check if nav-toggle exists and update it
  if (html.includes('class="nav-toggle"')) {
    // Replace existing nav-toggle button with proper one (with aria-controls)
    html = html.replace(/<button class="nav-toggle"[^>]*>[\s\S]*?<\/button>/, () => fileConfig.toggle);
  } else {
    // Add toggle button after the nav - search for </nav> and insert after header-inner's nav
    html = html.replace(/<\/nav>\s*(<\/div>\s*<\/div>\s*<\/header>)/, () => '</nav>\n        ' + fileConfig.toggle + '\n      </div>\n    </div>\n  </header>');
  }

  // ---- Change 1d: Add/update mobile nav drawer after </header>
  if (html.includes('id="mobile-nav"')) {
    // Replace existing mobile nav
    html = html.replace(/<div class="mobile-nav" id="mobile-nav"[^>]*>[\s\S]*?<\/div>/, () => fileConfig.mobileNav);
  } else {
    // Add mobile nav after </header>
    html = html.replace('</header>', () => '</header>\n\n' + fileConfig.mobileNav);
  }

  // ---- Change 2: Add accent-line after first </h1> only
  if (!html.includes('class="accent-line"')) {
    let first = true;
    html = html.replace(/<\/h1>/g, (m) => {
      if (first) { first = false; return '</h1>\n        <div class="accent-line"></div>'; }
      return m;
    });
  }

  // ---- Change 3: Insert ad slots
  // Use function-based replace to avoid $ interpolation issues
  if (!html.includes('ad-slot-wrap')) {
    // Slot 1: after hero section closing tag
    const heroSectionPattern = /(<section class="hero"[\s\S]*?<\/section>)/;
    if (heroSectionPattern.test(html)) {
      html = html.replace(heroSectionPattern, (m) => m + '\n\n' + AD_SLOT_1);
    }

    // Slot 2: after main calculator/content section
    const calcPattern = /(<section class="(?:calculator-section|content-section)"[\s\S]*?<\/section>)/;
    if (calcPattern.test(html)) {
      html = html.replace(calcPattern, (m) => m + '\n\n' + AD_SLOT_2);
    }
  }

  // ---- Change 4: Related calculators section before footer
  const relatedContent = RELATED[fileConfig.rel];
  if (relatedContent && !html.includes('class="related-calculators"')) {
    html = html.replace(/\s*<footer /, () => '\n\n' + relatedContent + '\n\n  <footer ');
  }

  // ---- Change 5: Replace footer
  // Replace entire footer block - use function to avoid $ interpolation
  html = html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, () => fileConfig.footer);

  // ---- Change 6: Scripts before </body>
  if (!html.includes('adsbygoogle.js')) {
    // If there's a <script src="/script.js"> before </body>, insert before that
    if (html.includes('<script src="/script.js"></script>')) {
      // Handle both LF and CRLF line endings
      html = html.replace(/<script src="\/script\.js"><\/script>(\r?\n)<\/body>/, () => SCRIPTS + '\n  <script src="/script.js"></script>\n</body>');
    } else {
      html = html.replace(/<\/body>/, () => SCRIPTS + '\n</body>');
    }
  }

  fs.writeFileSync(filepath, html, 'utf8');
  console.log('  OK: ' + fileConfig.rel);
}

// ============================================================
// MAIN
// ============================================================

let errors = 0;
for (const fc of FILES) {
  try {
    transformFile(fc);
  } catch (e) {
    console.error('  ERROR ' + fc.rel + ': ' + e.message);
    errors++;
  }
}

if (errors === 0) {
  console.log('\nAll 18 files transformed successfully.');
} else {
  console.log('\nDone with ' + errors + ' error(s).');
}
