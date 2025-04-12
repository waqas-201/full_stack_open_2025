import { useDispatch } from "react-redux";
import { createAncedote, getId } from "../slices/anecdoteSlice";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.ancedote.value;
    const responce = await anecdoteService.postAnecdote({
      content: content,
      id: getId(),
      votes: 0,
    });

    dispatch(createAncedote(responce.data));
    e.target.ancedote.value = "";
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input name="ancedote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
