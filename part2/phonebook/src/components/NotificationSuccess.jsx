import "../index.css";

export const NotificationSuccess = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};
