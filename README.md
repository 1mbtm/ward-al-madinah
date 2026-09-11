# ☕ Premium Specialty Cafe & Roastery Website Template

An ultra-luxury, modular digital experience template crafted for specialty coffee houses, boutique cafes, multi-branch roasteries, and artisanal dining destinations.

Built with **Next.js (App Router), TypeScript, React, and Vanilla CSS**, engineered for **100% static export compatibility** (`output: 'export'`), and completely decoupled from business data.

---

## ✨ Features

- **Sensory Luxury Aesthetics:** Obsidian dark mode, warm champagne gold & amber accents, frosted glass surfaces, and refined editorial typography (`Cinzel` + `Plus Jakarta Sans`).
- **Feature-Flag Driven Modularity:** Adapt effortlessly from a boutique single-location cafe to a multi-branch roastery empire with simple boolean toggles (`showBranches`, `showRoastery`, `showRetail`, `showOnlineOrdering`, `showGallery`, `showEvents`, `showJournal`, `showTeam`, `showSustainability`, `showFranchise`, `showContactForm`).
- **Zero Fake Business Proof:** No fabricated reviews, invented star ratings, or fake metric counters. Clean typed placeholders (`"Your Cafe Name"`, `"Your Address"`, `"Your Phone Number"`) with graceful suppression when optional values are omitted.
- **Strictly Non-Reservation Inquiries:** Zero reservation engines, booking widgets, or table booking CTAs. Clean inquiry forms tailored for General Inquiries, Coffee Catering, Private Events/Masterclasses, and Franchise Partnerships.
- **Interactive Coordinate Map:** Responsive coordinate map canvas with pulsing location pins, auto-calculated open/closed badges, and direct navigation links.
- **Cupping Score Counters:** Specialty Coffee Association (SCA) score badges (`88+`, `92+`) with animated counting on scroll.
- **Optional Online Ordering Bag:** Enable or disable e-commerce shopping bag with `showOnlineOrdering: true/false`.
- **Frictionless Motion:** Butter-smooth momentum scrolling powered by Lenis, complete with `@media (prefers-reduced-motion: reduce)` accessibility compliance.
- **SEO & Rich Schemas:** Pre-configured OpenGraph metadata and JSON-LD `CafeOrCoffeeShop` structured data schemas.
- **100% Static Export:** Compiles into pure static HTML/CSS/JS deployable to Cloudflare Pages, Vercel, Netlify, or AWS S3 with zero backend runtime needed.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Static Production Bundle
```bash
npm run build
```
The static export files will be generated in the `/out` directory ready for instant hosting.

---

## 🛠️ Customization Guide

### 1. Business Data & Content Configuration
All content is centralized in [`src/config/cafe.config.ts`](./src/config/cafe.config.ts):
```typescript
export const cafeConfig: CafeConfig = {
  meta: {
    brandName: 'Your Cafe Name',
    tagline: 'Where Coffee Is More Than A Drink — It Is An Experience',
    description: 'An artisanal specialty coffee house...',
    headquarters: 'Your City, Your Country',
  },
  features: {
    showBranches: true,        // Toggle /locations and map
    showRoastery: true,        // Toggle /roastery craft section
    showRetail: true,          // Toggle /shop retail beans
    showOnlineOrdering: true,  // Toggle shopping bag & checkout
    showGallery: true,         // Toggle /gallery visual showcase
    showEvents: true,          // Toggle /events masterclasses
    showJournal: true,         // Toggle /journal articles
    showTeam: true,            // Toggle team section
    showSustainability: true,  // Toggle sustainability card
    showFranchise: true,       // Toggle /franchise partnership page
    showContactForm: true,     // Toggle inquiry forms
  },
  contact: {
    primaryPhone: 'Your Phone Number',
    email: 'contact@yourcafe.com',
    headOfficeAddress: 'Your Address',
    socials: {
      instagram: 'https://instagram.com/yourhandle',
      facebook: 'https://facebook.com/yourhandle',
    },
  },
  branches: [...],
  retailProducts: [...],
  menuCategories: [...],
  galleryItems: [...],
  journal: [...],
};
```

### 2. Design Tokens & Color Palette
Adjust design variables in [`src/styles/globals.css`](./src/styles/globals.css):
```css
:root {
  --bg-primary: #0B0B0D;
  --accent-gold: #C5A880;
  --accent-amber: #E29D52;
  --text-primary: #FAF9F6;
  --border-glass: rgba(255, 255, 255, 0.12);
}
```

---

## 🌐 Static Deployment

This template outputs static HTML in `/out` when running `npm run build`.

### Cloudflare Pages
- **Build command:** `npm run build`
- **Build output directory:** `out`

### Vercel
- Automatically detects Next.js static export.

### Netlify
- **Build command:** `npm run build`
- **Publish directory:** `out`

---

## 📄 License
MIT License. Created for reusable, premium specialty cafe and coffee house deployments.
