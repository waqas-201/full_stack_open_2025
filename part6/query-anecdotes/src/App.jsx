import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdoteService";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const {
    isPaused,
    isPending,
    data: anecdotes,
    error,
  } = useQuery({
    queryKey: ["anecdote"],
    queryFn: anecdoteService.getAll,
    retry: 1,
  });

  if (isPending) {
    return <> fetching anecdotes for you ....</>;
  }
  if (error) {
    return <> some thing went wrong!</>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
