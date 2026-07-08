import React from 'react';

import PageFrame from './PageFrame';

export default function PrivacyPolicyPage() {
  return (
    <PageFrame eyebrow="Privacy" title="Privacy Policy" description="A placeholder policy route ready for legal review and production copy.">
      <div className="ann-policy">
        <p>Accurate News Network respects reader privacy and limits collection to information needed to operate news products.</p>
        <p>Future updates should describe analytics, subscriptions, contact forms, cookies, and reader data choices.</p>
      </div>
    </PageFrame>
  );
}
