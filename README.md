# Accurate News Network

Accurate News Network is a Vite + React single-page news application focused on verified reporting, responsive layouts, accessible navigation, and production-ready deployment hygiene.

## Features

- React 19-compatible architecture with route-level lazy loading.
- Error boundary protection around routed content.
- WordPress REST API integration with curated fallback content.
- Open Graph, Twitter Card, canonical URL, and meta description support.
- Responsive article, category, search, and homepage layouts.
- Production-oriented Vite bundle splitting for React and router chunks.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run build` creates the production bundle.
- `npm run preview` serves the production bundle locally.
- `npm run lint` runs ESLint.

See [INSTALL.md](./INSTALL.md), [DEPLOYMENT.md](./DEPLOYMENT.md), and [PRODUCTION_REPORT.md](./PRODUCTION_REPORT.md) for operational details.
