import { useDispatch } from "react-redux";
import fetchSrevice from "../services/fetchSrevice";
import { setOneBLogPost } from "../features/notification/blogSlice";
import {
  removeNotification,
  setNotification,
} from "../features/notification/notification.slice";
import { useState } from "react";
import { Button } from "./ui/Button";

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
      setLikes(0);
      setUrl("");

      dispatch(
        setNotification(`blog post with title "${responce.title}" just added`)
      );
      setTimeout(() => dispatch(removeNotification()), 3000);
      setType("success");
    } catch (error) {
      dispatch(setNotification(error?.response?.data?.error));
      setTimeout(() => dispatch(removeNotification()), 3000);
      setType("failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 border border-gray-200 rounded-xl shadow">
      {showCreate && (
        <form onSubmit={handleCreateBlog} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="mb-1 font-medium text-sm text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
              placeholder="Enter blog title"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="author"
              className="mb-1 font-medium text-sm text-gray-700"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="px-4 py-2 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
              placeholder="Author name"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="url"
              className="mb-1 font-medium text-sm text-gray-700"
            >
              URL
            </label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-4 py-2 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="likes"
              className="mb-1 font-medium text-sm text-gray-700"
            >
              Likes
            </label>
            <input
              id="likes"
              type="number"
              value={likes}
              onChange={(e) => setLikes(Number(e.target.value))}
              className="px-4 py-2 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
              placeholder="0"
            />
          </div>

          <div className="pt-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      )}

      <div className="pt-5 text-center">
        <Button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Cancel" : "Create New"}
        </Button>
      </div>
    </div>
  );
};

export default BlogForm;
