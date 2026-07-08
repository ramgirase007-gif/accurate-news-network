export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const classNames = (...values) => values.flat().filter(Boolean).join(' ');

export const normalizeString = (value) => String(value ?? '').trim().toLowerCase();

export const slugify = (value) => normalizeString(value)
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const buildQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== '') searchParams.append(key, item);
      });
      return;
    }

    searchParams.set(key, value);
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const createAbortError = () => new DOMException('The request was aborted.', 'AbortError');

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  return error.message || fallback;
};

export const debounce = (callback, delay = 250) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};
