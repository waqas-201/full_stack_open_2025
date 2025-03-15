const express = require("express");
var morgan = require("morgan");
var cors = require("cors");
const phoneBook = require("./phoneBook");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());

morgan.token("postBody", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status - :response-time ms - Body: :postBody"));

app.get("/api/persons", async (req, res) => {
  const data = await phoneBook.find({});
  if (!data) {
    return res.json({ error: "failed to find persons " });
  }
  return res.json(data);
});

app.get("/info", (req, res) => {
  const reqTime = new Date();
  console.log(reqTime.toString());

  res.send(`phonebook has info of ${phoneBook.length} peopels  ${reqTime}`);
});

app.post("/api/persons/", async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name and number are missing " });
  }

  const person = new phoneBook({
    name: name,
    number: number,
  });

  const savedPerson = await person.save();
  res.json(savedPerson);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






