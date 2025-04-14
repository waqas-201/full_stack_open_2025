/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  console.log(message);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!message) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
