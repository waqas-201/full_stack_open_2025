import { useSelector, useDispatch } from 'react-redux'
import { getId } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: "Vote", payload: { id: id } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.ancedote.value;
    dispatch({
      type: "Ancedote",
      payload: { content: content, id: getId(), votes: 0 },
    });

    e.target.ancedote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        ?.sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote?.id}>
            <div>{anecdote?.content}</div>
            <div>
              has {anecdote?.votes}
              <button onClick={() => vote(anecdote?.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input name="ancedote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App