import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./slices/anecdoteSlice";
import filterReducer from "./slices/filterSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});
