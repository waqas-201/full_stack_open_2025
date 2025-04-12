/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = ({ dispatch }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: anecdoteService.postAnecdote,
    onSuccess: (response) => {
      const anecdote = response.data; // if axios is used

      queryClient.invalidateQueries("anecdote");
      dispatch({ type: "SET", payload: anecdote.content });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const id = Math.floor(Math.random(100000) * 100000);
    event.target.anecdote.value = "";
    const data = {
      content: content,
      id: id,
      votes: 0,
    };
    mutate(data);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
