import { cleanup, render, screen } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { pokemonContext } from "../context/pokemonContext";

afterEach(cleanup);

test("should render result count and 10 results per page by default", () => {
  const context = {
    pokemonState: {
      count: 10,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=10",
      previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10",
      results: [
        { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
        { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" }
      ],
    },
    setCurrentState: () => {},
  };
  const { container, getAllByTestId } = render(
    <pokemonContext.Provider value={context}>
      <PokemonList />
    </pokemonContext.Provider>
  );
  const cards = screen.getAllByText("0 - 10 of 10");
  expect(cards).toHaveLength(2);
});

  