import { useDispatch } from "react-redux";
import fetchSrevice from "../services/fetchSrevice";
import { setOneBLogPost } from "../features/notification/blogSlice";
import {
  removeNotification,
  setNotification,
} from "../features/notification/notification.slice";
import { useState } from "react";

const BlogForm = ({ setType }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const dispatch = useDispatch();
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetchSrevice.createPost({
        title,
        author,
        likes,
        url,
      });
      dispatch(setOneBLogPost(responce));

      setTitle("");
      setAuthor("");
      setLikes("");
      setUrl("");
      dispatch(
        setNotification(`blog post with title ${responce.title} just  added`)
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
      setType("success");
    } catch (error) {
      dispatch(setNotification(error?.response?.data?.error));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
      setType("failed");
      console.log(error);
    }
  };

  return (
    <div>
      {showCreate ? (
        <form onSubmit={(e) => handleCreateBlog(e)}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            url
            <input
              type="text"
              value={url}
              name="url"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            likes
            <input
              type="number"
              value={likes}
              name="likes"
              onChange={(e) => setLikes(e.target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      ) : null}

      <button
        onClick={() => {
          setShowCreate(!showCreate);
        }}
      >
        create New{" "}
      </button>
    </div>
  );
};

export default BlogForm;
