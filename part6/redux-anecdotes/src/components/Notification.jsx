import { useSelector } from "react-redux";

const Notification = () => {
  const state = useSelector((state) => state);
  console.log(state);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>render here notification...</div>;
};

export default Notification;
