"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValueProp: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This initializer function runs only once on component mount
    if (typeof window === "undefined") {
      return initialValueProp;
    }
    try {
      const item = window.localStorage.getItem(key);
      // If item exists, parse it. Otherwise, use the initialValueProp.
      return item ? (JSON.parse(item) as T) : initialValueProp;
    } catch (error) {
      console.warn(
        `Error reading localStorage key "${key}" during initial useState:`,
        error
      );
      return initialValueProp;
    }
  });

  // The setValue function is memoized with useCallback.
  // It updates both the React state and localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      // setStoredValue can take a value or a function to update the current value.
      setStoredValue((currentStoredValue) => {
        const valueToStore =
          value instanceof Function ? value(currentStoredValue) : value;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
          }
        }
        return valueToStore;
      });
    },
    [key]
  );

  // This useEffect handles changes to localStorage from other tabs or windows.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue === null) {
          // Item was removed or cleared from localStorage
          // Reset to the initialValueProp passed to the hook.
          setStoredValue(initialValueProp);
        } else {
          try {
            // New value found in localStorage, update state.
            setStoredValue(JSON.parse(event.newValue) as T);
          } catch (error) {
            console.warn(
              `Error parsing localStorage change for key "${key}":`,
              error
            );
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup function to remove the event listener when the component unmounts or key changes.
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValueProp]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    // Capture the initialValueProp at the time of effect setup.
    const currentInitialValue = initialValueProp;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue === null) {
          setStoredValue(currentInitialValue);
        } else {
          try {
            setStoredValue(JSON.parse(event.newValue) as T);
          } catch (error) {
            console.warn(
              `Error parsing localStorage change for key "${key}":`,
              error
            );
          }
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
