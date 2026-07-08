import React, { useId, useMemo } from 'react';

const defaultFeaturedArticle = {
  id: 'featured-investigation-1',
  title: 'Inside the verification desk tracking election security claims in real time',
  description:
    'Accurate News Network reporters explain how documents, on-the-record sourcing, and local reporting are used to verify fast-moving public interest stories before publication.',
  imageUrl:
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80',
  imageAlt: 'Newsroom monitors and desks prepared for a live editorial briefing',
  category: 'Politics',
  isBreaking: true,
  publishedAt: '2026-07-08T09:30:00Z',
  author: 'Maya Chen',
  href: '#featured-story',
};

const defaultLatestNews = [
  {
    id: 'latest-1',
    title: 'Markets open higher as analysts review new inflation signals',
    category: 'Business',
    publishedAt: '2026-07-08T08:45:00Z',
    href: '#markets-open-higher',
  },
  {
    id: 'latest-2',
    title: 'Coastal communities prepare for updated storm surge guidance',
    category: 'Weather',
    publishedAt: '2026-07-08T08:20:00Z',
    href: '#storm-surge-guidance',
  },
  {
    id: 'latest-3',
    title: 'Researchers publish new review of hospital cybersecurity readiness',
    category: 'Technology',
    publishedAt: '2026-07-08T07:55:00Z',
    href: '#hospital-cybersecurity',
  },
  {
    id: 'latest-4',
    title: 'City transit agencies expand late-night service during summer events',
    category: 'Local',
    publishedAt: '2026-07-08T07:30:00Z',
    href: '#transit-service',
  },
  {
    id: 'latest-5',
    title: 'International leaders meet for emergency food security summit',
    category: 'World',
    publishedAt: '2026-07-08T07:10:00Z',
    href: '#food-security-summit',
  },
];

const formatPublishDate = (value) => {
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
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

const getDateTimeValue = (value) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const normalizeArticle = (article = {}) => ({
  id: article.id || article.slug || 'featured-article',
  title: article.title || article.headline || defaultFeaturedArticle.title,
  description: article.description || article.summary || article.excerpt || defaultFeaturedArticle.description,
  imageUrl: article.imageUrl || article.image || article.thumbnail || defaultFeaturedArticle.imageUrl,
  imageAlt: article.imageAlt || article.alt || `Featured image for ${article.title || defaultFeaturedArticle.title}`,
  category: article.category || article.section || defaultFeaturedArticle.category,
  isBreaking: typeof article.isBreaking === 'boolean' ? article.isBreaking : defaultFeaturedArticle.isBreaking,
  publishedAt: article.publishedAt || article.publishDate || article.date || defaultFeaturedArticle.publishedAt,
  author: article.author || article.byline || defaultFeaturedArticle.author,
  href: article.href || article.url || defaultFeaturedArticle.href,
});

const normalizeLatestItem = (item = {}, index) => {
  if (typeof item === 'string') {
    return {
      id: `latest-news-${index}`,
      title: item,
      category: 'Latest',
      publishedAt: undefined,
      href: undefined,
    };
  }

  return {
    id: item.id || item.slug || `latest-news-${index}`,
    title: item.title || item.headline || 'Latest news update',
    category: item.category || item.section || 'Latest',
    publishedAt: item.publishedAt || item.publishDate || item.date,
    href: item.href || item.url,
  };
};

function LatestNewsLink({ item, index }) {
  const content = (
    <>
      <span className="ann-hero__latest-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="ann-hero__latest-copy">
        <span className="ann-hero__latest-category">{item.category}</span>
        <span className="ann-hero__latest-title">{item.title}</span>
        {item.publishedAt ? (
          <time className="ann-hero__latest-time" dateTime={getDateTimeValue(item.publishedAt)}>
            {formatPublishDate(item.publishedAt)}
          </time>
        ) : null}
      </span>
    </>
  );

  if (item.href) {
    return (
      <a className="ann-hero__latest-link" href={item.href}>
        {content}
      </a>
    );
  }

  return <div className="ann-hero__latest-link ann-hero__latest-link--static">{content}</div>;
}

export default function HeroBanner({
  featuredArticle = defaultFeaturedArticle,
  latestNews = defaultLatestNews,
  eyebrow = 'Top Story',
  latestHeading = 'Latest News',
  readMoreLabel = 'Read More',
  className = '',
}) {
  const titleId = useId();
  const latestHeadingId = useId();
  const article = useMemo(() => normalizeArticle(featuredArticle), [featuredArticle]);
  const latestItems = useMemo(() => {
    const source = Array.isArray(latestNews) && latestNews.length > 0 ? latestNews : defaultLatestNews;
    return source.map(normalizeLatestItem).filter((item) => item.title).slice(0, 5);
  }, [latestNews]);
  const articleDateTime = getDateTimeValue(article.publishedAt);

  return (
    <section className={`ann-hero${className ? ` ${className}` : ''}`} aria-labelledby={titleId}>
      <div className="ann-hero__grid">
        <article className="ann-hero__featured" aria-labelledby={titleId}>
          <a className="ann-hero__image-link" href={article.href} aria-label={`Read featured story: ${article.title}`}>
            <img className="ann-hero__image" src={article.imageUrl} alt={article.imageAlt} loading="eager" />
          </a>

          <div className="ann-hero__content">
            <div className="ann-hero__badges" aria-label="Story labels">
              {article.isBreaking ? <span className="ann-hero__breaking-badge">Breaking</span> : null}
              <span className="ann-hero__category-badge">{article.category}</span>
              <span className="ann-hero__eyebrow">{eyebrow}</span>
            </div>

            <h1 className="ann-hero__title" id={titleId}>
              <a href={article.href}>{article.title}</a>
            </h1>

            <p className="ann-hero__description">{article.description}</p>

            <div className="ann-hero__meta">
              <span>By {article.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={articleDateTime}>{formatPublishDate(article.publishedAt)}</time>
            </div>

            <a className="ann-hero__button" href={article.href} aria-label={`Read more about ${article.title}`}>
              {readMoreLabel}
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </article>

        <aside className="ann-hero__latest" aria-labelledby={latestHeadingId}>
          <div className="ann-hero__latest-header">
            <span className="ann-hero__latest-kicker">Live Desk</span>
            <h2 id={latestHeadingId}>{latestHeading}</h2>
          </div>

          <ol className="ann-hero__latest-list">
            {latestItems.map((item, index) => (
              <li key={item.id}>
                <LatestNewsLink item={item} index={index} />
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .ann-hero {
    --ann-hero-red: #b91c1c;
    --ann-hero-red-dark: #7f1d1d;
    --ann-hero-blue: #1d4ed8;
    --ann-hero-ink: #0f172a;
    --ann-hero-muted: #64748b;
    --ann-hero-border: #e2e8f0;
    --ann-hero-surface: #ffffff;
    --ann-hero-soft: #f8fafc;
    color: var(--ann-hero-ink);
    margin: 0 auto;
    max-width: 1180px;
    padding: clamp(1.25rem, 3vw, 2.5rem) 1rem;
    width: 100%;
  }

  .ann-hero *,
  .ann-hero *::before,
  .ann-hero *::after {
    box-sizing: border-box;
  }

  .ann-hero a {
    color: inherit;
  }

  .ann-hero__grid {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.5rem);
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.38fr);
  }

  .ann-hero__featured,
  .ann-hero__latest {
    background: var(--ann-hero-surface);
    border: 1px solid var(--ann-hero-border);
    border-radius: 1.25rem;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
    overflow: hidden;
  }

  .ann-hero__featured {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(19rem, 0.92fr);
    min-height: 31rem;
  }

  .ann-hero__image-link {
    background: #111827;
    display: block;
    min-height: 100%;
    overflow: hidden;
  }

  .ann-hero__image {
    display: block;
    height: 100%;
    min-height: 24rem;
    object-fit: cover;
    transition: transform 220ms ease;
    width: 100%;
  }

  .ann-hero__image-link:hover .ann-hero__image,
  .ann-hero__image-link:focus-visible .ann-hero__image {
    transform: scale(1.03);
  }

  .ann-hero__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(1.25rem, 3vw, 2rem);
  }

  .ann-hero__badges {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .ann-hero__breaking-badge,
  .ann-hero__category-badge,
  .ann-hero__eyebrow,
  .ann-hero__latest-kicker,
  .ann-hero__latest-category {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .ann-hero__breaking-badge {
    background: var(--ann-hero-red);
    border-radius: 999px;
    color: #ffffff;
    padding: 0.48rem 0.72rem;
  }

  .ann-hero__category-badge {
    background: #dbeafe;
    border-radius: 999px;
    color: #1e40af;
    padding: 0.48rem 0.72rem;
  }

  .ann-hero__eyebrow,
  .ann-hero__latest-kicker,
  .ann-hero__latest-category {
    color: var(--ann-hero-red);
  }

  .ann-hero__title {
    font-size: clamp(2rem, 4vw, 3.8rem);
    letter-spacing: -0.045em;
    line-height: 0.97;
    margin: 0;
  }

  .ann-hero__title a {
    text-decoration: none;
  }

  .ann-hero__title a:hover,
  .ann-hero__title a:focus-visible {
    color: var(--ann-hero-red-dark);
  }

  .ann-hero__description {
    color: #334155;
    font-size: 1.05rem;
    line-height: 1.65;
    margin: 1.1rem 0 0;
  }

  .ann-hero__meta {
    align-items: center;
    color: var(--ann-hero-muted);
    display: flex;
    flex-wrap: wrap;
    font-size: 0.92rem;
    font-weight: 700;
    gap: 0.55rem;
    margin-top: 1rem;
  }

  .ann-hero__button {
    align-items: center;
    align-self: flex-start;
    background: var(--ann-hero-red);
    border-radius: 999px;
    color: #ffffff;
    display: inline-flex;
    font-weight: 800;
    justify-content: center;
    margin-top: 1.4rem;
    min-height: 2.9rem;
    padding: 0.8rem 1.15rem;
    text-decoration: none;
    transition: background 160ms ease, transform 160ms ease;
  }

  .ann-hero__button:hover,
  .ann-hero__button:focus-visible {
    background: var(--ann-hero-red-dark);
    transform: translateY(-1px);
  }

  .ann-hero__latest {
    padding: 1.25rem;
  }

  .ann-hero__latest-header {
    border-bottom: 1px solid var(--ann-hero-border);
    padding-bottom: 1rem;
  }

  .ann-hero__latest-header h2 {
    font-size: clamp(1.45rem, 2.5vw, 2rem);
    letter-spacing: -0.035em;
    line-height: 1.05;
    margin: 0.25rem 0 0;
  }

  .ann-hero__latest-list {
    display: grid;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ann-hero__latest-list li + li {
    border-top: 1px solid var(--ann-hero-border);
  }

  .ann-hero__latest-link {
    align-items: flex-start;
    display: grid;
    gap: 0.85rem;
    grid-template-columns: auto minmax(0, 1fr);
    padding: 1rem 0;
    text-decoration: none;
  }

  .ann-hero__latest-link:not(.ann-hero__latest-link--static):hover .ann-hero__latest-title,
  .ann-hero__latest-link:not(.ann-hero__latest-link--static):focus-visible .ann-hero__latest-title {
    color: var(--ann-hero-red-dark);
    text-decoration: underline;
    text-decoration-thickness: 0.1em;
    text-underline-offset: 0.18em;
  }

  .ann-hero__latest-number {
    color: #cbd5e1;
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .ann-hero__latest-copy {
    display: grid;
    gap: 0.35rem;
  }

  .ann-hero__latest-title {
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .ann-hero__latest-time {
    color: var(--ann-hero-muted);
    font-size: 0.82rem;
    font-weight: 700;
  }

  .ann-hero :focus-visible {
    outline: 3px solid var(--ann-hero-blue);
    outline-offset: 3px;
  }

  @media (max-width: 1024px) {
    .ann-hero__grid,
    .ann-hero__featured {
      grid-template-columns: 1fr;
    }

    .ann-hero__featured {
      min-height: 0;
    }

    .ann-hero__latest-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .ann-hero__latest-list li:nth-child(2) {
      border-top: 0;
    }

    .ann-hero__latest-list li:nth-child(odd) {
      padding-right: 0.85rem;
    }

    .ann-hero__latest-list li:nth-child(even) {
      border-left: 1px solid var(--ann-hero-border);
      padding-left: 0.85rem;
    }
  }

  @media (max-width: 640px) {
    .ann-hero {
      padding-inline: 0.75rem;
    }

    .ann-hero__featured,
    .ann-hero__latest {
      border-radius: 1rem;
    }

    .ann-hero__image {
      min-height: 17rem;
    }

    .ann-hero__content,
    .ann-hero__latest {
      padding: 1rem;
    }

    .ann-hero__description {
      font-size: 1rem;
    }

    .ann-hero__latest-list {
      grid-template-columns: 1fr;
    }

    .ann-hero__latest-list li:nth-child(2) {
      border-top: 1px solid var(--ann-hero-border);
    }

    .ann-hero__latest-list li:nth-child(odd),
    .ann-hero__latest-list li:nth-child(even) {
      border-left: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;
