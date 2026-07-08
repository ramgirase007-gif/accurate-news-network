import React, { useId, useMemo } from 'react';

export const defaultVideos = [
  { id: 'video-1', title: 'Daily briefing: top stories in three minutes', duration: '3:12', href: '#daily-briefing', thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80' },
  { id: 'video-2', title: 'Explainer: how verified alerts are published', duration: '4:28', href: '#verified-alerts', thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80' },
  { id: 'video-3', title: 'On scene: community response center opens', duration: '2:47', href: '#response-center', thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80' },
];

export const normalizeVideo = (video = {}, index = 0) => {
  const fallback = defaultVideos[index % defaultVideos.length];
  return {
    id: video.id || video.slug || `video-${index + 1}`,
    title: video.title || video.headline || fallback.title,
    duration: video.duration || fallback.duration,
    href: video.href || video.url || fallback.href,
    thumbnail: video.thumbnail || video.imageUrl || fallback.thumbnail,
    description: video.description || '',
  };
};

export function VideoCard({ video, featured = false }) {
  return (
    <article className={`ann-video-card${featured ? ' ann-video-card--featured' : ''}`}>
      <a className="ann-video-card__media" href={video.href} aria-label={`Watch video: ${video.title}`}>
        <img src={video.thumbnail} alt="" loading={featured ? 'eager' : 'lazy'} decoding="async" />
        <span className="ann-video-card__play" aria-hidden="true">▶</span>
        <span className="ann-video-card__duration">{video.duration}</span>
      </a>
      <h3><a href={video.href}>{video.title}</a></h3>
      {video.description ? <p>{video.description}</p> : null}
    </article>
  );
}

export default function LatestVideos({ videos = defaultVideos, title = 'Latest Videos', className = '' }) {
  const headingId = useId();
  const normalizedVideos = useMemo(() => (Array.isArray(videos) && videos.length ? videos : defaultVideos).map(normalizeVideo), [videos]);
  return (
    <section className={`ann-latest-videos${className ? ` ${className}` : ''}`} aria-labelledby={headingId}>
      <div className="ann-latest-videos__header"><p>Watch</p><h2 id={headingId}>{title}</h2></div>
      <div className="ann-latest-videos__grid">{normalizedVideos.map((video) => <VideoCard video={video} key={video.id} />)}</div>
      <style>{styles}</style>
    </section>
  );
}

export const styles = `
  .ann-latest-videos { margin: 0 auto; max-width: 1180px; width: 100%; }
  .ann-latest-videos__header { margin-bottom: 1rem; }
  .ann-latest-videos__header p { color: #b91c1c; font-size: .76rem; font-weight: 900; letter-spacing: .12em; margin: 0 0 .35rem; text-transform: uppercase; }
  .ann-latest-videos__header h2 { font-size: clamp(1.75rem, 4vw, 3rem); letter-spacing: -.045em; margin: 0; }
  .ann-latest-videos__grid { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ann-video-card { background: #fff; border: 1px solid rgba(17,24,39,.1); border-radius: 1rem; box-shadow: 0 16px 38px rgba(15,23,42,.08); overflow: hidden; }
  .ann-video-card__media { aspect-ratio: 16 / 9; background: #111827; display: block; overflow: hidden; position: relative; }
  .ann-video-card__media img { height: 100%; object-fit: cover; width: 100%; }
  .ann-video-card__play { align-items: center; background: rgba(185,28,28,.94); border-radius: 999px; color: #fff; display: inline-flex; height: 2.75rem; justify-content: center; left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 2.75rem; }
  .ann-video-card__duration { background: rgba(15,23,42,.86); border-radius: .4rem; bottom: .65rem; color: #fff; font-size: .8rem; font-weight: 800; padding: .25rem .45rem; position: absolute; right: .65rem; }
  .ann-video-card h3 { font-size: 1.05rem; line-height: 1.2; margin: 0; padding: 1rem 1rem .35rem; }
  .ann-video-card h3 a { color: #111827; text-decoration: none; }
  .ann-video-card h3 a:hover, .ann-video-card h3 a:focus-visible { color: #b91c1c; }
  .ann-video-card p { color: #4b5563; margin: 0; padding: 0 1rem 1rem; }
  @media (max-width: 860px) { .ann-latest-videos__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 560px) { .ann-latest-videos__grid { grid-template-columns: 1fr; } }
`;
