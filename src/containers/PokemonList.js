import { useEffect, useState } from "react";
import { getPokemons } from "../api";
import { Pagination } from "../components/Pagination";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";

const sortOptions = [
  {
    display: "Name",
    field: "name",
  },
  {
    display: "Height",
    field: "height",
  },
  {
    display: "Weight",
    field: "weight",
  },
];

export const PokemonList = () => {
  const [list, setList] = useState({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchCriteria, setSearchCriteria] = useState("");

  useEffect(async () => {
    async function getList() {
      const list = await getPokemons(limit, offset);
      setList(list);
    }
    getList();
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

  const searchPokemon = (e) => {
    const searchCriteria = e.target.value.toLowerCase().trim();
    setSearchCriteria(searchCriteria);
  };

  const sortList = (e) => {
    const sortBy = e.target.value;
    const sortedList = list?.results?.sort((a, b) => a[sortBy] - b[sortBy]);
    setList(sortedList);
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
      <SearchBar searchPokemon={searchPokemon} />
      <select onChange={sortList}>
        <option>Sort By</option>
        {sortOptions.map((opt) => (
          <option key={opt.field} value={opt.field}>{opt.display}</option>
        ))}
      </select>
      <div className="pokemon-container">
        {list?.results?.map((pokemon) => (
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
        previous={list?.previous}
        next={list?.next}
        count={list?.count}
        navigatePage={navigatePage}
        updateLimit={updateLimit}
      />
    </>
  );
};
