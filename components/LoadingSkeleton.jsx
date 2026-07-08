import React from 'react';

export default function LoadingSkeleton({ count = 3, variant = 'card', className = '' }) {
  return (
    <div className={`ann-skeleton ann-skeleton--${variant}${className ? ` ${className}` : ''}`} aria-label="Loading content" role="status">
      {Array.from({ length: count }).map((_, index) => (
        <div className="ann-skeleton__item" key={index}>
          <span className="ann-skeleton__media" />
          <span className="ann-skeleton__line ann-skeleton__line--short" />
          <span className="ann-skeleton__line" />
          <span className="ann-skeleton__line ann-skeleton__line--medium" />
        </div>
      ))}
      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .ann-skeleton { display: grid; gap: 1rem; }
  .ann-skeleton--grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ann-skeleton__item { background: #fff; border: 1px solid rgba(17,24,39,.08); border-radius: 1rem; display: grid; gap: .75rem; overflow: hidden; padding: 1rem; }
  .ann-skeleton__media, .ann-skeleton__line { animation: ann-skeleton-pulse 1.4s ease-in-out infinite; background: linear-gradient(90deg, #e5e7eb, #f8fafc, #e5e7eb); background-size: 200% 100%; border-radius: .75rem; display: block; }
  .ann-skeleton__media { aspect-ratio: 16 / 9; margin: -1rem -1rem .25rem; }
  .ann-skeleton__line { height: .9rem; width: 100%; }
  .ann-skeleton__line--short { width: 35%; }
  .ann-skeleton__line--medium { width: 68%; }
  @keyframes ann-skeleton-pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  @media (max-width: 760px) { .ann-skeleton--grid { grid-template-columns: 1fr; } }
`;
