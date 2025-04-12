import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  return (await axios.get(baseUrl)).data;
};

const postAnecdote = async (data) => {
  return await axios.post(baseUrl, data);
};

const addVote = async (id, data) => {
  console.log(data);

  return await axios.patch(`${baseUrl}/${id}`, data);
};

const getAnecdote = async (id) => {
  return await axios.get(`${baseUrl}/${id}`);
};

export default { getAll, postAnecdote, addVote, getAnecdote };
