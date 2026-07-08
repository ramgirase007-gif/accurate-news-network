
export default function EPaperWidget({ editionTitle = 'Today\'s E-Paper', date = 'July 8, 2026', pages = 24, coverImage, viewHref = '#e-paper', className = '' }) {
  return (
    <section className={`ann-epaper${className ? ` ${className}` : ''}`} aria-label="Latest e-paper edition">
      <div className="ann-epaper__cover">{coverImage ? <img src={coverImage} alt="Latest e-paper cover" loading="lazy" decoding="async" /> : <span aria-hidden="true">📰</span>}</div>
      <div className="ann-epaper__content"><p>Latest Edition</p><h2>{editionTitle}</h2><span>{date} · {pages} pages</span><a href={viewHref}>View E-Paper</a></div>
      <style>{styles}</style>
    </section>
  );
}
const styles = `.ann-epaper{align-items:center;background:#fff;border:1px solid rgba(17,24,39,.1);border-radius:1.25rem;box-shadow:0 16px 38px rgba(15,23,42,.08);display:grid;gap:1rem;grid-template-columns:auto 1fr;padding:1rem}.ann-epaper__cover{align-items:center;aspect-ratio:3/4;background:#f1f5f9;border-radius:.9rem;display:flex;font-size:3rem;justify-content:center;overflow:hidden;width:7rem}.ann-epaper__cover img{height:100%;object-fit:cover;width:100%}.ann-epaper__content p{color:#b91c1c;font-size:.75rem;font-weight:900;letter-spacing:.12em;margin:0;text-transform:uppercase}.ann-epaper h2{font-size:1.35rem;margin:.25rem 0}.ann-epaper span{color:#64748b;display:block;margin-bottom:.9rem}.ann-epaper a{background:#b91c1c;border-radius:999px;color:#fff;display:inline-flex;font-weight:900;padding:.7rem 1rem;text-decoration:none}@media(max-width:460px){.ann-epaper{grid-template-columns:1fr}.ann-epaper__cover{width:100%}}`;
