import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { LoadingSkeleton } from '../components';
import { useWordPressSearch } from '../hooks';
import PageFrame from './PageFrame';
import { searchArticles } from './newsData';

const formatDate = (value) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() || '';
  const fallbackResults = useMemo(() => searchArticles(query), [query]);
  const { data: wordpressResults, error: wordpressError, loading: wordpressLoading } = useWordPressSearch(query, { per_page: 12 });
  const results = wordpressResults.length > 0 ? wordpressResults : fallbackResults;

  return (
    <PageFrame
      eyebrow="Search"
      title="Search Accurate News Network"
      description="Find verified reporting, topic pages, and newsroom explainers."
      seo={{ path: query ? `/search?q=${encodeURIComponent(query)}` : '/search', keywords: [query, 'news search', 'ANN'].filter(Boolean) }}
    >
      <form className="ann-search" role="search" action="/search" method="get">
        <label htmlFor="ann-search-query">Search terms</label>
        <div className="ann-search__row">
          <input id="ann-search-query" name="q" type="search" defaultValue={query} placeholder="Search news" autoComplete="off" />
          <button type="submit">Search</button>
        </div>
      </form>

      <section className="ann-search-results" aria-labelledby="search-results-title" aria-live="polite">
        <div className="ann-search-results__header">
          <h2 id="search-results-title">{query ? `Results for “${query}”` : 'Start a search'}</h2>
          {query ? <p>{wordpressError ? 'WordPress search unavailable; showing archived matches.' : `${results.length} matching stories`}</p> : <p>Enter a topic, category, reporter, or tag.</p>}
        </div>

        {wordpressLoading ? <LoadingSkeleton count={3} /> : null}

        {query && !wordpressLoading && results.length === 0 ? (
          <div className="ann-search-results__empty" role="status">
            <h3>No results found</h3>
            <p>Try a broader topic such as climate, business, technology, health, or sports.</p>
          </div>
        ) : null}

        {!wordpressLoading && results.length > 0 ? (
          <div className="ann-search-results__list">
            {results.map((article) => (
              <article className="ann-search-results__item" key={article.id}>
                <img src={article.imageUrl} alt={article.imageAlt} loading="lazy" decoding="async" />
                <div>
                  <span>{article.category}</span>
                  <h3><Link to={`/news/${article.slug}`}>{article.headline}</Link></h3>
                  <p>{article.dek}</p>
                  <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
      <style>{styles}</style>
    </PageFrame>
  );
}

const styles = `
  .ann-search-results { background: #fff; border: 1px solid rgba(17, 24, 39, 0.1); border-radius: 1.25rem; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08); padding: clamp(1.25rem, 3vw, 2rem); }
  .ann-search-results__header { align-items: end; display: flex; gap: 1rem; justify-content: space-between; margin-bottom: 1rem; }
  .ann-search-results__header h2 { font-size: clamp(1.5rem, 3vw, 2.2rem); margin: 0; }
  .ann-search-results__header p, .ann-search-results__item p, .ann-search-results__item time { color: #64748b; margin: 0; }
  .ann-search-results__empty { background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 1rem; padding: 2rem; text-align: center; }
  .ann-search-results__empty h3 { margin: 0 0 0.5rem; }
  .ann-search-results__list { display: grid; gap: 1rem; }
  .ann-search-results__item { display: grid; gap: 1rem; grid-template-columns: 180px minmax(0, 1fr); }
  .ann-search-results__item img { aspect-ratio: 16 / 10; border-radius: 0.9rem; height: auto; object-fit: cover; width: 100%; }
  .ann-search-results__item span { color: #b91c1c; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
  .ann-search-results__item h3 { margin: 0.25rem 0; }
  .ann-search-results__item a { color: #111827; text-decoration: none; }
  @media (max-width: 640px) { .ann-search-results__header, .ann-search-results__item { display: block; } .ann-search-results__item img { margin-bottom: 0.75rem; } }
`;
