import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "18738736187631" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  //

  const checkDuplicate = (value) => {
    const result = persons.find((val) => {
      return val.name === value;
    });
    if (result?.name) {
      return true;
    }
    return false;
  };

  const handleSetPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: number,
    };

    const result = checkDuplicate(newName);

    if (result) {
      alert(`${newName}  is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <div key={person.name}>
            <p>name: {person.name}</p>
            <p> number:{person.number}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
