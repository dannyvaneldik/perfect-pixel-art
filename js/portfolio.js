/**
 * Portfolio data & Alpine.js component — Danny van Eldik
 * To add a real artwork: replace 'gradient' with an 'image' path,
 * e.g. image: '/assets/images/artwork-01.jpg'
 */

const FORMATS_TEXT = 'Verkrijgbaar in diverse formaten en materialen via Werk aan de Muur.';
const WADM_SHOP    = 'https://www.werkaandemuur.nl/nl/shop/Danny-van-Eldik/160854';

const artworks = [
  // ── Abstract ──────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Ochtendschemering',
    subtitle: 'De wereld ontwaakt',
    category: 'abstract',
    medium: 'Digitale kunst',
    price: 'vanaf €45',
    gradient: 'from-violet-400 via-purple-500 to-rose-400',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 2,
    title: 'Diepzee',
    subtitle: 'Stille duisternis',
    category: 'abstract',
    medium: 'Digitale kunst',
    price: 'vanaf €55',
    gradient: 'from-slate-800 via-blue-900 to-cyan-700',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 3,
    title: 'Vuur & IJs',
    subtitle: 'Tegenstellingen',
    category: 'abstract',
    medium: 'Digitale kunst',
    price: 'vanaf €60',
    gradient: 'from-orange-400 via-red-500 to-blue-600',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 4,
    title: 'Fluistering',
    subtitle: 'Zachte beweging',
    category: 'abstract',
    medium: 'Digitale kunst',
    price: 'vanaf €40',
    gradient: 'from-pink-200 via-rose-300 to-fuchsia-400',
    wadmUrl: WADM_SHOP,
  },
  // ── Natuur ────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Bos in de Mist',
    subtitle: 'Vroege ochtend',
    category: 'natuur',
    medium: 'Fotografie',
    price: 'vanaf €65',
    gradient: 'from-emerald-800 via-teal-600 to-stone-400',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 6,
    title: 'Gouden Uur',
    subtitle: 'Zonsondergang',
    category: 'natuur',
    medium: 'Fotografie',
    price: 'vanaf €55',
    gradient: 'from-amber-300 via-orange-400 to-red-500',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 7,
    title: 'Waterval',
    subtitle: 'Eeuwig in beweging',
    category: 'natuur',
    medium: 'Fotografie',
    price: 'vanaf €65',
    gradient: 'from-sky-300 via-blue-400 to-teal-600',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 8,
    title: 'Wilde Velden',
    subtitle: 'Zomer in bloei',
    category: 'natuur',
    medium: 'Fotografie',
    price: 'vanaf €50',
    gradient: 'from-lime-300 via-green-400 to-emerald-600',
    wadmUrl: WADM_SHOP,
  },
  {
    id: 9,
    title: 'Schemerlucht',
    subtitle: 'Magisch moment',
    category: 'natuur',
    medium: 'Fotografie',
    price: 'vanaf €70',
    gradient: 'from-indigo-400 via-purple-400 to-pink-400',
    wadmUrl: WADM_SHOP,
  },
];

// Alpine.js portfolio component
function portfolioApp() {
  return {
    filter: 'all',
    lightbox: null,
    formatsText: FORMATS_TEXT,

    get filtered() {
      return this.filter === 'all'
        ? artworks
        : artworks.filter(a => a.category === this.filter);
    },

    openLightbox(artwork) {
      this.lightbox = artwork;
      document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
      this.lightbox = null;
      document.body.style.overflow = '';
    },

    handleKeydown(e) {
      if (!this.lightbox) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowRight') this.nextArtwork();
      if (e.key === 'ArrowLeft')  this.prevArtwork();
    },

    nextArtwork() {
      const list = this.filtered;
      const idx  = list.findIndex(a => a.id === this.lightbox.id);
      this.lightbox = list[(idx + 1) % list.length];
    },

    prevArtwork() {
      const list = this.filtered;
      const idx  = list.findIndex(a => a.id === this.lightbox.id);
      this.lightbox = list[(idx - 1 + list.length) % list.length];
    },

    categoryLabel(cat) {
      return cat === 'abstract' ? 'Abstract' : 'Natuur';
    },
  };
}

// Scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
