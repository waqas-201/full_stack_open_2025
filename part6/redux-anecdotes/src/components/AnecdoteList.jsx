import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../slices/anecdoteSlice";
import {
  removeNotificationMessage,
  setNotificationMessage,
} from "../slices/notificationSlice";

const AnecdoteList = () => {
  const state = useSelector((state) => {
    console.log(state);

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

    const data = dispatch(createVote(id));

    console.log(data.payload);

    // find anecdote which user voted
    const votedAnecdote = state.anecdote.find((anc) => anc.id === data.payload);
    console.log(votedAnecdote);
    dispatch(setNotificationMessage(`user voted '${votedAnecdote.content}'`));

    setTimeout(() => {
      dispatch(removeNotificationMessage());
    }, 3000);
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
