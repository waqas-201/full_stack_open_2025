import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./src/features/notification/notification.slice";
import blogReducer from "./src/features/notification/blogSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
});
