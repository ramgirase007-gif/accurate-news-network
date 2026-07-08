import { useId, useMemo, useState } from 'react';

const defaultNewsItems = [
  {
    id: 'ann-breaking-placeholder-1',
    title: 'Editors are verifying urgent developments as they happen',
    href: '#breaking-news',
    timestamp: 'Live now',
  },
];

const normalizeNewsItem = (item, index) => {
  if (!item) {
    return {
      id: `breaking-news-${index}`,
      title: '',
      href: undefined,
      timestamp: undefined,
    };
  }

  if (typeof item === 'string') {
    return {
      id: `breaking-news-${index}`,
      title: item,
      href: undefined,
      timestamp: undefined,
    };
  }

  return {
    id: item.id || item.slug || `breaking-news-${index}`,
    title: item.title || item.headline || 'Breaking news update',
    href: item.href || item.url,
    timestamp: item.timestamp || item.time || item.publishedAt,
  };
};

export default function BreakingNewsTicker({
  news = defaultNewsItems,
  ariaLabel = 'Breaking news ticker',
  autoScroll = true,
  className = '',
}) {
  const tickerId = useId();
  const normalizedNews = useMemo(() => {
    const items = Array.isArray(news) && news.length > 0 ? news : defaultNewsItems;
    return items.map(normalizeNewsItem).filter((item) => item.title);
  }, [news]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeActiveIndex = normalizedNews.length ? activeIndex % normalizedNews.length : 0;

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? normalizedNews.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === normalizedNews.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const orderedNews = useMemo(() => {
    if (normalizedNews.length < 2) {
      return normalizedNews;
    }

    return [
      ...normalizedNews.slice(safeActiveIndex),
      ...normalizedNews.slice(0, safeActiveIndex),
    ];
  }, [safeActiveIndex, normalizedNews]);
  const tickerItems = orderedNews.length > 1 ? [...orderedNews, ...orderedNews] : orderedNews;
  const hasMultipleItems = normalizedNews.length > 1;

  return (
    <section
      className={`breaking-news-ticker${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="breaking-news-ticker__inner">
        <div className="breaking-news-ticker__label">
          <span className="breaking-news-ticker__pulse" />
          <strong>BREAKING</strong>
        </div>

        <div className="breaking-news-ticker__viewport" aria-live="polite" id={tickerId}>
          <div
            className={`breaking-news-ticker__track${autoScroll && hasMultipleItems ? ' breaking-news-ticker__track--animated' : ''}${
              isPaused ? ' breaking-news-ticker__track--paused' : ''
            }`}
          >
            {tickerItems.map((item, index) => (
              <article className="breaking-news-ticker__item" key={`${item.id}-${index}`}>
                {item.timestamp ? <time>{item.timestamp}</time> : null}
                {item.href ? (
                  <a href={item.href}>{item.title}</a>
                ) : (
                  <span>{item.title}</span>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="breaking-news-ticker__controls" aria-label="Breaking news controls">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={!hasMultipleItems}
            aria-controls={tickerId}
            aria-label="Show previous breaking news item"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={!hasMultipleItems}
            aria-controls={tickerId}
            aria-label="Show next breaking news item"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .breaking-news-ticker {
    --ticker-red: #b91c1c;
    --ticker-red-dark: #7f1d1d;
    --ticker-text: #111827;
    --ticker-muted: #6b7280;
    --ticker-border: rgba(185, 28, 28, 0.22);
    --ticker-surface: #ffffff;
    background: linear-gradient(135deg, #fff 0%, #fff7f7 100%);
    border-block: 1px solid var(--ticker-border);
    color: var(--ticker-text);
    width: 100%;
  }

  .breaking-news-ticker__inner {
    align-items: center;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
    margin: 0 auto;
    max-width: 1180px;
    min-height: 3.5rem;
    padding: 0.6rem 1rem;
  }

  .breaking-news-ticker__label {
    align-items: center;
    background: var(--ticker-red);
    border-radius: 999px;
    color: #ffffff;
    display: inline-flex;
    font-size: 0.78rem;
    gap: 0.45rem;
    letter-spacing: 0.08em;
    line-height: 1;
    padding: 0.55rem 0.8rem;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .breaking-news-ticker__pulse {
    animation: breaking-news-pulse 1.25s ease-in-out infinite;
    background: #ffffff;
    border-radius: 999px;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.72);
    height: 0.55rem;
    width: 0.55rem;
  }

  .breaking-news-ticker__viewport {
    overflow: hidden;
    position: relative;
  }

  .breaking-news-ticker__viewport::before,
  .breaking-news-ticker__viewport::after {
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2rem;
    z-index: 1;
  }

  .breaking-news-ticker__viewport::before {
    background: linear-gradient(90deg, #fff8f8, transparent);
    left: 0;
  }

  .breaking-news-ticker__viewport::after {
    background: linear-gradient(270deg, #fff8f8, transparent);
    right: 0;
  }

  .breaking-news-ticker__track {
    align-items: center;
    display: flex;
    width: max-content;
  }

  .breaking-news-ticker__track--animated {
    animation: breaking-news-scroll 30s linear infinite;
  }

  .breaking-news-ticker__track--paused,
  .breaking-news-ticker:hover .breaking-news-ticker__track--animated,
  .breaking-news-ticker:focus-within .breaking-news-ticker__track--animated {
    animation-play-state: paused;
  }

  .breaking-news-ticker__item {
    align-items: center;
    display: inline-flex;
    flex: 0 0 100%;
    gap: 0.75rem;
    min-width: min(72vw, 54rem);
    padding-inline: 2rem;
    white-space: nowrap;
  }

  .breaking-news-ticker__item time {
    color: var(--ticker-muted);
    flex: 0 0 auto;
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .breaking-news-ticker__item a,
  .breaking-news-ticker__item span {
    color: inherit;
    font-size: clamp(0.95rem, 1.7vw, 1.05rem);
    font-weight: 700;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
  }

  .breaking-news-ticker__item a:hover,
  .breaking-news-ticker__item a:focus-visible {
    color: var(--ticker-red-dark);
    text-decoration: underline;
  }

  .breaking-news-ticker__controls {
    display: inline-flex;
    gap: 0.35rem;
  }

  .breaking-news-ticker__controls button {
    align-items: center;
    background: var(--ticker-surface);
    border: 1px solid var(--ticker-border);
    border-radius: 999px;
    color: var(--ticker-red-dark);
    cursor: pointer;
    display: inline-flex;
    font-size: 1.35rem;
    font-weight: 800;
    height: 2.15rem;
    justify-content: center;
    line-height: 1;
    transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
    width: 2.15rem;
  }

  .breaking-news-ticker__controls button:hover:not(:disabled),
  .breaking-news-ticker__controls button:focus-visible {
    background: var(--ticker-red);
    border-color: var(--ticker-red);
    color: #ffffff;
    transform: translateY(-1px);
  }

  .breaking-news-ticker__controls button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  @keyframes breaking-news-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes breaking-news-pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.72); transform: scale(1); }
    70% { box-shadow: 0 0 0 0.45rem rgba(255, 255, 255, 0); transform: scale(0.92); }
    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); transform: scale(1); }
  }

  @media (max-width: 720px) {
    .breaking-news-ticker__inner {
      grid-template-columns: 1fr auto;
      padding: 0.7rem 0.85rem;
    }

    .breaking-news-ticker__label {
      justify-self: start;
    }

    .breaking-news-ticker__viewport {
      grid-column: 1 / -1;
      grid-row: 2;
      width: 100%;
    }

    .breaking-news-ticker__controls {
      grid-column: 2;
      grid-row: 1;
    }

    .breaking-news-ticker__item {
      min-width: calc(100vw - 1.7rem);
      padding-inline: 0.35rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .breaking-news-ticker__inner {
      gap: 0.55rem;
    }

    .breaking-news-ticker__label {
      font-size: 0.7rem;
      padding: 0.48rem 0.65rem;
    }

    .breaking-news-ticker__item {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.15rem;
      white-space: normal;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .breaking-news-ticker__pulse,
    .breaking-news-ticker__track--animated {
      animation: none;
    }

    .breaking-news-ticker__controls button {
      transition: none;
    }
  }
`;
