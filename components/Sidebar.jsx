import React, { useId, useMemo } from 'react';

const defaultTrendingNews = [
  {
    id: 'trending-1',
    headline: 'Emergency officials expand real-time alerts ahead of severe weather season',
    href: '#severe-weather-alerts',
    category: 'Local',
    date: '2026-07-08T11:05:00Z',
  },
  {
    id: 'trending-2',
    headline: 'Markets open higher as investors watch central bank guidance',
    href: '#markets-central-bank-guidance',
    category: 'Business',
    date: '2026-07-08T10:25:00Z',
  },
  {
    id: 'trending-3',
    headline: 'New research tracks how heat waves affect public transit reliability',
    href: '#heat-waves-transit-reliability',
    category: 'Science',
    date: '2026-07-08T09:55:00Z',
  },
  {
    id: 'trending-4',
    headline: 'Election offices add voter education sessions for first-time voters',
    href: '#voter-education-sessions',
    category: 'Politics',
    date: '2026-07-08T09:10:00Z',
  },
];

const defaultPopularPosts = [
  {
    id: 'popular-1',
    headline: 'What to know about new digital payment safety recommendations',
    href: '#digital-payment-safety',
    readTime: '4 min read',
  },
  {
    id: 'popular-2',
    headline: 'How cities are preparing cooling centers for summer temperatures',
    href: '#city-cooling-centers',
    readTime: '6 min read',
  },
  {
    id: 'popular-3',
    headline: 'A guide to understanding verified media labels online',
    href: '#verified-media-labels-guide',
    readTime: '5 min read',
  },
];

const defaultSocialLinks = [
  { id: 'facebook', label: 'Facebook', href: '#facebook', shortLabel: 'Fb' },
  { id: 'x', label: 'X', href: '#x', shortLabel: 'X' },
  { id: 'instagram', label: 'Instagram', href: '#instagram', shortLabel: 'Ig' },
  { id: 'youtube', label: 'YouTube', href: '#youtube', shortLabel: 'Yt' },
];

const formatDate = (value) => {
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
  }).format(date);
};

const getDateTimeValue = (value) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const normalizeTrendingItem = (item = {}, index) => {
  const fallback = defaultTrendingNews[index % defaultTrendingNews.length];

  return {
    id: item.id || item.slug || `trending-news-${index + 1}`,
    headline: item.headline || item.title || fallback.headline,
    href: item.href || item.url || fallback.href,
    category: item.category || item.section || fallback.category,
    date: item.date || item.publishedAt || item.publishDate || fallback.date,
  };
};

const normalizePopularPost = (post = {}, index) => {
  const fallback = defaultPopularPosts[index % defaultPopularPosts.length];

  return {
    id: post.id || post.slug || `popular-post-${index + 1}`,
    headline: post.headline || post.title || fallback.headline,
    href: post.href || post.url || fallback.href,
    readTime: post.readTime || post.readingTime || fallback.readTime,
  };
};

function SidebarSection({ title, children, className = '' }) {
  const headingId = useId();

  return (
    <section className={`ann-sidebar__section${className ? ` ${className}` : ''}`} aria-labelledby={headingId}>
      <h2 className="ann-sidebar__section-title" id={headingId}>{title}</h2>
      {children}
    </section>
  );
}

export default function Sidebar({
  trendingNews = defaultTrendingNews,
  popularPosts = defaultPopularPosts,
  socialLinks = defaultSocialLinks,
  newsletterAction = '#newsletter',
  newsletterTitle = 'Get the Daily Brief',
  newsletterDescription = 'Fact-checked headlines, context, and analysis delivered to your inbox every morning.',
  advertisementLabel = 'Advertisement',
  weatherLocation = 'Your City',
  weatherSummary = 'Weather widget placeholder',
  className = '',
}) {
  const emailInputId = useId();
  const newsletterHelpId = useId();
  const normalizedTrendingNews = useMemo(() => {
    const source = Array.isArray(trendingNews) && trendingNews.length > 0 ? trendingNews : defaultTrendingNews;
    return source.slice(0, 4).map(normalizeTrendingItem);
  }, [trendingNews]);
  const normalizedPopularPosts = useMemo(() => {
    const source = Array.isArray(popularPosts) && popularPosts.length > 0 ? popularPosts : defaultPopularPosts;
    return source.slice(0, 5).map(normalizePopularPost);
  }, [popularPosts]);
  const normalizedSocialLinks = Array.isArray(socialLinks) && socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <aside className={`ann-sidebar${className ? ` ${className}` : ''}`} aria-label="News sidebar">
      <SidebarSection title="Trending News">
        <ol className="ann-sidebar__trending-list">
          {normalizedTrendingNews.map((item, index) => {
            const dateTime = getDateTimeValue(item.date);

            return (
              <li className="ann-sidebar__trending-item" key={item.id}>
                <span className="ann-sidebar__rank" aria-label={`Rank ${index + 1}`}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <a className="ann-sidebar__story-link" href={item.href}>{item.headline}</a>
                  <div className="ann-sidebar__meta">
                    <span>{item.category}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={dateTime}>{formatDate(item.date)}</time>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </SidebarSection>

      <SidebarSection title="Popular Posts">
        <ol className="ann-sidebar__popular-list">
          {normalizedPopularPosts.map((post) => (
            <li className="ann-sidebar__popular-item" key={post.id}>
              <a className="ann-sidebar__story-link" href={post.href}>{post.headline}</a>
              <span className="ann-sidebar__read-time">{post.readTime}</span>
            </li>
          ))}
        </ol>
      </SidebarSection>

      <section className="ann-sidebar__ad" aria-label={advertisementLabel}>
        <span className="ann-sidebar__ad-label">{advertisementLabel}</span>
        <p>Responsive ad placement</p>
        <span className="ann-sidebar__ad-size">300 × 250</span>
      </section>

      <SidebarSection title="Weather">
        <div className="ann-sidebar__weather" role="status" aria-live="polite">
          <span className="ann-sidebar__weather-icon" aria-hidden="true">☀️</span>
          <div>
            <p className="ann-sidebar__weather-location">{weatherLocation}</p>
            <p className="ann-sidebar__weather-summary">{weatherSummary}</p>
          </div>
        </div>
      </SidebarSection>

      <SidebarSection title="Follow Us">
        <ul className="ann-sidebar__social-list" aria-label="Social media links">
          {normalizedSocialLinks.map((link) => (
            <li key={link.id || link.label}>
              <a className="ann-sidebar__social-link" href={link.href} aria-label={`Follow Accurate News Network on ${link.label}`}>
                <span aria-hidden="true">{link.shortLabel || link.label.slice(0, 2)}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <section className="ann-sidebar__newsletter" aria-labelledby={`${emailInputId}-heading`}>
        <h2 id={`${emailInputId}-heading`}>{newsletterTitle}</h2>
        <p id={newsletterHelpId}>{newsletterDescription}</p>
        <form action={newsletterAction} method="post" className="ann-sidebar__newsletter-form">
          <label htmlFor={emailInputId}>Email address</label>
          <div className="ann-sidebar__newsletter-controls">
            <input id={emailInputId} name="email" type="email" placeholder="you@example.com" autoComplete="email" aria-describedby={newsletterHelpId} required />
            <button type="submit">Subscribe</button>
          </div>
        </form>
      </section>

      <style>{styles}</style>
    </aside>
  );
}

const styles = `
  .ann-sidebar {
    --sidebar-accent: #b91c1c;
    --sidebar-accent-dark: #7f1d1d;
    --sidebar-border: rgba(17, 24, 39, 0.1);
    --sidebar-muted: #6b7280;
    --sidebar-text: #111827;
    --sidebar-surface: #ffffff;
    --sidebar-soft: #f9fafb;
    color: var(--sidebar-text);
    display: grid;
    gap: 1.25rem;
    width: 100%;
  }

  .ann-sidebar__section,
  .ann-sidebar__newsletter,
  .ann-sidebar__ad {
    background: var(--sidebar-surface);
    border: 1px solid var(--sidebar-border);
    border-radius: 1.25rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    padding: clamp(1rem, 2vw, 1.35rem);
  }

  .ann-sidebar__section-title,
  .ann-sidebar__newsletter h2 {
    font-size: 1.1rem;
    letter-spacing: -0.025em;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  .ann-sidebar__trending-list,
  .ann-sidebar__popular-list,
  .ann-sidebar__social-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ann-sidebar__trending-list,
  .ann-sidebar__popular-list {
    display: grid;
    gap: 1rem;
  }

  .ann-sidebar__trending-item {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: auto 1fr;
  }

  .ann-sidebar__rank {
    align-items: center;
    background: rgba(185, 28, 28, 0.1);
    border-radius: 999px;
    color: var(--sidebar-accent);
    display: inline-flex;
    font-size: 0.78rem;
    font-weight: 900;
    height: 2.15rem;
    justify-content: center;
    width: 2.15rem;
  }

  .ann-sidebar__story-link {
    color: var(--sidebar-text);
    display: inline-block;
    font-weight: 800;
    line-height: 1.35;
    text-decoration: none;
    transition: color 180ms ease;
  }

  .ann-sidebar__story-link:hover,
  .ann-sidebar__story-link:focus-visible {
    color: var(--sidebar-accent);
  }

  .ann-sidebar__meta,
  .ann-sidebar__read-time {
    align-items: center;
    color: var(--sidebar-muted);
    display: flex;
    flex-wrap: wrap;
    font-size: 0.86rem;
    gap: 0.35rem;
    margin-top: 0.35rem;
  }

  .ann-sidebar__popular-item + .ann-sidebar__popular-item {
    border-top: 1px solid var(--sidebar-border);
    padding-top: 1rem;
  }

  .ann-sidebar__ad {
    align-items: center;
    background: linear-gradient(135deg, #f3f4f6, #ffffff);
    color: var(--sidebar-muted);
    display: grid;
    min-height: 250px;
    place-items: center;
    text-align: center;
  }

  .ann-sidebar__ad-label,
  .ann-sidebar__ad-size {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .ann-sidebar__ad p {
    color: var(--sidebar-text);
    font-size: 1.15rem;
    font-weight: 800;
    margin: 0.35rem 0;
  }

  .ann-sidebar__weather {
    align-items: center;
    background: var(--sidebar-soft);
    border-radius: 1rem;
    display: flex;
    gap: 0.85rem;
    padding: 1rem;
  }

  .ann-sidebar__weather-icon {
    font-size: 2rem;
  }

  .ann-sidebar__weather-location,
  .ann-sidebar__weather-summary,
  .ann-sidebar__newsletter p {
    margin: 0;
  }

  .ann-sidebar__weather-location {
    font-weight: 900;
  }

  .ann-sidebar__weather-summary,
  .ann-sidebar__newsletter p {
    color: var(--sidebar-muted);
  }

  .ann-sidebar__social-list {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ann-sidebar__social-link {
    align-items: center;
    border: 1px solid var(--sidebar-border);
    border-radius: 999px;
    color: var(--sidebar-text);
    display: flex;
    font-weight: 800;
    gap: 0.5rem;
    min-height: 2.6rem;
    padding: 0.55rem 0.75rem;
    text-decoration: none;
    transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .ann-sidebar__social-link:hover,
  .ann-sidebar__social-link:focus-visible {
    border-color: rgba(185, 28, 28, 0.35);
    color: var(--sidebar-accent);
    transform: translateY(-2px);
  }

  .ann-sidebar__social-link span {
    align-items: center;
    background: var(--sidebar-accent);
    border-radius: 999px;
    color: #ffffff;
    display: inline-flex;
    font-size: 0.72rem;
    height: 1.75rem;
    justify-content: center;
    width: 1.75rem;
  }

  .ann-sidebar__newsletter {
    background: #111827;
    color: #ffffff;
  }

  .ann-sidebar__newsletter p {
    color: rgba(255, 255, 255, 0.76);
  }

  .ann-sidebar__newsletter-form {
    display: grid;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .ann-sidebar__newsletter-form label {
    font-size: 0.9rem;
    font-weight: 800;
  }

  .ann-sidebar__newsletter-controls {
    display: grid;
    gap: 0.65rem;
  }

  .ann-sidebar__newsletter input,
  .ann-sidebar__newsletter button {
    border: 0;
    border-radius: 999px;
    font: inherit;
    min-height: 2.85rem;
    padding: 0.75rem 1rem;
  }

  .ann-sidebar__newsletter input {
    background: #ffffff;
    color: var(--sidebar-text);
    width: 100%;
  }

  .ann-sidebar__newsletter button {
    background: var(--sidebar-accent);
    color: #ffffff;
    cursor: pointer;
    font-weight: 900;
    transition: background-color 180ms ease, transform 180ms ease;
  }

  .ann-sidebar__newsletter button:hover,
  .ann-sidebar__newsletter button:focus-visible {
    background: var(--sidebar-accent-dark);
    transform: translateY(-2px);
  }

  .ann-sidebar a:focus-visible,
  .ann-sidebar button:focus-visible,
  .ann-sidebar input:focus-visible {
    outline: 3px solid rgba(185, 28, 28, 0.35);
    outline-offset: 3px;
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    .ann-sidebar {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .ann-sidebar__newsletter,
    .ann-sidebar__ad {
      grid-column: span 2;
    }

    .ann-sidebar__newsletter-controls {
      grid-template-columns: 1fr auto;
    }
  }

  @media (min-width: 1024px) {
    .ann-sidebar {
      align-content: start;
      max-width: 360px;
    }
  }
`;
