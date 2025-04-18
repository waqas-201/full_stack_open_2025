import AllParts from "./AllParts";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <AllParts key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
