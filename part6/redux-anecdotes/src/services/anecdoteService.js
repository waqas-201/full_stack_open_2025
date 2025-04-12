import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  
  return response.data;
};


const postAnecdote = async (data) => {
  return await axios.post(baseUrl, data);
};

export default { getAll, postAnecdote };
