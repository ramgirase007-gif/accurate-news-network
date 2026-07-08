import React from 'react';

const defaultTags = ['Breaking', 'Politics', 'Weather', 'Business', 'Health', 'Technology', 'Sports', 'World'];

export default function TrendingTags({ tags = defaultTags, title = 'Trending Tags', className = '' }) {
  const safeTags = Array.isArray(tags) && tags.length ? tags : defaultTags;
  return (
    <section className={`ann-trending-tags${className ? ` ${className}` : ''}`} aria-label={title}>
      <h2>{title}</h2><div className="ann-trending-tags__list">{safeTags.map((tag) => { const label = typeof tag === 'string' ? tag : tag.label; const href = typeof tag === 'string' ? `#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : tag.href; return <a key={label} href={href || '#'}>#{label}</a>; })}</div><style>{styles}</style>
    </section>
  );
}
const styles = `.ann-trending-tags{background:#fff;border:1px solid rgba(17,24,39,.1);border-radius:1.25rem;padding:1rem}.ann-trending-tags h2{font-size:1.15rem;margin:0 0 .85rem}.ann-trending-tags__list{display:flex;flex-wrap:wrap;gap:.55rem}.ann-trending-tags a{background:#f1f5f9;border:1px solid transparent;border-radius:999px;color:#334155;font-weight:850;padding:.55rem .8rem;text-decoration:none}.ann-trending-tags a:hover,.ann-trending-tags a:focus-visible{background:#fee2e2;border-color:#fecaca;color:#991b1b}`;
