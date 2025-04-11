import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage: (state, action) => {
      return (state.message = action.payload);
    },
  },
});

export default notificationSlice.reducer;
export const { setNotificationMessage } = notificationSlice.actions;
