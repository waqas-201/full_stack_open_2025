const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const { MONGODB_URI } = require("./utils/config");
const { PORT } = require("./utils/config");
const Blog = require("./models/blog");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRouter);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("connected to database successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


module.exports = app;
