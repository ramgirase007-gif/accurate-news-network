
export default function LiveTVWidget({ title = 'ANN Live TV', description = 'Live TV player placeholder', streamHref = '#live-tv', className = '' }) {
  return (
    <section className={`ann-live-tv${className ? ` ${className}` : ''}`} aria-label={title}>
      <div className="ann-live-tv__player">
        <span className="ann-live-tv__badge"><span aria-hidden="true"></span>Live</span>
        <div className="ann-live-tv__play" aria-hidden="true">▶</div>
        <p>{description}</p>
      </div>
      <div className="ann-live-tv__content"><h2>{title}</h2><a href={streamHref}>Watch now</a></div>
      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .ann-live-tv { background: #0f172a; border-radius: 1.25rem; box-shadow: 0 20px 50px rgba(15,23,42,.2); color: #fff; overflow: hidden; }
  .ann-live-tv__player { align-items: center; aspect-ratio: 16 / 9; background: radial-gradient(circle at center, #334155, #020617); display: grid; justify-items: center; padding: 1rem; position: relative; text-align: center; }
  .ann-live-tv__badge { align-items: center; background: #dc2626; border-radius: 999px; display: inline-flex; font-size: .75rem; font-weight: 900; gap: .4rem; left: 1rem; letter-spacing: .08em; padding: .4rem .7rem; position: absolute; text-transform: uppercase; top: 1rem; }
  .ann-live-tv__badge span { background: #fff; border-radius: 999px; height: .55rem; width: .55rem; }
  .ann-live-tv__play { align-items: center; background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.28); border-radius: 999px; display: inline-flex; font-size: 1.4rem; height: 4rem; justify-content: center; width: 4rem; }
  .ann-live-tv__player p { color: #cbd5e1; margin: .75rem 0 0; }
  .ann-live-tv__content { align-items: center; display: flex; gap: 1rem; justify-content: space-between; padding: 1rem; }
  .ann-live-tv__content h2 { font-size: 1.2rem; margin: 0; }
  .ann-live-tv__content a { background: #fff; border-radius: 999px; color: #991b1b; font-weight: 900; padding: .7rem 1rem; text-decoration: none; }
  @media (max-width: 480px) { .ann-live-tv__content { align-items: flex-start; flex-direction: column; } }
`;
