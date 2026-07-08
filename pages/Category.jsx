import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { LoadingSkeleton, Sidebar } from '../components';
import { useLatestWordPressPosts, useWordPressCategories } from '../hooks';
import PageFrame from './PageFrame';
import { getArticlesByCategory, newsArticles } from './newsData';
import { formatTitle } from './pageUtils';

const PAGE_SIZE = 6;

const formatDate = (value) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));

export default function CategoryPage() {
  const { slug = 'news' } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const categoryName = formatTitle(slug) || 'News';
  const { data: wordpressCategories } = useWordPressCategories();
  const wordpressCategory = wordpressCategories.find((category) => category.slug === slug);
  const { data: wordpressArticles, error: wordpressError, loading: wordpressLoading } = useLatestWordPressPosts({
    page: currentPage,
    per_page: PAGE_SIZE,
    ...(wordpressCategory?.id ? { categories: wordpressCategory.id } : {}),
  });
  const fallbackArticles = useMemo(() => {
    const matches = getArticlesByCategory(categoryName);
    return matches.length > 0 ? matches : newsArticles;
  }, [categoryName]);
  const categoryArticles = wordpressArticles.length > 0 ? wordpressArticles : fallbackArticles;
  const totalPages = Math.max(1, Math.ceil(categoryArticles.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const visibleArticles = wordpressArticles.length > 0 ? wordpressArticles : categoryArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <PageFrame
      eyebrow="Category"
      title={categoryName}
      description={`The latest verified ${categoryName.toLowerCase()} reporting, analysis, and context from Accurate News Network.`}
      seo={{ path: `/category/${slug}`, keywords: [categoryName, 'news', 'verified reporting'] }}
    >
      <div className="ann-category-page">
        <section className="ann-category-page__main" aria-labelledby="category-news-title">
          <div className="ann-category-page__header">
            <h2 id="category-news-title">Latest {categoryName} News</h2>
            <p>{wordpressError ? 'WordPress unavailable; showing archived coverage.' : `${categoryArticles.length} verified stories available.`}</p>
          </div>

          {wordpressLoading ? <LoadingSkeleton count={PAGE_SIZE} variant="grid" /> : null}

          <div className="ann-category-page__grid">
            {visibleArticles.map((article) => (
              <article className="ann-category-page__card" key={article.id}>
                <Link className="ann-category-page__image-link" to={`/news/${article.slug}`} aria-label={`Read ${article.headline}`}>
                  <img src={article.imageUrl} alt={article.imageAlt} loading="lazy" decoding="async" />
                </Link>
                <div className="ann-category-page__card-body">
                  <span>{article.category}</span>
                  <h3><Link to={`/news/${article.slug}`}>{article.headline}</Link></h3>
                  <p>{article.dek}</p>
                  <div className="ann-category-page__meta">
                    <span>By {article.author}</span>
                    <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <nav className="ann-category-page__pagination" aria-label={`${categoryName} pagination`}>
            <Link className={page === 1 ? 'is-disabled' : ''} to={`/category/${slug}?page=${Math.max(1, page - 1)}`} aria-disabled={page === 1}>Previous</Link>
            <span>Page {page} of {totalPages}</span>
            <Link className={page === totalPages ? 'is-disabled' : ''} to={`/category/${slug}?page=${Math.min(totalPages, page + 1)}`} aria-disabled={page === totalPages}>Next</Link>
          </nav>
        </section>
        <Sidebar weatherLocation="New York, NY" weatherSummary="Sunny, 82°F. Check local alerts before traveling." />
      </div>
      <style>{styles}</style>
    </PageFrame>
  );
}

const styles = `
  .ann-category-page { align-items: start; display: grid; gap: 1.5rem; grid-template-columns: minmax(0, 1fr) 340px; }
  .ann-category-page__main { display: grid; gap: 1.25rem; }
  .ann-category-page__header { align-items: end; display: flex; gap: 1rem; justify-content: space-between; }
  .ann-category-page__header h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); letter-spacing: -0.04em; margin: 0; }
  .ann-category-page__header p { color: #64748b; font-weight: 750; margin: 0; }
  .ann-category-page__grid { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ann-category-page__card { background: #fff; border: 1px solid rgba(17, 24, 39, 0.1); border-radius: 1.25rem; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08); overflow: hidden; }
  .ann-category-page__image-link { aspect-ratio: 16 / 10; background: #e5e7eb; display: block; overflow: hidden; }
  .ann-category-page__image-link img { height: 100%; object-fit: cover; width: 100%; }
  .ann-category-page__card-body { display: grid; gap: 0.65rem; padding: 1rem; }
  .ann-category-page__card-body > span { color: #b91c1c; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
  .ann-category-page__card h3 { font-size: 1.2rem; line-height: 1.25; margin: 0; }
  .ann-category-page__card a { color: #111827; text-decoration: none; }
  .ann-category-page__card p { color: #4b5563; margin: 0; }
  .ann-category-page__meta { color: #64748b; display: flex; flex-wrap: wrap; font-size: 0.9rem; font-weight: 750; gap: 0.5rem; justify-content: space-between; }
  .ann-category-page__pagination { align-items: center; display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
  .ann-category-page__pagination a, .ann-category-page__pagination span { border: 1px solid #cbd5e1; border-radius: 999px; color: #111827; font-weight: 850; padding: 0.7rem 1rem; text-decoration: none; }
  .ann-category-page__pagination .is-disabled { color: #94a3b8; pointer-events: none; }
  @media (max-width: 980px) { .ann-category-page { grid-template-columns: 1fr; } }
  @media (max-width: 680px) { .ann-category-page__grid { grid-template-columns: 1fr; } .ann-category-page__header { align-items: start; flex-direction: column; } }
`;
