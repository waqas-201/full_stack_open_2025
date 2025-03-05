import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood((prev) => prev + 1);
  };
  const handleNeutral = () => {
    setNeutral((prev) => prev + 1);
  };

  const handleBad = () => {
    setBad((prev) => prev + 1);
  };

  return (
    <>
      <h2>Give a feedback </h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <div>
        <h2>Staticits </h2>
        <div>
          <p> good {good} </p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
        </div>
      </div>
    </>
  );
};

export default App;
