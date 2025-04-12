import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const initialState = { message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage: (state, action) => {
      state.message = action.payload; // <-- mutating style (Immer handles it)
    },
    removeNotificationMessage: (state) => {
      state.message = "";
    },
  },
});

export default notificationSlice.reducer;
export const { setNotificationMessage, removeNotificationMessage } =
  notificationSlice.actions;

export const setNotification = (id, timeOut) => {
  return async (dispatch) => {
    // find anecdote which user voted
    const votedAnecdote = await anecdoteService.getAnecdote(id);
    dispatch(
      setNotificationMessage(`user voted '${votedAnecdote.data.content}'`)
    );

    setTimeout(() => {
      dispatch(removeNotificationMessage());
    }, timeOut);
  };
};