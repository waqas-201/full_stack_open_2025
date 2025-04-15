import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./src/features/notification/notification.slice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
