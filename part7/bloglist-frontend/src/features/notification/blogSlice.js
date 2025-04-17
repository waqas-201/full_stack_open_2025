import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/fetchSrevice";

const initialState = {
  blog: [],
  isLikeAdded: false,
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
export const { setBlog, setOneBLogPost, setIsLikeAdded, setUpdateBlogPost } =
  blogSlice.actions;

export const fetchAndSetBlog = () => {
  return async (dispatch) => {
    const data = await blogService.getAllPosts();
    dispatch(setBlog(data));
  };
};

export const LikeAndUpdatePost = (id) => {
  return async (dispatch) => {
    await blogService.updateLike(id);
    dispatch(fetchAndSetBlog());
  };
};

export const fetchAndDeleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.removePost(id);
    dispatch(fetchAndSetBlog());
  };
};
