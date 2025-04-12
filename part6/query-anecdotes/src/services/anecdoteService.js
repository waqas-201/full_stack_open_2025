import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  return (await axios.get(baseUrl)).data;
};

const postAnecdote = async (data) => {
  return await axios.post(baseUrl, data);
};

const addVote = async (id) => {
  // get anecdote from db
  const anecdote = await getAnecdote(id);
  return await axios.patch(`${baseUrl}/${id}`, { votes: anecdote.votes + 1 });
};

const getAnecdote = async (id) => {
  return (await axios.get(`${baseUrl}/${id}`)).data;
};

export default { getAll, postAnecdote, addVote, getAnecdote };
