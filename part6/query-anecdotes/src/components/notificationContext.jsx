/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  console.log(state);
  console.log(action.payload);

  switch (action.type) {
    case "SET":
      return { message: action.payload };
    case "REMOVE":
      return { message: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: "",
  });

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
