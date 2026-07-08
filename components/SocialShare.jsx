import { useMemo, useState } from 'react';

const networks = [
  ['whatsapp', 'WhatsApp', (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`],
  ['facebook', 'Facebook', (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`],
  ['x', 'X', (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`],
  ['telegram', 'Telegram', (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`],
];

export default function SocialShare({ url, title = 'Accurate News Network', className = '' }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://accuratenewsnetwork.example');
  const links = useMemo(() => networks.map(([id, label, build]) => ({ id, label, href: build(shareUrl, title) })), [shareUrl, title]);
  const copyLink = async () => { if (typeof navigator !== 'undefined' && navigator.clipboard) await navigator.clipboard.writeText(shareUrl); setCopied(true); globalThis.setTimeout(() => setCopied(false), 1800); };
  return (
    <div className={`ann-social-share${className ? ` ${className}` : ''}`} aria-label="Share this story">
      {links.map((link) => <a key={link.id} href={link.href} target="_blank" rel="noreferrer" aria-label={`Share on ${link.label}`}>{link.label}</a>)}
      <button type="button" onClick={copyLink}>{copied ? 'Copied' : 'Copy Link'}</button><style>{styles}</style>
    </div>
  );
}
const styles = `.ann-social-share{display:flex;flex-wrap:wrap;gap:.5rem}.ann-social-share a,.ann-social-share button{background:#fff;border:1px solid #cbd5e1;border-radius:999px;color:#111827;cursor:pointer;font:inherit;font-weight:850;padding:.65rem .9rem;text-decoration:none}.ann-social-share a:hover,.ann-social-share button:hover,.ann-social-share a:focus-visible,.ann-social-share button:focus-visible{border-color:#b91c1c;color:#b91c1c}`;
