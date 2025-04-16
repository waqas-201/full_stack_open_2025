import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

const initialState = {
  blog: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    setOneBLogPost: (state, action) => {
      state.blog.push(action.payload);
    },
  },
});

export default blogSlice.reducer;
export const { setBlog, setOneBLogPost } = blogSlice.actions;

export const fetchAndSetBlog = () => {
  return async (dispatch) => {
    const data = await blogService.getAll();
    dispatch(setBlog(data));
  };
};
