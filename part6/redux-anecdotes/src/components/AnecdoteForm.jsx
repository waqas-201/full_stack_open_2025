import { useDispatch } from "react-redux";
import { createAncedote } from "../reducers/actionCreators";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.ancedote.value;
    dispatch(createAncedote(content));
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
