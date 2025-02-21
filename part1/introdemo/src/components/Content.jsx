import Part1 from "./Part1";
import Part2 from "./Part2";
import { Part3 } from "./Part3";

const Content = ({
  part1,
  part2,
  part3,
  exercises1,
  exercises2,
  exercises3,
}) => {
  return (
    <>
      <Part1 part1={part1} exercises1={exercises1} />
      <Part2 part2={part2} exercises2={exercises2} />
      <Part3 part3={part3} exercises3={exercises3} />
    </>
  );
};

export default Content;
