import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import fetchSrevice from "../services/fetchSrevice";

const CommentForm = ({ blogId }) => {
  console.log(blogId);
  const queryClint = useQueryClient();
  const [message, setMessage] = useState("");
  const { mutate } = useMutation({
    mutationFn: fetchSrevice.addComment,
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["comments", blogId] });
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    mutate({ blogId: blogId, message: message });
  };

  return (
    <form>
      <input
        type="text"
        placeholder="comment about this post"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <button onClick={handleClick}>add comment</button>
    </form>
  );
};

export default CommentForm;
