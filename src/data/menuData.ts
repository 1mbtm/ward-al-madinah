/**
 * Medina Rose Menu Item Data
 * 
 * All 21 real menu photographs from the /menu source folder.
 * Filenames are UUIDs (no product name metadata in filenames).
 * We keep alt text generic to avoid fabricating business information.
 * Image paths reference optimized AVIF/WebP/JPEG delivery variants,
 * NOT the original master files.
 */

export interface MenuSlide {
  /** UUID slug — used to construct /images/menu/<slug>-<width>.<ext> paths */
  slug: string;
  /** Accessible alt text — kept honest, no fabricated product names */
  alt: string;
}

export const menuSlides: MenuSlide[] = [
  { slug: '08bf3db2-9fd9-47ba-bb7c-b6dce776b1fb', alt: 'Medina Rose menu item — croissant sandwich' },
  { slug: '0a0fe563-9cdb-4148-bfef-390b5455484a', alt: 'Medina Rose menu item 2' },
  { slug: '0d3c8586-086f-4bef-9902-c186e110c16f', alt: 'Medina Rose menu item 3' },
  { slug: '10168ac1-d87f-4e80-9c7c-8af3c8d20b53', alt: 'Medina Rose menu item 4' },
  { slug: '2344adcb-247f-4d55-a0ad-b68bd01c5330', alt: 'Medina Rose menu item 5' },
  { slug: '2536a32a-1208-406b-bf26-9572596b6f45', alt: 'Medina Rose menu item 6' },
  { slug: '2ce77062-f436-4882-8a14-8fac97397882', alt: 'Medina Rose menu item 7' },
  { slug: '2f63c29e-c556-4b1e-ba5d-f77a6b125ee6', alt: 'Medina Rose menu item 8' },
  { slug: '49651be6-0a04-4c73-8a01-2e20bdc9b3e1', alt: 'Medina Rose menu item 9' },
  { slug: '5851e344-8c6d-4900-abb9-2384d227fd56', alt: 'Medina Rose menu item — refreshing drinks' },
  { slug: '6c3ba7fd-ba79-4804-94cc-14c5c2646181', alt: 'Medina Rose menu item 11' },
  { slug: '6e38a8b5-1478-45f1-8681-4b0f59f17077', alt: 'Medina Rose menu item 12' },
  { slug: '72732914-adc0-4b36-8cac-e6fa948d5b84', alt: 'Medina Rose menu item — sesame croissants' },
  { slug: '752f0d65-d9ff-430c-bd77-f8bcdb5426aa', alt: 'Medina Rose menu item 14' },
  { slug: '8c7bee28-9de3-426e-97a1-201fb1e5442c', alt: 'Medina Rose menu item 15' },
  { slug: '918643de-0244-40ff-ab54-f51f0ddb3db4', alt: 'Medina Rose menu item 16' },
  { slug: '96e3e9d2-d0a9-4c67-a666-1efaa3b62d14', alt: 'Medina Rose menu item 17' },
  { slug: 'a3195db2-a66e-44e7-9efe-ade8d557f941', alt: 'Medina Rose menu item 18' },
  { slug: 'd90d480c-ec9a-4c38-adea-9e958c7e2b68', alt: 'Medina Rose menu item 19' },
  { slug: 'dbb094d8-a6de-41e5-a996-dda6fcaf9104', alt: 'Medina Rose menu item 20' },
  { slug: 'e8e4d1bf-419b-4d6b-83bf-bd97f5e28734', alt: 'Medina Rose menu item 21' },
];

/** Base public path for optimized menu images */
export const MENU_IMG_BASE = '/images/menu';

/**
 * Returns the srcSet string for a given slug and format.
 * Generates 480w, 800w, 1200w variants.
 */
export function menuSrcSet(slug: string, ext: 'avif' | 'webp' | 'jpg'): string {
  return [480, 800, 1200]
    .map(w => `${MENU_IMG_BASE}/${slug}-${w}.${ext} ${w}w`)
    .join(', ');
}

/**
 * Returns the fallback src (800px JPEG) for a given slug.
 */
export function menuFallbackSrc(slug: string): string {
  return `${MENU_IMG_BASE}/${slug}-800.jpg`;
}
