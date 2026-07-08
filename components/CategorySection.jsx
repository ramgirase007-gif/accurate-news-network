import React, { useId, useMemo } from 'react';

const sampleArticles = [
  {
    id: 'category-story-1',
    headline: 'City council approves new measures to expand emergency response training',
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Newspapers stacked on a table beside a cup of coffee',
    date: '2026-07-08T10:30:00Z',
    author: 'Maya Chen',
    href: '#emergency-response-training',
  },
  {
    id: 'category-story-2',
    headline: 'Researchers publish new findings on coastal flood resilience planning',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A coastal community beside calm blue water',
    date: '2026-07-08T09:45:00Z',
    author: 'Daniel Brooks',
    href: '#coastal-flood-resilience',
  },
  {
    id: 'category-story-3',
    headline: 'Small businesses prepare for updated digital payment security guidance',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Customer completing a card payment at a small shop',
    date: '2026-07-08T08:55:00Z',
    author: 'Avery Thompson',
    href: '#payment-security-guidance',
  },
  {
    id: 'category-story-4',
    headline: 'Transit leaders add late-night routes for summer festivals and events',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'City bus traveling through downtown traffic at dusk',
    date: '2026-07-08T08:20:00Z',
    author: 'Priya Shah',
    href: '#summer-transit-routes',
  },
  {
    id: 'category-story-5',
    headline: 'Hospitals coordinate new safeguards after nationwide infrastructure review',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Medical professionals reviewing documents in a hospital corridor',
    date: '2026-07-08T07:40:00Z',
    author: 'Noah Bennett',
    href: '#hospital-safeguards-review',
  },
];

const formatArticleDate = (value) => {
  if (!value) {
    return 'Recently updated';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const getDateTimeValue = (value) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const normalizeArticle = (article = {}, index) => {
  const fallback = sampleArticles[index % sampleArticles.length];
  const headline = article.headline || article.title || fallback.headline;

  return {
    id: article.id || article.slug || `category-article-${index + 1}`,
    headline,
    imageUrl: article.imageUrl || article.image || article.thumbnail || fallback.imageUrl,
    imageAlt: article.imageAlt || article.alt || `Editorial image for ${headline}`,
    date: article.date || article.publishedAt || article.publishDate || fallback.date,
    author: article.author || article.byline || fallback.author,
    href: article.href || article.url || fallback.href,
  };
};

function ArticleMeta({ article, className }) {
  const dateTime = getDateTimeValue(article.date);

  return (
    <div className={className}>
      <time dateTime={dateTime}>{formatArticleDate(article.date)}</time>
      <span aria-hidden="true">•</span>
      <span>By {article.author}</span>
    </div>
  );
}

function CategoryArticleCard({ article, variant = 'secondary' }) {
  const isFeatured = variant === 'featured';

  return (
    <article className={`ann-category-section__card ann-category-section__card--${variant}`}>
      <a className="ann-category-section__image-link" href={article.href} aria-label={`Read article: ${article.headline}`}>
        <img
          className="ann-category-section__image"
          src={article.imageUrl}
          alt={article.imageAlt}
          loading={isFeatured ? 'eager' : 'lazy'}
          decoding="async"
        />
      </a>

      <div className="ann-category-section__content">
        {isFeatured ? <span className="ann-category-section__label">Featured</span> : null}
        <h3 className="ann-category-section__headline">
          <a href={article.href}>{article.headline}</a>
        </h3>
        <ArticleMeta article={article} className="ann-category-section__meta" />
      </div>
    </article>
  );
}

export default function CategorySection({
  categoryName = 'Latest News',
  articles = sampleArticles,
  viewAllHref,
  viewAllLabel = 'View All',
  className = '',
}) {
  const headingId = useId();
  const normalizedArticles = useMemo(() => {
    const source = Array.isArray(articles) && articles.length > 0 ? articles : sampleArticles;
    const paddedArticles = [...source, ...sampleArticles].slice(0, 5);

    return paddedArticles.map(normalizeArticle);
  }, [articles]);

  const [featuredArticle, ...secondaryArticles] = normalizedArticles;
  const categorySlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'news';
  const allStoriesHref = viewAllHref || `#${categorySlug}`;

  return (
    <section className={`ann-category-section${className ? ` ${className}` : ''}`} aria-labelledby={headingId}>
      <div className="ann-category-section__header">
        <div>
          <p className="ann-category-section__eyebrow">Category</p>
          <h2 id={headingId}>{categoryName}</h2>
        </div>
        <a className="ann-category-section__view-all" href={allStoriesHref} aria-label={`View all ${categoryName} articles`}>
          {viewAllLabel}
          <span aria-hidden="true"> →</span>
        </a>
      </div>

      <div className="ann-category-section__grid">
        <CategoryArticleCard article={featuredArticle} variant="featured" />
        <div className="ann-category-section__secondary-grid" aria-label={`${categoryName} secondary articles`}>
          {secondaryArticles.slice(0, 4).map((article) => (
            <CategoryArticleCard article={article} key={article.id} />
          ))}
        </div>
      </div>

      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .ann-category-section {
    --category-accent: #b91c1c;
    --category-accent-dark: #7f1d1d;
    --category-border: rgba(17, 24, 39, 0.1);
    --category-muted: #6b7280;
    --category-text: #111827;
    --category-surface: #ffffff;
    color: var(--category-text);
    margin: 0 auto;
    max-width: 1180px;
    padding: clamp(2.5rem, 5vw, 4.5rem) 1rem;
    width: 100%;
  }

  .ann-category-section__header {
    align-items: end;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
  }

  .ann-category-section__eyebrow {
    color: var(--category-accent);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    margin: 0 0 0.45rem;
    text-transform: uppercase;
  }

  .ann-category-section__header h2 {
    font-size: clamp(2rem, 4vw, 3.35rem);
    letter-spacing: -0.045em;
    line-height: 0.95;
    margin: 0;
  }

  .ann-category-section__view-all {
    align-items: center;
    background: var(--category-accent);
    border-radius: 999px;
    color: #ffffff;
    display: inline-flex;
    font-weight: 800;
    gap: 0.25rem;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    transition: background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
    white-space: nowrap;
  }

  .ann-category-section__view-all:hover,
  .ann-category-section__view-all:focus-visible {
    background: var(--category-accent-dark);
    box-shadow: 0 16px 30px rgba(185, 28, 28, 0.25);
    transform: translateY(-2px);
  }

  .ann-category-section__grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  }

  .ann-category-section__secondary-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ann-category-section__card {
    background: var(--category-surface);
    border: 1px solid var(--category-border);
    border-radius: 1.25rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
    transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
  }

  .ann-category-section__card:hover,
  .ann-category-section__card:focus-within {
    border-color: rgba(185, 28, 28, 0.28);
    box-shadow: 0 24px 58px rgba(15, 23, 42, 0.14);
    transform: translateY(-6px);
  }

  .ann-category-section__image-link {
    aspect-ratio: 16 / 10;
    background: #f3f4f6;
    display: block;
    overflow: hidden;
  }

  .ann-category-section__card--featured .ann-category-section__image-link {
    aspect-ratio: 16 / 11;
  }

  .ann-category-section__image {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: transform 220ms ease;
    width: 100%;
  }

  .ann-category-section__card:hover .ann-category-section__image,
  .ann-category-section__card:focus-within .ann-category-section__image {
    transform: scale(1.045);
  }

  .ann-category-section__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1rem;
  }

  .ann-category-section__card--featured .ann-category-section__content {
    padding: clamp(1.15rem, 2.4vw, 1.5rem);
  }

  .ann-category-section__label {
    align-self: flex-start;
    background: rgba(185, 28, 28, 0.1);
    border-radius: 999px;
    color: var(--category-accent-dark);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    margin-bottom: 0.85rem;
    padding: 0.35rem 0.65rem;
    text-transform: uppercase;
  }

  .ann-category-section__headline {
    font-size: clamp(1rem, 1.8vw, 1.22rem);
    letter-spacing: -0.025em;
    line-height: 1.2;
    margin: 0;
  }

  .ann-category-section__card--featured .ann-category-section__headline {
    font-size: clamp(1.45rem, 3vw, 2.15rem);
    line-height: 1.08;
  }

  .ann-category-section__headline a {
    color: inherit;
    text-decoration: none;
  }

  .ann-category-section__headline a:hover,
  .ann-category-section__headline a:focus-visible {
    color: var(--category-accent);
  }

  .ann-category-section__meta {
    align-items: center;
    color: var(--category-muted);
    display: flex;
    flex-wrap: wrap;
    font-size: 0.88rem;
    gap: 0.45rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 900px) {
    .ann-category-section__grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 680px) {
    .ann-category-section {
      padding-inline: 0.85rem;
    }

    .ann-category-section__header {
      align-items: flex-start;
      flex-direction: column;
    }

    .ann-category-section__secondary-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ann-category-section__card,
    .ann-category-section__image,
    .ann-category-section__view-all {
      transition: none;
    }

    .ann-category-section__card:hover,
    .ann-category-section__card:focus-within,
    .ann-category-section__card:hover .ann-category-section__image,
    .ann-category-section__card:focus-within .ann-category-section__image,
    .ann-category-section__view-all:hover,
    .ann-category-section__view-all:focus-visible {
      transform: none;
    }
  }
`;
