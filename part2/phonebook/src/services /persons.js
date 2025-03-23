import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getALl = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  console.log("create called ");

  return axios.post(baseUrl, newObject);
};

const update = (newObject) => {
  console.log("update triggerd");
  console.log(newObject);

  return axios.put(`${baseUrl}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};


export default { getALl, create, update, deletePerson };
