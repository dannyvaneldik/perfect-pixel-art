/**
 * SEO meta tag injection for Danny van Eldik
 * Keywords focus: 'Abstracte kunst voor woonkamer', 'Natuurfotografie op maat'
 */
(function () {
  const SITE_NAME = 'Danny van Eldik';
  const BASE_URL  = 'https://www.perfectpixelart.nl'; // update to real domain
  const DEFAULT_IMAGE = '/assets/images/og-default.jpg';

  const pageMeta = {
    '/': {
      title: 'Danny van Eldik | Abstracte Kunst, Portretten, Illustraties & Natuurfotografie',
      description:
        'Ontdek unieke abstracte schilderijen, portretten, illustraties en natuurfotografie van Danny van Eldik. Luxe prints op canvas, acryl, aluminium en meer — bestelbaar via Werk aan de Muur.',
      keywords:
        'abstracte kunst voor woonkamer, natuurfotografie op maat, kunst kopen Nederland, canvas print bestellen, abstracte schilderijen, moderne kunst interieur, prints op maat, Danny van Eldik',
    },
    '/index.html': null, // will fall through to '/'
    '/portfolio.html': {
      title: 'Portfolio | Abstracte Kunst, Portretten & Natuurfotografie — Danny van Eldik',
      description:
        'Blader door het volledige portfolio van Danny van Eldik. Abstracte werken, portretten, illustraties en natuurfotografie — verkrijgbaar als premium print op maat voor jouw interieur.',
      keywords:
        'portfolio abstracte kunst, natuur fotografie kunst kopen, schilderijen portfolio, kunstprints bestellen, abstracte kunst voor woonkamer',
    },
    '/shop.html': {
      title: 'Shop | Kunstprints op Maat — Danny van Eldik',
      description:
        'Bestel je favoriete kunstwerk als hoogwaardige print. Canvas, acrylglas, aluminium dibond, ArtFrame en fotobehang — geleverd via Werk aan de Muur.',
      keywords:
        'kunstprint kopen, canvas print bestellen, abstracte kunst kopen, natuurfotografie op maat, werk aan de muur, print op canvas woonkamer',
    },
  };

  function resolveMeta() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    return pageMeta[path] || pageMeta['/index.html'] || pageMeta['/'];
  }

  function setOrCreate(selector, tag, attrs) {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => {
        if (k !== '_content') el.setAttribute(k, v);
      });
      document.head.appendChild(el);
    }
    el.setAttribute('content', attrs._content);
  }

  function injectMeta(meta) {
    if (!meta) return;

    // Title
    document.title = meta.title;

    // Standard
    setOrCreate('meta[name="description"]',  'meta', { name: 'description',  _content: meta.description });
    setOrCreate('meta[name="keywords"]',     'meta', { name: 'keywords',     _content: meta.keywords });
    setOrCreate('meta[name="robots"]',       'meta', { name: 'robots',       _content: 'index, follow' });
    setOrCreate('meta[name="language"]',     'meta', { name: 'language',     _content: 'nl' });
    setOrCreate('meta[name="author"]',       'meta', { name: 'author',       _content: SITE_NAME });

    // Open Graph
    const ogImage = (meta.ogImage || DEFAULT_IMAGE).startsWith('http')
      ? meta.ogImage || DEFAULT_IMAGE
      : BASE_URL + (meta.ogImage || DEFAULT_IMAGE);

    setOrCreate('meta[property="og:title"]',       'meta', { property: 'og:title',       _content: meta.title });
    setOrCreate('meta[property="og:description"]', 'meta', { property: 'og:description', _content: meta.description });
    setOrCreate('meta[property="og:type"]',        'meta', { property: 'og:type',        _content: 'website' });
    setOrCreate('meta[property="og:url"]',         'meta', { property: 'og:url',         _content: window.location.href });
    setOrCreate('meta[property="og:locale"]',      'meta', { property: 'og:locale',      _content: 'nl_NL' });
    setOrCreate('meta[property="og:site_name"]',   'meta', { property: 'og:site_name',   _content: SITE_NAME });
    setOrCreate('meta[property="og:image"]',       'meta', { property: 'og:image',       _content: ogImage });

    // Twitter Card
    setOrCreate('meta[name="twitter:card"]',        'meta', { name: 'twitter:card',        _content: 'summary_large_image' });
    setOrCreate('meta[name="twitter:title"]',       'meta', { name: 'twitter:title',       _content: meta.title });
    setOrCreate('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', _content: meta.description });
    setOrCreate('meta[name="twitter:image"]',       'meta', { name: 'twitter:image',       _content: ogImage });

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = BASE_URL + window.location.pathname;

    // JSON-LD structured data
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
      description: meta.description,
      inLanguage: 'nl',
      potentialAction: {
        '@type': 'SearchAction',
        target: BASE_URL + '/portfolio.html?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };

    let ldScript = document.querySelector('script[data-seo="ld-json"]');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.type = 'application/ld+json';
      ldScript.setAttribute('data-seo', 'ld-json');
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(schema);
  }

  const meta = resolveMeta();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => injectMeta(meta));
  } else {
    injectMeta(meta);
  }
})();
