require("dotenv").config();

const PORT = process.env.PORTNUMBER;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
