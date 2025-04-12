import { useDispatch } from "react-redux";
import { createAncedotes } from "../slices/anecdoteSlice";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.ancedote.value;

    dispatch(createAncedotes(content));
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
