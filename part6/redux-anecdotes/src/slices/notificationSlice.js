import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage: (state, action) => {
      return { ...state, message: action.payload };
    },
    removeNotificationMessage: (state) => {
      return { ...state, message: "" };
    },
  },
});

export default notificationSlice.reducer;
export const { setNotificationMessage, removeNotificationMessage } =
  notificationSlice.actions;
