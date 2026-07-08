import { useId, useMemo } from 'react';

const defaultStories = [
  {
    id: 'top-story-1',
    headline: 'Global leaders announce new climate resilience funding package',
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Newspapers stacked beside a cup of coffee',
    category: 'World',
    date: '2026-07-08T10:15:00Z',
    author: 'Elena Rodriguez',
    href: '#climate-resilience-funding',
  },
  {
    id: 'top-story-2',
    headline: 'Hospitals adopt updated safeguards after nationwide security review',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Medical team reviewing patient charts in a hospital corridor',
    category: 'Health',
    date: '2026-07-08T09:40:00Z',
    author: 'Noah Bennett',
    href: '#hospital-security-review',
  },
  {
    id: 'top-story-3',
    headline: 'Transit agencies expand late-night routes for major summer events',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'City bus moving through an urban street at dusk',
    category: 'Local',
    date: '2026-07-08T09:05:00Z',
    author: 'Priya Shah',
    href: '#late-night-transit-routes',
  },
  {
    id: 'top-story-4',
    headline: 'Technology firms release joint standards for verified media labels',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Laptop showing analytics dashboards on a desk',
    category: 'Technology',
    date: '2026-07-08T08:35:00Z',
    author: 'Marcus Lee',
    href: '#verified-media-labels',
  },
  {
    id: 'top-story-5',
    headline: 'Small businesses prepare for new digital payments guidance',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Shop owner processing a customer card payment',
    category: 'Business',
    date: '2026-07-08T08:10:00Z',
    author: 'Avery Thompson',
    href: '#digital-payments-guidance',
  },
  {
    id: 'top-story-6',
    headline: 'Researchers map how extreme heat changes school sports schedules',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Outdoor running track under a bright summer sky',
    category: 'Sports',
    date: '2026-07-08T07:45:00Z',
    author: 'Jordan Kim',
    href: '#heat-school-sports-schedules',
  },
];

const formatStoryDate = (value) => {
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

const normalizeStory = (story = {}, index) => ({
  id: story.id || story.slug || `top-story-${index + 1}`,
  headline: story.headline || story.title || 'Developing story from Accurate News Network',
  imageUrl: story.imageUrl || story.image || story.thumbnail || defaultStories[index % defaultStories.length].imageUrl,
  imageAlt:
    story.imageAlt ||
    story.alt ||
    `Editorial image for ${story.headline || story.title || 'top story'}`,
  category: story.category || story.section || 'News',
  date: story.date || story.publishedAt || story.publishDate,
  author: story.author || story.byline || 'Accurate News Network',
  href: story.href || story.url || '#top-story',
});

export default function TopStories({
  stories = defaultStories,
  eyebrow = 'Editor Picks',
  title = 'Top Stories',
  description = 'Essential reporting and analysis from the Accurate News Network newsroom.',
  readMoreLabel = 'Read More',
  className = '',
}) {
  const headingId = useId();
  const normalizedStories = useMemo(() => {
    const source = Array.isArray(stories) && stories.length > 0 ? stories : defaultStories;
    const paddedStories = [...source, ...defaultStories].slice(0, 6);

    return paddedStories.map(normalizeStory);
  }, [stories]);

  return (
    <section className={`ann-top-stories${className ? ` ${className}` : ''}`} aria-labelledby={headingId}>
      <div className="ann-top-stories__header">
        <p className="ann-top-stories__eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
        {description ? <p className="ann-top-stories__description">{description}</p> : null}
      </div>

      <div className="ann-top-stories__grid">
        {normalizedStories.map((story) => {
          const dateTime = getDateTimeValue(story.date);

          return (
            <article className="ann-top-stories__card" key={story.id}>
              <a className="ann-top-stories__image-link" href={story.href} aria-label={`Read story: ${story.headline}`}>
                <img className="ann-top-stories__image" src={story.imageUrl} alt={story.imageAlt} loading="lazy" decoding="async" />
              </a>

              <div className="ann-top-stories__content">
                <span className="ann-top-stories__category">{story.category}</span>
                <h3 className="ann-top-stories__headline">
                  <a href={story.href}>{story.headline}</a>
                </h3>
                <div className="ann-top-stories__meta">
                  <time dateTime={dateTime}>{formatStoryDate(story.date)}</time>
                  <span aria-hidden="true">•</span>
                  <span>By {story.author}</span>
                </div>
                <a className="ann-top-stories__read-more" href={story.href} aria-label={`Read more about ${story.headline}`}>
                  {readMoreLabel}
                  <span aria-hidden="true"> →</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .ann-top-stories {
    --top-stories-accent: #b91c1c;
    --top-stories-accent-dark: #7f1d1d;
    --top-stories-border: rgba(17, 24, 39, 0.1);
    --top-stories-muted: #6b7280;
    --top-stories-text: #111827;
    --top-stories-surface: #ffffff;
    color: var(--top-stories-text);
    margin: 0 auto;
    max-width: 1180px;
    padding: clamp(2.5rem, 5vw, 4.5rem) 1rem;
    width: 100%;
  }

  .ann-top-stories__header {
    margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
    max-width: 720px;
  }

  .ann-top-stories__eyebrow {
    color: var(--top-stories-accent);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    margin: 0 0 0.45rem;
    text-transform: uppercase;
  }

  .ann-top-stories__header h2 {
    font-size: clamp(2rem, 4vw, 3.4rem);
    letter-spacing: -0.045em;
    line-height: 0.95;
    margin: 0;
  }

  .ann-top-stories__description {
    color: var(--top-stories-muted);
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    margin: 0.9rem 0 0;
  }

  .ann-top-stories__grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ann-top-stories__card {
    background: var(--top-stories-surface);
    border: 1px solid var(--top-stories-border);
    border-radius: 1.25rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
    transition: box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease;
  }

  .ann-top-stories__card:hover,
  .ann-top-stories__card:focus-within {
    border-color: rgba(185, 28, 28, 0.28);
    box-shadow: 0 24px 58px rgba(15, 23, 42, 0.14);
    transform: translateY(-6px);
  }

  .ann-top-stories__image-link {
    aspect-ratio: 16 / 10;
    background: #f3f4f6;
    display: block;
    overflow: hidden;
  }

  .ann-top-stories__image {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: transform 220ms ease;
    width: 100%;
  }

  .ann-top-stories__card:hover .ann-top-stories__image,
  .ann-top-stories__card:focus-within .ann-top-stories__image {
    transform: scale(1.045);
  }

  .ann-top-stories__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1.1rem;
  }

  .ann-top-stories__category {
    align-self: flex-start;
    background: rgba(185, 28, 28, 0.1);
    border-radius: 999px;
    color: var(--top-stories-accent-dark);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 0.35rem 0.65rem;
    text-transform: uppercase;
  }

  .ann-top-stories__headline {
    font-size: clamp(1.08rem, 2vw, 1.35rem);
    letter-spacing: -0.025em;
    line-height: 1.18;
    margin: 0.9rem 0 0;
  }

  .ann-top-stories__headline a,
  .ann-top-stories__read-more {
    color: inherit;
    text-decoration: none;
  }

  .ann-top-stories__headline a:hover,
  .ann-top-stories__headline a:focus-visible,
  .ann-top-stories__read-more:hover,
  .ann-top-stories__read-more:focus-visible {
    color: var(--top-stories-accent);
  }

  .ann-top-stories__meta {
    align-items: center;
    color: var(--top-stories-muted);
    display: flex;
    flex-wrap: wrap;
    font-size: 0.88rem;
    gap: 0.45rem;
    margin-top: 0.75rem;
  }

  .ann-top-stories__read-more {
    color: var(--top-stories-accent);
    font-weight: 800;
    margin-top: auto;
    padding-top: 1.1rem;
  }

  @media (max-width: 900px) {
    .ann-top-stories__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 620px) {
    .ann-top-stories {
      padding-inline: 0.85rem;
    }

    .ann-top-stories__grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ann-top-stories__card,
    .ann-top-stories__image {
      transition: none;
    }

    .ann-top-stories__card:hover,
    .ann-top-stories__card:focus-within,
    .ann-top-stories__card:hover .ann-top-stories__image,
    .ann-top-stories__card:focus-within .ann-top-stories__image {
      transform: none;
    }
  }
`;
