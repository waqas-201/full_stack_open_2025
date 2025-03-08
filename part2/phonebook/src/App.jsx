import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  let filterdPersons = !search
    ? persons
    : persons.filter((p) => {
        const lowercasepersons = p.name.toLocaleLowerCase();
        return lowercasepersons.includes(search);
      });

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
      id: Number(persons.length + 1),
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
      {filterdPersons.map((person) => {
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
