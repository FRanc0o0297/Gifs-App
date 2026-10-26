import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render searchBar correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should call onQuery with the correct value after 1000ms", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(
      () => {
        expect(onQuery).toHaveBeenCalled();
        expect(onQuery).toHaveBeenCalledWith("test");
      },
      { timeout: 1050 },
    );
  });

  test("should call only once with the last value(debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });

    await waitFor(
      () => {
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith("t");
      },
      { timeout: 1050 },
    );
  });

  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test3" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test3");
  });
  test("The input should have the correct placeholder value.", () => {
    const value = "Buscar Gif test";
    render(<SearchBar onQuery={() => {}} placeholder={value} />);
    /*     screen.debug();
     */
    expect(screen.getAllByPlaceholderText(value)).toBeDefined();
  });
});
