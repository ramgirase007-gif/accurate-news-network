import React from 'react';

import {
  BreakingNewsTicker,
  CategorySection,
  HeroBanner,
  LoadingSkeleton,
  Sidebar,
  TopStories,
} from '../components';
import { useLatestWordPressPosts } from '../hooks';

const breakingNews = [
  {
    id: 'verified-live-updates',
    title: 'Editors are tracking verified live updates from the ANN newsroom',
    href: '#top-stories',
    timestamp: 'Live now',
  },
  {
    id: 'morning-briefing',
    title: 'Morning Briefing: Policy, markets, technology, and weather headlines to know',
    href: '#world',
    timestamp: 'Updated 8:00 AM',
  },
  {
    id: 'reader-note',
    title: 'Reader note: Every developing story is updated with attribution and context',
    href: '#editorial-standards',
    timestamp: 'ANN Standards',
  },
];

const categorySections = [
  { id: 'world', name: 'World', viewAllHref: '/category/world' },
  { id: 'politics', name: 'Politics', viewAllHref: '/category/politics' },
  { id: 'business', name: 'Business', viewAllHref: '/category/business' },
  { id: 'technology', name: 'Technology', viewAllHref: '/category/technology' },
  { id: 'health', name: 'Health', viewAllHref: '/category/health' },
  { id: 'sports', name: 'Sports', viewAllHref: '/category/sports' },
];

export default function Home() {
  const { data: latestPosts, error: wordpressError, loading: wordpressLoading, isConfigured } = useLatestWordPressPosts({ per_page: 12 });
  const topStories = latestPosts.slice(0, 6);

  return (
    <div className="ann-home">
      <BreakingNewsTicker news={breakingNews} />

      <main id="main-content" className="ann-home__main">
        <HeroBanner />

        <section id="top-stories" aria-label="Top stories">
          {wordpressLoading ? (
            <LoadingSkeleton count={6} variant="grid" />
          ) : (
            <TopStories stories={topStories} description={wordpressError ? 'Showing curated newsroom stories while WordPress content is unavailable.' : undefined} />
          )}
        </section>

        <div className="ann-home__category-sections" aria-label="News categories">
          {categorySections.map((category) => (
            <div id={category.id} key={category.id} className="ann-home__category-anchor">
              <CategorySection
                categoryName={category.name}
                articles={latestPosts.filter((post) => post.category.toLowerCase() === category.name.toLowerCase()).slice(0, 5)}
                viewAllHref={category.viewAllHref}
              />
            </div>
          ))}
        </div>

        {isConfigured ? null : <p className="ann-home__wp-note" role="status">Connect VITE_WORDPRESS_API_URL to publish live WordPress stories.</p>}

        <section className="ann-home__sidebar-section" aria-label="Latest updates and reader tools">
          <div className="ann-home__sidebar-inner">
            <Sidebar weatherLocation="New York, NY" weatherSummary="Sunny, 82°F. Check local alerts before traveling." />
          </div>
        </section>
      </main>


      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .ann-home {
    background:
      radial-gradient(circle at top left, rgba(185, 28, 28, 0.08), transparent 32rem),
      linear-gradient(180deg, #ffffff 0%, #f8fafc 48%, #ffffff 100%);
    color: #111827;
    min-height: 100vh;
  }

  .ann-home__main {
    display: block;
  }

  .ann-home__category-sections {
    display: grid;
    gap: clamp(0.75rem, 2vw, 1.5rem);
  }

  .ann-home__category-anchor {
    scroll-margin-top: 7rem;
  }

  .ann-home__category-anchor:nth-child(even) {
    background: rgba(248, 250, 252, 0.92);
  }

  .ann-home__wp-note { color: #64748b; font-weight: 800; margin: 0 auto; max-width: 1180px; padding: 0 1rem; }

  .ann-home__sidebar-section {
    margin: 0 auto;
    max-width: 1180px;
    padding: clamp(2.5rem, 5vw, 4.5rem) 1rem;
    width: 100%;
  }

  .ann-home__sidebar-inner {
    background: #ffffff;
    border: 1px solid rgba(17, 24, 39, 0.1);
    border-radius: 1.5rem;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
    padding: clamp(1rem, 3vw, 1.5rem);
  }

  @media (max-width: 768px) {
    .ann-home__wp-note { color: #64748b; font-weight: 800; margin: 0 auto; max-width: 1180px; padding: 0 1rem; }

  .ann-home__sidebar-section {
      padding-inline: 0.75rem;
    }

    .ann-home__sidebar-inner {
      border-radius: 1rem;
    }
  }
`;
