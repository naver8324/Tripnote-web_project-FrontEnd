import { useCallback, useEffect, useRef, useState } from 'react';

const useDebounce = (callback, delay) => {
  const timer = useRef(null);

  const debounceFunc = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  timer.current = setTimeout(() => {
    callback(...args);
  }, delay);
  }, [callback, delay]);

  return debounceFunc;
};

export default useDebounce;
