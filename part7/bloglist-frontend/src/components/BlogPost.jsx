import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAndDeleteBlog,
  LikeAndUpdatePost,
} from "../features/notification/blogSlice";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import H3 from "./ui/H3";
import { Button } from "./ui/Button";

const BlogPost = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { id } = useParams();
  const [blog] = data.blog.blog.filter((b) => b.id === id);

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
      <H3>{blog?.title}</H3>
      <a href={blog?.url}> {blog?.url}</a>
      <div>
        <span>{blog?.likes} likes</span>{" "}
        <Button onClick={() => handleLike(blog)}>like</Button>
      </div>
      <p>added by {blog?.author}</p>
      <CommentForm blogId={blog?.id} />
      <Comment blogId={blog?.id} />
    </>
  );
};

export default BlogPost;
