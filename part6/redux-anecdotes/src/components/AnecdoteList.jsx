import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../slices/anecdoteSlice";
import {
  removeNotificationMessage,
  setNotificationMessage,
} from "../slices/notificationSlice";

const AnecdoteList = () => {
  const state = useSelector((state) => {
    if (state.filter.term) {
      const filterd = state.anecdote.filter((anc) => {
        return anc.content.includes(state.filter.term.term);
      });

      return { ...state, anecdote: filterd };
    }

    return state;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const data = dispatch(createVote(id));

    // find anecdote which user voted
    const votedAnecdote = state.anecdote.find((anc) => anc.id === data.payload);
    dispatch(setNotificationMessage(`user voted '${votedAnecdote.content}'`));

    setTimeout(() => {
      dispatch(removeNotificationMessage());
    }, 3000);
  };

  console.log(state);
  
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
