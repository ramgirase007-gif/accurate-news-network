import React from 'react';

export default function WeatherWidget({ location = 'Your City', temperature = '--°', condition = 'Current weather placeholder', high = '--°', low = '--°', className = '' }) {
  return (
    <section className={`ann-weather-widget${className ? ` ${className}` : ''}`} aria-label={`Current weather for ${location}`}>
      <div className="ann-weather-widget__icon" aria-hidden="true">☀️</div>
      <div className="ann-weather-widget__body">
        <p className="ann-weather-widget__eyebrow">Weather</p>
        <h2>{location}</h2>
        <p className="ann-weather-widget__temp">{temperature}</p>
        <p className="ann-weather-widget__condition">{condition}</p>
        <p className="ann-weather-widget__range">High {high} · Low {low}</p>
      </div>
      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .ann-weather-widget { align-items: center; background: linear-gradient(135deg, #0f172a, #1d4ed8); border-radius: 1.25rem; box-shadow: 0 20px 48px rgba(15,23,42,.18); color: #fff; display: flex; gap: 1rem; padding: clamp(1rem, 3vw, 1.5rem); }
  .ann-weather-widget__icon { background: rgba(255,255,255,.14); border-radius: 1rem; font-size: clamp(2rem, 8vw, 3.5rem); padding: .75rem; }
  .ann-weather-widget__eyebrow, .ann-weather-widget__condition, .ann-weather-widget__range { margin: 0; }
  .ann-weather-widget__eyebrow { color: #bfdbfe; font-size: .75rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
  .ann-weather-widget h2 { font-size: clamp(1.1rem, 3vw, 1.5rem); margin: .15rem 0; }
  .ann-weather-widget__temp { font-size: clamp(2rem, 7vw, 3.75rem); font-weight: 900; letter-spacing: -.06em; line-height: 1; margin: .25rem 0; }
  .ann-weather-widget__condition, .ann-weather-widget__range { color: #dbeafe; }
  @media (max-width: 480px) { .ann-weather-widget { align-items: flex-start; flex-direction: column; } }
`;
