import { API_CONFIG } from '../utils/constants';
import { buildQueryString, getErrorMessage } from '../utils/helpers';

const DEFAULT_HEADERS = Object.freeze({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export class ApiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = details.status;
    this.payload = details.payload;
    this.url = details.url;
  }
}

const buildUrl = (endpoint, { baseUrl = API_CONFIG.baseUrl, params } = {}) => {
  const endpointUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
  return `${endpointUrl}${buildQueryString(params)}`;
};

export async function request(endpoint, options = {}) {
  const {
    baseUrl,
    body,
    headers,
    method = 'GET',
    params,
    signal,
    timeoutMs = API_CONFIG.timeoutMs,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const abortRequest = () => controller.abort();
  signal?.addEventListener('abort', abortRequest, { once: true });

  const url = buildUrl(endpoint, { baseUrl, params });

  try {
    const response = await fetch(url, {
      method,
      headers: { ...DEFAULT_HEADERS, ...headers },
      body: body && typeof body === 'object' ? JSON.stringify(body) : body,
      signal: controller.signal,
      ...fetchOptions,
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
      throw new ApiError(getErrorMessage(payload?.message || payload, `Request failed with status ${response.status}.`), {
        status: response.status,
        payload,
        url,
      });
    }

    return payload;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abortRequest);
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, body, method: 'POST' }),
  put: (endpoint, body, options) => request(endpoint, { ...options, body, method: 'PUT' }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, body, method: 'PATCH' }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};
