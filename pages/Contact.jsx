import React from 'react';

import PageFrame from './PageFrame';

export default function ContactPage() {
  return (
    <PageFrame eyebrow="Contact" title="Contact the newsroom" description="Send tips, corrections, and reader questions to Accurate News Network.">
      <div className="ann-page__card-grid">
        <address className="ann-contact-card">
          <strong>Newsroom</strong>
          <a href="mailto:newsroom@accuratenewsnetwork.com">newsroom@accuratenewsnetwork.com</a>
          <a href="tel:+15550197369">+1 (555) 019-7369</a>
          <span>100 Press Plaza, Suite 400, New York, NY 10001</span>
        </address>
        <section className="ann-page__card" aria-labelledby="tips-title">
          <h2 id="tips-title">Submit a tip</h2>
          <p>Send documents, source notes, and time-sensitive details by email. Include how editors can safely verify the information.</p>
        </section>
        <section className="ann-page__card" aria-labelledby="corrections-title">
          <h2 id="corrections-title">Corrections</h2>
          <p>For corrections, include the article link, the specific passage, and documentation supporting the requested update.</p>
        </section>
      </div>
    </PageFrame>
  );
}
