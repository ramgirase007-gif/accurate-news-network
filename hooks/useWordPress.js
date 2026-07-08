import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { isWordPressConfigured, wordpressService } from '../services/wordpress';
import { getErrorMessage } from '../utils/helpers';

function useWordPressResource(fetcher, dependencies = [], options = {}) {
  const { enabled = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && isWordPressConfigured()));
  const abortRef = useRef(null);

  const execute = useCallback(async () => {
    if (!enabled || !isWordPressConfigured()) {
      setLoading(false);
      return initialData;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher({ signal: controller.signal });
      if (!controller.signal.aborted) setData(result);
      return result;
    } catch (requestError) {
      if (requestError.name === 'AbortError') return null;
      const normalized = new Error(getErrorMessage(requestError, 'WordPress content is temporarily unavailable.'));
      setError(normalized);
      return null;
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    execute();
    return () => abortRef.current?.abort();
  }, [execute]);

  return { data, error, loading, refetch: execute, isConfigured: isWordPressConfigured() };
}

export function useLatestWordPressPosts(params = {}, options = {}) {
  const key = JSON.stringify(params);
  return useWordPressResource(
    (requestOptions) => wordpressService.getLatestPosts(params, requestOptions),
    [key, options.enabled],
    { initialData: [], ...options },
  );
}

export function useWordPressCategories(params = {}, options = {}) {
  const key = JSON.stringify(params);
  return useWordPressResource(
    (requestOptions) => wordpressService.getCategories(params, requestOptions),
    [key, options.enabled],
    { initialData: [], ...options },
  );
}

export function useWordPressPostBySlug(slug, options = {}) {
  return useWordPressResource(
    (requestOptions) => (slug ? wordpressService.getPostBySlug(slug, requestOptions) : Promise.resolve(null)),
    [slug, options.enabled],
    { initialData: null, enabled: Boolean(slug) && options.enabled !== false, ...options },
  );
}

export function useWordPressSearch(query, params = {}, options = {}) {
  const key = JSON.stringify(params);
  const normalizedQuery = useMemo(() => query?.trim() || '', [query]);

  return useWordPressResource(
    (requestOptions) => (normalizedQuery ? wordpressService.searchPosts(normalizedQuery, params, requestOptions) : Promise.resolve([])),
    [normalizedQuery, key, options.enabled],
    { initialData: [], enabled: Boolean(normalizedQuery) && options.enabled !== false, ...options },
  );
}

export function useRelatedWordPressPosts(post, params = {}, options = {}) {
  const key = JSON.stringify(params);
  return useWordPressResource(
    (requestOptions) => (post ? wordpressService.getRelatedPosts(post, params, requestOptions) : Promise.resolve([])),
    [post?.id, post?.categorySlug, key, options.enabled],
    { initialData: [], enabled: Boolean(post) && options.enabled !== false, ...options },
  );
}
