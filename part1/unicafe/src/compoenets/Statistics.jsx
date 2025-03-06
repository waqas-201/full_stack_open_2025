import StatisticLine from "./StatisticLine";

export const Statistics = ({ good, neutral, bad }) => {
  if (!good && !bad && !neutral) {
    return <p> No feedback is given </p>;
  }
  return (
    <>
      <h2>Statistics</h2>

      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={good + neutral + bad} />
      <StatisticLine text={"average"} value={(good + neutral + bad) / 3} />
      <StatisticLine text={"positive"} value={(good + neutral) / 2} />
    </>
  );
};
