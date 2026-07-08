import { useCallback, useMemo, useState } from 'react';

import { normalizeString } from '../utils/helpers';

export function useSearch(items = [], options = {}) {
  const {
    initialQuery = '',
    keys = [],
    minQueryLength = 1,
    searchFn,
  } = options;

  const [query, setQuery] = useState(initialQuery);
  const normalizedQuery = normalizeString(query);

  const defaultSearch = useCallback((item) => {
    if (normalizedQuery.length < minQueryLength) return false;

    const searchableValues = keys.length
      ? keys.map((key) => key.split('.').reduce((value, pathKey) => value?.[pathKey], item))
      : Object.values(item ?? {});

    return searchableValues.flat().some((value) => normalizeString(value).includes(normalizedQuery));
  }, [keys, minQueryLength, normalizedQuery]);

  const results = useMemo(() => {
    if (normalizedQuery.length < minQueryLength) return [];
    return items.filter((item) => (searchFn ? searchFn(item, normalizedQuery) : defaultSearch(item)));
  }, [defaultSearch, items, minQueryLength, normalizedQuery, searchFn]);

  return {
    query,
    setQuery,
    normalizedQuery,
    results,
    hasQuery: normalizedQuery.length >= minQueryLength,
    resultCount: results.length,
  };
}
