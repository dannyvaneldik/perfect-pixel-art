/**
 * Shop gallery data for Danny van Eldik
 *
 * Werk aan de Muur shop: https://www.werkaandemuur.nl/nl/shop/Danny-van-Eldik/160854
 *
 * To link a specific artwork, navigate to it in your WADM shop and paste its URL
 * into the 'wadmUrl' field below. Until then, all items link to the shop overview.
 *
 * To swap in a real photo, replace 'gradient' with an 'image' field:
 *   image: '/assets/images/artwork-01.jpg'
 */

const WADM_SHOP = 'https://www.werkaandemuur.nl/nl/shop/Danny-van-Eldik/160854';

const shopItems = [
  // ── Abstract ──────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Horizon',
    category: 'abstract',
    formats: ['Canvas', 'Acryl', 'Aluminium'],
    priceFrom: '€45',
    gradient: 'from-violet-400 via-purple-500 to-rose-400',
    wadmUrl: WADM_SHOP,
    featured: true,
  },
  {
    id: 2,
    title: 'Drift',
    category: 'abstract',
    formats: ['Canvas', 'Aluminium'],
    priceFrom: '€55',
    gradient: 'from-slate-800 via-blue-900 to-cyan-700',
    wadmUrl: WADM_SHOP,
    featured: false,
  },
  {
    id: 3,
    title: 'Prisma',
    category: 'abstract',
    formats: ['Canvas', 'Acryl', 'Aluminium'],
    priceFrom: '€60',
    gradient: 'from-orange-400 via-red-500 to-blue-600',
    wadmUrl: WADM_SHOP,
    featured: true,
  },
  // ── Natuur ────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'Mistig Woud',
    category: 'natuur',
    formats: ['Canvas', 'Fotopapier', 'Aluminium'],
    priceFrom: '€65',
    gradient: 'from-emerald-800 via-teal-600 to-stone-400',
    wadmUrl: WADM_SHOP,
    featured: true,
  },
  {
    id: 5,
    title: 'Gouden Veld',
    category: 'natuur',
    formats: ['Canvas', 'Fotopapier'],
    priceFrom: '€55',
    gradient: 'from-amber-300 via-orange-400 to-red-500',
    wadmUrl: WADM_SHOP,
    featured: false,
  },
  {
    id: 6,
    title: 'Stille Wateren',
    category: 'natuur',
    formats: ['Canvas', 'Acryl', 'Fotopapier'],
    priceFrom: '€65',
    gradient: 'from-sky-300 via-blue-400 to-teal-600',
    wadmUrl: WADM_SHOP,
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
