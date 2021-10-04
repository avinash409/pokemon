import { useCallback, useState } from "react";
import { defaultPokemon } from "../context/pokemonContext";

export const usePokemon = () => {
  const [pokemonState, setPokemonState] = useState(defaultPokemon.state);

  const setCurrentState = useCallback((currentState) => {
    setPokemonState(currentState);
  });

  return {
    pokemonState,
    setCurrentState,
  };
};
