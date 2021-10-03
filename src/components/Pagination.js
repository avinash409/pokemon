export const Pagination = ({
  count,
  previous,
  next,
  offset,
  limit,
  navigatePage,
  updateLimit,
}) => {
  const options = [10, 20, 50];

  return (
    <div className="pagination">
      <div>
        {previous && <button onClick={() => navigatePage(-1)}>Previous</button>}
        <span>
          Results {offset} - {Number(offset) + Number(limit)} of {count}
        </span>
        {next && <button onClick={() => navigatePage(1)}>Next</button>}
      </div>
      <select onChange={updateLimit}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
