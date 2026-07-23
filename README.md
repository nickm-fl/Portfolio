# Portfolio

Personal portfolio for Nick Montelibano — independent medical device software consultant at Fractal Logic.
Live at [nickm.software](https://nickm.software)

## Features

- Clinical-precision design system: deep slate palette, teal accent, Space Grotesk + Inter typography
- Animated ECG trace, scroll-reveal micro-interactions, and glass-surface cards — all CSS/vanilla JS
- Zero client-side frameworks: no React, no hydration, minimal JavaScript
- Fully responsive with a bottom tab bar on mobile
- Accessible: semantic landmarks, skip link, focus-visible states, `prefers-reduced-motion` support
- SEO: Open Graph/Twitter cards, JSON-LD structured data, canonical URLs

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

Nick Montelibano — nick@fractallogic.io

## Acknowledgments

Originally forked from a template by [Oscar Hernandez (Gothsec)](https://github.com/Gothsec/Portfolio); since fully redesigned.
