import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../../../components/search/SearchBar";  

describe("SearchBar", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test("renders the search input and button", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText("Search recipes by ingredient or name...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  test("allows user to type in the search input", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      "Search recipes by ingredient or name..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "chicken" } });
    expect(input.value).toBe("chicken");
  });

  test("calls onSearch with the query when form is submitted", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      "Search recipes by ingredient or name..."
    );
    const button = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "pasta" } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("pasta");
  });

  test("does not call onSearch if query is empty", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);
    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(
      screen.getByText("Please enter an ingredient or keyword to search.")
    ).toBeInTheDocument();
  });

  test("displays loading state on button", () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
    const button = screen.getByRole("button", { name: /Search/i });
    expect(button).toBeDisabled();
    // Check for SVG or loading text if your button has specific loading indicators
    expect(
      screen
        .getByRole("button", { name: /Search/i })
        .querySelector("svg.animate-spin")
    ).toBeInTheDocument();
  });

  test("clears error when user starts typing after an error", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      "Search recipes by ingredient or name..."
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Search/i });

    // Submit empty to trigger error
    fireEvent.click(button);
    expect(
      screen.getByText("Please enter an ingredient or keyword to search.")
    ).toBeInTheDocument();

    // Start typing
    fireEvent.change(input, { target: { value: "c" } });
    expect(
      screen.queryByText("Please enter an ingredient or keyword to search.")
    ).not.toBeInTheDocument();
  });
});
