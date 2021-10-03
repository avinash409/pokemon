import { useEffect, useState } from "react";
import { getPokemons } from '../api';
import { PokemonCard } from "../components/PokemonCard";

export const PokemonList = () => {
  const [list, setList] = useState([]);

  useEffect(async () => {
    const list = await getPokemons();
    setList(list?.results);
  }, []);

  return (
    <div className="pokemon-container">
      {list?.map((pokemon) => (
        <PokemonCard key={pokemon.name} {...pokemon} />
      ))}
    </div>
  );
};
