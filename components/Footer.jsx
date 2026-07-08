
const quickLinks = [
  { label: 'About ANN', href: '/about' },
  { label: 'Editorial Standards', href: '/editorial-standards' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

const categories = [
  { label: 'Top Stories', href: '/category/top-stories' },
  { label: 'World', href: '/category/world' },
  { label: 'Politics', href: '/category/politics' },
  { label: 'Business', href: '/category/business' },
  { label: 'Technology', href: '/category/technology' },
  { label: 'Health', href: '/category/health' },
  { label: 'Sports', href: '/category/sports' },
];

const socialLinks = [
  {
    label: 'Follow Accurate News Network on Facebook',
    href: 'https://www.facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14 8.5h2.2V5.1c-.4-.1-1.7-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.4v3H4.5V17h3.4v7h4.2v-7h3.5l.6-3.7h-4.1v-2.6c0-1.1.3-2.2 1.9-2.2Z" />
      </svg>
    ),
  },
  {
    label: 'Follow Accurate News Network on X',
    href: 'https://x.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.5L17.5 3Zm-1.1 16.2h1.8L6.8 4.7H4.9l11.5 14.5Z" />
      </svg>
    ),
  },
  {
    label: 'Follow Accurate News Network on Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.9 2.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z" />
      </svg>
    ),
  },
  {
    label: 'Subscribe to Accurate News Network on YouTube',
    href: 'https://www.youtube.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21.6 7.1s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C15.2 3.6 12 3.6 12 3.6s-3.2 0-6.4.2c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S2.2 9 2.2 10.9v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 6.1.2 6.1.2s3.2 0 6.4-.2c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.8-.2-3.8ZM10.1 14.8V8.2l5.8 3.3-5.8 3.3Z" />
      </svg>
    ),
  },
  {
    label: 'Message Accurate News Network on WhatsApp',
    href: 'https://www.whatsapp.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2.2 22l5.5-1.3A9.8 9.8 0 1 0 12 2Zm0 2a7.8 7.8 0 0 1 0 15.6 7.7 7.7 0 0 1-3.9-1.1l-.4-.2-2.6.6.6-2.5-.3-.4A7.8 7.8 0 0 1 12 4Zm-3.3 4.2c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 4.9 4.3 2.4 1 2.9.8 3.5.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4l-1.8-.9c-.3-.1-.5-.2-.7.2l-.8 1c-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.2-1.4-.8-.8-1.4-1.7-1.6-2-.1-.3 0-.4.2-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5L10.4 9c-.2-.6-.5-.8-.7-.8h-1Z" />
      </svg>
    ),
  },
];

function FooterLinkList({ title, links, ariaLabel }) {
  return (
    <nav className="ann-footer__nav" aria-label={ariaLabel}>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ann-footer" aria-labelledby="ann-footer-heading">
      <div className="ann-footer__inner">
        <section className="ann-footer__brand-section" aria-labelledby="ann-footer-heading">
          <a className="ann-footer__brand" href="/" aria-label="Accurate News Network home">
            <span className="ann-footer__brand-mark" aria-hidden="true">ANN</span>
            <span className="ann-footer__brand-copy">
              <span id="ann-footer-heading" className="ann-footer__brand-name">Accurate News Network</span>
              <span className="ann-footer__tagline">Verified news, clearly reported.</span>
            </span>
          </a>
          <p className="ann-footer__description">
            Accurate News Network delivers timely reporting, context-rich analysis, and transparent corrections so readers
            can follow the stories shaping their communities with confidence.
          </p>
        </section>

        <FooterLinkList title="Quick Links" links={quickLinks} ariaLabel="Quick links" />
        <FooterLinkList title="Categories" links={categories} ariaLabel="News categories" />

        <section className="ann-footer__contact" aria-labelledby="ann-footer-contact-heading">
          <h2 id="ann-footer-contact-heading">Contact</h2>
          <address>
            <a href="mailto:newsroom@accuratenewsnetwork.com">newsroom@accuratenewsnetwork.com</a>
            <a href="tel:+15550197369">+1 (555) 019-7369</a>
            <span>100 Press Plaza, Suite 400</span>
            <span>New York, NY 10001</span>
          </address>
        </section>

        <section className="ann-footer__social-section" aria-labelledby="ann-footer-social-heading">
          <h2 id="ann-footer-social-heading">Follow Us</h2>
          <div className="ann-footer__social-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">
                {link.icon}
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="ann-footer__bottom">
        <p>© {currentYear} Accurate News Network. All rights reserved.</p>
        <nav aria-label="Legal links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/accessibility">Accessibility</a>
        </nav>
      </div>

      <style>{styles}</style>
    </footer>
  );
}

const styles = `
  .ann-footer {
    color: #e5e7eb;
    background:
      radial-gradient(circle at top left, rgba(185, 28, 28, 0.28), transparent 34rem),
      linear-gradient(135deg, #0f172a 0%, #111827 56%, #020617 100%);
    border-top: 4px solid #b91c1c;
    margin-top: 4rem;
  }

  .ann-footer a { color: inherit; }

  .ann-footer__inner {
    display: grid;
    grid-template-columns: minmax(16rem, 1.45fr) repeat(4, minmax(10rem, 1fr));
    gap: 2.25rem;
    width: min(1180px, calc(100% - 2rem));
    margin: 0 auto;
    padding: 3.5rem 0 2.5rem;
  }

  .ann-footer__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    text-decoration: none;
  }

  .ann-footer__brand-mark {
    display: inline-grid;
    min-width: 3.25rem;
    min-height: 3.25rem;
    place-items: center;
    border-radius: 1rem;
    color: #ffffff;
    background: #b91c1c;
    box-shadow: 0 16px 32px rgba(185, 28, 28, 0.35);
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .ann-footer__brand-name,
  .ann-footer h2 {
    display: block;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 850;
    letter-spacing: 0.02em;
    margin: 0 0 0.9rem;
  }

  .ann-footer__brand-name { margin-bottom: 0; }

  .ann-footer__tagline,
  .ann-footer__description,
  .ann-footer__nav a,
  .ann-footer__contact address,
  .ann-footer__bottom { color: #cbd5e1; }

  .ann-footer__tagline {
    display: block;
    font-size: 0.92rem;
    margin-top: 0.2rem;
  }

  .ann-footer__description {
    max-width: 34rem;
    line-height: 1.7;
    margin: 1.25rem 0 0;
  }

  .ann-footer__nav ul {
    display: grid;
    gap: 0.65rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ann-footer__nav a,
  .ann-footer__contact a,
  .ann-footer__bottom a {
    text-decoration: none;
    transition: color 160ms ease, padding-left 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .ann-footer__nav a:hover,
  .ann-footer__nav a:focus-visible,
  .ann-footer__contact a:hover,
  .ann-footer__contact a:focus-visible,
  .ann-footer__bottom a:hover,
  .ann-footer__bottom a:focus-visible {
    color: #ffffff;
  }

  .ann-footer__nav a:hover,
  .ann-footer__nav a:focus-visible { padding-left: 0.25rem; }

  .ann-footer__contact address {
    display: grid;
    gap: 0.65rem;
    font-style: normal;
    line-height: 1.55;
  }

  .ann-footer__social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .ann-footer__social-links a {
    display: inline-grid;
    width: 2.75rem;
    height: 2.75rem;
    place-items: center;
    border: 1px solid rgba(203, 213, 225, 0.28);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    text-decoration: none;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .ann-footer__social-links svg {
    width: 1.22rem;
    height: 1.22rem;
    fill: currentColor;
  }

  .ann-footer__social-links a:hover,
  .ann-footer__social-links a:focus-visible {
    transform: translateY(-2px);
    border-color: #fca5a5;
    background: rgba(185, 28, 28, 0.42);
  }

  .ann-footer a:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 4px;
    border-radius: 0.35rem;
  }

  .ann-footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: min(1180px, calc(100% - 2rem));
    margin: 0 auto;
    border-top: 1px solid rgba(203, 213, 225, 0.18);
    padding: 1.2rem 0;
  }

  .ann-footer__bottom p { margin: 0; }

  .ann-footer__bottom nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
  }

  .ann-footer__bottom p,
  .ann-footer__bottom a { font-size: 0.92rem; }

  @media (max-width: 1040px) {
    .ann-footer__inner { grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(12rem, 1fr)); }
  }

  @media (max-width: 760px) {
    .ann-footer__inner {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding-top: 2.5rem;
    }

    .ann-footer__brand { align-items: flex-start; }

    .ann-footer__social-links a {
      width: 2.9rem;
      height: 2.9rem;
    }

    .ann-footer__bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
