import { createSlice } from "@reduxjs/toolkit";

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
