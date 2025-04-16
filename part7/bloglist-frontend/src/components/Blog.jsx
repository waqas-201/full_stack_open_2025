import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAndDeleteBlog,
  LikeAndUpdatePost,
} from "../features/notification/blogSlice";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async ({ id }) => {
    //  setTotalLikes((prev) => prev + 1);
    try {
      dispatch(LikeAndUpdatePost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    const confirm = window.confirm(`Remove Blog ${blog.title}`);
    console.log(confirm);
    if (confirm) {
      dispatch(fetchAndDeleteBlog(id));
    }
  };

  return (
    <div className="title" style={blogStyle}>
      title : {blog.title}
      <button
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? "Hide" : "Show"}
      </button>
      {showDetails ? (
        <div>
          <div> author : {blog.author}</div>
          <div>
            url :<a href={`${blog.url}`}> {blog.url}</a>
          </div>
          <div>
            Likes :{blog.likes}
            <button
              onClick={() => {
                handleLike({ id: blog.id });
              }}
            >
              Like
            </button>
          </div>

          <div>
            <button onClick={() => handleRemove(blog.id)}>remove</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
