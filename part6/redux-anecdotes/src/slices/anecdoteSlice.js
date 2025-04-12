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
        anecdote.id === action.payload.id ? action.payload : anecdote
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

    dispatch(setAnecdote(anecdote));
  };
};

export const createAncedotes = (content) => {
  return async (dispatch) => {
    const responce = await anecdoteService.postAnecdote({
      content: content,
      id: getId(),
      votes: 0,
    });

    dispatch(createAncedote(responce.data));
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAnecdote(id);

    const updatedAnecdote = await anecdoteService.addVote(id, {
      votes: anecdote.data.votes + 1,
    });
    console.log(updatedAnecdote);

    dispatch(createVote(updatedAnecdote.data));
  };
};