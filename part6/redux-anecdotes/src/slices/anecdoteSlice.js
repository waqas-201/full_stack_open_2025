import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

export const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];
const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    createVote: (state, action) => {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    createAncedote: (state, action) => {
      return state.concat(action.payload);
    },
    setAnecdote: (state, action) => {
      return action.payload;
    },
  },
});
export const { createVote, createAncedote, setAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;



export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll();
    console.log(anecdote);

    dispatch(setAnecdote(anecdote));
  };
};
