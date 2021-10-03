import { useEffect, useState } from "react";
import { getPokemons } from "../api";
import { Pagination } from "../components/Pagination";
import { PokemonCard } from "../components/PokemonCard";

export const PokemonList = () => {
  const [list, setList] = useState({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(async () => {
    const list = await getPokemons(limit, offset);
    setList(list);
  }, [limit, offset]);

  const navigatePage = async (type) => {
    setOffset((offset) => {
      const newOffset = Number(offset) + type * Number(limit);
      return newOffset >= 0 ? newOffset : 0;
    });
  };

  const updateLimit = async (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
  };

  return (
    <>
      <Pagination
        offset={offset}
        limit={limit}
        previous={list?.previous}
        next={list?.next}
        count={list?.count}
        navigatePage={navigatePage}
        updateLimit={updateLimit}
      />
      <div className="pokemon-container">
        {list?.results?.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </div>
      <Pagination
        offset={offset}
        limit={limit}
        previous={list?.previous}
        next={list?.next}
        count={list?.count}
        navigatePage={navigatePage}
        updateLimit={updateLimit}
      />
    </>
  );
};
