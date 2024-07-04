import { useState, useCallback, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setLocalStorage = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        } catch (error) {
          console.log(error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [value, setLocalStorage];
}

export default useLocalStorage;
