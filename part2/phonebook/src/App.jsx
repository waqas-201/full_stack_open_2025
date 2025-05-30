import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services /persons";
import { Notification } from "./components/Notification";
import { NotificationSuccess } from "./components/NotificationSuccess";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

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
      return { id: result.id, success: true };
    }
    return { id: undefined, success: false };
  };

  const handleSetPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: number,
    };

    const result = checkDuplicate(newName);

    if (result.success) {
      // it means we found duplicate value
      const confirmUpdate = window.confirm(
        `${newName}  is already added to phonebook do you want to replace the old number with the new one?`
      );

      // if its not no it means it is yes and we will go ahead
      if (confirmUpdate) {
        personServices
          .update(newPerson)
          .then(() => {
            personServices.getALl().then((responce) => {
              setPersons(responce.data);
            });
          })
          .catch((error) => {
            console.log(error.responce);

            setErrorMessage(error?.response?.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
      if (!confirmUpdate) return; // if confirm if no we will stop here
    }

    if (!result.success) {
      personServices
        .create(newPerson)
        .then((responce) => {
          setPersons(persons.concat(responce.data));
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  const handleDeletePerson = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (!confirmDelete) return;

    personServices
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
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

      {success ? <NotificationSuccess message={newName} /> : null}
      {errorMessage ? <Notification message={errorMessage} /> : null}
      <Persons
        filterdPersons={filterdPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
