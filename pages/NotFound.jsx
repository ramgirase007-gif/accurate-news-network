import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import PageFrame from './PageFrame';
import { categories, formatTitle } from './pageUtils';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <PageFrame eyebrow="404" title="Page not found" description={`No ANN page exists at ${location.pathname}.`}>
      <nav className="ann-page__link-list" aria-label="Helpful links">
        <Link to="/">Home</Link>
        {categories.map((category) => (
          <Link key={category} to={`/category/${category}`}>{formatTitle(category)}</Link>
        ))}
      </nav>
    </PageFrame>
  );
}
