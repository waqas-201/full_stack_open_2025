import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <>
      {course.map((value) => {
        return (
          <>
            <Header heading={value.name} />
            <Content parts={value.parts} />
            <Total parts={value.parts} />
          </>
        );
      })}
    </>
  );
};

export default Course;
