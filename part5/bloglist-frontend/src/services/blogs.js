import axios from "axios";
const baseUrl = "/api/blogs";
const loginUrl = "/api/auth/login";

var token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};



  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  };

  const getAll = async () => {
    const config = {
      headers: { Authorization: token },
    };
    const request = await axios.get(baseUrl, config);
    return request.data;
  };

  const login = async (credentials) => {
    const response = await axios.post(loginUrl, credentials);
    return response.data;
  };
  export default { getAll, login, setToken, create };
