/**
 * Shop gallery data for Danny van Eldik
 *
 * Werk aan de Muur integration note:
 * ─────────────────────────────────────────────────────────────────────
 * Werk aan de Muur does not publish a public REST API or RSS feed for
 * individual artist shops. The recommended integration for a static site
 * is to manually link each artwork directly to its WADM product page.
 *
 * How to find your artwork URL:
 *   1. Log in at werkaandemuur.nl
 *   2. Open the artwork in your shop
 *   3. Copy the URL from the browser address bar
 *   4. Paste it into the 'wadmUrl' field below
 *
 * Replace placeholder gradients with real image paths once images are added:
 *   image: '/assets/images/artwork-01.jpg'
 * ─────────────────────────────────────────────────────────────────────
 */

const shopItems = [
  {
    id: 1,
    title: 'Ochtendschemering',
    category: 'abstract',
    priceFrom: '€45',
    gradient: 'from-violet-400 via-purple-500 to-rose-400',
    wadmUrl: 'https://www.werkaandemuur.nl',
    featured: true,
  },
  {
    id: 2,
    title: 'Diepzee',
    category: 'abstract',
    priceFrom: '€55',
    gradient: 'from-slate-800 via-blue-900 to-cyan-700',
    wadmUrl: 'https://www.werkaandemuur.nl',
    featured: false,
  },
  {
    id: 3,
    title: 'Vuur & IJs',
    category: 'abstract',
    priceFrom: '€60',
    gradient: 'from-orange-400 via-red-500 to-blue-600',
    wadmUrl: 'https://www.werkaandemuur.nl',
    featured: true,
  },
  {
    id: 4,
    title: 'Bos in de Mist',
    category: 'natuur',
    priceFrom: '€65',
    gradient: 'from-emerald-800 via-teal-600 to-stone-400',
    wadmUrl: 'https://www.werkaandemuur.nl',
    featured: true,
  },
  {
    id: 5,
    title: 'Gouden Uur',
    category: 'natuur',
    priceFrom: '€55',
    gradient: 'from-amber-300 via-orange-400 to-red-500',
    wadmUrl: 'https://www.werkaandemuur.nl',
    featured: false,
  },
  {
    id: 6,
    title: 'Waterval',
    category: 'natuur',
    priceFrom: '€65',
    gradient: 'from-sky-300 via-blue-400 to-teal-600',
    wadmUrl: 'https://www.werkaandemuur.nl',
    featured: false,
  },
];

function shopApp() {
  return {
    filter: 'all',
    items: shopItems,

    get filtered() {
      return this.filter === 'all'
        ? this.items
        : this.items.filter(i => i.category === this.filter);
    },

    categoryLabel(cat) {
      return cat === 'abstract' ? 'Abstract' : 'Natuur';
    },
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
