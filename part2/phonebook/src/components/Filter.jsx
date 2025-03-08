const Filter = ({ search, setSearch }) => {
  return (
    <div>
      <p>
        filter shown with :{" "}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </p>
    </div>
  );
};

export default Filter;
