require("dotenv").config();

const PORT = process.env.PORTNUMBER;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
