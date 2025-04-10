import { createSlice } from "@reduxjs/toolkit";
const initialState = { filter: "" };
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdote: (state, action) => {
      return { ...state, filter: action.payload };
    },
  },
});

export const { filterAnecdote } = filterSlice.actions;
export default filterSlice.reducer;
