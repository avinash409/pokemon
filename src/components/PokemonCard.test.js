import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { PokemonCard } from "./PokemonCard";
import { pokemonContext } from "../context/pokemonContext";
import { fetchApi } from "../api";

jest.mock("../api", () => ({
  fetchApi: jest.fn().mockReturnValue({
    abilities: [
      {
        ability: {
          name: "keen-eye",
          url: "https://pokeapi.co/api/v2/ability/51/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "sniper",
          url: "https://pokeapi.co/api/v2/ability/97/",
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    height: 3,
    id: 21,
    name: "spearow",
    sprites: {
      other: {
        dream_world: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/21.svg",
          front_female: null,
        },
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
        },
      },
    },
    weight: 20,
  }),
}));

afterEach(cleanup);

test("should render pokemon name ", () => {
  const context = {
    pokemonState: {
      count: 10,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=10",
      previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10",
      results: [
        { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
        { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
      ],
    },
    setCurrentState: () => {},
  };
  const props = {
    name: "metapod",
    url: "https://pokeapi.co/api/v2/pokemon/11/",
  };
  render(
    <pokemonContext.Provider value={context}>
      <PokemonCard {...props} />
    </pokemonContext.Provider>
  );
  const cardName = screen.getByText("metapod");
  expect(cardName).toBeInTheDocument();
});

test("should render image, height, weight and abilities ", async () => {
  const context = {
    pokemonState: {
      count: 10,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=10",
      previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10",
      results: [
        { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
        { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
      ],
    },
    setCurrentState: () => {},
  };
  const props = {
    name: "metapod",
    url: "https://pokeapi.co/api/v2/pokemon/11/",
  };
  const { getByText } = render(
    <pokemonContext.Provider value={context}>
      <PokemonCard {...props} />
    </pokemonContext.Provider>
  );
  const height = await waitFor(() => getByText(/Height/i));
  const weight = await waitFor(() => getByText(/Weight/i));
  const abilities = await waitFor(() => getByText(/Abilities/i));
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(abilities).toBeInTheDocument();
});
