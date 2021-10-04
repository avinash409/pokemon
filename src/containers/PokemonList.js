import { useContext, useEffect, useMemo, useState } from "react";
import { getPokemons } from "../api";
import { Pagination } from "../components/Pagination";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";
import { pokemonContext } from "../context/pokemonContext";

export const PokemonList = () => {
  const { pokemonState, setCurrentState } = useContext(pokemonContext);
  const [list, setList] = useState({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSort] = useState();
  const [searchCriteria, setSearchCriteria] = useState("");

  useEffect(async () => {
    async function getList() {
      const list = await getPokemons(limit, offset);
      setList(list);
    }
    getList();
  }, [limit, offset]);

  useMemo(() => {
    const newState = { ...pokemonState, ...list };
    setCurrentState(newState);
  }, [list]);

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

  const searchPokemon = (e) => {
    const searchCriteria = e.target.value.toLowerCase().trim();
    setSearchCriteria(searchCriteria);
  };

  const sortList = (e) => {
    const sortBy = e.target.value;
    setSort(sortBy);
  };

  const sort = (list) => {
    if (sortBy) {
      const sortedList = list?.sort((a, b) => {
        return a?.abilities?.[sortBy] - b.abilities?.[sortBy];
      });
      return sortedList;
    } else {
      return list;
    }
  };

  return (
    <>
      <Pagination
        offset={offset}
        limit={limit}
        previous={pokemonState?.previous}
        next={pokemonState?.next}
        count={pokemonState?.count}
        navigatePage={navigatePage}
        updateLimit={updateLimit}
      />
      <SearchBar searchPokemon={searchPokemon} sortList={sortList} />
      <div className="pokemon-container" data-testid="pokemon-container">
        {sort(pokemonState?.results)?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            {...pokemon}
            searchCriteria={searchCriteria}
          />
        ))}
      </div>
      <Pagination
        offset={offset}
        limit={limit}
        previous={pokemonState?.previous}
        next={pokemonState?.next}
        count={pokemonState?.count}
        navigatePage={navigatePage}
        updateLimit={updateLimit}
      />
    </>
  );
};
