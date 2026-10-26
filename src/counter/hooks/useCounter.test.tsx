import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { renderHook, act } from "@testing-library/react";

describe("useCounter", () => {
  test("should initialize with default value of 1", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(1);
  });

  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(2);
  });

  test("should decrement counter when handleSubtract is called", () => {
    const initialValue = 2;
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(1);
  });

  test("should reset to initialValue when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(3);

    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(1);
  });
});
