import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdoteService";
import { useContext } from "react";
import NotificationContext from "./components/notificationContext";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: anecdoteService.addVote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdote");
    },
  });

  const handleVote = (anecdote) => {
    mutate(anecdote.id);
  };

  const {
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

      <Notification message={notification.message} />
      <AnecdoteForm dispatch={dispatch} />

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
