const express = require("express");
var morgan = require("morgan");
var cors = require("cors");
const phoneBook = require("./phoneBook");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler.js");

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

app.get("/api/persons/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).end();
  }
  try {
    const person = await phoneBook.findById(id);
    if (!person) {
      return res.status(404).end();
    }
    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).end();
  }
  try {
    const deletePerson = await phoneBook.findByIdAndDelete(id);
    if (!deletePerson) {
      throw new Error("no person found");
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






