import React from 'react';

export default function PageFrame({ eyebrow, title, description, children }) {
  return (
    <main id="main-content" className="ann-page" tabIndex={-1}>
      <section className="ann-page__hero" aria-labelledby="page-title">
        {eyebrow ? <p className="ann-page__eyebrow">{eyebrow}</p> : null}
        <h1 id="page-title">{title}</h1>
        {description ? <p className="ann-page__description">{description}</p> : null}
      </section>
      {children ? <div className="ann-page__content">{children}</div> : null}
    </main>
  );
}
