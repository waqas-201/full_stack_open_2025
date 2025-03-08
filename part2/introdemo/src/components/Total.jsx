const Total = ({ parts }) => {
  // Expected output: 10
  const total = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Total;
