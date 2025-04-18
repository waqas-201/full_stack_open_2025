import axios from "axios";
const blogUrl = "/api/blogs";
const loginUrl = "/api/auth/login";
const userUlr = "/api/users";

var token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createPost = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(blogUrl, newObject, config);
  return response.data;
};

const updateLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const getOneBlog = await axios.get(blogUrl, config);
  const prevLikes = getOneBlog.data[0].likes;

  const modifiedUrl = `${blogUrl}/${id}`;
  const response = await axios.patch(
    modifiedUrl,
    { likes: prevLikes + 1 },
    config
  );
  return response.data;
};

const removePost = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const modifiedUrl = `${blogUrl}/${id}`;
  const response = await axios.delete(modifiedUrl, config);
  return response.data;
};

const getAllPosts = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(blogUrl, config);
  return request.data;
};

const loginUser = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const getUsers = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(userUlr, config);
  return response.data;
};

const getOneUserBlogs = async (id) => {
  console.log("funcation triggerd ");

  const config = {
    headers: { Authorization: token },
  };
  const modifiedUrl = `${userUlr}/${id}`;

  const responce = await axios.get(modifiedUrl, config);
  console.log(responce);

  return responce.data;
};
export default {
  getAllPosts,
  loginUser,
  setToken,
  createPost,
  updateLike,
  removePost,
  getUsers,
  getOneUserBlogs,
};
