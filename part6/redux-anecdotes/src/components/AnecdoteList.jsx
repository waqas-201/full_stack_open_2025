import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../reducers/actionCreators";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter.term) {
      const filterd = state.anecdote.filter((anc) =>
        anc.content.includes(state.filter.term)
      );

      return { ...state, anecdote: filterd };
    } else {
      return state;
    }
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(createVote(id));
  };
  return (
    <>
      {anecdotes.anecdote
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
    </>
  );
};

export default AnecdoteList;
