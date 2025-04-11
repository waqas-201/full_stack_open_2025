import { createSlice } from "@reduxjs/toolkit";
const initialState = { term: "" };
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdote: (state, action) => {
      state.term = action.payload;
    },
  },
});

export const { filterAnecdote } = filterSlice.actions;
export default filterSlice.reducer;
