import axios from "axios";
const blogUrl = "/api/blogs";
const loginUrl = "/api/auth/login";
const userUlr = "/api/users";
const commentUrl = "/api/comments";

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

const updateLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const modifiedUrl = `${blogUrl}/${blog.id}`;
  const response = await axios.patch(
    modifiedUrl,
    { likes: blog.likes + 1 },
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
  const responce = await axios.get(blogUrl, config);
  console.log(responce);

  return responce.data;
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

const getOneBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const modifiedUrl = `${blogUrl}/${id}`;
  return (await axios.get(modifiedUrl, config)).data;
};

const getComment = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const modifiedUrl = `${commentUrl}/${blogId}`;
  return (await axios.get(modifiedUrl, config)).data;
};

const addComment = async ({ blogId, message }) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(
    commentUrl,
    { blogId, commentMessage: message },
    config
  );
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
  getOneBlog,
  getComment,
  addComment,
};
