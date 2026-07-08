import { useId, useMemo } from 'react';
import { VideoCard, defaultVideos, normalizeVideo, styles as videoCardStyles } from './LatestVideos';

export default function VideoSection({ title = 'Video', videos = defaultVideos, className = '' }) {
  const headingId = useId();
  const normalizedVideos = useMemo(() => (Array.isArray(videos) && videos.length ? videos : defaultVideos).map(normalizeVideo), [videos]);
  const [featured, ...latest] = normalizedVideos;
  return (
    <section className={`ann-video-section${className ? ` ${className}` : ''}`} aria-labelledby={headingId}>
      <div className="ann-video-section__header"><p>Featured Video</p><h2 id={headingId}>{title}</h2></div>
      <div className="ann-video-section__layout">
        <VideoCard video={featured} featured />
        <div className="ann-video-section__latest" aria-label="Latest videos">{latest.slice(0, 4).map((video) => <VideoCard video={video} key={video.id} />)}</div>
      </div>
      <style>{videoCardStyles + styles}</style>
    </section>
  );
}

const styles = `
  .ann-video-section { margin: 0 auto; max-width: 1180px; width: 100%; }
  .ann-video-section__header { align-items: end; display: flex; justify-content: space-between; margin-bottom: 1rem; }
  .ann-video-section__header p { color: #b91c1c; font-size: .76rem; font-weight: 900; letter-spacing: .12em; margin: 0 0 .35rem; text-transform: uppercase; }
  .ann-video-section__header h2 { font-size: clamp(1.9rem, 4vw, 3.2rem); letter-spacing: -.05em; margin: 0; }
  .ann-video-section__layout { display: grid; gap: 1rem; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
  .ann-video-card--featured h3 { font-size: clamp(1.4rem, 3vw, 2rem); }
  .ann-video-section__latest { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 900px) { .ann-video-section__layout { grid-template-columns: 1fr; } }
  @media (max-width: 560px) { .ann-video-section__latest { grid-template-columns: 1fr; } .ann-video-section__header { align-items: flex-start; flex-direction: column; } }
`;
