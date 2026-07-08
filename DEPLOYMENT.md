# Deployment

## Production build

```bash
npm ci
npm run build
```

The static output is generated in `dist/`.

## Environment variables

Use `.env.production` as the production baseline and override values in your hosting platform where needed.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public canonical site origin used for SEO URLs. |
| `VITE_API_BASE_URL` | Optional backend API origin. |
| `VITE_WORDPRESS_API_URL` | Optional WordPress origin that exposes `/wp-json/wp/v2`. |
| `VITE_API_TIMEOUT_MS` | Fetch timeout in milliseconds. |
| `VITE_ENABLE_ANALYTICS` | Feature flag for production analytics integrations. |

## Hosting notes

- Configure all routes to serve `index.html` because the app uses client-side routing.
- Cache hashed assets from `dist/assets` with a long max-age and immutable policy.
- Revalidate `index.html` frequently so metadata and deployment references update quickly.
- Enable Brotli or gzip compression at the CDN or edge layer.
