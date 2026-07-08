import React from 'react';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];

const socialLinks = [
  {
    label: 'Follow Accurate News Network on X',
    href: 'https://x.com/',
    icon: '𝕏',
  },
  {
    label: 'Follow Accurate News Network on Facebook',
    href: 'https://www.facebook.com/',
    icon: 'f',
  },
  {
    label: 'Follow Accurate News Network on Instagram',
    href: 'https://www.instagram.com/',
    icon: '◎',
  },
  {
    label: 'Follow Accurate News Network on LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: 'in',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ann-footer" aria-labelledby="ann-footer-heading">
      <div className="ann-footer__inner">
        <section className="ann-footer__brand-section" aria-labelledby="ann-footer-heading">
          <a className="ann-footer__brand" href="/" aria-label="Accurate News Network home">
            <span className="ann-footer__brand-mark" aria-hidden="true">
              ANN
            </span>
            <span>
              <span id="ann-footer-heading" className="ann-footer__brand-name">
                Accurate News Network
              </span>
              <span className="ann-footer__tagline">Verified reporting for informed communities.</span>
            </span>
          </a>
          <p className="ann-footer__description">
            Independent journalism, transparent corrections, and responsible reporting delivered with clarity across every
            platform.
          </p>
        </section>

        <nav className="ann-footer__nav" aria-label="Footer navigation">
          <h2>Company</h2>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="ann-footer__social-section" aria-labelledby="ann-footer-social-heading">
          <h2 id="ann-footer-social-heading">Social Icons</h2>
          <div className="ann-footer__social-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">
                <span aria-hidden="true">{link.icon}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="ann-footer__bottom">
        <p>© {currentYear} Accurate News Network. All rights reserved.</p>
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
      linear-gradient(135deg, #0f172a 0%, #111827 55%, #020617 100%);
    border-top: 4px solid #b91c1c;
    margin-top: 4rem;
  }

  .ann-footer a {
    color: inherit;
  }

  .ann-footer__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(12rem, 0.7fr) minmax(12rem, 0.8fr);
    gap: 2.5rem;
    width: min(1120px, calc(100% - 2rem));
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

  .ann-footer__tagline {
    display: block;
    color: #cbd5e1;
    font-size: 0.92rem;
    margin-top: 0.2rem;
  }

  .ann-footer__description {
    max-width: 35rem;
    color: #cbd5e1;
    margin: 1.25rem 0 0;
  }

  .ann-footer__nav ul {
    display: grid;
    gap: 0.65rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ann-footer__nav a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 160ms ease, padding-left 160ms ease;
  }

  .ann-footer__nav a:hover,
  .ann-footer__nav a:focus-visible {
    color: #ffffff;
    padding-left: 0.25rem;
  }

  .ann-footer__social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .ann-footer__social-links a {
    display: inline-grid;
    width: 2.65rem;
    height: 2.65rem;
    place-items: center;
    border: 1px solid rgba(203, 213, 225, 0.28);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    font-weight: 850;
    text-decoration: none;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .ann-footer__social-links a:hover,
  .ann-footer__social-links a:focus-visible {
    transform: translateY(-2px);
    border-color: #fca5a5;
    background: rgba(185, 28, 28, 0.42);
  }

  .ann-footer__bottom {
    border-top: 1px solid rgba(203, 213, 225, 0.18);
    padding: 1.2rem 1rem;
    text-align: center;
  }

  .ann-footer__bottom p {
    color: #94a3b8;
    font-size: 0.92rem;
    margin: 0;
  }

  @media (max-width: 760px) {
    .ann-footer__inner {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding-top: 2.5rem;
    }

    .ann-footer__brand {
      align-items: flex-start;
    }

    .ann-footer__social-links a {
      width: 2.9rem;
      height: 2.9rem;
    }
  }
`;
