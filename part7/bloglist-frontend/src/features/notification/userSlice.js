import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
