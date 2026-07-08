import React from 'react';

const navigationItems = [
  { label: 'Top Stories', href: '#top-stories' },
  { label: 'World', href: '#world' },
  { label: 'Business', href: '#business' },
  { label: 'Technology', href: '#technology' },
];

const featuredStories = [
  {
    eyebrow: 'Live Coverage',
    title: 'Global markets steady as policy makers signal measured outlook',
    summary:
      'Editors track the latest verified developments, market reactions, and expert context in one continuously updated briefing.',
    href: '#markets-briefing',
  },
  {
    eyebrow: 'Analysis',
    title: 'Cities prepare resilient infrastructure for a warmer decade',
    summary:
      'A closer look at how public agencies are using data, community input, and targeted investments to reduce risk.',
    href: '#resilient-cities',
  },
];

const newsSections = [
  {
    id: 'world',
    title: 'World',
    description: 'Verified international reporting with context from regional experts.',
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Market moves, company updates, and economic signals without the noise.',
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Clear coverage of platforms, policy, security, and emerging tools.',
  },
];

function Header() {
  return (
    <header className="layout-engine__header">
      <a className="layout-engine__brand" href="#top-stories" aria-label="Accurate News Network home">
        <span className="layout-engine__brand-mark">ANN</span>
        <span>Accurate News Network</span>
      </a>

      <nav className="layout-engine__nav" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href} className="layout-engine__nav-link">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="layout-engine__hero" aria-labelledby="layout-engine-title">
      <div className="layout-engine__hero-copy">
        <p className="layout-engine__eyebrow">Independent reporting, clearly organized</p>
        <h1 id="layout-engine-title">News layout built for speed, trust, and every screen.</h1>
        <p className="layout-engine__lede">
          A responsive editorial surface for showcasing verified top stories, section highlights,
          and subscriber calls to action with accessible, reusable React components.
        </p>
        <div className="layout-engine__actions">
          <a className="layout-engine__button layout-engine__button--primary" href="#top-stories">
            Read top stories
          </a>
          <a className="layout-engine__button layout-engine__button--secondary" href="#newsletter">
            Get the briefing
          </a>
        </div>
      </div>
      <aside className="layout-engine__signal-card" aria-label="Editorial promise">
        <strong>Editorial standard</strong>
        <span>Sources checked, claims attributed, corrections transparent.</span>
      </aside>
    </section>
  );
}

function StoryCard({ story }) {
  return (
    <article className="layout-engine__story-card">
      <p className="layout-engine__eyebrow">{story.eyebrow}</p>
      <h2>{story.title}</h2>
      <p>{story.summary}</p>
      <a href={story.href} aria-label={`Read more about ${story.title}`}>
        Continue reading
      </a>
    </article>
  );
}

function SectionCard({ section }) {
  return (
    <article id={section.id} className="layout-engine__section-card">
      <h3>{section.title}</h3>
      <p>{section.description}</p>
    </article>
  );
}

function NewsletterPanel() {
  return (
    <section id="newsletter" className="layout-engine__newsletter" aria-labelledby="newsletter-title">
      <div>
        <p className="layout-engine__eyebrow">Daily briefing</p>
        <h2 id="newsletter-title">Start the day with the essential facts.</h2>
      </div>
      <form className="layout-engine__form" aria-label="Subscribe to daily briefing">
        <label htmlFor="newsletter-email">Email address</label>
        <div className="layout-engine__form-row">
          <input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </section>
  );
}

function LayoutEngine() {
  return (
    <div className="layout-engine">
      <style>{styles}</style>
      <Header />
      <main>
        <Hero />
        <section id="top-stories" className="layout-engine__grid" aria-label="Top stories">
          {featuredStories.map((story) => (
            <StoryCard key={story.href} story={story} />
          ))}
        </section>
        <section className="layout-engine__sections" aria-label="News sections">
          {newsSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </section>
        <NewsletterPanel />
      </main>
    </div>
  );
}

const styles = `
  .layout-engine {
    min-height: 100vh;
    color: #172033;
    background: linear-gradient(135deg, #f8fafc 0%, #eef4ff 100%);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    padding: 24px;
  }

  .layout-engine a { color: inherit; }

  .layout-engine__header,
  .layout-engine__hero,
  .layout-engine__grid,
  .layout-engine__sections,
  .layout-engine__newsletter {
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  .layout-engine__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 18px 0 40px;
  }

  .layout-engine__brand,
  .layout-engine__nav,
  .layout-engine__actions,
  .layout-engine__form-row {
    display: flex;
    align-items: center;
  }

  .layout-engine__brand {
    gap: 12px;
    font-weight: 800;
    text-decoration: none;
  }

  .layout-engine__brand-mark {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 14px;
    color: #ffffff;
    background: #1d4ed8;
    letter-spacing: -0.04em;
  }

  .layout-engine__nav { gap: 18px; flex-wrap: wrap; }

  .layout-engine__nav-link {
    color: #475569;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
  }

  .layout-engine__hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 32px;
    align-items: stretch;
    padding: 48px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.86);
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
  }

  .layout-engine__eyebrow {
    margin: 0 0 12px;
    color: #2563eb;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .layout-engine__hero h1 {
    margin: 0;
    max-width: 820px;
    font-size: clamp(2.35rem, 7vw, 5.2rem);
    line-height: 0.96;
    letter-spacing: -0.07em;
  }

  .layout-engine__lede {
    max-width: 680px;
    color: #475569;
    font-size: 1.1rem;
    line-height: 1.75;
  }

  .layout-engine__actions { gap: 14px; flex-wrap: wrap; margin-top: 28px; }

  .layout-engine__button,
  .layout-engine__story-card a {
    border-radius: 999px;
    font-weight: 800;
    text-decoration: none;
  }

  .layout-engine__button { padding: 14px 20px; }

  .layout-engine__button--primary,
  .layout-engine__form button {
    color: #ffffff;
    background: #1d4ed8;
  }

  .layout-engine__button--secondary {
    color: #1d4ed8;
    background: #dbeafe;
  }

  .layout-engine__signal-card,
  .layout-engine__story-card,
  .layout-engine__section-card,
  .layout-engine__newsletter {
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 24px;
    background: #ffffff;
  }

  .layout-engine__signal-card {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 12px;
    min-height: 280px;
    padding: 28px;
    color: #ffffff;
    background: linear-gradient(160deg, #172033 0%, #1d4ed8 100%);
  }

  .layout-engine__signal-card strong { font-size: 1.5rem; }
  .layout-engine__signal-card span { color: rgba(255, 255, 255, 0.78); line-height: 1.6; }

  .layout-engine__grid,
  .layout-engine__sections {
    display: grid;
    gap: 20px;
    margin-top: 24px;
  }

  .layout-engine__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .layout-engine__sections { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .layout-engine__story-card,
  .layout-engine__section-card { padding: 28px; }

  .layout-engine__story-card h2,
  .layout-engine__newsletter h2 {
    margin: 0;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    letter-spacing: -0.04em;
  }

  .layout-engine__story-card p,
  .layout-engine__section-card p {
    color: #64748b;
    line-height: 1.7;
  }

  .layout-engine__story-card a { color: #1d4ed8; }

  .layout-engine__section-card h3 { margin: 0; font-size: 1.35rem; }

  .layout-engine__newsletter {
    display: grid;
    grid-template-columns: 1fr minmax(280px, 440px);
    gap: 24px;
    align-items: end;
    margin-top: 24px;
    padding: 32px;
  }

  .layout-engine__form label {
    display: block;
    margin-bottom: 10px;
    color: #475569;
    font-weight: 700;
  }

  .layout-engine__form-row { gap: 10px; }

  .layout-engine__form input,
  .layout-engine__form button {
    min-height: 48px;
    border: 0;
    border-radius: 999px;
    font: inherit;
  }

  .layout-engine__form input {
    width: 100%;
    padding: 0 16px;
    background: #f1f5f9;
  }

  .layout-engine__form button {
    padding: 0 18px;
    font-weight: 800;
    cursor: pointer;
  }

  @media (max-width: 820px) {
    .layout-engine { padding: 16px; }
    .layout-engine__header { align-items: flex-start; flex-direction: column; padding-bottom: 24px; }
    .layout-engine__hero,
    .layout-engine__newsletter { grid-template-columns: 1fr; padding: 28px; }
    .layout-engine__grid,
    .layout-engine__sections { grid-template-columns: 1fr; }
    .layout-engine__signal-card { min-height: 220px; }
  }

  @media (max-width: 520px) {
    .layout-engine__nav { gap: 12px; }
    .layout-engine__form-row { align-items: stretch; flex-direction: column; }
    .layout-engine__form button { width: 100%; }
  }
`;

export default LayoutEngine;
