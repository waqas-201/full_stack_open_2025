const Total = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts[0].exercises1 + parts[1].exercises2 + parts[2].exercises3}
      </p>
    </>
  );
};

export default Total;
