import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchSrevice from "../services/fetchSrevice";

const Comment = ({ blogId }) => {
  console.log("--------------------------");

  console.log(blogId);
  console.log("--------------------------");

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
      <h4>comments</h4>
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
