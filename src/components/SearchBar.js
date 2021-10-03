export const SearchBar = ({
    searchPokemon
}) => {
  return (
    <div className="search-bar">
      <input onChange={searchPokemon} placeholder="Search By Name, Abilities" />
    </div>
  );
};
