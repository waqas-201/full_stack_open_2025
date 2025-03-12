const express = require("express");
const app = express();
const PORT = 3001;

const phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, responce) => {
  responce.send(phoneBook);
});

app.get("/info", (req, res) => {
  const reqTime = new Date();
  console.log(reqTime.toString());

  res.send(`phonebook has info of ${phoneBook.length} peopels  ${reqTime}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
