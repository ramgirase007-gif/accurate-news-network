import { useCallback, useEffect, useRef, useState } from 'react';

import { request } from '../services/api';
import { getErrorMessage } from '../utils/helpers';

export function useFetch(endpoint, options = {}) {
  const {
    enabled = true,
    initialData = null,
    requestOptions,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && endpoint));
  const abortControllerRef = useRef(null);
  const callbacksRef = useRef({ onError, onSuccess, requestOptions });

  useEffect(() => {
    callbacksRef.current = { onError, onSuccess, requestOptions };
  }, [onError, onSuccess, requestOptions]);

  const execute = useCallback(async (overrideOptions = {}) => {
    if (!endpoint) return null;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await request(endpoint, {
        ...callbacksRef.current.requestOptions,
        ...overrideOptions,
        signal: controller.signal,
      });
      setData(response);
      callbacksRef.current.onSuccess?.(response);
      return response;
    } catch (requestError) {
      if (requestError.name === 'AbortError') return null;
      const normalizedError = new Error(getErrorMessage(requestError));
      setError(normalizedError);
      callbacksRef.current.onError?.(normalizedError);
      return null;
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (enabled && endpoint) execute();
    return () => abortControllerRef.current?.abort();
  }, [enabled, endpoint, execute]);

  return { data, error, loading, refetch: execute, setData };
}
