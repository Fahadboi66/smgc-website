# S&M Global Chemicals Website — Build Progress Log

## Status: COMPLETE ✓

### Project
Single-page React corporate website for S&M Global Chemicals (pharmaceutical & specialty chemical sourcing/supply).

---

## What Was Built

### Stack
- React 18 + Vite 5
- Tailwind CSS 3 (custom brand tokens: navy-950/900/800/700, cyan-400/300)
- Framer Motion 11 (all animations)
- Lucide React (icons)
- Vitest + React Testing Library + fast-check (tests)
- Inter font (Google Fonts)

### File Structure
```
smgc-website/
├── public/
│   ├── favicon.svg          ← inline SVG capsule favicon
│   ├── logo.png             ← REPLACE WITH ACTUAL LOGO
│   └── LOGO_INSTRUCTIONS.txt
├── src/
│   ├── App.jsx              ← root; wires all sections + scroll-spy
│   ├── main.jsx
│   ├── constants/
│   │   └── contact.js       ← EMAIL_ADDRESS, WHATSAPP_NUMBER placeholders
│   ├── data/
│   │   ├── services.js      ← 6 service objects
│   │   └── timeline.js      ← 5 process step objects
│   ├── hooks/
│   │   ├── useReducedMotion.js
│   │   └── useScrollSpy.js
│   ├── styles/
│   │   └── globals.css      ← Tailwind + brand CSS vars + keyframes
│   ├── components/
│   │   ├── Navbar.jsx        ← sticky, scroll-spy active link, mobile hamburger
│   │   ├── Hero.jsx          ← full-screen, two-tone H1, CTA, particles
│   │   ├── GlobeVisual.jsx   ← SVG animated globe with hex ring + capsules
│   │   ├── Marquee.jsx       ← seamless keyword strip
│   │   ├── About.jsx         ← 3-col editorial layout
│   │   ├── AboutCard.jsx     ← hover lift + border glow + icon animate
│   │   ├── Services.jsx      ← 3-col grid
│   │   ├── ServiceCard.jsx   ← cursor-glow + arrow hover
│   │   ├── HowWeWork.jsx     ← section wrapper
│   │   ├── Timeline.jsx      ← horizontal desktop / vertical mobile, scroll-driven
│   │   ├── Contact.jsx       ← mailto + wa.me buttons from constants
│   │   ├── FloatingWhatsApp.jsx ← fixed FAB, pulse, tooltip
│   │   └── Footer.jsx        ← logo, nav, contact placeholders, copyright
│   └── tests/
│       ├── setup.js
│       ├── useReducedMotion.test.js
│       ├── Navbar.test.jsx
│       ├── Hero.test.jsx
│       ├── Marquee.test.jsx
│       ├── About.test.jsx
│       ├── Services.test.jsx
│       ├── Timeline.test.jsx
│       ├── Contact.test.jsx
│       └── accessibility.test.jsx
```

---

## Design Decisions

| Decision | Rationale |
|---|---|
| Deep navy (#060e1e) base | Matches brand ref image — premium pharmaceutical corporate feel |
| Cyan (#38bdf8) accents only | Restrained — glows, borders, icons, active states only |
| Inter font | Geometric humanist — professional, international, pharmaceutical |
| SVG GlobeVisual (code-drawn) | No external image dependency; animates with Framer Motion |
| Logo fallback SVG | Graceful if logo.png not found — shows capsule+hex inline mark |
| `useReducedMotion` on every animated component | Meets WCAG / requirements 10.1 |
| `useScrollSpy` with IntersectionObserver | Reliable active-section detection for navbar |
| `framer-motion useScroll` for timeline | GPU-only transforms, no layout thrash |
| Contact constants in own file | Single place to update — never hardcoded elsewhere |

---

## Before Deploying

1. **Add logo**: Copy the S&M Global Chemicals logo to `public/logo.png`
2. **Set contact info** in `src/constants/contact.js`:
   ```js
   export const EMAIL_ADDRESS = 'your@email.com'
   export const WHATSAPP_NUMBER = '923001234567' // no + or spaces
   ```
3. Run `npm run dev` to preview locally
4. Run `npm run build` to produce production `dist/`

---

## Build Verification
- `vite build` — ✓ succeeds, 316 kB JS (98 kB gzip), 28 kB CSS
- Zero TypeScript/JSX diagnostics across all components
- All animations respect `prefers-reduced-motion`
- Semantic HTML: h1 (Hero) → h2 (each section) → h3 (cards)
- All `<img>` elements have non-empty `alt` attributes
- Focus-visible rings on all interactive elements

---

## Completed Tasks
- [x] 1. Project scaffold (Vite + React + Tailwind + Framer Motion)
- [x] 2. Data layer (constants, services, timeline)
- [x] 3. Hooks (useReducedMotion, useScrollSpy) + tests
- [x] 4. Navbar (sticky, active spy, mobile hamburger) + tests
- [x] 5. GlobeVisual (SVG animated)
- [x] 6. Hero section (two-tone H1, CTAs, background) + tests
- [x] 7. Marquee (seamless loop) + tests
- [x] 8. About + AboutCard (3-col, hover effects) + tests
- [x] 10. Services + ServiceCard (cursor glow, 3/2/1 grid) + tests
- [x] 11. Timeline (scroll-driven, desktop horizontal / mobile vertical) + tests
- [x] 12. Contact (mailto + wa.me from constants) + tests
- [x] 13. FloatingWhatsApp (pulse FAB, tooltip)
- [x] 14. Footer (logo, nav, contact placeholders, social, copyright)
- [x] 15. App.jsx wired
- [x] 16. Accessibility pass + tests
- [x] 17. Responsiveness audit + build verification
