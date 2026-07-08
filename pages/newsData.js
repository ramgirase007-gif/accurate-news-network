export const newsArticles = [
  {
    id: 'climate-resilience-funding',
    slug: 'climate-resilience-funding',
    headline: 'Global leaders announce new climate resilience funding package',
    dek: 'The agreement directs new support toward flood defenses, heat planning, and rapid recovery programs in vulnerable regions.',
    category: 'World',
    author: 'Elena Rodriguez',
    authorTitle: 'Global Affairs Editor',
    publishDate: '2026-07-08T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Newspapers stacked beside a cup of coffee in a newsroom',
    tags: ['Climate', 'Resilience', 'Policy', 'World'],
    content: [
      'Global leaders outlined a new funding package aimed at helping communities prepare for floods, heat waves, and storm recovery. The plan prioritizes local infrastructure, verified risk data, and transparent reporting on how funds are used.',
      'Officials said the first grants will support emergency warning systems and resilience projects that can be audited by independent reviewers. Community organizations are expected to help identify neighborhoods with the highest exposure.',
      'Analysts caution that implementation details will determine whether the package reaches the places most affected by extreme weather. ANN will continue tracking spending records, project timelines, and measurable outcomes.',
    ],
  },
  {
    id: 'hospital-security-review', slug: 'hospital-security-review', headline: 'Hospitals adopt updated safeguards after nationwide security review', dek: 'Health systems are coordinating new training, downtime procedures, and patient notification standards.', category: 'Health', author: 'Noah Bennett', authorTitle: 'Health Correspondent', publishDate: '2026-07-08T09:40:00Z', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Medical team reviewing patient charts in a hospital corridor', tags: ['Health', 'Security', 'Hospitals'], content: ['Hospitals are updating operational safeguards after a nationwide review of critical systems and patient communications.', 'The guidance calls for clearer escalation plans, recurring staff drills, and backup procedures that keep essential care available during outages.', 'Patient advocates welcomed the added transparency while urging administrators to report disruptions quickly and plainly.'],
  },
  {
    id: 'late-night-transit-routes', slug: 'late-night-transit-routes', headline: 'Transit agencies expand late-night routes for major summer events', dek: 'Extra buses and trains are being added around festivals, concerts, and downtown service corridors.', category: 'Local', author: 'Priya Shah', authorTitle: 'Transportation Reporter', publishDate: '2026-07-08T09:05:00Z', imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=85', imageAlt: 'City bus moving through an urban street at dusk', tags: ['Transit', 'Local', 'Events'], content: ['Transit agencies announced expanded late-night service to help riders travel safely after major summer events.', 'The added trips focus on high-demand corridors and include coordinated staffing at busy transfer points.', 'Officials recommend checking schedules before traveling because routes may change as crowd estimates are updated.'],
  },
  {
    id: 'verified-media-labels', slug: 'verified-media-labels', headline: 'Technology firms release joint standards for verified media labels', dek: 'The voluntary framework defines common language for authenticity signals across images, video, and audio.', category: 'Technology', author: 'Marcus Lee', authorTitle: 'Technology Editor', publishDate: '2026-07-08T08:35:00Z', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Laptop showing analytics dashboards on a desk', tags: ['Technology', 'Verification', 'Media'], content: ['Technology firms published shared standards for labels that identify verified and edited media.', 'The framework is designed to make authenticity notices easier to recognize across platforms without replacing newsroom verification.', 'Researchers said consistent labels can help readers, but warned that disclosure systems must be paired with media literacy and enforcement.'],
  },
  {
    id: 'digital-payments-guidance', slug: 'digital-payments-guidance', headline: 'Small businesses prepare for new digital payments guidance', dek: 'Merchants are reviewing fraud prevention, receipt practices, and staff training before updated guidance takes effect.', category: 'Business', author: 'Avery Thompson', authorTitle: 'Business Reporter', publishDate: '2026-07-08T08:10:00Z', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Shop owner processing a customer card payment', tags: ['Business', 'Payments', 'Security'], content: ['Small businesses are preparing for updated digital payment safety guidance focused on fraud prevention and clearer customer records.', 'Trade groups say the changes are manageable when payment providers offer plain-language instructions and training materials.', 'Consumer advocates say consistent receipts and dispute channels will be important for trust.'],
  },
  {
    id: 'heat-school-sports-schedules', slug: 'heat-school-sports-schedules', headline: 'Researchers map how extreme heat changes school sports schedules', dek: 'New planning tools help districts shift practices, add cooling breaks, and communicate schedule changes.', category: 'Sports', author: 'Jordan Kim', authorTitle: 'Sports Desk', publishDate: '2026-07-08T07:45:00Z', imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Outdoor running track under a bright summer sky', tags: ['Sports', 'Schools', 'Heat'], content: ['Researchers released new planning tools showing how extreme heat affects school sports schedules.', 'Districts are using the data to move practices, add cooling breaks, and alert families earlier when conditions change.', 'Coaches said the goal is to preserve participation while reducing preventable health risks.'],
  },
];

export const getArticleBySlug = (slug) => newsArticles.find((article) => article.slug === slug) || newsArticles[0];
export const getArticlesByCategory = (category) => newsArticles.filter((article) => article.category.toLowerCase() === category.toLowerCase());
export const searchArticles = (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];
  return newsArticles.filter((article) => [article.headline, article.dek, article.category, article.author, ...article.tags].join(' ').toLowerCase().includes(normalizedQuery));
};
