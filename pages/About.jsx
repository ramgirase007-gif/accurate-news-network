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
      <section className="ann-page__card" aria-labelledby="mission-title">
        <h2 id="mission-title">Our mission</h2>
        <p>Accurate News Network publishes verified reporting that helps readers understand what happened, why it matters, and what comes next. Our newsroom separates confirmed facts from analysis, labels developing information clearly, and updates coverage when new evidence emerges.</p>
      </section>
      <div className="ann-page__card-grid">
        <InfoCard title="Verification first">Claims are checked, attributed, and updated as new facts emerge.</InfoCard>
        <InfoCard title="Accessible by design">Pages are built for keyboard navigation, responsive reading, and clear hierarchy.</InfoCard>
        <InfoCard title="Reader trust">Corrections and editorial standards are designed to be visible and accountable.</InfoCard>
      </div>
    </PageFrame>
  );
}
