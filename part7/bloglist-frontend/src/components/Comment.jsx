import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchSrevice from "../services/fetchSrevice";
import H3 from "./ui/H3";

const Comment = ({ blogId }) => {
  const {
    data: comments,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => fetchSrevice.getComment(blogId),
  });

  if (isPending) {
    return <p>loading comments .....</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  if (comments.length === 0) {
    return <p> found no comment on this post</p>;
  }

  return (
    <>
      <H3>comments</H3>
      {comments.map((comment) => {
        return (
          <ul key={comment.id}>
            <li>{comment.message}</li>
          </ul>
        );
      })}
    </>
  );
};

export default Comment;
