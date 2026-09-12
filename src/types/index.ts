export type DietaryTag = 'Vegan' | 'Gluten-Free' | 'Signature' | 'Single-Origin' | 'Organic' | 'Decaf' | string;

export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Omni' | string;

export type CoffeeProcess = 'Washed' | 'Natural' | 'Anaerobic' | 'Honey' | 'Carbonic Maceration' | 'Washed / Honey' | string;

export interface CafeThemeConfig {
  accentColor: string;
  accentHover: string;
  accentAmber: string;
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface CafeFeatureConfig {
  showBranches: boolean;
  showRoastery: boolean;
  showRetail: boolean;
  showOnlineOrdering: boolean;
  showGallery: boolean;
  showEvents: boolean;
  showJournal: boolean;
  showTeam: boolean;
  showSustainability: boolean;
  showContactForm: boolean;
  showStory: boolean;
}

export interface BranchData {
  id: string;
  name: string;
  region?: string;
  address: string;
  phone?: string;
  hoursSummary?: string;
  openingTime?: string; // '07:00' (24h)
  closingTime?: string; // '23:00' (24h)
  googleMapsUrl?: string;
  coordinates?: {
    xPercent: number; // 0 - 100% horizontal pin position
    yPercent: number; // 0 - 100% vertical pin position
  };
  images?: string[];
  isComingSoon?: boolean;
}

export interface RetailProductData {
  id: string;
  name: string;
  originCountry: string;
  countryFlagEmoji?: string;
  cuppingScore?: number; // e.g. 89, 92
  tastingNotes: string[];
  roastLevel: RoastLevel;
  process?: CoffeeProcess;
  elevation?: string; // e.g. '1800m - 2100m'
  varietal?: string; // e.g. 'Geisha / Typica'
  price: string;
  currency: string;
  bagWeight?: string;
  image?: string;
  inStock: boolean;
}

export interface GalleryItemData {
  id: string;
  title: string;
  category: 'Spaces' | 'Coffee Craft' | 'Roastery' | 'Community' | string;
  image: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: string;
  currency?: string;
  dietaryTags?: DietaryTag[];
  calories?: string;
  image?: string;
}

export interface MenuCategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  items: MenuItemData[];
}

export interface EventData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  dateOrSchedule: string;
  location?: string;
  images?: string[];
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export interface JournalPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  publishedDate: string;
  readTimeMinutes: number;
  image?: string;
}

export interface CafeConfig {
  meta: {
    brandName: string;
    tagline: string;
    description: string;
    foundedYear?: number;
    headquarters?: string;
    logoText?: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  features: CafeFeatureConfig;
  contact: {
    primaryPhone?: string;
    whatsappNumber?: string;
    email?: string;
    headOfficeAddress?: string;
    socials?: {
      instagram?: string;
      tiktok?: string;
      facebook?: string;
      linkedin?: string;
      youtube?: string;
      x?: string;
    };
  };
  regions?: string[]; // e.g. ['Flagship City', 'Metro Area', 'Upcoming']
  branches: BranchData[];
  retailProducts: RetailProductData[];
  galleryItems: GalleryItemData[];
  menuCategories: MenuCategoryData[];
  events: EventData[];
  team: TeamMemberData[];
  journal: JournalPostData[];
  story: {
    title: string;
    tagline: string;
    paragraphs: string[];
    highlightQuote?: string;
    stats?: Array<{ value: string; label: string }>;
  };
  roasteryCraft: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    features: Array<{ title: string; description: string; iconName?: string }>;
  };
  sustainability: {
    title: string;
    subtitle: string;
    pillars: Array<{ title: string; description: string }>;
  };
  theme: CafeThemeConfig;
}

export interface CartItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  image?: string;
  quantity: number;
  bagWeight?: string;
}
