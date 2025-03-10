import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getALl = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  console.log("create called ");
  
  return axios.post(baseUrl, newObject);
};

const update = (newObject, id) => {
  console.log("update triggerd");
  
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};


export default { getALl, create, update, deletePerson };
