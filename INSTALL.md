# Installation

## Requirements

- Node.js 20 LTS or newer.
- npm 10 or newer.
- Network access to the npm registry used by your organization.

## Setup

```bash
npm install
cp .env.example .env.local
```

Update `.env.local` with your deployment URL and optional API endpoints:

```bash
VITE_SITE_URL=https://accuratenewsnetwork.com
VITE_API_BASE_URL=https://api.example.com
VITE_WORDPRESS_API_URL=https://cms.example.com
VITE_API_TIMEOUT_MS=15000
VITE_ENABLE_ANALYTICS=false
```

## Local validation

```bash
npm run lint
npm run build
npm run preview
```
