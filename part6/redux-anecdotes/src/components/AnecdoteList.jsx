import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../slices/anecdoteSlice";

const AnecdoteList = () => {
  const state = useSelector((state) => {
    if (state?.filter?.term) {
      const filterd = state.anecdote.filter((anc) =>
        anc.content.includes(state.filter.term)
      );

      return { ...state, anecdotes: filterd };
    }
    return state;
  });

  console.log(state);

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log(id);

    dispatch(createVote(id));
  };

  return (
    <>
      {[...state.anecdote]
        .sort((a, b) => b.votes - a.votes) // Sort by descending votes
        .map((anecdote) => {
          return (
            <div key={anecdote?.id}>
              <div>{anecdote?.content}</div>
              <div>
                has {anecdote?.votes}
                <button onClick={() => vote(anecdote?.id)}>vote</button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default AnecdoteList;
