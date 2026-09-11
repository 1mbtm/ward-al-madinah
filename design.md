# Design System Reference: Roasters Specialty Coffee House | Dubai
**Source URL:** https://roasterscoffee.ae/
**Extracted:** 8/20/2026

---

## 1. Typography & Hierarchy
- **Font Families:** Philosopher, -apple-system, Times New Roman
- **Type Scale:** 12px, 14px, 16px, 17px, 18px, 19px, 20px, 21px, 22px, 24px, 28px, 29px, 33px, 36px, 48px

---

## 2. Color System
### Background Colors
- `rgba(255, 255, 255, 0.95)`
- `rgb(0, 0, 0)`
- `rgb(211, 211, 211)`
- `rgb(255, 255, 255)`
- `rgba(0, 0, 0, 0.1)`
- `rgba(0, 0, 0, 0.5)`
- `rgba(0, 0, 0, 0.4)`
- `rgb(26, 26, 26)`

### Text & Accents
- `rgb(0, 0, 0)`
- `rgb(30, 115, 190)`
- `rgb(255, 255, 255)`
- `rgb(0, 122, 255)`
- `rgba(255, 255, 255, 0.5)`
- `rgb(30, 30, 30)`
- `rgba(255, 255, 255, 0.7)`

---

## 3. Shape & Elevation
- **Border Radii:** 11px, 50%, 2px, 12px, 5px, 10px
- **Box Shadows:**
  - `rgba(0, 0, 0, 0.1) 0px 2px 8px 0px`
  - `rgba(0, 0, 0, 0.25) 0px 1px 4px 0px`

---

## 4. Root CSS Variables
```css
:root {
  --wp-block-synced-color: #7a00df;
  --wp-block-synced-color--rgb: 122,0,223;
  --wp-bound-block-color: var(--wp-block-synced-color);
  --wp-editor-canvas-background: #ddd;
  --wp-admin-theme-color: #007cba;
  --wp-admin-theme-color--rgb: 0,124,186;
  --wp-admin-theme-color-darker-10: #006ba1;
  --wp-admin-theme-color-darker-10--rgb: 0,107,160.5;
  --wp-admin-theme-color-darker-20: #005a87;
  --wp-admin-theme-color-darker-20--rgb: 0,90,135;
  --wp-admin-border-width-focus: 2px;
  --wp--preset--font-size--normal: 16px;
  --wp--preset--font-size--huge: 42px;
  --wp--preset--aspect-ratio--square: 1;
  --wp--preset--aspect-ratio--4-3: 4/3;
  --wp--preset--aspect-ratio--3-4: 3/4;
  --wp--preset--aspect-ratio--3-2: 3/2;
  --wp--preset--aspect-ratio--2-3: 2/3;
  --wp--preset--aspect-ratio--16-9: 16/9;
  --wp--preset--aspect-ratio--9-16: 9/16;
  --wp--preset--color--black: #000000;
  --wp--preset--color--cyan-bluish-gray: #abb8c3;
  --wp--preset--color--white: #ffffff;
  --wp--preset--color--pale-pink: #f78da7;
  --wp--preset--color--vivid-red: #cf2e2e;
  --wp--preset--color--luminous-vivid-orange: #ff6900;
  --wp--preset--color--luminous-vivid-amber: #fcb900;
  --wp--preset--color--light-green-cyan: #7bdcb5;
  --wp--preset--color--vivid-green-cyan: #00d084;
  --wp--preset--color--pale-cyan-blue: #8ed1fc;
  --wp--preset--color--vivid-cyan-blue: #0693e3;
  --wp--preset--color--vivid-purple: #9b51e0;
  --wp--preset--color--contrast: var(--contrast);
  --wp--preset--color--contrast-2: var(--contrast-2);
  --wp--preset--color--contrast-3: var(--contrast-3);
  --wp--preset--color--base: var(--base);
  --wp--preset--color--base-2: var(--base-2);
  --wp--preset--color--base-3: var(--base-3);
  --wp--preset--color--accent: var(--accent);
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgb(6,147,227) 0%,rgb(155,81,224) 100%);
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgb(252,185,0) 0%,rgb(255,105,0) 100%);
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgb(255,105,0) 0%,rgb(207,46,46) 100%);
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);
  --wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);
  --wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);
  --wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);
  --wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);
  --wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);
}
```

---

## 5. AI Prompt Directive
> "Follow the exact color palette, typography hierarchy, and border radius tokens defined in this document. Avoid generic template layouts and stick strictly to these values."
