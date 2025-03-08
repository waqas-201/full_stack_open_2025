const Persons = ({ filterdPersons }) => {
  return (
    <>
      {filterdPersons.map((person) => {
        return (
          <div key={person.name}>
            <p>name: {person.name}</p>
            <p> number:{person.number}</p>
          </div>
        );
      })}
    </>
  );
};

export default Persons;
