import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import fetchSrevice from "../services/fetchSrevice";
import { Button } from "./ui/Button";

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
        className="px-4 py-2 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
      />
      <Button onClick={handleClick}>add comment </Button>
    </form>
  );
};

export default CommentForm;
