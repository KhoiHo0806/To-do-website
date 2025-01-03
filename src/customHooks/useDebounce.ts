import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceString, setDebounceString] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceString(value);
    }, delay);

    //clean up timeout for next run
    return () => {
      clearTimeout(handler);
    };
    // retrigger when value change
  }, [value, delay]);
  return debounceString;
};

export default useDebounce;
