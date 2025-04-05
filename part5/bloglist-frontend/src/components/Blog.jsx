import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
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
          <div> url : {blog.url}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
