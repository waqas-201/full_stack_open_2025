import React from "react";
import Blogs from "./Blogs";
import BlogForm from "./BlogForm";
import H2 from "./ui/H2";

const CreateBlog = ({ blogs, setType }) => {
  return (
    <>
      <H2>Blogs</H2>
      {blogs.map((blog) => (
        <Blogs key={blog.id} blog={blog} />
      ))}
      <BlogForm setType={setType} />
    </>
  );
};

export default CreateBlog;
