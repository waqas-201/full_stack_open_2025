import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../slices/anecdoteSlice";
import { setNotification } from "../slices/notificationSlice";

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

  const vote = async (id) => {
    dispatch(addVote(id));
    dispatch(setNotification(id, 3000));
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
