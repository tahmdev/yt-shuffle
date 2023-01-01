import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalstorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    //get state from localstorage or return initialvalue
    if (typeof window !== "undefined") {
      return getLocalstorage(key, initialValue);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];

  function getLocalstorage(key: string, initialValue: T): T {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initialValue;
    const storedObject = JSON.parse(storedValue);
    if (!storedObject) return initialValue;
    return storedObject;
  }
}
