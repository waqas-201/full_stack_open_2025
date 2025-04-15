import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import {
  removeNotification,
  setNotification,
} from "../features/notification/notification.slice";

const CreateBlog = ({ blogs, setBlogs, setType, setIsLikeAdded }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [applySort, setApplySort] = useState(false);
  const [sorted, setSorted] = useState(blogs);

  const dispatch = useDispatch();
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const responce = await blogService.create({ title, author, likes, url });
      setBlogs(blogs.concat(responce));
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

  useEffect(() => {
    setSorted(blogs);
    if (applySort) {
      const data = blogs.sort((a, b) => b.likes - a.likes);
      setSorted(data);
    }
  }, [applySort, blogs]);

  return (
    <>
      <h2>Blogs</h2>
      <button
        onClick={() => {
          setApplySort(true);
        }}
      >
        sort
      </button>
      {sorted.map((blog) => (
        <Blog key={blog.id} blog={blog} setIsLikeAdded={setIsLikeAdded} />
      ))}

      <button
        onClick={() => {
          setShowCreate(!showCreate);
        }}
      >
        create New{" "}
      </button>

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
    </>
  );
};

export default CreateBlog;
