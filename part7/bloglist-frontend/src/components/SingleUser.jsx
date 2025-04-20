import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import fetchSrevice from "../services/fetchSrevice";
import H2 from "./ui/H2";
import H3 from "./ui/H3";

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

  if (isLoading) {
    return <>loading info ....</>;
  }
  if (error) {
    console.log(error);

    return <p style={{ color: "red" }}> {error.message}</p>;
  }

  return (
    <div>
      <H2>{user?.username}</H2>
      <H3>added blogs </H3>
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
