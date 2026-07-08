import React from 'react';

import PageFrame from './PageFrame';

function InfoCard({ title, children }) {
  return (
    <article className="ann-page__card">
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}

export default function AboutPage() {
  return (
    <PageFrame eyebrow="About" title="About Accurate News Network" description="Independent reporting, transparent sourcing, and context-rich journalism for every reader.">
      <div className="ann-page__card-grid">
        <InfoCard title="Verification first">Claims are checked, attributed, and updated as new facts emerge.</InfoCard>
        <InfoCard title="Accessible by design">Pages are built for keyboard navigation, responsive reading, and clear hierarchy.</InfoCard>
        <InfoCard title="Reader trust">Corrections and editorial standards are designed to be visible and accountable.</InfoCard>
      </div>
    </PageFrame>
  );
}
