import React from 'react';

const variantSizes = {
  inline: '728 × 90',
  sidebar: '300 × 250',
  leaderboard: '970 × 250',
};

export default function Advertisement({
  variant = 'inline',
  label = 'Advertisement',
  href,
  imageUrl,
  imageAlt = '',
  children,
  className = '',
}) {
  const normalizedVariant = variantSizes[variant] ? variant : 'inline';
  const content = imageUrl ? (
    <img className="ann-advertisement__image" src={imageUrl} alt={imageAlt} loading="lazy" decoding="async" />
  ) : (
    <div className="ann-advertisement__placeholder">
      <span className="ann-advertisement__label">{label}</span>
      <strong>{children || 'Your brand message here'}</strong>
      <span className="ann-advertisement__size">{variantSizes[normalizedVariant]}</span>
    </div>
  );

  return (
    <aside className={`ann-advertisement ann-advertisement--${normalizedVariant}${className ? ` ${className}` : ''}`} aria-label={label}>
      {href ? <a className="ann-advertisement__link" href={href}>{content}</a> : content}
      <style>{styles}</style>
    </aside>
  );
}

const styles = `
  .ann-advertisement { width: 100%; }
  .ann-advertisement__link { color: inherit; display: block; text-decoration: none; }
  .ann-advertisement__placeholder { align-items: center; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border: 1px dashed #94a3b8; border-radius: 1rem; color: #334155; display: grid; gap: .35rem; justify-items: center; min-height: 6rem; padding: 1rem; text-align: center; }
  .ann-advertisement--sidebar .ann-advertisement__placeholder { min-height: 15.625rem; }
  .ann-advertisement--leaderboard .ann-advertisement__placeholder { min-height: 12rem; }
  .ann-advertisement__label, .ann-advertisement__size { color: #64748b; font-size: .75rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  .ann-advertisement__image { border-radius: 1rem; display: block; height: auto; width: 100%; }
  @media (max-width: 640px) { .ann-advertisement__placeholder { min-height: 7.5rem; } }
`;
