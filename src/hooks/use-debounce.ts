import { useState, useEffect } from 'react';

type ReturnType = string;

export function useDebounce(value: string, delay = 500): ReturnType {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceQuery<T extends Record<string, any>>(
  query: T,
  delayKey: string,
  delay = 500
): T {
  const [debouncedValue, setDebouncedValue] = useState(query);

  // Only apply delay if user searching data
  if (!query[delayKey]) {
    delay = 0;
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return debouncedValue;
}
