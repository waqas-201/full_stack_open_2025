import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./slices/anecdoteSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
  },
});
