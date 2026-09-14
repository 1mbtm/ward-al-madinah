/**
 * Medina Rose Heritage Goods Data
 * 
 * All 7 new real heritage goods photographs from the /goods source folder.
 * Image paths reference optimized AVIF/WebP/JPEG delivery variants.
 */

export interface GoodsItem {
  /** UUID slug — used to construct /images/goods-optimized/<slug>-<width>.<ext> paths */
  slug: string;
  title: string;
  subtitle: string;
  alt: string;
}

export const heritageSlides: GoodsItem[] = [
  { 
    slug: '884f7346-608e-4d64-a298-17c26ecabeaf', 
    title: 'Madinah Rose Water', 
    subtitle: 'ماء الورد المديني',
    alt: 'Madinah Rose Water in glass bottles' 
  },
  { 
    slug: '636cad05-0486-4f29-96dc-bdb67ebeef35', 
    title: 'Authentic Ajwa Dates', 
    subtitle: 'عجوة المدينة المنورة الفاخرة',
    alt: 'Authentic Ajwa Dates from Madinah' 
  },
  { 
    slug: 'fc0716c4-1847-41d8-8524-8ba8315ab69e', 
    title: 'Signature Rose Mist Elixir', 
    subtitle: 'رذاذ الورد الطبيعي الفاخر',
    alt: 'Signature pink Rose Mist Elixir' 
  },
  { 
    slug: '8ba09a08-5cc1-487c-94b5-92c97a964d48', 
    title: 'Botanical Rose Elixirs', 
    subtitle: 'مجموعة رذاذ الورد الطبيعي',
    alt: 'Botanical Rose Elixirs in amber bottles' 
  },
  { 
    slug: 'cebeaff3-a87b-420b-a205-898a7d636f9e', 
    title: 'Dried Medina Rose Buds', 
    subtitle: 'ورد مديني مجفف للضيافة',
    alt: 'Dried Medina Rose Buds for hospitality' 
  },
  { 
    slug: 'f7d7b070-9c54-4d2e-a355-09af8d65b15e', 
    title: 'Musk & Rose Water Mist', 
    subtitle: 'بالمسك والورد المديني 250ml',
    alt: 'Musk and Rose Water Mist' 
  },
  { 
    slug: 'c8a0f3df-5684-4c10-b1f8-7e5096dd5de9', 
    title: 'Colorful Cup Collection', 
    subtitle: 'مجموعة الأكواب الملونة',
    alt: 'Colorful reusable cup collection' 
  }
];

/** Base public path for optimized goods images */
export const GOODS_IMG_BASE = '/images/goods-optimized';

/**
 * Returns the srcSet string for a given slug and format.
 * Generates 480w, 800w, 1200w variants.
 */
export function goodsSrcSet(slug: string, ext: 'avif' | 'webp' | 'jpg'): string {
  return [480, 800, 1200]
    .map(w => `${GOODS_IMG_BASE}/${slug}-${w}.${ext} ${w}w`)
    .join(', ');
}

/**
 * Returns the fallback src (800px JPEG) for a given slug.
 */
export function goodsFallbackSrc(slug: string): string {
  return `${GOODS_IMG_BASE}/${slug}-800.jpg`;
}
