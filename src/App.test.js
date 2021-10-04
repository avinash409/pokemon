import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders different containers", () => {
  render(<App />);
  const pokemonContainer = screen.getByTestId("pokemon-container");
  const paginationContainer = screen.getAllByTestId("pagination-container");
  const searchContainer = screen.getByTestId("search-container");
  expect(pokemonContainer).toBeInTheDocument();
  expect(searchContainer).toBeInTheDocument();
  expect(paginationContainer).toHaveLength(2);
});
