
import PageFrame from './PageFrame';

const sections = [
  ['Information we collect', 'ANN may collect contact details submitted through forms, basic analytics about site performance, and subscription preferences needed to deliver reader services.'],
  ['How we use information', 'We use information to operate news products, respond to readers, improve accessibility and reliability, and protect the integrity of our services.'],
  ['Reader choices', 'Readers can unsubscribe from email products, limit browser cookies, and contact the newsroom to request privacy assistance.'],
  ['Security and retention', 'We apply reasonable safeguards and keep personal information only as long as needed for newsroom, legal, or operational purposes.'],
];

export default function PrivacyPolicyPage() {
  return (
    <PageFrame eyebrow="Privacy" title="Privacy Policy" description="How Accurate News Network handles reader information, transparency, and privacy choices.">
      <div className="ann-policy">
        <p><strong>Effective date:</strong> July 8, 2026</p>
        {sections.map(([title, copy]) => (
          <section key={title} aria-labelledby={`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`}>
            <h2 id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`}>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}
      </div>
    </PageFrame>
  );
}
