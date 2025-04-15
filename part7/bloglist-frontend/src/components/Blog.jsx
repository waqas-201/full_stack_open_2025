import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setIsLikeAdded }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [totalLike, setTotalLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async ({ id }) => {
    setTotalLikes((prev) => prev + 1);
    try {
      await blogService.updateLike(id, totalLike);
      setIsLikeAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    const confirm = window.confirm(`Remove Blog ${blog.title}`);
    console.log(confirm);
    if (confirm) {
      try {
        await blogService.remove(id);
      } catch (error) {
        console.log(error);
      }
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
            Likes : {totalLike}
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
