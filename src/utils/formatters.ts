import { CafeFeatureConfig } from '@/types';

export function formatPrice(price: string | number, currency: string = '$'): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return `${currency}${price}`;
  return `${currency}${num.toFixed(2)}`;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export function getActiveNavigationItems(features: CafeFeatureConfig): NavItem[] {
  const items: NavItem[] = [
    { label: 'Menu', href: '/menu/' },
    { label: 'About', href: '/about/' },
  ];

  if (features.showBranches) {
    items.push({ label: 'Locations', href: '/locations/' });
  }

  if (features.showRoastery) {
    items.push({ label: 'Roastery', href: '/roastery/' });
  }

  if (features.showRetail) {
    items.push({ label: 'Coffee Shop', href: '/shop/' });
  }

  if (features.showGallery) {
    items.push({ label: 'Gallery', href: '/gallery/' });
  }

  if (features.showEvents) {
    items.push({ label: 'Events', href: '/events/' });
  }

  if (features.showJournal) {
    items.push({ label: 'Journal', href: '/journal/' });
  }

  items.push({ label: 'Contact', href: '/contact/' });

  return items;
}
