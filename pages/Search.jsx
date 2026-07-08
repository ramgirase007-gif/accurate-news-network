import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { TopStories } from '../components';
import PageFrame from './PageFrame';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() || '';

  return (
    <PageFrame
      eyebrow="Search"
      title="Search Accurate News Network"
      description="Find verified reporting, topic pages, and newsroom explainers."
    >
      <form className="ann-search" role="search" action="/search" method="get">
        <label htmlFor="ann-search-query">Search terms</label>
        <div className="ann-search__row">
          <input id="ann-search-query" name="q" type="search" defaultValue={query} placeholder="Search news" />
          <button type="submit">Search</button>
        </div>
      </form>
      {query ? <TopStories title={`Results for “${query}”`} description="Placeholder results until search indexing is connected." /> : null}
    </PageFrame>
  );
}
