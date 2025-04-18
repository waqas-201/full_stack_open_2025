import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { useParams } from "react-router-dom";
import fetchSrevice from "../services/fetchSrevice";

const SingleUser = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSrevice.getOneUserBlogs(id),
  });
  console.log(user);

  if (isLoading) {
    return <>loading info ....</>;
  }
  if (error) {
    console.log(error);

    return <p style={{ color: "red" }}> {error.message}</p>;
  }

  return (
    <div>
      <h3>{user?.username}</h3>
      <h4>added blogs </h4>
      {user.blogs.map((blog) => {
        return (
          <ul key={blog.id}>
            <li>{blog.title}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default SingleUser;
