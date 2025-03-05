export const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) / 3}</p>
      <p>positive {(good + neutral) / 2}</p>
    </>
  );
};
