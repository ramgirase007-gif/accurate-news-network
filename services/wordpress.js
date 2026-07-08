import { API_CONFIG, WORDPRESS_ENDPOINTS } from '../utils/constants';
import { request } from './api';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80';

const DEFAULT_POST_PARAMS = Object.freeze({
  _embed: '1',
  per_page: 10,
});

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const decodeHtml = (value = '') => {
  if (typeof document === 'undefined') {
    return String(value)
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
};

const getRendered = (field) => decodeHtml(field?.rendered || field || '');
const getEmbedded = (post, key) => post?._embedded?.[key]?.[0];
const getTerms = (post, taxonomy) => post?._embedded?.['wp:term']?.flat().filter((term) => term.taxonomy === taxonomy) || [];

const normalizeFeaturedImage = (post) => {
  const media = getEmbedded(post, 'wp:featuredmedia');
  const source = media?.media_details?.sizes?.large?.source_url || media?.media_details?.sizes?.medium_large?.source_url || media?.source_url;

  return {
    imageUrl: source || DEFAULT_PLACEHOLDER_IMAGE,
    imageAlt: media?.alt_text || stripHtml(media?.caption?.rendered || '') || `Editorial image for ${stripHtml(getRendered(post?.title))}`,
    caption: stripHtml(media?.caption?.rendered || ''),
  };
};

export const normalizeWordPressCategory = (category = {}) => ({
  id: category.id,
  name: decodeHtml(category.name || 'News'),
  slug: category.slug || 'news',
  description: stripHtml(decodeHtml(category.description || '')),
  count: category.count || 0,
  link: category.link,
});

export const normalizeWordPressPost = (post = {}) => {
  const title = stripHtml(getRendered(post.title)) || 'Untitled article';
  const excerpt = stripHtml(getRendered(post.excerpt));
  const contentHtml = post.content?.rendered || '';
  const categories = getTerms(post, 'category').map(normalizeWordPressCategory);
  const tags = getTerms(post, 'post_tag').map((tag) => decodeHtml(tag.name));
  const author = getEmbedded(post, 'author');
  const featuredImage = normalizeFeaturedImage(post);

  return {
    id: post.id || post.slug || title,
    slug: post.slug || String(post.id || ''),
    headline: title,
    title,
    dek: excerpt,
    excerpt,
    contentHtml,
    content: contentHtml ? [] : [excerpt].filter(Boolean),
    category: categories[0]?.name || 'News',
    categorySlug: categories[0]?.slug || 'news',
    categories,
    tags,
    author: author?.name || 'Accurate News Network',
    authorAvatar: author?.avatar_urls?.['96'] || author?.avatar_urls?.['48'],
    authorUrl: author?.link,
    publishDate: post.date_gmt ? `${post.date_gmt}Z` : post.date,
    modifiedDate: post.modified_gmt ? `${post.modified_gmt}Z` : post.modified,
    href: `/news/${post.slug}`,
    wordpressLink: post.link,
    ...featuredImage,
  };
};

const getTotalPages = (headers) => Number(headers?.get?.('x-wp-totalpages') || 1);
const getTotal = (headers) => Number(headers?.get?.('x-wp-total') || 0);

const wordpressRequest = (endpoint, options = {}) => request(endpoint, {
  baseUrl: API_CONFIG.wordpressUrl,
  ...options,
});

async function wordpressCollectionRequest(endpoint, options = {}) {
  const { params, ...rest } = options;
  const response = await wordpressRequest(endpoint, {
    ...rest,
    params,
  });

  return response;
}

export const isWordPressConfigured = () => Boolean(API_CONFIG.wordpressUrl);

export const wordpressService = {
  getPosts: (params = {}, options = {}) => wordpressCollectionRequest(WORDPRESS_ENDPOINTS.posts, {
    ...options,
    params: { ...DEFAULT_POST_PARAMS, ...params },
  }),
  getLatestPosts: async (params = {}, options = {}) => {
    const posts = await wordpressService.getPosts({ orderby: 'date', order: 'desc', ...params }, options);
    return posts.map(normalizeWordPressPost);
  },
  getPost: (id, options = {}) => wordpressRequest(`${WORDPRESS_ENDPOINTS.posts}/${id}`, { params: { _embed: '1' }, ...options }),
  getPostBySlug: async (slug, options = {}) => {
    const posts = await wordpressService.getPosts({ slug, per_page: 1 }, options);
    return posts[0] ? normalizeWordPressPost(posts[0]) : null;
  },
  getRelatedPosts: async (post, params = {}, options = {}) => {
    const categoryIds = post?.categories?.map((category) => category.id).filter(Boolean).join(',');
    const posts = await wordpressService.getPosts({ categories: categoryIds, exclude: post?.id, per_page: 3, ...params }, options);
    return posts.map(normalizeWordPressPost);
  },
  getPages: (params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.pages, { ...options, params }),
  getCategories: async (params = {}, options = {}) => {
    const categories = await wordpressRequest(WORDPRESS_ENDPOINTS.categories, { ...options, params: { per_page: 100, hide_empty: true, ...params } });
    return categories.map(normalizeWordPressCategory);
  },
  getTags: (params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.tags, { ...options, params }),
  getMedia: (id, options = {}) => wordpressRequest(`${WORDPRESS_ENDPOINTS.media}/${id}`, options),
  searchPosts: async (query, params = {}, options = {}) => {
    const posts = await wordpressService.getPosts({ search: query, ...params }, options);
    return posts.map(normalizeWordPressPost);
  },
  getPagination: { getTotal, getTotalPages },
};
