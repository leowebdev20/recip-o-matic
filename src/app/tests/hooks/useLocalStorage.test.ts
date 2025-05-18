import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../../../lib/hooks/useLocalStorage";

describe("useLocalStorage Hook", () => {
  const TEST_KEY = "testKey";

  beforeEach(() => {
    localStorage.clear();
  });

  test("should return initial value if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    expect(result.current[0]).toBe("initial");
  });

  test("should return value from localStorage if present", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify("stored value"));
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    expect(result.current[0]).toBe("stored value");
  });

  test("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify("new value"));
  });

  test("should handle functional updates", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, 10));

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(15);
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(15));
  });

  test("should handle objects as values", () => {
    const initialObject = { name: "Alice", age: 30 };
    const updatedObject = { name: "Bob", age: 35 };
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, initialObject)
    );

    expect(result.current[0]).toEqual(initialObject);

    act(() => {
      result.current[1](updatedObject);
    });

    expect(result.current[0]).toEqual(updatedObject);
    expect(JSON.parse(localStorage.getItem(TEST_KEY) || "{}")).toEqual(
      updatedObject
    );
  });

  test("should handle JSON parse errors gracefully and return initialValue", () => {
    localStorage.setItem(TEST_KEY, "not a valid json string");
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, "initial fallback")
    );
    // You might want to spyOn console.warn for this test case
    expect(result.current[0]).toBe("initial fallback");
  });
});
