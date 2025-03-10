const Persons = ({ filterdPersons, handleDeletePerson }) => {
  return (
    <>
      {filterdPersons.map((person) => {
        return (
          <div key={person.id}>
            <div>
              <p>name: {person.name}</p>
              <p> number:{person.number}</p>
            </div>
            <button onClick={() => handleDeletePerson(person)}>delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Persons;
