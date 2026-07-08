import React from 'react';
import { useParams } from 'react-router-dom';

import { CategorySection, Sidebar } from '../components';
import PageFrame from './PageFrame';
import { formatTitle } from './pageUtils';

export default function CategoryPage() {
  const { slug = 'news' } = useParams();
  const categoryName = formatTitle(slug) || 'News';

  return (
    <PageFrame
      eyebrow="Category"
      title={categoryName}
      description={`The latest verified ${categoryName.toLowerCase()} reporting, analysis, and context from Accurate News Network.`}
    >
      <CategorySection categoryName={categoryName} viewAllHref={`/category/${slug}`} className="ann-page__full-bleed" />
      <Sidebar weatherLocation="New York, NY" weatherSummary="Sunny, 82°F. Check local alerts before traveling." />
    </PageFrame>
  );
}
