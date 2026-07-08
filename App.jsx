import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Footer, Header } from './components';
import { ThemeProvider } from './context';
import {
  AboutPage,
  ArticlePage,
  CategoryPage,
  ContactPage,
  Home,
  NotFoundPage,
  PrivacyPolicyPage,
  SearchPage,
} from './pages';

function AppLayout() {
  return (
    <div className="ann-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Navigate to="/category/world" replace />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/news/:slug" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <style>{styles}</style>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const styles = `
  .ann-app { min-height: 100vh; background: #f8fafc; color: #111827; }
  .ann-page { min-height: 55vh; padding: clamp(2rem, 5vw, 4.5rem) 1rem; }
  .ann-page__hero, .ann-page__content { width: min(1180px, 100%); margin: 0 auto; }
  .ann-page__hero { border-radius: 1.5rem; background: linear-gradient(135deg, #0f172a, #1e3a8a); color: #fff; padding: clamp(2rem, 5vw, 4rem); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.16); }
  .ann-page__eyebrow { color: #fecaca; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.14em; margin: 0 0 0.7rem; text-transform: uppercase; }
  .ann-page h1 { font-size: clamp(2.25rem, 6vw, 4.75rem); letter-spacing: -0.06em; line-height: 0.95; margin: 0; }
  .ann-page__description { color: #dbeafe; font-size: clamp(1rem, 2vw, 1.25rem); max-width: 760px; margin: 1rem 0 0; }
  .ann-page__content { display: grid; gap: 1.5rem; padding-top: 2rem; }
  .ann-page__full-bleed { padding-inline: 0; }
  .ann-article, .ann-search, .ann-contact-card, .ann-policy, .ann-page__card { background: #fff; border: 1px solid rgba(17, 24, 39, 0.1); border-radius: 1.25rem; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08); padding: clamp(1.25rem, 3vw, 2rem); }
  .ann-article { max-width: 820px; }
  .ann-article__meta { color: #6b7280; font-weight: 800; }
  .ann-page__button, .ann-search button { display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: #b91c1c; color: #fff; cursor: pointer; font: inherit; font-weight: 850; min-height: 2.75rem; padding: 0.75rem 1.1rem; text-decoration: none; }
  .ann-search label { display: block; font-weight: 850; margin-bottom: 0.65rem; }
  .ann-search__row { display: flex; gap: 0.75rem; }
  .ann-search input { flex: 1; min-width: 0; border: 1px solid #cbd5e1; border-radius: 999px; font: inherit; padding: 0.75rem 1rem; }
  .ann-page__card-grid { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ann-page__card h2 { margin: 0 0 0.5rem; }
  .ann-page__card p { color: #4b5563; margin: 0; }
  .ann-contact-card { display: grid; gap: 0.75rem; font-style: normal; }
  .ann-contact-card a { color: #991b1b; font-weight: 850; }
  .ann-page__link-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .ann-page__link-list a { border: 1px solid #cbd5e1; border-radius: 999px; color: #111827; padding: 0.65rem 0.9rem; text-decoration: none; }
  @media (max-width: 760px) { .ann-search__row { flex-direction: column; } .ann-page__card-grid { grid-template-columns: 1fr; } .ann-page { padding-inline: 0.75rem; } .ann-page__hero { border-radius: 1rem; } }
`;
