import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  console.log(course);

  return (
    <>
      <Header heading={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
