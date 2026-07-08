import { useEffect } from 'react';

import { APP_NAME, APP_TAGLINE, PRODUCTION_CONFIG } from '../utils/constants';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=70';

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const getAbsoluteUrl = (path = '/') => {
  const canonicalBase = PRODUCTION_CONFIG.siteUrl.replace(/\/$/, '');
  if (/^https?:\/\//i.test(path)) return path;
  return `${canonicalBase}${path.startsWith('/') ? path : `/${path}`}`;
};

export default function SEO({
  title = APP_NAME,
  description = APP_TAGLINE,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords = ['accurate news', 'verified reporting', 'breaking news'],
}) {
  useEffect(() => {
    const pageTitle = title === APP_NAME ? title : `${title} | ${APP_NAME}`;
    const canonicalUrl = getAbsoluteUrl(path);
    const imageUrl = getAbsoluteUrl(image);

    document.title = pageTitle;
    upsertLink('canonical', canonicalUrl);
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: APP_NAME });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
  }, [description, image, keywords, path, title, type]);

  return null;
}
