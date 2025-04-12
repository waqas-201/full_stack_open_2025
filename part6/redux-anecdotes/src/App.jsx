import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdoteService";
import { useDispatch } from "react-redux";
import { setAnecdote } from "./slices/anecdoteSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnecdotes = async () => {
      const anecdote = await anecdoteService.getAll();
      dispatch(setAnecdote(anecdote));
    };

    getAnecdotes();
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
