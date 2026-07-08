import React from 'react';
import { Link, useParams } from 'react-router-dom';

import PageFrame from './PageFrame';
import { formatTitle } from './pageUtils';

export default function ArticlePage() {
  const { slug = 'developing-story' } = useParams();
  const headline = formatTitle(slug) || 'Developing Story';

  return (
    <PageFrame
      eyebrow="Article"
      title={headline}
      description="This production-ready route is ready to connect to the ANN article service when story data is available."
    >
      <article className="ann-article" aria-labelledby="page-title">
        <p className="ann-article__meta">By Accurate News Network • Updated today</p>
        <p>
          Editors are preparing this article page for publication. The route, layout, and accessible reading surface are in
          place so verified story content can be rendered without changing the routing layer.
        </p>
        <Link className="ann-page__button" to="/">
          Return to top stories
        </Link>
      </article>
    </PageFrame>
  );
}
