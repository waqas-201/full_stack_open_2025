export const Statistics = ({ good, neutral, bad }) => {
  if (!good && !bad && !neutral) {
    return <p> No feedback is given </p>;
  }
  return (
    <>
      <h2>Statistics</h2>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) / 3}</p>
      <p>positive {(good + neutral) / 2}</p>
    </>
  );
};
