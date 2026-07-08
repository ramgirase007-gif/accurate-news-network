import { API_CONFIG, WORDPRESS_ENDPOINTS } from '../utils/constants';
import { request } from './api';

const wordpressRequest = (endpoint, options = {}) => request(endpoint, {
  baseUrl: API_CONFIG.wordpressUrl,
  ...options,
});

export const wordpressService = {
  getPosts: (params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.posts, { ...options, params }),
  getPost: (id, options = {}) => wordpressRequest(`${WORDPRESS_ENDPOINTS.posts}/${id}`, options),
  getPages: (params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.pages, { ...options, params }),
  getCategories: (params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.categories, { ...options, params }),
  getTags: (params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.tags, { ...options, params }),
  getMedia: (id, options = {}) => wordpressRequest(`${WORDPRESS_ENDPOINTS.media}/${id}`, options),
  searchPosts: (query, params = {}, options = {}) => wordpressRequest(WORDPRESS_ENDPOINTS.posts, {
    ...options,
    params: { search: query, ...params },
  }),
};
