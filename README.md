# Portfolio

Personal portfolio for Nick Montelibano, independent medical device software consultant at Fractal Logic.
Live at [nickm.software](https://nickm.software)

## Features

- Dark slate palette with a teal accent, set in Inter, with the Fractal Logic lockup in Space Grotesk
- Animated ECG trace, scroll-reveal micro-interactions, and glass-surface cards, all in CSS/vanilla JS
- Zero client-side frameworks: no React, no hydration, minimal JavaScript
- Fully responsive with a bottom tab bar on mobile
- Accessible: semantic landmarks, skip link, focus-visible states, `prefers-reduced-motion` support
- SEO: Open Graph/Twitter cards, JSON-LD structured data, canonical URLs

## Brand

The Fractal Logic identity lives in `src/components/BrandLockup.astro`. One prop
drives it, `size`, the wordmark's font-size in px. The mark, the gap and the
clear space are all computed from that, so never hard-code a gap.

Rules that came with the identity:

- Space Grotesk 500 is the wordmark and nothing else. Headings use Inter.
- The full lockup needs 135px of width. Below that, use the mark alone.
- At 16px and under, the mark switches to its two-cut favicon shape.
  `BrandLockup` does that on its own.
- Never stretch, rotate, round or stroke the mark.

The accent follows this site's palette instead of the `#9184d9` in the handoff.

## Stack

![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## Project structure

```
public/
├── svg/        # tech logos
└── webp/       # optimized images
src/
├── components/ # page sections (hero, expertise, process, platforms, contact, footer, nav)
├── layouts/    # base layout + design tokens/global CSS
└── pages/      # index
```

## Getting started

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # type-check + production build
```

## Contact

Nick Montelibano · nick@fractallogic.io

## Acknowledgments

Originally forked from a template by [Oscar Hernandez (Gothsec)](https://github.com/Gothsec/Portfolio); since fully redesigned.
