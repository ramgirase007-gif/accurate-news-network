export const APP_NAME = 'Accurate News Network';
export const APP_TAGLINE = 'Verified news, clearly reported';

export const THEME_STORAGE_KEY = 'ann-theme';
export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});

export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_TIME_ZONE = 'UTC';

export const API_CONFIG = Object.freeze({
  baseUrl: import.meta.env?.VITE_API_BASE_URL || '',
  wordpressUrl: import.meta.env?.VITE_WORDPRESS_API_URL || '',
  timeoutMs: Number(import.meta.env?.VITE_API_TIMEOUT_MS || 15000),
});

export const NEWS_ENDPOINTS = Object.freeze({
  articles: '/articles',
  categories: '/categories',
  search: '/search',
});

export const WORDPRESS_ENDPOINTS = Object.freeze({
  posts: '/wp-json/wp/v2/posts',
  pages: '/wp-json/wp/v2/pages',
  categories: '/wp-json/wp/v2/categories',
  tags: '/wp-json/wp/v2/tags',
  media: '/wp-json/wp/v2/media',
});
