import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import { mockGifs } from "../../mock-data/gifs.mock";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs).toStrictEqual(mockGifs);
    expect(result.current.gifs).not.toBeNull;
    expect(result.current.previousTerms).toStrictEqual([]);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined;
    expect(result.current.handleTermClicked).toBeDefined;
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("lolo");
    });
    console.log(act);
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("lolo");
    });
    console.log(act);
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("lolo");
    });

    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("this is the test error"),
    );

    await act(async () => {
      await result.current.handleTermClicked("lolo");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 4 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("lolo1");
    });
    await act(async () => {
      await result.current.handleSearch("lolo2");
    });
    await act(async () => {
      await result.current.handleSearch("lolo3");
    });
    await act(async () => {
      await result.current.handleSearch("lolo4");
    });
    await act(async () => {
      await result.current.handleSearch("lolo5");
    });

    expect(result.current.previousTerms.length).toBe(4);
    expect(result.current.previousTerms).toStrictEqual([
      "lolo5",
      "lolo4",
      "lolo3",
      "lolo2",
    ]);
  });
});
