import React, { useEffect, useId, useState } from 'react';

import { useTheme } from '../hooks';

const categories = [
  { label: 'Top Stories', href: '#top-stories' },
  { label: 'World', href: '#world' },
  { label: 'Politics', href: '#politics' },
  { label: 'Business', href: '#business' },
  { label: 'Technology', href: '#technology' },
  { label: 'Health', href: '#health' },
  { label: 'Sports', href: '#sports' },
];

const tickerItems = [
  'Placeholder: Breaking news updates will appear here as stories are verified',
  'Live desk: Editors are monitoring trusted sources for urgent developments',
  'Update queue: Add newsroom alerts to connect the ticker with live coverage',
];

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
];

const getTodayInfo = () => {
  const now = new Date();

  return {
    iso: now.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(now),
  };
};

function Logo() {
  return (
    <a className="ann-header__brand" href="/" aria-label="Accurate News Network home">
      <span className="ann-header__brand-mark" aria-hidden="true">
        ANN
      </span>
      <span className="ann-header__brand-copy">
        <span className="ann-header__brand-name">Accurate News Network</span>
        <span className="ann-header__brand-tagline">Verified news, clearly reported</span>
      </span>
    </a>
  );
}

function SearchForm({ idPrefix = 'desktop' }) {
  const inputId = `ann-header-search-${idPrefix}`;

  return (
    <form className="ann-header__search" role="search" action="/search" method="get">
      <label className="ann-header__sr-only" htmlFor={inputId}>
        Search Accurate News Network
      </label>
      <span className="ann-header__search-icon" aria-hidden="true">
        ⌕
      </span>
      <input id={inputId} name="q" type="search" placeholder="Search news" autoComplete="off" />
      <button type="submit">Search</button>
    </form>
  );
}

export default function Header() {
  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [todayInfo, setTodayInfo] = useState({ iso: '', label: '' });

  useEffect(() => {
    setTodayInfo(getTodayInfo());
  }, []);


  useEffect(() => {
    document.body.classList.toggle('ann-header--menu-open', isMenuOpen);
    return () => document.body.classList.remove('ann-header--menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="ann-header">
      <a className="ann-header__skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="ann-header__top-bar" aria-label="Network information">
        <div className="ann-header__top-inner">
          <div className="ann-header__info-group">
            <time dateTime={todayInfo.iso}>{todayInfo.label || 'Today'}</time>
            <span className="ann-header__live" aria-label="Live coverage is available">
              <span aria-hidden="true" /> Live
            </span>
          </div>

          <div className="ann-header__utility-group">
            <label htmlFor="ann-header-language">Language</label>
            <select id="ann-header-language" name="language" defaultValue="en">
              {languageOptions.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="ann-header__main">
        <div className="ann-header__main-inner">
          <Logo />

          <div className="ann-header__desktop-actions">
            <SearchForm />
            <button
              className="ann-header__theme-toggle"
              type="button"
              aria-pressed={isDarkMode}
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
              <span>{isDarkMode ? 'Light' : 'Dark'} mode</span>
            </button>
          </div>

          <button
            className="ann-header__menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="ann-header__sr-only">{isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="ann-header__ticker" aria-label="Breaking news">
        <div className="ann-header__ticker-inner">
          <strong>Breaking</strong>
          <div className="ann-header__ticker-window" aria-live="polite">
            <div className="ann-header__ticker-track">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`ann-header__nav-shell${isMenuOpen ? ' ann-header__nav-shell--open' : ''}`} id={menuId}>
        <div className="ann-header__nav-inner">
          <nav className="ann-header__category-nav" aria-label="Category navigation">
            {categories.map((category) => (
              <a key={category.href} href={category.href} onClick={closeMenu}>
                {category.label}
              </a>
            ))}
          </nav>
          <div className="ann-header__mobile-actions">
            <SearchForm idPrefix="mobile" />
            <button
              className="ann-header__theme-toggle ann-header__theme-toggle--mobile"
              type="button"
              aria-pressed={isDarkMode}
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
              <span>{isDarkMode ? 'Light' : 'Dark'} mode</span>
            </button>
          </div>
        </div>
      </div>

      <style>{styles}</style>
    </header>
  );
}

const styles = `
  :root {
    --ann-header-bg: #ffffff;
    --ann-header-bg-elevated: #f8fafc;
    --ann-header-text: #0f172a;
    --ann-header-muted: #64748b;
    --ann-header-border: #e2e8f0;
    --ann-header-accent: #b91c1c;
    --ann-header-accent-strong: #991b1b;
    --ann-header-focus: #2563eb;
  }

  :root[data-ann-theme='dark'] {
    color-scheme: dark;
    --ann-header-bg: #0f172a;
    --ann-header-bg-elevated: #111827;
    --ann-header-text: #f8fafc;
    --ann-header-muted: #cbd5e1;
    --ann-header-border: #334155;
    --ann-header-accent: #f87171;
    --ann-header-accent-strong: #ef4444;
    --ann-header-focus: #93c5fd;
  }

  .ann-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    color: var(--ann-header-text);
    background: color-mix(in srgb, var(--ann-header-bg) 94%, transparent);
    border-bottom: 1px solid var(--ann-header-border);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
    backdrop-filter: blur(18px);
  }

  .ann-header a { color: inherit; }

  .ann-header__skip-link {
    position: fixed;
    left: 1rem;
    top: 1rem;
    z-index: 1100;
    transform: translateY(-150%);
    border-radius: 999px;
    padding: 0.75rem 1rem;
    color: #ffffff;
    background: var(--ann-header-focus);
    font-weight: 800;
    text-decoration: none;
    transition: transform 160ms ease;
  }

  .ann-header__skip-link:focus { transform: translateY(0); }

  .ann-header__top-bar {
    color: #ffffff;
    background: #0f172a;
    font-size: 0.82rem;
  }

  .ann-header__top-inner,
  .ann-header__main-inner,
  .ann-header__ticker-inner,
  .ann-header__nav-inner {
    width: min(1180px, calc(100% - 2rem));
    margin: 0 auto;
  }

  .ann-header__top-inner,
  .ann-header__top-inner nav,
  .ann-header__main-inner,
  .ann-header__desktop-actions,
  .ann-header__ticker-inner,
  .ann-header__category-nav,
  .ann-header__search,
  .ann-header__theme-toggle {
    display: flex;
    align-items: center;
  }

  .ann-header__top-inner {
    min-height: 2.25rem;
    justify-content: space-between;
    gap: 1rem;
  }

  .ann-header__info-group,
  .ann-header__utility-group,
  .ann-header__live { display: flex; align-items: center; }

  .ann-header__info-group { gap: 1rem; font-weight: 750; }
  .ann-header__utility-group { gap: 0.55rem; }
  .ann-header__utility-group label { color: #cbd5e1; font-weight: 750; }
  .ann-header__utility-group select {
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 999px;
    padding: 0.2rem 1.7rem 0.2rem 0.65rem;
    color: #ffffff;
    background: #1e293b;
    font: inherit;
  }

  .ann-header__live { gap: 0.35rem; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; }
  .ann-header__live span {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.8);
    animation: ann-live-pulse 1.8s infinite;
  }

  @keyframes ann-live-pulse {
    70% { box-shadow: 0 0 0 0.5rem rgba(34, 197, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
  }

  .ann-header__main { background: var(--ann-header-bg); }

  .ann-header__main-inner {
    min-height: 5rem;
    justify-content: space-between;
    gap: 1rem;
  }

  .ann-header__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    min-width: 0;
    text-decoration: none;
  }

  .ann-header__brand-mark {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 1rem;
    color: #ffffff;
    background: linear-gradient(135deg, #b91c1c, #1e3a8a);
    font-size: 1.05rem;
    font-weight: 950;
    letter-spacing: -0.06em;
  }

  .ann-header__brand-copy { display: grid; line-height: 1.1; }
  .ann-header__brand-name { font-size: clamp(1.1rem, 2vw, 1.55rem); font-weight: 950; letter-spacing: -0.045em; }
  .ann-header__brand-tagline { color: var(--ann-header-muted); font-size: 0.78rem; font-weight: 700; }

  .ann-header__desktop-actions { gap: 0.75rem; }

  .ann-header__search {
    min-width: min(30vw, 22rem);
    gap: 0.4rem;
    border: 1px solid var(--ann-header-border);
    border-radius: 999px;
    padding: 0.25rem;
    background: var(--ann-header-bg-elevated);
  }

  .ann-header__search-icon { color: var(--ann-header-muted); padding-left: 0.65rem; font-size: 1.15rem; }

  .ann-header__search input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    color: var(--ann-header-text);
    background: transparent;
    font: inherit;
  }

  .ann-header__search button,
  .ann-header__theme-toggle {
    border: 0;
    border-radius: 999px;
    min-height: 2.5rem;
    cursor: pointer;
    font: inherit;
    font-weight: 800;
  }

  .ann-header__search button { padding: 0 0.9rem; color: #ffffff; background: var(--ann-header-accent-strong); }

  .ann-header__theme-toggle {
    gap: 0.45rem;
    padding: 0 0.9rem;
    color: var(--ann-header-text);
    background: var(--ann-header-bg-elevated);
    border: 1px solid var(--ann-header-border);
  }

  .ann-header__ticker { background: var(--ann-header-accent-strong); color: #ffffff; }
  .ann-header__ticker-inner { gap: 1rem; min-height: 2.6rem; overflow: hidden; }
  .ann-header__ticker strong { text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.78rem; }
  .ann-header__ticker-window { overflow: hidden; flex: 1; }
  .ann-header__ticker-track { display: flex; width: max-content; gap: 2rem; animation: ann-ticker 34s linear infinite; }
  .ann-header__ticker-track span { white-space: nowrap; }

  @keyframes ann-ticker { to { transform: translateX(-50%); } }

  .ann-header__nav-shell { background: var(--ann-header-bg); }
  .ann-header__nav-inner { padding: 0.75rem 0; }
  .ann-header__category-nav { gap: clamp(0.75rem, 2vw, 1.5rem); overflow-x: auto; scrollbar-width: none; }
  .ann-header__category-nav::-webkit-scrollbar { display: none; }
  .ann-header__category-nav a {
    flex: 0 0 auto;
    color: var(--ann-header-muted);
    font-size: 0.92rem;
    font-weight: 850;
    text-decoration: none;
  }
  .ann-header__category-nav a:hover { color: var(--ann-header-accent); }

  .ann-header__menu-toggle,
  .ann-header__mobile-actions { display: none; }

  .ann-header__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .ann-header :where(a, button, input, select):focus-visible {
    outline: 3px solid var(--ann-header-focus);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .ann-header__ticker-track,
    .ann-header__live span { animation: none; }
    .ann-header__skip-link { transition: none; }
  }

  @media (max-width: 840px) {
    .ann-header__top-inner { flex-wrap: wrap; justify-content: space-between; padding: 0.35rem 0; }
    .ann-header__desktop-actions { display: none; }

    .ann-header__menu-toggle {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.28rem;
      width: 2.75rem;
      height: 2.75rem;
      border: 1px solid var(--ann-header-border);
      border-radius: 0.8rem;
      background: var(--ann-header-bg-elevated);
      cursor: pointer;
    }

    .ann-header__menu-toggle span:not(.ann-header__sr-only) {
      width: 1.15rem;
      height: 2px;
      margin: 0 auto;
      border-radius: 999px;
      background: var(--ann-header-text);
    }

    .ann-header__nav-shell {
      display: none;
      border-top: 1px solid var(--ann-header-border);
    }

    .ann-header__nav-shell--open { display: block; }
    .ann-header__category-nav { align-items: stretch; flex-direction: column; overflow: visible; }
    .ann-header__category-nav a { padding: 0.55rem 0; }
    .ann-header__mobile-actions { display: grid; gap: 0.75rem; margin-top: 0.75rem; }
    .ann-header__mobile-actions .ann-header__search { min-width: 0; width: 100%; }
    .ann-header__theme-toggle--mobile { justify-content: center; }
  }

  @media (max-width: 520px) {
    .ann-header__top-inner,
    .ann-header__main-inner,
    .ann-header__ticker-inner,
    .ann-header__nav-inner { width: min(100% - 1rem, 1180px); }
    .ann-header__brand-tagline { display: none; }
    .ann-header__brand-mark { width: 2.8rem; height: 2.8rem; }
    .ann-header__search { border-radius: 1rem; }
    .ann-header__search button { padding: 0 0.75rem; }
  }
`;
