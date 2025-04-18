import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchSrevice from "../services/fetchSrevice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAndDeleteBlog,
  LikeAndUpdatePost,
} from "../features/notification/blogSlice";

const BlogPost = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { id } = useParams();
  const [blog] = data.blog.blog.filter((b) => b.id === id);
  console.log(blog);

  const handleLike = async (blog) => {
    try {
      dispatch(LikeAndUpdatePost(blog));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    const confirm = window.confirm(`Remove Blog ${blog.title}`);
    if (confirm) {
      dispatch(fetchAndDeleteBlog(id));
    }
  };

  return (
    <>
      <h3>{blog.title}</h3>
      <a href={blog.url}> {blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>{" "}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <p>added by {blog.author}</p>
    </>
  );
};

export default BlogPost;
