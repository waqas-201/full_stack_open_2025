import React from "react";
import Blogs from "./Blogs";
import BlogForm from "./BlogForm";

const CreateBlog = ({ blogs, setType }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blogs key={blog.id} blog={blog} />
      ))}
      <BlogForm setType={setType} />
    </>
  );
};

export default CreateBlog;
