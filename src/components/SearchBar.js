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

export const SearchBar = ({ searchPokemon, sortList }) => {
  return (
    <div className="search-bar col-4">
      <select
      className="col-5"
        onChange={sortList}
      >
        <option>Sort By</option>
        {sortOptions.map((opt) => (
          <option key={opt.field} value={opt.field}>
            {opt.display}
          </option>
        ))}
      </select>
      <input
        className="col-6"
        onChange={searchPokemon}
        placeholder="Search By Name, Abilities"
      />
    </div>
  );
};
