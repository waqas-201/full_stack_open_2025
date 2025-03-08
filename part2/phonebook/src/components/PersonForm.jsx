const PersonForm = ({
  newName,
  setNewName,
  number,
  setNumber,
  handleSetPerson,
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={(e) => handleSetPerson(e)}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
