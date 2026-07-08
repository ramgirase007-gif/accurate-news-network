import { NEWS_ENDPOINTS } from '../utils/constants';
import { api } from './api';

export const newsService = {
  getArticles: (params = {}, options = {}) => api.get(NEWS_ENDPOINTS.articles, { ...options, params }),
  getArticleBySlug: (slug, options = {}) => api.get(`${NEWS_ENDPOINTS.articles}/${slug}`, options),
  getCategories: (params = {}, options = {}) => api.get(NEWS_ENDPOINTS.categories, { ...options, params }),
  searchArticles: (query, params = {}, options = {}) => api.get(NEWS_ENDPOINTS.search, {
    ...options,
    params: { q: query, ...params },
  }),
};
