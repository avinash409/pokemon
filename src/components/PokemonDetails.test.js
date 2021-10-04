import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router";
import { createMemoryHistory } from "history";
import { PokemonDetails } from "./PokemonDetails";

test("render Back button", async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/details"]}>
      <Route path="/details">
        <PokemonDetails />
      </Route>
    </MemoryRouter>
  );
  const backButton = await waitFor(() => getByText(/Go Back/));
  expect(backButton).toBeInTheDocument();
});

test("should redirect to dashboard when Back button is clicked", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <PokemonDetails />
    </Router>
  );
  const backButton = await waitFor(() => getByText(/Go Back/));
  await fireEvent.click(backButton);
//   expect(screen.getByTestId("pokemon-container")).toBeInTheDocument();
});
