import React from 'react';

import PageFrame from './PageFrame';

export default function ContactPage() {
  return (
    <PageFrame eyebrow="Contact" title="Contact the newsroom" description="Send tips, corrections, and reader questions to Accurate News Network.">
      <address className="ann-contact-card">
        <a href="mailto:newsroom@accuratenewsnetwork.com">newsroom@accuratenewsnetwork.com</a>
        <a href="tel:+15550197369">+1 (555) 019-7369</a>
        <span>100 Press Plaza, Suite 400, New York, NY 10001</span>
      </address>
    </PageFrame>
  );
}
