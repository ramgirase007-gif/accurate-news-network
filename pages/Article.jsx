import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Sidebar } from '../components';
import PageFrame from './PageFrame';
import { formatTitle } from './pageUtils';

const relatedNews = [
  {
    id: 'verified-media-labels',
    headline: 'Technology firms release joint standards for verified media labels',
    href: '/news/verified-media-labels',
    category: 'Technology',
    date: '2026-07-08T08:35:00Z',
  },
  {
    id: 'digital-payments-guidance',
    headline: 'Small businesses prepare for new digital payments guidance',
    href: '/news/digital-payments-guidance',
    category: 'Business',
    date: '2026-07-08T08:10:00Z',
  },
  {
    id: 'late-night-transit-routes',
    headline: 'Transit agencies expand late-night routes for major summer events',
    href: '/news/late-night-transit-routes',
    category: 'Local',
    date: '2026-07-08T09:05:00Z',
  },
];

const tagLinks = ['Accountability', 'Public policy', 'Community impact', 'Explainer'];

const formatArticleDate = (value) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(value));

export default function ArticlePage() {
  const { slug = 'developing-story' } = useParams();
  const headline = formatTitle(slug) || 'Developing Story';
  const article = useMemo(
    () => ({
      headline,
      dek: 'A verified briefing from the Accurate News Network newsroom with context, source notes, and what readers should watch next.',
      imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=85',
      imageAlt: 'Newspapers stacked next to a cup of coffee in a newsroom setting',
      author: 'Maya Chen',
      authorTitle: 'Senior National Correspondent',
      publishDate: '2026-07-08T12:00:00Z',
      category: 'World',
      content: [
        'Accurate News Network is following this developing story with a focus on verified facts, primary-source documents, and clearly labeled context. Editors will update this page as new information is confirmed by the newsroom.',
        'Officials and community leaders described the latest developments as consequential but still evolving. The newsroom has reviewed available records, requested additional comment from relevant agencies, and compared statements with public data where available.',
        'The immediate impact for readers depends on location, timing, and any guidance issued by local authorities. ANN recommends checking official alerts, saving important documents, and following updates from trusted local services when a story affects travel, safety, or public services.',
        'This article page is designed for long-form reporting, including follow-up paragraphs, source acknowledgements, related coverage, and share tools. It can be connected to live article data without changing the accessible reading layout.',
      ],
    }),
    [headline],
  );
  const formattedDate = formatArticleDate(article.publishDate);
  const shareText = encodeURIComponent(article.headline);
  const shareUrl = encodeURIComponent(typeof window === 'undefined' ? `/news/${slug}` : window.location.href);

  return (
    <PageFrame eyebrow={article.category} title={article.headline} description={article.dek}>
      <nav className="ann-article-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/category/${article.category.toLowerCase()}`}>{article.category}</Link></li>
          <li aria-current="page">{article.headline}</li>
        </ol>
      </nav>

      <div className="ann-article-layout">
        <article className="ann-article ann-article--feature" aria-labelledby="page-title">
          <figure className="ann-article__figure">
            <img src={article.imageUrl} alt={article.imageAlt} className="ann-article__image" />
            <figcaption>ANN editors pair every featured image with descriptive alternative text and caption-ready context.</figcaption>
          </figure>

          <header className="ann-article__header">
            <div className="ann-article__kicker">{article.category}</div>
            <p className="ann-article__meta">
              By <Link to="/about">{article.author}</Link>, {article.authorTitle} •{' '}
              <time dateTime={article.publishDate}>{formattedDate}</time>
            </p>
          </header>

          <div className="ann-article__body">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section className="ann-article__share" aria-labelledby="share-title">
            <h2 id="share-title">Share this story</h2>
            <div className="ann-article__share-buttons">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">Facebook</a>
              <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noreferrer">X</a>
              <a href={`mailto:?subject=${shareText}&body=${shareUrl}`}>Email</a>
            </div>
          </section>

          <section className="ann-article__tags" aria-labelledby="tags-title">
            <h2 id="tags-title">Tags</h2>
            <ul>
              {tagLinks.map((tag) => (
                <li key={tag}><Link to={`/search?q=${encodeURIComponent(tag)}`}>{tag}</Link></li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="ann-article__aside" aria-label="Article sidebar">
          <section className="ann-article__related" aria-labelledby="related-title">
            <h2 id="related-title">Related news</h2>
            <div className="ann-article__related-list">
              {relatedNews.map((story) => (
                <article key={story.id} className="ann-article__related-card">
                  <span>{story.category}</span>
                  <h3><Link to={story.href}>{story.headline}</Link></h3>
                  <time dateTime={story.date}>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(story.date))}</time>
                </article>
              ))}
            </div>
          </section>
          <Sidebar className="ann-article__sidebar-widget" />
        </aside>
      </div>

      <style>{styles}</style>
    </PageFrame>
  );
}

const styles = `
  .ann-article-breadcrumb ol { align-items: center; color: #64748b; display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; margin: 0; padding: 0; }
  .ann-article-breadcrumb li:not(:last-child)::after { content: '/'; margin-left: 0.5rem; }
  .ann-article-breadcrumb a { color: #991b1b; font-weight: 800; text-decoration: none; }
  .ann-article-layout { align-items: start; display: grid; gap: 1.5rem; grid-template-columns: minmax(0, 1fr) 360px; }
  .ann-article--feature { max-width: none; overflow: hidden; padding: 0; }
  .ann-article__figure { margin: 0; }
  .ann-article__image { aspect-ratio: 16 / 9; display: block; height: auto; object-fit: cover; width: 100%; }
  .ann-article__figure figcaption { color: #64748b; font-size: 0.92rem; padding: 0.75rem clamp(1.25rem, 3vw, 2rem) 0; }
  .ann-article__header, .ann-article__body, .ann-article__share, .ann-article__tags { padding-inline: clamp(1.25rem, 3vw, 2rem); }
  .ann-article__header { padding-top: 1.5rem; }
  .ann-article__kicker { color: #b91c1c; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; }
  .ann-article__meta a { color: #991b1b; }
  .ann-article__body { color: #1f2937; font-size: clamp(1.05rem, 1.6vw, 1.18rem); line-height: 1.8; }
  .ann-article__body p { margin: 0 0 1.25rem; }
  .ann-article__share, .ann-article__tags { border-top: 1px solid rgba(17, 24, 39, 0.1); padding-bottom: 1.5rem; padding-top: 1.5rem; }
  .ann-article__share h2, .ann-article__tags h2, .ann-article__related h2 { font-size: 1rem; margin: 0 0 0.85rem; }
  .ann-article__share-buttons, .ann-article__tags ul { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .ann-article__share-buttons a, .ann-article__tags a { border: 1px solid #cbd5e1; border-radius: 999px; color: #111827; font-weight: 850; padding: 0.65rem 0.9rem; text-decoration: none; }
  .ann-article__tags ul { list-style: none; margin: 0; padding: 0; }
  .ann-article__aside { display: grid; gap: 1rem; }
  .ann-article__related { background: #ffffff; border: 1px solid rgba(17, 24, 39, 0.1); border-radius: 1.25rem; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08); padding: 1.25rem; }
  .ann-article__related-list { display: grid; gap: 1rem; }
  .ann-article__related-card { border-bottom: 1px solid rgba(17, 24, 39, 0.1); padding-bottom: 1rem; }
  .ann-article__related-card:last-child { border-bottom: 0; padding-bottom: 0; }
  .ann-article__related-card span, .ann-article__related-card time { color: #64748b; font-size: 0.85rem; font-weight: 800; }
  .ann-article__related-card h3 { font-size: 1rem; line-height: 1.3; margin: 0.35rem 0; }
  .ann-article__related-card a { color: #111827; text-decoration: none; }
  .ann-article__sidebar-widget { padding: 0; }
  @media (max-width: 980px) { .ann-article-layout { grid-template-columns: 1fr; } }
  @media (max-width: 640px) { .ann-article-breadcrumb ol { font-size: 0.92rem; } .ann-article__share-buttons a, .ann-article__tags a { width: 100%; justify-content: center; text-align: center; } }
`;
