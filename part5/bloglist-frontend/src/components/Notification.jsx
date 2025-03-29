import React from "react";

const Notification = ({ message, type }) => {
  return (
    <>
      {message ? (
        <p
          style={{
            color: `${type === "failed" ? "red" : "green"}`,
          }}
        >
          {message}
        </p>
      ) : null}
    </>
  );
};

export default Notification;
