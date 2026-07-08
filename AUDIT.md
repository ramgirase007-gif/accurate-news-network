# Accurate News Network Production Audit

Audit date: 2026-07-08

## Executive summary

The repository was reviewed as a React/Vite single-page application. I added the missing application entrypoint and package metadata, preserved the existing reusable component library, removed an unused duplicate layout prototype, tightened route navigation, added a production error boundary, and verified the source with available static checks. A full Vite production build could not be completed because the npm registry returned `403 Forbidden` while installing dependencies in this environment.

## Findings and fixes

| Area | Status | Findings | Fixes |
| --- | --- | --- | --- |
| Missing imports | Fixed | The app had React route files and component exports, but no Vite entrypoint to mount `App`. | Added `src/main.jsx`, `index.html`, and package scripts/dependencies. |
| Broken routes | Fixed | Header category navigation used hash anchors that only worked on the home page and became dead anchors on article/category/search pages. | Updated category links to route to `/category/:slug` while preserving top-story deep-linking. |
| Duplicate components | Fixed | `core/layout_engine.jsx` was an unused standalone layout prototype with duplicate Header/Hero/Newsletter patterns separate from the production component library. | Removed the unused prototype instead of generating duplicate replacement components. |
| Unused files | Fixed | `core/layout_engine.jsx` had no import path from the app entry or exports. | Deleted the file. |
| Inconsistent naming | Passed | Route page exports consistently use `*Page` aliases in `pages/index.js`; component exports consistently use default component names. | No rename required. |
| Missing exports | Fixed | `ErrorBoundary` did not exist or export before this audit. | Added `components/ErrorBoundary.jsx` and exported it from `components/index.js`. |
| Page compilation | Partially verified | JavaScript modules passed `node --check`; JSX production build requires dependencies that could not be installed due registry policy. | Added Vite package metadata and documented the environment limitation. |
| Routing | Fixed | `App.jsx` defines home, category redirect, category detail, article, search, about, contact, privacy, and wildcard routes. | Wrapped route rendering in an error boundary and fixed header links to target defined routes. |
| ThemeContext integration | Improved | Theme provider and hook were wired, and header toggle consumed context. App shell still used hard-coded light background/text. | Added app-level CSS variables driven by `data-ann-theme='dark'`. |
| WordPress integration | Passed | WordPress hooks use abortable requests, disabled state when `VITE_WORDPRESS_API_URL` is absent, normalized posts/categories, and fallback content. | No service rewrite required. |
| Responsive layout | Passed | Pages and components include mobile media queries for grids, sidebar collapse, search rows, and card stacks. | No structural changes required. |
| Accessibility | Improved | Skip link, landmarks, labels, aria-live regions, alt text, and `aria-current` were present. | Added an accessible error fallback using `role="alert"` and main landmark. |
| Error boundaries | Fixed | No render error boundary existed. | Added `ErrorBoundary` around route rendering. |
| Loading states | Passed | WordPress-backed pages use `LoadingSkeleton` while content is loading. | No new duplicate loading components created. |
| Folder structure | Improved | The app lacked standard Vite root entry files and contained an unused prototype under `core/`. | Added Vite entry files and removed unused `core/` prototype file. |

## Route inventory

- `/` renders `Home`.
- `/category` redirects to `/category/world`.
- `/category/:slug` renders `CategoryPage`.
- `/news/:slug` renders `ArticlePage`.
- `/search` renders `SearchPage`.
- `/about` renders `AboutPage`.
- `/contact` renders `ContactPage`.
- `/privacy-policy` renders `PrivacyPolicyPage`.
- `*` renders `NotFoundPage`.

## Verification commands

- `node --check services/api.js`
- `for f in $(rg --files -g '*.js'); do node --check "$f" || exit 1; done`
- `npm install` — blocked by registry `403 Forbidden`, so `npm run build` could not be executed in this environment.

## Follow-up recommendations

1. Run `npm install` and `npm run build` in an environment with allowed npm registry access.
2. Add automated route smoke tests once dependencies are available.
3. Add an accessibility CI pass with axe or Playwright after the project dependency install succeeds.
