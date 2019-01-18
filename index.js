import { useState, useEffect } from 'react';
import { set, get } from './idb.js';

export const useIdb = (key, initialState) => {
  const [item, setItem] = useState(initialState);
  useEffect(
    () => {
      (async () => {
        const currentValue = await get(key);
        if (currentValue !== undefined) {
          setItem(currentValue);
        }
      })();
    },
    [key]
  );
  return [
    item,
    value => {
      setItem(value);
      return set(key, value);
    },
  ];
};
