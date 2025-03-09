import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services /persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personServices.getALl().then((responce) => setPersons(responce.data));
  }, []);

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

    personServices
      .create(newPerson)
      .then((responce) => setPersons(persons.concat(responce.data)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>add a new </h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
        handleSetPerson={handleSetPerson}
      />
      <h2>Numbers</h2>
      <Persons filterdPersons={filterdPersons} />
    </div>
  );
};

export default App;
