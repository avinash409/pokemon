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
      <div className="page-item">
        <button
          disabled={!previous}
          className="page-link btn"
          onClick={() => navigatePage(-1)}
        >
          &lt; Previous
        </button>
      </div>
      <div className="page-item">
        <div className="page-link">
          {offset} - {Number(offset) + Number(limit)} of {count}
        </div>
      </div>
      <div className="page-item">
        <button
          disabled={!next}
          className="page-link btn"
          onClick={() => navigatePage(1)}
        >
          Next &gt;
        </button>
      </div>
      <select className="page-link" onChange={updateLimit}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
