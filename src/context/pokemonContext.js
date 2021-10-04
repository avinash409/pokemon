import React from "react";

export const defaultPokemon = {
  state: {
    count: 0,
    results: [],
    next: "",
    previous: "",
  },
  setState: () => {},
};

export const pokemonContext = React.createContext(defaultPokemon);
