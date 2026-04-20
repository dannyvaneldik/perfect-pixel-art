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
      title: 'Danny van Eldik | Unieke Muurkunst',
      description:
        'Ontdek unieke abstracte schilderijen en natuurfotografie van Danny van Eldik. Luxe prints op canvas, acryl en aluminium. Abstracte kunst voor woonkamer, bestelbaar via Werk aan de Muur.',
      keywords:
        'abstracte kunst voor woonkamer, natuurfotografie op maat, kunst kopen Nederland, canvas print bestellen, abstracte schilderijen, moderne kunst interieur, prints op maat, Danny van Eldik',
    },
    '/index.html': null, // falls through to '/'
    '/portfolio.html': {
      title: 'Portfolio | Danny van Eldik — Unieke Muurkunst',
      description:
        'Blader door het volledige portfolio van Danny van Eldik. Abstracte werken en natuurfotografie, verkrijgbaar in diverse formaten en materialen via Werk aan de Muur.',
      keywords:
        'portfolio abstracte kunst, natuur fotografie kunst kopen, Danny van Eldik kunstenaar, kunstprints bestellen, abstracte kunst voor woonkamer',
    },
    '/shop.html': {
      title: 'Shop | Danny van Eldik — Unieke Muurkunst',
      description:
        'Bekijk en bestel jouw favoriete werk van Danny van Eldik. Verkrijgbaar in diverse formaten en materialen via Werk aan de Muur.',
      keywords:
        'kunstprint kopen, canvas print bestellen, Danny van Eldik kunst, natuurfotografie op maat, werk aan de muur, print op canvas woonkamer',
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

    document.title = meta.title;

    setOrCreate('meta[name="description"]',  'meta', { name: 'description',  _content: meta.description });
    setOrCreate('meta[name="keywords"]',     'meta', { name: 'keywords',     _content: meta.keywords });
    setOrCreate('meta[name="robots"]',       'meta', { name: 'robots',       _content: 'index, follow' });
    setOrCreate('meta[name="language"]',     'meta', { name: 'language',     _content: 'nl' });
    setOrCreate('meta[name="author"]',       'meta', { name: 'author',       _content: SITE_NAME });

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

    setOrCreate('meta[name="twitter:card"]',        'meta', { name: 'twitter:card',        _content: 'summary_large_image' });
    setOrCreate('meta[name="twitter:title"]',       'meta', { name: 'twitter:title',       _content: meta.title });
    setOrCreate('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', _content: meta.description });
    setOrCreate('meta[name="twitter:image"]',       'meta', { name: 'twitter:image',       _content: ogImage });

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = BASE_URL + window.location.pathname;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
      description: meta.description,
      inLanguage: 'nl',
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
