import { useSelector } from "react-redux";

const Notification = () => {
  const state = useSelector((state) => state);
  console.log(state);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {state.notification.message ? (
        <div style={style}>{state?.notification?.message}</div>
      ) : null}
    </>
  );
};

export default Notification;
