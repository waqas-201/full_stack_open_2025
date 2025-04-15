import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ type }) => {
  const notification = useSelector((state) => state.notification);

  return (
    <>
      {notification.message ? (
        <p
          style={{
            color: `${type === "failed" ? "red" : "green"}`,
          }}
        >
          {notification.message}
        </p>
      ) : null}
    </>
  );
};

export default Notification;
